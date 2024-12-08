// Authentication controller 
const User = require('../models/user');
const Nutritionist = require('../models/nutritionist');
const HealthWorker = require('../models/healthworker');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const otpService = require('../services/otpservice');

const signup = async (req, res) => {
  const { username, email, password, role } = req.body;
  
  try {
    const otp = otpService.generateOtp();
    const otpExpires = new Date();
    otpExpires.setMinutes(otpExpires.getMinutes() + 10); // OTP expires in 10 minutes

    let newUser;
    if (role === 'user') {
      newUser = new User({ username, email, password, role, otp, otpExpires });
    } else if (role === 'nutritionist') {
      newUser = new Nutritionist({ username, email, password });
    } else if (role === 'healthWorker') {
      newUser = new HealthWorker({ username, email, password });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;

    await newUser.save();
    
    otpService.sendOtp(email, otp); // Send OTP via email

    res.status(201).json({ message: 'User created. Please verify OTP to complete signup.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email }) || 
               await Nutritionist.findOne({ email }) || 
               await HealthWorker.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { signup, login };
