const express = require('express');
const Registration = require('../models/Registration');
const Ticket = require('../models/Ticket');
const { sendPaymentConfirmation } = require('../services/emailService');
const { verifyAdminToken } = require('./adminAuth');
const router = express.Router();

// Apply admin authentication to protected routes only
// router.use(verifyAdminToken); // Removed global middleware

// Get dashboard statistics
router.get('/stats', verifyAdminToken, async (req, res) => {
  try {
    const totalCompanies = await Registration.countDocuments();
    const totalTickets = await Ticket.countDocuments();
    const pendingPayments = await Registration.countDocuments({ paymentStatus: 'pending' });
    const confirmedPayments = await Registration.countDocuments({ paymentStatus: 'completed' });
    const todayTickets = await Ticket.countDocuments({
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }
    });
    const checkedInTickets = await Ticket.countDocuments({ checkedIn: true });
    const inactiveTickets = await Ticket.countDocuments({ status: 'inactive' });

    res.json({
      stats: {
        totalCompanies,
        totalTickets,
        pendingPayments,
        confirmedPayments,
        todayTickets,
        checkedInTickets,
        inactiveTickets
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get all registered companies
router.get('/companies', verifyAdminToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    
    let query = {};
    
    if (status) {
      query.paymentStatus = status;
    }
    
    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { 'contactPerson.name': { $regex: search, $options: 'i' } },
        { 'contactPerson.email': { $regex: search, $options: 'i' } }
      ];
    }

    const companies = await Registration.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Registration.countDocuments(query);

    res.json({
      companies,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get companies error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get all ticket bookings
router.get('/tickets', verifyAdminToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } },
        { ticketNumber: { $regex: search, $options: 'i' } }
      ];
    }

    const tickets = await Ticket.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Ticket.countDocuments(query);

    res.json({
      tickets,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Approve company payment
router.patch('/companies/:id/approve-payment', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { adminNotes } = req.body;

    const company = await Registration.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    if (company.paymentStatus === 'completed') {
      return res.status(400).json({ message: 'Payment already confirmed.' });
    }

    company.paymentStatus = 'completed';
    company.adminNotes = adminNotes || '';
    company.confirmedAt = new Date();
    company.confirmedBy = req.admin._id;
    await company.save();

    // Send confirmation email
    try {
      await sendPaymentConfirmation(company);
    } catch (emailError) {
      console.error('Failed to send payment confirmation email:', emailError);
    }

    res.json({
      message: 'Payment approved successfully.',
      company
    });
  } catch (error) {
    console.error('Approve payment error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Reject company payment
router.patch('/companies/:id/reject-payment', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { adminNotes } = req.body;

    const company = await Registration.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    company.paymentStatus = 'failed';
    company.adminNotes = adminNotes || '';
    company.rejectedAt = new Date();
    company.rejectedBy = req.admin._id;
    await company.save();

    res.json({
      message: 'Payment rejected successfully.',
      company
    });
  } catch (error) {
    console.error('Reject payment error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Check-in ticket (admission)
router.post('/tickets/checkin', verifyAdminToken, async (req, res) => {
  try {
    const { ticketNumber } = req.body;

    if (!ticketNumber) {
      return res.status(400).json({ message: 'Ticket number is required.' });
    }

    const ticket = await Ticket.findOne({ ticketNumber });
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found.' });
    }

    if (ticket.status === 'cancelled') {
      return res.status(400).json({ message: 'Ticket has been cancelled.' });
    }

    if (ticket.checkedIn) {
      return res.status(400).json({ message: 'Ticket already checked in.' });
    }

    ticket.checkedIn = true;
    ticket.checkedInAt = new Date();
    ticket.checkedInBy = req.admin._id;
    ticket.status = 'active'; // Change status to active when checked in
    await ticket.save();

    res.json({
      message: 'Ticket checked in successfully.',
      ticket: {
        ticketNumber: ticket.ticketNumber,
        customerName: ticket.customerName,
        customerEmail: ticket.customerEmail,
        ticketType: ticket.ticketType,
        eventDate: ticket.eventDate,
        eventTime: ticket.eventTime,
        checkedInAt: ticket.checkedInAt
      }
    });
  } catch (error) {
    console.error('Check-in ticket error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Get ticket by number (more specific pattern)
router.get('/tickets/number/:ticketNumber', verifyAdminToken, async (req, res) => {
  try {
    const { ticketNumber } = req.params;

    const ticket = await Ticket.findOne({ ticketNumber });
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found.' });
    }

    res.json({ ticket });
  } catch (error) {
    console.error('Get ticket error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Cancel ticket
router.patch('/tickets/:id/cancel', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found.' });
    }

    if (ticket.status === 'cancelled') {
      return res.status(400).json({ message: 'Ticket already cancelled.' });
    }

    ticket.status = 'cancelled';
    ticket.cancellationReason = reason || '';
    ticket.cancelledAt = new Date();
    ticket.cancelledBy = req.admin._id;
    await ticket.save();

    res.json({
      message: 'Ticket cancelled successfully.',
      ticket
    });
  } catch (error) {
    console.error('Cancel ticket error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router; 