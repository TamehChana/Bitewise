import { Text, type TextProps, StyleSheet } from 'react-native';

import { colors, fontSize } from '@/constants/theme';

type AppTextVariant = 'title' | 'subtitle' | 'body' | 'caption';

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
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
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
    color: colors.muted,
  },
});
