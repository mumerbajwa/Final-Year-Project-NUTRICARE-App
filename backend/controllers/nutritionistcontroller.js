const Nutritionist = require('../models/nutritionist');

// Create (Submit) Nutritionist Profile
const createNutritionistProfile = async (req, res) => {
    try {
        const { name, dob, experience, bio } = req.body;

        const newProfile = new Nutritionist({
            name,
            dob,
            experience,
            bio
        });

        await newProfile.save();
        res.status(201).json({
            message: 'Nutritionist profile submitted successfully',
            nutritionist: newProfile
        });

    } catch (error) {
        console.error('Error submitting profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Fetch (Get) Nutritionist Profile — This part is optional, for future use if needed.
const getNutritionistProfile = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: 'Email is required to fetch profile' });
        }

        const nutritionist = await Nutritionist.findOne({ email });

        if (!nutritionist) {
            return res.status(404).json({ message: 'Nutritionist profile not found' });
        }

        res.status(200).json(nutritionist);

    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// OPTIONAL (Commented Out) — Update Nutritionist Profile — Removed because you clarified this is not needed for now
/*
const updateNutritionistProfile = async (req, res) => {
    try {
        const { email } = req.query;
        const { name, dob, experience, bio } = req.body;

        const updatedProfile = await Nutritionist.findOneAndUpdate(
            { email },
            { name, dob, experience, bio },
            { new: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Nutritionist profile not found' });
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            nutritionist: updatedProfile
        });

    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
*/

module.exports = {
    createNutritionistProfile,
    getNutritionistProfile
    // updateNutritionistProfile (commented out for now)
};
