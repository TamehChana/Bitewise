import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { MealRecommendation } from '@/types/recommendation';
import type { UserPreferences } from '@/types/preferences';

interface AppState {
  userPreferences: UserPreferences | null;
  onboardingCompleted: boolean;
  recommendations: MealRecommendation[] | null;
  setPreferences: (preferences: UserPreferences) => void;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  completeOnboarding: (preferences: UserPreferences) => void;
  setRecommendations: (recommendations: MealRecommendation[]) => void;
  clearRecommendations: () => void;
  resetOnboarding: () => void;
  resetApp: () => void;
}

const initialState = {
  userPreferences: null,
  onboardingCompleted: false,
  recommendations: null,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setPreferences: (preferences) => set({ userPreferences: preferences }),

      updatePreferences: (updates) => {
        const current = get().userPreferences;
        if (!current) {
          return;
        }
        set({ userPreferences: { ...current, ...updates } });
      },

      completeOnboarding: (preferences) =>
        set({
          onboardingCompleted: true,
          userPreferences: preferences,
          recommendations: null,
        }),

      setRecommendations: (recommendations) => set({ recommendations }),

      clearRecommendations: () => set({ recommendations: null }),

      resetOnboarding: () =>
        set({
          onboardingCompleted: false,
          userPreferences: null,
          recommendations: null,
        }),

      resetApp: () => set(initialState),
    }),
    {
      name: 'bitewise-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        userPreferences: state.userPreferences,
        onboardingCompleted: state.onboardingCompleted,
        recommendations: state.recommendations,
      }),
    },
  ),
);
