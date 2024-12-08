const Nutritionist = require('../models/nutritionist');
const User = require('../models/user');
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profile-pics/'); // Directory to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only .jpeg, .jpg, and .png files are allowed.'));
  },
});

// Get Nutritionist Profile
const getNutritionistProfile = async (req, res) => {
  console.log("hellooasasa")
  try {
    const nutritionist = await User.findOne({email: req.query.email});
    if (!nutritionist) {
      return res.status(404).json({ message: 'Nutritionist not found' });
    }
    res.status(200).json(nutritionist);
  } catch (error) {
    console.error('Error fetching nutritionist profile:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update Nutritionist Profile
const updateNutritionistProfile = async (req, res) => {
  try {
    const { name, dob, experience, bio } = req.body;
    let updatedData = { name, dob, experience, bio };

    // If a new profile image is uploaded
    if (req.file) {
      const profileImagePath = `/uploads/profile-pics/${req.file.filename}`;
      updatedData.profileImage = profileImagePath;
    }

    // Update profile
    const nutritionist = await Nutritionist.findByIdAndUpdate(
      req.user.userId,
      updatedData,
      { new: true } // Return updated document
    );

    if (!nutritionist) {
      return res.status(404).json({ message: 'Nutritionist not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      nutritionist,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};





module.exports = {
  getNutritionistProfile,
  updateNutritionistProfile,
  upload, // Exporting multer upload middleware for routes
};
