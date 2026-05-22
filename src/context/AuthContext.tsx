import { createContext, ReactNode, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
    name: string;
    email: string;
}

export interface CartItem {
    id: string | number;
    quantity?: number;
    [key: string]: any;
}

export interface OrderItem {
    id: string;
    date: string;
    status: 'Delivered' | 'Ongoing' | 'Cancelled';
    statusColor: string;
    itemsSummary: string;
    itemCount: number;
    price: number;
}

export interface AuthContextType {
    userToken: string | null;
    user: User | null;
    isLoading: boolean;
    login: (
        email: string,
        password: string
    ) => Promise<void>;
    signUp: (
        name: string,
        email: string,
        password: string
    ) => Promise<void>;
    logout: () => Promise<void>;
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (
        id: string | number
    ) => void;
    clearCart: () => void;
    // Orders
    orders: OrderItem[];
    addOrder: (order: OrderItem) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
    userToken: null,
    user: null,
    isLoading: true,
    // auth functions (stubs)
    login: async (email: string, password: string) => {},
    signUp: async (name: string, email: string, password: string) => {},
    logout: async () => {},
    // cart
    cart: [],
    addToCart: (item: CartItem) => {},
    removeFromCart: (id: string | number) => {},
    clearCart: () => {},
    // orders
    orders: [],
    addOrder: (order: OrderItem) => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [userToken, setUserToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [cart, setCart] = useState<CartItem[]>([]);
    const [orders, setOrders] = useState<OrderItem[]>([]);

    // Restore session on app start
    useEffect(() => {
        const bootstrapAsync = async () => {
            setIsLoading(true);

            try {
                const token = await AsyncStorage.getItem('userToken');

                const storedUser = await AsyncStorage.getItem('user');

                if (token) {
                    setUserToken(token);
                }

                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }

                const storedOrders = await AsyncStorage.getItem('orders');
                if (storedOrders) {
                    setOrders(JSON.parse(storedOrders));
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
        name: string,
        email: string,
        password: string
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
    const login = async (email: string, password: string) => {
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
    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const idx = prev.findIndex((i) => i.id === item.id);
            if (idx !== -1) {
                return prev.map((i, index) =>
                    index === idx ? { ...i, quantity: (i.quantity || 1) + 1 } : i
                );
            }

            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id: string | number) => {
        setCart((prev) => {
            const idx = prev.findIndex((i) => i.id === id);
            if (idx === -1) return prev;

            const found = prev[idx];
            const qty = found.quantity || 1;

            if (qty > 1) {
                return prev.map((i, index) =>
                    index === idx ? { ...i, quantity: qty - 1 } : i
                );
            }

            return prev.filter((i) => i.id !== id);
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    // ORDERS
    const addOrder = async (order: OrderItem) => {
        setOrders((prev) => {
            const next = [order, ...prev];
            AsyncStorage.setItem('orders', JSON.stringify(next)).catch((e) => console.error('Failed to persist orders', e));
            return next;
        });
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
                // Orders
                orders,
                addOrder,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};