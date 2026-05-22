import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Pressable, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { AuthContext } from '../../context/AuthContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mock data structure representing menu components for Screen 2
const MOCK_MENU_ITEMS = [
  {
    id: 'm1',
    name: 'Peri Peri Fries',
    price: 79,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=200',
  },
  {
    id: 'm2',
    name: 'Crispy Chicken Popcorn',
    price: 99,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=200',
  },
  {
    id: 'm3',
    name: 'Margherita Pizza Mini',
    price: 149,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=200',
  }
];

export default function RestaurantDetailScreen({ route, navigation }: { route: any; navigation: any }) {
  // Read params passed by the navigator (name, price, image)
  const { name, price, image } = route.params ?? {};
  
  const theme = useTheme();
  const { colors, roundness, typography, spacing, shadows } = theme;
  const { cart, addToCart } = useContext(AuthContext);

  const cartCount = cart.length;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* 1. Large Hero Cover Image Frame with Overlay Controls */}
        <View style={styles.imageContainer}>
          <Image 
            source={ image ? { uri: image } : { uri: MOCK_MENU_ITEMS[0].image } }
            style={styles.heroImage} 
          />
          {/* Custom Header Floating Actions inside the image matrix canvas wrapper */}
          <View style={styles.floatingHeaderRow}>
            <Pressable onPress={() => navigation.goBack()} style={[styles.circularBtn, { backgroundColor: colors.surface }]}>
              <Ionicons name="arrow-back" size={20} color={colors.text} />
            </Pressable>
            <View style={styles.rightHeaderActions}>
              <Pressable style={[styles.circularBtn, { backgroundColor: colors.surface }]}>
                <Ionicons name="heart-outline" size={20} color={colors.text} />
              </Pressable>
              <Pressable style={[styles.circularBtn, { backgroundColor: colors.surface, marginLeft: 10 }]}>
                <Ionicons name="share-social-outline" size={20} color={colors.text} />
              </Pressable>
            </View>
          </View>
        </View>

        {/* 2. Restaurant Metadata Profile Identity Card */}
        <View style={[styles.metaCard, shadows.subtle, { backgroundColor: colors.surface, borderRadius: roundness.md, margin: spacing.md, marginTop: -spacing.lg }]}>
          <View style={styles.flexRowJustified}>
            <Text style={[styles.restaurantName, { color: colors.text, fontFamily: typography.fonts.bold }]}>
              {name}
            </Text>
            <Text style={[styles.priceTier, { color: colors.primary, fontFamily: typography.fonts.bold }]}>
              {price}
            </Text>
          </View>
          
          <View style={[styles.ratingRow, { marginTop: spacing.xs }]}>
            <Ionicons name="star" size={14} color="#FFC107" />
            <Text style={[styles.ratingText, { color: colors.text, fontFamily: typography.fonts.medium }]}> 4.6</Text>
            <Text style={{ color: colors.textMuted }}> (1.2k+ reviews) • 20–30 min</Text>
          </View>

          <Text style={[styles.cuisineText, { color: colors.textSecondary, marginTop: spacing.xs }]}>
            Snacks, Beverages, Desserts
          </Text>

          {/* Promotional Coupon Micro Badge matching Screen 2 graphics */}
          <View style={[styles.couponBadge, { backgroundColor: colors.successBackground, borderColor: colors.success, borderRadius: roundness.sm }]}>
            <Text style={[styles.couponText, { color: colors.success, fontFamily: typography.fonts.bold }]}>
              50% OFF up to ₹100
            </Text>
            <Text style={{ color: colors.textSecondary, fontSize: 11 }}> | Use code: SNACK50</Text>
          </View>
        </View>

        {/* 3. Segmented Horizontal Filter Menu Tabs Row */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.menuTabsContainer, { paddingHorizontal: spacing.md }]}>
          {['Recommended', 'Snacks', 'Combos', 'Beverages'].map((tab, idx) => (
            <View key={tab} style={[styles.tabWrapper, idx === 0 && { borderBottomColor: colors.primary }]}>
              <Text style={[styles.tabText, { color: idx === 0 ? colors.primary : colors.textSecondary, fontFamily: idx === 0 ? typography.fonts.bold : typography.fonts.regular }]}>
                {tab}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* 4. Menu Items Listing Sub-Surface Section */}
        <View style={{ paddingHorizontal: spacing.md, marginTop: spacing.md }}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: typography.fonts.bold, marginBottom: spacing.sm }]}>
            Recommended for you
          </Text>

          {MOCK_MENU_ITEMS.map((item) => (
            <View key={item.id} style={[styles.menuItemCard, { borderBottomColor: colors.divider }]}>
              <Image source={{ uri: item.image }} style={styles.menuItemImage} />
              <View style={styles.menuItemBody}>
                <View style={{ flex: 1, paddingRight: 8 }}>
                  <Text style={[styles.itemName, { color: colors.text, fontFamily: typography.fonts.bold }]}>{item.name}</Text>
                  <Text style={[styles.itemPrice, { color: colors.textSecondary }]}>₹{item.price}</Text>
                </View>
                
                <Pressable 
                  onPress={() => addToCart(item)}
                  style={({ pressed }) => [
                    styles.addItemBtn, 
                    { backgroundColor: colors.primary, borderRadius: roundness.sm, opacity: pressed ? 0.9 : 1 }
                  ]}
                >
                  <Text style={[styles.addBtnText, { color: colors.textOnPrimary, fontFamily: typography.fonts.bold }]}>
                    Add +
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 5. Sticky Float Interaction Action Footer Basket Bar Layer (Satisfies requirement constraints) */}
      {cartCount > 0 && (
        <View style={[styles.basketFloatingFooter, shadows.overlay, { backgroundColor: colors.surface }]}>
          <Pressable 
            style={({ pressed }) => [
              styles.basketBtnMain, 
              { backgroundColor: colors.primary, borderRadius: roundness.md, opacity: pressed ? 0.9 : 1 }
            ]}
            onPress={() => navigation.navigate('Cart')}
          >
            <View style={styles.flexRow}>
              <View style={[styles.countIndicatorCircle, { backgroundColor: colors.textOnPrimary }]}>
                <Text style={{ color: colors.primary, fontWeight: '800', fontSize: 12 }}>{cartCount}</Text>
              </View>
              <Text style={[styles.basketBtnText, { color: colors.textOnPrimary, fontFamily: typography.fonts.bold }]}>
                View Basket
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color={colors.textOnPrimary} />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flexRow: { flexDirection: 'row', alignItems: 'center' },
  flexRowJustified: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  imageContainer: { width: '100%', height: 220, position: 'relative' },
  heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  floatingHeaderRow: { position: 'absolute', top: 40, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, alignItems: 'center' },
  circularBtn: { width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center', elevation: 3 },
  rightHeaderActions: { flexDirection: 'row', alignItems: 'center' },
  metaCard: { padding: 16, elevation: 4 },
  restaurantName: { fontSize: 20 },
  priceTier: { fontSize: 18 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: 13 },
  cuisineText: { fontSize: 13 },
  couponBadge: { flexDirection: 'row', paddingVertical: 6, paddingHorizontal: 10, borderWidth: 1, marginTop: 12, alignSelf: 'flex-start', alignItems: 'center' },
  couponText: { fontSize: 12 },
  menuTabsContainer: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E9ECEF', paddingVertical: 2 },
  tabWrapper: { paddingVertical: 10, marginRight: 22, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabText: { fontSize: 14 },
  sectionTitle: { fontSize: 16 },
  menuItemCard: { flexDirection: 'row', paddingVertical: 14, alignItems: 'center', borderBottomWidth: 1 },
  menuItemImage: { width: 64, height: 64, borderRadius: 8, resizeMode: 'cover' },
  menuItemBody: { flex: 1, marginLeft: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemName: { fontSize: 15 },
  itemPrice: { fontSize: 14, marginTop: 4 },
  addItemBtn: { paddingVertical: 6, paddingHorizontal: 16 },
  addBtnText: { fontSize: 13 },
  basketFloatingFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 16, paddingVertical: 14, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.03)' },
  basketBtnMain: { height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 },
  countIndicatorCircle: { width: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  basketBtnText: { fontSize: 15 }
});