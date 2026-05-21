import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../../theme';
import Oreo from '../../components/onBoarding/Oreo';
import OnboardingCard from '../../components/onBoarding/OnboardingCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_INTERNAL_WIDTH = SCREEN_WIDTH - 40;

export default function OnboardingScreen() {
    const theme = useTheme();
    const { colors, roundness, shadows, typography, spacing } = theme;

    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const onboardingData = [
        {
            id: '1',
            title: 'Snacks delivered instantly',
            description: 'Order your favorite snacks, drinks and desserts anytime.',
            tags: ['Fast Delivery', 'Fresh Picks'],
            image: require('./../../../assets/snack1.png'),
        },
        {
            id: '2',
            title: 'Late night cravings solved',
            description: 'Midnight chips, coffees and treats delivered right to you.',
            tags: ['24/7', 'No Minimum'],
            image: require('./../../../assets/snack2.png'),
        },
        {
            id: '3',
            title: 'Office bites made easy',
            description: 'Fuel your productivity with premium coffees and quick snacks.',
            tags: ['Office Delivery', 'Quick Reorders'],
            image: require('./../../../assets/snack3.png'),
        },
    ];

    // Track finger sliding movements to update the static indicator row smoothly
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(contentOffsetX / CARD_INTERNAL_WIDTH);

        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < onboardingData.length) {
            setCurrentIndex(newIndex);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style={theme.dark ? 'light' : 'dark'} />
            <Oreo />
            <View style={[
                styles.masterCard,
                { backgroundColor: colors.surfaceElevated, borderRadius: roundness.xl, ...shadows.card }
            ]}>

                <View style={styles.headerRow}>
                    <Image
                        source={require('../../../assets/logo.png')}
                        style={[styles.logoImage, { borderRadius: roundness.sm }]}
                    />
                    <View style={styles.titleWrap}>
                        <Text style={[styles.title, { color: colors.text, fontFamily: typography.fonts.bold }]}>
                            SnackExpo
                        </Text>
                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Bite-Sized Delivery</Text>
                    </View>
                </View>
                {/* Indicators */}
                <View style={[styles.indicatorContainer, { gap: spacing.xs }]}>
                    {onboardingData.map((item, index) => {
                        const isActive = index === currentIndex;
                        return (
                            <View
                                key={item.id}
                                style={[
                                    styles.indicatorTrack,
                                    {
                                        backgroundColor: isActive ? colors.primary : colors.divider,
                                        flex: 1
                                    }
                                ]}
                            />
                        );
                    })}
                </View>

                <FlatList
                    ref={flatListRef}
                    data={onboardingData}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    snapToInterval={CARD_INTERNAL_WIDTH}
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    bounces={false}
                    renderItem={({ item }) => (
                        <View style={{ width: CARD_INTERNAL_WIDTH, paddingRight: 20 }}>
                            <OnboardingCard item={item} />
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    masterCard: {
        marginHorizontal: 20,
        marginTop: 24,
        paddingVertical: 20,
        paddingLeft: 20,
        overflow: 'hidden',
        minHeight: 460,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 20,
        marginBottom: 16,
    },
    logoImage: {
        width: 52,
        height: 52,
        marginRight: 12,
    },
    titleWrap: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        lineHeight: 22,
    },
    subtitle: {
        fontSize: 13,
        marginTop: 2,
    },
    indicatorContainer: {
        flexDirection: 'row',
        height: 4,
        paddingRight: 20,
        marginBottom: 20,
    },
    indicatorTrack: {
        height: '100%',
        borderRadius: 2,
    }
});