import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react-native';

export default function LogPeriodScreen() {
  const router = useRouter();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [flow, setFlow] = useState<'light' | 'medium' | 'heavy' | null>(null);

  const handleSave = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color="#1a1a1a" />
      </TouchableOpacity>

      <Text style={styles.title}>Log Period</Text>
      <Text style={styles.subtitle}>Track your menstrual cycle</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Start Date</Text>
        <View style={styles.dateInputContainer}>
          <Calendar size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={startDate}
            onChangeText={setStartDate}
            placeholder="DD-MM-YYYY"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>End Date (Optional)</Text>
        <View style={styles.dateInputContainer}>
          <Calendar size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={endDate}
            onChangeText={setEndDate}
            placeholder="DD-MM-YYYY"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Flow Intensity</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.optionButton, flow === 'light' && styles.optionButtonActive]}
            onPress={() => setFlow('light')}
          >
            <Text style={[styles.optionText, flow === 'light' && styles.optionTextActive]}>
              Light
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, flow === 'medium' && styles.optionButtonActive]}
            onPress={() => setFlow('medium')}
          >
            <Text style={[styles.optionText, flow === 'medium' && styles.optionTextActive]}>
              Medium
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, flow === 'heavy' && styles.optionButtonActive]}
            onPress={() => setFlow('heavy')}
          >
            <Text style={[styles.optionText, flow === 'heavy' && styles.optionTextActive]}>
              Heavy
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.saveButton, !startDate && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={!startDate}
      >
        <Text style={styles.saveButtonText}>Save Period Log</Text>
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
    marginTop: 40,
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
  saveButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
