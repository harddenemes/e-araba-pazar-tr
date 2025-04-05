
const express = require('express');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const securityController = require('../controllers/securityController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

const router = express.Router();

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protected routes
router.use(authMiddleware.protect);

// Profile routes
router.get('/me', profileController.getCurrentUser);
router.patch('/updateMe', uploadMiddleware.uploadSingle, profileController.updateUserProfile);
router.get('/myListings', profileController.getUserListings);
router.get('/myFavorites', profileController.getUserFavorites);

// Security routes
router.patch('/updatePassword', securityController.updatePassword);
router.patch('/toggleTwoFactor', securityController.toggleTwoFactor);

// Additional security routes
router.delete('/deleteAccount', securityController.deleteAccount);
router.post('/sendEmailVerification', securityController.sendEmailVerification);
router.patch('/verifyEmailChange', securityController.verifyEmailChange);

module.exports = router;
