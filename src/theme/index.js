/**
 * Snack Expo Premium Design System & Theme Configuration
 * Exposes a beautiful, harmonious, and highly flexible design token system
 * supporting both Light and Dark modes.
 */

import { useColorScheme } from 'react-native';

// Core brand color palettes
export const PALETTE = {
  orange: {
    50: '#FFF5F1',
    100: '#FFEBE3',
    200: '#FFD3C4',
    300: '#FFAF99',
    400: '#FF8666',
    500: '#FF5A1F', // Core Primary
    600: '#E6460F',
    700: '#B33206',
    800: '#802100',
    900: '#4D1200',
  },
  teal: {
    50: '#F0FBFB',
    100: '#E0F7F6',
    200: '#B2ECE9',
    300: '#80DDD9',
    400: '#4DCEC8',
    500: '#00B2A9', // Core Secondary
    600: '#00968F',
    700: '#007A74',
    800: '#005E59',
    900: '#003B38',
  },
  blue: {
    50: '#F0F9FE',
    100: '#E1F3FD',
    200: '#BDE4FB',
    300: '#94D2F9',
    400: '#64BDF7',
    500: '#009AE1', // Core Tertiary
    600: '#0083C0',
    700: '#006C9E',
    800: '#00557B',
    900: '#003750',
  },
  neutral: {
    50: '#F8F9FA',  // Soft background light
    100: '#F1F3F5',
    200: '#E9ECEF', // Subtle light border
    300: '#DEE2E6',
    400: '#CED4DA',
    500: '#ADB5BD', // Placeholders
    600: '#6C757D', // Muted text light
    700: '#495057',
    800: '#2D2D2D', // Core Neutral / Dark text
    900: '#1A1A1A', // Deep dark text
    950: '#121212', // Background dark
  },
  system: {
    success: '#28A745',
    successLight: '#EBFBEE',
    warning: '#FFC107',
    warningLight: '#FFFBE6',
    error: '#DC3545',
    errorLight: '#FCE8E6',
  }
};

// Light theme tokens
export const LIGHT_THEME = {
  dark: false,
  colors: {
    // Brand Colors
    primary: PALETTE.orange[500],
    primaryLight: PALETTE.orange[100],
    primaryDark: PALETTE.orange[700],

    secondary: PALETTE.teal[500],
    secondaryLight: PALETTE.teal[100],
    secondaryDark: PALETTE.teal[700],

    tertiary: PALETTE.blue[500],
    tertiaryLight: PALETTE.blue[100],
    tertiaryDark: PALETTE.blue[700],

    // UI Surface Colors
    background: PALETTE.neutral[50],
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',

    // Borders & Dividers
    border: PALETTE.neutral[200],
    borderFocused: PALETTE.orange[300],
    divider: PALETTE.neutral[100],

    // Text hierarchy
    text: PALETTE.neutral[800],
    textSecondary: PALETTE.neutral[600],
    textMuted: PALETTE.neutral[500],
    textOnPrimary: '#FFFFFF',
    textOnSecondary: '#FFFFFF',

    // System States
    success: PALETTE.system.success,
    successBackground: PALETTE.system.successLight,
    warning: PALETTE.system.warning,
    warningBackground: PALETTE.system.warningLight,
    error: PALETTE.system.error,
    errorBackground: PALETTE.system.errorLight,

    // Overlays
    overlay: 'rgba(0, 0, 0, 0.4)',
    glassmorphism: 'rgba(255, 255, 255, 0.75)',
  }
};

// Dark theme tokens
export const DARK_THEME = {
  dark: true,
  colors: {
    // Brand Colors
    primary: PALETTE.orange[400], // Brighter variant for premium contrast on dark surfaces
    primaryLight: '#3D1F13',
    primaryDark: PALETTE.orange[600],

    secondary: PALETTE.teal[400],
    secondaryLight: '#003B38',
    secondaryDark: PALETTE.teal[600],

    tertiary: PALETTE.blue[400],
    tertiaryLight: '#003750',
    tertiaryDark: PALETTE.blue[600],

    // UI Surface Colors
    background: PALETTE.neutral[950],
    surface: PALETTE.neutral[900],
    surfaceElevated: '#252525',

    // Borders & Dividers
    border: '#2A2A2A',
    borderFocused: PALETTE.orange[400],
    divider: '#202020',

    // Text hierarchy
    text: PALETTE.neutral[50],
    textSecondary: PALETTE.neutral[400],
    textMuted: PALETTE.neutral[500],
    textOnPrimary: '#FFFFFF',
    textOnSecondary: '#FFFFFF',

    // System States
    success: '#34D058',
    successBackground: '#132C17',
    warning: '#FFD33D',
    warningBackground: '#2E270A',
    error: '#EA4A5A',
    errorBackground: '#301316',

    // Overlays
    overlay: 'rgba(0, 0, 0, 0.65)',
    glassmorphism: 'rgba(26, 26, 26, 0.75)',
  }
};

// Typography tokens
export const TYPOGRAPHY = {
  fonts: {
    // Standard system fonts & Plus Jakarta Sans definitions for seamless fallback
    regular: 'PlusJakartaSans-Regular',
    medium: 'PlusJakartaSans-Medium',
    semiBold: 'PlusJakartaSans-SemiBold',
    bold: 'PlusJakartaSans-Bold',

    // React Native fallback definitions
    system: {
      regular: 'System',
      medium: 'System',
      semiBold: 'System',
      bold: 'System',
    }
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
  },
  lineHeights: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 38,
    xxxl: 48,
    display: 56,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  }
};

// Layout & Spacing tokens (4pt / 8pt grid)
export const SPACING = {
  none: 0,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 64,
};

// Border Radius tokens for "friendly food-app vibe" (DESIGN.md)
export const ROUNDNESS = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
};

// Premium drop-shadow definitions for a highly polished, interactive feel (Glassmorphism & elevation)
export const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  subtle: {
    shadowColor: '#2D2D2D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    shadowColor: '#2D2D2D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  premium: {
    shadowColor: PALETTE.orange[500],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  overlay: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 16,
  }
};

/**
 * Custom hook to easily consume the active theme context in functional components
 * Dynamically switches theme styles based on system settings, while defaulting to Light.
 */
export const useTheme = () => {
  const systemScheme = useColorScheme();
  const theme = systemScheme === 'dark' ? DARK_THEME : LIGHT_THEME;

  return {
    ...theme,
    spacing: SPACING,
    roundness: ROUNDNESS,
    shadows: {
      ...SHADOWS,
      // Adjust shadows slightly in dark mode for realistic depth
      card: theme.dark
        ? { ...SHADOWS.card, shadowColor: '#000000', shadowOpacity: 0.25 }
        : SHADOWS.card,
      premium: theme.dark
        ? { ...SHADOWS.premium, shadowColor: '#000000', shadowOpacity: 0.2 }
        : SHADOWS.premium,
    },
    typography: TYPOGRAPHY,
    palette: PALETTE,
  };
};
