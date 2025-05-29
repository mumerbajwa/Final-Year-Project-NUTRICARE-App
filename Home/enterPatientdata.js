<<<<<<< HEAD
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { generateHealthReport } from '../utils/openaiConfig';

const EnterPatientData = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [disease, setDisease] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name is required.');
      return false;
    }
    if (!/^[a-zA-Z ]+$/.test(name)) {
      Alert.alert('Error', 'Name must contain only letters and spaces.');
      return false;
    }
    if (!age || isNaN(age) || age < 1 || age > 7) {
      Alert.alert('Error', 'Age must be a number between 1 and 7.');
      return false;
    }
    if (!weight || isNaN(weight) || weight <= 0) {
      Alert.alert('Error', 'Weight must be a positive number.');
      return false;
    }
    if (!height || isNaN(height) || height <= 0) {
      Alert.alert('Error', 'Height must be a positive number.');
      return false;
    }
    if (!disease.trim()) {
      Alert.alert('Error', 'Please specify any disease or enter "None" if there is none.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setReport(null);
  
    try {
      // Generate report using OpenAI
      const patientData = {
        name,
        age,
        height,
        weight,
        disease
      };
      
      const aiAnalysis = await generateHealthReport(patientData);
      setReport(aiAnalysis);
      setModalVisible(true);

      // Send data to database
      await fetch('http://10.54.23.76:3000/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          age: parseInt(age),
          weight: parseFloat(weight),
          height: parseFloat(height),
          disease,
          report: aiAnalysis,
        }),
      });
  
    } catch (error) {
      Alert.alert('Error', 'Failed to generate report or save data.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        <Text style={styles.title}>Enter Patient Data</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Enter Name" 
          value={name} 
          onChangeText={setName} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Enter Age (1-7)" 
          value={age} 
          onChangeText={setAge} 
          keyboardType="numeric" 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Enter Weight (kg)" 
          value={weight} 
          onChangeText={setWeight} 
          keyboardType="numeric" 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Enter Height (cm)" 
          value={height} 
          onChangeText={setHeight} 
          keyboardType="numeric" 
        />
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Any disease?" 
          value={disease} 
          onChangeText={setDisease}
          multiline={true}
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Generate Report</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#29AB87" style={styles.loader} />}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalScrollView}>
            <View style={styles.modalContent}>
              <Text style={styles.reportText}>{report}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#29AB87',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalScrollView: {
    width: '90%',
    maxHeight: '80%',
  },
  modalContent: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  reportText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    lineHeight: 24,
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '50%',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EnterPatientData;
=======
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
>>>>>>> ce0e048b4abc2314a5c6d0175b5c742b001797f2
