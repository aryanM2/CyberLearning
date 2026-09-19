import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
  let transporter;

  // Check for Gmail service configuration first
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  } else if (process.env.SMTP_HOST && process.env.SMTP_EMAIL) {
    // Custom SMTP server configuration
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  } else {
    // Development fallback using Ethereal sandbox (does not deliver to real external inboxes)
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } catch (err) {
      console.warn('[Email Warning] Could not create Ethereal test account:', err.message);
    }
  }

  const message = {
    from: `${process.env.FROM_NAME || 'NextGen Securities'} <${process.env.GMAIL_USER || process.env.FROM_EMAIL || 'noreply@nextgen-sec.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html || `<p>${options.message}</p>`,
  };

  if (transporter) {
    try {
      const info = await transporter.sendMail(message);

      if (nodemailer.getTestMessageUrl(info)) {
        console.log(`\n======================================================`);
        console.log(`[Email Sandbox] Ethereal Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
        console.log(`======================================================\n`);
      } else {
        console.log(`[Email Delivered] Message ID: ${info.messageId} -> ${options.email}`);
      }
      return info;
    } catch (sendErr) {
      console.error(`[Email Send Error] Failed to deliver to ${options.email}:`, sendErr.message);
      // In development mode, proceed so the user can test using on-screen preview link
      if (process.env.NODE_ENV === 'development') {
        return { messageId: 'dev-simulated-id' };
      }
      throw sendErr;
    }
  }

  return { messageId: 'simulated-id' };
};
