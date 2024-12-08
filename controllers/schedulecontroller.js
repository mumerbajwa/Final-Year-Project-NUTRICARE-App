const Schedule = require('../models/consultation');

const createSchedule = async (req, res) => {
  try {
    const { nutritionistId, startingTime, endingTime } = req.query;

    if (!startingTime || !endingTime) {
      return res.status(400).json({ message: 'Both starting and ending times are required.' });
    }

    const newSchedule = new Schedule({ nutritionistId, startingTime, endingTime });
    await newSchedule.save();

    res.status(201).json({ message: 'Schedule created successfully!', schedule: newSchedule });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createSchedule };
