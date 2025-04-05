
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token and check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token no longer exists.', 401));
  }
  
  // 4) Check if user's account is active
  if (currentUser.accountStatus !== 'active') {
    return next(new AppError('Your account is not active. Please contact support.', 403));
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array ['admin', 'user']
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }

    next();
  };
};

// 2FA kontrolü için middleware (isteğe bağlı olarak kullanılabilir)
exports.requireTwoFactor = catchAsync(async (req, res, next) => {
  const { twoFactorCode } = req.body;
  const user = req.user;

  // Eğer kullanıcı 2FA etkinleştirmediyse, devam et
  if (!user.twoFactorEnabled) {
    return next();
  }

  // Eğer 2FA kodu sağlanmadıysa hata ver
  if (!twoFactorCode) {
    return next(new AppError('Two-factor authentication code required', 401));
  }

  // 2FA kodunu doğrula
  // Bu kısımda gerçek bir 2FA implementasyonu yapılmalı
  // Örnek olarak, kullanıcının 2FA secret'ını kullanarak kod doğrulama işlemi yapılır
  // const isValidCode = verifyTwoFactorCode(user.twoFactorSecret, twoFactorCode);
  
  // Geçici olarak hard-coded kontrol
  const isValidCode = twoFactorCode === '123456'; // Bu sadece örnek, gerçek uygulamada kullanılmamalı
  
  if (!isValidCode) {
    return next(new AppError('Invalid two-factor authentication code', 401));
  }

  next();
});
