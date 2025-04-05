
const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A blog post must have a title'],
    trim: true
  },
  summary: {
    type: String,
    required: [true, 'A blog post must have a summary'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'A blog post must have content']
  },
  author: {
    type: String,
    required: [true, 'A blog post must have an author']
  },
  authorTitle: String,
  coverImage: {
    type: String,
    required: [true, 'A blog post must have a cover image']
  },
  tags: {
    type: [String],
    required: [true, 'A blog post must have at least one tag']
  },
  readTimeMinutes: {
    type: Number,
    default: function() {
      // Average reading speed is about 200 words per minute
      const wordCount = this.content.split(/\s+/).length;
      return Math.ceil(wordCount / 200);
    }
  },
  publishDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for search
blogPostSchema.index({ title: 'text', summary: 'text', content: 'text', tags: 'text' });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
