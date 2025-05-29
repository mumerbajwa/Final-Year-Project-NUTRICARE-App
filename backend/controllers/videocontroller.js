const axios = require('axios');
const { DAILY_API_KEY } = require('../backend_utils/dailyconfig');

const createVideoRoom = async (req, res) => {
    try {
        const response = await axios.post('https://api.daily.co/v1/rooms', {
            properties: {
                enable_screenshare: true,
                enable_chat: true,
                start_video_off: false,
                start_audio_off: false,
            },
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DAILY_API_KEY}`,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ error: 'Failed to create room' });
    }
};

const getRoomDetails = async (req, res) => {
    try {
        const { roomName } = req.params;
        const response = await axios.get(`https://api.daily.co/v1/rooms/${roomName}`, {
            headers: {
                'Authorization': `Bearer ${DAILY_API_KEY}`,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error getting room details:', error);
        res.status(500).json({ error: 'Failed to get room details' });
    }
};

module.exports = {
    createVideoRoom,
    getRoomDetails
}; 