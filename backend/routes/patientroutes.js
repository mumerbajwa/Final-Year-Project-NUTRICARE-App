const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { submitPatientData, getPatients } = require('../controllers/patientcontroller');

const router = express.Router();

// Ensure the upload directory exists
const uploadDir = 'uploads/patient-images/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Directory to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only .jpeg, .jpg, and .png files are allowed.'));
  },
});

// Route to handle patient data submission
router.post('/api/submit', upload.single('image'), (req, res, next) => {
  submitPatientData(req, res).catch(next); // Ensures errors are properly handled
});

// Route to fetch all patients
router.get('/api/patients', (req, res, next) => {
  getPatients(req, res).catch(next);
});

// Global error handler for multer errors
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: `Multer error: ${err.message}` });
  }
  if (err.message.includes('Only .jpeg, .jpg, and .png files are allowed.')) {
    return res.status(400).json({ message: err.message });
  }
  next(err);
});

module.exports = router;
