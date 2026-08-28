import { ChefHat } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { colors, radius, shadow, spacing } from '@/constants/theme';

interface RecommendationsErrorProps {
  onRetry: () => void;
  onEditPreferences?: () => void;
}

export function RecommendationsError({ onRetry, onEditPreferences }: RecommendationsErrorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <ChefHat color={colors.primary} size={28} strokeWidth={2} />
      </View>
      <AppText style={styles.title} variant="section">
        Couldn&apos;t reach our AI chef
      </AppText>
      <AppText style={styles.body} variant="body">
        Your preferences are safe. Try generating your recommendations again.
      </AppText>
      <View style={styles.actions}>
        <AppButton label="Try Again" onPress={onRetry} />
        {onEditPreferences ? (
          <AppButton
            label="Edit preferences"
            variant="ghost"
            onPress={onEditPreferences}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.successBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    textAlign: 'center',
  },
  body: {
    textAlign: 'center',
    color: colors.muted,
    marginBottom: spacing.sm,
  },
  actions: {
    alignSelf: 'stretch',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
});
