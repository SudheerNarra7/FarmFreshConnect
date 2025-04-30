import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  StyleProp, 
  ViewStyle, 
  TextStyle,
  Platform
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  // Size styles
  const sizeStyles = {
    small: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      fontSize: 14,
    },
    medium: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      fontSize: 16,
    },
    large: {
      paddingVertical: 14,
      paddingHorizontal: 24,
      fontSize: 18,
    },
  };

  // Variant styles
  const variantStyles = {
    primary: {
      backgroundColor: '#4b7f52',
      color: '#fff',
      borderColor: '#4b7f52',
    },
    secondary: {
      backgroundColor: '#f59e0b',
      color: '#fff',
      borderColor: '#f59e0b',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#4b7f52',
      borderColor: '#4b7f52',
    },
  };

  // Combine base styles with variant and size styles
  const buttonStyles = [
    styles.button,
    { 
      paddingVertical: sizeStyles[size].paddingVertical, 
      paddingHorizontal: sizeStyles[size].paddingHorizontal,
      backgroundColor: variantStyles[variant].backgroundColor,
      borderColor: variantStyles[variant].borderColor,
    },
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    { 
      fontSize: sizeStyles[size].fontSize,
      color: variantStyles[variant].color,
    },
    variant === 'outline' && styles.outlineText,
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={buttonStyles}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' ? '#4b7f52' : '#fff'} 
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ':hover': {
          opacity: 0.9,
        },
      },
    }),
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
    opacity: 0.7,
  },
  disabledText: {
    color: '#888',
  },
  outlineText: {
    color: '#4b7f52',
  },
});