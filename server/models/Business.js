const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: {
    city: { type: String, required: true },
    postcode: { type: String, required: true },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  image: { type: String, default: '' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  featured: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  country: { type: String, required: true }
}, { timestamps: true });

businessSchema.index({ 'location.city': 'text', name: 'text', category: 'text', description: 'text' });

module.exports = mongoose.model('Business', businessSchema);