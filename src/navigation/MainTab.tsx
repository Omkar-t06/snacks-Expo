import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import SearchScreen from '../screens/Main/SearchScreen';
import OrdersScreen from '../screens/Main/OrdersScreen';
import ProfileScreen from '../screens/Main/ProfileScreen';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

export default function MainTab() {
  const { cart } = useContext(AuthContext) as any;
  const theme = useTheme();

  const totalCount = (cart || []).reduce((s: number, i: any) => s + (i.quantity || 1), 0);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.divider,
        },
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({ route }: any) => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size ?? 22} color={color} />
          ),
          // hide tab bar on nested screens inside HomeStack
          tabBarStyle: (route?.state?.index > 0) ? { display: 'none' } : undefined,
        })}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="search" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="shopping-cart" size={size ?? 22} color={color} />
          ),
          tabBarBadge: totalCount > 0 ? totalCount : undefined,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-alt" size={size ?? 22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
