import nodemailer from "nodemailer";

let _transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!_transporter) {
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!user || !pass) {
      throw new Error("Missing SMTP_USER or SMTP_PASS environment variable");
    }
    _transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp-relay.brevo.com",
      port: parseInt(process.env.SMTP_PORT ?? "587", 10),
      secure: false,
      auth: { user, pass },
    });
  }
  return _transporter;
}

type EmailParams = {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{
    content: string;
    filename: string;
    type: string;
    disposition: string;
  }>;
};

export async function sendEmail({ to, subject, html, attachments }: EmailParams) {
  const mailAttachments = attachments?.map((a) => ({
    filename: a.filename,
    content: Buffer.from(a.content, "base64"),
    contentType: a.type,
  }));

  return getTransporter().sendMail({
    from: `CODE: ABUNDANCE™ <${process.env.SMTP_FROM_EMAIL ?? "noreply@codeabundance.com"}>`,
    to,
    subject,
    html,
    ...(mailAttachments && { attachments: mailAttachments }),
  });
}
