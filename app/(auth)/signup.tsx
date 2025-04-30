import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Image, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/Button';

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'customer' | 'farmer' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !userType) {
      setError('Please fill in all fields and select a user type');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const success = await signUp(name, email, password, userType);
      if (success) {
        router.replace('/(tabs)');
      } else {
        setError('Email already exists');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg' }}
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>Farm Fresh Connect</Text>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join our community of local farmers and food enthusiasts</Text>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <View style={styles.userTypeContainer}>
            <TouchableOpacity
              style={[
                styles.userTypeButton,
                userType === 'customer' && styles.userTypeButtonSelected
              ]}
              onPress={() => setUserType('customer')}
            >
              <Text style={[
                styles.userTypeText,
                userType === 'customer' && styles.userTypeTextSelected
              ]}>Customer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.userTypeButton,
                userType === 'farmer' && styles.userTypeButtonSelected
              ]}
              onPress={() => setUserType('farmer')}
            >
              <Text style={[
                styles.userTypeText,
                userType === 'farmer' && styles.userTypeTextSelected
              ]}>Farmer</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              autoCapitalize="words"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Choose a password"
              secureTextEntry
            />
          </View>
          
          <Button
            title="Sign Up"
            onPress={handleSignUp}
            loading={loading}
            fullWidth
            style={styles.signUpButton}
          />
          
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <Link href="/(auth)" asChild>
              <TouchableOpacity>
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  logoText: {
    marginTop: 16,
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Poppins-Bold',
    color: '#4b7f52',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    fontFamily: 'Poppins-Regular',
  },
  errorText: {
    color: '#e53e3e',
    marginBottom: 16,
    fontFamily: 'Poppins-Regular',
  },
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  userTypeButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  userTypeButtonSelected: {
    borderColor: '#4b7f52',
    backgroundColor: '#f0f8f1',
  },
  userTypeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    fontFamily: 'Poppins-SemiBold',
  },
  userTypeTextSelected: {
    color: '#4b7f52',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Regular',
    outlineStyle: 'none',
  },
  signUpButton: {
    marginTop: 10,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    gap: 8,
  },
  loginText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  loginLink: {
    fontSize: 16,
    color: '#4b7f52',
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
});