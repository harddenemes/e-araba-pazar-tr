
const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

const router = express.Router();

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/forgotPassword', userController.forgotPassword);
router.patch('/resetPassword/:token', userController.resetPassword);

// Protected routes
router.use(authMiddleware.protect);

router.get('/me', userController.getCurrentUser);
router.patch('/updateMe', uploadMiddleware.uploadSingle, userController.updateUserProfile);
router.patch('/updatePassword', userController.updatePassword);
router.get('/myListings', userController.getUserListings);
router.get('/myFavorites', userController.getUserFavorites);
router.patch('/toggleTwoFactor', userController.toggleTwoFactor);

module.exports = router;
