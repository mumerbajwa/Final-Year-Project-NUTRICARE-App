import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

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
});

export default OpeningPage;
