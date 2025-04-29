import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { getAllFarmers, type Farmer } from '@/data/farms';
import FarmerCard from '@/components/FarmerCard';
import SectionTitle from '@/components/SectionTitle';

export default function HomeScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const farmers = getAllFarmers();

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)');
    }
  }, [isAuthenticated, router]);

  // Calculate grid columns based on screen width
  const screenWidth = Dimensions.get('window').width;
  const isTabletOrLarger = screenWidth >= 768;

  const renderHeader = () => (
    <View style={styles.header}>
      <Image 
        source={{ uri: 'https://images.pexels.com/photos/1153655/pexels-photo-1153655.jpeg' }}
        style={styles.headerImage}
      />
      <View style={styles.headerOverlay}>
        <Text style={styles.headerTitle}>Fresh from the Farm</Text>
        <Text style={styles.headerSubtitle}>Connect with local farmers in your area</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={farmers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <FarmerCard farmer={item} showRating showProducts />}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {renderHeader()}
            <View style={styles.titleContainer}>
              <SectionTitle 
                title="Local Farmers"
                subtitle="Browse farms in your area"
              />
            </View>
          </>
        }
        numColumns={isTabletOrLarger ? 2 : 1}
        columnWrapperStyle={isTabletOrLarger ? styles.columnWrapper : undefined}
      />
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
  header: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  titleContainer: {
    marginBottom: 16,
  },
});