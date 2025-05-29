// Import required modules
const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./backend_utils/mongoDBConnect');
const userRoutes = require('./routes/userroutes');
const nutritionistRoutes = require('./routes/nutritionistroutes');
const patientRoutes = require('./routes/patientroutes');
const consultationRoutes = require('./routes/consultationroutes');
const videoRoutes = require('./routes/videoroutes');
const { getUserProfile, createUser } = require('./controllers/usercontroller');
const { submitPatientData, getPatients } = require('./controllers/patientcontroller');
const { createSchedule } = require('./controllers/schedulecontroller');
const { createNutritionistProfile } = require('./controllers/nutritionistcontroller');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

// Route Registration
app.use('/api/users', userRoutes);
app.use('/api/nutritionists', nutritionistRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/video', videoRoutes);

// Default Route
app.get('/', (req, res) => res.send('API is running...'));
app.get('/api/users', getUserProfile);
app.post('/api/users', createUser);
app.post('/api/submit', submitPatientData);
app.post('/api/schedule', createSchedule);
app.post('/api/patients', submitPatientData);
app.get('/api/patients', getPatients);
app.post('/api/nutritionists', createNutritionistProfile);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});