// Health worker controller 
const HealthWorker = require('../models/healthworker');

// Get Health Worker Profile
const getHealthWorkerProfile = async (req, res) => {
  try {
    const healthWorker = await HealthWorker.findById(req.user.userId);
    if (!healthWorker) {
      return res.status(404).json({ message: 'Health Worker not found' });
    }
    res.status(200).json(healthWorker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update Health Worker Profile
const updateHealthWorkerProfile = async (req, res) => {
  const { username, email } = req.body;
  try {
    const healthWorker = await HealthWorker.findByIdAndUpdate(
      req.user.userId,
      { username, email },
      { new: true }
    );
    res.status(200).json(healthWorker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getHealthWorkerProfile, updateHealthWorkerProfile };
