const nodemailer = require("nodemailer");

exports.sendResetTokenByEmail = async (email, resetToken) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // do not verify the certificate
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Password Reset",
      html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #4CAF50;">Password Reset Request</h2>
      <p>Hello,</p>
      <p>It looks like you requested a password reset. Here is your password reset token:</p>
      <p style="font-size: 18px; font-weight: bold; color: #FF0000;">${resetToken}</p>
      <p>Please copy this token and use it in the password reset form on our website to reset your password.</p>
      <p>If you did not request this, please ignore this email or <a href="mailto:@supportgetcode.com" style="color: #4CAF50; text-decoration: none;">contact support</a> if you have questions.</p>
      <p>Thank you,<br>GenCode Support Team</p>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
