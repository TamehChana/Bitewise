export type DietType =
  | 'anything'
  | 'vegetarian'
  | 'vegan'
  | 'pescatarian'
  | 'halal';

export type FoodGoal =
  | 'healthier'
  | 'high_protein'
  | 'lose_weight'
  | 'gain_weight'
  | 'enjoy';

export type Cuisine =
  | 'african'
  | 'italian'
  | 'asian'
  | 'mediterranean'
  | 'american'
  | 'indian';

export type Allergy = 'none' | 'peanuts' | 'dairy' | 'eggs' | 'seafood' | 'gluten';

export type CookingTime = 'under_15' | '15_30' | '30_60' | 'no_preference';

export type BudgetLevel = 'budget' | 'moderate' | 'flexible';

export interface UserPreferences {
  diet: DietType;
  goal: FoodGoal;
  cuisines: Cuisine[];
  allergies: Allergy[];
  cookingTime: CookingTime;
  budget: BudgetLevel;
}
