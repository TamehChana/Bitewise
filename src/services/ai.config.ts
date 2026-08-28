/**
 * Centralized AI provider configuration.
 * The rest of the app should not import provider-specific values directly.
 *
 * Note: EXPO_PUBLIC_* vars are embedded in the client bundle. For production,
 * proxy AI requests through a secure backend instead of exposing API keys.
 */
export const AI_CONFIG = {
  apiKey:
    process.env.EXPO_PUBLIC_AI_API_KEY ??
    process.env.EXPO_PUBLIC_GROQ_API_KEY ??
    '',
  model:
    process.env.EXPO_PUBLIC_AI_MODEL ??
    process.env.EXPO_PUBLIC_GROQ_MODEL ??
    'llama-3.3-70b-versatile',
  /** Groq OpenAI-compatible endpoint — isolated here so UI never depends on provider. */
  chatCompletionsUrl: 'https://api.groq.com/openai/v1/chat/completions',
  timeoutMs: 30_000,
} as const;

export function isAiConfigured(): boolean {
  const key = AI_CONFIG.apiKey.trim();
  return key.length > 0 && key !== 'your_key_here';
}
