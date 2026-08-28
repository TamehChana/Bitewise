import { StyleSheet, Text, View, type ViewProps } from 'react-native';

import { colors, fontSize, radius, spacing } from '@/constants/theme';

type BadgeTone = 'primary' | 'neutral';

interface BadgeProps extends ViewProps {
  label: string;
  tone?: BadgeTone;
}

export function Badge({ label, tone = 'primary', style, ...props }: BadgeProps) {
  return (
    <View
      style={[styles.base, tone === 'primary' ? styles.primary : styles.neutral, style]}
      {...props}
    >
      <Text style={[styles.label, tone === 'primary' ? styles.primaryLabel : styles.neutralLabel]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
  },
  primary: {
    backgroundColor: colors.successBackground,
  },
  neutral: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  primaryLabel: {
    color: colors.primary,
  },
  neutralLabel: {
    color: colors.muted,
  },
});
