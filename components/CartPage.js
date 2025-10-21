import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
} from "react-native";

// Enable layout animation safely
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  try {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  } catch (e) {
    console.log("LayoutAnimation not supported.");
  }
}

export default function CartPage({ navigation, route }) {
  const initial = route.params?.cartItems || [];
  const [items, setItems] = useState(initial);
  const [subtotal, setSubtotal] = useState(0);
  const [couponAvailable, setCouponAvailable] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  const congratsScale = useRef(new Animated.Value(0.6)).current;
  const congratsOpacity = useRef(new Animated.Value(0)).current;
  const [congratsText, setCongratsText] = useState("");

  useEffect(() => {
    recalc();
  }, [items, couponApplied]);

  const recalc = () => {
  const sum = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  setSubtotal(sum);

  const available = sum >= 1000;
  setCouponAvailable(available);

  // If subtotal drops below 1000, remove coupon
  if (!available && couponApplied) {
    setCouponApplied(false);
    setDiscount(0);
    setFinalTotal(sum);
    return;
  }

  // Apply discount only if user tapped 'Apply' manually
  const disc = couponApplied ? 200 : 0;
  setDiscount(disc);
  setFinalTotal(Math.max(0, sum - disc));
};


  const increaseQty = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, quantity: it.quantity + 1 } : it))
    );
  };

  const decreaseQty = (id) => {
    const target = items.find((it) => it.id === id);
    if (!target) return;

    if (target.quantity === 1) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setItems((prev) => prev.filter((it) => it.id !== id));
      return;
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, quantity: it.quantity - 1 } : it))
    );
  };

  const handleApplyCoupon = () => {
    if (!couponAvailable) return;
    setCouponApplied(true);

    setCongratsText(`🎉 You saved ₹200!`);
    congratsScale.setValue(0.6);
    congratsOpacity.setValue(0);
    Animated.parallel([
      Animated.timing(congratsScale, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(congratsOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start(() => {
      setTimeout(() => {
        Animated.timing(congratsOpacity, { toValue: 0, duration: 300, useNativeDriver: true }).start();
      }, 1400);
    });
  };

  const handleBuyNow = () => {
    Alert.alert("Order Successful", `Your order of ₹${finalTotal} is placed!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 Your Cart</Text>

      <ScrollView
        style={styles.itemsArea}
        contentContainerStyle={{ paddingBottom: 240 }}
        showsVerticalScrollIndicator={false}
      >
        {items.length === 0 ? (
          <View style={styles.empty}>
            <Text style={{ color: "#777" }}>Your cart is empty. Go add some fresh veggies!</Text>
          </View>
        ) : (
          items.map((item, index) => (
            <View key={`${item.id || index}-${item.name}`} style={styles.itemCard}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
              </View>

              <View style={styles.qtyContainer}>
                <TouchableOpacity onPress={() => decreaseQty(item.id)} style={styles.qtyBtn}>
                  <Text style={styles.qtyBtnText}>-</Text>
                </TouchableOpacity>
                <View style={styles.qtyCount}>
                  <Text style={styles.qtyCountText}>{item.quantity}</Text>
                </View>
                <TouchableOpacity onPress={() => increaseQty(item.id)} style={styles.qtyBtn}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        {couponAvailable && (
          <TouchableOpacity
            style={[styles.couponCard, couponApplied && styles.couponApplied]}
            activeOpacity={0.9}
            onPress={handleApplyCoupon}
          >
            <View>
              <Text style={styles.couponTitle}>Apply Coupon</Text>
              <Text style={styles.couponSubtitle}>Get ₹200 off on orders above ₹1000</Text>
            </View>
            <Text style={{ fontWeight: "800", color: couponApplied ? "#fff" : "#b8860b" }}>
              {couponApplied ? "Applied" : "Apply"}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Fixed Bottom Section */}
      <View style={styles.bottomFixed}>
        <View style={styles.billContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.value}>₹{subtotal}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Discount</Text>
            <Text style={styles.value}>-₹{discount}</Text>
          </View>

          <View style={[styles.row, { marginTop: 8 }]}>
            <Text style={[styles.label, { fontSize: 18, fontWeight: "900" }]}>Total</Text>
            <Text style={[styles.value, { fontSize: 18, fontWeight: "900" }]}>₹{finalTotal}</Text>
          </View>

          <Text style={styles.deliveryText}>🚚 Estimated delivery: 15 min</Text>
        </View>

        <TouchableOpacity style={styles.buyBtn} onPress={handleBuyNow}>
          <Text style={styles.buyText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      {/* Congrats Floating */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.congrats,
          { transform: [{ scale: congratsScale }], opacity: congratsOpacity },
        ]}
      >
        <Text style={styles.congratsText}>{congratsText}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fffef3", padding: 14 },
  header: { fontSize: 22, fontWeight: "800", color: "#ff9f0d", marginBottom: 8 },
  itemsArea: { flex: 1 },
  empty: { padding: 30, alignItems: "center" },

  itemCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  itemImage: { width: 64, height: 64, borderRadius: 10, resizeMode: "cover" },
  itemName: { fontSize: 16, fontWeight: "800", color: "#222" },
  itemPrice: { fontSize: 14, color: "#666", marginTop: 6 },
  qtyContainer: { flexDirection: "row", alignItems: "center" },
  qtyBtn: {
    backgroundColor: "#fff4d6",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffecb8",
  },
  qtyBtnText: { fontSize: 18, fontWeight: "900", color: "#555" },
  qtyCount: { minWidth: 34, alignItems: "center", justifyContent: "center", marginHorizontal: 8 },
  qtyCountText: { fontSize: 16, fontWeight: "800" },

  couponCard: {
    backgroundColor: "#fff8dc",
    borderColor: "#ffdd7a",
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  couponApplied: { backgroundColor: "#ffb300", borderColor: "#ff9f0d" },
  couponTitle: { fontWeight: "900", color: "#b8860b" },
  couponSubtitle: { fontSize: 12, color: "#6b4b00", marginTop: 4 },

  bottomFixed: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fffef3",
    paddingHorizontal: 14,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  billContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    elevation: 3,
  },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 },
  label: { color: "#555", fontWeight: "700" },
  value: { color: "#333", fontWeight: "900" },
  deliveryText: { marginTop: 8, color: "#666", fontSize: 13 },

  buyBtn: {
    backgroundColor: "#ff9f0d",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    elevation: 6,
  },
  buyText: { color: "#fff", fontSize: 16, fontWeight: "900" },

  congrats: {
    position: "absolute",
    left: "10%",
    right: "10%",
    top: "20%",
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#2ecc71",
    alignItems: "center",
    elevation: 8,
  },
  congratsText: { color: "#fff", fontWeight: "900", fontSize: 16 },
});
