
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Image } from 'react-native';
import { useCart } from "../context/CartContext";

export default function PaymentPage({ navigation, route }) {
  const [selectedOption, setSelectedOption] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const { clearCart } = useCart();
  const { total } = route.params;

  // ✅ Validation (shows inline messages instead of alerts)
  const validateFields = () => {
    let valid = true;
    const newErrors = {};

    if (selectedOption === 'card') {
      if (!/^[0-9]{16}$/.test(cardNumber)) {
        newErrors.cardNumber = 'Card number must be 16 digits.';
        valid = false;
      }
      if (!/^[A-Za-z\s]+$/.test(cardName.trim())) {
        newErrors.cardName = 'Name should contain only letters.';
        valid = false;
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
        newErrors.expiry = 'Enter valid expiry (MM/YY).';
        valid = false;
      }
      if (!/^[0-9]{3}$/.test(cvv)) {
        newErrors.cvv = 'CVV must be 3 digits.';
        valid = false;
      }
    }

    if (selectedOption === 'upi') {
      if (!/^[\w.-]+@[\w.-]+$/.test(upiId)) {
        newErrors.upiId = 'Enter a valid UPI ID (e.g., name@upi).';
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleShowAlert = () => {
    if (!validateFields()) return;

    if (selectedOption === 'cod') {
      setMessage("Order placed successfully! 💛\nPlease pay when your order is delivered.");
    } else {
      setMessage("Payment successful! 🎉\nYour order has been placed successfully.");
    }

    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      clearCart();
      navigation.navigate("MyTabs");
    }, 3000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Payment Options</Text>

      {/* Payment Options */}
      <View style={styles.optionContainer}>
        {['card', 'upi', 'cod'].map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[styles.optionButton, selectedOption === opt && styles.optionButtonSelected]}
            onPress={() => {
              setSelectedOption(opt);
              setErrors({});
            }}
          >
            <Text style={styles.optionText}>
              {opt === 'card' ? 'Credit/Debit Card' : opt === 'upi' ? 'UPI' : 'Cash on Delivery'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* CARD PAYMENT */}
      {selectedOption === 'card' && (
        <View style={styles.form}>
          <TextInput
            style={[styles.input, errors.cardNumber && styles.inputError]}
            placeholder="Card Number"
            keyboardType="numeric"
            maxLength={16}
            value={cardNumber}
            onChangeText={(val) => {
              setCardNumber(val);
              setErrors((e) => ({ ...e, cardNumber: '' }));
            }}
          />
          {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber}</Text>}

          <TextInput
            style={[styles.input, errors.cardName && styles.inputError]}
            placeholder="Card Holder Name"
            value={cardName}
            onChangeText={(val) => {
              setCardName(val);
              setErrors((e) => ({ ...e, cardName: '' }));
            }}
          />
          {errors.cardName && <Text style={styles.errorText}>{errors.cardName}</Text>}

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <TextInput
                style={[styles.input, errors.expiry && styles.inputError]}
                placeholder="Expiry MM/YY"
                maxLength={5}
                value={expiry}
                onChangeText={(val) => {
                  setExpiry(val);
                  setErrors((e) => ({ ...e, expiry: '' }));
                }}
              />
              {errors.expiry && <Text style={styles.errorText}>{errors.expiry}</Text>}
            </View>

            <View style={{ flex: 1 }}>
              <TextInput
                style={[styles.input, errors.cvv && styles.inputError]}
                placeholder="CVV"
                secureTextEntry
                keyboardType="numeric"
                maxLength={3}
                value={cvv}
                onChangeText={(val) => {
                  setCvv(val);
                  setErrors((e) => ({ ...e, cvv: '' }));
                }}
              />
              {errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}
            </View>
          </View>
        </View>
      )}

      {/* UPI PAYMENT */}
      {selectedOption === 'upi' && (
        <View style={styles.form}>
          <TextInput
            style={[styles.input, errors.upiId && styles.inputError]}
            placeholder="Enter UPI ID"
            value={upiId}
            onChangeText={(val) => {
              setUpiId(val);
              setErrors((e) => ({ ...e, upiId: '' }));
            }}
          />
          {errors.upiId && <Text style={styles.errorText}>{errors.upiId}</Text>}
        </View>
      )}

      {/* COD MESSAGE */}
      {selectedOption === 'cod' && (
        <View style={styles.codBox}>
          <Text style={{ fontSize: 16, color: "#444", textAlign: "center" }}>
            You will pay when the order is delivered.
          </Text>
        </View>
      )}

      {/* PAY / PLACE ORDER BUTTON */}
      <TouchableOpacity style={styles.payButton} onPress={handleShowAlert}>
        <Text style={styles.payButtonText}>
          {selectedOption === 'cod' ? `Place Order ₹${total}` : `Pay Now ₹${total}`}
        </Text>
      </TouchableOpacity>

      {/* SUCCESS MODAL */}
      <Modal transparent visible={visible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.alertBox}>
            <Image
              source={{
                uri:
                  selectedOption === 'cod'
                    ? "https://cdn-icons-png.flaticon.com/512/190/190411.png"
                    : "https://cdn-icons-png.flaticon.com/512/845/845646.png",
              }}
              style={styles.alertImage}
            />
            <Text style={styles.alertTitle}>
              {selectedOption === 'cod' ? "Order Placed!" : "Payment Successful!"}
            </Text>
            <Text style={styles.alertMessage}>{message}</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fffef3', flexGrow: 1 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center', color: '#ff9f0d' },
  optionContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  optionButton: {
    flex: 1, padding: 12, marginHorizontal: 5, borderRadius: 10, backgroundColor: '#f5e79d', alignItems: 'center',
  },
  optionButtonSelected: { backgroundColor: '#ffcc00', elevation: 5 },
  optionText: { color: '#333', fontWeight: '600' },
  form: { marginBottom: 30 },
  input: {
    borderWidth: 1, borderColor: '#eee', backgroundColor: '#fff',
    borderRadius: 10, padding: 12, marginBottom: 5, elevation: 1,
  },
  inputError: { borderColor: 'red' },
  errorText: { color: 'red', fontSize: 13, marginBottom: 10, marginLeft: 5 },
  row: { flexDirection: 'row' },
  codBox: {
    padding: 20, borderRadius: 10, backgroundColor: '#fff',
    marginBottom: 30, alignItems: 'center', borderWidth: 1, borderColor: '#f0e6a1',
  },
  payButton: {
    backgroundColor: '#28a745', padding: 15, borderRadius: 12, alignItems: 'center', elevation: 5,
  },
  payButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center' },
  alertBox: {
    width: 300, backgroundColor: '#fffef3', borderRadius: 20, padding: 25, alignItems: 'center', elevation: 10,
  },
  alertImage: { width: 80, height: 80, marginBottom: 15 },
  alertTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, color: '#28a745' },
  alertMessage: { fontSize: 16, textAlign: 'center', color: '#666' },
});
