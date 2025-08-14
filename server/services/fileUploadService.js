const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/receipts';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `receipt-${uniqueSuffix}${ext}`);
  }
});

// File filter to validate file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and PDF files are allowed.'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Middleware for single file upload
const uploadReceipt = upload.single('paymentReceipt');

// Helper function to validate file
const validateFile = (file) => {
  if (!file) {
    throw new Error('No file uploaded');
  }
  
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
  if (!allowedTypes.includes(file.mimetype)) {
    throw new Error('Invalid file type. Only JPEG, PNG, GIF, and PDF files are allowed.');
  }
  
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File size too large. Maximum size is 5MB.');
  }
  
  return true;
};

// Helper function to delete file
const deleteFile = (filename) => {
  const filepath = path.join('uploads/receipts', filename);
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }
};

module.exports = {
  uploadReceipt,
  validateFile,
  deleteFile
}; 