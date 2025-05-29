const express = require('express');
const {
  getNutritionistProfile,
  updateNutritionistProfile,
  upload,
} = require('../controllers/nutritionistcontroller');
const authMiddleware = require('../middleware/authmiddleware');

const router = express.Router();

// Get Nutritionist Profile
router.get('/api/nutritionist', authMiddleware, getNutritionistProfile);

// Update Nutritionist Profile
router.put(
  '/profile',
  authMiddleware,
  upload.single('profileImage'), // Multer middleware for profile image upload
  updateNutritionistProfile
);

module.exports = router;
