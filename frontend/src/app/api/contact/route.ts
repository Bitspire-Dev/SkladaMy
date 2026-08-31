import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { LRUCache } from "lru-cache";

export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Validation schema (shared intent with the client form in ContactForm.tsx).
// Server-side validation is mandatory — the client can always be bypassed.
// ---------------------------------------------------------------------------
const contactSchema = z.object({
  name: z.string().trim().min(2, "Imię i nazwisko musi mieć przynajmniej 2 znaki").max(120),
  phone: z
    .string()
    .trim()
    .min(9, "Podaj prawidłowy numer telefonu")
    .max(30)
    .regex(/^[+0-9\s().-]+$/, "Nieprawidłowy numer telefonu"),
  email: z.string().trim().email("Podaj prawidłowy adres e-mail").max(254),
  subject: z.string().trim().min(1, "Wybierz typ usługi").max(200),
  message: z.string().trim().min(10, "Opis musi mieć przynajmniej 10 znaków").max(5000),
  // Honeypot: must be empty for legitimate submissions. Spambots tend to fill
  // every field, so we reject any non-empty value server-side.
  company_website: z.string().max(0, "Spam detected").optional().default(""),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ---------------------------------------------------------------------------
// Rate limiting: per-IP token bucket via lru-cache. Prevents SMTP spam/DoS.
// Default: 3 submissions per 10 minutes per IP. Tunable via env.
// ---------------------------------------------------------------------------
const RATE_LIMIT_MAX = Number(process.env.CONTACT_RATE_LIMIT_MAX) || 3;
const RATE_LIMIT_WINDOW_MS = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS) || 10 * 60 * 1000;

const rateLimiter = new LRUCache<string, number>({
  max: 10_000,
  ttl: RATE_LIMIT_WINDOW_MS,
});

function getClientIp(request: NextRequest): string {
  // Trust X-Forwarded-For only behind a known proxy; first hop is the client.
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    return xff.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const count = rateLimiter.get(ip) ?? 0;
  if (count >= RATE_LIMIT_MAX) {
    return false;
  }
  rateLimiter.set(ip, count + 1);
  return true;
}

// ---------------------------------------------------------------------------
// Attachment validation: MIME allow-list + size cap. Server-side only — the
// client check can be bypassed.
// ---------------------------------------------------------------------------
const MAX_ATTACHMENTS = 5;
const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_ATTACHMENT_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

// ---------------------------------------------------------------------------
// HTML escaping for user-supplied fields interpolated into the email body.
// Prevents HTML/JS injection in the company mailbox client.
// ---------------------------------------------------------------------------
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeHtmlMultiline(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

// Generic error response — never leak infrastructure details to the client.
const GENERIC_ERROR = NextResponse.json(
  { error: "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później." },
  { status: 500 }
);

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);

  // 1. Rate limit
  if (!checkRateLimit(clientIp)) {
    return NextResponse.json(
      { error: "Zbyt wiele zgłoszeń. Spróbuj ponownie za kilka minut." },
      { status: 429 }
    );
  }

  try {
    // 2. Parse body (JSON or multipart)
    let rawData: Record<string, unknown> = {};
    const attachments: Array<{ filename: string; content: Buffer; contentType?: string }> = [];

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      rawData = {
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        phone: String(form.get("phone") || ""),
        subject: String(form.get("subject") || ""),
        message: String(form.get("message") || ""),
        company_website: String(form.get("company_website") || ""),
      };

      const files = form.getAll("files").filter((v): v is File => v instanceof File);
      for (const file of files.slice(0, MAX_ATTACHMENTS)) {
        // Server-side MIME + size validation (client can be bypassed).
        if (file.size > MAX_ATTACHMENT_BYTES) {
          return NextResponse.json(
            { error: `Załącznik "${file.name}" przekracza maksymalny rozmiar 5 MB.` },
            { status: 400 }
          );
        }
        if (file.type && !ALLOWED_ATTACHMENT_TYPES.has(file.type)) {
          return NextResponse.json(
            { error: `Niedozwolony typ pliku: ${file.type}. Dozwolone: JPG, PNG, WebP, GIF.` },
            { status: 400 }
          );
        }
        const arrayBuffer = await file.arrayBuffer();
        attachments.push({
          filename: file.name || "zalacznik",
          content: Buffer.from(arrayBuffer),
          contentType: file.type || undefined,
        });
      }
    } else {
      rawData = (await request.json()) as Record<string, unknown>;
    }

    // 3. Validate with Zod (honeypot included — non-empty => 400)
    const parsed = contactSchema.safeParse(rawData);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message || "Nieprawidłowe dane formularza." },
        { status: 400 }
      );
    }
    const body: ContactFormData = parsed.data;

    // 4. Build transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 5. Email to company — all user fields HTML-escaped.
    // No auto-reply to the customer's address: that would let anyone use this
    // endpoint as an open SMTP relay / for email bombing. The company replies
    // manually from their inbox.
    const mailToCompany = {
      from: `"Formularz Kontaktowy SkładaMy" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_FROM,
      replyTo: body.email,
      subject: `Nowe zapytanie: ${escapeHtml(body.subject)}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #FFC400; color: #000; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #fff; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #6a4a00; }
            .value { margin-top: 5px; padding: 10px; background: #f9f9f9; border-left: 3px solid #FFC400; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nowe zapytanie z formularza</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Imię i nazwisko:</div>
                <div class="value">${escapeHtml(body.name)}</div>
              </div>

              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${escapeHtml(body.email)}">${escapeHtml(body.email)}</a></div>
              </div>

              <div class="field">
                <div class="label">Telefon:</div>
                <div class="value"><a href="tel:${escapeHtml(body.phone.replace(/\s/g, ""))}">${escapeHtml(body.phone)}</a></div>
              </div>

              <div class="field">
                <div class="label">Typ usługi:</div>
                <div class="value">${escapeHtml(body.subject)}</div>
              </div>

              <div class="field">
                <div class="label">Wiadomość:</div>
                <div class="value">${escapeHtmlMultiline(body.message)}</div>
              </div>

              <div class="footer">
                <p>Wiadomość wysłana z formularza kontaktowego na stronie SkładaMy.com.pl</p>
                <p>Data: ${new Date().toLocaleString("pl-PL")}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Nowe zapytanie z formularza kontaktowego SkładaMy

Imię i nazwisko: ${body.name}
Email: ${body.email}
Telefon: ${body.phone}
Typ usługi: ${body.subject}

Wiadomość:
${body.message}

---
Data: ${new Date().toLocaleString("pl-PL")}
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    await transporter.sendMail(mailToCompany);

    return NextResponse.json({ message: "Email wysłany pomyślnie" }, { status: 200 });
  } catch (error) {
    // Log details server-side only; return a generic message to the client.
    console.error("[contact] Submission failed:", error);
    return GENERIC_ERROR;
  }
}
