const Car = require('../models/Car');
const User = require('../models/User');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllCars = catchAsync(async (req, res, next) => {
  // BUILD QUERY
  const features = new APIFeatures(Car.find({ status: 'active' }), req.query)
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate();

  // EXECUTE QUERY
  const cars = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    success: true,
    results: cars.length,
    data: cars
  });
});

exports.getCarById = catchAsync(async (req, res, next) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    return next(new AppError('No car found with that ID', 404));
  }

  // Increment views counter
  car.views += 1;
  await car.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    data: car
  });
});

exports.createCar = catchAsync(async (req, res, next) => {
  // Get user info
  const user = await User.findById(req.user.id);

  const carData = {
    ...req.body,
    sellerId: req.user.id,
    sellerName: user.name,
    sellerPhone: user.phone,
    sellerEmail: user.email
  };

  const newCar = await Car.create(carData);

  res.status(201).json({
    success: true,
    data: newCar
  });
});

exports.updateCar = catchAsync(async (req, res, next) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    return next(new AppError('No car found with that ID', 404));
  }

  // Check if user is the seller
  if (car.sellerId.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('You are not authorized to update this car', 403));
  }

  // Update car with new data
  const updatedCar = await Car.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: updatedCar
  });
});

exports.deleteCar = catchAsync(async (req, res, next) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    return next(new AppError('No car found with that ID', 404));
  }

  // Check if user is the seller or admin
  if (car.sellerId.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('You are not authorized to delete this car', 403));
  }

  await Car.findByIdAndDelete(req.params.id);

  res.status(204).json({
    success: true,
    data: null
  });
});

exports.updateCarStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  
  if (!['active', 'pending', 'sold', 'suspended'].includes(status)) {
    return next(new AppError('Invalid status value', 400));
  }

  const car = await Car.findById(req.params.id);

  if (!car) {
    return next(new AppError('No car found with that ID', 404));
  }

  // Only seller or admin can update status
  if (car.sellerId.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('You are not authorized to update this car status', 403));
  }

  car.status = status;
  await car.save();

  res.status(200).json({
    success: true,
    data: car
  });
});

exports.toggleCarLike = catchAsync(async (req, res, next) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    return next(new AppError('No car found with that ID', 404));
  }

  // In a real application, we would keep track of which users have liked which cars
  // For now, we'll just increment the likes counter
  car.likes += 1;
  await car.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    likes: car.likes
  });
});

exports.getCarsForComparison = catchAsync(async (req, res, next) => {
  const { carIds } = req.body;

  if (!carIds || !Array.isArray(carIds) || carIds.length === 0) {
    return next(new AppError('Please provide an array of car IDs', 400));
  }

  const cars = await Car.find({ _id: { $in: carIds } });

  res.status(200).json({
    success: true,
    results: cars.length,
    data: cars
  });
});

exports.getFilterOptions = catchAsync(async (req, res, next) => {
  const brands = await Car.distinct('brand');
  const models = await Car.distinct('model');
  const chargeTypes = await Car.aggregate([
    { $unwind: '$chargeTypes' },
    { $group: { _id: '$chargeTypes' } },
    { $project: { _id: 0, type: '$_id' } }
  ]);
  const locations = await Car.distinct('location');
  
  const years = await Car.aggregate([
    { $group: { _id: null, min: { $min: '$year' }, max: { $max: '$year' } } }
  ]);
  
  const prices = await Car.aggregate([
    { $group: { _id: null, min: { $min: '$price' }, max: { $max: '$price' } } }
  ]);
  
  const kilometers = await Car.aggregate([
    { $group: { _id: null, min: { $min: '$km' }, max: { $max: '$km' } } }
  ]);

  res.status(200).json({
    success: true,
    data: {
      brands,
      models,
      chargeTypes: chargeTypes.map(item => item.type),
      locations,
      years: years.length > 0 ? { min: years[0].min, max: years[0].max } : { min: 2010, max: 2023 },
      prices: prices.length > 0 ? { min: prices[0].min, max: prices[0].max } : { min: 500000, max: 5000000 },
      kilometers: kilometers.length > 0 ? { min: kilometers[0].min, max: kilometers[0].max } : { min: 0, max: 100000 }
    }
  });
});
