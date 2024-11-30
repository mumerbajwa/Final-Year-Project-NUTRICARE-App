import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';

const UserPage = ({ route, navigation }) => {
  const { username } = route.params; // Get username from previous screen

  // Dummy icon for the buttons (replace with actual icons/images as needed)
  const buttonIcon = require('../assets/dummy_icon.png'); // Replace with actual image
  const buttonIcon1 = require('../assets/data_input.png')
  const buttonIcon2 = require('../assets/view_data.png')
  const buttonIcon3 = require('../assets/doctor_icon.png')
  const buttonIcon4 = require('../assets/chatbot_icon.png')
  const buttonIcon5 = require('../assets/data_report.png')
  const buttonIcon6 = require('../assets/suggestion_icon.png')

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.greetingText}>Hi, {username}</Text> 
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
        {[
          { id: 1, title: 'Enter the Data', icon: buttonIcon1 },
          { id: 2, title: 'View your Data', icon: buttonIcon2 },
          { id: 3, title: 'Find the Nutritionist', icon: buttonIcon3 },
          { id: 4, title: 'AI Adviser', icon: buttonIcon4 },
          { id: 5, title: 'Check your Report', icon: buttonIcon5 },
          { id: 6, title: 'Health Worker Suggestions', icon: buttonIcon6 },
          { id: 7, title: 'data  7', icon: buttonIcon },
          { id: 8, title: 'data  8', icon: buttonIcon },
        ].map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.optionButton}
            onPress={() => console.log(`${item.title} clicked`)}
          >
            <Image source={item.icon} style={styles.optionIcon} />
            <Text style={styles.optionText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default UserPage;

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
    marginTop: 15,
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
