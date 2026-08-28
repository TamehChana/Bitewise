export type MealDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface MealRecommendation {
  id: string;
  name: string;
  description: string;
  reason: string;
  prepTime: number;
  difficulty: MealDifficulty;
  calories: number;
  protein: number;
  ingredients: string[];
}
