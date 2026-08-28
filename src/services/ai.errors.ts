export type AIServiceErrorCode =
  | 'MISSING_API_KEY'
  | 'NETWORK'
  | 'TIMEOUT'
  | 'PROVIDER'
  | 'EMPTY_RESPONSE';

export class AIServiceError extends Error {
  readonly code: AIServiceErrorCode;

  constructor(message: string, code: AIServiceErrorCode) {
    super(message);
    this.name = 'AIServiceError';
    this.code = code;
  }
}

export class RecommendationServiceError extends Error {
  readonly code: 'PARSE' | 'VALIDATION' | 'GENERATION';

  constructor(message: string, code: 'PARSE' | 'VALIDATION' | 'GENERATION') {
    super(message);
    this.name = 'RecommendationServiceError';
    this.code = code;
  }
}
