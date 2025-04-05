
const User = require('../models/User');
const Car = require('../models/Car');
const Favorite = require('../models/Favorite');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const authUtils = require('../utils/authUtils');
const sendEmail = require('../utils/email');

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, phone, location } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('Email already in use', 400));
  }

  // Create new user
  const newUser = await User.create({
    name,
    email,
    password,
    phone,
    location,
    joinDate: new Date()
  });

  // Generate token and send response
  authUtils.createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // Send token to client
  authUtils.createSendToken(user, 200, res);
});

exports.getCurrentUser = catchAsync(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
});

exports.updateUserProfile = catchAsync(async (req, res, next) => {
  const { name, email, phone, location } = req.body;

  // Find user by ID (from auth middleware)
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Update fields
  user.name = name || user.name;
  user.email = email || user.email;
  user.phone = phone || user.phone;
  user.location = location || user.location;

  if (req.file) {
    user.avatarUrl = req.file.path;
  }

  // Save changes
  await user.save({ validateBeforeSave: true });

  // Remove password from response
  user.password = undefined;

  res.status(200).json({
    success: true,
    user
  });
});

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

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('No user found with that email', 404));
  }

  // Generate random reset token
  const { resetToken, hashedToken, resetExpires } = authUtils.generateResetToken();

  // Save hashed token to user
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = resetExpires;
  await user.save({ validateBeforeSave: false });

  // Create reset URL
  const resetURL = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password to: ${resetURL}.\nIf you didn't forget your password, please ignore this email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    });

    res.status(200).json({
      success: true,
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError('There was an error sending the email. Try again later.', 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // Get token from URL and hash it
  const resetToken = req.params.token;
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Find user with the token
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  // If token has not expired, and there is a user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  // Log the user in, send JWT
  authUtils.createSendToken(user, 200, res);
});

exports.getUserListings = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const listings = await Car.find({ sellerId: userId });

  res.status(200).json({
    success: true,
    results: listings.length,
    data: listings
  });
});

exports.getUserFavorites = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const favorites = await Favorite.find({ userId })
    .populate('carId')
    .exec();

  const favoriteCars = favorites.map(favorite => favorite.carId);

  res.status(200).json({
    success: true,
    results: favoriteCars.length,
    data: favoriteCars
  });
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
