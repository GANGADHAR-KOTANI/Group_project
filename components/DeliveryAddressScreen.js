



import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "../context/CartContext";

export default function DeliveryAddressScreen({ navigation, route }) {
  const { cartItems } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const total = route.params.total;

  // ✅ Inline Validation
  const validateInputs = () => {
    const newErrors = {};
    let valid = true;

    if (!name.trim()) {
      newErrors.name = "Full name is required.";
      valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      newErrors.name = "Name should contain only letters.";
      valid = false;
    }

    if (!address.trim()) {
      newErrors.address = "Address is required.";
      valid = false;
    } else if (address.length < 5) {
      newErrors.address = "Address must be at least 5 characters.";
      valid = false;
    }

    if (!city.trim()) {
      newErrors.city = "City is required.";
      valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(city)) {
      newErrors.city = "City should contain only letters.";
      valid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
      valid = false;
    } else if (!/^[0-9]{10}$/.test(phone)) {
      newErrors.phone = "Enter a valid 10-digit number.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleProceed = () => {
    if (validateInputs()) {
      navigation.navigate("OrderSummary", { addressInfo: { name, address, city, phone }, total });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Address</Text>

      {/* Full Name */}
      <TextInput
        placeholder="Full Name"
        style={[styles.input, errors.name && styles.inputError]}
        value={name}
        onChangeText={(val) => {
          setName(val);
          setErrors((e) => ({ ...e, name: "" }));
        }}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      {/* Address */}
      <TextInput
        placeholder="Address"
        style={[styles.input, errors.address && styles.inputError]}
        value={address}
        onChangeText={(val) => {
          setAddress(val);
          setErrors((e) => ({ ...e, address: "" }));
        }}
      />
      {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

      {/* City */}
      <TextInput
        placeholder="City"
        style={[styles.input, errors.city && styles.inputError]}
        value={city}
        onChangeText={(val) => {
          setCity(val);
          setErrors((e) => ({ ...e, city: "" }));
        }}
      />
      {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

      {/* Phone */}
      <TextInput
        placeholder="Phone Number"
        style={[styles.input, errors.phone && styles.inputError]}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={(val) => {
          setPhone(val);
          setErrors((e) => ({ ...e, phone: "" }));
        }}
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleProceed}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    padding: 20,
    color: "#ff9f0d",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  inputError: { borderColor: "red" },
  errorText: { color: "red", fontSize: 13, marginBottom: 10, marginLeft: 5 },
  button: {
    backgroundColor: "#ff9f0d",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
