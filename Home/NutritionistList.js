import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

// Dummy data for nutritionists
const dummyNutritionists = [
  { id: '1', name: 'Dr. Sarah Johnson', specialization: 'Weight Management', isOnline: true },
  { id: '2', name: 'Dr. Michael Chen', specialization: 'Sports Nutrition', isOnline: true },
  { id: '3', name: 'Dr. Emily Brown', specialization: 'Pediatric Nutrition', isOnline: false },
  { id: '4', name: 'Dr. James Wilson', specialization: 'Clinical Nutrition', isOnline: true },
  { id: '5', name: 'Dr. Maria Garcia', specialization: 'Diabetes Management', isOnline: false },
];

const NutritionistList = ({ navigation, route }) => {
  const { username } = route.params;
  const [nutritionists, setNutritionists] = useState(dummyNutritionists);

  const requestVideoCall = async (nutritionist) => {
    if (!nutritionist.isOnline) {
      Alert.alert('Not Available', 'This nutritionist is currently offline.');
      return;
    }

    try {
      // Here you would typically make an API call to send a request to the nutritionist
      Alert.alert(
        'Request Sent',
        `Requesting video consultation with ${nutritionist.name}...`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              // Simulate accepted request
              navigation.navigate('VideoCall', {
                username,
                isInitiator: true,
                roomId: `room_${Date.now()}_${nutritionist.id}`,
                nutritionistName: nutritionist.name,
              });
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send video call request');
    }
  };

  const renderNutritionist = ({ item }) => (
    <TouchableOpacity
      style={styles.nutritionistCard}
      onPress={() => requestVideoCall(item)}
    >
      <View style={styles.cardHeader}>
        <Image
          source={require('../assets/profile.jpeg')}
          style={styles.profileImage}
        />
        <View style={[styles.statusIndicator, 
          { backgroundColor: item.isOnline ? '#4CAF50' : '#757575' }
        ]} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.specialization}>{item.specialization}</Text>
        <Text style={[styles.status, 
          { color: item.isOnline ? '#4CAF50' : '#757575' }
        ]}>
          {item.isOnline ? 'Online' : 'Offline'}
        </Text>
      </View>
      {item.isOnline && (
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => requestVideoCall(item)}
        >
          <Text style={styles.callButtonText}>Request Call</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Nutritionists</Text>
      <FlatList
        data={nutritionists}
        renderItem={renderNutritionist}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#29AB87',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
  nutritionistCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  cardContent: {
    marginLeft: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  specialization: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
  },
  callButton: {
    backgroundColor: '#29AB87',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NutritionistList; 