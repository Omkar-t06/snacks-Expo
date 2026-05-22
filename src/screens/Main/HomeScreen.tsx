import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { restaurants } from '../../data/dummyData';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../theme';
import RestaurantCard from '../../components/Main/RestaurantCard';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen({ navigation }: { navigation: any }) {
  const { addToCart } = useContext(AuthContext);
  const theme = useTheme();
  const { colors, roundness, typography, spacing, shadows } = theme;
  const insets = useSafeAreaInsets();

  const renderTopRestaurantCard = ({ item }: any) => (
    <Pressable
      style={[
        styles.topCard,
        shadows.subtle,
        { backgroundColor: colors.surface, borderRadius: roundness.md }
      ]}
      onPress={() => navigation.navigate('RestaurantDetail', { id: item.id, name: item.name, price: item.price || '$$', image: item.image })}
    >
      <Image source={{ uri: item.image }} style={styles.topCardImage} />
      <View style={styles.topCardBody}>
        <Text numberOfLines={1} style={[styles.topCardTitle, { color: colors.text, fontFamily: typography.fonts.bold }]}>
          {item.name}
        </Text>
        <Text style={[styles.topCardMeta, { color: colors.textSecondary }]}>
          {item.deliveryTime} • <Ionicons name="star" size={12} color={colors.primary} /> {item.rating}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={[styles.container]}
        showsVerticalScrollIndicator={false}
      >
      <View style={[styles.headerContainer, { paddingHorizontal: spacing.md, paddingTop: spacing.md }]}>
        <View style={styles.headerTopRow}>
          <View style={styles.locationWrap}>
            <View style={styles.flexRow}>
              <Text style={[styles.deliverToText, { color: colors.textSecondary }]}>Deliver to</Text>
              <Ionicons name="chevron-down" size={14} color={colors.text} style={{ marginLeft: 4 }} />
            </View>
            <Text style={[styles.addressText, { color: colors.text, fontFamily: typography.fonts.bold }]}>
              32/12, Konta, Chhattisgarh
            </Text>
          </View>
          <Pressable style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
          </Pressable>
        </View>
        <View style={[styles.searchBarRow, { marginTop: spacing.md }]}>
          <View style={[styles.searchInputWrapper, { backgroundColor: colors.surface, borderRadius: roundness.sm }]}>
            <Ionicons name="search" size={20} color={colors.textMuted} style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Search for snacks, cuisines..."
              placeholderTextColor={colors.textMuted}
              style={[styles.searchInput, { color: colors.text }]}
            />
          </View>
          <Pressable style={[styles.filterBtn, { backgroundColor: colors.primaryLight, borderRadius: roundness.sm }]}>
            <Ionicons name="options-outline" size={20} color={colors.primary} />
          </Pressable>
        </View>
      </View>
      <View style={[styles.bannerContainer, { marginHorizontal: spacing.md, marginTop: spacing.md, borderRadius: roundness.lg, backgroundColor: colors.text }]}>
        <View style={styles.bannerLeft}>
          <Text style={[styles.bannerSubHeader, { color: colors.primary }]}>Midnight cravings?</Text>
          <Text style={[styles.bannerHeader, { color: '#FFFFFF', fontFamily: typography.fonts.bold }]}>
            We've got you! 🌙
          </Text>
          <Text style={styles.bannerMetaText}>10–15 min delivery</Text>
          <Pressable style={[styles.bannerBtn, { backgroundColor: colors.primary, borderRadius: roundness.xs }]}>
            <Text style={styles.bannerBtnText}>Order Now</Text>
          </Pressable>
        </View>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300' }}
          style={styles.bannerImage}
        />
      </View>
      <View style={{ marginTop: spacing.lg }}>
        <View style={[styles.sectionHeaderRow, { paddingHorizontal: spacing.md }]}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: typography.fonts.bold }]}>
            Top Restaurants
          </Text>
          <Pressable><Text style={{ color: colors.primary, fontWeight: '600' }}>See all</Text></Pressable>
        </View>
        <FlatList
          data={restaurants}
          keyExtractor={(item) => `top-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: spacing.md, paddingRight: spacing.xs, paddingTop: spacing.sm, marginBottom: spacing.lg }}
          renderItem={renderTopRestaurantCard}
        />
      </View>
      <View style={{ marginTop: spacing.lg, paddingHorizontal: spacing.md, marginBottom: spacing.xl }}>
        <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: typography.fonts.bold, marginBottom: spacing.sm }]}>
          Popular Near You
        </Text>
        {restaurants.map((item: any) => (
          <Pressable key={`popular-${item.id}`} onPress={() => navigation.navigate('RestaurantDetail', { id: item.id, name: item.name, price: item.price || '$$', image: item.image })}>
            <RestaurantCard item={item} onAdd={(it) => (addToCart as any)(it.menu?.[0] || it)} />
          </Pressable>
        ))}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flexRow: { flexDirection: 'row', alignItems: 'center' },
  flexRowJustified: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
  headerContainer: { width: '100%' },
  headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  locationWrap: { flex: 1 },
  deliverToText: { fontSize: 12, fontWeight: '500' },
  addressText: { fontSize: 15, marginTop: 2 },
  notificationBtn: { padding: 4 },
  searchBarRow: { flexDirection: 'row', width: '100%', gap: 10 },
  searchInputWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, height: 46 },
  searchInput: { flex: 1, fontSize: 14, height: '100%' },
  filterBtn: { width: 46, height: 46, justifyContent: 'center', alignItems: 'center' },
  bannerContainer: { padding: 16, flexDirection: 'row', height: 135, overflow: 'hidden' },
  bannerLeft: { flex: 1.2, justifyContent: 'center' },
  bannerSubHeader: { fontSize: 13, fontWeight: '600' },
  bannerHeader: { fontSize: 18, marginTop: 2 },
  bannerMetaText: { color: '#CED4DA', fontSize: 11, marginTop: 4 },
  bannerBtn: { marginTop: 10, paddingVertical: 6, paddingHorizontal: 12, alignSelf: 'flex-start' },
  bannerBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  bannerImage: { flex: 0.8, height: '110%', width: '100%', resizeMode: 'cover', position: 'relative', right: -10, borderRadius: 8 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 18 },
  topCard: { width: SCREEN_WIDTH * 0.36, marginRight: 14, overflow: 'hidden', paddingBottom: 8 },
  topCardImage: { width: '100%', height: 95, resizeMode: 'cover' },
  topCardBody: { padding: 8 },
  topCardTitle: { fontSize: 14 },
  topCardMeta: { fontSize: 11, marginTop: 4, flexDirection: 'row', alignItems: 'center' },
  popularCard: { flexDirection: 'row', padding: 10, marginBottom: 12, alignItems: 'center' },
  popularImage: { width: 85, height: 85, borderRadius: 8 },
  popularCardBody: { flex: 1, marginLeft: 12, height: 85, justifyContent: 'space-between', paddingVertical: 2 },
  popularTitle: { fontSize: 15 },
  popularMeta: { fontSize: 12 },
  addBtn: { paddingVertical: 6, paddingHorizontal: 16 },
});