import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Chrome as Home, Search, User } from 'lucide-react-native';

export default function TabLayout() {
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