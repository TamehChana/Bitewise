import { Check } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, radius, shadow, spacing } from '@/constants/theme';

interface ChoiceChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: string;
  disabled?: boolean;
}

export function ChoiceChip({
  label,
  selected,
  onPress,
  icon,
  disabled = false,
}: ChoiceChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && !disabled && styles.chipPressed,
        disabled && styles.chipDisabled,
      ]}
    >
      <View style={styles.content}>
        {icon ? <Text style={styles.icon}>{icon}</Text> : null}
        <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
      </View>
      {selected ? (
        <View style={styles.checkmark}>
          <Check color={colors.surface} size={14} strokeWidth={3} />
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadow.card,
  },
  chipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.successBackground,
  },
  chipPressed: {
    opacity: 0.92,
  },
  chipDisabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
    paddingRight: spacing.sm,
  },
  icon: {
    fontSize: 20,
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: '500',
    color: colors.text,
    flexShrink: 1,
  },
  labelSelected: {
    fontWeight: '600',
    color: colors.primaryDark,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
