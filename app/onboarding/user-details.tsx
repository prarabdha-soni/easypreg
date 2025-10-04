import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { ArrowLeft } from 'lucide-react-native';

export default function UserDetailsScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useUser();
  const [gender, setGender] = useState<'woman' | 'man' | 'couple' | null>(profile.gender);
  const [age, setAge] = useState(profile.age?.toString() || '');
  const [trying, setTrying] = useState(profile.tryingToConceive);
  const [planning, setPlanning] = useState(profile.planningSoon);

  const handleNext = () => {
    if (!gender || !age) return;

    updateProfile({
      gender,
      age: parseInt(age),
      tryingToConceive: trying,
      planningSoon: planning,
    });

    if (gender === 'woman' || gender === 'couple') {
      router.push('/onboarding/cycle-setup');
    } else {
      router.push('/onboarding/preferences');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color="#1a1a1a" />
      </TouchableOpacity>

      <Text style={styles.title}>Tell us about yourself</Text>
      <Text style={styles.subtitle}>This helps us personalize your experience</Text>

      <View style={styles.section}>
        <Text style={styles.label}>I am</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.optionButton, gender === 'woman' && styles.optionButtonActive]}
            onPress={() => setGender('woman')}
          >
            <Text style={[styles.optionText, gender === 'woman' && styles.optionTextActive]}>
              Woman
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, gender === 'man' && styles.optionButtonActive]}
            onPress={() => setGender('man')}
          >
            <Text style={[styles.optionText, gender === 'man' && styles.optionTextActive]}>
              Man
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.optionButton, styles.fullWidth, gender === 'couple' && styles.optionButtonActive]}
          onPress={() => setGender('couple')}
        >
          <Text style={[styles.optionText, gender === 'couple' && styles.optionTextActive]}>
            Couple Mode
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          keyboardType="number-pad"
          placeholder="Enter your age"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Trying to conceive?</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.optionButton, trying && styles.optionButtonActive]}
            onPress={() => { setTrying(true); setPlanning(false); }}
          >
            <Text style={[styles.optionText, trying && styles.optionTextActive]}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, planning && styles.optionButtonActive]}
            onPress={() => { setTrying(false); setPlanning(true); }}
          >
            <Text style={[styles.optionText, planning && styles.optionTextActive]}>
              Planning soon
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.nextButton, (!gender || !age) && styles.nextButtonDisabled]}
        onPress={handleNext}
        disabled={!gender || !age}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
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
  fullWidth: {
    marginTop: 12,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#1a1a1a',
  },
  nextButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
