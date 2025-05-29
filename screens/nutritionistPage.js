import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';

const NutritionistPage = ({ route, navigation }) => {
  const { username } = route.params; // Get username from previous screen
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const dayName = today.toLocaleString('default', { weekday: 'long' }); // Day name
    const formattedDate = today.toLocaleDateString(); // Date in MM/DD/YYYY format
    setCurrentDate(`${dayName}, ${formattedDate}`);
  }, []);

  // Dummy icons for the buttons (replace with actual icons/images as needed)
  const buttonIcons = [
    { id: 1, title: 'Edit Your Profile', icon: require('../assets/data_input.png') },
    { id: 2, title: 'Input Schedule Time', icon: require('../assets/schedule_icon.png') },
    { id: 3, title: 'Patient Data', icon: require('../assets/patient_data.png') },
    { id: 4, title: 'AI Adviser', icon: require('../assets/chatbot_icon.png') },
    { id: 5, title: 'Patient Report', icon: require('../assets/data_report.png') },
    { id: 6, title: 'Your Suggestions', icon: require('../assets/suggestion_icon.png') },
    { id: 7, title: 'Data 7', icon: require('../assets/dummy_icon.png') },
    { id: 8, title: 'Data 8', icon: require('../assets/dummy_icon.png') },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Hi, {username}</Text>
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('ProfilePage')} // Navigate to Profile Page
        >
          <Image
            source={require('../assets/profile.jpeg')} // Replace with actual image
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome Nutritionist</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>🔍</Text> {/* Add custom search icon */}
        </TouchableOpacity>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonGrid}>
        {buttonIcons.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.optionButton}
            onPress={() => navigation.navigate(item.title.replace(/\s+/g, ''), { username })}
          >
            <Image source={item.icon} style={styles.optionIcon} />
            <Text style={styles.optionText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default NutritionistPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 18,
  },
  dateText: {
    fontSize: 15,
    color: '#666',
    marginTop: 5,
  },
  profileButton: {
    marginTop: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  welcomeText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#29AB87',
    textAlign: 'center',
    marginVertical: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#29AB87',
    padding: 10,
    borderRadius: 12,
    marginLeft: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    width: '47%', // Adjust for two buttons per row with some spacing
    aspectRatio: 1, // Ensures the button is square
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6, // For Android shadow
  },
  optionIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  optionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});
