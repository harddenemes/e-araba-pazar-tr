
const express = require('express');
const carController = require('../controllers/carController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

const router = express.Router();

// Public routes
router.get('/', carController.getAllCars);
router.get('/filter-options', carController.getFilterOptions);
router.get('/:id', carController.getCarById);

// Protected routes
router.use(authMiddleware.protect);

router.post('/', uploadMiddleware.uploadMultiple, carController.createCar);
router.post('/compare', carController.getCarsForComparison);
router.patch('/:id', uploadMiddleware.uploadMultiple, carController.updateCar);
router.delete('/:id', carController.deleteCar);
router.patch('/:id/status', carController.updateCarStatus);
router.post('/:id/like', carController.toggleCarLike);

module.exports = router;
