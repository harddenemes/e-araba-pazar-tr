
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A favorite must belong to a user']
  },
  carId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Car',
    required: [true, 'A favorite must reference a car']
  }
}, {
  timestamps: true
});

// Compound index to ensure a user can only favorite a car once
favoriteSchema.index({ userId: 1, carId: 1 }, { unique: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
