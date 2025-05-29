import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
<<<<<<< HEAD
  Alert
=======
>>>>>>> ce0e048b4abc2314a5c6d0175b5c742b001797f2
} from 'react-native';

const OtpVerificationScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically move to the next input
    if (value && index < 3) {
      const nextInput = index + 1;
      inputs[nextInput]?.focus();
    }
  };

  const inputs = [];

  const handleVerify = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 4) {
      console.log('OTP entered:', otpValue);
<<<<<<< HEAD
      Alert.alert("Success", "Account created successfully!");
=======
      
>>>>>>> ce0e048b4abc2314a5c6d0175b5c742b001797f2
      // Navigate to the next screen
      navigation.navigate('UserOptions'); // Replace 'UserOptions' with your target screen name
    } else {
      alert('Please enter a valid 4-digit OTP.');
    }
  };

  const handleResendOtp = () => {
    console.log('Resend OTP');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText}>&larr;</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Verify Email</Text>
      <Text style={styles.subtitle}>
        Enter the OTP code sent to your email
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            ref={(input) => (inputs[index] = input)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleResendOtp}>
        <Text style={styles.resendText}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 10,
    marginBottom: 20,
  },
  backText: {
    fontSize: 24,
    color: '#333',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#fff',
    color: '#333',
    marginBottom: 15,
  },
  verifyButton: {
    backgroundColor: '#29AB87',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 16,
    marginBottom: 25,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendText: {
    fontSize: 14,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});
