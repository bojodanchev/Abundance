import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "smtp-relay.brevo.com",
  port: parseInt(process.env.SMTP_PORT ?? "587", 10),
  secure: false,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

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

  return transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL ?? "noreply@codeabundance.com",
    to,
    subject,
    html,
    ...(mailAttachments && { attachments: mailAttachments }),
  });
}
