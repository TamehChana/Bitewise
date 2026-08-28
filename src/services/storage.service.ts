import AsyncStorage from '@react-native-async-storage/async-storage';

import type { MealRecommendation } from '@/types/recommendation';
import type { UserPreferences } from '@/types/preferences';
import { safeJsonParse } from '@/utils/json';

const STORAGE_KEYS = {
  preferences: '@bitewise/preferences',
  onboardingCompleted: '@bitewise/onboarding_completed',
  recommendations: '@bitewise/recommendations',
} as const;

async function readItem<T>(key: string): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) {
      return null;
    }
    return safeJsonParse<T>(value);
  } catch {
    return null;
  }
}

async function writeItem<T>(key: string, value: T): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export async function savePreferences(preferences: UserPreferences): Promise<boolean> {
  return writeItem(STORAGE_KEYS.preferences, preferences);
}

export async function getPreferences(): Promise<UserPreferences | null> {
  return readItem<UserPreferences>(STORAGE_KEYS.preferences);
}

export async function saveOnboardingCompleted(completed: boolean): Promise<boolean> {
  return writeItem(STORAGE_KEYS.onboardingCompleted, completed);
}

export async function getOnboardingCompleted(): Promise<boolean> {
  const value = await readItem<boolean>(STORAGE_KEYS.onboardingCompleted);
  return value ?? false;
}

export async function saveRecommendations(
  recommendations: MealRecommendation[],
): Promise<boolean> {
  return writeItem(STORAGE_KEYS.recommendations, recommendations);
}

export async function getRecommendations(): Promise<MealRecommendation[] | null> {
  return readItem<MealRecommendation[]>(STORAGE_KEYS.recommendations);
}

export async function clearRecommendations(): Promise<boolean> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.recommendations);
    return true;
  } catch {
    return false;
  }
}

export async function clearAppStorage(): Promise<boolean> {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    return true;
  } catch {
    return false;
  }
}
