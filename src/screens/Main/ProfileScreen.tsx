import React, { useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../theme';

export interface User {
  name: string;
  email: string;
}

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const { user, logout } = useContext(AuthContext);
  const theme = useTheme();
  const { colors, roundness, typography, spacing, shadows } = theme;
  
  const insets = useSafeAreaInsets();

  const handleOpenDrawerMenu = () => {
    const parent = navigation.getParent();
    if (parent?.openDrawer) {
      parent.openDrawer();
    }
  };

  const ProfileMenuRow = ({ icon, title, onPress }: { icon: string; title: string; onPress: () => void }) => (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        styles.menuRow, 
        { 
          backgroundColor: colors.surface, 
          borderBottomColor: colors.divider,
          opacity: pressed ? 0.8 : 1 
        }
      ]}
    >
      <View style={styles.flexRow}>
        <Ionicons name={icon as any} size={20} color={colors.textSecondary} style={{ marginRight: spacing.md }} />
        <Text style={[styles.menuText, { color: colors.text, fontFamily: typography.fonts.medium }]}>
          {title}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>       
      <ScrollView style={{ flex: 1 }} bounces={false} showsVerticalScrollIndicator={false}>
        <View style={[
          styles.profileHeaderCard, 
          shadows.subtle,
          { 
            backgroundColor: theme.dark ? colors.surface : '#FFEBE3',
            borderBottomLeftRadius: roundness.xxl, 
            borderBottomRightRadius: roundness.xxl,
            paddingTop: insets.top > 0 ? insets.top + spacing.xs : spacing.lg,
            paddingBottom: spacing.xl
          }
        ]}>
          <View style={styles.topActionBar}>
            <Pressable 
              onPress={handleOpenDrawerMenu}
              style={({ pressed }) => [styles.actionIconButton, { opacity: pressed ? 0.7 : 1 }]}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
              <Ionicons name="menu" size={26} color={colors.text} />
            </Pressable>
          </View>
          <Image 
            source={{ uri: `https://api.dicebear.com/9.x/glass/png?seed=${user?.email || 'default'}` }} 
            style={[styles.avatar, { borderColor: colors.surface, borderRadius: 50 }]} 
          />
          <Text style={[styles.userName, { color: colors.text, fontFamily: typography.fonts.bold }]}>
            {user?.name ?? 'John Doe'}
          </Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
            {user?.email ?? 'john.doe@gmail.com'}
          </Text>
        </View>
        <View style={[styles.menuContainer, { marginTop: spacing.md }]}>
          <ProfileMenuRow 
            icon="document-text-outline" 
            title="My Orders" 
            onPress={() => navigation.navigate('My Orders')} 
          />
          <ProfileMenuRow 
            icon="settings-outline" 
            title="Settings" 
            onPress={() => {}} 
          />
          <ProfileMenuRow 
            icon="help-circle-outline" 
            title="Help & Support" 
            onPress={() => navigation.navigate('Help')} 
          />
          <Pressable 
            onPress={logout} 
            style={({ pressed }) => [
              styles.menuRow, 
              { 
                backgroundColor: colors.surface, 
                borderBottomColor: 'transparent',
                marginTop: spacing.md,
                opacity: pressed ? 0.8 : 1 
              }
            ]}
          >
            <View style={styles.flexRow}>
              <Ionicons name="log-out-outline" size={20} color={colors.error} style={{ marginRight: spacing.md }} />
              <Text style={[styles.menuText, { color: colors.error, fontFamily: typography.fonts.bold }]}>
                Logout
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.error} />
          </Pressable>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flexRow: { flexDirection: 'row', alignItems: 'center' },
  profileHeaderCard: { width: '100%', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  topActionBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  actionIconButton: {
    padding: 4,
  },
  avatar: { width: 90, height: 90, borderWidth: 3, marginBottom: 12 },
  userName: { fontSize: 20, letterSpacing: -0.5 },
  userEmail: { fontSize: 13, marginTop: 2 },
  menuContainer: { width: '100%' },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  menuText: { fontSize: 15 }
});