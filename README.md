# BiteWise

AI-powered food suggestion app built with React Native, Expo, and TypeScript.

## Tech stack

- **React Native** + **Expo** (SDK 57)
- **Expo Router** for file-based navigation
- **TypeScript** with strict mode
- **Zustand** for state management
- **AsyncStorage** for local persistence
- **Lucide React Native** for icons

## Getting started

```bash
npm install
npx expo start
```

Press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with Expo Go.

## Project structure

```
src/
├── app/              # Expo Router screens
├── components/       # Reusable UI components
├── features/         # Feature-specific logic
├── services/         # Storage and future AI services
├── store/            # Zustand store
├── constants/        # Design tokens
├── types/            # Domain TypeScript types
└── utils/            # Shared utilities
```

## Architecture

```
Screen → Feature hook/service → AI / Storage services
```

Recommendations flow:

```
Recommendations Screen → useRecommendations → recommendation.service → ai.service
```

## AI integration (Phase 3)

BiteWise generates meal suggestions using the **Groq** API (OpenAI-compatible chat completions).

### Environment variables

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Required:

- `EXPO_PUBLIC_AI_API_KEY` — your Groq API key
- `EXPO_PUBLIC_AI_MODEL` — defaults to `llama-3.3-70b-versatile`

Restart Expo after changing env vars (`npx expo start -c`).

### How recommendations are generated

1. User completes onboarding → preferences stored in Zustand + AsyncStorage.
2. Recommendations screen calls `generateRecommendations(preferences)`.
3. A structured prompt is built from the user's diet, goal, cuisines, allergies, cooking time, and budget.
4. `ai.service.ts` sends the prompt to Groq via `fetch` (provider isolated from UI).
5. Raw model output is parsed (`parse-ai-response.ts`) and validated with Zod.
6. Exactly 3 `MealRecommendation` items are stored and rendered.
7. If AI fails, a small local fallback set is used when possible; otherwise the user can retry.

### Security note

The current **client-side API key** approach is acceptable for this assessment/demo, but **production apps should proxy AI requests through a secure backend** so private credentials are never embedded in the mobile bundle.

## Current status (Phase 4)

- Polished welcome screen with layered food hero visual
- Refined onboarding cards, animated progress bar, and step indicator
- Premium meal recommendation cards with metadata icons and visual accents
- Polished AI loading and error states
- Meal detail screen with hero, metadata grid, and ingredient list
- Shared UI system: AppButton (primary/secondary/ghost), Badge, ScreenHeader, AppSplash
- Hydration splash to prevent route flicker on app restart

## License

Private — technical assessment project.
