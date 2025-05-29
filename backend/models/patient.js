const mongoose = require('mongoose');
const { report } = require('../routes/userroutes');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true, min: 1, max: 7 },
    weight: { type: Number, required: true },
    height: { type: Number, required: true }, 
    disease: { type: String },
    p_report: { type: String, default: '' }
});

module.exports = mongoose.model('Patient', patientSchema);
