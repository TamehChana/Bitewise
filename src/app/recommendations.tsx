import { Redirect, router } from 'expo-router';
import { RefreshCw, SlidersHorizontal } from 'lucide-react-native';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppSplash } from '@/components/ui/AppSplash';
import { AppText } from '@/components/ui/AppText';
import { Badge } from '@/components/ui/Badge';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { clearRecommendations as clearStoredRecommendations } from '@/services/storage.service';
import { MealCard } from '@/features/recommendations/components/MealCard';
import { RecommendationsError } from '@/features/recommendations/components/RecommendationsError';
import { RecommendationsLoading } from '@/features/recommendations/components/RecommendationsLoading';
import { buildPersonalizedSummary } from '@/features/recommendations/recommendation.prompt';
import { useRecommendations } from '@/features/recommendations/useRecommendations';
import { useStoreHydration } from '@/hooks/useStoreHydration';
import { useAppStore } from '@/store/useAppStore';
import { colors, radius, spacing } from '@/constants/theme';

export default function RecommendationsScreen() {
  const userPreferences = useAppStore((state) => state.userPreferences);
  const onboardingCompleted = useAppStore((state) => state.onboardingCompleted);
  const storedRecommendations = useAppStore((state) => state.recommendations);
  const clearRecommendations = useAppStore((state) => state.clearRecommendations);

  const hydrated = useStoreHydration();

  const {
    status,
    usedFallback,
    loadingMessageIndex,
    recommendations,
    regenerate,
    retry,
  } = useRecommendations(userPreferences, storedRecommendations);

  if (!hydrated) {
    return <AppSplash message="Preparing your recommendations..." />;
  }

  if (!onboardingCompleted) {
    return <Redirect href="/" />;
  }

  if (!userPreferences) {
    return <Redirect href="/onboarding" />;
  }

  const summary = buildPersonalizedSummary(userPreferences);
  const isGenerating = status === 'loading';
  const showResults = status === 'success' && recommendations && recommendations.length === 3;

  const handleEditPreferences = () => {
    clearRecommendations();
    void clearStoredRecommendations();
    router.push('/onboarding');
  };

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Badge label="Made for you ✨" />
          <AppText variant="title">Your meal suggestions</AppText>
          <AppText style={styles.summary} variant="subtitle">
            {summary}
          </AppText>
          <AppButton
            fullWidth={false}
            icon={SlidersHorizontal}
            label="Edit preferences"
            style={styles.editButton}
            variant="ghost"
            onPress={handleEditPreferences}
          />
        </View>

        {isGenerating ? <RecommendationsLoading messageIndex={loadingMessageIndex} /> : null}

        {status === 'error' ? (
          <RecommendationsError
            onEditPreferences={handleEditPreferences}
            onRetry={() => void retry()}
          />
        ) : null}

        {showResults ? (
          <View style={styles.list}>
            {usedFallback ? (
              <View style={styles.fallbackBanner}>
                <AppText variant="caption">
                  Our AI chef is temporarily unavailable, so here are a few matches from
                  BiteWise.
                </AppText>
              </View>
            ) : null}

            {recommendations.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onPress={() => router.push(`/meal/${meal.id}`)}
              />
            ))}
          </View>
        ) : null}

        {showResults ? (
          <AppButton
            disabled={isGenerating}
            icon={RefreshCw}
            label="Regenerate suggestions"
            loading={isGenerating}
            variant="secondary"
            onPress={() => void regenerate()}
          />
        ) : null}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    gap: spacing.lg,
    paddingBottom: spacing.xl,
    paddingTop: spacing.sm,
  },
  hero: {
    gap: spacing.sm,
  },
  summary: {
    lineHeight: 26,
  },
  editButton: {
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
    paddingHorizontal: 0,
  },
  fallbackBanner: {
    backgroundColor: colors.successBackground,
    borderRadius: radius.md,
    padding: spacing.sm + 4,
  },
  list: {
    gap: spacing.md,
  },
});
