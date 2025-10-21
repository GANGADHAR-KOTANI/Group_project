
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import dummyData2 from '../data/DummyData.json';

export default function HomePage({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('fruits');
  const [items, setItems] = useState(dummyData2); // full data in state

  const types = [...new Set(dummyData2.map(item => item.category))];

  // Filter items by selectedType
  const filteredItems = items.filter(item => item.category === selectedType);

  const handleSelect = (item) => {
    navigation.navigate('SelectItem', { item });
  };

  const toggleFavorite = (itemId) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) return { ...item, favourite: !item.favourite };
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.title}>Hello, Gurunath!</Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="#666" style={{ marginLeft: 10 }} />
          <TextInput
            placeholder="Search here..."
            style={styles.input}
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity>
            <MaterialIcons name="keyboard-voice" size={24} color="#666" style={{ marginRight: 10 }} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1, padding: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
          {types.map(type => (
            <TouchableOpacity
              key={type}
              style={[styles.button, selectedType === type && styles.activeButton]}
              onPress={() => setSelectedType(type)}
            >
              <Text style={{ color: selectedType === type ? '#fff' : '#000' }}>{type.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
        </ScrollView>

        <FlatList
          data={filteredItems}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity style={{ flex: 1 }} onPress={() => handleSelect(item)}>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text>{item.description}</Text>
                    <Text style={{ marginTop: 5, fontWeight: 'bold' }}>${item.price}</Text>
                    <Text>Rating: {item.rating} ⭐</Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Heart Icon */}
              <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.heartButton}>
                <Ionicons
                  name={item.favourite ? 'heart' : 'heart-outline'}
                  size={24}
                  color={item.favourite ? 'red' : 'gray'}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 183,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 51,
    backgroundColor: '#FCEA5C',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#000' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: { flex: 1, fontSize: 16, marginLeft: 10 },
  button: { padding: 10, borderRadius: 20, borderWidth: 1, borderColor: '#000' },
  activeButton: { backgroundColor: '#FCEA5C' },
  card: {
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    position: 'relative',
  },
  image: { width: 80, height: 80, borderRadius: 10 },
  name: { fontWeight: 'bold', fontSize: 16 },
  heartButton: { position: 'absolute', top: 10, right: 10, zIndex: 10 },
});
