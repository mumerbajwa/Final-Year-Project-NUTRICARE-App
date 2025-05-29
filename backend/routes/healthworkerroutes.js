// Health worker routes 
const express = require('express');
const { getHealthWorkerProfile, updateHealthWorkerProfile } = require('../controllers/healthworkercontroller');
const authMiddleware = require('../middleware/authmiddleware');

const router = express.Router();

// Get Health Worker Profile
router.get('/profile', authMiddleware, getHealthWorkerProfile);

// Update Health Worker Profile
router.put('/profile', authMiddleware, updateHealthWorkerProfile);

module.exports = router;
