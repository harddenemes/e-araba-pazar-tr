
const Listing = require('../models/Listing');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Tüm ilanları getir
exports.getAllListings = catchAsync(async (req, res, next) => {
  // Basit filtreleme
  let filter = { isActive: true };
  
  // Arama işlevi
  if (req.query.search) {
    filter.$text = { $search: req.query.search };
  }
  
  // Fiyat aralığı filtresi
  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};
    if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
  }
  
  // Yıl aralığı filtresi
  if (req.query.minYear || req.query.maxYear) {
    filter.year = {};
    if (req.query.minYear) filter.year.$gte = Number(req.query.minYear);
    if (req.query.maxYear) filter.year.$lte = Number(req.query.maxYear);
  }
  
  const listings = await Listing.find(filter)
    .populate('sellerId', 'name email')
    .sort({ createdAt: -1 });
  
  res.status(200).json({
    status: 'success',
    results: listings.length,
    data: {
      listings
    }
  });
});

// Tek bir ilanı ID'ye göre getir
exports.getListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id).populate('sellerId', 'name email');
  
  if (!listing) {
    return next(new AppError('Bu ID ile ilan bulunamadı', 404));
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      listing
    }
  });
});

// Yeni ilan oluştur
exports.createListing = catchAsync(async (req, res, next) => {
  // Kullanıcı ID'sini ekle
  req.body.sellerId = req.user.id;
  
  const newListing = await Listing.create(req.body);
  
  res.status(201).json({
    status: 'success',
    data: {
      listing: newListing
    }
  });
});

// İlanı güncelle
exports.updateListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  
  if (!listing) {
    return next(new AppError('Bu ID ile ilan bulunamadı', 404));
  }
  
  // Kullanıcı kendi ilanını mı güncelliyor kontrol et
  if (listing.sellerId.toString() !== req.user.id) {
    return next(new AppError('Sadece kendi ilanlarınızı güncelleyebilirsiniz', 403));
  }
  
  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );
  
  res.status(200).json({
    status: 'success',
    data: {
      listing: updatedListing
    }
  });
});

// İlanı sil
exports.deleteListing = catchAsync(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  
  if (!listing) {
    return next(new AppError('Bu ID ile ilan bulunamadı', 404));
  }
  
  // Kullanıcı kendi ilanını mı siliyor kontrol et
  if (listing.sellerId.toString() !== req.user.id) {
    return next(new AppError('Sadece kendi ilanlarınızı silebilirsiniz', 403));
  }
  
  await Listing.findByIdAndDelete(req.params.id);
  
  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Kullanıcının kendi ilanlarını getir
exports.getMyListings = catchAsync(async (req, res, next) => {
  const listings = await Listing.find({ sellerId: req.user.id });
  
  res.status(200).json({
    status: 'success',
    results: listings.length,
    data: {
      listings
    }
  });
});
