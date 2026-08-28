import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, shadow, spacing } from '@/constants/theme';

const ORBIT_EMOJIS = [
  { emoji: '🥗', style: 'orbitTop' },
  { emoji: '🍝', style: 'orbitRight' },
  { emoji: '🌮', style: 'orbitBottom' },
  { emoji: '🍣', style: 'orbitLeft' },
] as const;

export function FoodHeroVisual() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.glow} />
      <View style={styles.ringOuter} />
      <View style={styles.ringInner} />
      <View style={styles.plate}>
        <Text style={styles.plateEmoji}>🥘</Text>
      </View>
      {ORBIT_EMOJIS.map((item) => (
        <View key={item.emoji} style={[styles.orbitBubble, styles[item.style]]}>
          <Text style={styles.orbitEmoji}>{item.emoji}</Text>
        </View>
      ))}
    </View>
  );
}

const BUBBLE_SIZE = 44;
const PLATE_SIZE = 112;

const styles = StyleSheet.create({
  wrapper: {
    width: 240,
    height: 240,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.primaryMuted,
    opacity: 0.55,
  },
  ringOuter: {
    position: 'absolute',
    width: 196,
    height: 196,
    borderRadius: 98,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.overlay,
  },
  ringInner: {
    position: 'absolute',
    width: 156,
    height: 156,
    borderRadius: 78,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    opacity: 0.72,
  },
  plate: {
    width: PLATE_SIZE,
    height: PLATE_SIZE,
    borderRadius: PLATE_SIZE / 2,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  plateEmoji: {
    fontSize: 46,
  },
  orbitBubble: {
    position: 'absolute',
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: BUBBLE_SIZE / 2,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
  orbitEmoji: {
    fontSize: 20,
  },
  orbitTop: {
    top: 8,
  },
  orbitRight: {
    right: 16,
  },
  orbitBottom: {
    bottom: 10,
  },
  orbitLeft: {
    left: 14,
  },
});
