import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import data from '../data/DummyData.json';

export default function CategoryScreen({ route, navigation }) {
  const { category } = route.params;
  const filteredData = data.filter(item => item.category === category);

  const handleSelect = (item) => {
    navigation.navigate('SelectItem', { item });
  };

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{category}</Text>
      </View>

      {/* Product list */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleSelect(item)}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>₹{item.price}</Text>
              <Text style={styles.rating}>⭐ {item.rating}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 10 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff9f0d',
    marginLeft: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fffaf2',
    borderRadius: 10,
    marginVertical: 8,
    padding: 10,
    elevation: 2,
  },
  image: { width: 90, height: 90, borderRadius: 10 },
  details: { flex: 1, marginLeft: 10, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { color: '#ff6347', fontWeight: 'bold', marginTop: 4 },
  rating: { color: '#777', marginTop: 4 },
});
