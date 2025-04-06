
const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Bir başlık girmelisiniz'],
    trim: true,
    maxlength: [100, 'Başlık 100 karakterden uzun olamaz']
  },
  description: {
    type: String,
    required: [true, 'Bir açıklama girmelisiniz'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Fiyat bilgisi zorunludur']
  },
  imageUrl: {
    type: String,
    default: 'default-car.jpg'
  },
  features: [String],
  year: {
    type: Number,
    required: [true, 'Araç yılı zorunludur']
  },
  mileage: {
    type: Number,
    required: [true, 'Kilometre bilgisi zorunludur']
  },
  location: {
    type: String,
    required: [true, 'Konum bilgisi zorunludur']
  },
  sellerId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'İlan bir kullanıcıya ait olmalıdır']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// İlan aramasını kolaylaştırmak için metin indeksi ekleme
listingSchema.index({ title: 'text', description: 'text' });

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
