import React, { useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../theme';

export default function OrderDetailScreen({ route, navigation }: { route: any; navigation: any }) {
  const { order } = route.params || {};
  const { addToCart, updateOrderStatus } = useContext(AuthContext) as any;
  const theme = useTheme();
  const { colors, roundness, typography, spacing, shadows } = theme;

  if (!order) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
        <View style={{ padding: spacing.md }}>
          <Text style={{ color: colors.text }}>Order not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

//   const handleReorder = () => {
//     // Create a placeholder cart item summarizing the order
//     const cartItem = {
//       id: `${order.id}-reorder`,
//       name: `Reorder: ${order.itemsSummary.split(',')[0] || 'Items'}`,
//       price: order.price,
//       quantity: 1,
//     };

//     try {
//       addToCart(cartItem);
//       navigation.navigate('Cart');
//     } catch (e) {
//       console.error('Reorder failed', e);
//       Alert.alert('Reorder failed');
//     }
//   };

  const handleCancel = () => {
    if (order.status === 'Cancelled' || order.status === 'Delivered') {
      Alert.alert('Cannot cancel', `Order is already ${order.status}`);
      return;
    }

    updateOrderStatus(order.id, 'Cancelled', '#DC3545');
    Alert.alert('Order cancelled');
    navigation.goBack();
  };

  const handleTrack = () => {
    Alert.alert('Tracking', 'Real-time tracking prototype...');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={[styles.header, { padding: spacing.md }]}> 
        <Text style={[styles.title, { color: colors.text, fontFamily: typography.fonts.bold }]}>Order #{order.id}</Text>
        <Text style={{ color: colors.textSecondary, marginTop: 4 }}>{order.date}</Text>
      </View>

      <View style={[styles.body, { padding: spacing.md }]}> 
        <View style={[styles.statusRow, { marginBottom: spacing.md }]}> 
          <Ionicons name="receipt-outline" size={18} color={order.statusColor} style={{ marginRight: 8 }} />
          <Text style={[styles.statusText, { color: order.statusColor, fontFamily: typography.fonts.bold }]}>{order.status}</Text>
        </View>

        <View style={{ marginBottom: spacing.md }}>
          <Text style={{ color: colors.textSecondary }}>Items</Text>
          <Text style={{ color: colors.text, marginTop: 6 }}>{order.itemsSummary}</Text>
        </View>

        <View style={{ marginBottom: spacing.md }}>
          <Text style={{ color: colors.textSecondary }}>Items count</Text>
          <Text style={{ color: colors.text, marginTop: 6 }}>{order.itemCount}</Text>
        </View>

        <View style={{ marginBottom: spacing.md }}>
          <Text style={{ color: colors.textSecondary }}>Total</Text>
          <Text style={{ color: colors.text, marginTop: 6, fontFamily: typography.fonts.bold }}>₹{order.price}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md }}>
          <Pressable style={[styles.actionBtn, { backgroundColor: colors.surface, borderRadius: roundness.sm }]} onPress={handleTrack}>
            <Text style={{ color: colors.primary }}>Track</Text>
          </Pressable>
          {/* <Pressable style={[styles.actionBtn, { backgroundColor: colors.primary, borderRadius: roundness.sm }]} onPress={handleReorder}>
            <Text style={{ color: colors.textOnPrimary }}>Reorder</Text>
          </Pressable> */}
          <Pressable style={[styles.actionBtn, { backgroundColor: '#DC3545', borderRadius: roundness.sm }]} onPress={handleCancel}>
            <Text style={{ color: colors.textOnPrimary }}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {},
  title: { fontSize: 18 },
  body: {},
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  statusText: { fontSize: 14 },
  actionBtn: { paddingVertical: 10, paddingHorizontal: 14, minWidth: 80, alignItems: 'center' },
});
