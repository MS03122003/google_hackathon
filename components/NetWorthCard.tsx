import React from 'react';
import { View, Text, StyleSheet, Dimensions, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { ColorValue } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface Theme {
  colors: {
    gradients: {
      primary: string[];
      luxury: string[];
      emerald: string[];
      sunset: string[];
      ocean: string[];
      purple: string[];
      dark: string[];
    };
    white: string;
    whiteTransparent: string;
    whiteLight: string;
    whiteSubtle: string;
  };
  typography: {
    sizes: {
      xs: number;
      sm: number;
      base: number;
      lg: number;
      xl: number;
      '2xl': number;
      '3xl': number;
      '4xl': number;
      '5xl': number;
      '6xl': number;
    };
    weights: {
      normal: '400';
      medium: '500';
      semibold: '600';
      bold: '700';
      extrabold: '800';
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
  };
}



const theme: Theme = {
  colors: {
    gradients: {
      primary: ['#667eea', '#764ba2'],
      luxury: ['#1a1a2e', '#16213e', '#0f3460'],
      emerald: ['#134e5e', '#71b280'],
      sunset: ['#ff7e5f', '#feb47b'],
      ocean: ['#2193b0', '#6dd5ed'],
      purple: ['#667eea', '#764ba2'],
      dark: ['#232526', '#414345'],
    },
    white: '#ffffff',
    whiteTransparent: 'rgba(255, 255, 255, 0.9)',
    whiteLight: 'rgba(255, 255, 255, 0.7)',
    whiteSubtle: 'rgba(255, 255, 255, 0.5)',
  },
  typography: {
    sizes: {
      xs: 10,
      sm: 12,
      base: 14,
      lg: 16,
      xl: 18,
      '2xl': 20,
      '3xl': 24,
      '4xl': 28,
      '5xl': 32,
      '6xl': 36,
    },
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
  },
};

type CardType = 'primary' | 'luxury' | 'emerald' | 'sunset' | 'ocean' | 'purple' | 'dark';

interface NetWorthCardProps {
  name: string;
  netWorth: string;
  accountNumber?: string;
  cardType?: CardType;
  showChip?: boolean;
  bankName?: string;
  style?: ViewStyle;
}

const NetWorthCard: React.FC<NetWorthCardProps> = ({
  name,
  netWorth,
  accountNumber = 'XXXX XXXX XXXX 1234',
  cardType = 'luxury',
  showChip = true,
  bankName = 'WEALTH BANK',
  style,
}) => {
  const gradientColors = theme.colors.gradients[cardType];

  const formatAccountNumber = (number: string): string => {
    return number.replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={gradientColors as [ColorValue, ColorValue, ...ColorValue[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.patternOverlay}>
          <View style={[styles.circle, styles.circle1]} />
          <View style={[styles.circle, styles.circle2]} />
          <View style={[styles.circle, styles.circle3]} />
        </View>

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.cardType}>NET WORTH</Text>
            <Text style={styles.cardSubtype}>Premium Account</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.bankName}>{bankName}</Text>
          </View>
        </View>

        {showChip && (
          <View style={styles.chipSection}>
            <View style={styles.chip}>
              <View style={styles.chipInner} />
            </View>
            <View style={styles.contactlessIcon}>
              <View style={styles.waveIcon}>
                <View style={[styles.wave, styles.wave1]} />
                <View style={[styles.wave, styles.wave2]} />
                <View style={[styles.wave, styles.wave3]} />
              </View>
            </View>
          </View>
        )}

        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Total Net Worth</Text>
          <Text
            style={styles.amount}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {netWorth}
          </Text>
        </View>

        <View style={styles.accountSection}>
          <View style={styles.accountNumber}>
            <Text style={styles.accountLabel}>Account Number</Text>
            <Text style={styles.accountText}>
              {formatAccountNumber(accountNumber)}
            </Text>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.holderInfo}>
            <Text style={styles.holderLabel}>Account Holder</Text>
            <Text style={styles.holderName}>{name.toUpperCase()}</Text>
          </View>
          <View style={styles.validityInfo}>
            <Text style={styles.validityLabel}>Valid Thru</Text>
            <Text style={styles.validityDate}>12/28</Text>
          </View>
        </View>

        <View style={styles.brandSection}>
          <View style={styles.brandLogo}>
            <Text style={styles.brandText}>WEALTH</Text>
          </View>
        </View>

        <View style={styles.holographicOverlay} />
      </LinearGradient>
    </View>
  );
};

interface Styles {
  container: ViewStyle;
  card: ViewStyle;
  patternOverlay: ViewStyle;
  circle: ViewStyle;
  circle1: ViewStyle;
  circle2: ViewStyle;
  circle3: ViewStyle;
  header: ViewStyle;
  headerLeft: ViewStyle;
  headerRight: ViewStyle;
  cardType: TextStyle;
  cardSubtype: TextStyle;
  bankName: TextStyle;
  chipSection: ViewStyle;
  chip: ViewStyle;
  chipInner: ViewStyle;
  contactlessIcon: ViewStyle;
  waveIcon: ViewStyle;
  wave: ViewStyle;
  wave1: ViewStyle;
  wave2: ViewStyle;
  wave3: ViewStyle;
  amountSection: ViewStyle;
  amountLabel: TextStyle;
  amount: TextStyle;
  accountSection: ViewStyle;
  accountNumber: ViewStyle;
  accountLabel: TextStyle;
  accountText: TextStyle;
  bottomSection: ViewStyle;
  holderInfo: ViewStyle;
  holderLabel: TextStyle;
  holderName: TextStyle;
  validityInfo: ViewStyle;
  validityLabel: TextStyle;
  validityDate: TextStyle;
  brandSection: ViewStyle;
  brandLogo: ViewStyle;
  brandText: TextStyle;
  holographicOverlay: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    width: '100%',
  },
  card: {
    width: '100%',
    height: 200,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
  },
  patternOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    zIndex: 0,
  },
  circle: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: theme.colors.whiteSubtle,
  },
  circle1: { 
    width: 120, 
    height: 120, 
    top: -40, 
    right: -40 
  },
  circle2: { 
    width: 80, 
    height: 80, 
    top: 60, 
    right: 20 
  },
  circle3: { 
    width: 60, 
    height: 60, 
    bottom: -20, 
    left: -20 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  headerLeft: { 
    flex: 1 
  },
  headerRight: { 
    alignItems: 'flex-end' 
  },
  cardType: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
    letterSpacing: 1.5,
    opacity: 0.9,
  },
  cardSubtype: {
    color: theme.colors.whiteLight,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.normal,
    marginTop: 2,
  },
  bankName: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: 2,
  },
  chipSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  chip: {
    width: 45,
    height: 35,
    backgroundColor: 'rgba(255, 215, 0, 0.9)',
    borderRadius: 6,
    padding: 4,
    marginRight: theme.spacing.md,
  },
  chipInner: {
    flex: 1,
    backgroundColor: 'rgba(255, 215, 0, 0.6)',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(184, 134, 11, 0.3)',
  },
  contactlessIcon: { 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  waveIcon: { 
    position: 'relative' 
  },
  wave: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: theme.colors.whiteLight,
    borderRadius: 10,
  },
  wave1: { 
    width: 12, 
    height: 8, 
    left: -6, 
    top: -4 
  },
  wave2: { 
    width: 16, 
    height: 12, 
    left: -8, 
    top: -6 
  },
  wave3: { 
    width: 20, 
    height: 16, 
    left: -10, 
    top: -8 
  },
  amountSection: {
    marginBottom: theme.spacing.lg,
    zIndex: 10,
  },
  amountLabel: {
    color: theme.colors.whiteLight,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    marginBottom: theme.spacing.xs,
  },
  amount: {
    color: theme.colors.white,
    fontSize: screenWidth < 350 ? theme.typography.sizes['4xl'] : theme.typography.sizes['5xl'],
    fontWeight: theme.typography.weights.extrabold,
    letterSpacing: 1,
    zIndex: 10,
  },
  accountSection: { 
    marginBottom: theme.spacing.md 
  },
  accountNumber: { 
    marginBottom: theme.spacing.sm 
  },
  accountLabel: {
    color: theme.colors.whiteLight,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
    marginBottom: 2,
  },
  accountText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    letterSpacing: 3,
    fontFamily: 'monospace',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 'auto',
  },
  holderInfo: { 
    flex: 1 
  },
  holderLabel: {
    color: theme.colors.whiteLight,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
    marginBottom: 2,
  },
  holderName: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.semibold,
    letterSpacing: 1,
  },
  validityInfo: { 
    alignItems: 'flex-end' 
  },
  validityLabel: {
    color: theme.colors.whiteLight,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
    marginBottom: 2,
  },
  validityDate: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.semibold,
    fontFamily: 'monospace',
  },
  brandSection: {
    position: 'absolute',
    bottom: theme.spacing.lg,
    right: theme.spacing.xl,
    zIndex: 2,
  },
  brandLogo: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  brandText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.bold,
    letterSpacing: 1,
  },
  holographicOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: theme.borderRadius.xl,
    zIndex: 2,
  },
});

export default NetWorthCard;