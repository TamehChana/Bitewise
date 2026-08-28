import { RecommendationServiceError } from '@/services/ai.errors';

function stripMarkdownFences(text: string): string {
  const trimmed = text.trim();
  const fenceMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return fenceMatch ? fenceMatch[1].trim() : trimmed;
}

function extractJsonObject(text: string): string {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');

  if (start === -1 || end <= start) {
    throw new RecommendationServiceError(
      'AI response did not contain a JSON object.',
      'PARSE',
    );
  }

  return text.slice(start, end + 1);
}

export function parseAiJsonResponse(rawText: string): unknown {
  const trimmed = rawText.trim();

  if (!trimmed) {
    throw new RecommendationServiceError('AI response was empty.', 'PARSE');
  }

  const withoutFences = stripMarkdownFences(trimmed);

  try {
    return JSON.parse(withoutFences);
  } catch {
    try {
      const extracted = extractJsonObject(withoutFences);
      return JSON.parse(extracted);
    } catch {
      throw new RecommendationServiceError(
        'AI response could not be parsed as valid JSON.',
        'PARSE',
      );
    }
  }
}
