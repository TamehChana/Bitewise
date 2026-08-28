import type { Allergy, Cuisine } from '@/types/preferences';
import type { UserPreferences } from '@/types/preferences';

import type { OnboardingDraft, QuestionId } from './onboarding.types';

export function preferencesToDraft(preferences: UserPreferences): OnboardingDraft {
  return {
    diet: preferences.diet,
    goal: preferences.goal,
    cuisines: [...preferences.cuisines],
    allergies: [...preferences.allergies],
    cookingTime: preferences.cookingTime,
    budget: preferences.budget,
  };
}

export function isStepValid(draft: OnboardingDraft, questionId: QuestionId): boolean {
  switch (questionId) {
    case 'diet':
      return draft.diet !== null;
    case 'goal':
      return draft.goal !== null;
    case 'cuisines':
      return draft.cuisines.length > 0;
    case 'allergies':
      return draft.allergies.length > 0;
    case 'cookingTime':
      return draft.cookingTime !== null;
    case 'budget':
      return draft.budget !== null;
    default:
      return false;
  }
}

export function buildUserPreferences(draft: OnboardingDraft): UserPreferences {
  if (
    !draft.diet ||
    !draft.goal ||
    draft.cuisines.length === 0 ||
    draft.allergies.length === 0 ||
    !draft.cookingTime ||
    !draft.budget
  ) {
    throw new Error('Cannot build preferences from an incomplete onboarding draft.');
  }

  return {
    diet: draft.diet,
    goal: draft.goal,
    cuisines: draft.cuisines,
    allergies: draft.allergies,
    cookingTime: draft.cookingTime,
    budget: draft.budget,
  };
}

export function toggleCuisineSelection(current: Cuisine[], cuisine: Cuisine): Cuisine[] {
  if (current.includes(cuisine)) {
    return current.filter((item) => item !== cuisine);
  }
  return [...current, cuisine];
}

export function toggleAllergySelection(current: Allergy[], allergy: Allergy): Allergy[] {
  if (allergy === 'none') {
    return ['none'];
  }

  const withoutNone = current.filter((item) => item !== 'none');

  if (withoutNone.includes(allergy)) {
    const next = withoutNone.filter((item) => item !== allergy);
    return next.length === 0 ? ['none'] : next;
  }

  return [...withoutNone, allergy];
}

export function isOptionSelected(
  draft: OnboardingDraft,
  questionId: QuestionId,
  value: string,
): boolean {
  switch (questionId) {
    case 'diet':
      return draft.diet === value;
    case 'goal':
      return draft.goal === value;
    case 'cuisines':
      return draft.cuisines.includes(value as Cuisine);
    case 'allergies':
      return draft.allergies.includes(value as Allergy);
    case 'cookingTime':
      return draft.cookingTime === value;
    case 'budget':
      return draft.budget === value;
    default:
      return false;
  }
}
