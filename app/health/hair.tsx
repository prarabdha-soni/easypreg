import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Info } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function HairHealthScreen() {
  const router = useRouter();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const symptoms = [
    { id: 'thinning', label: 'Hair Thinning', emoji: '💆‍♀️' },
    { id: 'loss', label: 'Hair Loss/Shedding', emoji: '🪮' },
    { id: 'breakage', label: 'Breakage', emoji: '✂️' },
    { id: 'excessive-growth', label: 'Excessive Growth (Hirsutism)', emoji: '🧔‍♀️' },
    { id: 'texture-change', label: 'Texture Changes', emoji: '🌊' },
    { id: 'slow-growth', label: 'Slow Growth', emoji: '⏳' },
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
          <Text style={styles.headerTitle}>💇‍♀️ Hair Health</Text>
          <Text style={styles.headerSubtitle}>Track your hair symptoms</Text>
        </View>

        {/* Hormonal Connection Info */}
        <View style={styles.infoCard}>
          <Info size={20} color="#EC4899" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Hormonal Connections</Text>
            <Text style={styles.infoText}>
              Hair health is closely linked to androgens (testosterone, DHT), thyroid hormones, estrogen, progesterone, and insulin levels.
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

        {/* Related Hormones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Related Hormones</Text>
          
          <View style={styles.hormoneCard}>
            <Text style={styles.hormoneName}>Androgens (Testosterone, DHT)</Text>
            <Text style={styles.hormoneDescription}>
              High levels can lead to pattern baldness and excessive facial/body hair (hirsutism). Common in PCOS.
            </Text>
          </View>

          <View style={styles.hormoneCard}>
            <Text style={styles.hormoneName}>Thyroid Hormones</Text>
            <Text style={styles.hormoneDescription}>
              Both hypo- and hyperthyroidism can cause hair loss or texture changes.
            </Text>
          </View>

          <View style={styles.hormoneCard}>
            <Text style={styles.hormoneName}>Estrogen & Progesterone</Text>
            <Text style={styles.hormoneDescription}>
              Drops during postpartum or perimenopause can trigger telogen effluvium (shedding).
            </Text>
          </View>

          <View style={styles.hormoneCard}>
            <Text style={styles.hormoneName}>Insulin</Text>
            <Text style={styles.hormoneDescription}>
              Insulin resistance (common in PCOS) indirectly impacts androgens, affecting hair.
            </Text>
          </View>
        </View>

        {/* How to Help */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How Hormonal Control Helps</Text>
          <View style={styles.helpCard}>
            <Text style={styles.helpText}>
              ✓ Balancing androgens{'\n'}
              ✓ Optimizing thyroid function{'\n'}
              ✓ Supporting healthy estrogen/progesterone levels{'\n'}
              ✓ Improving hair growth and reducing shedding{'\n'}
              ✓ Managing unwanted hair growth
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
    backgroundColor: '#FFF5F7',
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
    borderColor: '#EC4899',
    backgroundColor: '#FFF5F7',
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
    backgroundColor: '#EC4899',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
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
    backgroundColor: '#EC4899',
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

