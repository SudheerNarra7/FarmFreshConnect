import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react-native';

export default function ProfileHeader() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{user.name.charAt(0)}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.signOutButton}
        onPress={signOut}
      >
        <LogOut size={20} color="#555" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4b7f52',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  initials: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
  },
  signOutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  }
});