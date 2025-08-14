const express = require('express');
const router = express.Router();

// In-memory storage for contact messages (in production, use MongoDB)
let contactMessages = [];

// Get all contact messages (admin only)
router.get('/', (req, res) => {
  res.json(contactMessages);
});

// Submit contact form
router.post('/', (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message,
      phone,
      company
    } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        error: 'Please provide name, email, subject, and message' 
      });
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Please provide a valid email address' 
      });
    }

    const contactMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      phone: phone || '',
      company: company || '',
      status: 'Unread',
      submittedAt: new Date()
    };

    contactMessages.push(contactMessage);

    res.status(201).json({
      message: 'Message sent successfully! We will get back to you soon.',
      contactMessage
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark message as read
router.patch('/:id/read', (req, res) => {
  try {
    const { id } = req.params;

    const message = contactMessages.find(m => m.id === id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    message.status = 'Read';
    message.readAt = new Date();

    res.json({
      message: 'Message marked as read!',
      contactMessage: message
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete message
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;

    const messageIndex = contactMessages.findIndex(m => m.id === id);
    if (messageIndex === -1) {
      return res.status(404).json({ error: 'Message not found' });
    }

    contactMessages.splice(messageIndex, 1);

    res.json({ message: 'Message deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 