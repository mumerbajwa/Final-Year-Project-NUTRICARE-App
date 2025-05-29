import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Importing screens
import OnboardingScreen from './screens/OnboardingScreen';
import Login from './screens/login';
import SignUpScreen from './screens/signup';
import OpeningPage from './screens/openingpage';
import ForgetPassword from './screens/forgetpassword';
import OtpVerification from './screens/OtpVerificationScreen';
import UserOptions from './screens/userOptions';
import UserPage from './Home/userPage';
import NutritionistPage from './Home/nutritionistPage';
import OtpVerificationLogin from './screens/loginOtp';
import ChangePasswordPage from './screens/changePasswordscreen';
import EnterPatientData from './Home/enterPatientdata';
import EditProfileNutritionist from './Home/editProfilenutritionist';
import ScheduleTimeNutritionist from './Home/nutritionistScheduletime';
import FindNutritionistPage from './Home/findnutritionist';
import PatientDataPage from './Home/showpatientdata';
import ViewDataPage from './Home/ViewDataPage';
import AiadvisorPage from './Home/aiadvisor';
import VideoCall from './Home/VideoCall';
import NutritionistList from './Home/NutritionistList';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="OpeningPage">
          
          {/* Opening Page */}
          <Stack.Screen
            name="OpeningPage"
            component={OpeningPage}
            options={{ headerShown: false }}
          />
          
          {/* Onboarding and Authentication Screens */}
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
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{ headerShown: false }}
          />
          
          {/* User and Profile Related Screens */}
          <Stack.Screen
            name="UserOptions"
            component={UserOptions}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserPage"
            component={UserPage}
            options={{ headerShown: false }}
          />

          {/* Nutritionist and Health-related Screens */}
          <Stack.Screen
            name="NutritionistPage"
            component={NutritionistPage}
            options={{ headerShown: false }}
          />
          
          {/* Find Nutritionist Page */}
          <Stack.Screen
            name="FindNutritionist"
            component={FindNutritionistPage}
            options={{ title: 'Find Nutritionist' }}
          />

          {/* Login and Password Screens */}
          <Stack.Screen
            name="OtpVerificationLogin"
            component={OtpVerificationLogin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChangePasswordPage"
            component={ChangePasswordPage}
            options={{ headerShown: false }}
          />

          {/* Data Entry and Profile Edit Screens */}
          <Stack.Screen
            name="EnterPatientData"
            component={EnterPatientData}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfileNutritionist"
            component={EditProfileNutritionist}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScheduleTimeNutritionist"
            component={ScheduleTimeNutritionist}
            options={{ headerShown: false }}
          />
          
          {/* Patient Data Page */}
          <Stack.Screen
            name="PatientDataPage"
            component={PatientDataPage}
            options={{
              title: 'Patient Data',
              headerStyle: { backgroundColor: '#29AB87' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />

          {/* View Data Page */}
          <Stack.Screen
            name="ViewDataPage"
            component={ViewDataPage}
            options={{
              title: 'View Your Data',
              headerStyle: { backgroundColor: '#29AB87' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />

          {/* AI Advisor Page */}
          <Stack.Screen
            name="AiadvisorPage"
            component={AiadvisorPage}
            options={{
              title: 'AI Advisor',
              headerStyle: { backgroundColor: '#29AB87' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />

          {/* Nutritionist List Screen */}
          <Stack.Screen
            name="NutritionistList"
            component={NutritionistList}
            options={{
              title: 'Available Nutritionists',
              headerStyle: { backgroundColor: '#29AB87' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />

          {/* Video Call Screen */}
          <Stack.Screen
            name="VideoCall"
            component={VideoCall}
            options={{
              title: 'Video Consultation',
              headerStyle: { backgroundColor: '#29AB87' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
