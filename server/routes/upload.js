const express = require('express');
const router = express.Router();
const { uploadSingle, uploadMultiple, handleUploadError, getFileUrl } = require('../services/uploadService');

// Upload single file
router.post('/single', (req, res) => {
  uploadSingle(req, res, (err) => {
    if (err) {
      return handleUploadError(err, req, res, () => {});
    }
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    res.json({
      message: 'File uploaded successfully!',
      file: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        url: getFileUrl(req.file.filename)
      }
    });
  });
});

// Upload multiple files
router.post('/multiple', (req, res) => {
  uploadMultiple(req, res, (err) => {
    if (err) {
      return handleUploadError(err, req, res, () => {});
    }
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    
    const files = req.files.map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      url: getFileUrl(file.filename)
    }));
    
    res.json({
      message: `${files.length} files uploaded successfully!`,
      files
    });
  });
});

// Get file info
router.get('/:filename', (req, res) => {
  const { filename } = req.params;
  const fileUrl = getFileUrl(filename);
  
  if (!fileUrl) {
    return res.status(404).json({ error: 'File not found' });
  }
  
  res.json({
    filename,
    url: fileUrl
  });
});

module.exports = router; 