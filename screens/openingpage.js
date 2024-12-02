import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const OpeningPage = ({ navigation }) => {
  useEffect(() => {
    // Navigate to the next screen after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Onboarding'); // Replace 'Login' with your target screen
    }, 2500);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/openingpage_img.png')} // Update the path to your logo file
        style={styles.logo}
      />
      {/* Footer Text */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Developed by</Text>
        <Text style={styles.footerNames}>m.ahmad, m.umer, m.abdullah</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#29AB87', // Background color
  },
  logo: {
    width: 220, // Adjust width based on your logo size
    height: 220, // Adjust height based on your logo size
    resizeMode: 'contain', // Maintain aspect ratio of the image
  },
  footer: {
    position: 'absolute',
    bottom: 20, // Position it near the bottom
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 4,
  },
  footerNames: {
    fontSize: 14,
    color: '#fff',
    
  },
});

export default OpeningPage;
