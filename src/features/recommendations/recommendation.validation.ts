import { z } from 'zod';

import type { MealDifficulty, MealRecommendation } from '@/types/recommendation';
import { RecommendationServiceError } from '@/services/ai.errors';

const DIFFICULTIES: MealDifficulty[] = ['Easy', 'Medium', 'Hard'];

function coercePositiveNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
    return value;
  }
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
  }
  return undefined;
}

function coerceNonNegativeNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value) && value >= 0) {
    return value;
  }
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed >= 0) {
      return parsed;
    }
  }
  return undefined;
}

function coerceString(value: unknown): string | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }
  return undefined;
}

function coerceDifficulty(value: unknown): MealDifficulty | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }
  const normalized = value.trim();
  const match = DIFFICULTIES.find(
    (item) => item.toLowerCase() === normalized.toLowerCase(),
  );
  return match;
}

function coerceIngredients(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const ingredients = value
    .map((item) => coerceString(item))
    .filter((item): item is string => Boolean(item));

  return ingredients.length > 0 ? ingredients : undefined;
}

const rawMealSchema = z.object({
  id: z.unknown().optional(),
  name: z.unknown(),
  description: z.unknown(),
  reason: z.unknown(),
  prepTime: z.unknown(),
  difficulty: z.unknown(),
  calories: z.unknown(),
  protein: z.unknown(),
  ingredients: z.unknown(),
});

const aiResponseSchema = z.object({
  recommendations: z.array(rawMealSchema).min(1),
});

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
}

function normalizeMeal(raw: z.infer<typeof rawMealSchema>, index: number): MealRecommendation {
  const name = coerceString(raw.name);
  const description = coerceString(raw.description);
  const reason = coerceString(raw.reason);
  const prepTime = coercePositiveNumber(raw.prepTime);
  const difficulty = coerceDifficulty(raw.difficulty);
  const calories = coercePositiveNumber(raw.calories);
  const protein = coerceNonNegativeNumber(raw.protein);
  const ingredients = coerceIngredients(raw.ingredients);

  if (
    !name ||
    !description ||
    !reason ||
    prepTime === undefined ||
    !difficulty ||
    calories === undefined ||
    protein === undefined ||
    !ingredients
  ) {
    throw new RecommendationServiceError(
      `Recommendation at index ${index} is missing required fields.`,
      'VALIDATION',
    );
  }

  const providedId = coerceString(raw.id);
  const id = providedId ?? `meal-${index + 1}-${slugify(name) || 'suggestion'}`;

  return {
    id,
    name,
    description,
    reason,
    prepTime,
    difficulty,
    calories,
    protein,
    ingredients,
  };
}

export function validateRecommendationsResponse(data: unknown): MealRecommendation[] {
  const parsed = aiResponseSchema.safeParse(data);

  if (!parsed.success) {
    if (__DEV__) {
      console.warn('[BiteWise] Validation failed:', parsed.error.message);
    }
    throw new RecommendationServiceError(
      'AI response did not match the expected recommendation schema.',
      'VALIDATION',
    );
  }

  const normalized = parsed.data.recommendations
    .slice(0, 3)
    .map((item, index) => normalizeMeal(item, index));

  if (normalized.length !== 3) {
    throw new RecommendationServiceError(
      'AI response must include exactly 3 recommendations.',
      'VALIDATION',
    );
  }

  return normalized;
}
