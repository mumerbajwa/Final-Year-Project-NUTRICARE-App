import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const validateEmail = (value) => {
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(value) ? '' : 'Invalid email address');
  };

  const validatePassword = (value) => {
    setPassword(value);
    const errors = [];
    if (value.length < 8) errors.push('At least 8 characters');
    if (!/[A-Z]/.test(value)) errors.push('One uppercase letter');
    if (!/[a-z]/.test(value)) errors.push('One lowercase letter');
    if (!/\d/.test(value)) errors.push('One number');
    if (!/[@$!%*?&]/.test(value)) errors.push('One special character (@$!%*?&)');
    setPasswordErrors(errors);
  };

  const handleSignUp = async () => {
    // Validate input fields
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }
  
    // Validate email format
    if (emailError) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }
  
    // Validate password strength
    if (passwordErrors.length > 0) {
      Alert.alert("Error", "Please ensure your password meets all conditions.");
      return;
    }
  
    // Confirm passwords match
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
  
    try {
      // Make a POST request to the backend API
      const response = await axios.post("http://10.54.23.76:3000/api/users", {
        email,
        password,
      });
  
      // Check if the user was created successfully
      if (response.status === 201) {
        //Alert.alert("Success", "Account created successfully!");
        navigation.navigate("Otpverification"); // Navigate to OTP verification page
      } else {
        Alert.alert("Error", response.data.message || "Something went wrong.");
      }
    } catch (error) {
      // Handle errors gracefully
      console.error("Signup error:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Server Error. Please try again later."
      );
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome!</Text>
      <Text style={styles.signupText}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={validateEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={validatePassword}
          secureTextEntry={hidePassword}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setHidePassword(!hidePassword)}
        >
          <Icon
            name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#333"
          />
        </TouchableOpacity>
      </View>
      {passwordErrors.length > 0 && (
        <Text style={styles.errorText}>- {passwordErrors[0]}</Text>
      )}

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={hideConfirmPassword}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
        >
          <Icon
            name={hideConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#333"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  signupText: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 10,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
  },
  eyeButton: {
    paddingHorizontal: 10,
  },
  signupButton: {
    backgroundColor: '#29AB87',
    paddingVertical: 12,
    width: '80%',
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 18,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
