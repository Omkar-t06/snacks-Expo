import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme';

const Chips = () => {
    const { colors, shadows } = useTheme();

    return (
        <View style={styles.wrapper}>
            {/* Packet */}
            <View
                style={[
                    styles.packet,
                    {
                        backgroundColor: colors.primary,
                        ...shadows.card,
                    },
                ]}
            />
            {/* Chips */}
            <View
                style={[
                    styles.chipLarge,
                    {
                        backgroundColor: '#FFD166',
                    },
                ]}
            />
            <View
                style={[
                    styles.chipMedium,
                    {
                        backgroundColor: '#FFE29A',
                    },
                ]}
            />
            <View
                style={[
                    styles.chipSmall,
                    {
                        backgroundColor: '#FFC857',
                    },
                ]}
            />
        </View>
    );
};

export default Chips;

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: -30,
        left: -20,
        width: 180,
        height: 180,
    },
    packet: {
        position: 'absolute',
        width: 110,
        height: 140,
        borderRadius: 28,
        transform: [{ rotate: '-18deg' }],
        bottom: 0,
        left: 0,
    },
    chipLarge: {
        position: 'absolute',
        width: 72,
        height: 72,
        borderRadius: 999,
        top: 10,
        right: 10,
        transform: [{ rotate: '18deg' }],
    },
    chipMedium: {
        position: 'absolute',
        width: 54,
        height: 54,
        borderRadius: 999,
        top: 55,
        right: 55,
        transform: [{ rotate: '-12deg' }],
    },
    chipSmall: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 999,
        top: 85,
        right: 5,
        transform: [{ rotate: '25deg' }],
    },
});