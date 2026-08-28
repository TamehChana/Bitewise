import type {
  Allergy,
  BudgetLevel,
  CookingTime,
  Cuisine,
  DietType,
  FoodGoal,
} from '@/types/preferences';

export type QuestionId =
  | 'diet'
  | 'goal'
  | 'cuisines'
  | 'allergies'
  | 'cookingTime'
  | 'budget';

export type QuestionType = 'single' | 'multi';

export interface QuestionOption<T extends string = string> {
  value: T;
  label: string;
  icon?: string;
}

interface BaseQuestionConfig {
  id: QuestionId;
  title: string;
  subtitle: string;
}

export interface SingleQuestionConfig<T extends string> extends BaseQuestionConfig {
  type: 'single';
  options: QuestionOption<T>[];
}

export interface MultiQuestionConfig<T extends string> extends BaseQuestionConfig {
  type: 'multi';
  options: QuestionOption<T>[];
}

export type QuestionConfig =
  | SingleQuestionConfig<DietType>
  | SingleQuestionConfig<FoodGoal>
  | MultiQuestionConfig<Cuisine>
  | MultiQuestionConfig<Allergy>
  | SingleQuestionConfig<CookingTime>
  | SingleQuestionConfig<BudgetLevel>;

export interface OnboardingDraft {
  diet: DietType | null;
  goal: FoodGoal | null;
  cuisines: Cuisine[];
  allergies: Allergy[];
  cookingTime: CookingTime | null;
  budget: BudgetLevel | null;
}

export const EMPTY_DRAFT: OnboardingDraft = {
  diet: null,
  goal: null,
  cuisines: [],
  allergies: ['none'],
  cookingTime: null,
  budget: null,
};
