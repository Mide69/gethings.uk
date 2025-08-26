const express = require('express');
const { body, validationResult } = require('express-validator');
const Message = require('../models/Message');
const Business = require('../models/Business');
const auth = require('../middleware/auth');

const router = express.Router();

// Send message to vendor
router.post('/', auth, [
  body('businessId').notEmpty().withMessage('Business ID is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').notEmpty().withMessage('Message is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { businessId, subject, message } = req.body;

    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    const newMessage = new Message({
      sender: req.user._id,
      recipient: business.owner,
      business: businessId,
      subject,
      message
    });

    await newMessage.save();
    await newMessage.populate(['sender', 'recipient', 'business']);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get messages for current user
router.get('/', auth, async (req, res) => {
  try {
    const { type = 'received' } = req.query;
    
    let query = {};
    if (type === 'sent') {
      query.sender = req.user._id;
    } else {
      query.recipient = req.user._id;
    }

    const messages = await Message.find(query)
      .populate('sender', 'name email')
      .populate('recipient', 'name email')
      .populate('business', 'name')
      .sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark message as read
router.put('/:id/read', auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    message.read = true;
    await message.save();

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;