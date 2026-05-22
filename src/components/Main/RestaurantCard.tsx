import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useTheme } from '../../theme';

type Props = {
  item: any;
  onAdd?: (item: any) => void;
};

export default function RestaurantCard({ item, onAdd }: Props) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.body}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{item.name}</Text>
        <Text style={[styles.meta, { color: theme.colors.textSecondary }]}>{item.rating} • {item.deliveryTime}</Text>
        <Pressable onPress={() => onAdd && onAdd(item)} style={[styles.addBtn, { backgroundColor: theme.colors.primary }]}> 
          <Text style={{ color: theme.colors.textOnPrimary }}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', borderRadius: 12, overflow: 'hidden', marginBottom: 12 },
  image: { width: 110, height: 110 },
  body: { flex: 1, padding: 12, justifyContent: 'space-between' },
  title: { fontSize: 16, fontWeight: '700' },
  meta: { fontSize: 13, marginTop: 6 },
  addBtn: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8, alignSelf: 'flex-start' },
});
