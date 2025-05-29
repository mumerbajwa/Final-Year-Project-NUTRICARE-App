const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return !isNaN(new Date(value).getTime()); // Ensures it's a valid date
      },
      message: "Invalid date format!",
    },
  },
  time: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^(0?[1-9]|1[0-2]):[0-5][0-9] ?(AM|PM|am|pm)$/i.test(value); // Ensures time format like "3:30 PM"
      },
      message: "Invalid time format! Use HH:MM AM/PM",
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);
