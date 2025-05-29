const User = require('../models/user');
const bcrypt = require('bcryptjs');  // Import bcrypt


const getUserProfile = async (req, res) => {
  try {
    const { email, password } = req.query; // Use req.body to get the email and password

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found." });
    }

    // Compare the entered password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials. Please try again." });
    }

    // Successful login
    res.status(200).json({
      message: "Login successful.",
      user: { email: existingUser.email }, // You can send additional user info if needed
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error." });
  }
};



// Create User Profile
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body; // Use req.body to extract data

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // The second parameter is the salt rounds

    // Create and save a new user with the hashed password
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully.", user: { email: newUser.email } });
  } catch (error) {
    console.error("Error in creating user:", error);
    res.status(500).json({ message: "Server Error." });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { username, email },
      { new: true } // `new: true` ensures we return the updated user object
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getUserProfile, createUser, updateUserProfile };
