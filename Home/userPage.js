import React, { useEffect, useState } from 'react';
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
  const { username } = route.params || {}; // Safe access to route.params
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const monthName = today.toLocaleString('default', { month: 'long' });
    const day = today.getDate();
    setCurrentDate(`${monthName}, ${day}`);
  }, []);

  if (!username) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Username is missing</Text>
      </View>
    );
  }

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
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('EnterPatientData')} // Navigate to Enter Data Page
        >
          <Image source={require('../assets/data_input.png')} style={styles.optionIcon} />
          <Text style={styles.optionText}>Enter the Data</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('ViewDataPage')} // Navigate to View Data Page
        >
          <Image source={require('../assets/view_data.png')} style={styles.optionIcon} />
          <Text style={styles.optionText}>View your Data</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('findnutritionist')} // Navigate to Find Nutritionist Page
        >
          <Image source={require('../assets/doctor_icon.png')} style={styles.optionIcon} />
          <Text style={styles.optionText}>Find the Nutritionist</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('AIAdviserPage')} // Navigate to AI Adviser Page
        >
          <Image source={require('../assets/chatbot_icon.png')} style={styles.optionIcon} />
          <Text style={styles.optionText}>AI Adviser</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('CheckReportPage')} // Navigate to Check Report Page
        >
          <Image source={require('../assets/data_report.png')} style={styles.optionIcon} />
          <Text style={styles.optionText}>Check your Report</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('SuggestionsPage')} // Navigate to Suggestions Page
        >
          <Image source={require('../assets/suggestion_icon.png')} style={styles.optionIcon} />
          <Text style={styles.optionText}>Health Worker Suggestions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('Data7Page')} // Navigate to Data 7 Page
        >
          <Image source={require('../assets/dummy_icon.png')} style={styles.optionIcon} />
          <Text style={styles.optionText}>Data 7</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('Data8Page')} // Navigate to Data 8 Page
        >
          <Image source={require('../assets/dummy_icon.png')} style={styles.optionIcon} />
          <Text style={styles.optionText}>Data 8</Text>
        </TouchableOpacity>
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
  dateText: {
    fontSize: 16,
    color: '#555',
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
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
});
