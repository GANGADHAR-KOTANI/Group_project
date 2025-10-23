import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // ✅ for gradient background
import { useCart } from "../context/CartContext";

export default function OrderSummaryScreen({ route, navigation }) {
  const { addressInfo, total } = route.params;
  const { cartItems, clearCart } = useCart();
  const [visible, setVisible] = useState(false);
  

  const MoveToPayment =()=>{
            navigation.navigate('Payment',{total:total})
  }
 
  return (
    <LinearGradient
      colors={["#fff8dc", "#fff"]}
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        <Text style={styles.header}>🧾 Order Summary</Text>

        {/* Delivery Info */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🚚 Delivery Info</Text>
          <View style={styles.infoRow}><Text style={styles.label}>Name:</Text><Text style={styles.value}>{addressInfo.name}</Text></View>
          <View style={styles.infoRow}><Text style={styles.label}>Address:</Text><Text style={styles.value}>{addressInfo.address}</Text></View>
          <View style={styles.infoRow}><Text style={styles.label}>City:</Text><Text style={styles.value}>{addressInfo.city}</Text></View>
          <View style={styles.infoRow}><Text style={styles.label}>Phone:</Text><Text style={styles.value}>{addressInfo.phone}</Text></View>
        </View>

        {/* Items */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🛍️ Items</Text>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>{item.name} x{item.quantity}</Text>
                <Text style={styles.itemPrice}>₹{item.price * (item.quantity || 1)}</Text>
              </View>
            )}
          />
        </View>

        {/* Total */}
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>₹{total}</Text>
        </View>

        {/* Place Order Button */}
        <TouchableOpacity style={styles.button} onPress={MoveToPayment}>
          <LinearGradient
            colors={["#ffb84d", "#ff9f0d"]}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Proceed✅</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Modal Success Popup */}
        
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ff9f0d",
    textAlign: "center",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff9f0d",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  label: {
    fontWeight: "600",
    color: "#555",
  },
  value: {
    color: "#333",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  itemPrice: {
    fontWeight: "bold",
    color: "#444",
  },
  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff4cc",
    borderRadius: 12,
    marginBottom: 25,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff9f0d",
  },
  button: {
    alignSelf: "center",
    width: "80%",
    borderRadius: 12,
    overflow: "hidden",
  },
  buttonGradient: {
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    elevation: 10,
  },
  alertImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  alertTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 5,
  },
  alertMessage: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
  },
});


















