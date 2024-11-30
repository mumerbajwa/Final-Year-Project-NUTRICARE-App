import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NutritionistPage = ({ route }) => {
  const { username } = route.params; // Access 'username' from route parameters

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {username}!</Text>
      <Text style={styles.subtitle}>This is the Nutritionist Page</Text>
    </View>
  );
};

export default NutritionistPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
