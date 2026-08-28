import { AI_CONFIG, isAiConfigured } from '@/services/ai.config';
import { AIServiceError } from '@/services/ai.errors';
import { fetchWithTimeout } from '@/utils/fetch-with-timeout';

interface ChatCompletionResponse {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
  error?: {
    message?: string;
  };
}

/**
 * Sends a prompt to the configured AI provider and returns raw text content.
 * Provider details are isolated here — callers work with plain strings.
 */
export async function completeChat(prompt: string): Promise<string> {
  if (!isAiConfigured()) {
    if (__DEV__) {
      console.warn(
        '[BiteWise] AI API key is missing. Set EXPO_PUBLIC_AI_API_KEY in your .env file.',
      );
    }
    throw new AIServiceError(
      'AI service is not configured.',
      'MISSING_API_KEY',
    );
  }

  let response: Response;

  try {
    response = await fetchWithTimeout(
      AI_CONFIG.chatCompletionsUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AI_CONFIG.apiKey}`,
        },
        body: JSON.stringify({
          model: AI_CONFIG.model,
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful assistant. Follow instructions precisely and respond with valid JSON only.',
            },
            { role: 'user', content: prompt },
          ],
          temperature: 0.7,
          response_format: { type: 'json_object' },
        }),
      },
      AI_CONFIG.timeoutMs,
    );
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new AIServiceError('AI request timed out.', 'TIMEOUT');
    }
    throw new AIServiceError('Network request failed.', 'NETWORK');
  }

  let payload: ChatCompletionResponse;

  try {
    payload = (await response.json()) as ChatCompletionResponse;
  } catch {
    throw new AIServiceError('Provider returned an unreadable response.', 'PROVIDER');
  }

  if (!response.ok) {
    const providerMessage = payload.error?.message ?? response.statusText;
    if (__DEV__) {
      console.warn('[BiteWise] AI provider error:', providerMessage);
    }
    throw new AIServiceError(
      providerMessage || 'AI provider returned an error.',
      'PROVIDER',
    );
  }

  const content = payload.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new AIServiceError('AI provider returned an empty response.', 'EMPTY_RESPONSE');
  }

  return content;
}
