import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Oreo = () => {
  return (
    <View style={styles.oreoWrapper}>
        {/* Bottom Biscuit */}
        <View style={[styles.cookieLayer, styles.bottomCookie]}>
            <View style={styles.patternCircle} />
            <View style={styles.patternSmallTop} />
            <View style={styles.patternSmallBottom} />
            <View style={styles.patternSmallLeft} />
            <View style={styles.patternSmallRight} />
        </View>

        {/* Cream Layer */}
        <View style={styles.creamLayer} />

        {/* Top Biscuit */}
        <View style={[styles.cookieLayer, styles.topCookie]}>
            <Text style={styles.oreoText}>OREO</Text>

            <View style={styles.patternCircle} />
            <View style={styles.patternSmallTop} />
            <View style={styles.patternSmallBottom} />
            <View style={styles.patternSmallLeft} />
            <View style={styles.patternSmallRight} />
        </View>
    </View>
  );
}

export default Oreo;

const COOKIE_COLOR = '#1F1B1C';
const COOKIE_SHADOW = '#120F10';
const CREAM_COLOR = '#FFF4D8';

const styles = StyleSheet.create({
    oreoWrapper: {
        position: 'absolute',
        top: -5,
        right: -20,
        width: 240,
        height: 240,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '-18deg' }],
    },
    cookieLayer: {
        position: 'absolute',
        width: 210,
        height: 210,
        borderRadius: 105,
        backgroundColor: COOKIE_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 6,
        borderColor: COOKIE_SHADOW,
    },
    topCookie: {
        top: 0,
        left: 0,
        zIndex: 3,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 15,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        elevation: 10,
    },
    bottomCookie: {
        top: 16,
        left: 12,
        opacity: 0.95,
    },
    creamLayer: {
        position: 'absolute',
        width: 190,
        height: 190,
        borderRadius: 95,
        backgroundColor: CREAM_COLOR,
        top: 10,
        left: 8,
        zIndex: 2,
    },
    oreoText: {
        color: '#EDEDED',
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: 4,
        zIndex: 5,
    },
    patternCircle: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#3A3435',
    },
    patternSmallTop: {
        position: 'absolute',
        top: 28,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#3A3435',
    },
    patternSmallBottom: {
        position: 'absolute',
        bottom: 28,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#3A3435',
    },
    patternSmallLeft: {
        position: 'absolute',
        left: 28,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#3A3435',
    },
    patternSmallRight: {
        position: 'absolute',
        right: 28,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#3A3435',
    },
})