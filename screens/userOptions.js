import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

const UserOptions = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  // Validation Function
  const validateUsername = (value) => {
    const startsWithInvalid = /^[^a-zA-Z]/.test(value); // Doesn't start with a letter
    const containsInvalid = /[^a-zA-Z ]/.test(value); // Contains anything other than letters or spaces

    if (startsWithInvalid) {
      setError('Username must start with a letter.');
    } else if (containsInvalid) {
      setError('Username can only contain letters and spaces.');
    } else {
      setError('');
    }

    setUsername(value);
  };

  const handleNavigate = (role) => {
    if (!error && username) {
      navigation.navigate(role, { username }); // Pass 'username' to the next screen
    } else {
      Alert.alert('Error', 'Please enter a valid username.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username:</Text>

      {/* Input Field */}
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={validateUsername}
        placeholder="Enter your username"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate('NutritionistPage')}
      >
        <Text style={styles.buttonText}>I'm a Nutritionist</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate('HealthWorkerPage')}
      >
        <Text style={styles.buttonText}>I'm a Health Worker</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleNavigate('UserPage')}
      >
        <Text style={styles.buttonText}>I'm a User / Patient</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#29AB87',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
