import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Platform, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { searchFarmersByProduct, getAllProducts } from '@/data/farms';
import SearchBar from '@/components/SearchBar';
import FarmerCard from '@/components/FarmerCard';
import ProductCard from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import { MapPin } from 'lucide-react-native';

export default function SearchScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showingSearchResults, setShowingSearchResults] = useState(false);

  const allProducts = getAllProducts();
  const popularProducts = allProducts.slice(0, 6); // Just showing first 6 for demo

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)');
    }
  }, [isAuthenticated, router]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
    if (text.trim().length > 0) {
      const results = searchFarmersByProduct(text);
      setSearchResults(results);
      setShowingSearchResults(true);
    } else {
      setSearchResults([]);
      setShowingSearchResults(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowingSearchResults(false);
  };

  const handleProductPress = (productName: string) => {
    handleSearch(productName);
  };

  const renderEmptyResults = () => (
    <View style={styles.emptyContainer}>
      <Image 
        source={{ uri: 'https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg' }}
        style={styles.emptyImage}
        resizeMode="contain"
      />
      <Text style={styles.emptyTitle}>No results found</Text>
      <Text style={styles.emptySubtitle}>Try a different search term or browse popular products below</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        onClear={clearSearch}
        placeholder="Search for products (e.g., eggs, honey)"
      />

      {showingSearchResults ? (
        <FlatList
          data={searchResults}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.searchResultContainer}>
              <FarmerCard farmer={item} showRating={false} />
              <View style={styles.productMatchContainer}>
                <Text style={styles.productMatchLabel}>Matching products:</Text>
                {item.matchingProducts.map(product => (
                  <View key={product.id} style={styles.productMatch}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>${product.price.toFixed(2)} per {product.unit}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <SectionTitle
              title="Search Results"
              subtitle={`${searchResults.length} ${searchResults.length === 1 ? 'farmer' : 'farmers'} found for "${searchQuery}"`}
            />
          }
          ListEmptyComponent={renderEmptyResults}
        />
      ) : (
        <FlatList
          data={popularProducts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ProductCard 
              product={item} 
              onPress={() => handleProductPress(item.name)}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <SectionTitle
              title="Popular Products"
              subtitle="Tap on a product to find farmers who offer it"
            />
          }
          numColumns={Platform.OS === 'web' && Platform.isPad ? 2 : 1}
          columnWrapperStyle={Platform.OS === 'web' && Platform.isPad ? styles.columnWrapper : undefined}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  searchResultContainer: {
    marginBottom: 24,
  },
  productMatchContainer: {
    backgroundColor: '#f0f8f1',
    borderRadius: 8,
    padding: 12,
    marginTop: -8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#dceee0',
  },
  productMatchLabel: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 8,
    color: '#4b7f52',
    fontFamily: 'Poppins-SemiBold',
  },
  productMatch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingVertical: 4,
  },
  productName: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b7f52',
    fontFamily: 'Poppins-Medium',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    opacity: 0.6,
    borderRadius: 75,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
    fontFamily: 'Poppins-SemiBold',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
});