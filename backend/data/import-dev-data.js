
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Car = require('../models/Car');
const BlogPost = require('../models/BlogPost');
const ChargingStation = require('../models/ChargingStation');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Read data files
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const cars = JSON.parse(fs.readFileSync(`${__dirname}/cars.json`, 'utf-8'));
const blogPosts = JSON.parse(fs.readFileSync(`${__dirname}/blogPosts.json`, 'utf-8'));
const chargingStations = JSON.parse(fs.readFileSync(`${__dirname}/chargingStations.json`, 'utf-8'));

// Import data into DB
const importData = async () => {
  try {
    await User.create(users, { validateBeforeSave: false });
    await Car.create(cars);
    await BlogPost.create(blogPosts);
    await ChargingStation.create(chargingStations);
    
    console.log('Data successfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

// Delete all data from DB
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Car.deleteMany();
    await BlogPost.deleteMany();
    await ChargingStation.deleteMany();
    
    console.log('Data successfully deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Please specify --import or --delete');
  process.exit();
}
