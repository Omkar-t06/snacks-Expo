import React, { useContext } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import MainTab from './MainTab';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../theme';

const Drawer = createDrawerNavigator();

function SettingsScreen() {
    const { colors, typography } = useTheme();
    return (
        <View style={[styles.centerScreen, { backgroundColor: colors.background }]}>
            <Ionicons name="settings-outline" size={48} color={colors.textMuted} />
            <Text style={[styles.placeholderText, { color: colors.text, fontFamily: typography.fonts.medium }]}>
                Configuration Settings Hub
            </Text>
        </View>
    );
}

function HelpScreen() {
    const { colors, typography } = useTheme();
    return (
        <View style={[styles.centerScreen, { backgroundColor: colors.background }]}>
            <Ionicons name="help-circle-outline" size={48} color={colors.textMuted} />
            <Text style={[styles.placeholderText, { color: colors.text, fontFamily: typography.fonts.medium }]}>
                Customer Support System
            </Text>
        </View>
    );
}

function CustomDrawerContent(props: any) {
    const { user, logout } = useContext(AuthContext);
    const theme = useTheme();
    const { colors, roundness, typography, spacing, shadows } = theme;

    const CustomDrawerItem = ({ label, icon, targetScreen, nestedScreen }: { label: string; icon: string; targetScreen: string; nestedScreen?: string }) => {
        const state = props.state;
        const activeRouteName = state.routes[state.index].name;
        const isSelected = activeRouteName === targetScreen;

        return (
            <Pressable
                onPress={() => {
                    if (nestedScreen) {
                        props.navigation.navigate(targetScreen, { screen: nestedScreen });
                    } else {
                        props.navigation.navigate(targetScreen);
                    }
                }}
                style={({ pressed }) => [
                    styles.drawerLinkRow,
                    {
                        backgroundColor: isSelected ? colors.primaryLight : 'transparent',
                        borderRadius: roundness.sm,
                        opacity: pressed ? 0.8 : 1,
                        marginVertical: spacing.xxs
                    }
                ]}
            >
                <View style={styles.flexRow}>
                    <Ionicons
                        name={icon as any}
                        size={22}
                        color={isSelected ? colors.primary : colors.textSecondary}
                        style={{ marginRight: spacing.md }}
                    />
                    <Text style={[
                        styles.linkText,
                        {
                            color: isSelected ? colors.primary : colors.text,
                            fontFamily: isSelected ? typography.fonts.bold : typography.fonts.medium
                        }
                    ]}>
                        {label}
                    </Text>
                </View>
                <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={isSelected ? colors.primary : colors.textMuted}
                />
            </Pressable>
        );
    };

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContainer}>
            <View style={[
                styles.drawerHeaderCard,
                shadows.subtle,
                {
                    backgroundColor: theme.dark ? colors.surfaceElevated : '#FFEBE3',
                    borderBottomWidth: 1,
                    borderBottomColor: colors.divider,
                    paddingTop: spacing.xl,
                    paddingBottom: spacing.lg
                }
            ]}>
                <Image
                    source={{ uri: `https://api.dicebear.com/9.x/glass/png?seed=${user?.email || 'guest'}` }}
                    style={[styles.drawerAvatar, { borderColor: colors.surface, borderRadius: 35 }]}
                />
                <Text numberOfLines={1} style={[styles.userNameText, { color: colors.text, fontFamily: typography.fonts.bold }]}>
                    {user?.name ?? 'Alex Harrison'}
                </Text>
                <Text numberOfLines={1} style={[styles.userEmailText, { color: colors.textSecondary }]}>
                    {user?.email ?? 'alex.h@snackexpo.com'}
                </Text>
            </View>
            <View style={[styles.linksSection, { paddingHorizontal: spacing.sm, paddingTop: spacing.md }]}>
                <CustomDrawerItem label="Home Matrix" icon="fast-food-outline" targetScreen="MainTabs" nestedScreen="Home" />
                <CustomDrawerItem label="My Orders" icon="document-text-outline" targetScreen="MainTabs" nestedScreen="Orders" />
                <CustomDrawerItem label="Settings Configurations" icon="settings-outline" targetScreen="Settings" />
                <CustomDrawerItem label="Help & Support" icon="help-circle-outline" targetScreen="Help" />
            </View>
            <View style={[styles.footerZone, { padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.divider }]}>
                <Pressable
                    onPress={logout}
                    style={({ pressed }) => [
                        styles.signOutBtn,
                        shadows.subtle,
                        { backgroundColor: colors.errorBackground, borderRadius: roundness.md, opacity: pressed ? 0.85 : 1 }
                    ]}
                >
                    <Ionicons name="log-out-outline" size={18} color={colors.error} style={{ marginRight: spacing.xs }} />
                    <Text style={[styles.signOutText, { color: colors.error, fontFamily: typography.fonts.bold }]}>
                        Log out
                    </Text>
                </Pressable>
            </View>

        </DrawerContentScrollView>
    );
}

export default function AppDrawer() {
    const { colors } = useTheme();

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    width: 290,
                    backgroundColor: colors.surface
                }
            }}
        >
            <Drawer.Screen name="MainTabs" component={MainTab} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
            <Drawer.Screen name="Help" component={HelpScreen} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    scrollContainer: { flex: 1 },
    centerScreen: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
    placeholderText: { fontSize: 15 },
    flexRow: { flexDirection: 'row', alignItems: 'center' },
    drawerHeaderCard: { width: '100%', paddingHorizontal: 20, justifyContent: 'center' },
    drawerAvatar: { width: 70, height: 70, borderWidth: 2, marginBottom: 12 },
    userNameText: { fontSize: 17, letterSpacing: -0.3 },
    userEmailText: { fontSize: 13, marginTop: 2 },
    linksSection: { flex: 1 },
    drawerLinkRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 14,
    },
    linkText: { fontSize: 14, letterSpacing: -0.1 },
    footerZone: { width: '100%' },
    signOutBtn: {
        height: 48,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signOutText: { fontSize: 14 }
});