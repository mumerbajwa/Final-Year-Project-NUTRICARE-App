const express = require('express');
const {
    createNutritionistProfile,
    getNutritionistProfile,
} = require('../controllers/nutritionistcontroller');

const router = express.Router();

// Route for creating/submitting nutritionist profile
router.post('/api/nutritionists', createNutritionistProfile);

// Optional - Fetch nutritionist profile (if needed later)
router.get('/profile', getNutritionistProfile);

module.exports = router;
