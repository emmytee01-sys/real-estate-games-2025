const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  // Company Information
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  companyType: {
    type: String,
    required: [true, 'Company type is required'],
    enum: ['Real Estate Developer', 'Mortgage Company', 'Property Tech', 'Architecture Firm', 'Engineering Firm', 'Government Agency', 'Other']
  },
  companyAddress: {
    type: String,
    required: [true, 'Company address is required'],
    trim: true
  },
  companyWebsite: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, 'Please provide a valid website URL']
  },

  // Contact Person Information
  contactPerson: {
    name: {
      type: String,
      required: [true, 'Contact person name is required'],
      trim: true
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    }
  },

  // Team Information
  teamSize: {
    type: Number,
    required: [true, 'Team size is required'],
    min: [5, 'Minimum team size is 5'],
    max: [20, 'Maximum team size is 20'],
    default: 5
  },
  teamMembers: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    position: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    }
  }],

  // Sports Preferences
  preferredSports: [{
    type: String,
    enum: ['Football', 'Athletics', 'Tug of War', 'Basketball', 'Volleyball', 'Table Tennis']
  }],

  // Additional Information
  specialRequirements: {
    type: String,
    trim: true,
    maxlength: [500, 'Special requirements cannot exceed 500 characters']
  },
  dietaryRestrictions: [{
    type: String,
    enum: ['Vegetarian', 'Vegan', 'Halal', 'Kosher', 'Gluten-Free', 'None']
  }],

  // Application Package
  applicationPackage: {
    type: String,
    enum: ['Silver', 'Gold', 'Platinum'],
    required: [true, 'Application package is required']
  },
  packagePrice: {
    type: Number,
    required: [true, 'Package price is required']
  },
  
  // Sponsorship Interest
  sponsorshipInterest: {
    type: Boolean,
    default: false
  },
  sponsorshipLevel: {
    type: String,
    enum: ['Title Sponsor', 'Gold Sponsor', 'Silver Sponsor', 'Support Sponsor', 'None'],
    default: 'None'
  },

  // Status and Timestamps
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Confirmed'],
    default: 'Pending'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  paymentReference: {
    type: String,
    unique: true,
    default: function() {
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.random().toString(36).substring(2, 8).toUpperCase();
      return `REG${timestamp}${random}`;
    }
  },
  paymentDate: {
    type: Date
  },
  paymentReceipt: {
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  },

  // Marketing and Communication
  marketingConsent: {
    type: Boolean,
    default: false
  },
  newsletterSubscription: {
    type: Boolean,
    default: false
  },

  // Internal Notes
  adminNotes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
registrationSchema.index({ companyName: 1 });
registrationSchema.index({ 'contactPerson.email': 1 });
registrationSchema.index({ status: 1 });
registrationSchema.index({ registrationDate: -1 });

// Virtual for full contact person name
registrationSchema.virtual('contactPerson.fullName').get(function() {
  return this.contactPerson.name;
});

// Pre-save middleware to validate team size
registrationSchema.pre('save', function(next) {
  if (this.teamMembers && this.teamMembers.length > 0) {
    this.teamSize = this.teamMembers.length;
  } else if (this.teamSize === 0 || !this.teamSize) {
    // Set a default minimum team size if none provided
    this.teamSize = 5;
  }
  next();
});

module.exports = mongoose.model('Registration', registrationSchema); 