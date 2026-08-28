import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, spacing } from '@/constants/theme';

interface QuestionHeaderProps {
  title: string;
  subtitle: string;
}

export function QuestionHeader({ title, subtitle }: QuestionHeaderProps) {
  return (
    <View style={styles.container}>
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
