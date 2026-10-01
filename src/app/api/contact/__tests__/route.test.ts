import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";

// Mock nodemailer BEFORE importing the route — the module-level transporter
// creation in route.ts would otherwise try to connect at import time.
const sendMailMock = vi.fn();
vi.mock("nodemailer", () => ({
  default: {
    createTransport: () => ({ sendMail: sendMailMock }),
  },
}));

// Set SMTP env vars required by the transporter.
process.env.SMTP_HOST = "smtp.test";
process.env.SMTP_PORT = "587";
process.env.SMTP_SECURE = "false";
process.env.SMTP_USER = "user";
process.env.SMTP_PASS = "pass";
process.env.SMTP_FROM = "kontakt@skladamy.com";

// Import the route after mocks are in place. Each test resets modules to
// get a fresh rate limiter (LRUCache is module-level state).
let POST: (req: NextRequest) => Promise<Response>;

function makeJsonRequest(body: unknown, ip = "1.2.3.4"): NextRequest {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

const validPayload = {
  name: "Jan Kowalski",
  phone: "+48 780 926 993",
  email: "jan@example.com",
  subject: "Montaż szafy PAX",
  message: "Proszę o wycenę montażu szafy PAX 200cm w Słupsku.",
  company_website: "",
};

describe("POST /api/contact", () => {
  beforeEach(async () => {
    vi.resetModules();
    // Re-import to get a fresh module (and fresh rate limiter) per test.
    const mod = await import("../route");
    POST = mod.POST;
    sendMailMock.mockReset();
    sendMailMock.mockResolvedValue({ messageId: "test-id" });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends email and returns 200 for a valid JSON payload", async () => {
    const res = await POST(makeJsonRequest(validPayload));
    expect(res.status).toBe(200);
    expect(sendMailMock).toHaveBeenCalledTimes(1);
    const mail = sendMailMock.mock.calls[0][0];
    expect(mail.to).toBe("kontakt@skladamy.com");
    expect(mail.replyTo).toBe("jan@example.com");
    expect(mail.subject).toContain("Montaż szafy PAX");
  });

  it("returns 400 when required fields are missing", async () => {
    const res = await POST(
      makeJsonRequest({ ...validPayload, name: "a" }) // too short
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/przynajmniej 2 znaki/i);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it("returns 400 for an invalid email", async () => {
    const res = await POST(makeJsonRequest({ ...validPayload, email: "not-an-email" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/e-mail/i);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it("returns 400 when the honeypot field is filled (spam)", async () => {
    const res = await POST(
      makeJsonRequest({ ...validPayload, company_website: "https://spam.example" })
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/spam/i);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it("returns 429 when the rate limit is exceeded", async () => {
    // Default limit is 3 per 10 minutes from the same IP.
    const ip = "9.9.9.9";
    const req = () => makeJsonRequest(validPayload, ip);
    const r1 = await POST(req());
    const r2 = await POST(req());
    const r3 = await POST(req());
    const r4 = await POST(req());
    expect(r1.status).toBe(200);
    expect(r2.status).toBe(200);
    expect(r3.status).toBe(200);
    expect(r4.status).toBe(429);
    const body = await r4.json();
    expect(body.error).toMatch(/zbyt wiele zgłoszeń/i);
    // Only 3 emails sent, the 4th was rate-limited.
    expect(sendMailMock).toHaveBeenCalledTimes(3);
  });

  it("HTML-escapes user-supplied fields in the email body", async () => {
    const malicious = {
      ...validPayload,
      name: '<script>alert("xss")</script>',
      message: "<img src=x onerror=alert(1)>\nSecond line",
    };
    const res = await POST(makeJsonRequest(malicious));
    expect(res.status).toBe(200);
    const html = sendMailMock.mock.calls[0][0].html as string;
    // Raw <script> must NOT appear — it must be escaped.
    expect(html).not.toContain('<script>alert("xss")</script>');
    expect(html).toContain("&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;");
    // The <img> tag must be escaped (angle brackets), so it cannot render.
    expect(html).not.toContain("<img src=x onerror=alert(1)>");
    expect(html).toContain("&lt;img src=x onerror=alert(1)&gt;");
    // Newlines in the message are converted to <br> by escapeHtmlMultiline.
    expect(html).toMatch(/<br>/);
  });

  it("returns 500 with a generic message when sendMail throws", async () => {
    sendMailMock.mockRejectedValue(new Error("SMTP down"));
    const res = await POST(makeJsonRequest(validPayload));
    expect(res.status).toBe(500);
    const body = await res.json();
    // Must not leak the SMTP error details.
    expect(body.error).toMatch(/wystąpił błąd/i);
    expect(body.error).not.toContain("SMTP down");
  });
});
