import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../theme';
import CartItem from '../../components/Main/CartItem';
import EmptyState from '../../components/Main/EmptyState';

type CartItem = {
  id?: string;
  name?: string;
  price?: number;
  image?: string;
  quantity?: number;
};

export default function CartScreen({ navigation }: { navigation: any }) {
  // Assuming your context provides an explicit item map or update quantities handler
  const ctx = useContext(AuthContext) as any;
  const { cart: rawCart, addToCart, removeFromCart, clearCart } = ctx;
  const cart: CartItem[] = (rawCart as CartItem[]) || [];
  const theme = useTheme();
  const { colors, roundness, typography, spacing, shadows } = theme;

  // Compute clean financial summaries matching wireframe values
  const subtotal = cart.reduce((acc, item) => acc + ((item.price || 0) * (item.quantity || 1)), 0);
  const deliveryFee = subtotal > 0 ? 20 : 0;
  const platformFee = subtotal > 0 ? 10 : 0;
  const totalAmount = subtotal + deliveryFee + platformFee;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      <FlatList
        data={cart}
        keyExtractor={(item, index) => item.id ? `cart-${item.id}-${index}` : String(index)}
        contentContainerStyle={{ padding: spacing.md }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <EmptyState title="Your basket feels remarkably light." subtitle="Add items from restaurants to get started." />
        )}
        renderItem={({ item }: { item: CartItem }) => (
          <CartItem item={item} onAdd={(it) => addToCart(it)} onRemove={(id) => removeFromCart(id)} />
        )}
        ListFooterComponent={() => subtotal > 0 ? (
          <View style={{ marginTop: spacing.md }}>
            {/* Coupon Option Input Row Block */}
            <Pressable style={[styles.couponRow, { backgroundColor: colors.surface, borderRadius: roundness.sm, borderColor: colors.divider }]}>
              <View style={styles.flexRow}>
                <Ionicons name="pricetag-outline" size={18} color={colors.primary} style={{ marginRight: 8 }} />
                <Text style={[styles.couponText, { color: colors.textSecondary }]}>Add a coupon</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Pressable>

            {/* Bill Summary Breakdowns Card */}
            <View style={[styles.summaryBox, { backgroundColor: colors.surface, borderRadius: roundness.md, padding: spacing.md, marginTop: spacing.md }]}>
              <View style={styles.summaryLine}><Text style={{ color: colors.textSecondary }}>Subtotal</Text><Text style={{ color: colors.text }}>₹{subtotal}</Text></View>
              <View style={styles.summaryLine}><Text style={{ color: colors.textSecondary }}>Delivery Fee</Text><Text style={{ color: colors.text }}>₹{deliveryFee}</Text></View>
              <View style={styles.summaryLine}><Text style={{ color: colors.textSecondary }}>Platform Fee</Text><Text style={{ color: colors.text }}>₹{platformFee}</Text></View>
              <View style={[styles.divider, { backgroundColor: colors.divider }]} />
              <View style={styles.summaryLine}>
                <Text style={{ color: colors.text, fontWeight: '700' }}>Total</Text>
                <Text style={{ color: colors.text, fontWeight: '700' }}>₹{totalAmount}</Text>
              </View>
            </View>

            {/* Primary Action Target Submit Control */}
            <Pressable 
              style={({ pressed }) => [
                styles.checkoutBtn, 
                shadows.premium,
                { backgroundColor: colors.primary, borderRadius: roundness.md, opacity: pressed ? 0.9 : 1 }
              ]}
              onPress={() => {
                alert("Order submitted successfully!");
                clearCart();
                navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
              }}
            >
              <Text style={[styles.checkoutBtnText, { color: colors.textOnPrimary, fontFamily: typography.fonts.bold }]}>
                Proceed to Checkout
              </Text>
            </Pressable>
          </View>
        ) : null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flexRow: { flexDirection: 'row', alignItems: 'center' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 100 },
  emptyText: { fontSize: 15, marginTop: 16, textAlign: 'center', width: '80%' },
  cartCard: { flexDirection: 'row', padding: 12, marginBottom: 12, alignItems: 'center' },
  productImage: { width: 68, height: 68, borderRadius: 8 },
  cardInfo: { flex: 1, marginLeft: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemName: { fontSize: 15 },
  itemPrice: { fontSize: 13, marginTop: 2 },
  stepperContainer: { flexDirection: 'row', alignItems: 'center', height: 32, paddingHorizontal: 4 },
  stepBtn: { width: 28, height: 28, justifyContent: 'center', alignItems: 'center' },
  quantityText: { paddingHorizontal: 8, fontSize: 14 },
  couponRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderWidth: 1 },
  couponText: { fontSize: 14 },
  summaryBox: { width: '100%' },
  summaryLine: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  divider: { height: 1, width: '100%', marginVertical: 8 },
  checkoutBtn: { height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 30 },
  checkoutBtnText: { fontSize: 16 }
});