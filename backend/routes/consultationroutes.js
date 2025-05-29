const express = require('express');
const { createSchedule } = require('../controllers/schedulecontroller');

const router = express.Router();

// Create schedule
router.post('/api/schedule', createSchedule);

module.exports = router;
