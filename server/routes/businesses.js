const express = require('express');
const { body, validationResult } = require('express-validator');
const Business = require('../models/Business');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Get all businesses with search and filter
router.get('/', async (req, res) => {
  try {
    const { search, category, city, featured, page = 1, limit = 12 } = req.query;
    
    let query = {};
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (category && category !== 'all') {
      query.category = new RegExp(category, 'i');
    }
    
    if (city && city !== 'all') {
      query['location.city'] = new RegExp(city, 'i');
    }
    
    if (featured === 'true') {
      query.featured = true;
    }

    const businesses = await Business.find(query)
      .populate('owner', 'name email')
      .sort(featured === 'true' ? { featured: -1, createdAt: -1 } : { createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Business.countDocuments(query);

    res.json({
      businesses,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single business
router.get('/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('reviews.user', 'name');
    
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.json(business);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create business (vendors only)
router.post('/', auth, upload.single('image'), [
  body('name').notEmpty().withMessage('Business name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('postcode').notEmpty().withMessage('Postcode is required'),
  body('country').notEmpty().withMessage('Country is required')
], async (req, res) => {
  try {
    if (req.user.role !== 'vendor') {
      return res.status(403).json({ message: 'Only vendors can create businesses' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, category, city, postcode, phone, email, website, country } = req.body;

    const business = new Business({
      name,
      description,
      category,
      location: { city, postcode },
      contact: { phone, email, website },
      owner: req.user._id,
      image: req.file ? `/uploads/${req.file.filename}` : '',
      country
    });

    await business.save();
    await business.populate('owner', 'name email');

    res.status(201).json(business);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update business
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    if (business.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updates = { ...req.body };
    if (req.body.city || req.body.postcode) {
      updates.location = {
        city: req.body.city || business.location.city,
        postcode: req.body.postcode || business.location.postcode
      };
    }

    if (req.body.phone || req.body.email || req.body.website) {
      updates.contact = {
        phone: req.body.phone || business.contact.phone,
        email: req.body.email || business.contact.email,
        website: req.body.website || business.contact.website
      };
    }

    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    }

    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).populate('owner', 'name email');

    res.json(updatedBusiness);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete business
router.delete('/:id', auth, async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    if (business.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Business.findByIdAndDelete(req.params.id);
    res.json({ message: 'Business deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get vendor's businesses
router.get('/vendor/my-businesses', auth, async (req, res) => {
  try {
    if (req.user.role !== 'vendor') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const businesses = await Business.find({ owner: req.user._id })
      .sort({ createdAt: -1 });

    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;