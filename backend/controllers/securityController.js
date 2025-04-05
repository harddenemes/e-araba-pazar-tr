
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const authUtils = require('../utils/authUtils');

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  // Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // Check if current password is correct
  if (!(await user.correctPassword(currentPassword))) {
    return next(new AppError('Current password is incorrect', 401));
  }

  // Update password
  user.password = newPassword;
  await user.save();

  // Log user in, send JWT
  authUtils.createSendToken(user, 200, res);
});

exports.toggleTwoFactor = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  user.twoFactorEnabled = !user.twoFactorEnabled;
  await user.save();

  res.status(200).json({
    success: true,
    twoFactorEnabled: user.twoFactorEnabled
  });
});

// Bu kısım genişletilebilir, örneğin hesap silme fonksiyonu eklenebilir
exports.deleteAccount = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  
  // Get user from collection with password
  const user = await User.findById(req.user.id).select('+password');
  
  // Verify password before deletion
  if (!(await user.correctPassword(password))) {
    return next(new AppError('Incorrect password', 401));
  }
  
  // Delete user
  await User.findByIdAndDelete(req.user.id);
  
  res.status(204).json({
    success: true,
    data: null
  });
});

// E-posta değişikliği için doğrulama kodu gönderme
exports.sendEmailVerification = catchAsync(async (req, res, next) => {
  const { newEmail } = req.body;
  const user = await User.findById(req.user.id);
  
  // Generate verification code
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Save verification code to user with expiration (10 minutes)
  user.emailVerificationCode = verificationCode;
  user.emailVerificationExpires = Date.now() + 10 * 60 * 1000;
  user.newEmail = newEmail;
  await user.save({ validateBeforeSave: false });
  
  try {
    // Send verification code email (implementation would be in utils/email.js)
    // await sendEmailVerification(newEmail, verificationCode);
    
    res.status(200).json({
      success: true,
      message: 'Verification code sent to new email'
    });
  } catch (err) {
    user.emailVerificationCode = undefined;
    user.emailVerificationExpires = undefined;
    user.newEmail = undefined;
    await user.save({ validateBeforeSave: false });
    
    return next(new AppError('Error sending verification email. Try again later.', 500));
  }
});

// E-posta değişikliğini doğrulama
exports.verifyEmailChange = catchAsync(async (req, res, next) => {
  const { verificationCode } = req.body;
  const user = await User.findById(req.user.id);
  
  if (!user.emailVerificationCode || !user.emailVerificationExpires || !user.newEmail) {
    return next(new AppError('No pending email verification', 400));
  }
  
  if (user.emailVerificationExpires < Date.now()) {
    return next(new AppError('Verification code expired', 400));
  }
  
  if (user.emailVerificationCode !== verificationCode) {
    return next(new AppError('Invalid verification code', 400));
  }
  
  // Update email
  user.email = user.newEmail;
  user.emailVerificationCode = undefined;
  user.emailVerificationExpires = undefined;
  user.newEmail = undefined;
  await user.save();
  
  res.status(200).json({
    success: true,
    message: 'Email successfully updated'
  });
});
