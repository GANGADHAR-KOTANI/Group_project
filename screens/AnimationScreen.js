import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as Animatable from "react-native-animatable";
// import {LinearGradient} from "react-native-linear-gradient";

import { LinearGradient } from "expo-linear-gradient";

const AnimationScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home"); // navigate after 3s
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={["#FEC54B", "#FCEA5C"]} // Swiggy-like gradient
      style={styles.container}
    >
      <Animatable.View
        animation="zoomIn"
        duration={1500}
        style={styles.logoContainer}
      >
        <Image
          source={require("../assets/LodingLogo.jpeg")} // Animation Log Path
          style={styles.logo}
          resizeMode="contain"
        />
      </Animatable.View>

      {/* <Animatable.Text
        animation="fadeInUp"
        delay={800}
        duration={1500}
        style={styles.text}
      >
        Bringing your cravings closer 🍴 
      </Animatable.Text> */}
    </LinearGradient>
  );
};

export default AnimationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 40,
    borderRadius: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 12,
  },
  logo: {
    marginTop :10,
    width: 150,
    height: 150,
    borderRadius : 80
  },
  text: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    marginTop: 30,
    textAlign: "center",
    letterSpacing: 1,
  },
});
