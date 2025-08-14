const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import Admin model
const Admin = require('../models/Admin');

async function updateAdminPassword() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find existing admin user
    const existingAdmin = await Admin.findOne({ email: 'realestategames2025@gmail.com' });
    if (!existingAdmin) {
      console.log('❌ Admin user not found');
      return;
    }

    // Update password
    const hashedPassword = await bcrypt.hash('admin@mary123', 12);
    existingAdmin.password = hashedPassword;
    await existingAdmin.save();

    console.log('✅ Admin password updated successfully!');
    console.log('📧 Email: realestategames2025@gmail.com');
    console.log('🔑 Password: admin@mary123');
    
  } catch (error) {
    console.error('❌ Error updating admin password:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the script
updateAdminPassword(); 