
const mongoose = require('mongoose');

const chargingStationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A charging station must have a name'],
    trim: true
  },
  operator: {
    type: String,
    required: [true, 'A charging station must have an operator']
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      required: [true, 'A charging station must have coordinates']
    },
    address: {
      type: String,
      required: [true, 'A charging station must have an address']
    },
    city: {
      type: String,
      required: [true, 'A charging station must have a city']
    }
  },
  chargePoints: [
    {
      type: {
        type: String,
        required: [true, 'A charge point must have a type']
      },
      power: {
        type: Number,
        required: [true, 'A charge point must have a power rating']
      },
      status: {
        type: String,
        enum: ['available', 'occupied', 'offline', 'maintenance'],
        default: 'available'
      }
    }
  ],
  amenities: [String],
  pricing: {
    type: String,
    required: [true, 'A charging station must have pricing information']
  },
  openingHours: {
    type: String,
    default: '24/7'
  },
  photos: [String]
}, {
  timestamps: true
});

// Index for geospatial queries
chargingStationSchema.index({ 'location.coordinates': '2dsphere' });

const ChargingStation = mongoose.model('ChargingStation', chargingStationSchema);

module.exports = ChargingStation;
