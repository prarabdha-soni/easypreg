import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Info } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function CycleHealthScreen() {
  const router = useRouter();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState<string>('');

  const symptoms = [
    { id: 'irregular', label: 'Irregular Periods', emoji: '📅' },
    { id: 'heavy-bleeding', label: 'Heavy Bleeding', emoji: '🩸' },
    { id: 'severe-pms', label: 'Severe PMS', emoji: '😣' },
    { id: 'painful-periods', label: 'Painful Periods', emoji: '💔' },
    { id: 'missed-periods', label: 'Missed Periods', emoji: '❌' },
    { id: 'spotting', label: 'Spotting', emoji: '🔴' },
    { id: 'mood-swings', label: 'Mood Swings', emoji: '🎭' },
    { id: 'bloating', label: 'Bloating', emoji: '🎈' },
  ];

  const severityLevels = [
    { id: 'mild', label: 'Mild', color: '#10B981' },
    { id: 'moderate', label: 'Moderate', color: '#F59E0B' },
    { id: 'severe', label: 'Severe', color: '#EF4444' },
  ];

  const toggleSymptom = (id: string) => {
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };

  const handleSave = () => {
    // Save logic here
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FEFEFE' }}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#1a1a1a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🌸 Cycle Health</Text>
          <Text style={styles.headerSubtitle}>Track your menstrual cycle symptoms</Text>
        </View>

        {/* Hormonal Connection Info */}
        <View style={styles.infoCard}>
          <Info size={20} color="#10B981" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Hormonal Connections</Text>
            <Text style={styles.infoText}>
              Cycle health is driven by the balance of estrogen, progesterone, androgens, thyroid hormones, cortisol, and prolactin.
            </Text>
          </View>
        </View>

        {/* Symptoms Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Your Symptoms</Text>
          <Text style={styles.sectionSubtitle}>Choose all that apply today</Text>

          <View style={styles.symptomGrid}>
            {symptoms.map((symptom) => (
              <TouchableOpacity
                key={symptom.id}
                style={[
                  styles.symptomCard,
                  selectedSymptoms.includes(symptom.id) && styles.symptomCardSelected
                ]}
                onPress={() => toggleSymptom(symptom.id)}
              >
                <Text style={styles.symptomEmoji}>{symptom.emoji}</Text>
                <Text style={styles.symptomLabel}>{symptom.label}</Text>
                {selectedSymptoms.includes(symptom.id) && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Severity Selection */}
        {selectedSymptoms.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overall Severity</Text>
            <View style={styles.severityRow}>
              {severityLevels.map((level) => (
                <TouchableOpacity
                  key={level.id}
                  style={[
                    styles.severityButton,
                    severity === level.id && { backgroundColor: level.color }
                  ]}
                  onPress={() => setSeverity(level.id)}
                >
                  <Text style={[
                    styles.severityText,
                    severity === level.id && styles.severityTextSelected
                  ]}>
                    {level.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Related Hormones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Related Hormones</Text>
          
          <View style={styles.hormoneCard}>
            <Text style={styles.hormoneName}>Estrogen & Progesterone</Text>
            <Text style={styles.hormoneDescription}>
              The balance and rhythm of these hormones drive the menstrual cycle. Imbalances lead to irregularities, heavy bleeding, severe PMS, and PMDD.
            </Text>
          </View>

          <View style={styles.hormoneCard}>
            <Text style={styles.hormoneName}>Androgens</Text>
            <Text style={styles.hormoneDescription}>
              High androgens (e.g., in PCOS) can suppress ovulation, leading to irregular or absent periods.
            </Text>
          </View>

          <View style={styles.hormoneCard}>
            <Text style={styles.hormoneName}>Thyroid Hormones</Text>
            <Text style={styles.hormoneDescription}>
              Thyroid dysfunction is a common cause of cycle irregularities.
            </Text>
          </View>

          <View style={styles.hormoneCard}>
            <Text style={styles.hormoneName}>Cortisol</Text>
            <Text style={styles.hormoneDescription}>
              Chronic stress can disrupt the HPA axis, interfering with ovulation and cycle regularity.
            </Text>
          </View>

          <View style={styles.hormoneCard}>
            <Text style={styles.hormoneName}>Prolactin</Text>
            <Text style={styles.hormoneDescription}>
              High prolactin levels can inhibit ovulation.
            </Text>
          </View>
        </View>

        {/* How to Help */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How Hormonal Control Helps</Text>
          <View style={styles.helpCard}>
            <Text style={styles.helpText}>
              ✓ Restoring natural hormone rhythm{'\n'}
              ✓ Balancing sex hormones{'\n'}
              ✓ Addressing PCOS (insulin & androgens){'\n'}
              ✓ Optimizing thyroid function{'\n'}
              ✓ Managing stress and cortisol{'\n'}
              ✓ Achieving regular, healthier cycles
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.saveButton, selectedSymptoms.length === 0 && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={selectedSymptoms.length === 0}
        >
          <Text style={styles.saveButtonText}>
            Save ({selectedSymptoms.length} {selectedSymptoms.length === 1 ? 'symptom' : 'symptoms'})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#F0FDF4',
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  symptomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  symptomCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#F3F4F6',
    position: 'relative',
  },
  symptomCardSelected: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  symptomEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  symptomLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  severityRow: {
    flexDirection: 'row',
    gap: 12,
  },
  severityButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  severityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  severityTextSelected: {
    color: '#ffffff',
  },
  hormoneCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  hormoneName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  hormoneDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  helpCard: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  helpText: {
    fontSize: 14,
    color: '#166534',
    lineHeight: 24,
  },
  footer: {
    padding: 24,
    paddingBottom: 32,
    backgroundColor: '#FEFEFE',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  saveButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#D1D5DB',
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});

