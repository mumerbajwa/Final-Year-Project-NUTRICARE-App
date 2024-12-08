import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const EnterPatientData = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [disease, setDisease] = useState('');
  const [height, setHeight] = useState(''); // New state for height
  const [imageUri, setImageUri] = useState(null);

  const validateName = () => {
    const nameRegex = /^[a-zA-Z]+[a-zA-Z\s]*$/;
    if (!nameRegex.test(name)) {
      Alert.alert(
        'Invalid Name',
        'Name must contain only letters and spaces, but no spaces at the beginning.'
      );
      return false;
    }
    return true;
  };

  const validateAge = () => {
    if (!/^[1-7]$/.test(age)) {
      Alert.alert('Invalid Age', 'Age must be a number between 1 and 7.');
      return false;
    }
    return true;
  };

  const validateWeight = () => {
    if (!/^\d+$/.test(weight)) {
      Alert.alert('Invalid Weight', 'Weight must contain only digits in kilograms.');
      return false;
    }
    return true;
  };

  const validateDisease = () => {
    const diseaseRegex = /^[a-zA-Z]+[a-zA-Z\s]*$/;
    if (!diseaseRegex.test(disease)) {
      Alert.alert(
        'Invalid Disease',
        'Disease must contain only letters and spaces, but no spaces at the beginning.'
      );
      return false;
    }
    return true;
  };

  const validateHeight = () => {
    if (!/^\d+$/.test(height)) {
      Alert.alert('Invalid Height', 'Height must contain only digits in inches.');
      return false;
    }
    return true;
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const fileType = uri.split('.').pop();

      if (['png', 'jpg', 'jpeg'].includes(fileType)) {
        setImageUri(uri);
      } else {
        Alert.alert('Invalid Image', 'Please select a PNG, JPG, or JPEG image.');
      }
    }
  };

  const handleSubmit = () => {
    if (
      validateName() &&
      validateAge() &&
      validateWeight() &&
      validateDisease() &&
      validateHeight()
    ) {
      Alert.alert('Patient Data Submitted', 'All fields are valid!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Patient Data</Text>

      {/* Name */}
      <View style={styles.row}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Age */}
      <View style={styles.row}>
        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter age (1-7)"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
      </View>

      {/* Weight */}
      <View style={styles.row}>
        <Text style={styles.label}>Weight:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter weight (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
      </View>

      {/* Height */}
      <View style={styles.row}>
        <Text style={styles.label}>Height:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter height (inches)"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
        />
      </View>

      {/* Disease */}
      <View style={styles.row}>
        <Text style={styles.label}>Prior Medical History:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter disease"
          value={disease}
          onChangeText={setDisease}
        />
      </View>

      {/* Image Picker */}
      <View style={styles.row}>
        <Text style={styles.label}>Patient Picture:</Text>
        <TouchableOpacity
          style={[styles.input, styles.imagePickerButton]}
          onPress={handlePickImage}
        >
          <Text style={styles.imagePickerText}>
            {imageUri ? 'Change Image' : 'Pick an Image'}
          </Text>
        </TouchableOpacity>
      </View>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EnterPatientData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 45,
    color: '#333',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  label: {
    width: '35%',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
    padding: 10,
    backgroundColor: '#fff',
  },
  imagePickerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
  },
  imagePickerText: {
    color: '#333',
    textAlign: 'center',
  },
  imagePreview: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: 'center',
  },
  submitButton: {
    backgroundColor: '#29AB87',
    paddingVertical: 13,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    marginTop: 35,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});