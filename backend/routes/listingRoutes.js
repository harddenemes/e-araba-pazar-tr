
const express = require('express');
const listingController = require('../controllers/listingController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Herkese açık rotalar
router.get('/', listingController.getAllListings);
router.get('/:id', listingController.getListing);

// Kimlik doğrulama gerektiren rotalar
router.use(authMiddleware.protect);

router.get('/user/mylistings', listingController.getMyListings);
router.post('/', listingController.createListing);
router.put('/:id', listingController.updateListing);
router.delete('/:id', listingController.deleteListing);

module.exports = router;
