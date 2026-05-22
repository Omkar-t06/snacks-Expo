import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';
import { AuthContext } from '../../context/AuthContext';

// Mocking precise data collections matching Screen 4 of the wireframe mapping
const POPULAR_SEARCH_CHIPS = ['Lays', 'Coca Cola', 'Oreo', 'Doritos', 'Ice Cream', 'Maggie', 'Burger', 'Bingo'];

const RECENT_SEARCHES_MOCK = [
  { id: 'h1', text: 'Lays Classic Salted' },
  { id: 'h2', text: 'Coca Cola 250ml' },
  { id: 'h3', text: 'KitKat Chocolate' }
];

const RECOMMENDED_ITEMS_MOCK = [
  {
    id: 'rec1',
    name: 'Oreo Original',
    price: 40,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=200'
  },
  {
    id: 'rec2',
    name: 'Lays Classic Salted',
    price: 49,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=200'
  }
];

export default function SearchScreen({ navigation }: { navigation: any }) {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(RECENT_SEARCHES_MOCK);
  
  const theme = useTheme();
  const { colors, roundness, typography, spacing, shadows } = theme;
  const { addToCart } = useContext(AuthContext);

  const removeRecentSearchItem = (id: string) => {
    setRecentSearches(prev => prev.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* 1. Header Input Zone (Matches exact alignment layout rules) */}
      <View style={[styles.searchHeader, { backgroundColor: colors.surface, paddingHorizontal: spacing.md }]}>
        <View style={[styles.searchInputWrapper, { backgroundColor: colors.background, borderRadius: roundness.sm }]}>
          <Ionicons name="search" size={20} color={colors.textMuted} style={{ marginRight: spacing.xs }} />
          <TextInput
            placeholder="Search for snacks, drinks..."
            placeholderTextColor={colors.textSecondary}
            value={query}
            onChangeText={setQuery}
            style={[styles.input, { color: colors.text }]}
          />
        </View>
        <Pressable style={[styles.filterBtn, { backgroundColor: colors.background, borderRadius: roundness.sm }]}>
          <Ionicons name="options-outline" size={20} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView 
        contentContainerStyle={{ padding: spacing.md }}
        showsVerticalScrollIndicator={false}
      >
        {/* 2. Popular Searches Section */}
        <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: typography.fonts.bold }]}>
          Popular Searches
        </Text>
        <View style={[styles.chipsRow, { marginTop: spacing.sm }]}>
          {POPULAR_SEARCH_CHIPS.map((chip) => (
            <Pressable 
              key={chip} 
              onPress={() => setQuery(chip)}
              style={({ pressed }) => [
                styles.chip, 
                { 
                  backgroundColor: colors.surface, 
                  borderColor: colors.divider,
                  opacity: pressed ? 0.8 : 1 
                }
              ]}
            >
              {/* Alternating primary color accent rules matching wireframe visuals */}
              <Text style={[
                styles.chipText, 
                { color: ['Lays', 'Oreo', 'Ice Cream', 'Burger'].includes(chip) ? colors.primary : colors.textSecondary }
              ]}>
                {chip}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* 3. Recent Searches List Block */}
        {recentSearches.length > 0 && (
          <View style={{ marginTop: spacing.lg }}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: typography.fonts.bold, marginBottom: spacing.xs }]}>
              Recent Searches
            </Text>
            {recentSearches.map((item) => (
              <View key={item.id} style={[styles.recentSearchRow, { borderBottomColor: colors.divider }]}>
                <View style={styles.flexRow}>
                  <Ionicons name="time-outline" size={18} color={colors.textMuted} style={{ marginRight: spacing.sm }} />
                  <Text style={[styles.recentText, { color: colors.textSecondary }]}>{item.text}</Text>
                </View>
                <Pressable onPress={() => removeRecentSearchItem(item.id)} hitSlop={8}>
                  <Ionicons name="close" size={18} color={colors.textMuted} />
                </Pressable>
              </View>
            ))}
          </View>
        )}

        {/* 4. Recommended For You Vertical List */}
        <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: typography.fonts.bold, marginTop: spacing.xl, marginBottom: spacing.sm }]}>
          Recommended for you
        </Text>

        {RECOMMENDED_ITEMS_MOCK.map((item) => (
          <View 
            key={item.id} 
            style={[styles.recoCard, shadows.subtle, { backgroundColor: colors.surface, borderRadius: roundness.md }]}
          >
            <Image source={{ uri: item.image }} style={styles.recoImage} />
            <View style={styles.recoBody}>
              <View>
                <Text style={[styles.recoName, { color: colors.text, fontFamily: typography.fonts.bold }]}>
                  {item.name}
                </Text>
                <Text style={[styles.recoPrice, { color: colors.textSecondary }]}>
                  ₹{item.price}
                </Text>
              </View>
              <Pressable 
                onPress={() => addToCart(item)} 
                style={({ pressed }) => [
                  styles.addBtn, 
                  { 
                    backgroundColor: colors.primary, 
                    borderRadius: roundness.sm,
                    opacity: pressed ? 0.9 : 1 
                  }
                ]}
              >
                <Text style={[styles.addBtnText, { color: colors.textOnPrimary, fontFamily: typography.fonts.bold }]}>
                  Add
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flexRow: { flexDirection: 'row', alignItems: 'center' },
  searchHeader: { flexDirection: 'row', width: '100%', paddingVertical: 12, gap: 10, alignItems: 'center' },
  searchInputWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, height: 44 },
  input: { flex: 1, fontSize: 14, height: '100%', paddingVertical: 0 },
  filterBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  sectionTitle: { fontSize: 15, letterSpacing: -0.2 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 10, columnGap: 8 },
  chip: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1 },
  chipText: { fontSize: 13, fontWeight: '500' },
  recentSearchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
  recentText: { fontSize: 14 },
  recoCard: { flexDirection: 'row', padding: 12, marginBottom: 12, alignItems: 'center' },
  recoImage: { width: 64, height: 64, borderRadius: 8, resizeMode: 'cover' },
  recoBody: { flex: 1, marginLeft: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  recoName: { fontSize: 15, lineHeight: 18 },
  recoPrice: { fontSize: 13, marginTop: 4 },
  addBtn: { paddingVertical: 6, paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center' },
  addBtnText: { fontSize: 13 }
});