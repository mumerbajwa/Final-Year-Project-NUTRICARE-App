const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  nutritionistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nutritionist',
    required: false,
  },
  startingTime: {
    type: String,
    required: true,
  },
  endingTime: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);
