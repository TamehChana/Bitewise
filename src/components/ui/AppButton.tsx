import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

import { colors, fontSize, radius, spacing } from '@/constants/theme';

type AppButtonVariant = 'primary' | 'secondary' | 'ghost';

interface AppButtonProps extends Pick<PressableProps, 'onPress' | 'disabled' | 'accessibilityLabel'> {
  label: string;
  loading?: boolean;
  variant?: AppButtonVariant;
  icon?: LucideIcon;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function AppButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  icon: Icon,
  fullWidth = true,
  style,
  accessibilityLabel,
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        fullWidth && styles.fullWidth,
        pressed && !isDisabled && pressedStyles[variant],
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.surface : colors.primary}
          size="small"
        />
      ) : (
        <View style={styles.content}>
          {Icon ? <Icon color={iconColors[variant]} size={18} strokeWidth={2.25} /> : null}
          <Text style={[styles.label, labelStyles[variant]]}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
}

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
    minHeight: 44,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
});

const pressedStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primaryDark,
  },
  secondary: {
    backgroundColor: colors.background,
  },
  ghost: {
    opacity: 0.72,
  },
});

const labelStyles = StyleSheet.create({
  primary: {
    color: colors.surface,
  },
  secondary: {
    color: colors.text,
  },
  ghost: {
    color: colors.primary,
  },
});

const iconColors = {
  primary: colors.surface,
  secondary: colors.text,
  ghost: colors.primary,
} as const;

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: '600',
  },
});
