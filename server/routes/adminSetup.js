const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const router = express.Router();

// Temporary admin setup endpoint - REMOVE AFTER USE
router.post('/setup', async (req, res) => {
  try {
    console.log('🔧 Setting up admin user...');
    
    // Check if admin already exists
    let admin = await Admin.findOne({ email: 'realestategames2025@gmail.com' });
    
    if (admin) {
      // Update existing admin
      const hashedPassword = await bcrypt.hash('admin@mary123', 12);
      admin.password = hashedPassword;
      admin.isActive = true;
      admin.role = 'super_admin';
      await admin.save();
      
      console.log('✅ Admin user updated successfully');
      res.json({
        success: true,
        message: 'Admin user updated successfully',
        email: 'realestategames2025@gmail.com',
        password: 'admin@mary123'
      });
    } else {
      // Create new admin
      const hashedPassword = await bcrypt.hash('admin@mary123', 12);
      admin = new Admin({
        username: 'admin',
        email: 'realestategames2025@gmail.com',
        password: hashedPassword,
        role: 'super_admin',
        isActive: true
      });
      await admin.save();
      
      console.log('✅ Admin user created successfully');
      res.json({
        success: true,
        message: 'Admin user created successfully',
        email: 'realestategames2025@gmail.com',
        password: 'admin@mary123'
      });
    }
  } catch (error) {
    console.error('❌ Error setting up admin:', error);
    res.status(500).json({
      success: false,
      message: 'Error setting up admin user',
      error: error.message
    });
  }
});

// Test admin login endpoint
router.post('/test-login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const admin = await Admin.findOne({
      $or: [{ username }, { email: username }],
      isActive: true
    });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    res.json({
      success: true,
      message: 'Login test successful',
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('❌ Error testing login:', error);
    res.status(500).json({
      success: false,
      message: 'Error testing login',
      error: error.message
    });
  }
});

module.exports = router; 