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

function formatCuisineList(cuisines: Cuisine[]): string {
  const labels = cuisines.map((c) => findLabel<Cuisine>('cuisines', c));
  if (labels.length === 1) {
    return labels[0];
  }
  if (labels.length === 2) {
    return `${labels[0]} and ${labels[1]}`;
  }
  return `${labels.slice(0, -1).join(', ')}, and ${labels[labels.length - 1]}`;
}

function formatAllergyList(allergies: Allergy[]): string {
  const filtered = allergies.filter((item) => item !== 'none');
  if (filtered.length === 0) {
    return 'no listed allergens';
  }
  return filtered.map((a) => findLabel<Allergy>('allergies', a)).join(', ');
}

function formatCookingTimeHint(cookingTime: CookingTime): string {
  switch (cookingTime) {
    case 'under_15':
      return 'your quick 15-minute cooking preference';
    case '15_30':
      return 'your 30-minute cooking preference';
    case '30_60':
      return 'your up-to-60-minute cooking preference';
    case 'no_preference':
      return 'flexible cooking time';
    default:
      return 'your cooking preferences';
  }
}

function formatGoalPhrase(goal: FoodGoal): string {
  switch (goal) {
    case 'healthier':
      return 'Balanced, healthier meals';
    case 'high_protein':
      return 'High-protein meals';
    case 'lose_weight':
      return 'Lighter meals';
    case 'gain_weight':
      return 'Satisfying, energy-rich meals';
    case 'enjoy':
      return 'Flavor-forward meals';
    default:
      return 'Personalized meals';
  }
}

export function buildPersonalizedSummary(preferences: UserPreferences): string {
  const goalPhrase = formatGoalPhrase(preferences.goal);
  const cuisinePhrase = formatCuisineList(preferences.cuisines);
  const cookingHint = formatCookingTimeHint(preferences.cookingTime);

  return `${goalPhrase} inspired by ${cuisinePhrase} flavors, designed around ${cookingHint}.`;
}

export function buildRecommendationPrompt(preferences: UserPreferences): string {
  const diet = findLabel<DietType>('diet', preferences.diet);
  const goal = findLabel<FoodGoal>('goal', preferences.goal);
  const cuisines = preferences.cuisines
    .map((c) => findLabel<Cuisine>('cuisines', c))
    .join(', ');
  const allergies = formatAllergyList(preferences.allergies);
  const cookingTime = findLabel<CookingTime>('cookingTime', preferences.cookingTime);
  const budget = findLabel<BudgetLevel>('budget', preferences.budget);

  return `You are BiteWise, a personalized food recommendation assistant.

Create exactly 3 meal recommendations for this user.

USER PREFERENCES
Diet: ${diet}
Goal: ${goal}
Favorite cuisines: ${cuisines}
Allergies/exclusions: ${allergies}
Cooking time: ${cookingTime}
Budget: ${budget}

RULES
- Respect the user's diet.
- Do not intentionally include any listed allergen.
- Prefer the user's selected cuisines, while some reasonable variety is allowed.
- Respect the requested cooking time as closely as possible.
- Keep ingredient choices appropriate for the selected budget.
- Recommendations should be realistic meals people could actually prepare.
- Keep descriptions concise.
- Explain why each meal fits the user's preferences.
- Avoid medical claims.
- Avoid claiming guaranteed weight loss, health outcomes, or nutritional treatment.
- Do not include markdown.
- Do not include commentary before or after the response.
- Return ONLY valid JSON.
- Generate exactly 3 recommendations.

Required output schema:
{
  "recommendations": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "reason": "string",
      "prepTime": 25,
      "difficulty": "Easy",
      "calories": 500,
      "protein": 35,
      "ingredients": [
        "ingredient 1",
        "ingredient 2"
      ]
    }
  ]
}

Difficulty must only be: "Easy", "Medium", or "Hard".
prepTime must be numeric minutes.
calories must be numeric.
protein must be numeric grams.
Return exactly three items.`;
}
