import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const DATA = [
  {
    key: '1',
    title: 'Understanding Malnutrition',
    description: 'Malnutrition affects millions of children under 5, hindering their growth and development. Together, we can identify and combat this silent epidemic to ensure every child gets a healthier future.',
    image: require('../assets/page1.jpg'),
  },
  {
    key: '2',
    title: 'Consult with Experts',
    description: 'Connect directly with certified nutritionists and doctors for professional advice, ensuring your child receives the best care tailored to their needs.',
    image: require('../assets/page2.jpg'),
  },
  {
    key: '3',
    title: 'Let’s get started',
    description: 'Nutricare leverages AI to predict malnutrition risk using advanced health analysis, empowering parents with accurate insights and personalized care plans for their children.',
    image: require('../assets/logo.png'),
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const onNextPress = () => {
    if (currentIndex < DATA.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate('Login'); // Navigate to the Login screen
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={DATA}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />
      <View style={styles.pagination}>
        {DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={onNextPress}>
        <Text style={styles.buttonText}>
          {currentIndex === DATA.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    height: 3,
    width: 12,
    borderRadius: 1,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#29AB87',
  },
  inactiveDot: {
    backgroundColor: '#aaa',
  },
  button: {
    backgroundColor: '#29AB87',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
