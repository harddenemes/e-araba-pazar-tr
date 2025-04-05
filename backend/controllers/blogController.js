
const BlogPost = require('../models/BlogPost');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllBlogPosts = catchAsync(async (req, res, next) => {
  // BUILD QUERY
  const features = new APIFeatures(BlogPost.find(), req.query)
    .filter()
    .search()
    .sort()
    .limitFields()
    .paginate();

  // EXECUTE QUERY
  const blogPosts = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    success: true,
    results: blogPosts.length,
    data: blogPosts
  });
});

exports.getBlogPostById = catchAsync(async (req, res, next) => {
  const blogPost = await BlogPost.findById(req.params.id);

  if (!blogPost) {
    return next(new AppError('No blog post found with that ID', 404));
  }

  res.status(200).json({
    success: true,
    data: blogPost
  });
});

exports.createBlogPost = catchAsync(async (req, res, next) => {
  // Only admins can create blog posts
  if (req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to create blog posts', 403));
  }

  const newBlogPost = await BlogPost.create(req.body);

  res.status(201).json({
    success: true,
    data: newBlogPost
  });
});

exports.updateBlogPost = catchAsync(async (req, res, next) => {
  // Only admins can update blog posts
  if (req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to update blog posts', 403));
  }

  const blogPost = await BlogPost.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!blogPost) {
    return next(new AppError('No blog post found with that ID', 404));
  }

  res.status(200).json({
    success: true,
    data: blogPost
  });
});

exports.deleteBlogPost = catchAsync(async (req, res, next) => {
  // Only admins can delete blog posts
  if (req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to delete blog posts', 403));
  }

  const blogPost = await BlogPost.findByIdAndDelete(req.params.id);

  if (!blogPost) {
    return next(new AppError('No blog post found with that ID', 404));
  }

  res.status(204).json({
    success: true,
    data: null
  });
});

exports.filterBlogPosts = catchAsync(async (req, res, next) => {
  const { searchTerm, tag } = req.query;
  let query = {};

  if (searchTerm) {
    query.$text = { $search: searchTerm };
  }

  if (tag) {
    query.tags = tag;
  }

  const blogPosts = await BlogPost.find(query);

  res.status(200).json({
    success: true,
    results: blogPosts.length,
    data: blogPosts
  });
});

exports.getUniqueTags = catchAsync(async (req, res, next) => {
  const tags = await BlogPost.aggregate([
    { $unwind: '$tags' },
    { $group: { _id: '$tags' } },
    { $sort: { _id: 1 } },
    { $project: { _id: 0, tag: '$_id' } }
  ]);

  res.status(200).json({
    success: true,
    data: tags.map(item => item.tag)
  });
});

exports.getSimilarPosts = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { limit = 3 } = req.query;

  // Find the current post
  const currentPost = await BlogPost.findById(id);

  if (!currentPost) {
    return next(new AppError('No blog post found with that ID', 404));
  }

  // Find posts with similar tags
  const similarPosts = await BlogPost.aggregate([
    // Exclude current post
    { $match: { _id: { $ne: currentPost._id } } },
    // Unwind tags
    { $unwind: '$tags' },
    // Match posts with tags in current post
    { $match: { tags: { $in: currentPost.tags } } },
    // Group by post ID and count matching tags
    {
      $group: {
        _id: '$_id',
        title: { $first: '$title' },
        summary: { $first: '$summary' },
        coverImage: { $first: '$coverImage' },
        publishDate: { $first: '$publishDate' },
        tags: { $first: '$tags' },
        similarityScore: { $sum: 1 }
      }
    },
    // Sort by similarity score
    { $sort: { similarityScore: -1, publishDate: -1 } },
    // Limit results
    { $limit: parseInt(limit) }
  ]);

  res.status(200).json({
    success: true,
    results: similarPosts.length,
    data: similarPosts
  });
});
