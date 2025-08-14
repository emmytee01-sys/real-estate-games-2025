const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import Admin model
const Admin = require('../models/Admin');

async function createProductionAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'realestategames2025@gmail.com' });
    if (existingAdmin) {
      console.log('⚠️ Admin user already exists');
      return;
    }

    // Create new admin user
    const hashedPassword = await bcrypt.hash('admin@mary123', 12);
    
    const newAdmin = new Admin({
      username: 'admin',
      email: 'realestategames2025@gmail.com',
      password: hashedPassword,
      role: 'super_admin',
      isActive: true
    });

    await newAdmin.save();
    console.log('✅ Production admin user created successfully!');
    console.log('📧 Email: realestategames2025@gmail.com');
    console.log('🔑 Password:admin@mary123');
    console.log('⚠️ Please change this password after first login!');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the script
createProductionAdmin(); 