import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Moon, Activity } from 'lucide-react-native';
import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';

export default function ConditionScreen() {
  const router = useRouter();
  const { updateProfile } = useUser();
  const [selected, setSelected] = useState<'menopause' | 'pcos' | 'pcod' | null>(null);

  const conditions = [
    { 
      id: 'menopause' as const, 
      title: 'Menopause / Perimenopause', 
      description: 'Hot flashes, irregular periods, mood changes',
      icon: Moon,
      color: '#8B5A8F',
      bg: '#F3E8F3',
    },
    { 
      id: 'pcos' as const, 
      title: 'PCOS (Polycystic Ovary Syndrome)', 
      description: 'Irregular periods, weight gain, acne, hair growth',
      icon: Activity,
      color: '#EC4899',
      bg: '#FDF2F8',
    },
    { 
      id: 'pcod' as const, 
      title: 'PCOD (Polycystic Ovarian Disease)', 
      description: 'Hormonal imbalance, irregular cycles, weight issues',
      icon: Activity,
      color: '#F59E0B',
      bg: '#FFFBEB',
    },
  ];

  const handleContinue = () => {
    if (selected) {
      updateProfile({ healthCondition: selected });
      
      if (selected === 'menopause') {
        router.push('/onboarding/stage');
      } else {
        // For PCOS/PCOD, skip menopause stage selection
        router.push('/onboarding/symptoms');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '40%' }]} />
        </View>

        <Text style={styles.title}>What brings you here?</Text>
        <Text style={styles.subtitle}>
          Select the condition you'd like support with
        </Text>

        <View style={styles.optionsContainer}>
          {conditions.map((condition) => {
            const IconComponent = condition.icon;
            return (
              <TouchableOpacity
                key={condition.id}
                style={[
                  styles.optionCard,
                  selected === condition.id && styles.optionCardSelected,
                  selected === condition.id && { borderColor: condition.color },
                ]}
                onPress={() => setSelected(condition.id)}
              >
                <View style={[styles.iconContainer, { backgroundColor: condition.bg }]}>
                  <IconComponent size={32} color={condition.color} />
                </View>
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>{condition.title}</Text>
                  <Text style={styles.optionDescription}>{condition.description}</Text>
                </View>
                {selected === condition.id && (
                  <View style={[styles.checkmark, { backgroundColor: condition.color }]}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.button,
            !selected && styles.buttonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selected}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 32,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#EC4899',
    borderRadius: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  optionCardSelected: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  optionDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  button: {
    backgroundColor: '#EC4899',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

