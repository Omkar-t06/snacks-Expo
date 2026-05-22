import React, { useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>      
      <ScrollView style={{ flex: 1 }}>
      <View style={[
        styles.profileHeaderCard, 
        shadows.subtle,
        { 
          backgroundColor: theme.dark ? colors.surface : '#FFEBE3',
          borderBottomLeftRadius: roundness.xxl, 
          borderBottomRightRadius: roundness.xxl,
          paddingVertical: spacing.xl
        }
      ]}>
        <Image 
          source={{ uri: `https://api.dicebear.com/9.x/glass/png?seed=${user?.email}` }} 
          style={[styles.avatar, { borderColor: colors.surface, borderRadius: 50 }]} 
        />
        <Text style={[styles.userName, { color: colors.text, fontFamily: typography.fonts.bold }]}>{user?.name ?? 'John Doe'}</Text>
        <Text style={[styles.userEmail, { color: colors.textSecondary }]}>{user?.email ?? 'john.doe@gmail.com'}</Text>
      </View>

      {/* 2. Menu Links Group Container */}
      <View style={[styles.menuContainer, { marginTop: spacing.md }]}>
        
        {/* Practicing Programmatic Navigation to Hidden Drawer/Nested items */}
        <ProfileMenuRow 
          icon="document-text-outline" 
          title="My Orders" 
          onPress={() => navigation.navigate('My Orders')} 
        />
        
        <ProfileMenuRow 
          icon="settings-outline" 
          title="Settings" 
          onPress={() => {
            // Programmatically sliding open the Left side Drawer Layout directly (Screen 7 View)
            navigation.openDrawer();
          }} 
        />
        
        <ProfileMenuRow 
          icon="help-circle-outline" 
          title="Help & Support" 
          onPress={() => navigation.navigate('Help')} 
        />

        {/* 3. Red Accent Sign Out Interaction Element */}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flexRow: { flexDirection: 'row', alignItems: 'center' },
  profileHeaderCard: { width: '100%', alignItems: 'center', justifyContent: 'center' },
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