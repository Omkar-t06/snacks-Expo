import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useTheme } from '../../theme';

interface ItemProps {
    id: string;
    title: string;
    description: string;
    tags: string[];
    image: any;
}

const OnboardingCard = ({ item }: { item: ItemProps }) => {
    const { colors, roundness, typography, spacing } = useTheme();

    return (
        <View style={styles.cardInternal}>
            <Text style={[styles.heroTitle, { color: colors.text, fontFamily: typography.fonts.bold }]}>
                {item.title}
            </Text>
            <View style={[styles.imageWrapper, { borderRadius: roundness.md, backgroundColor: colors.background, marginBottom: spacing.md }]}>
                <Image
                    source={item.image}
                    style={styles.heroImage}
                />
            </View>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
                {item.description}
            </Text>
            <View style={styles.badgeRow}>
                {item.tags.map((tag: string) => (
                    <View key={tag} style={[styles.badge, { backgroundColor: colors.primaryLight }]}>
                        <Text style={[styles.badgeText, { color: colors.primaryDark }]}>{tag}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default OnboardingCard;

const styles = StyleSheet.create({
    cardInternal: {
        flex: 1,
    },
    heroTitle: {
        fontSize: 24,
        lineHeight: 30,
        marginBottom: 16,
        paddingRight: 20,
    },
    imageWrapper: {
        width: '100%',
        height: 170,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroImage: {
        width: '92%',
        height: '92%',
        resizeMode: 'cover',
    },
    description: {
        fontSize: 14,
        lineHeight: 22,
        paddingRight: 20,
    },
    badgeRow: {
        flexDirection: 'row',
        marginTop: 14,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        marginRight: 8,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
    }
});