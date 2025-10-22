
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import dummyData2 from '../data/DummyData.json';

export default function HomePage({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('Vegetables');
  const [items, setItems] = useState(dummyData2);

  const types = [...new Set(dummyData2.map(item => item.category))];

  const filteredItems = items.filter(item =>
    item.category === selectedType &&
    item.name.toLowerCase().includes(search.toLowerCase())
  );

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

      {/* HEADER SECTION */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Hello, Sudha!</Text>

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

      {/* FIXED CATEGORY TABS */}
      <View style={styles.fixedTabs}>
        <FlatList
          data={types}
          horizontal
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.tabButton, selectedType === item && styles.activeTab]}
              onPress={() => setSelectedType(item)}
            >
              <Text style={{ color: selectedType === item ? '#fff' : '#000', fontWeight: 'bold' }}>
                {item.toUpperCase()}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* PRODUCT LIST */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => handleSelect(item)}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text>{item.description}</Text>
                  <Text style={{ marginTop: 5, fontWeight: 'bold' }}>₹{item.price}</Text>
                  <Text>Rating: {item.rating} ⭐</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.heartButton}>
              <Ionicons
                name={item.favourite ? 'heart' : 'heart-outline'}
                size={24}
                color={item.favourite ? 'red' : 'gray'}
              />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ padding: 10, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 180,
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

  fixedTabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: 6,
    backgroundColor: '#fff',
  },
  activeTab: {
    backgroundColor: '#FCEA5C',
  },
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
