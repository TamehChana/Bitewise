import { ArrowRight, Clock, Dumbbell, Flame } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import { Badge } from '@/components/ui/Badge';
import { colors, fontSize, radius, shadow, spacing } from '@/constants/theme';
import { getMealAccentColor, getMealVisualEmoji } from '@/features/recommendations/mealVisuals';
import type { MealRecommendation } from '@/types/recommendation';

interface MealCardProps {
  meal: MealRecommendation;
  onPress: () => void;
}

export function MealCard({ meal, onPress }: MealCardProps) {
  const accentColor = getMealAccentColor(meal.id);
  const emoji = getMealVisualEmoji(meal.name);

  return (
    <Pressable
      accessibilityHint="Opens meal details"
      accessibilityLabel={`${meal.name}. ${meal.prepTime} minutes. ${meal.calories} calories.`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={[styles.visualHeader, { backgroundColor: accentColor }]}>
        <View style={styles.visualOverlay} />
        <Text style={styles.visualEmoji}>{emoji}</Text>
      </View>

      <View style={styles.body}>
        <Badge label="Recommended for you" />

        <AppText numberOfLines={2} style={styles.name} variant="section">
          {meal.name}
        </AppText>

        <AppText numberOfLines={2} style={styles.description} variant="caption">
          {meal.description}
        </AppText>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Clock color={colors.muted} size={14} strokeWidth={2.25} />
            <AppText style={styles.metaText} variant="caption">
              {meal.prepTime} min
            </AppText>
          </View>
          <View style={styles.metaItem}>
            <Flame color={colors.muted} size={14} strokeWidth={2.25} />
            <AppText style={styles.metaText} variant="caption">
              {meal.calories} kcal
            </AppText>
          </View>
          <View style={styles.metaItem}>
            <Dumbbell color={colors.muted} size={14} strokeWidth={2.25} />
            <AppText style={styles.metaText} variant="caption">
              {meal.protein}g protein
            </AppText>
          </View>
        </View>

        <View style={styles.reasonBlock}>
          <AppText style={styles.reasonLabel} variant="caption">
            Why it matches you
          </AppText>
          <AppText numberOfLines={3} style={styles.reason} variant="body">
            {meal.reason}
          </AppText>
        </View>

        <View style={styles.footer}>
          <AppText style={styles.footerText} variant="body">
            View meal
          </AppText>
          <ArrowRight color={colors.primary} size={16} strokeWidth={2.5} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadow.card,
  },
  cardPressed: {
    opacity: 0.96,
    transform: [{ scale: 0.995 }],
  },
  visualHeader: {
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  visualOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  visualEmoji: {
    fontSize: 36,
  },
  body: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  name: {
    fontSize: fontSize.lg,
    lineHeight: 24,
  },
  description: {
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    paddingTop: spacing.xs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    color: colors.text,
    fontWeight: '500',
  },
  reasonBlock: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.sm + 4,
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  reasonLabel: {
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    fontSize: fontSize.xs,
  },
  reason: {
    fontSize: fontSize.sm,
    lineHeight: 20,
    color: colors.text,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.xs,
  },
  footerText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: fontSize.sm,
  },
});
