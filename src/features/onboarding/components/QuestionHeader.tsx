import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, spacing } from '@/constants/theme';

interface QuestionHeaderProps {
  step: number;
  totalSteps: number;
  title: string;
  subtitle: string;
}

export function QuestionHeader({ step, totalSteps, title, subtitle }: QuestionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.stepLabel}>
        {step} of {totalSteps}
      </Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  stepLabel: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 30,
  },
  subtitle: {
    fontSize: fontSize.md,
    lineHeight: 24,
    color: colors.muted,
  },
});
