import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors, spacing } from '@/constants/theme';

interface AppSplashProps {
  message?: string;
}

export function AppSplash({ message = 'Loading BiteWise...' }: AppSplashProps) {
  return (
    <View style={styles.container}>
      <View style={styles.logoMark}>
        <AppText style={styles.logoEmoji}>🥗</AppText>
      </View>
      <AppText style={styles.brand} variant="section">
        BiteWise
      </AppText>
      <ActivityIndicator color={colors.primary} size="small" style={styles.spinner} />
      <AppText style={styles.message} variant="caption">
        {message}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  logoMark: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  logoEmoji: {
    fontSize: 32,
  },
  brand: {
    color: colors.primaryDark,
  },
  spinner: {
    marginTop: spacing.sm,
  },
  message: {
    textAlign: 'center',
  },
});
