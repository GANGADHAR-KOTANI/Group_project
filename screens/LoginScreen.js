import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert ,ImageBackground } from "react-native";
import { styles } from "../styles/styles";
import users from "../data/users.json";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = () => {
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Invalid email address");
      return;
    }

    const user = users.find(
      (u) => u.email === email.trim() && u.password === password.trim()
    );

    if (user) {
      setError("");
    //   Alert.alert("Login Success", `Welcome back, ${user.name}!`);
      navigation.navigate("Animation");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpg")} // Use your local image path
      style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

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
            top: "56%",
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

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.switchText}>
            Don't have an account?{" "}
            <Text style={styles.subText}>Register here</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
