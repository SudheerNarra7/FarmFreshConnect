import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { Star } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface RatingInputProps {
  maxRating?: number;
  defaultRating?: number;
  size?: number;
  onChange: (rating: number) => void;
}

export default function RatingInput({ 
  maxRating = 5, 
  defaultRating = 0,
  size = 30,
  onChange 
}: RatingInputProps) {
  const [rating, setRating] = useState(defaultRating);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handlePress = (selectedRating: number) => {
    setRating(selectedRating);
    onChange(selectedRating);
  };

  const AnimatedStar = Animated.createAnimatedComponent(Star);

  return (
    <View style={styles.container}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hoveredRating || rating);
        
        const animatedStyle = useAnimatedStyle(() => {
          return {
            transform: [
              { 
                scale: withTiming(isFilled ? 1.1 : 1, { 
                  duration: 200 
                }) 
              }
            ],
          };
        });

        return (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(starValue)}
            style={styles.starContainer}
            {...(Platform.OS === 'web' ? {
              onMouseEnter: () => setHoveredRating(starValue),
              onMouseLeave: () => setHoveredRating(0),
            } : {})}
            activeOpacity={0.8}
          >
            <AnimatedStar
              size={size}
              color="#f59e0b"
              fill={isFilled ? "#f59e0b" : "transparent"}
              style={animatedStyle}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  starContainer: {
    padding: 4,
  },
});