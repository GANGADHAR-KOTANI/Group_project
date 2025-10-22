import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useCart } from "../context/CartContext";

export default function OrderSummaryScreen({ route, navigation }) {
  const { addressInfo, total } = route.params;
  const { cartItems, clearCart } = useCart();

  const handlePlaceOrder = () => {
    clearCart();
    alert("Order placed successfully!");
    navigation.navigate("Cart");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Summary</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Info</Text>
        <Text>Name: {addressInfo.name}</Text>
        <Text>Address: {addressInfo.address}</Text>
        <Text>City: {addressInfo.city}</Text>
        <Text>Phone: {addressInfo.phone}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items</Text>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.name} x{item.quantity}</Text>
              <Text>₹{item.price * (item.quantity || 1)}</Text>
            </View>
          )}
        />
      </View>
      <Text style={styles.total}>Total: ₹{total}</Text>
      <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
        <Text style={styles.buttonText}>Place Order ✅</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20, padding:20 },
  section: { marginBottom: 20 },
  sectionTitle: { fontWeight: "bold", marginBottom: 10 },
  item: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  total: { fontWeight: "bold", fontSize: 18, marginBottom: 20 },
  button: { backgroundColor: "#ff9f0d", padding: 15, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
