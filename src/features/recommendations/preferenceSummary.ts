import { ONBOARDING_QUESTIONS } from '@/features/onboarding/questions';
import type {
  Allergy,
  BudgetLevel,
  CookingTime,
  Cuisine,
  DietType,
  FoodGoal,
  UserPreferences,
} from '@/types/preferences';

function findLabel<T extends string>(
  questionId: 'diet' | 'goal' | 'cuisines' | 'allergies' | 'cookingTime' | 'budget',
  value: T,
): string {
  const question = ONBOARDING_QUESTIONS.find((item) => item.id === questionId);
  const option = question?.options.find((item) => item.value === value);
  return option?.label ?? value;
}

export function formatPreferencesSummary(preferences: UserPreferences): string[] {
  return [
    `Diet: ${findLabel<DietType>('diet', preferences.diet)}`,
    `Goal: ${findLabel<FoodGoal>('goal', preferences.goal)}`,
    `Cuisines: ${preferences.cuisines.map((c) => findLabel<Cuisine>('cuisines', c)).join(', ')}`,
    `Avoid: ${preferences.allergies.map((a) => findLabel<Allergy>('allergies', a)).join(', ')}`,
    `Cooking time: ${findLabel<CookingTime>('cookingTime', preferences.cookingTime)}`,
    `Budget: ${findLabel<BudgetLevel>('budget', preferences.budget)}`,
  ];
}
