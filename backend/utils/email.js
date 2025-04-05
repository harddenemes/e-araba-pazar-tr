
const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 2) Define email options
  const mailOptions = {
    from: 'EV Marketplace <info@evmarket.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

// Şifre sıfırlama e-postası gönderme
exports.sendPasswordReset = async (email, resetURL) => {
  const subject = 'Password Reset (valid for 10 minutes)';
  const text = `Forgot your password? Submit a PATCH request with your new password to: ${resetURL}.\nIf you didn't forget your password, please ignore this email.`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Password Reset</h2>
      <p>You requested a password reset. Please click the button below to reset your password:</p>
      <a href="${resetURL}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
      <p>This link is valid for 10 minutes.</p>
    </div>
  `;
  
  await sendEmail({
    email,
    subject,
    message: text,
    html
  });
};

// Yeni kayıt hoşgeldin e-postası gönderme
exports.sendWelcomeEmail = async (email, name) => {
  const subject = 'Welcome to EV Marketplace';
  const text = `Hello ${name}, Welcome to EV Marketplace! We're excited to have you on board.`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Welcome to EV Marketplace!</h2>
      <p>Hi ${name},</p>
      <p>We're excited to have you on board. With EV Marketplace, you can:</p>
      <ul>
        <li>Buy and sell electric vehicles</li>
        <li>Find charging stations near you</li>
        <li>Learn about the latest EV technologies</li>
      </ul>
      <p>If you have any questions, feel free to contact our support team.</p>
    </div>
  `;
  
  await sendEmail({
    email,
    subject,
    message: text,
    html
  });
};

// E-posta doğrulama kodu gönderme
exports.sendEmailVerification = async (email, code) => {
  const subject = 'Email Verification Code';
  const text = `Your verification code is: ${code}. This code will expire in 10 minutes.`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Email Verification</h2>
      <p>Your verification code is:</p>
      <div style="background-color: #f0f0f0; padding: 15px; font-size: 24px; text-align: center; letter-spacing: 5px; font-weight: bold; margin: 20px 0;">
        ${code}
      </div>
      <p>This code will expire in 10 minutes.</p>
    </div>
  `;
  
  await sendEmail({
    email,
    subject,
    message: text,
    html
  });
};

module.exports = sendEmail;
module.exports.sendPasswordReset = exports.sendPasswordReset;
module.exports.sendWelcomeEmail = exports.sendWelcomeEmail;
module.exports.sendEmailVerification = exports.sendEmailVerification;
