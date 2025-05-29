import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Function to validate email
  const validateEmail = (value) => {
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(value) ? "" : "Invalid email address");
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (!email) {
      Alert.alert("Error", "Email field cannot be empty.");
      return;
    }

    if (emailError) {
      Alert.alert("Error", "Please fix the email validation error.");
      return;
    }

    navigation.navigate("OtpVerificationLogin");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forget Password</Text>
      <Text style={styles.subtitle}>Enter your email</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={validateEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "#666",
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
  errorText: {
    color: "red",
    fontSize: 14,
    alignSelf: "flex-start",
    marginLeft: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#29AB87",
    paddingVertical: 12,
    width: "80%",
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
