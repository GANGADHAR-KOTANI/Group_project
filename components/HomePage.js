import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";

export default function HomePage({ navigation }) {
  const [cart, setCart] = useState([]);

  const items = [
    { id: "1", name: "Tomato", price: 40, image: require("../assets/tomato.jpg") },
    { id: "2", name: "Potato", price: 30, image: require("../assets/potato.jpg") },
    { id: "3", name: "Carrot", price: 60, image: require("../assets/carrot.jpg") },
    { id: "4", name: "Onion", price: 45, image: require("../assets/onion.jpg") },
    { id: "5", name: "Broccoli", price: 120, image: require("../assets/broccoli.jpg") },
    { id: "6", name: "Cabbage", price: 70, image: require("../assets/cabbage.jpg") },
    { id: "7", name: "Brinjal", price: 55, image: require("../assets/brinjal.jpg") },
    { id: "8", name: "Capsicum", price: 90, image: require("../assets/capsicum.jpg") },
  ];

  const addToCart = (item) => {
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      setCart(cart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.photo} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🥦 Fresh Vegetables</Text>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate("Cart", { cartItems: cart })}
      >
        <Text style={styles.cartText}>View Cart ({cart.length})</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fffef3" },
  title: { fontSize: 24, fontWeight: "700", color: "#ffb300", textAlign: "center", marginVertical: 15 },
  row: { justifyContent: "space-between", paddingHorizontal: 12, marginBottom: 20 },
  card: {
    width: width / 2 - 25,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  photo: { width: 90, height: 90, borderRadius: 10, marginBottom: 8, borderWidth: 1, borderColor: "#ffe082" },
  name: { fontSize: 16, fontWeight: "600", textAlign: "center", color: "#444" },
  price: { fontSize: 15, color: "#666", marginVertical: 4 },
  addButton: { marginTop: 5, backgroundColor: "#ffb300", paddingVertical: 6, paddingHorizontal: 20, borderRadius: 20 },
  addText: { color: "#fff", fontWeight: "700" },
  cartButton: {
    position: "absolute",
    bottom: 25,
    left: 25,
    right: 25,
    backgroundColor: "#ffb300",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cartText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
