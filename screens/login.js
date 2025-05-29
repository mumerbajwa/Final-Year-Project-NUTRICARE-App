<<<<<<< HEAD
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Install with `npm install react-native-vector-icons`

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Backend URL (Update this with your backend's endpoint)
  const BACKEND_URL = "http://10.54.23.76:3000";

  // Enhanced Email Validation
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const disallowedDomains = [
      "tempmail.com",
      "10minutemail.com",
      "disposablemail.com",
    ];

    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return false;
    }

    const emailDomain = email.split("@")[1];
    if (disallowedDomains.includes(emailDomain)) {
      Alert.alert(
        "Invalid Email",
        "Emails from disposable domains are not allowed."
      );
      return false;
    }

    return true;
  };

  // Handle Login
  const handleLogin = async () => {
    if (!validateEmail()) return;

    if (!password) {
      Alert.alert("Missing Password", "Please enter your password.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/users?email=${email}&password=${password}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        Alert.alert("Login Success", `Welcome, ${data.username || email}`);
        navigation.navigate("UserOptions"); // Replace with your target screen
      } else {
        Alert.alert(
          "Login Failed",
          data.message || "Invalid credentials. Please try again."
        );
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Error", "Something went wrong. Please try again later.");
      console.error("Login error:", error);
=======
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Install with `npm install react-native-vector-icons`

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (validateEmail()) {
      Alert.alert('Login Success', `Welcome, ${email}`);
      // Perform login logic
>>>>>>> ce0e048b4abc2314a5c6d0175b5c742b001797f2
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome back!</Text>
      <Text style={styles.loginText}>Login</Text>

<<<<<<< HEAD
      {/* Email Input */}
=======
>>>>>>> ce0e048b4abc2314a5c6d0175b5c742b001797f2
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

<<<<<<< HEAD
      {/* Password Input */}
=======
      {/* Password Input Section */}
>>>>>>> ce0e048b4abc2314a5c6d0175b5c742b001797f2
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={hidePassword}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setHidePassword(!hidePassword)}
        >
          <Icon
<<<<<<< HEAD
            name={hidePassword ? "eye-off-outline" : "eye-outline"}
=======
            name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
>>>>>>> ce0e048b4abc2314a5c6d0175b5c742b001797f2
            size={20}
            color="#333"
          />
        </TouchableOpacity>
      </View>

      {/* Forget Password Button */}
      <View style={styles.forgetPasswordContainer}>
<<<<<<< HEAD
        <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
=======
        <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
>>>>>>> ce0e048b4abc2314a5c6d0175b5c742b001797f2
          <Text style={styles.forgetPasswordText}>Forget Password?</Text>
        </TouchableOpacity>
      </View>

<<<<<<< HEAD
      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.noAccountText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
=======
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.noAccountText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
>>>>>>> ce0e048b4abc2314a5c6d0175b5c742b001797f2
          <Text style={styles.createAccountText}>SignUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
=======
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
>>>>>>> ce0e048b4abc2314a5c6d0175b5c742b001797f2
  },
  loginText: {
    fontSize: 22,
    marginBottom: 20,
<<<<<<< HEAD
    textAlign: "center",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    backgroundColor: "#fff",
=======
    textAlign: 'center',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
    backgroundColor: '#fff',
>>>>>>> ce0e048b4abc2314a5c6d0175b5c742b001797f2
    marginBottom: 8,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
  },
  eyeButton: {
    paddingHorizontal: 10,
  },
  forgetPasswordContainer: {
<<<<<<< HEAD
    alignSelf: "flex-end",
=======
    alignSelf: 'flex-end',
>>>>>>> ce0e048b4abc2314a5c6d0175b5c742b001797f2
    marginRight: 10,
    marginBottom: 10,
  },
  forgetPasswordText: {
<<<<<<< HEAD
    color: "#29AB87",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "#29AB87",
    paddingVertical: 12,
    width: "80%",
    borderRadius: 20,
    alignItems: "center",
    marginTop: 18,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  noAccountText: {
    color: "#555",
=======
    color: '#29AB87',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#29AB87',
    paddingVertical: 12,
    width: '80%',
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 18,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  noAccountText: {
    color: '#555',
>>>>>>> ce0e048b4abc2314a5c6d0175b5c742b001797f2
    fontSize: 16,
    marginRight: 10,
  },
  createAccountText: {
<<<<<<< HEAD
    color: "#29AB87",
    fontSize: 16,
    textDecorationLine: "underline",
=======
    color: '#29AB87',
    fontSize: 16,
    textDecorationLine: 'underline',
>>>>>>> ce0e048b4abc2314a5c6d0175b5c742b001797f2
  },
});
