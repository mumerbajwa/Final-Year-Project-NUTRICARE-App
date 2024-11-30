import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OnboardingScreen from './screens/OnboardingScreen'; 
import Login from './screens/login'; 
import SignUpScreen from './screens/signup';
import OpeningPage from './screens/openingpage';
import ForgetPassword from './screens/forgetpassword';
import OtpVerification from './screens/OtpVerificationScreen';
import UserOptions from './screens/userOptions';
import UserPage from './screens/userPage';
import NutritionistPage from './screens/nutritionistPage';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OpeningPage">
        <Stack.Screen
          name="OpeningPage"
          component={OpeningPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            title: 'Sign Up',
            headerStyle: { backgroundColor: '#29AB87' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="Otpverification"
          component={OtpVerification}
          options= {{headerShown: false}}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserOptions"
          component={UserOptions}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserPage"
          component={UserPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NutritionistPage"
          component={NutritionistPage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
