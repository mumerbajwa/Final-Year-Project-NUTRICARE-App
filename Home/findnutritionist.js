import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';

const nutritionists = [
  { id: 1, name: 'Dr. Sarah Ahmed', specialty: 'Child Nutrition', image: require('../assets/page2.jpg') },
  { id: 2, name: 'Dr. John Doe', specialty: 'Adult Health & Wellness', image: require('../assets/page2.jpg') },
  { id: 3, name: 'Dr. Emily Khan', specialty: 'Sports Nutrition', image: require('../assets/page2.jpg') },
  { id: 4, name: 'Dr. James Smith', specialty: 'Weight Loss', image: require('../assets/page2.jpg') },
  { id: 5, name: 'Dr. Maria Ali', specialty: 'Diabetic Care', image: require('../assets/page2.jpg') },
  { id: 6, name: 'Dr. Hassan Raza', specialty: 'General Health', image: require('../assets/page2.jpg') },
];

const FindNutritionistPage = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNutritionist, setSelectedNutritionist] = useState(null);
  const [scheduleDetails, setScheduleDetails] = useState({ date: '', time: '', notes: '' });

  const handleSelectNutritionist = (nutritionist) => {
    setSelectedNutritionist(nutritionist);
  };

  const handleSchedule = () => {
    alert(
      `Appointment Scheduled with ${selectedNutritionist.name} on ${scheduleDetails.date} at ${scheduleDetails.time}`
    );
    // Reset form
    setSelectedNutritionist(null);
    setScheduleDetails({ date: '', time: '', notes: '' });
  };

  const filteredNutritionists = nutritionists.filter(
    (nutritionist) =>
      nutritionist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nutritionist.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Find a Nutritionist</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name or specialty"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {!selectedNutritionist ? (
        <View style={styles.nutritionistList}>
          {filteredNutritionists.map((nutritionist) => (
            <TouchableOpacity
              key={nutritionist.id}
              style={styles.nutritionistCard}
              onPress={() => handleSelectNutritionist(nutritionist)}
            >
              <Image source={nutritionist.image} style={styles.nutritionistImage} />
              <View style={styles.nutritionistDetails}>
                <Text style={styles.nutritionistName}>{nutritionist.name}</Text>
                <Text style={styles.nutritionistSpecialty}>{nutritionist.specialty}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.profileForm}>
          <Image source={selectedNutritionist.image} style={styles.profileImage} />
          <Text style={styles.profileName}>{selectedNutritionist.name}</Text>
          <Text style={styles.profileSpecialty}>{selectedNutritionist.specialty}</Text>

          {/* Form */}
          <TextInput
            style={styles.input}
            placeholder="Enter Date (e.g., 2024-12-15)"
            value={scheduleDetails.date}
            onChangeText={(text) => setScheduleDetails({ ...scheduleDetails, date: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Time (e.g., 3:00 PM)"
            value={scheduleDetails.time}
            onChangeText={(text) => setScheduleDetails({ ...scheduleDetails, time: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Add Notes (Optional)"
            value={scheduleDetails.notes}
            onChangeText={(text) => setScheduleDetails({ ...scheduleDetails, notes: text })}
          />

          <TouchableOpacity style={styles.scheduleButton} onPress={handleSchedule}>
            <Text style={styles.scheduleButtonText}>Schedule Consultation</Text>
          </TouchableOpacity>

          {/* Back to List */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedNutritionist(null)}
          >
            <Text style={styles.backButtonText}>Back to Nutritionists</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default FindNutritionistPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
  },
  nutritionistList: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  nutritionistCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  nutritionistImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    resizeMode: 'cover',
  },
  nutritionistDetails: {
    justifyContent: 'center',
  },
  nutritionistName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  nutritionistSpecialty: {
    fontSize: 14,
    color: '#555',
  },
  profileForm: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSpecialty: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  scheduleButton: {
    backgroundColor: '#29AB87',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 10,
    marginTop: 10,
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 14,
  },
});
