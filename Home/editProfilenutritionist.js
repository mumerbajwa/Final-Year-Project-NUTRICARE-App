<<<<<<< HEAD
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Alert, 
  Platform 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Use Expo ImagePicker for image selection

const EditProfileNutritionist = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');

  // Function to open image picker
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera is required!');
      return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Make it square
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  // Handle form submission
  const handleUpdate = async () => {
    if (!name || !dob || !experience || !bio) {
      Alert.alert('Please fill all fields');
      return;
    }
  
    try {
      const response = await axios.post('http://10.54.23.76:3000/api/nutritionists', {
        name,
        dob,
        experience,
        bio,
      });
  
      if (response.status === 200) {
        Alert.alert('Profile Updated Successfully!');
      } else {
        Alert.alert('Update Failed', 'Something went wrong, please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Check your network connection.');
    }
  };
  

  // Validate text input for name, experience, and bio
  const validateTextInput = (input, type) => {
    let regex;
    if (type === 'name' || type === 'bio') {
      regex = /^[a-zA-Z ]+$/; // Only letters and space
    } else if (type === 'experience') {
      regex = /^[a-zA-Z0-9 ]+$/; // Letters, numbers, and space
    }

    return regex.test(input);
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture Section - Commented Out */}
      {/*
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>+</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.label}>Profile Pic</Text>
      */}

      {/* Name Section */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => {
            if (validateTextInput(text, 'name')) setName(text);
          }}
          placeholder="Enter your name"
        />
      </View>

      {/* Date of Birth Section */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          value={dob}
          onChangeText={setDob}
          placeholder="Enter your Date of Birth"
          keyboardType="numeric"
        />
      </View>

      {/* Experience Section */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Experience</Text>
        <TextInput
          style={styles.input}
          value={experience}
          onChangeText={(text) => {
            if (validateTextInput(text, 'experience')) setExperience(text);
          }}
          placeholder="Enter your experience"
        />
      </View>

      {/* Bio Section */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={styles.input}
          value={bio}
          onChangeText={(text) => {
            if (validateTextInput(text, 'bio')) setBio(text);
          }}
          placeholder="Enter your bio"
        />
      </View>

      {/* Update Button */}
      <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imagePicker: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    fontSize: 36,
    color: '#fff',
  },
  label: {
    width: '35%',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 16,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  updateButton: {
    backgroundColor: '#29AB87',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 30,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfileNutritionist;
=======
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Alert, 
  Platform 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Use Expo ImagePicker for image selection

const EditProfileNutritionist = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');

  // Function to open image picker
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera is required!');
      return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Make it square
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  // Handle form submission
  const handleUpdate = () => {
    if (!name || !dob || !experience || !bio || !profileImage) {
      Alert.alert('Please fill all fields');
      return;
    }
    // Add your update logic here, for example, saving data or API call.
    Alert.alert('Profile Updated!');
  };

  // Validate text input for name, experience, and bio
  const validateTextInput = (input, type) => {
    let regex;
    if (type === 'name' || type === 'bio') {
      regex = /^[a-zA-Z ]+$/; // Only letters and space
    } else if (type === 'experience') {
      regex = /^[a-zA-Z0-9 ]+$/; // Letters, numbers, and space
    }

    return regex.test(input);
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture Section */}
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>+</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.label}>Profile Pic</Text>

      {/* Name Section */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => {
            if (validateTextInput(text, 'name')) setName(text);
          }}
          placeholder="Enter your name"
        />
      </View>

      {/* Date of Birth Section */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          value={dob}
          onChangeText={setDob}
          placeholder="Enter your Date of Birth"
          keyboardType="numeric"
        />
      </View>

      {/* Experience Section */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Experience</Text>
        <TextInput
          style={styles.input}
          value={experience}
          onChangeText={(text) => {
            if (validateTextInput(text, 'experience')) setExperience(text);
          }}
          placeholder="Enter your experience"
        />
      </View>

      {/* Bio Section */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={styles.input}
          value={bio}
          onChangeText={(text) => {
            if (validateTextInput(text, 'bio')) setBio(text);
          }}
          placeholder="Enter your bio"
        />
      </View>

      {/* Update Button */}
      <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imagePicker: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    fontSize: 36,
    color: '#fff',
  },
  label: {
    width: '35%',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 16,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  updateButton: {
    backgroundColor: '#29AB87',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 30,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfileNutritionist;
>>>>>>> ce0e048b4abc2314a5c6d0175b5c742b001797f2
