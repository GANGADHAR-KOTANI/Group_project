import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { styles } from "../styles/styles";
import users from "../data/users.json";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    if (!name || !email || !password || !confirm) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Invalid email address");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    const existing = users.find((u) => u.email === email.trim());
    if (existing) {
      setError("User already exists");
      return;
    }

    users.push({ name, email, password });
    Alert.alert("Success", "User registered successfully!");
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={require("../assets/background2.png")} // Use your local image path
      style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <TextInput
          placeholder="Name"
          placeholderTextColor="#999"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 22,
            top: "54%",
            zIndex: 2,
            padding: 4,
          }}
          onPress={() => setShowPassword(!showPassword)}
        >
          <MaterialCommunityIcons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={28}
            color="#FCEA5C"
          />
        </TouchableOpacity>

        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          style={styles.input}
          value={confirm}
          onChangeText={setConfirm}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.switchText}>
            Already have an account?{" "}
            <Text style={styles.subText}>Login here</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
