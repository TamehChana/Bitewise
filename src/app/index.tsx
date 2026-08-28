import { Redirect, router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppSplash } from '@/components/ui/AppSplash';
import { AppText } from '@/components/ui/AppText';
import { Badge } from '@/components/ui/Badge';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { FoodHeroVisual } from '@/components/welcome/FoodHeroVisual';
import { colors, spacing } from '@/constants/theme';
import { useStoreHydration } from '@/hooks/useStoreHydration';
import { useAppStore } from '@/store/useAppStore';

export default function WelcomeScreen() {
  const onboardingCompleted = useAppStore((state) => state.onboardingCompleted);
  const hydrated = useStoreHydration();

  if (!hydrated) {
    return <AppSplash />;
  }

  if (onboardingCompleted) {
    return <Redirect href="/recommendations" />;
  }

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <View style={styles.hero}>
          <FoodHeroVisual />

          <View style={styles.textBlock}>
            <Badge label="AI-powered meal suggestions" />
            <AppText variant="display">BiteWise</AppText>
            <AppText variant="subtitle">Food that understands you.</AppText>
            <AppText style={styles.supporting} variant="body">
              Tell us what you enjoy, and BiteWise will create meal suggestions around your
              taste, goals, budget, and lifestyle.
            </AppText>
          </View>
        </View>

        <AppButton label="Get Started" onPress={() => router.push('/onboarding')} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
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
  textBlock: {
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  supporting: {
    color: colors.muted,
    maxWidth: 340,
  },
});
