import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react-native';

export default function LogSymptomsScreen() {
  const router = useRouter();
  const [mood, setMood] = useState<string | null>(null);
  const [energy, setEnergy] = useState<number | null>(null);
  const [cramps, setCramps] = useState<number | null>(null);
  const [discharge, setDischarge] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  const moods = ['Happy', 'Anxious', 'Irritable', 'Calm', 'Sad', 'Energetic'];
  const dischargeTypes = ['None', 'Dry', 'Sticky', 'Creamy', 'Watery', 'Egg White'];

  const handleSave = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color="#1a1a1a" />
      </TouchableOpacity>

      <Text style={styles.title}>Log Symptoms</Text>
      <Text style={styles.subtitle}>Track how you're feeling today</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Mood</Text>
        <View style={styles.gridButtons}>
          {moods.map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.gridButton, mood === m && styles.optionButtonActive]}
              onPress={() => setMood(m)}
            >
              <Text style={[styles.optionText, mood === m && styles.optionTextActive]}>
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Energy Level</Text>
        <View style={styles.scaleContainer}>
          {[1, 2, 3, 4, 5].map((level) => (
            <TouchableOpacity
              key={level}
              style={[styles.scaleButton, energy === level && styles.scaleButtonActive]}
              onPress={() => setEnergy(level)}
            >
              <Text style={[styles.scaleText, energy === level && styles.scaleTextActive]}>
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.scaleLabels}>
          <Text style={styles.scaleLabel}>Low</Text>
          <Text style={styles.scaleLabel}>High</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Cramps Intensity</Text>
        <View style={styles.scaleContainer}>
          {[0, 1, 2, 3, 4, 5].map((level) => (
            <TouchableOpacity
              key={level}
              style={[styles.scaleButton, cramps === level && styles.scaleButtonActive]}
              onPress={() => setCramps(level)}
            >
              <Text style={[styles.scaleText, cramps === level && styles.scaleTextActive]}>
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.scaleLabels}>
          <Text style={styles.scaleLabel}>None</Text>
          <Text style={styles.scaleLabel}>Severe</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Cervical Discharge</Text>
        <View style={styles.gridButtons}>
          {dischargeTypes.map((d) => (
            <TouchableOpacity
              key={d}
              style={[styles.gridButton, discharge === d && styles.optionButtonActive]}
              onPress={() => setDischarge(d)}
            >
              <Text style={[styles.optionText, discharge === d && styles.optionTextActive]}>
                {d}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Additional Notes</Text>
        <TextInput
          style={styles.textArea}
          value={notes}
          onChangeText={setNotes}
          placeholder="Any other symptoms or notes..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Save Symptoms</Text>
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
  gridButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    minWidth: '30%',
    alignItems: 'center',
  },
  optionButtonActive: {
    borderColor: '#e91e63',
    backgroundColor: '#fff5f7',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  optionTextActive: {
    color: '#e91e63',
  },
  scaleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  scaleButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  scaleButtonActive: {
    borderColor: '#e91e63',
    backgroundColor: '#fff5f7',
  },
  scaleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  scaleTextActive: {
    color: '#e91e63',
  },
  scaleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scaleLabel: {
    fontSize: 12,
    color: '#999',
  },
  textArea: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1a1a1a',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
