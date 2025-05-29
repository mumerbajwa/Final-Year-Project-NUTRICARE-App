// Health worker model 
const mongoose = require('mongoose');

const healthWorkerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'healthWorker' },
});

module.exports = mongoose.model('HealthWorker', healthWorkerSchema);
