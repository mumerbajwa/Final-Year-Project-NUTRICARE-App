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
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome back!</Text>
      <Text style={styles.loginText}>Login</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Password Input */}
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
            name={hidePassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#333"
          />
        </TouchableOpacity>
      </View>

      {/* Forget Password Button */}
      <View style={styles.forgetPasswordContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
          <Text style={styles.forgetPasswordText}>Forget Password?</Text>
        </TouchableOpacity>
      </View>

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
  },
  loginText: {
    fontSize: 22,
    marginBottom: 20,
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
    alignSelf: "flex-end",
    marginRight: 10,
    marginBottom: 10,
  },
  forgetPasswordText: {
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
    fontSize: 16,
    marginRight: 10,
  },
  createAccountText: {
    color: "#29AB87",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
