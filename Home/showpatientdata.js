import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';

const PatientDataPage = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [doctorComment, setDoctorComment] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const dummyData = [
    { id: '1', name: 'Ali Ahmed', age: 4, weight: '15kg', height: '95cm', priorDisease: 'None' },
    { id: '2', name: 'Sara Khan', age: 5, weight: '18kg', height: '100cm', priorDisease: 'Asthma' },
    { id: '3', name: 'Usman Ali', age: 3, weight: '12kg', height: '88cm', priorDisease: 'Malnutrition' },
    { id: '4', name: 'Fatima Noor', age: 4, weight: '14kg', height: '92cm', priorDisease: 'None' },
    { id: '5', name: 'Ayan Zafar', age: 2, weight: '10kg', height: '80cm', priorDisease: 'Flu' },
  ];

  const filteredData = dummyData.filter((patient) =>
    patient.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setModalVisible(true);
  };

  const renderPatient = ({ item }) => (
    <TouchableOpacity onPress={() => handlePatientSelect(item)}>
      <View style={styles.card}>
        <Text style={styles.name}>Name: {item.name}</Text>
        <Text style={styles.details}>Age: {item.age} years</Text>
        <Text style={styles.details}>Weight: {item.weight}</Text>
        <Text style={styles.details}>Height: {item.height}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search Patient..."
        placeholderTextColor="#A9A9A9"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      {/* Patient List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderPatient}
        contentContainerStyle={styles.list}
      />

      {/* Modal for Patient Details */}
      {selectedPatient && (
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Patient Details</Text>
            <Text style={styles.modalText}>Name: {selectedPatient.name}</Text>
            <Text style={styles.modalText}>Age: {selectedPatient.age} years</Text>
            <Text style={styles.modalText}>Weight: {selectedPatient.weight}</Text>
            <Text style={styles.modalText}>Height: {selectedPatient.height}</Text>
            <Text style={styles.modalText}>Prior Disease: {selectedPatient.priorDisease}</Text>

            {/* Doctor Comment Section */}
            <TextInput
              style={styles.commentBox}
              placeholder="Add your comments here..."
              placeholderTextColor="#A9A9A9"
              value={doctorComment}
              onChangeText={(text) => setDoctorComment(text)}
              multiline
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                setDoctorComment('');
                setModalVisible(false);
              }}
            >
              <Text style={styles.saveButtonText}>Save Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Back to Patient's data</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default PatientDataPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
  },
  searchBar: {
    height: 45,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 5,
  },
  details: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 3,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 10,
  },
  commentBox: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#4B5563',
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#29AB87',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {

        padding: 10,
        marginTop: 4,  
        marginLeft:20,
        marginRight:20,
  },
  closeButtonText: {
    color: '#007BFF',
        fontSize: 14,
        alignSelf:'center',
        
  },
});
