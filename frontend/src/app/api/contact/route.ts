import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/* eslint-disable max-lines-per-function */
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';

    let body: ContactFormData;
    let attachments: Array<{ filename: string; content: Buffer; contentType?: string }> = [];

    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      body = {
        name: String(form.get('name') || ''),
        email: String(form.get('email') || ''),
        phone: String(form.get('phone') || ''),
        subject: String(form.get('subject') || ''),
        message: String(form.get('message') || ''),
      };

      const files = form.getAll('files').filter((v): v is File => v instanceof File);
      attachments = await Promise.all(
        files.slice(0, 5).map(async (file) => {
          const arrayBuffer = await file.arrayBuffer();
          return {
            filename: file.name || 'zalacznik',
            content: Buffer.from(arrayBuffer),
            contentType: file.type || undefined,
          };
        })
      );
    } else {
      body = (await request.json()) as ContactFormData;
    }

    // Validate required fields
    if (!body.name || !body.email || !body.message || !body.subject) {
      return NextResponse.json(
        { error: 'Brak wymaganych pól' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to company
    const mailToCompany = {
      from: `"Formularz Kontaktowy SkładaMy" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_FROM,
      replyTo: body.email,
      subject: `🔔 Nowe zapytanie: ${body.subject}`,
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
              <h1>📧 Nowe zapytanie z formularza</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Imię i nazwisko:</div>
                <div class="value">${body.name}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value"><a href="mailto:${body.email}">${body.email}</a></div>
              </div>
              
              <div class="field">
                <div class="label">📱 Telefon:</div>
                <div class="value"><a href="tel:${body.phone}">${body.phone}</a></div>
              </div>
              
              <div class="field">
                <div class="label">🛠️ Typ usługi:</div>
                <div class="value">${body.subject}</div>
              </div>
              
              <div class="field">
                <div class="label">💬 Wiadomość:</div>
                <div class="value">${body.message.replace(/\n/g, '<br>')}</div>
              </div>
              
              <div class="footer">
                <p>Wiadomość wysłana z formularza kontaktowego na stronie SkładaMy.com.pl</p>
                <p>Data: ${new Date().toLocaleString('pl-PL')}</p>
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
Data: ${new Date().toLocaleString('pl-PL')}
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    // Confirmation email to customer
    const mailToCustomer = {
      from: `"SkładaMy - Montaż Mebli" <${process.env.SMTP_FROM}>`,
      to: body.email,
      subject: '✅ Potwierdzenie otrzymania wiadomości - SkładaMy',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #FFC400; color: #000; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #fff; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .highlight { background: #fff9e6; padding: 15px; border-left: 4px solid #FFC400; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
            a { color: #6a4a00; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Dziękujemy za kontakt!</h1>
            </div>
            <div class="content">
              <p>Witaj <strong>${body.name}</strong>,</p>
              
              <p>Otrzymaliśmy Twoją wiadomość dotyczącą: <strong>${body.subject}</strong></p>
              
              <div class="highlight">
                <p><strong>📞 Odpowiemy do Ciebie w ciągu 24 godzin</strong></p>
                <p>W pilnych sprawach zadzwoń: <a href="tel:+48884938490">+48 884 938 490</a></p>
              </div>
              
              <p><strong>Treść Twojej wiadomości:</strong></p>
              <p style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${body.message.replace(/\n/g, '<br>')}</p>
              
              <p>Pozdrawiamy,<br>
              <strong>Zespół SkładaMy</strong><br>
              Profesjonalny montaż mebli IKEA w Słupsku</p>
              
              <div class="footer">
                <p>
                  📧 <a href="mailto:kontakt@skladamy.com.pl">kontakt@skladamy.com.pl</a> | 
                  📱 <a href="tel:+48884938490">+48 884 938 490</a><br>
                  🌐 <a href="https://skladamy.com.pl">www.skladamy.com.pl</a>
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Witaj ${body.name},

Otrzymaliśmy Twoją wiadomość dotyczącą: ${body.subject}

📞 Odpowiemy do Ciebie w ciągu 24 godzin
W pilnych sprawach zadzwoń: +48 884 938 490

Treść Twojej wiadomości:
${body.message}

Pozdrawiamy,
Zespół SkładaMy
Profesjonalny montaż mebli IKEA w Słupsku

📧 kontakt@skladamy.com.pl
📱 +48 884 938 490
🌐 www.skladamy.com.pl
      `,
    };

    // Send both emails
    await transporter.sendMail(mailToCompany);
    await transporter.sendMail(mailToCustomer);

    return NextResponse.json(
      { message: 'Email wysłany pomyślnie' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Błąd wysyłania emaila', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
