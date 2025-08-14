const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Registration = require('../models/Registration');
const { uploadReceipt, validateFile, deleteFile } = require('../services/fileUploadService');
const { sendRegistrationConfirmation, sendReceiptConfirmation } = require('../services/emailService');

// Get all registrations (with pagination and filtering)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, companyType, search } = req.query;
    
    let query = {};
    
    // Filter by status
    if (status) {
      query.status = status;
    }
    
    // Filter by company type
    if (companyType) {
      query.companyType = companyType;
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { 'contactPerson.name': { $regex: search, $options: 'i' } },
        { 'contactPerson.email': { $regex: search, $options: 'i' } }
      ];
    }
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }
    };
    
    const registrations = await Registration.find(query)
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit)
      .sort(options.sort)
      .exec();
    
    const total = await Registration.countDocuments(query);
    
    res.json({
      registrations,
      totalPages: Math.ceil(total / options.limit),
      currentPage: options.page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single registration by ID
router.get('/:id', async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    res.json(registration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new registration
router.post('/', async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    
    // Send confirmation email
    try {
      await sendRegistrationConfirmation(registration);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }
    
    res.status(201).json({
      message: 'Registration submitted successfully! Check your email for confirmation.',
      registration
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    res.status(500).json({ error: error.message });
  }
});

// Update registration
router.put('/:id', async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    
    res.json({
      message: 'Registration updated successfully!',
      registration
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    res.status(500).json({ error: error.message });
  }
});

// Delete registration
router.delete('/:id', async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    
    res.json({ message: 'Registration deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get registration statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await Registration.aggregate([
      {
        $group: {
          _id: null,
          totalRegistrations: { $sum: 1 },
          totalParticipants: { $sum: '$teamSize' },
          averageTeamSize: { $avg: '$teamSize' }
        }
      }
    ]);
    
    const statusStats = await Registration.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const companyTypeStats = await Registration.aggregate([
      {
        $group: {
          _id: '$companyType',
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.json({
      overview: stats[0] || { totalRegistrations: 0, totalParticipants: 0, averageTeamSize: 0 },
      statusBreakdown: statusStats,
      companyTypeBreakdown: companyTypeStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update registration status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['Pending', 'Approved', 'Rejected', 'Confirmed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    
    res.json({
      message: 'Status updated successfully!',
      registration
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload payment receipt
router.post('/:id/receipt', uploadReceipt, async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    
    // Validate file
    try {
      validateFile(req.file);
    } catch (fileError) {
      return res.status(400).json({ error: fileError.message });
    }
    
    // Delete old receipt if exists
    if (registration.paymentReceipt && registration.paymentReceipt.filename) {
      deleteFile(registration.paymentReceipt.filename);
    }
    
    // Update registration with receipt details
    registration.paymentReceipt = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      uploadDate: new Date()
    };
    
    // Update payment status to pending verification
    registration.paymentStatus = 'pending';
    
    await registration.save();
    
    // Send receipt confirmation email
    try {
      await sendReceiptConfirmation(registration);
    } catch (emailError) {
      console.error('Failed to send receipt confirmation email:', emailError);
    }
    
    res.json({
      message: 'Payment receipt uploaded successfully!',
      registration: {
        id: registration._id,
        paymentReceipt: registration.paymentReceipt,
        paymentStatus: registration.paymentStatus,
        paymentReference: registration.paymentReference
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get payment receipt
router.get('/:id/receipt', async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    
    if (!registration.paymentReceipt || !registration.paymentReceipt.filename) {
      return res.status(404).json({ error: 'No receipt found' });
    }
    
    const filepath = path.join(__dirname, '../uploads/receipts', registration.paymentReceipt.filename);
    
    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ error: 'Receipt file not found' });
    }
    
    res.sendFile(filepath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fix team size for existing registrations
router.patch('/:id/fix-team-size', async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    
    if (registration.teamSize < 5) {
      registration.teamSize = 5;
      await registration.save();
    }
    
    res.json({
      message: 'Team size fixed successfully!',
      registration: {
        id: registration._id,
        teamSize: registration.teamSize
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update payment status
router.patch('/:id/payment-status', async (req, res) => {
  try {
    const { paymentStatus, adminNotes } = req.body;
    
    if (!['pending', 'completed', 'failed'].includes(paymentStatus)) {
      return res.status(400).json({ error: 'Invalid payment status' });
    }
    
    const updateData = { paymentStatus };
    
    if (paymentStatus === 'completed') {
      updateData.paymentDate = new Date();
    }
    
    if (adminNotes) {
      updateData.adminNotes = adminNotes;
    }
    
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    
    res.json({
      message: 'Payment status updated successfully!',
      registration
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 