import type { QuestionConfig } from './onboarding.types';

export const ONBOARDING_QUESTIONS: QuestionConfig[] = [
  {
    id: 'diet',
    title: 'How do you like to eat?',
    subtitle: 'Choose the option that best matches your usual diet.',
    type: 'single',
    options: [
      { value: 'anything', label: 'Anything', icon: '🍽️' },
      { value: 'vegetarian', label: 'Vegetarian', icon: '🥗' },
      { value: 'vegan', label: 'Vegan', icon: '🌱' },
      { value: 'pescatarian', label: 'Pescatarian', icon: '🐟' },
      { value: 'halal', label: 'Halal', icon: '☪️' },
    ],
  },
  {
    id: 'goal',
    title: 'What matters most to you?',
    subtitle: "We'll use this to prioritize meals that fit your goals.",
    type: 'single',
    options: [
      { value: 'healthier', label: 'Eat healthier', icon: '💚' },
      { value: 'high_protein', label: 'High protein', icon: '💪' },
      { value: 'lose_weight', label: 'Lose weight', icon: '⚖️' },
      { value: 'gain_weight', label: 'Gain weight', icon: '📈' },
      { value: 'enjoy', label: 'Just enjoy good food', icon: '✨' },
    ],
  },
  {
    id: 'cuisines',
    title: 'What flavors do you love?',
    subtitle: 'Pick as many as you like.',
    type: 'multi',
    options: [
      { value: 'african', label: 'African', icon: '🌍' },
      { value: 'italian', label: 'Italian', icon: '🍝' },
      { value: 'asian', label: 'Asian', icon: '🥢' },
      { value: 'mediterranean', label: 'Mediterranean', icon: '🫒' },
      { value: 'american', label: 'American', icon: '🍔' },
      { value: 'indian', label: 'Indian', icon: '🍛' },
    ],
  },
  {
    id: 'allergies',
    title: 'Anything we should avoid?',
    subtitle: 'Select any allergies or foods you want excluded.',
    type: 'multi',
    options: [
      { value: 'none', label: 'None', icon: '✅' },
      { value: 'peanuts', label: 'Peanuts', icon: '🥜' },
      { value: 'dairy', label: 'Dairy', icon: '🥛' },
      { value: 'eggs', label: 'Eggs', icon: '🥚' },
      { value: 'seafood', label: 'Seafood', icon: '🦐' },
      { value: 'gluten', label: 'Gluten', icon: '🌾' },
    ],
  },
  {
    id: 'cookingTime',
    title: 'How much time do you usually have?',
    subtitle: "We'll keep recommendations realistic for your schedule.",
    type: 'single',
    options: [
      { value: 'under_15', label: 'Under 15 minutes', icon: '⚡' },
      { value: '15_30', label: '15–30 minutes', icon: '⏱️' },
      { value: '30_60', label: '30–60 minutes', icon: '🍳' },
      { value: 'no_preference', label: 'No preference', icon: '🕐' },
    ],
  },
  {
    id: 'budget',
    title: 'What kind of budget should we plan around?',
    subtitle: 'This helps us keep ingredient choices practical.',
    type: 'single',
    options: [
      { value: 'budget', label: 'Budget friendly', icon: '💰' },
      { value: 'moderate', label: 'Moderate', icon: '💳' },
      { value: 'flexible', label: 'Flexible', icon: '💎' },
    ],
  },
];

export const TOTAL_QUESTIONS = ONBOARDING_QUESTIONS.length;
