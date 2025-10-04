import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { ArrowLeft } from 'lucide-react-native';

export default function PreferencesScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useUser();
  const [language, setLanguage] = useState<'english' | 'hindi' | 'regional'>(profile.language);
  const [foodPreference, setFoodPreference] = useState<'veg' | 'non-veg' | 'vegan' | 'ayurvedic'>(profile.foodPreference);

  const handleComplete = () => {
    updateProfile({
      language,
      foodPreference,
      hasCompletedOnboarding: true,
    });

    router.replace('/(tabs)');
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color="#1a1a1a" />
      </TouchableOpacity>

      <Text style={styles.title}>Personalize your journey</Text>
      <Text style={styles.subtitle}>We'll customize content just for you</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Preferred Language</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.optionButton, language === 'english' && styles.optionButtonActive]}
            onPress={() => setLanguage('english')}
          >
            <Text style={[styles.optionText, language === 'english' && styles.optionTextActive]}>
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, language === 'hindi' && styles.optionButtonActive]}
            onPress={() => setLanguage('hindi')}
          >
            <Text style={[styles.optionText, language === 'hindi' && styles.optionTextActive]}>
              Hindi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, language === 'regional' && styles.optionButtonActive]}
            onPress={() => setLanguage('regional')}
          >
            <Text style={[styles.optionText, language === 'regional' && styles.optionTextActive]}>
              Regional
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Food Preference</Text>
        <View style={styles.gridButtons}>
          <TouchableOpacity
            style={[styles.gridButton, foodPreference === 'veg' && styles.optionButtonActive]}
            onPress={() => setFoodPreference('veg')}
          >
            <Text style={[styles.optionText, foodPreference === 'veg' && styles.optionTextActive]}>
              Veg
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.gridButton, foodPreference === 'non-veg' && styles.optionButtonActive]}
            onPress={() => setFoodPreference('non-veg')}
          >
            <Text style={[styles.optionText, foodPreference === 'non-veg' && styles.optionTextActive]}>
              Non-Veg
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.gridButton, foodPreference === 'vegan' && styles.optionButtonActive]}
            onPress={() => setFoodPreference('vegan')}
          >
            <Text style={[styles.optionText, foodPreference === 'vegan' && styles.optionTextActive]}>
              Vegan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.gridButton, foodPreference === 'ayurvedic' && styles.optionButtonActive]}
            onPress={() => setFoodPreference('ayurvedic')}
          >
            <Text style={[styles.optionText, foodPreference === 'ayurvedic' && styles.optionTextActive]}>
              Ayurvedic
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.privacySection}>
        <Text style={styles.privacyTitle}>Your Privacy Matters</Text>
        <Text style={styles.privacyText}>
          Your data is private, encrypted, and never sold. We only use it to provide you with personalized insights and recommendations.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.completeButton}
        onPress={handleComplete}
      >
        <Text style={styles.completeButtonText}>Complete Setup</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
  },
  backButton: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  gridButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  optionButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  optionButtonActive: {
    borderColor: '#e91e63',
    backgroundColor: '#fff5f7',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  optionTextActive: {
    color: '#e91e63',
  },
  privacySection: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 12,
    marginBottom: 32,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  privacyText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 21,
  },
  completeButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
