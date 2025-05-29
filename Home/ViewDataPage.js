import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ViewDataPage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUserData = async () => {
    if (!name || !age) {
      setError('Please enter both name and age.');
      return;
    }

    setLoading(true);
    setError('');
    setUserData(null);

    try {
      const response = await fetch(`http://10.54.23.76:3000/api/patients?name=${name}&age=${age}`);
      const data = await response.json();

      if (response.ok) {
        setUserData(data);
      } else {
        setError(data.message || 'User not found.');
      }
    } catch (err) {
      setError('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>View Your Data</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={fetchUserData}>
        <Text style={styles.buttonText}>Fetch Data</Text>
      </TouchableOpacity>

      {loading && <Text style={styles.loadingText}>Loading...</Text>}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {userData && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Name: {userData.name}</Text>
          <Text style={styles.resultText}>Age: {userData.age}</Text>
          <Text style={styles.resultText}>Height: {userData.height} cm</Text>
          <Text style={styles.resultText}>Weight: {userData.weight} kg</Text>
          <Text style={styles.resultText}>Disease: {userData.disease || 'None'}</Text>
        </View>
      )}
    </View>
  );
};

export default ViewDataPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#29AB87',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#555',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
