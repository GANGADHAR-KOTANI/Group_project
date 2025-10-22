import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';

export default function Menu({ navigation }) {
  const categories = [
    {
      id: '1',
      name: 'Vegetables',
      image: 'https://cdn.britannica.com/17/196817-159-9E487F15/vegetables.jpg',
    },
    {
      id: '2',
      name: 'Fruits',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsFwO7RcZmukH-gXKCBB606Q14-wH3zKt17g&s',
    },
    {
      id: '3',
      name: 'Drinks',
      image: 'https://fmcg-viet.com/wp-content/uploads/2023/04/soft-drink.jpg',
    },
    {
      id: '4',
      name: 'Daily Bread & Eggs',
      image: 'https://thumbs.dreamstime.com/b/cheese-bread-milk-eggs-17775774.jpg',
    },
  ];

  const handleCategoryPress = (category) => {
    navigation.navigate('Category', { category });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name.toUpperCase()}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleCategoryPress(item.name)}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>VIEW MORE</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>View Our Menu 🍽️</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEA',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 25,
    alignItems: 'center',
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  image: {
    width: '90%',
    height: 180,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginTop: 15,
  },
  button: {
    backgroundColor: '#FCEA5C',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
