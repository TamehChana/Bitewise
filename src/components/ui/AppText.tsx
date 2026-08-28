import { Text, type TextProps, StyleSheet } from 'react-native';

import { colors, fontSize } from '@/constants/theme';

type AppTextVariant = 'display' | 'title' | 'section' | 'subtitle' | 'body' | 'caption';

interface AppTextProps extends TextProps {
  variant?: AppTextVariant;
}

export function AppText({ variant = 'body', style, ...props }: AppTextProps) {
  return <Text style={[styles.base, styles[variant], style]} {...props} />;
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
  },
  display: {
    fontSize: fontSize.hero,
    fontWeight: '700',
    letterSpacing: -0.5,
    lineHeight: 40,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    lineHeight: 34,
  },
  section: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    lineHeight: 28,
  },
  subtitle: {
    fontSize: fontSize.lg,
    lineHeight: 26,
    color: colors.muted,
  },
  body: {
    fontSize: fontSize.md,
    lineHeight: 24,
    color: colors.text,
  },
  caption: {
    fontSize: fontSize.sm,
    lineHeight: 20,
    color: colors.muted,
  },
});
