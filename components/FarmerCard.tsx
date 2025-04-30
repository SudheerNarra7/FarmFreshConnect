import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import { Link } from 'expo-router';
import { Star } from 'lucide-react-native';
import type { Farmer } from '@/data/farms';

interface FarmerCardProps {
  farmer: Farmer;
  showRating?: boolean;
  showProducts?: boolean;
}

export default function FarmerCard({ farmer, showRating = true, showProducts = false }: FarmerCardProps) {
  return (
    <Link href={`/farmer/${farmer.id}`} asChild>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: farmer.profileImage }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{farmer.name}</Text>
          <Text style={styles.location}>{farmer.location}</Text>
          
          {showRating && (
            <View style={styles.ratingContainer}>
              <Star size={16} color="#f59e0b" fill="#f59e0b" />
              <Text style={styles.rating}>{farmer.averageRating.toFixed(1)}</Text>
            </View>
          )}
          
          {showProducts && farmer.products && farmer.products.length > 0 && (
            <Text style={styles.productsLabel}>
              {farmer.products.length} {farmer.products.length === 1 ? 'product' : 'products'}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        ':hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }
      }
    })
  },
  image: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  productsLabel: {
    marginTop: 4,
    fontSize: 14,
    color: '#4b7f52',
    fontWeight: '500',
  }
});