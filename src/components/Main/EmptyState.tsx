import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme';

type Props = { title?: string; subtitle?: string; icon?: string };

export default function EmptyState({ title, subtitle, icon = 'basket-outline' }: Props) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color={theme.colors.textMuted} />
      {title ? <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text> : null}
      {subtitle ? <Text style={[styles.sub, { color: theme.colors.textSecondary }]}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', marginTop: 80 },
  title: { fontSize: 15, marginTop: 12, textAlign: 'center' },
  sub: { fontSize: 13, marginTop: 6, textAlign: 'center', width: '80%' },
});
