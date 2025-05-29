import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';  // Updated import

const ScheduleTimeNutritionist = () => {
  const [startingTime, setStartingTime] = useState('');
  const [endingTime, setEndingTime] = useState('');
  const [startingAMPM, setStartingAMPM] = useState('AM');
  const [endingAMPM, setEndingAMPM] = useState('AM');

  // Handle form submission
  const handleSubmit = () => {
    if (!startingTime || !endingTime) {
      Alert.alert('Please fill in both times');
      return;
    }
    // Add your scheduling logic here, like saving the schedule or API call.
    Alert.alert('Schedule Submitted!');
  };

  // Handle time input formatting (e.g., 12:00)
  const handleTimeInput = (time, setTime) => {
    // Only allow numbers and colon
    const formattedTime = time.replace(/[^0-9:]/g, '').slice(0, 5);  // Limit to hh:mm format
    setTime(formattedTime);
  };

  // Combine time and AM/PM for displaying in TextInput
  const formatTimeWithAMPM = (time, ampm) => {
    return `${time} ${ampm}`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Schedule Time Nutritionist</Text>

      {/* Starting Time Section */}
      <Text style={styles.label}>Starting Time</Text>
      <View style={styles.timeRow}>
        <TextInput
          style={styles.timeInput}
          value={formatTimeWithAMPM(startingTime, startingAMPM)} // Display formatted time
          onChangeText={(time) => handleTimeInput(time, setStartingTime)}
          placeholder="Enter starting time (hh:mm)"
          keyboardType="numeric"
        />
        <Picker
          selectedValue={startingAMPM}
          style={styles.amPmPicker}
          onValueChange={(itemValue) => setStartingAMPM(itemValue)}
        >
          <Picker.Item label="AM" value="AM" />
          <Picker.Item label="PM" value="PM" />
        </Picker>
      </View>

      {/* Ending Time Section */}
      <Text style={styles.label}>Ending Time</Text>
      <View style={styles.timeRow}>
        <TextInput
          style={styles.timeInput}
          value={formatTimeWithAMPM(endingTime, endingAMPM)} // Display formatted time
          onChangeText={(time) => handleTimeInput(time, setEndingTime)}
          placeholder="Enter ending time (hh:mm)"
          keyboardType="numeric"
        />
        <Picker
          selectedValue={endingAMPM}
          style={styles.amPmPicker}
          onValueChange={(itemValue) => setEndingAMPM(itemValue)}
        >
          <Picker.Item label="AM" value="AM" />
          <Picker.Item label="PM" value="PM" />
        </Picker>
      </View>

      {/* Submit Button */}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  timeInput: {
    width: 100,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  amPmPicker: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: '#29AB87',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 30,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ScheduleTimeNutritionist;
