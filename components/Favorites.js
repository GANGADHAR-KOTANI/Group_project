import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import data from '../data/DummyData.json';

export default function Favorites({ navigation }) {
  const [fav, setFav] = useState([]);

  useEffect(() => {
    const favData = data.filter((x) => x.favourite === true);
    setFav(favData);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('SelectItem', { item })}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.itemPrice}>₹{item.price}</Text>
      <Text style={styles.itemRating}>⭐ {item.rating}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text style={styles.header}>Favourites ❤️</Text>

      <FlatList
        data={fav}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2} // 👈 two-column grid layout
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40, // safe padding for top
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#050302ff',
    marginBottom: 15,
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between', // equal spacing for 2 items
    marginBottom: 12,
  },
  itemContainer: {
    backgroundColor: '#fffaf2',
    borderRadius: 12,
    alignItems: 'center',
    padding: 10,
    flex: 1,
    marginHorizontal: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  itemImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 14,
    color: '#ff6347',
    fontWeight: 'bold',
    marginTop: 4,
  },
  itemRating: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
});
