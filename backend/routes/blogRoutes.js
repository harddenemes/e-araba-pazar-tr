
const express = require('express');
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

const router = express.Router();

// Public routes
router.get('/', blogController.getAllBlogPosts);
router.get('/tags', blogController.getUniqueTags);
router.get('/filter', blogController.filterBlogPosts);
router.get('/:id', blogController.getBlogPostById);
router.get('/:id/similar', blogController.getSimilarPosts);

// Admin only routes
router.use(authMiddleware.protect);
router.use(authMiddleware.restrictTo('admin'));

router.post('/', uploadMiddleware.uploadSingle, blogController.createBlogPost);
router.patch('/:id', uploadMiddleware.uploadSingle, blogController.updateBlogPost);
router.delete('/:id', blogController.deleteBlogPost);

module.exports = router;
