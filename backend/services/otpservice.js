// OTP service 
const nodemailer = require('nodemailer');

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

const sendOtp = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "abdullahliaquat115@gmail.com",
      pass: "tbyw bcol eumq xozu",
    },
  });

  const mailOptions = {
    from: "abdullahliaquat115@gmail.com",
    to: "f219632@cfd.nu.edu.pk",
    subject: 'OTP for Signup',
    text: `Your OTP for signup is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('OTP sent:', info.response);
    }
  });
};

module.exports = { generateOtp, sendOtp };
