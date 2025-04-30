import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { getFarmerById, addProduct, type Product } from '@/data/farms';
import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';

export default function StoreScreen() {
  const { user } = useAuth();
  const farmer = getFarmerById(user?.id || '');
  
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    unit: '',
    image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg' // Default image
  });

  const handleAddProduct = () => {
    if (!farmer) return;
    
    const price = parseFloat(newProduct.price);
    if (isNaN(price)) {
      alert('Please enter a valid price');
      return;
    }

    addProduct({
      ...newProduct,
      price,
      farmerId: farmer.id
    });

    setNewProduct({
      name: '',
      description: '',
      price: '',
      unit: '',
      image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg'
    });
    setShowAddProduct(false);
  };

  if (!farmer) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: farmer.profileImage }} style={styles.profileImage} />
        <Text style={styles.farmName}>{farmer.name}</Text>
        <Text style={styles.location}>{farmer.location}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{farmer.products.length}</Text>
          <Text style={styles.statLabel}>Products</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{farmer.reviews.length}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{farmer.averageRating.toFixed(1)}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Products</Text>
          <Button 
            title={showAddProduct ? "Cancel" : "Add Product"} 
            onPress={() => setShowAddProduct(!showAddProduct)}
            variant={showAddProduct ? "outline" : "primary"}
            size="small"
          />
        </View>

        {showAddProduct && (
          <View style={styles.addProductForm}>
            <TextInput
              style={styles.input}
              placeholder="Product Name"
              value={newProduct.name}
              onChangeText={(text) => setNewProduct(prev => ({ ...prev, name: text }))}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              value={newProduct.description}
              onChangeText={(text) => setNewProduct(prev => ({ ...prev, description: text }))}
              multiline
              numberOfLines={3}
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Price"
                value={newProduct.price}
                onChangeText={(text) => setNewProduct(prev => ({ ...prev, price: text }))}
                keyboardType="decimal-pad"
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Unit (e.g., lb, dozen)"
                value={newProduct.unit}
                onChangeText={(text) => setNewProduct(prev => ({ ...prev, unit: text }))}
              />
            </View>
            <Button 
              title="Add Product"
              onPress={handleAddProduct}
              style={styles.addButton}
            />
          </View>
        )}

        <View style={styles.productGrid}>
          {farmer.products.map(product => (
            <View key={product.id} style={styles.productItem}>
              <ProductCard product={product} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  farmName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Poppins-Bold',
  },
  location: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 1,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4b7f52',
    fontFamily: 'Poppins-Bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Poppins-SemiBold',
  },
  addProductForm: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  addButton: {
    marginTop: 8,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '48%',
    marginBottom: 16,
  },
});