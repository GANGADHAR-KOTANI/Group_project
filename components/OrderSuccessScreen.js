


import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function OrderSuccessScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("MyTabs"); // auto-redirect to home after 3 s
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://ml1bqp5ajnmj.i.optimole.com/7fTCrYI-ZBdofYxV/w:637/h:723/q:75/https://mindjjo.in/wp-content/uploads/2021/08/green-check-mark-icon-in-a-circle-tick-symbol-in-vector-23713629-1.jpg" }}
        style={styles.image}
     />

      <Text style={styles.title}>Order Placed Successfully! 🎉</Text>
      <Text style={styles.subtitle}>Thank you for shopping with us.</Text>
      <Text style={styles.subtitle}>Redirecting to Home...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },
});
