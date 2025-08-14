const express = require('express');
const router = express.Router();

// In-memory storage for sponsors (in production, use MongoDB)
let sponsors = [];

// Get all sponsorship inquiries
router.get('/', (req, res) => {
  res.json(sponsors);
});

// Submit sponsorship inquiry
router.post('/', (req, res) => {
  try {
    const {
      companyName,
      contactPerson,
      email,
      phone,
      sponsorshipLevel,
      budget,
      message
    } = req.body;

    // Validation
    if (!companyName || !contactPerson || !email || !sponsorshipLevel) {
      return res.status(400).json({ 
        error: 'Please provide company name, contact person, email, and sponsorship level' 
      });
    }

    const sponsor = {
      id: Date.now().toString(),
      companyName,
      contactPerson,
      email,
      phone,
      sponsorshipLevel,
      budget: budget || 'Not specified',
      message: message || '',
      status: 'Pending',
      submittedAt: new Date()
    };

    sponsors.push(sponsor);

    res.status(201).json({
      message: 'Sponsorship inquiry submitted successfully!',
      sponsor
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update sponsorship status
router.patch('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const sponsor = sponsors.find(s => s.id === id);
    if (!sponsor) {
      return res.status(404).json({ error: 'Sponsorship inquiry not found' });
    }

    sponsor.status = status;
    sponsor.updatedAt = new Date();

    res.json({
      message: 'Status updated successfully!',
      sponsor
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 