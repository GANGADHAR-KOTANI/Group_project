import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { useCart } from '../context/CartContext'; // adjust the path if needed

export default function SelectItemPage({ route, navigation }) {
  const { item } = route.params;
  const { cartItems, addToCart } = useCart();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);

  const handleAddToCart = () => {
    addToCart(item);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy ${item.name}`);
  };

  const handleViewCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
          <Text style={styles.rating}>⭐ {item.rating} / 5</Text>

          <Text style={styles.description}>{item.description}</Text>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                isInCart ? styles.disabledButton : styles.cartButton,
              ]}
              onPress={!isInCart ? handleAddToCart : null}
              disabled={isInCart}
            >
              <Text style={styles.actionText}>
                {isInCart ? 'Added to Cart' : 'Add to Cart'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.buyButton]}
              onPress={handleBuyNow}
            >
              <Text style={styles.actionText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Floating View Cart Button */}
      {cartItems.length > 0 && (
        <Animated.View style={[styles.floatingCart, { opacity: fadeAnim }]}>
          <TouchableOpacity style={styles.floatingButton} onPress={handleViewCart}>
            <Text style={styles.floatingText}>
              View Cart ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    backgroundColor: '#FFF9E6',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingVertical: 40,
    elevation: 5,
  },
  image: {
    width: '85%',
    height: 280,
    borderRadius: 20,
  },
  detailsSection: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },
  category: {
    fontSize: 16,
    color: '#888',
    marginVertical: 5,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF7A00',
    marginVertical: 5,
  },
  rating: {
    fontSize: 16,
    color: '#444',
    marginVertical: 5,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginTop: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cartButton: {
    backgroundColor: '#FCEA5C',
  },
  buyButton: {
    backgroundColor: '#FF6B6B',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  floatingCart: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  floatingButton: {
    backgroundColor: '#FF9F0D',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 8,
  },
  floatingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
