import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Chrome as Home, Search, User, Store } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';

export default function TabLayout() {
  const { user } = useAuth();
  const isFarmer = user?.userType === 'farmer';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4b7f52',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          paddingTop: Platform.OS === 'ios' ? 10 : 0,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
          height: Platform.OS === 'ios' ? 85 : 65,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Poppins-Medium',
          marginBottom: Platform.OS === 'ios' ? 0 : 5,
        },
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: {
          fontFamily: 'Poppins-SemiBold',
          fontSize: 20,
        },
        headerTitleAlign: 'center',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Farms',
          tabBarLabel: 'Farms',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
          headerTitle: 'Local Farms',
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Search size={size} color={color} />
          ),
          headerTitle: 'Search Products',
        }}
      />
      {isFarmer && (
        <Tabs.Screen
          name="store"
          options={{
            title: 'My Store',
            tabBarLabel: 'Store',
            tabBarIcon: ({ color, size }) => (
              <Store size={size} color={color} />
            ),
            headerTitle: 'Manage Store',
          }}
        />
      )}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
          headerTitle: 'Your Profile',
        }}
      />
    </Tabs>
  );
}