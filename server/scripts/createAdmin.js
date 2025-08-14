const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

async function createDefaultAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@realestategames.com' });
    
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    // Create default admin
    const admin = new Admin({
      username: 'admin',
      email: 'admin@realestategames.com',
      password: 'admin123', // This will be hashed automatically
      role: 'super_admin'
    });

    await admin.save();
    console.log('Default admin created successfully');
    console.log('Email: admin@realestategames.com');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await mongoose.disconnect();
  }
}

createDefaultAdmin(); 