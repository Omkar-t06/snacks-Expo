import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]); // Array of snacks for cart

  useEffect(() => {
    // Check for token when app starts
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.error('Restoring token failed:', e);
      }
      setUserToken(token);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  const signUp = async (name, email, password) => {
    setIsLoading(true);
    if (!name || !email || !password) {
      throw new Error("All fields are required!");
    }
    try {
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userName', name);
      await AsyncStorage.setItem('password', password);

      const token = 'dummy-auth-token';
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
    } catch (error) {
      throw new Error("Failed to save credentials during signup.");
    } finally {
      setIsLoading(false);
    }
  }

  const login = async (email, password) => {
    setIsLoading(true);
    if (!email || !password) {
      throw new Error("All fields are required");
    }

    const storedEmail = await AsyncStorage.getItem('userEmail');
    const storedPassword = await AsyncStorage.getItem('password');

    if (storedEmail === email && storedPassword === password) {
      const token = 'dummy-auth-token';
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
    } else {
      throw new Error("Invalid credentials. Please try again.");
    }
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('userToken');
      setUserToken(null);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const clearCart = () => setCart([]);

  return (
    <AuthContext.Provider value={{ userToken, isLoading, login, logout, cart, addToCart, clearCart }}>
      {children}
    </AuthContext.Provider>
  );
};
