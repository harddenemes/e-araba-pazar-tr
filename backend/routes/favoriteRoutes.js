
const express = require('express');
const favoriteController = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All favorite routes are protected
router.use(authMiddleware.protect);

router.get('/', favoriteController.getFavorites);
router.post('/:carId', favoriteController.toggleFavorite);
router.get('/:carId/status', favoriteController.checkFavoriteStatus);

module.exports = router;
