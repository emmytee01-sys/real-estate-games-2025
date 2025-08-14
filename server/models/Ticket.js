const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketNumber: {
    type: String,
    unique: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  ticketType: {
    type: String,
    enum: ['VIP', 'Premium', 'Standard', 'Student'],
    required: true
  },
  ticketPrice: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  totalAmount: {
    type: Number,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  eventTime: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  seatNumbers: [{
    type: String
  }],
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['bank_transfer', 'card', 'cash', 'free'],
    required: true
  },
  paymentReference: {
    type: String
  },
  specialRequests: {
    type: String
  },
  dietaryRestrictions: [{
    type: String
  }],
          status: {
          type: String,
          enum: ['inactive', 'active', 'cancelled', 'refunded'],
          default: 'inactive'
        },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  emailSent: {
    type: Boolean,
    default: false
  },
  checkedIn: {
    type: Boolean,
    default: false
  },
  checkedInAt: {
    type: Date
  },
  checkedInBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true
});

// Generate ticket number before saving
ticketSchema.pre('save', function(next) {
  if (!this.ticketNumber) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.ticketNumber = `TKT${timestamp}${random}`;
  }
  next();
});

module.exports = mongoose.model('Ticket', ticketSchema); 