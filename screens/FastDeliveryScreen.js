import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function FastDeliveryScreen() {
  const navigation = useNavigation();

  const handleSkipOrNext = () => {
    navigation.navigate("OrganicDelivery");
  };

  return (
    <View style={styles.container}>
      {/* Skip button */}
      <TouchableOpacity style={styles.skipBtn} onPress={handleSkipOrNext}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Main illustration */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require("../assets/fast_delivery.png")} // Replace with your illustration path
          style={styles.illustration}
        />
      </View>

      {/* Title and description */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Get The Fastest Delivery{"\n"}Ever in History
        </Text>
        <Text style={styles.desc}>
          We create history in delivery time. We deliver the food as fast as
          possible as it is in the beside house…
        </Text>
      </View>

      {/* Arrow button only, no dots */}
      <View style={styles.arrowNavContainer}>
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
    justifyContent: "space-between",
    paddingTop: 25,
    paddingBottom: 32,
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
    // borderWidth :2,

    width: "100%",
    alignItems: "center",
    marginTop: 38,
  },
  illustration: {
    width: 320,
    height: 420,
    resizeMode: "contain",
    borderRadius: 12,
    marginBottom: 16,
    // shadow for image effect
    // shadowColor: "#F5BC51",
    // shadowOffset: { width: 5, height: 5 },
    // shadowOpacity: 0.13,
    // shadowRadius: 12,
    // elevation: 10,
  },
  textContainer: {
    width: "85%",
    alignItems: "center",
    marginTop: 10,
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
    fontSize: 21,
    textAlign: "center",
    color: "#222",
    marginBottom: 8,
    letterSpacing: 1,
  },
  desc: {
    fontSize: 14,
    textAlign: "center",
    color: "#757575",
    lineHeight: 22,
    marginTop: 2,
  },
  arrowNavContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 8,
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
