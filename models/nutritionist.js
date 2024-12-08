const mongoose = require('mongoose');

const nutritionistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: '' },
  dob: { type: Date },
  experience: { type: String },
  bio: { type: String },
});

module.exports = mongoose.model('Nutritionist', nutritionistSchema);
