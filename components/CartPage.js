import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, LayoutAnimation, Platform, UIManager, Animated, Alert } from "react-native";
import { useCart } from "../context/CartContext";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental &&
  !global._layoutAnimWarnSilenced
) {
  try {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  } catch (e) {}
  global._layoutAnimWarnSilenced = true;
}


export default function CartPage({ navigation }) {
  const { cartItems, setCartItems, removeFromCart } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  const congratsScale = useRef(new Animated.Value(0.6)).current;
  const congratsOpacity = useRef(new Animated.Value(0)).current;
  const [congratsText, setCongratsText] = useState("");

  useEffect(() => { recalc(); }, [cartItems, couponApplied]);

  const recalc = () => {
    const sum = cartItems.reduce((acc, it) => acc + it.price * (it.quantity || 1), 0);
    setSubtotal(sum);
    const disc = couponApplied ? 200 : 0;
    setDiscount(disc);
    setFinalTotal(Math.max(0, sum - disc));
  };

  const increaseQty = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCartItems(prev => prev.map(it => it.id === id ? { ...it, quantity: (it.quantity || 1) + 1 } : it));
  };

  const decreaseQty = (id) => {
    const target = cartItems.find(it => it.id === id);
    if (!target) return;
    if ((target.quantity || 1) === 1) { removeFromCart(id); return; }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCartItems(prev => prev.map(it => it.id === id ? { ...it, quantity: (it.quantity || 1) - 1 } : it));
  };

  const handleApplyCoupon = () => {
    if (subtotal < 1000) { Alert.alert("Minimum order ₹1000"); return; }
    setCouponApplied(true);
    setCongratsText("🎉 You saved ₹200!");
    congratsScale.setValue(0.6);
    congratsOpacity.setValue(0);
    Animated.parallel([
      Animated.timing(congratsScale, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(congratsOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start(() => {
      setTimeout(() => Animated.timing(congratsOpacity, { toValue: 0, duration: 300, useNativeDriver: true }).start(), 1400);
    });
  };

  const handleBuyNow = () => {
    if (cartItems.length === 0) { Alert.alert("Your cart is empty!"); return; }
    navigation.navigate("DeliveryAddress", { total: finalTotal });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 Your Cart</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 240 }}>
        {cartItems.length === 0 ? (
          <View style={styles.empty}><Text style={{ color: "#777" }}>Your cart is empty!</Text></View>
        ) : cartItems.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>
            <View style={styles.qtyContainer}>
              <TouchableOpacity onPress={() => decreaseQty(item.id)} style={styles.qtyBtn}><Text>-</Text></TouchableOpacity>
              <Text style={styles.qtyCountText}>{item.quantity || 1}</Text>
              <TouchableOpacity onPress={() => increaseQty(item.id)} style={styles.qtyBtn}><Text>+</Text></TouchableOpacity>
            </View>
          </View>
        ))}
        {!couponApplied && subtotal >= 1000 && (
          <TouchableOpacity style={styles.couponCard} onPress={handleApplyCoupon}>
            <Text>Apply ₹200 Coupon</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <View style={styles.bottomFixed}>
        <Text>Subtotal: ₹{subtotal}</Text>
        <Text>Discount: ₹{discount}</Text>
        <Text>Total: ₹{finalTotal}</Text>
        <TouchableOpacity style={styles.buyBtn} onPress={handleBuyNow}><Text style={{ color: "#fff" }}>Buy Now</Text></TouchableOpacity>
      </View>
      <Animated.View style={[styles.congrats, { opacity: congratsOpacity, transform: [{ scale: congratsScale }] }]}>
        <Text style={{ color: "#fff" }}>{congratsText}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 14, backgroundColor: "#fffef3", paddingTop: Platform.OS === "android" ? 40 : 60 },
  header: { fontSize: 22, fontWeight: "800", marginBottom: 8 },
  empty: { padding: 30, alignItems: "center" },
  itemCard: { flexDirection: "row", backgroundColor: "#fff", marginBottom: 10, padding: 12, borderRadius: 12 },
  itemImage: { width: 64, height: 64, borderRadius: 10 },
  itemName: { fontWeight: "800" },
  itemPrice: { color: "#666" },
  qtyContainer: { flexDirection: "row", alignItems: "center" },
  qtyBtn: { borderWidth: 1, borderRadius: 6, paddingHorizontal: 6 },
  qtyCountText: { marginHorizontal: 8 },
  couponCard: { backgroundColor: "#ffd700", padding: 12, borderRadius: 10, alignItems: "center", marginVertical: 10 },
  bottomFixed: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", padding: 14, borderTopWidth: 1, borderTopColor: "#eee" },
  buyBtn: { backgroundColor: "#ff9f0d", padding: 14, borderRadius: 12, alignItems: "center", marginTop: 10 },
  congrats: { position: "absolute", top: "20%", left: "10%", right: "10%", backgroundColor: "green", padding: 14, borderRadius: 12, alignItems: "center" },
});
