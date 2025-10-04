import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react-native';

export default function LogPartnerScreen() {
  const router = useRouter();
  const [alcohol, setAlcohol] = useState(false);
  const [smoking, setSmoking] = useState(false);
  const [sleepHours, setSleepHours] = useState('');
  const [exercise, setExercise] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={24} color="#1a1a1a" />
      </TouchableOpacity>

      <Text style={styles.title}>Partner Log</Text>
      <Text style={styles.subtitle}>Track partner's health routine</Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          Male fertility is equally important! Track lifestyle factors that impact sperm health.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Alcohol Consumption</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.optionButton, !alcohol && styles.optionButtonActive]}
            onPress={() => setAlcohol(false)}
          >
            <Text style={[styles.optionText, !alcohol && styles.optionTextActive]}>
              None
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, alcohol && styles.optionButtonActive]}
            onPress={() => setAlcohol(true)}
          >
            <Text style={[styles.optionText, alcohol && styles.optionTextActive]}>
              Yes
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Smoking</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.optionButton, !smoking && styles.optionButtonActive]}
            onPress={() => setSmoking(false)}
          >
            <Text style={[styles.optionText, !smoking && styles.optionTextActive]}>
              No
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, smoking && styles.optionButtonActive]}
            onPress={() => setSmoking(true)}
          >
            <Text style={[styles.optionText, smoking && styles.optionTextActive]}>
              Yes
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Sleep Duration (hours)</Text>
        <TextInput
          style={styles.input}
          value={sleepHours}
          onChangeText={setSleepHours}
          keyboardType="decimal-pad"
          placeholder="7.5"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Exercise Duration (minutes)</Text>
        <TextInput
          style={styles.input}
          value={exercise}
          onChangeText={setExercise}
          keyboardType="number-pad"
          placeholder="30"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Additional Notes</Text>
        <TextInput
          style={styles.textArea}
          value={notes}
          onChangeText={setNotes}
          placeholder="Diet, stress levels, medications..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Tips for Male Fertility</Text>
        <Text style={styles.tip}>✓ Maintain healthy weight</Text>
        <Text style={styles.tip}>✓ Avoid excessive heat exposure</Text>
        <Text style={styles.tip}>✓ Eat zinc and folate-rich foods</Text>
        <Text style={styles.tip}>✓ Manage stress levels</Text>
        <Text style={styles.tip}>✓ Exercise regularly but moderately</Text>
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Save Partner Log</Text>
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
    marginBottom: 24,
  },
  infoCard: {
    padding: 16,
    backgroundColor: '#f3f9ff',
    borderRadius: 12,
    marginBottom: 32,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 21,
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
    borderColor: '#2196f3',
    backgroundColor: '#f3f9ff',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  optionTextActive: {
    color: '#2196f3',
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
  tipsCard: {
    padding: 20,
    backgroundColor: '#f1f8f4',
    borderRadius: 16,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  tip: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 21,
  },
  saveButton: {
    backgroundColor: '#2196f3',
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
