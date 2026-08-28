import type { MealRecommendation } from '@/types/recommendation';
import type { UserPreferences } from '@/types/preferences';

interface FallbackMeal extends MealRecommendation {
  diets: Array<UserPreferences['diet'] | 'any'>;
  cuisines: UserPreferences['cuisines'][number][];
  maxPrepTime: number;
}

const FALLBACK_MEALS: FallbackMeal[] = [
  {
    id: 'fallback-mediterranean-bowl',
    name: 'Mediterranean Chickpea Bowl',
    description:
      'A bright bowl with chickpeas, cucumber, tomato, olives, and lemon herb dressing.',
    reason: 'Balanced, plant-forward, and quick to assemble for Mediterranean lovers.',
    prepTime: 20,
    difficulty: 'Easy',
    calories: 480,
    protein: 18,
    ingredients: [
      'Chickpeas',
      'Cherry tomatoes',
      'Cucumber',
      'Kalamata olives',
      'Olive oil',
      'Lemon juice',
      'Fresh parsley',
    ],
    diets: ['vegetarian', 'vegan', 'anything'],
    cuisines: ['mediterranean'],
    maxPrepTime: 30,
  },
  {
    id: 'fallback-teriyaki-salmon',
    name: 'Teriyaki Salmon with Rice',
    description:
      'Pan-seared salmon glazed with a simple teriyaki sauce, served over steamed rice.',
    reason: 'High in protein with Asian-inspired flavors and a straightforward cook time.',
    prepTime: 25,
    difficulty: 'Medium',
    calories: 540,
    protein: 38,
    ingredients: [
      'Salmon fillet',
      'Soy sauce',
      'Honey',
      'Garlic',
      'Steamed rice',
      'Broccoli',
      'Sesame seeds',
    ],
    diets: ['pescatarian', 'anything'],
    cuisines: ['asian'],
    maxPrepTime: 30,
  },
  {
    id: 'fallback-jollof-inspired-chicken',
    name: 'Jollof-Inspired Chicken Skillet',
    description:
      'One-pan chicken with tomatoes, peppers, and warm spices over fluffy rice.',
    reason: 'Bold African-inspired flavors with a satisfying, budget-friendly ingredient list.',
    prepTime: 35,
    difficulty: 'Medium',
    calories: 590,
    protein: 34,
    ingredients: [
      'Chicken thighs',
      'Long-grain rice',
      'Tomatoes',
      'Bell pepper',
      'Onion',
      'Tomato paste',
      'Smoked paprika',
    ],
    diets: ['halal', 'anything'],
    cuisines: ['african'],
    maxPrepTime: 60,
  },
  {
    id: 'fallback-veggie-pasta',
    name: 'Garlic Lemon Veggie Pasta',
    description:
      'Whole-wheat pasta tossed with sautéed zucchini, spinach, garlic, and lemon.',
    reason: 'A lighter Italian-style meal that comes together quickly on a budget.',
    prepTime: 22,
    difficulty: 'Easy',
    calories: 460,
    protein: 14,
    ingredients: [
      'Whole-wheat pasta',
      'Zucchini',
      'Baby spinach',
      'Garlic',
      'Olive oil',
      'Lemon zest',
      'Parmesan (optional)',
    ],
    diets: ['vegetarian', 'anything'],
    cuisines: ['italian'],
    maxPrepTime: 30,
  },
  {
    id: 'fallback-chickpea-curry',
    name: 'Quick Chickpea Curry',
    description:
      'Creamy tomato-based curry with chickpeas, spinach, and warm Indian spices.',
    reason: 'Comforting Indian flavors with pantry-friendly ingredients and fast prep.',
    prepTime: 25,
    difficulty: 'Easy',
    calories: 420,
    protein: 16,
    ingredients: [
      'Chickpeas',
      'Coconut milk',
      'Crushed tomatoes',
      'Spinach',
      'Garam masala',
      'Garlic',
      'Basmati rice',
    ],
    diets: ['vegetarian', 'vegan', 'anything'],
    cuisines: ['indian'],
    maxPrepTime: 30,
  },
  {
    id: 'fallback-turkey-lettuce-wraps',
    name: 'Turkey Lettuce Wraps',
    description:
      'Savory ground turkey cooked with ginger, soy, and crisp vegetables in lettuce cups.',
    reason: 'A lighter American-style option with quick prep and flexible budgeting.',
    prepTime: 18,
    difficulty: 'Easy',
    calories: 380,
    protein: 28,
    ingredients: [
      'Ground turkey',
      'Butter lettuce',
      'Water chestnuts',
      'Soy sauce',
      'Ginger',
      'Green onion',
      'Sesame oil',
    ],
    diets: ['anything'],
    cuisines: ['american', 'asian'],
    maxPrepTime: 30,
  },
];

function maxCookingMinutes(cookingTime: UserPreferences['cookingTime']): number {
  switch (cookingTime) {
    case 'under_15':
      return 15;
    case '15_30':
      return 30;
    case '30_60':
      return 60;
    case 'no_preference':
      return 999;
    default:
      return 60;
  }
}

function scoreMeal(meal: FallbackMeal, preferences: UserPreferences): number {
  let score = 0;

  if (meal.diets.includes(preferences.diet) || meal.diets.includes('any')) {
    score += 3;
  }

  const cuisineOverlap = meal.cuisines.filter((c) => preferences.cuisines.includes(c)).length;
  score += cuisineOverlap * 2;

  if (meal.maxPrepTime <= maxCookingMinutes(preferences.cookingTime)) {
    score += 2;
  }

  if (preferences.goal === 'high_protein' && meal.protein >= 25) {
    score += 2;
  }

  if (preferences.goal === 'lose_weight' && meal.calories <= 450) {
    score += 1;
  }

  return score;
}

export function getFallbackRecommendations(
  preferences: UserPreferences,
): MealRecommendation[] {
  const ranked = [...FALLBACK_MEALS]
    .sort((a, b) => scoreMeal(b, preferences) - scoreMeal(a, preferences))
    .slice(0, 3)
    .map(({ diets: _diets, cuisines: _cuisines, maxPrepTime: _maxPrepTime, ...meal }) => meal);

  return ranked;
}
