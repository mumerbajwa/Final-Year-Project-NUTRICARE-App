const mongoose = require('mongoose');

const nutritionistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date },
    experience: { type: String },
    bio: { type: String },
});

module.exports = mongoose.model('Nutritionist', nutritionistSchema);
