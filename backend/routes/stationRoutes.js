
const express = require('express');
const stationController = require('../controllers/stationController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

const router = express.Router();

// Public routes
router.get('/', stationController.getAllStations);
router.get('/nearby', stationController.getStationsNearby);
router.get('/:id', stationController.getStationById);

// Admin only routes
router.use(authMiddleware.protect);
router.use(authMiddleware.restrictTo('admin'));

router.post('/', uploadMiddleware.uploadMultiple, stationController.createStation);
router.patch('/:id', uploadMiddleware.uploadMultiple, stationController.updateStation);
router.delete('/:id', stationController.deleteStation);
router.patch('/:stationId/charge-points/:pointIndex', stationController.updateChargePointStatus);

module.exports = router;
