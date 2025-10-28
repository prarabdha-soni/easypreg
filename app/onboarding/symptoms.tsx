import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Flame, Moon, Heart, Droplets, Wind, Activity, Brain, Zap } from 'lucide-react-native';
import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';

export default function SymptomsScreen() {
  const router = useRouter();
  const { updateProfile } = useUser();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const symptoms = [
    { id: 'hot-flashes', label: 'Hot Flashes', icon: Flame, color: '#EF4444', bg: '#FEF2F2' },
    { id: 'night-sweats', label: 'Night Sweats', icon: Moon, color: '#6366F1', bg: '#EEF2FF' },
    { id: 'mood-changes', label: 'Mood Changes', icon: Heart, color: '#EC4899', bg: '#FDF2F8' },
    { id: 'sleep-issues', label: 'Sleep Issues', icon: Moon, color: '#8B5CF6', bg: '#F5F3FF' },
    { id: 'vaginal-dryness', label: 'Vaginal Dryness', icon: Droplets, color: '#10B981', bg: '#ECFDF5' },
    { id: 'brain-fog', label: 'Brain Fog', icon: Brain, color: '#F59E0B', bg: '#FFFBEB' },
    { id: 'fatigue', label: 'Fatigue', icon: Wind, color: '#6B7280', bg: '#F9FAFB' },
    { id: 'joint-pain', label: 'Joint Pain', icon: Activity, color: '#EF4444', bg: '#FEF2F2' },
  ];

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleContinue = () => {
    updateProfile({ 
      primarySymptoms: selectedSymptoms,
      hasCompletedOnboarding: true
    });
    router.replace('/(tabs)');
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
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '100%' }]} />
        </View>

        <Text style={styles.title}>What symptoms are you experiencing?</Text>
        <Text style={styles.subtitle}>
          Select all that apply. You can always update these later.
        </Text>

        <View style={styles.symptomsGrid}>
          {symptoms.map((symptom) => {
            const IconComponent = symptom.icon;
            const isSelected = selectedSymptoms.includes(symptom.id);

            return (
              <TouchableOpacity
                key={symptom.id}
                style={[
                  styles.symptomCard,
                  isSelected && styles.symptomCardSelected
                ]}
                onPress={() => toggleSymptom(symptom.id)}
              >
                <View style={[styles.symptomIcon, { backgroundColor: symptom.bg }]}>
                  <IconComponent size={24} color={symptom.color} />
                </View>
                <Text style={[
                  styles.symptomLabel,
                  isSelected && styles.symptomLabelSelected
                ]}>
                  {symptom.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity 
          style={styles.skipButton}
          onPress={handleContinue}
        >
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>
            {selectedSymptoms.length > 0 ? 'Complete Setup' : 'Skip & Continue'}
          </Text>
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
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  symptomCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  symptomCardSelected: {
    borderColor: '#EC4899',
    backgroundColor: '#FFF5F7',
  },
  symptomIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  symptomLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
  symptomLabelSelected: {
    color: '#EC4899',
    fontWeight: '600',
  },
  skipButton: {
    alignSelf: 'center',
    marginTop: 24,
    padding: 12,
  },
  skipText: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 20,
  },
  button: {
    backgroundColor: '#EC4899',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

