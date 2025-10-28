import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { ArrowLeft, Info, TrendingUp, TrendingDown } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function WeightManagementScreen() {
  const router = useRouter();
  const [weight, setWeight] = useState('');
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);

  const concerns = [
    { id: 'stubborn-gain', label: 'Stubborn Weight Gain', emoji: '📈' },
    { id: 'difficulty-losing', label: 'Difficulty Losing Weight', emoji: '⚖️' },
    { id: 'abdominal-fat', label: 'Abdominal Fat', emoji: '🔴' },
    { id: 'appetite-changes', label: 'Appetite Changes', emoji: '🍽️' },
    { id: 'cravings', label: 'Food Cravings', emoji: '🍰' },
    { id: 'slow-metabolism', label: 'Slow Metabolism', emoji: '🐌' },
  ];

  const toggleConcern = (id: string) => {
    if (selectedConcerns.includes(id)) {
      setSelectedConcerns(selectedConcerns.filter(c => c !== id));
    } else {
      setSelectedConcerns([...selectedConcerns, id]);
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
          <Text style={styles.headerTitle}>⚖️ Weight Management</Text>
          <Text style={styles.headerSubtitle}>Track your weight and patterns</Text>
        </View>

        {/* Hormonal Connection Info */}
        <View style={styles.infoCard}>
          <Info size={20} color="#F97316" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Hormonal Connections</Text>
            <Text style={styles.infoText}>
              Weight management is influenced by insulin, thyroid hormones, cortisol, estrogen/progesterone, and hunger hormones (leptin/ghrelin).
            </Text>
          </View>
        </View>

        {/* Weight Entry */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Weight</Text>
          <View style={styles.weightInputContainer}>
            <TextInput
              style={styles.weightInput}
              placeholder="Enter weight"
              keyboardType="decimal-pad"
              value={weight}
              onChangeText={setWeight}
            />
            <Text style={styles.weightUnit}>lbs</Text>
          </View>
        </View>

        {/* Concerns Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Concerns</Text>
          <Text style={styles.sectionSubtitle}>Select all that apply</Text>

          <View style={styles.concernGrid}>
            {concerns.map((concern) => (
              <TouchableOpacity
                key={concern.id}
                style={[
                  styles.concernCard,
                  selectedConcerns.includes(concern.id) && styles.concernCardSelected
                ]}
                onPress={() => toggleConcern(concern.id)}
              >
                <Text style={styles.concernEmoji}>{concern.emoji}</Text>
                <Text style={styles.concernLabel}>{concern.label}</Text>
                {selectedConcerns.includes(concern.id) && (
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
            <Text style={styles.hormoneName}>Insulin</Text>
            <Text style={styles.hormoneDescription}>
              Insulin resistance is a primary driver of weight gain, especially around the abdomen. Central to PCOS.
            </Text>
          </View>

          <View style={styles.hormoneCard}>
            <Text style={styles.hormoneName}>Thyroid Hormones</Text>
            <Text style={styles.hormoneDescription}>
              Hypothyroidism slows metabolism, making weight loss difficult.
            </Text>
          </View>

          <View style={styles.hormoneCard}>
            <Text style={styles.hormoneName}>Cortisol (Stress Hormone)</Text>
            <Text style={styles.hormoneDescription}>
              Chronic high cortisol promotes fat storage, particularly visceral (belly) fat.
            </Text>
          </View>

          <View style={styles.hormoneCard}>
            <Text style={styles.hormoneName}>Estrogen & Progesterone</Text>
            <Text style={styles.hormoneDescription}>
              Hormonal shifts during perimenopause can change fat distribution and make weight loss harder.
            </Text>
          </View>

          <View style={styles.hormoneCard}>
            <Text style={styles.hormoneName}>Leptin & Ghrelin</Text>
            <Text style={styles.hormoneDescription}>
              Hormonal imbalances can disrupt satiety and hunger signals, leading to increased appetite.
            </Text>
          </View>
        </View>

        {/* How to Help */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How Hormonal Control Helps</Text>
          <View style={styles.helpCard}>
            <Text style={styles.helpText}>
              ✓ Addressing insulin resistance{'\n'}
              ✓ Optimizing thyroid function{'\n'}
              ✓ Managing stress and cortisol levels{'\n'}
              ✓ Supporting balanced sex hormones{'\n'}
              ✓ Effective and sustainable weight management
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.saveButton, !weight && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!weight}
        >
          <Text style={styles.saveButtonText}>
            Save Weight Log
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
    backgroundColor: '#FEF3F2',
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
  weightInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 20,
  },
  weightInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    paddingVertical: 16,
  },
  weightUnit: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  concernGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  concernCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#F3F4F6',
    position: 'relative',
  },
  concernCardSelected: {
    borderColor: '#F97316',
    backgroundColor: '#FEF3F2',
  },
  concernEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  concernLabel: {
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
    backgroundColor: '#F97316',
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
    backgroundColor: '#F97316',
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

