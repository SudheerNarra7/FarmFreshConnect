import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Star } from 'lucide-react-native';
import type { Review } from '@/data/farms';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{review.customerName}</Text>
        <Text style={styles.date}>{formatDate(review.timestamp)}</Text>
      </View>
      
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            color="#f59e0b"
            fill={i < review.rating ? "#f59e0b" : "transparent"}
          />
        ))}
      </View>
      
      <Text style={styles.text}>{review.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  }
});