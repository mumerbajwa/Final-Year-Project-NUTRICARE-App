// User routes 
const express = require('express');
const { createUser, getUserProfile, updateUserProfile } = require('../controllers/usercontroller');
const authMiddleware = require('../middleware/authmiddleware');

console.log("gggggggggggggggg")
const router = express.Router();
// Get User Profile
router.get('/api/users', authMiddleware, getUserProfile);

router.post('/api/users', authMiddleware, createUser);
// Update User Profile
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;
