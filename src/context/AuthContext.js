import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    userToken: null,
    user: null,
    isLoading: true,
    // auth functions (stubs)
    login: async (email, password) => {},
    signUp: async (name, email, password) => {},
    logout: async () => {},
    // cart
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
});

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [user, setUser] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const [cart, setCart] = useState([]);

    // Restore session on app start
    useEffect(() => {
        const bootstrapAsync = async () => {
            setIsLoading(true);

            try {
                const token =
                    await AsyncStorage.getItem('userToken');

                const storedUser =
                    await AsyncStorage.getItem('user');

                if (token) {
                    setUserToken(token);
                }

                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error(
                    'Failed to restore auth state:',
                    error
                );
            } finally {
                setIsLoading(false);
            }
        };

        bootstrapAsync();
    }, []);

    // SIGN UP
    const signUp = async (
        name,
        email,
        password
    ) => {
        setIsLoading(true);

        try {
            if (!name || !email || !password) {
                throw new Error(
                    'All fields are required'
                );
            }

            const userData = {
                name,
                email,
            };

            // Store credentials
            await AsyncStorage.setItem(
                'userEmail',
                email
            );

            await AsyncStorage.setItem(
                'password',
                password
            );

            // Store user object
            await AsyncStorage.setItem(
                'user',
                JSON.stringify(userData)
            );

            // Create dummy token
            const token = 'dummy-auth-token';

            await AsyncStorage.setItem(
                'userToken',
                token
            );

            // Update states
            setUser(userData);
            setUserToken(token);

        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // LOGIN
    const login = async (email, password) => {
        setIsLoading(true);

        try {
            if (!email || !password) {
                throw new Error(
                    'All fields are required'
                );
            }

            const storedEmail =
                await AsyncStorage.getItem(
                    'userEmail'
                );

            const storedPassword =
                await AsyncStorage.getItem(
                    'password'
                );

            if (
                storedEmail === email &&
                storedPassword === password
            ) {
                const token = 'dummy-auth-token';

                await AsyncStorage.setItem(
                    'userToken',
                    token
                );

                const storedUser =
                    await AsyncStorage.getItem(
                        'user'
                    );

                if (storedUser) {
                    setUser(
                        JSON.parse(storedUser)
                    );
                }

                setUserToken(token);

            } else {
                throw new Error(
                    'Invalid credentials. Please try again.'
                );
            }

        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // LOGOUT
    const logout = async () => {
        setIsLoading(true);

        try {
            await AsyncStorage.removeItem(
                'userToken'
            );

            setUserToken(null);
            setUser(null);

        } catch (error) {
            console.error(
                'Logout failed:',
                error
            );
        } finally {
            setIsLoading(false);
        }
    };

    // CART
    const addToCart = (item) => {
        setCart((prev) => [...prev, item]);
    };

    const removeFromCart = (id) => {
        setCart((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <AuthContext.Provider
            value={{
                // Auth
                userToken,
                user,
                isLoading,

                // Auth Functions
                login,
                signUp,
                logout,

                // Cart
                cart,
                addToCart,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};