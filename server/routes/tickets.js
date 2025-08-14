const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const { sendTicketConfirmation, sendTicketReminder } = require('../services/emailService');

// Get all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ message: 'Error fetching tickets' });
  }
});

// Get ticket by ID
router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({ message: 'Error fetching ticket' });
  }
});

// Book a new ticket
router.post('/', async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      ticketType,
      ticketPrice,
      quantity,
      eventDate,
      eventTime,
      venue,
      seatNumbers,
      paymentMethod,
      specialRequests,
      dietaryRestrictions
    } = req.body;

    // Calculate total amount
    const totalAmount = ticketPrice * quantity;

    // Create new ticket
    const ticket = new Ticket({
      customerName,
      customerEmail,
      customerPhone,
      ticketType,
      ticketPrice,
      quantity,
      totalAmount,
      eventDate,
      eventTime,
      venue,
      seatNumbers: seatNumbers || [],
      paymentMethod,
      specialRequests,
      dietaryRestrictions: dietaryRestrictions || []
    });

    await ticket.save();

    // Send confirmation email
    try {
      await sendTicketConfirmation(ticket);
      ticket.emailSent = true;
      await ticket.save();
    } catch (emailError) {
      console.error('Failed to send ticket confirmation email:', emailError);
    }

    res.status(201).json({
      message: 'Ticket booked successfully! Check your email for confirmation.',
      ticket
    });
  } catch (error) {
    console.error('Error booking ticket:', error);
    res.status(500).json({ 
      message: 'Error booking ticket',
      error: error.message,
      details: error.errors || error
    });
  }
});

// Update ticket payment status
router.patch('/:id/payment', async (req, res) => {
  try {
    const { paymentStatus, paymentReference } = req.body;
    
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    ticket.paymentStatus = paymentStatus;
    if (paymentReference) {
      ticket.paymentReference = paymentReference;
    }

    await ticket.save();

    res.json({
      message: 'Payment status updated successfully',
      ticket
    });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ message: 'Error updating payment status' });
  }
});

// Cancel ticket
router.patch('/:id/cancel', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    ticket.status = 'cancelled';
    await ticket.save();

    res.json({
      message: 'Ticket cancelled successfully',
      ticket
    });
  } catch (error) {
    console.error('Error cancelling ticket:', error);
    res.status(500).json({ message: 'Error cancelling ticket' });
  }
});

// Get tickets by customer email
router.get('/customer/:email', async (req, res) => {
  try {
    const tickets = await Ticket.find({ 
      customerEmail: req.params.email 
    }).sort({ createdAt: -1 });
    
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching customer tickets:', error);
    res.status(500).json({ message: 'Error fetching customer tickets' });
  }
});

// Get ticket statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const totalTickets = await Ticket.countDocuments();
    const paidTickets = await Ticket.countDocuments({ paymentStatus: 'paid' });
    const pendingTickets = await Ticket.countDocuments({ paymentStatus: 'pending' });
    const totalRevenue = await Ticket.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      totalTickets,
      paidTickets,
      pendingTickets,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (error) {
    console.error('Error fetching ticket statistics:', error);
    res.status(500).json({ message: 'Error fetching ticket statistics' });
  }
});

module.exports = router; 