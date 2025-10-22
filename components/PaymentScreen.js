// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// export default function PaymentScreen({ route, navigation }) {
//   const { total } = route.params;

//   const handleCompleteOrder = () => {
//     // ✅ Navigate to OrderSuccess screen instead of Alert
//     navigation.navigate("OrderSuccess");
//   };

//   return (
//     <View style={styles.container}>
//       {/* Back Button */}
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <Ionicons name="arrow-back" size={24} color="black" />
//       </TouchableOpacity>

//       {/* Title */}
//       <Text style={styles.title}>Payment</Text>

//       {/* Payment Option */}
//       <View style={[styles.option, styles.selected]}>
//         <Text style={styles.optionText}>💵 Cash on Delivery</Text>
//       </View>

//       {/* Total Summary */}
//       <View style={styles.summary}>
//         <Text style={styles.total}>Total: ₹{total}</Text>
//       </View>

//       {/* Button */}
//       <TouchableOpacity style={styles.button} onPress={handleCompleteOrder}>
//         <Text style={styles.buttonText}>Complete Order</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#ff9f0d",
//     marginBottom: 30,
//     textAlign: "center",
//   },
//   option: {
//     padding: 15,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     marginBottom: 15,
//   },
//   selected: { borderColor: "#ff9f0d", backgroundColor: "#fff8dc" },
//   optionText: { fontSize: 16 },
//   summary: { marginTop: 20 },
//   total: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//     textAlign: "right",
//   },
//   button: {
//     backgroundColor: "#ff9f0d",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 40,
//   },
//   buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
// });















import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PaymentScreen({ route, navigation }) {
  const { total } = route.params;

  const handleCompleteOrder = () => {
    // 👉 Navigate to the success page instead of showing an alert
    navigation.navigate("OrderSuccess");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Payment</Text>

      <View style={[styles.option, styles.selected]}>
        <Text style={styles.optionText}>💵 Cash on Delivery</Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.total}>Total: ₹{total}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCompleteOrder}>
        <Text style={styles.buttonText}>Complete Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ff9f0d",
    marginBottom: 30,
    textAlign: "center",
  },
  option: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  selected: { borderColor: "#ff9f0d", backgroundColor: "#fff8dc" },
  optionText: { fontSize: 16 },
  summary: { marginTop: 20 },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "right",
  },
  button: {
    backgroundColor: "#ff9f0d",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
