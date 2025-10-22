import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function FirstScreen() {
  const navigation = useNavigation();

  const handleSkipOrNext = () => {
    navigation.navigate("FastDelivery");
  };

  return (
    <View style={styles.container}>
      {/* Skip button */}
      <TouchableOpacity style={styles.skipBtn} onPress={handleSkipOrNext}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Food illustration */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require("../assets/burger.png")}
          style={styles.foodImg}
        />
        <Image
          source={require("../assets/taco.png")}
          style={[styles.foodImg, styles.taco]}
        />
        <Image
          source={require("../assets/chicken.png")}
          style={[styles.foodImg, styles.chicken]}
        />
        <Image
          source={require("../assets/omelette.png")}
          style={[styles.foodImg, styles.omelette]}
        />
        <View style={styles.circleBg} />
      </View>

      {/* Main text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>FIND YOUR FAVOURITE FOOD WITH EASE</Text>
        <Text style={styles.desc}>
          Get Your Favourite Food ready and we serve it in hot to your house
          without Conditions n fast and easy delivery...
        </Text>
      </View>

      {/* Dots indicator and arrow */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={handleSkipOrNext} style={styles.arrowBtn}>
          <Text style={styles.arrow}>{"→"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 22,
    position: "relative",
  },
  skipBtn: {
    position: "absolute",
    top: 28,
    right: 22,
    zIndex: 50,
  },
  skipText: {
    color: "#FCEA5C",
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 1,
    marginTop: 10,
  },
  illustrationContainer: {
    width: "100%",
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
    flexDirection: "row",
    marginTop: 150,
  },
  foodImg: {
    width: 95,
    height: 95,
    resizeMode: "contain",
    borderRadius: 24,
    elevation: 8,
    shadowColor: "#F5BC51",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  taco: { position: "absolute", left: 38, top: 25, zIndex: 4 },
  chicken: { position: "absolute", left: 110, top: 80, zIndex: 10 },
  burger: { position: "absolute", left: 170, top: 55, zIndex: 10 },
  omelette: { position: "absolute", right: 33, top: 15, zIndex: 2 },

  circleBg: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 150,
    backgroundColor: "#FFEFD1",
    top: 10,
    left: 55,
    zIndex: 1,
    opacity: 0.9,
    borderWidth: 2,
    borderColor: "#F5BC51",
    marginTop: 50,
  },

  textContainer: {
    width: "85%",
    alignItems: "center",
    // marginTop: 150,
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 18,
    elevation: 6,
    shadowColor: "#F5BC51",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 9,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    color: "#222",
    marginBottom: 8,
    letterSpacing: 1,
  },
  desc: {
    fontSize: 15,
    textAlign: "center",
    color: "#757575",
    lineHeight: 22,
  },
  navigationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 44,
    left: 0,
    right: 0,
    height: 65,
  },

  arrowBtn: {
    backgroundColor: "#F5BC51",
    borderRadius: 100,
    paddingHorizontal: 17,
    paddingVertical: 8,
    elevation: 6,
    shadowColor: "#F5BC51",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 1, height: 1 },
    marginLeft: 280,
  },
  arrow: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
