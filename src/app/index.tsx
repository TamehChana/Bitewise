import { Redirect, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/ui/AppText';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { useAppStore } from '@/store/useAppStore';

const FOOD_EMOJIS = ['🥗', '🍝', '🌮', '🍣', '🥘'];

export default function WelcomeScreen() {
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

  if (onboardingCompleted) {
    return <Redirect href="/recommendations" />;
  }

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <View style={styles.hero}>
          <View style={styles.emojiRow}>
            {FOOD_EMOJIS.map((emoji) => (
              <View key={emoji} style={styles.emojiBubble}>
                <Text style={styles.emoji}>{emoji}</Text>
              </View>
            ))}
          </View>

          <View style={styles.textBlock}>
            <Text style={styles.badge}>AI-powered meal suggestions</Text>
            <AppText style={styles.title} variant="title">
              BiteWise
            </AppText>
            <AppText style={styles.tagline} variant="subtitle">
              Food that understands you.
            </AppText>
            <AppText style={styles.supporting} variant="body">
              Tell us what you enjoy, and BiteWise will create meal suggestions around
              your taste, goals, budget, and lifestyle.
            </AppText>
          </View>
        </View>

        <AppButton label="Get Started" onPress={() => router.push('/onboarding')} />
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
    justifyContent: 'space-between',
    paddingBottom: spacing.lg,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.xl,
  },
  emojiRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  emojiBubble: {
    width: 52,
    height: 52,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  emoji: {
    fontSize: 24,
  },
  textBlock: {
    gap: spacing.md,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.successBackground,
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: '600',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  title: {
    fontSize: fontSize.hero,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: fontSize.xl,
    lineHeight: 28,
  },
  supporting: {
    color: colors.muted,
    maxWidth: 340,
  },
});
