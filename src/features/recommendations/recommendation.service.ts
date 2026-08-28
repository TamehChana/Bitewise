import { completeChat } from '@/services/ai.service';
import { AIServiceError, RecommendationServiceError } from '@/services/ai.errors';
import type { MealRecommendation } from '@/types/recommendation';
import type { UserPreferences } from '@/types/preferences';
import { parseAiJsonResponse } from '@/utils/parse-ai-response';

import { buildRecommendationPrompt } from './recommendation.prompt';
import { validateRecommendationsResponse } from './recommendation.validation';

export async function generateRecommendations(
  preferences: UserPreferences,
): Promise<MealRecommendation[]> {
  const prompt = buildRecommendationPrompt(preferences);

  let rawText: string;

  try {
    rawText = await completeChat(prompt);
  } catch (error) {
    if (error instanceof AIServiceError || error instanceof RecommendationServiceError) {
      throw error;
    }
    throw new RecommendationServiceError(
      error instanceof Error ? error.message : 'Failed to generate recommendations.',
      'GENERATION',
    );
  }

  let parsed: unknown;

  try {
    parsed = parseAiJsonResponse(rawText);
  } catch (error) {
    if (__DEV__ && error instanceof RecommendationServiceError) {
      console.warn('[BiteWise] Parse failure:', error.message);
    }
    throw error;
  }

  return validateRecommendationsResponse(parsed);
}
