
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Login notification
const sendLoginEmailNoti = async (userEmail, userName) => {
  const mailOptions = {
    from: `Bassi <${process.env.EMAIL_USERNAME}>`,
    to: userEmail,
    subject: "New sign-in to your account",

    text: `Hello ${userName},

A new sign-in to your account was detected.

If this was you, you can safely ignore this email.

If you did not sign in, we recommend changing your password immediately and securing your account.

Regards,
Bassi`,

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; color: #333;">
        <h2>New sign-in detected</h2>

        <p>Hello ${userName},</p>

        <p>
          We detected a new sign-in to your account.
        </p>

        <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 6px;">
          <strong>Account activity</strong>
          <p style="margin-bottom: 0;">
            A new login was detected on your account.
          </p>
        </div>

        <p>
          If this was you, no action is required.
        </p>

        <p>
          If you did not sign in, we recommend changing your password
          immediately and securing your account.
        </p>

        <p style="margin-top: 30px;">
          Regards,<br>
          <strong>Bassi</strong>
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Login notification email sent successfully!");
  } catch (error) {
    console.error("Failed to send login notification email:", error);
    throw error;
  }
};

// OTP email
const sendOtpEmail = async (userEmail, otp) => {
  const mailOptions = {
    from: `Bassi <${process.env.EMAIL_USERNAME}>`,
    to: userEmail,
    subject: "Your verification code",

    text: `Your verification code is: ${otp}

This code will expire in 5 minutes.

If you did not attempt to log in, you can ignore this email.`,

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; color: #333;">
        
        <h2>Verify your login</h2>

        <p>Use the verification code below to complete your login:</p>

        <div style="
          background: #f5f5f5;
          padding: 20px;
          margin: 25px 0;
          text-align: center;
          border-radius: 8px;
        ">
          <strong style="font-size: 32px; letter-spacing: 6px;">
            ${otp}
          </strong>
        </div>

        <p>
          This code will expire in <strong>5 minutes</strong>.
        </p>

        <p>
          If you did not attempt to log in, you can safely ignore this email.
        </p>

        <p style="margin-top: 30px;">
          Regards,<br>
          <strong>Bassi</strong>
        </p>

      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully!");
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    throw error;
  }
};

const sendForgotPasswordEmail = async (userEmail, otp) => {
  const mailOptions = {
    from: `Bassi <${process.env.EMAIL_USERNAME}>`,
    to: userEmail,
    subject: "Reset your password",

    text: `We received a request to reset your Bassi account password.

Your password reset code is: ${otp}

This code will expire in 5 minutes.

If you did not request a password reset, you can safely ignore this email. Your password will not be changed.`,

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 30px;
        color: #333;
        line-height: 1.6;
      ">

        <h2 style="margin-bottom: 10px;">
          Reset your password
        </h2>

        <p>
          We received a request to reset the password for your Bassi account.
        </p>

        <p>
          Use the verification code below to continue:
        </p>

        <div style="
          background: #f5f5f5;
          padding: 20px;
          margin: 25px 0;
          text-align: center;
          border-radius: 8px;
        ">
          <strong style="
            font-size: 32px;
            letter-spacing: 6px;
          ">
            ${otp}
          </strong>
        </div>

        <p>
          This code will expire in <strong>5 minutes</strong>.
        </p>

        <p>
          If you did not request a password reset, you can safely ignore
          this email. Your password will not be changed.
        </p>

        <p style="margin-top: 30px;">
          Regards,<br>
          <strong>Bassi</strong>
        </p>

      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Forgot password OTP email sent successfully!");
  } catch (error) {
    console.error("Failed to send forgot password email:", error);
    throw error;
  }
};


module.exports = {
  sendLoginEmailNoti,
  sendOtpEmail,
  sendForgotPasswordEmail
};



