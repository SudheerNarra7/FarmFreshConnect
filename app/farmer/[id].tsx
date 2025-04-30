import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { getFarmerById, addReview, type Product, type Review } from '@/data/farms';
import ProductCard from '@/components/ProductCard';
import ReviewCard from '@/components/ReviewCard';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/Button';
import RatingInput from '@/components/RatingInput';
import { Phone, MapPin, ArrowLeft, Star } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function FarmerDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const farmer = getFarmerById(id as string);
  
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [customerName, setCustomerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const screenWidth = Dimensions.get('window').width;
  const isTabletOrLarger = screenWidth >= 768;

  if (!farmer) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Farmer not found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  const handleSubmitReview = () => {
    if (!customerName.trim()) {
      setErrorMessage('Please enter your name');
      return;
    }
    
    if (!reviewText.trim()) {
      setErrorMessage('Please enter a review');
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage('');
    
    // Submit the review to the data store
    addReview(farmer.id, customerName, reviewRating, reviewText);
    
    // Reset form and close modal
    setTimeout(() => {
      setIsSubmitting(false);
      setReviewText('');
      setReviewRating(5);
      setCustomerName('');
      setIsReviewModalOpen(false);
    }, 1000);
  };

  const renderProductGrid = (products: Product[]) => {
    return (
      <View style={isTabletOrLarger ? styles.productGridLarge : styles.productGrid}>
        {products.map(product => (
          <View 
            key={product.id} 
            style={isTabletOrLarger ? styles.productItemLarge : styles.productItem}
          >
            <ProductCard product={product} />
          </View>
        ))}
      </View>
    );
  };

  // Simple animation delay calculation for staggered animations
  const getAnimationDelay = (index: number) => index * 100;

  return (
    <>
      <Stack.Screen
        options={{
          title: farmer.name,
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color="#333" />
            </TouchableOpacity>
          ),
        }}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <Animated.View entering={FadeIn.duration(400)} style={styles.imageContainer}>
            <Image source={{ uri: farmer.profileImage }} style={styles.coverImage} />
            <View style={styles.overlay}>
              <Text style={styles.farmerName}>{farmer.name}</Text>
            </View>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.duration(500).delay(100)} 
            style={styles.infoContainer}
          >
            <View style={styles.ratingContainer}>
              <View style={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    color="#f59e0b"
                    fill={i < Math.floor(farmer.averageRating) ? "#f59e0b" : "transparent"}
                  />
                ))}
              </View>
              <Text style={styles.ratingText}>{farmer.averageRating.toFixed(1)}</Text>
              <Text style={styles.reviewCount}>
                ({farmer.reviews.length} {farmer.reviews.length === 1 ? 'review' : 'reviews'})
              </Text>
            </View>

            <View style={styles.locationContainer}>
              <MapPin size={18} color="#666" />
              <Text style={styles.locationText}>{farmer.location}</Text>
            </View>

            <TouchableOpacity style={styles.phoneContainer}>
              <Phone size={18} color="#4b7f52" />
              <Text style={styles.phoneText}>{farmer.phoneNumber}</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.duration(500).delay(200)} 
            style={styles.sectionContainer}
          >
            <SectionTitle title="About" />
            <Text style={styles.aboutText}>{farmer.about}</Text>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.duration(500).delay(300)} 
            style={styles.sectionContainer}
          >
            <SectionTitle 
              title="Products" 
              subtitle={`${farmer.products.length} products available`} 
            />
            {renderProductGrid(farmer.products)}
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.duration(500).delay(400)} 
            style={styles.sectionContainer}
          >
            <View style={styles.reviewsHeader}>
              <SectionTitle title="Reviews" />
              <Button 
                title="Write a Review" 
                onPress={() => setIsReviewModalOpen(true)} 
                variant="primary"
                size="small"
              />
            </View>
            
            <View style={styles.reviewsContainer}>
              {farmer.reviews.length === 0 ? (
                <Text style={styles.noReviewsText}>No reviews yet. Be the first to leave a review!</Text>
              ) : (
                farmer.reviews.map((review, index) => (
                  <Animated.View 
                    key={review.id} 
                    entering={FadeInDown.duration(400).delay(getAnimationDelay(index))}
                  >
                    <ReviewCard review={review} />
                  </Animated.View>
                ))
              )}
            </View>
          </Animated.View>
        </ScrollView>

        {isReviewModalOpen && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Write a Review</Text>
              
              {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Your Name</Text>
                <TextInput
                  style={styles.input}
                  value={customerName}
                  onChangeText={setCustomerName}
                  placeholder="Enter your name"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Rating</Text>
                <RatingInput 
                  maxRating={5}
                  defaultRating={reviewRating}
                  size={30}
                  onChange={setReviewRating}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Review</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={reviewText}
                  onChangeText={setReviewText}
                  placeholder="Share your experience with this farmer"
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                />
              </View>
              
              <View style={styles.modalButtons}>
                <Button
                  title="Cancel"
                  onPress={() => setIsReviewModalOpen(false)}
                  variant="outline"
                  style={styles.modalButton}
                />
                <Button
                  title="Submit Review"
                  onPress={handleSubmitReview}
                  loading={isSubmitting}
                  style={styles.modalButton}
                />
              </View>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notFoundText: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  backButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 40,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    padding: 16,
  },
  farmerName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'Poppins-Bold',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 4,
    fontFamily: 'Poppins-SemiBold',
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneText: {
    fontSize: 16,
    color: '#4b7f52',
    marginLeft: 8,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  aboutText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    fontFamily: 'Poppins-Regular',
  },
  productGrid: {
    flexDirection: 'column',
  },
  productGridLarge: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '100%',
  },
  productItemLarge: {
    width: '48%',
    marginBottom: 16,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  reviewsContainer: {
    marginTop: 8,
  },
  noReviewsText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
    fontFamily: 'Poppins-Regular',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContainer: {
    width: '90%',
    maxWidth: 500,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'Poppins-Bold',
  },
  errorText: {
    color: '#e53e3e',
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    fontFamily: 'Poppins-Regular',
    outlineStyle: 'none',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});