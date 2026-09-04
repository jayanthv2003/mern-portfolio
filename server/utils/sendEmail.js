import nodemailer from 'nodemailer';

/**
 * Sends an email using credentials from environment variables.
 * Works out of the box with Gmail (using an App Password) but any
 * SMTP-compatible provider can be used by changing the EMAIL_* env vars.
 *
 * @param {{to: string, subject: string, html: string, replyTo?: string}} options
 */
const sendEmail = async ({ to, subject, html, replyTo }) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || undefined,
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Website" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    replyTo,
  });
};

export default sendEmail;
