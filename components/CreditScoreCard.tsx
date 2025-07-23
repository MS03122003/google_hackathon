import React from 'react';
import { View, Text, StyleSheet, Dimensions, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Install: expo install expo-linear-gradient
const { width } = Dimensions.get('window');

// Theme configuration
const theme = {
  colors: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    background: '#ffffff',
    surface: '#f8fafc',
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
      tertiary: '#94a3b8',
    },
    border: '#e2e8f0',
    shadow: '#000000',
  },
  typography: {
    fontFamily: 'System', // Use your custom font family here
    sizes: {
      xs: 10,
      sm: 12,
      base: 14,
      lg: 16,
      xl: 18,
      '2xl': 20,
      '3xl': 24,
      '4xl': 28,
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
};

interface CreditScoreCardProps {
  score?: number;
  maxScore?: number;
  showRange?: boolean;
  style?: ViewStyle;
  animated?: boolean;
}

const CreditScoreCard: React.FC<CreditScoreCardProps> = ({ 
  score = 750, 
  maxScore = 900,
  showRange = true,
  style,
  animated = true 
}) => {
  // Determine score category and styling
  const getScoreInfo = (score) => {
    if (score >= 750) {
      return {
        label: 'Excellent',
        color: theme.colors.success,
        gradientColors: ['#10b981', '#059669'],
        bgGradient: ['#ecfdf5', '#d1fae5'],
      };
    }
    if (score >= 650) {
      return {
        label: 'Good',
        color: theme.colors.primary,
        gradientColors: ['#6366f1', '#4f46e5'],
        bgGradient: ['#eef2ff', '#e0e7ff'],
      };
    }
    if (score >= 550) {
      return {
        label: 'Fair',
        color: theme.colors.warning,
        gradientColors: ['#f59e0b', '#d97706'],
        bgGradient: ['#fffbeb', '#fef3c7'],
      };
    }
    return {
      label: 'Poor',
      color: theme.colors.danger,
      gradientColors: ['#ef4444', '#dc2626'],
      bgGradient: ['#fef2f2', '#fecaca'],
    };
  };

  const scoreInfo = getScoreInfo(score);
  const progressPercentage = (score / maxScore) * 100;
  const strokeDasharray = 2 * Math.PI * 35; // 35 is radius
  const strokeDashoffset = strokeDasharray - (progressPercentage / 100) * strokeDasharray;

  return (
    <View style={[styles.container, style]}>
      {/* Main Card */}
      <View style={styles.card}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Credit Score</Text>
            <Text style={styles.subtitle}>Updated today</Text>
          </View>
          
          {/* Score Badge */}
          <View style={[styles.badge, { backgroundColor: scoreInfo.color + '15' }]}>
            <View style={[styles.badgeIndicator, { backgroundColor: scoreInfo.color }]} />
            <Text style={[styles.badgeText, { color: scoreInfo.color }]}>
              {scoreInfo.label}
            </Text>
          </View>
        </View>

        {/* Score Display Section */}
        <View style={styles.scoreSection}>
          {/* Left Side - Score Details */}
          <View style={styles.scoreDetails}>
            <Text style={styles.scoreNumber}>{score}</Text>
            <Text style={styles.scoreRange}>out of {maxScore}</Text>
            
            {showRange && (
              <View style={styles.rangeInfo}>
                <Text style={styles.rangeLabel}>Score Range</Text>
                <View style={styles.rangeBar}>
                  <View style={styles.rangeTrack} />
                  <View 
                    style={[
                      styles.rangeProgress, 
                      { 
                        width: `${progressPercentage}%`,
                        backgroundColor: scoreInfo.color 
                      }
                    ]} 
                  />
                  <View 
                    style={[
                      styles.rangeThumb, 
                      { 
                        left: `${progressPercentage}%`,
                        backgroundColor: scoreInfo.color 
                      }
                    ]} 
                  />
                </View>
                <View style={styles.rangeLabels}>
                  <Text style={styles.rangeText}>300</Text>
                  <Text style={styles.rangeText}>850</Text>
                </View>
              </View>
            )}
          </View>

          {/* Right Side - Circular Progress */}
          <View style={styles.circularProgress}>
            <View style={styles.circleContainer}>
              {/* Background Circle */}
              <View style={styles.backgroundCircle} />
              
              {/* Progress Circle */}
              <View style={styles.progressCircle}>
                <View 
                  style={[
                    styles.progressArc,
                    {
                      borderTopColor: scoreInfo.color,
                      borderRightColor: scoreInfo.color,
                      transform: [
                        { rotateZ: `${(progressPercentage / 100) * 360 - 90}deg` }
                      ]
                    }
                  ]} 
                />
              </View>
              
              {/* Center Content */}
              <View style={styles.centerContent}>
                <Text style={[styles.percentageText, { color: scoreInfo.color }]}>
                  {Math.round(progressPercentage)}%
                </Text>
                <Text style={styles.centerLabel}>Score</Text>
              </View>
            </View>
          </View>
        </View>
      </View>


    </View>
  );
};

const CIRCLE_SIZE = 90;
const STROKE_WIDTH = 6;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    width: '100%',
  },
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    elevation: 8,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing['2xl'],
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: theme.typography.sizes['3xl'],
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weights.medium,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
  },
  badgeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: theme.spacing.sm,
  },
  badgeText: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
  },
  scoreSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing['2xl'],
  },
  scoreDetails: {
    flex: 1,
    marginRight: theme.spacing.xl,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: theme.typography.weights.extrabold,
    color: theme.colors.text.primary,
    lineHeight: 56,
  },
  scoreRange: {
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weights.medium,
    marginBottom: theme.spacing.lg,
  },
  rangeInfo: {
    marginTop: theme.spacing.md,
  },
  rangeLabel: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
    fontWeight: theme.typography.weights.medium,
  },
  rangeBar: {
    height: 6,
    backgroundColor: theme.colors.surface,
    borderRadius: 3,
    position: 'relative',
    marginBottom: theme.spacing.sm,
  },
  rangeTrack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
  },
  rangeProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: 3,
  },
  rangeThumb: {
    position: 'absolute',
    top: -3,
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: -6,
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rangeText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.text.tertiary,
    fontWeight: theme.typography.weights.medium,
  },
  circularProgress: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundCircle: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: STROKE_WIDTH,
    borderColor: '#f1f5f9',
  },
  progressCircle: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
  },
  progressArc: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: STROKE_WIDTH,
    borderColor: 'transparent',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
  },
  centerLabel: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.text.tertiary,
    fontWeight: theme.typography.weights.medium,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  footerItem: {
    alignItems: 'center',
    flex: 1,
  },
  footerSeparator: {
    width: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.lg,
  },
  footerLabel: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
    fontWeight: theme.typography.weights.medium,
  },
  footerValue: {
    fontSize: theme.typography.sizes.base,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.weights.semibold,
  },

});

export default CreditScoreCard;