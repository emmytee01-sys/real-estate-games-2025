const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Registration = require('../models/Registration');
const Ticket = require('../models/Ticket');
const Admin = require('../models/Admin');

async function clearDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear all collections
    console.log('🗑️ Clearing database...');
    
    const registrationResult = await Registration.deleteMany({});
    console.log(`📊 Deleted ${registrationResult.deletedCount} registrations`);
    
    const ticketResult = await Ticket.deleteMany({});
    console.log(`🎫 Deleted ${ticketResult.deletedCount} tickets`);
    
    const adminResult = await Admin.deleteMany({});
    console.log(`👤 Deleted ${adminResult.deletedCount} admin users`);

    console.log('✅ Database cleared successfully!');
    console.log('📝 Note: You will need to create a new admin user to access the admin panel.');
    
  } catch (error) {
    console.error('❌ Error clearing database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the script
clearDatabase(); 