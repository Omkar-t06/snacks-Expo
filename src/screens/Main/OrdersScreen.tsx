import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { AuthContext } from '../../context/AuthContext';

const FILTER_TABS = ['All', 'Ongoing', 'Delivered', 'Cancelled'];


export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState('All');
  const theme = useTheme();
  const { colors, roundness, typography, spacing, shadows } = theme;

  const { orders } = useContext(AuthContext);

  // Filter logic based on active top-bar filter selection
  const filteredOrders = (orders || []).filter((order) => {
    if (activeTab === 'All') return true;
    return order.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 

      {/* 1. Horizontal Category Filter Chips Matrix Row */}
      <View style={styles.filterScrollWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.filterContentContainer, { paddingHorizontal: spacing.md }]}
        >
          {FILTER_TABS.map((tab, idx) => {
            const isSelected = tab === activeTab;
            return (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.filterTab,
                  {
                    backgroundColor: isSelected ? colors.primaryLight : colors.surface,
                    borderColor: isSelected ? colors.primary : colors.divider,
                    borderRadius: roundness.full,
                    marginRight: idx === FILTER_TABS.length - 1 ? 0 : spacing.xs
                  }
                ]}
              >
                <Text style={[
                  styles.filterTabText,
                  {
                    color: isSelected ? colors.primary : colors.textSecondary,
                    fontFamily: isSelected ? typography.fonts.bold : typography.fonts.regular
                  }
                ]}>
                  {tab}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* 2. Historical Orders Dynamic Feed */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: spacing.md, paddingBottom: spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <View
              key={order.id}
              style={[
                styles.orderCard,
                shadows.subtle,
                { backgroundColor: colors.surface, borderRadius: roundness.md, padding: spacing.md }
              ]}
            >
              {/* Card Top Row Header Information */}
              <View style={styles.orderHeaderRow}>
                <View style={styles.headerInfoGroup}>
                  <Text style={[styles.orderIdText, { color: colors.text, fontFamily: typography.fonts.bold }]}>
                    Order #{order.id}
                  </Text>
                  <Text style={[styles.orderDateText, { color: colors.textMuted }]}>
                    {order.date}
                  </Text>
                </View>
                <Text style={[styles.statusBadgeText, { color: order.statusColor, fontFamily: typography.fonts.bold }]}>
                  {order.status}
                </Text>
              </View>

              {/* Items Summary Sub-Surface Block Layer */}
              <View style={[styles.itemsPreviewRow, { backgroundColor: colors.background, borderRadius: roundness.sm, padding: spacing.sm }]}>
                <Ionicons name="fast-food-outline" size={16} color={colors.textSecondary} style={{ marginRight: 8 }} />
                <Text numberOfLines={1} style={[styles.summaryText, { color: colors.textSecondary, fontFamily: typography.fonts.medium }]}>
                  {order.itemsSummary}
                </Text>
              </View>

              {/* Card Footer Financial Summary Area */}
              <View style={styles.orderFooterRow}>
                <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>
                  Total: <Text style={{ color: colors.text, fontWeight: '700' }}>₹{order.price}</Text>
                </Text>
                <Pressable style={styles.detailsBtn} hitSlop={8}>
                  <Text style={{ color: colors.primary, fontWeight: '600', fontSize: 13, marginRight: 6 }}>View Details</Text>
                  <Ionicons name="chevron-forward" size={14} color={colors.primary} />
                </Pressable>
              </View>
            </View>
          ))
        ) : (
          /* Empty Filter Fallback Interface State */
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={48} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textSecondary, marginTop: spacing.sm }]}>
              No {activeTab.toLowerCase()} orders found.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  filterScrollWrapper: { width: '100%' },
  filterContentContainer: { paddingVertical: 12 },
  filterTab: { paddingVertical: 6, paddingHorizontal: 16, borderWidth: 1 },
  filterTabText: { fontSize: 13 },
  orderCard: { marginBottom: 14 },
  orderHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  headerInfoGroup: { flex: 1, paddingRight: 12 },
  orderIdText: { fontSize: 15 },
  orderDateText: { fontSize: 11, marginTop: 2 },
  statusBadgeText: { fontSize: 13 },
  itemsPreviewRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  summaryText: { fontSize: 13, flex: 1 },
  orderFooterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 },
  totalLabel: { fontSize: 13 },
  detailsBtn: { flexDirection: 'row', alignItems: 'center' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 80 },
  emptyText: { fontSize: 14 },
});