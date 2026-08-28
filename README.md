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
Screen → Store / Feature → Services
```

## Current status (Phase 2)

- Polished welcome screen with onboarding redirect on app restart
- Configuration-driven 6-step questionnaire
- Progress bar, back/continue navigation, and choice chips
- Allergy "None" exclusivity logic
- Preferences persisted to Zustand + AsyncStorage on completion
- Recommendations placeholder with preference summary

## License

Private — technical assessment project.
