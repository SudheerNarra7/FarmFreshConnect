import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import ProfileHeader from '@/components/ProfileHeader';
import SectionTitle from '@/components/SectionTitle';
import { Heart, Star, Settings, Bell, CircleHelp as HelpCircle, ShieldCheck } from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)');
    }
  }, [isAuthenticated, router]);

  const ProfileOption = ({ icon, title, subtitle }) => (
    <TouchableOpacity style={styles.optionContainer}>
      <View style={[styles.iconContainer]}>
        {icon}
      </View>
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionTitle}>{title}</Text>
        {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ProfileHeader />
      
      <View style={styles.section}>
        <SectionTitle title="Your Activity" />
        
        <ProfileOption 
          icon={<Heart size={22} color="#e53e3e" />}
          title="Favorite Farms" 
          subtitle="Farms you've saved for later"
        />
        
        <ProfileOption 
          icon={<Star size={22} color="#f59e0b" />}
          title="Your Reviews" 
          subtitle="Manage your farm reviews"
        />
      </View>
      
      <View style={styles.section}>
        <SectionTitle title="Settings" />
        
        <ProfileOption 
          icon={<Settings size={22} color="#4a5568" />}
          title="Account Settings" 
          subtitle="Manage your account details"
        />
        
        <ProfileOption 
          icon={<Bell size={22} color="#4a5568" />}
          title="Notifications" 
          subtitle="Configure your notification preferences"
        />
        
        <ProfileOption 
          icon={<ShieldCheck size={22} color="#4a5568" />}
          title="Privacy & Security" 
          subtitle="Manage your privacy settings"
        />
      </View>
      
      <View style={styles.section}>
        <SectionTitle title="Support" />
        
        <ProfileOption 
          icon={<HelpCircle size={22} color="#4a5568" />}
          title="Help Center" 
          subtitle="Get help with using the app"
        />
      </View>
      
      <Text style={styles.versionText}>Farm Fresh Connect v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        ':hover': {
          backgroundColor: '#f5f5f5'
        }
      }
    })
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
    marginTop: 24,
    fontFamily: 'Poppins-Regular',
  },
});