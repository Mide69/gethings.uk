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
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static('uploads'));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Gethings API is running', 
    status: 'OK',
    endpoints: ['/api/auth', '/api/businesses', '/api/messages']
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/businesses', require('./routes/businesses'));
app.use('/api/messages', require('./routes/messages'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Database connection and seeding
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://demo:demo123@cluster0.mongodb.net/gethings?retryWrites=true&w=majority';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
    await seedDatabase();
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.log('⚠️  Running without database - API will have limited functionality');
    // Don't exit, continue without database
  }
};

const seedDatabase = async () => {
  try {
    const count = await Business.countDocuments();
    console.log(`📊 Found ${count} existing businesses`);
    
    if (count === 0) {
      console.log('🌱 Seeding database with sample businesses...');
      await Business.insertMany(sampleBusinesses);
      const newCount = await Business.countDocuments();
      console.log(`✅ Database seeded with ${newCount} businesses`);
    }
  } catch (error) {
    console.error('❌ Database seeding error:', error);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}`);
});