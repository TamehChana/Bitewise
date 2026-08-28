import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { colors, radius, shadow, spacing } from '@/constants/theme';
import { getLoadingMessage } from '@/features/recommendations/useRecommendations';

interface RecommendationsLoadingProps {
  messageIndex: number;
}

export function RecommendationsLoading({ messageIndex }: RecommendationsLoadingProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconRing}>
        <Text style={styles.icon}>🍽️</Text>
      </View>
      <ActivityIndicator color={colors.primary} size="large" />
      <AppText style={styles.message} variant="body">
        {getLoadingMessage(messageIndex)}
      </AppText>
      <AppText style={styles.hint} variant="caption">
        Crafting three meals tailored to your taste profile
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  iconRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  icon: {
    fontSize: 32,
  },
  message: {
    textAlign: 'center',
    fontWeight: '600',
    color: colors.text,
  },
  hint: {
    textAlign: 'center',
    maxWidth: 260,
  },
});
