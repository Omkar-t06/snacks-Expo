import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useTheme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  item: any;
  onAdd?: (item: any) => void;
  onRemove?: (id?: string) => void;
};

export default function CartItem({ item, onAdd, onRemove }: Props) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Image source={{ uri: item.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=150' }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.colors.text }]}>{item.name}</Text>
        <Text style={[styles.price, { color: theme.colors.textSecondary }]}>₹{item.price}</Text>
      </View>
      <View style={styles.controls}>
        <Pressable onPress={() => onRemove && onRemove(item.id)} style={styles.iconBtn}>
          <Ionicons name="remove" size={18} color={theme.colors.text} />
        </Pressable>
        <Text style={{ marginHorizontal: 8, color: theme.colors.text }}>{item.quantity ?? 1}</Text>
        <Pressable onPress={() => onAdd && onAdd(item)} style={styles.iconBtn}>
          <Ionicons name="add" size={18} color={theme.colors.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 12, marginBottom: 12, alignItems: 'center', borderRadius: 12 },
  image: { width: 68, height: 68, borderRadius: 8 },
  info: { flex: 1, marginLeft: 14 },
  name: { fontSize: 15 },
  price: { fontSize: 13, marginTop: 4 },
  controls: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },
});
