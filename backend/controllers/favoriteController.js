
const Favorite = require('../models/Favorite');
const Car = require('../models/Car');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getFavorites = catchAsync(async (req, res, next) => {
  const favorites = await Favorite.find({ userId: req.user.id }).populate('carId');

  res.status(200).json({
    success: true,
    results: favorites.length,
    data: favorites
  });
});

exports.toggleFavorite = catchAsync(async (req, res, next) => {
  const { carId } = req.params;

  // Check if car exists
  const car = await Car.findById(carId);
  if (!car) {
    return next(new AppError('No car found with that ID', 404));
  }

  // Check if already favorited
  const existingFavorite = await Favorite.findOne({
    userId: req.user.id,
    carId: carId
  });

  if (existingFavorite) {
    // Remove from favorites
    await Favorite.findByIdAndDelete(existingFavorite._id);
    res.status(200).json({
      success: true,
      action: 'removed',
      data: null
    });
  } else {
    // Add to favorites
    const newFavorite = await Favorite.create({
      userId: req.user.id,
      carId: carId
    });

    res.status(200).json({
      success: true,
      action: 'added',
      data: newFavorite
    });
  }
});

exports.checkFavoriteStatus = catchAsync(async (req, res, next) => {
  const { carId } = req.params;

  const existingFavorite = await Favorite.findOne({
    userId: req.user.id,
    carId: carId
  });

  res.status(200).json({
    success: true,
    isFavorite: !!existingFavorite
  });
});
