import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../../theme';
import Oreo from '../../components/onBoarding/Oreo';
import OnboardingCard from '../../components/onBoarding/OnboardingCard';
import Chips from '../../components/onBoarding/Chip';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_INTERNAL_WIDTH = SCREEN_WIDTH - 40;

export default function OnboardingScreen() {
    const theme = useTheme();
    const { colors, roundness, shadows, typography, spacing, palette } = theme;

    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

    const startAutoScroll = () => {
        stopAutoScroll();

        intervalRef.current = setInterval(() => {
            const nextIndex =
                currentIndex === onboardingData.length - 1
                    ? 0
                    : currentIndex + 1;

            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });

            setCurrentIndex(nextIndex);
        }, 3000);
    };

    const stopAutoScroll = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    useEffect(() => {
        startAutoScroll();

        return () => stopAutoScroll();
    }, [currentIndex]);

    const handleGetStarted = () => {
        stopAutoScroll();
    };

    const handleSignIn = () => {
        stopAutoScroll();
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
                    bounces={false}
                    onTouchStart={stopAutoScroll}
                    onTouchEnd={startAutoScroll}
                    getItemLayout={(_, index) => ({
                        length: CARD_INTERNAL_WIDTH,
                        offset: CARD_INTERNAL_WIDTH * index,
                        index,
                    })}
                    onMomentumScrollEnd={(event) => {
                        const index = Math.round(
                            event.nativeEvent.contentOffset.x /
                            CARD_INTERNAL_WIDTH
                        );

                        setCurrentIndex(index);
                    }}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                width: CARD_INTERNAL_WIDTH,
                                paddingRight: 20,
                            }}
                        >
                            <OnboardingCard item={item} />
                        </View>
                    )}
                />
            </View>
            <View style={styles.footerZone}>
                <TouchableOpacity
                    activeOpacity={0.85}
                    style={[
                        styles.getStartedButton,
                        shadows.premium,
                        { backgroundColor: palette.neutral[900], borderRadius: roundness.lg }
                    ]}
                    onPress={handleGetStarted}
                >
                    <Text style={[styles.getStartedText, { color: colors.textOnPrimary, fontFamily: typography.fonts.bold }]}>
                        Join SnackExpo
                    </Text>
                </TouchableOpacity>

                {/* Securely Structured Horizontal Link Line Component row */}
                <View style={styles.signInWrapper}>
                    <Text style={[styles.memberLabel, { color: colors.textSecondary }]}>
                        Already a member?{' '}
                    </Text>
                    <TouchableOpacity onPress={handleSignIn} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Text style={[styles.signInActionText, { color: colors.primary, fontFamily: typography.fonts.bold }]}>
                            Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Chips />
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
        marginBottom: 12,
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
    },
    footerZone: {
        marginVertical: 20,
        width: '100%',
    },
    getStartedButton: {
        height: 54,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    getStartedText: {
        fontSize: 16,
        letterSpacing: 0.5,
    },
    signInWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    memberLabel: {
        fontSize: 14,
    },
    signInActionText: {
        fontSize: 14,
        textDecorationLine: 'underline',
    }
});