
const User = require('../models/User');
const Car = require('../models/Car');
const Favorite = require('../models/Favorite');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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
