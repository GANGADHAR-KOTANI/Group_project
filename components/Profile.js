import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useCart } from "../context/CartContext"; // ✅ Correct import

export default function ProfileScreen({ navigation }) {
  const { user, logoutUser } = useCart(); // ✅ Correct usage


  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/default_avatar.jpg")}
        style={styles.avatar}
      />

      <Text style={styles.username}>{user?.username || "Guest User"}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Email</Text>
        <Text style={styles.infoValue}>{user?.email || "N/A"}</Text>

        <Text style={styles.infoLabel}>Phone</Text>
        <Text style={styles.infoValue}>{user?.mobile || "+91-XXXXXXXXXX"}</Text>

        <Text style={styles.infoLabel}>Member Since</Text>
        <Text style={styles.infoValue}>Oct 2025</Text>
      </View>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => {
          logoutUser();
          navigation.replace("Login");
        }}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    alignItems: "center",
    paddingTop: 70,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 20,
    backgroundColor: "#E5E5EA",
  },
  username: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1D1D1F",
    marginBottom: 22,
    letterSpacing: 0.5,
  },
  infoBox: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    marginBottom: 50,
    elevation: 5,
    shadowColor: "#FFC107",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  infoLabel: {
    color: "#777",
    fontWeight: "600",
    fontSize: 15,
    marginTop: 10,
  },
  infoValue: {
    color: "#000",
    fontSize: 17,
    fontWeight: "600",
    marginTop: 2,
  },
  logoutBtn: {
    backgroundColor: "#F6B420",
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 60,
    elevation: 6,
    shadowColor: "#F6B420",
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 0.5,
  },
});
