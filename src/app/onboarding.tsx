import { ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AppButton } from '@/components/ui/AppButton';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { colors, fontSize, spacing } from '@/constants/theme';
import { ChoiceChip } from '@/features/onboarding/components/ChoiceChip';
import { ProgressBar } from '@/features/onboarding/components/ProgressBar';
import { QuestionHeader } from '@/features/onboarding/components/QuestionHeader';
import {
  buildUserPreferences,
  isOptionSelected,
  isStepValid,
  toggleAllergySelection,
  toggleCuisineSelection,
} from '@/features/onboarding/onboarding.utils';
import {
  EMPTY_DRAFT,
  type OnboardingDraft,
  type QuestionId,
} from '@/features/onboarding/onboarding.types';
import {
  ONBOARDING_QUESTIONS,
  TOTAL_QUESTIONS,
} from '@/features/onboarding/questions';
import {
  saveOnboardingCompleted,
  savePreferences,
} from '@/services/storage.service';
import { useAppStore } from '@/store/useAppStore';
import type { Allergy, Cuisine } from '@/types/preferences';

export default function OnboardingScreen() {
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);

  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState<OnboardingDraft>(EMPTY_DRAFT);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = ONBOARDING_QUESTIONS[stepIndex];
  const isLastStep = stepIndex === TOTAL_QUESTIONS - 1;
  const canContinue = isStepValid(draft, currentQuestion.id);

  const handleBack = useCallback(() => {
    if (stepIndex === 0) {
      router.back();
      return;
    }
    setStepIndex((prev) => prev - 1);
  }, [stepIndex]);

  const handleSingleSelect = useCallback((questionId: QuestionId, value: string) => {
    setDraft((prev) => {
      switch (questionId) {
        case 'diet':
          return { ...prev, diet: value as OnboardingDraft['diet'] };
        case 'goal':
          return { ...prev, goal: value as OnboardingDraft['goal'] };
        case 'cookingTime':
          return { ...prev, cookingTime: value as OnboardingDraft['cookingTime'] };
        case 'budget':
          return { ...prev, budget: value as OnboardingDraft['budget'] };
        default:
          return prev;
      }
    });
  }, []);

  const handleMultiSelect = useCallback((questionId: QuestionId, value: string) => {
    setDraft((prev) => {
      if (questionId === 'cuisines') {
        return {
          ...prev,
          cuisines: toggleCuisineSelection(prev.cuisines, value as Cuisine),
        };
      }
      if (questionId === 'allergies') {
        return {
          ...prev,
          allergies: toggleAllergySelection(prev.allergies, value as Allergy),
        };
      }
      return prev;
    });
  }, []);

  const handleContinue = useCallback(async () => {
    if (!canContinue || isSubmitting) {
      return;
    }

    if (!isLastStep) {
      setStepIndex((prev) => prev + 1);
      return;
    }

    setIsSubmitting(true);

    try {
      const preferences = buildUserPreferences(draft);
      completeOnboarding(preferences);
      await savePreferences(preferences);
      await saveOnboardingCompleted(true);
      router.replace('/recommendations');
    } catch {
      setIsSubmitting(false);
    }
  }, [canContinue, completeOnboarding, draft, isLastStep, isSubmitting]);

  const handleOptionPress = useCallback(
    (value: string) => {
      if (currentQuestion.type === 'single') {
        handleSingleSelect(currentQuestion.id, value);
        return;
      }
      handleMultiSelect(currentQuestion.id, value);
    },
    [currentQuestion, handleMultiSelect, handleSingleSelect],
  );

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={12}
          onPress={handleBack}
          style={styles.backButton}
        >
          <ChevronLeft color={colors.text} size={24} />
          <Text style={styles.backLabel}>Back</Text>
        </Pressable>

        <ProgressBar currentStep={stepIndex + 1} totalSteps={TOTAL_QUESTIONS} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <QuestionHeader
          step={stepIndex + 1}
          totalSteps={TOTAL_QUESTIONS}
          subtitle={currentQuestion.subtitle}
          title={currentQuestion.title}
        />

        <View style={styles.options}>
          {currentQuestion.options.map((option) => (
            <ChoiceChip
              key={option.value}
              icon={option.icon}
              label={option.label}
              selected={isOptionSelected(draft, currentQuestion.id, option.value)}
              onPress={() => handleOptionPress(option.value)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <AppButton
          disabled={!canContinue}
          label={isLastStep ? 'Create My Recommendations' : 'Continue'}
          loading={isSubmitting}
          onPress={handleContinue}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs,
    minHeight: 44,
    paddingRight: spacing.sm,
  },
  backLabel: {
    fontSize: fontSize.md,
    fontWeight: '500',
    color: colors.text,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.lg,
  },
  options: {
    gap: spacing.sm + 4,
  },
  footer: {
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
});
