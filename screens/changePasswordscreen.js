import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ChangePasswordPage = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleSubmit = () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }

    if (passwordErrors.length > 0) {
      Alert.alert('Error', 'Please ensure your password meets all conditions.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    Alert.alert('Success', 'Password changed successfully!');
    setPassword('');
    setConfirmPassword('');
    setPasswordErrors([]);

    // Navigate to the desired screen
    navigation.navigate('Login'); // Replace 'SuccessPage' with your target screen's name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a strong password"
          placeholderTextColor="#888"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={validatePassword}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* Display the first unmet password condition */}
      {passwordErrors.length > 0 && (
        <Text style={styles.errorText}>• {passwordErrors[0]}</Text>
      )}

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          placeholderTextColor="#888"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Icon
            name={showConfirmPassword ? 'eye-off' : 'eye'}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 18,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: '#29AB87',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 45,
    marginTop: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
