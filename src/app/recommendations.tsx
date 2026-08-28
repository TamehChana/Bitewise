import { Redirect, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { colors, radius, spacing } from '@/constants/theme';
import { formatPreferencesSummary } from '@/features/recommendations/preferenceSummary';
import { useAppStore } from '@/store/useAppStore';

export default function RecommendationsScreen() {
  const userPreferences = useAppStore((state) => state.userPreferences);
  const onboardingCompleted = useAppStore((state) => state.onboardingCompleted);
  const [hydrated, setHydrated] = useState(useAppStore.persist.hasHydrated());

  useEffect(() => {
    const unsubscribe = useAppStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    return unsubscribe;
  }, []);

  if (!hydrated) {
    return <View style={styles.loading} />;
  }

  if (!onboardingCompleted) {
    return <Redirect href="/" />;
  }

  const summary = userPreferences ? formatPreferencesSummary(userPreferences) : [];

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <View style={styles.hero}>
          <AppText style={styles.emoji} variant="body">
            ✨
          </AppText>
          <AppText variant="title">Your taste profile is ready</AppText>
          <AppText variant="subtitle">
            We&apos;re ready to generate meals that match your preferences.
          </AppText>
        </View>

        {summary.length > 0 ? (
          <View style={styles.summaryCard}>
            <AppText style={styles.summaryTitle} variant="body">
              Your preferences
            </AppText>
            {summary.map((line) => (
              <AppText key={line} style={styles.summaryLine} variant="caption">
                {line}
              </AppText>
            ))}
          </View>
        ) : null}

        <AppButton
          label="View sample meal"
          variant="secondary"
          onPress={() => router.push('/meal/sample-meal')}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.lg,
    paddingBottom: spacing.lg,
  },
  hero: {
    gap: spacing.sm,
  },
  emoji: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs,
  },
  summaryTitle: {
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  summaryLine: {
    lineHeight: 20,
  },
});
