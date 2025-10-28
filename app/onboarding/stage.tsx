import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Flame, Moon, CheckCircle2 } from 'lucide-react-native';
import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';

export default function StageScreen() {
  const router = useRouter();
  const { updateProfile } = useUser();
  const [selectedStage, setSelectedStage] = useState<'perimenopause' | 'menopause' | 'postmenopause' | null>(null);

  const stages = [
    {
      id: 'perimenopause' as const,
      title: 'Perimenopause',
      description: 'Irregular periods, starting to experience symptoms',
      icon: Flame,
      color: '#F59E0B',
      bg: '#FFFBEB',
    },
    {
      id: 'menopause' as const,
      title: 'Menopause',
      description: 'No period for 12+ months, symptoms may be intense',
      icon: Moon,
      color: '#EC4899',
      bg: '#FFF5F7',
    },
    {
      id: 'postmenopause' as const,
      title: 'Postmenopause',
      description: 'Years after last period, managing long-term changes',
      icon: CheckCircle2,
      color: '#8B5CF6',
      bg: '#F5F3FF',
    },
  ];

  const handleContinue = () => {
    if (selectedStage) {
      updateProfile({ menopauseStage: selectedStage });
      router.push('/onboarding/symptoms');
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
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '40%' }]} />
        </View>

        <Text style={styles.title}>Where are you in your journey?</Text>
        <Text style={styles.subtitle}>
          Choose the stage that best describes you
        </Text>

        <View style={styles.stagesContainer}>
          {stages.map((stage) => {
            const IconComponent = stage.icon;
            const isSelected = selectedStage === stage.id;

            return (
              <TouchableOpacity
                key={stage.id}
                style={[
                  styles.stageCard,
                  isSelected && styles.stageCardSelected
                ]}
                onPress={() => setSelectedStage(stage.id)}
              >
                <View style={[styles.stageIcon, { backgroundColor: stage.bg }]}>
                  <IconComponent size={28} color={stage.color} />
                </View>
                <View style={styles.stageContent}>
                  <Text style={styles.stageTitle}>{stage.title}</Text>
                  <Text style={styles.stageDescription}>{stage.description}</Text>
                </View>
                {isSelected && (
                  <CheckCircle2 size={24} color="#EC4899" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.button,
            !selectedStage && styles.buttonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selectedStage}
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
  stagesContainer: {
    gap: 16,
  },
  stageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    gap: 16,
  },
  stageCardSelected: {
    borderColor: '#EC4899',
    backgroundColor: '#FFF5F7',
  },
  stageIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageContent: {
    flex: 1,
  },
  stageTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  stageDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
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
  buttonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

