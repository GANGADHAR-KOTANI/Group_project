import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function OrganicDeliveryScreen() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      {/* Illustration */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require("../assets/organic_delivery.png")} // Update with correct image path
          style={styles.illustration}
        />
      </View>

      {/* Title and description */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Welcome To the World Of{"\n"}Organic Delivery
        </Text>
        <Text style={styles.desc}>
          We welcome you to the world of organic delivery where lightning speed
          meets organic delivery…
        </Text>
      </View>

      {/* Get Started button */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.getStartedBtn}
          onPress={handleGetStarted}
        >
          <Text style={styles.getStartedText}>Get Started {"→"}</Text>
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
    paddingTop: 44,
    paddingBottom: 36,
    position: "relative",
  },
  illustrationContainer: {
   
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  illustration: {
    width: 340,
    height: 340,
    borderRadius: 20,
    resizeMode: "contain",
    marginBottom: 8,
    // shadowColor: "#F5BC51",
    // shadowOffset: { width: 4, height: 4 },
    // shadowOpacity: 0.11,
    // shadowRadius: 11,
    // elevation: 8,
    // backgroundColor: "#fff7ef",
  },
  textContainer: {
    width: "88%",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 20,
    elevation: 7,
    shadowColor: "#F5BC51",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 13,
    marginTop: 0,
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
  actionContainer: {
    width: "90%",
    alignItems: "center",
    marginBottom: 5,
  },
  getStartedBtn: {
    backgroundColor: "#FFA600",
    borderRadius: 32,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignItems: "center",
    width: "100%",
    elevation: 6,
    shadowColor: "#F5BC51",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    marginTop: 10,
  },
  getStartedText: {
    color: "#222",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
