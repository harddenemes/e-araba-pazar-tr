
const ChargingStation = require('../models/ChargingStation');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllStations = catchAsync(async (req, res, next) => {
  const stations = await ChargingStation.find();

  res.status(200).json({
    success: true,
    results: stations.length,
    data: stations
  });
});

exports.getStationById = catchAsync(async (req, res, next) => {
  const station = await ChargingStation.findById(req.params.id);

  if (!station) {
    return next(new AppError('No charging station found with that ID', 404));
  }

  res.status(200).json({
    success: true,
    data: station
  });
});

exports.getStationsNearby = catchAsync(async (req, res, next) => {
  const { latitude, longitude, distance = 10 } = req.query; // distance in km

  if (!latitude || !longitude) {
    return next(new AppError('Please provide latitude and longitude', 400));
  }

  // Find stations within radius
  const stations = await ChargingStation.find({
    'location.coordinates': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        $maxDistance: distance * 1000 // Convert km to meters
      }
    }
  });

  res.status(200).json({
    success: true,
    results: stations.length,
    data: stations
  });
});

exports.createStation = catchAsync(async (req, res, next) => {
  // Only admins can create charging stations
  if (req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to create charging stations', 403));
  }

  const newStation = await ChargingStation.create(req.body);

  res.status(201).json({
    success: true,
    data: newStation
  });
});

exports.updateStation = catchAsync(async (req, res, next) => {
  // Only admins can update charging stations
  if (req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to update charging stations', 403));
  }

  const station = await ChargingStation.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!station) {
    return next(new AppError('No charging station found with that ID', 404));
  }

  res.status(200).json({
    success: true,
    data: station
  });
});

exports.deleteStation = catchAsync(async (req, res, next) => {
  // Only admins can delete charging stations
  if (req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to delete charging stations', 403));
  }

  const station = await ChargingStation.findByIdAndDelete(req.params.id);

  if (!station) {
    return next(new AppError('No charging station found with that ID', 404));
  }

  res.status(204).json({
    success: true,
    data: null
  });
});

exports.updateChargePointStatus = catchAsync(async (req, res, next) => {
  const { stationId, pointIndex } = req.params;
  const { status } = req.body;

  if (!['available', 'occupied', 'offline', 'maintenance'].includes(status)) {
    return next(new AppError('Invalid status value', 400));
  }

  const station = await ChargingStation.findById(stationId);

  if (!station) {
    return next(new AppError('No charging station found with that ID', 404));
  }

  if (!station.chargePoints[pointIndex]) {
    return next(new AppError('No charge point found with that index', 404));
  }

  // Update the status
  station.chargePoints[pointIndex].status = status;
  await station.save();

  res.status(200).json({
    success: true,
    data: station
  });
});
