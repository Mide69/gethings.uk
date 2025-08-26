const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Business = require('./models/Business');
const sampleBusinesses = require('./data/sampleBusinesses');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Gethings API is running', status: 'OK' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/businesses', require('./routes/businesses'));
app.use('/api/messages', require('./routes/messages'));

// MongoDB connection with error handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gethings');
    console.log('Connected to MongoDB');
    await seedDatabase();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Seed database with sample data
const seedDatabase = async () => {
  try {
    const count = await Business.countDocuments();
    console.log(`Found ${count} existing businesses`);
    
    if (count === 0) {
      console.log('Seeding database with sample businesses...');
      await Business.insertMany(sampleBusinesses);
      const newCount = await Business.countDocuments();
      console.log(`Database seeded with ${newCount} businesses`);
    }
  } catch (error) {
    console.error('Database seeding error:', error);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});