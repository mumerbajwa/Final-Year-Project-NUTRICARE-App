const express = require('express');
const router = express.Router();
const { createVideoRoom, getRoomDetails } = require('../controllers/videocontroller');

// Create a new room
router.post('/create-room', createVideoRoom);

// Get room details
router.get('/room/:roomName', getRoomDetails);

module.exports = router; 