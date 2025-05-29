const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 7, // Age limit between 1 and 7
    },
    weight: {
      type: Number,
      required: true,
    },
    disease: {
      type: String,
      required: false,
      trim: true,
    },
    image: {
      type: String, // Path to the uploaded image
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Patient', patientSchema);
