import { router, useLocalSearchParams } from 'expo-router';
import { Check, Clock, Dumbbell, Flame, Gauge } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppSplash } from '@/components/ui/AppSplash';
import { AppText } from '@/components/ui/AppText';
import { Badge } from '@/components/ui/Badge';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors, fontSize, radius, shadow, spacing } from '@/constants/theme';
import { getMealAccentColor, getMealVisualEmoji } from '@/features/recommendations/mealVisuals';
import { useStoreHydration } from '@/hooks/useStoreHydration';
import { useAppStore } from '@/store/useAppStore';

export default function MealDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recommendations = useAppStore((state) => state.recommendations);
  const hydrated = useStoreHydration();

  if (!hydrated) {
    return <AppSplash message="Loading meal details..." />;
  }

  const meal = recommendations?.find((item) => item.id === id);

  if (!meal) {
    return (
      <ScreenContainer>
        <ScreenHeader backLabel="Back" onBack={() => router.replace('/recommendations')} />
        <View style={styles.unavailable}>
          <AppText variant="title">Meal unavailable</AppText>
          <AppText style={styles.unavailableBody} variant="body">
            This recommendation may no longer be available.
          </AppText>
          <AppButton
            label="Back to recommendations"
            variant="secondary"
            onPress={() => router.replace('/recommendations')}
          />
        </View>
      </ScreenContainer>
    );
  }

  const accentColor = getMealAccentColor(meal.id);
  const emoji = getMealVisualEmoji(meal.name);

  return (
    <ScreenContainer>
      <ScreenHeader backLabel="Back" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.heroVisual, { backgroundColor: accentColor }]}>
          <View style={styles.heroOverlay} />
          <Text style={styles.heroEmoji}>{emoji}</Text>
        </View>

        <View style={styles.header}>
          <Badge label="Recommended for you" />
          <AppText variant="title">{meal.name}</AppText>
          <AppText style={styles.description} variant="body">
            {meal.description}
          </AppText>
        </View>

        <View style={styles.metaGrid}>
          <MetaItem icon={Clock} label="Prep time" value={`${meal.prepTime} min`} />
          <MetaItem icon={Gauge} label="Difficulty" value={meal.difficulty} />
          <MetaItem icon={Flame} label="Calories" value={`${meal.calories} kcal`} />
          <MetaItem icon={Dumbbell} label="Protein" value={`${meal.protein}g`} />
        </View>

        <View style={styles.section}>
          <AppText style={styles.sectionTitle} variant="section">
            Why this fits you
          </AppText>
          <AppText variant="body">{meal.reason}</AppText>
        </View>

        <View style={styles.section}>
          <AppText style={styles.sectionTitle} variant="section">
            Ingredients
          </AppText>
          <View style={styles.ingredientList}>
            {meal.ingredients.map((ingredient) => (
              <View key={ingredient} style={styles.ingredientRow}>
                <View style={styles.ingredientIcon}>
                  <Check color={colors.primary} size={14} strokeWidth={2.5} />
                </View>
                <AppText style={styles.ingredientText} variant="body">
                  {ingredient}
                </AppText>
              </View>
            ))}
          </View>
        </View>

        <AppButton
          label="Back to recommendations"
          variant="secondary"
          onPress={() => router.back()}
        />
      </ScrollView>
    </ScreenContainer>
  );
}

interface MetaItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

function MetaItem({ icon: Icon, label, value }: MetaItemProps) {
  return (
    <View style={styles.metaItem}>
      <Icon color={colors.primary} size={16} strokeWidth={2.25} />
      <AppText style={styles.metaLabel} variant="caption">
        {label}
      </AppText>
      <AppText style={styles.metaValue} variant="body">
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    gap: spacing.lg,
    paddingBottom: spacing.xl,
  },
  heroVisual: {
    height: 140,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    ...shadow.card,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  heroEmoji: {
    fontSize: 52,
  },
  header: {
    gap: spacing.sm,
  },
  description: {
    color: colors.muted,
    lineHeight: 24,
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metaItem: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs,
    ...shadow.card,
  },
  metaLabel: {
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    fontSize: fontSize.xs,
  },
  metaValue: {
    fontWeight: '600',
    fontSize: fontSize.md,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
    ...shadow.card,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
  },
  ingredientList: {
    gap: spacing.sm,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  ingredientIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.successBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ingredientText: {
    flex: 1,
    lineHeight: 22,
  },
  unavailable: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.md,
  },
  unavailableBody: {
    color: colors.muted,
  },
});
