const Schedule = require('../models/consultation');

const createSchedule = async (req, res) => {
  try {
    const { date, time } = req.body;

    if (!date || !time) {
      return res.status(400).json({ message: 'Both date and time are required.' });
    }

    const newSchedule = new Schedule({ date, time });
    await newSchedule.save();

    res.status(201).json({ message: 'Schedule created successfully!', schedule: newSchedule });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createSchedule };
