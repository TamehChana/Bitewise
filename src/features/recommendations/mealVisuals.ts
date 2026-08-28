import { mealAccentColors } from '@/constants/colors';

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getMealAccentColor(seed: string): string {
  const index = hashString(seed) % mealAccentColors.length;
  return mealAccentColors[index];
}

export function getMealVisualEmoji(name: string): string {
  const lower = name.toLowerCase();

  if (lower.includes('salmon') || lower.includes('fish') || lower.includes('seafood')) {
    return '🐟';
  }
  if (lower.includes('chicken') || lower.includes('turkey')) {
    return '🍗';
  }
  if (lower.includes('pasta') || lower.includes('spaghetti')) {
    return '🍝';
  }
  if (lower.includes('curry') || lower.includes('tikka') || lower.includes('masala')) {
    return '🍛';
  }
  if (lower.includes('bowl') || lower.includes('salad') || lower.includes('veggie')) {
    return '🥗';
  }
  if (lower.includes('taco') || lower.includes('wrap')) {
    return '🌮';
  }
  if (lower.includes('rice') || lower.includes('jollof')) {
    return '🍚';
  }

  return '🍽️';
}
