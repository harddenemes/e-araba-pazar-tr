
const mongoose = require('mongoose');
const { calculateBatteryHealth } = require('../utils/carUtils');

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, 'A car must have a brand']
  },
  model: {
    type: String,
    required: [true, 'A car must have a model']
  },
  year: {
    type: Number,
    required: [true, 'A car must have a year']
  },
  price: {
    type: Number,
    required: [true, 'A car must have a price']
  },
  km: {
    type: Number,
    required: [true, 'A car must have kilometers']
  },
  range: {
    new: {
      type: Number,
      required: [true, 'A car must have a new range']
    },
    current: {
      type: Number,
      required: [true, 'A car must have a current range']
    }
  },
  batteryCapacity: {
    type: Number,
    required: [true, 'A car must have a battery capacity']
  },
  chargeTypes: {
    type: [String],
    required: [true, 'A car must have at least one charge type']
  },
  location: {
    type: String,
    required: [true, 'A car must have a location']
  },
  images: {
    type: [String],
    required: [true, 'A car must have at least one image']
  },
  description: {
    type: String,
    required: [true, 'A car must have a description']
  },
  sellerId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A car must belong to a seller']
  },
  sellerName: String,
  sellerPhone: String,
  sellerEmail: String,
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'sold', 'suspended'],
    default: 'pending'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual property for battery health
carSchema.virtual('batteryHealth').get(function() {
  return calculateBatteryHealth(this.km, this.range.new);
});

// Index for search
carSchema.index({ brand: 'text', model: 'text', description: 'text', location: 'text' });

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
