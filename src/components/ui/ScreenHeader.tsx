import { ChevronLeft } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, spacing } from '@/constants/theme';

interface ScreenHeaderProps {
  title?: string;
  onBack: () => void;
  backLabel?: string;
}

export function ScreenHeader({ title, onBack, backLabel = 'Back' }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityLabel={backLabel}
        accessibilityRole="button"
        hitSlop={12}
        onPress={onBack}
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
      >
        <ChevronLeft color={colors.text} size={22} strokeWidth={2.25} />
        <Text style={styles.backLabel}>{backLabel}</Text>
      </Pressable>
      {title ? <Text style={styles.title}>{title}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    paddingTop: spacing.xs,
    paddingBottom: spacing.md,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs,
    minHeight: 44,
    paddingRight: spacing.sm,
  },
  backLabel: {
    fontSize: fontSize.md,
    fontWeight: '500',
    color: colors.text,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
  },
  pressed: {
    opacity: 0.72,
  },
});
