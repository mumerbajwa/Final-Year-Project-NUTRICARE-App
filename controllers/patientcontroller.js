const Patient = require('../models/patient');

// Submit Patient Data
const submitPatientData = async (req, res) => {
  try {
    const { name, age, weight, disease } = req.query;

    // Basic validation
    if (!name || !age || !weight || !disease) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    if (!/^[a-zA-Z]+[a-zA-Z\s]*$/.test(name)) {
      return res.status(400).json({ message: 'Invalid name format.' });
    }
    if (!(Number(age) >= 1 && Number(age) <= 7)) {
      return res.status(400).json({ message: 'Age must be between 1 and 7.' });
    }
    if (!/^\d+$/.test(weight)) {
      return res.status(400).json({ message: 'Weight must be a valid number.' });
    }
    if (!/^[a-zA-Z]+[a-zA-Z\s]*$/.test(disease)) {
      return res.status(400).json({ message: 'Invalid disease format.' });
    }

    // Prepare patient data
    const patientData = {
      name,
      age: Number(age),
      weight: Number(weight),
      disease,
    };

    // Add image URL if uploaded
    /*if (req.file) {
      patientData.image = `/uploads/patient-images/${req.file.filename}`;
    }*/

    // Save patient data in the database
    const newPatient = new Patient(patientData);
    await newPatient.save();

    res.status(201).json({ message: 'Patient data submitted successfully.', patient: newPatient });
  } catch (error) {
    console.error('Error submitting patient data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  submitPatientData,
};
