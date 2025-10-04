import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { ArrowLeft, Calendar } from 'lucide-react-native';

export default function CycleSetupScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useUser();
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [cycleLength, setCycleLength] = useState(profile.cycleLength.toString());
  const [isRegular, setIsRegular] = useState(profile.isRegular);

  const handleNext = () => {
    if (!lastPeriodDate || !cycleLength) return;

    const [day, month, year] = lastPeriodDate.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    updateProfile({
      lastPeriodDate: date,
      cycleLength: parseInt(cycleLength),
      isRegular,
    });

    router.push('/onboarding/preferences');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color="#1a1a1a" />
      </TouchableOpacity>

      <Text style={styles.title}>Cycle Information</Text>
      <Text style={styles.subtitle}>Help us track your fertile window</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Last period start date</Text>
        <View style={styles.dateInputContainer}>
          <Calendar size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={lastPeriodDate}
            onChangeText={setLastPeriodDate}
            placeholder="DD-MM-YYYY"
            placeholderTextColor="#999"
          />
        </View>
        <Text style={styles.hint}>Example: 01-01-2025</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Average cycle length</Text>
        <TextInput
          style={styles.input}
          value={cycleLength}
          onChangeText={setCycleLength}
          keyboardType="number-pad"
          placeholder="28"
          placeholderTextColor="#999"
        />
        <Text style={styles.hint}>Most women have 28-day cycles</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Is your cycle regular?</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.optionButton, isRegular && styles.optionButtonActive]}
            onPress={() => setIsRegular(true)}
          >
            <Text style={[styles.optionText, isRegular && styles.optionTextActive]}>
              Regular
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, !isRegular && styles.optionButtonActive]}
            onPress={() => setIsRegular(false)}
          >
            <Text style={[styles.optionText, !isRegular && styles.optionTextActive]}>
              Irregular
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.nextButton, (!lastPeriodDate || !cycleLength) && styles.nextButtonDisabled]}
        onPress={handleNext}
        disabled={!lastPeriodDate || !cycleLength}
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
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1a1a1a',
  },
  hint: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
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
