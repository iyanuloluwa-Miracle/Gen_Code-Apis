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
        rejectUnauthorized: false // do not verify the certificate
      }
    });

    const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: email,
      subject: "Password Reset",
      text: `Here is your password reset token: ${resetToken}\n\nPlease copy this token and use it in the password reset form on our website.`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
