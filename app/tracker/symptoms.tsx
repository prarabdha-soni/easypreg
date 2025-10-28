import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Flame, Droplets, Wind, Zap, Frown, Coffee, Moon, Heart, Activity } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function SymptomsTracker() {
  const router = useRouter();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [intensity, setIntensity] = useState<{ [key: string]: number }>({});

  const symptoms = [
    { id: 'hot-flashes', label: 'Hot Flashes', icon: Flame, color: '#EF4444', bg: '#FEF2F2' },
    { id: 'mood', label: 'Mood Swings', icon: Droplets, color: '#10B981', bg: '#ECFDF5' },
    { id: 'fatigue', label: 'Fatigue', icon: Wind, color: '#8B5CF6', bg: '#F5F3FF' },
    { id: 'bloating', label: 'Bloating', icon: Zap, color: '#F59E0B', bg: '#FFFBEB' },
    { id: 'irritability', label: 'Irritability', icon: Frown, color: '#EC4899', bg: '#FDF2F8' },
    { id: 'insomnia', label: 'Insomnia', icon: Moon, color: '#3B82F6', bg: '#EFF6FF' },
    { id: 'headache', label: 'Headache', icon: Coffee, color: '#EF4444', bg: '#FEF2F2' },
    { id: 'anxiety', label: 'Anxiety', icon: Heart, color: '#EC4899', bg: '#FDF2F8' },
    { id: 'cramps', label: 'Cramps', icon: Activity, color: '#F97316', bg: '#FFF7ED' },
  ];

  const toggleSymptom = (id: string) => {
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== id));
      const newIntensity = { ...intensity };
      delete newIntensity[id];
      setIntensity(newIntensity);
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
      setIntensity({ ...intensity, [id]: 2 });
    }
  };

  const setSymptomIntensity = (id: string, level: number) => {
    setIntensity({ ...intensity, [id]: level });
  };

  const handleSave = () => {
    // Save logic
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#1a1a1a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Track Symptoms</Text>
          <Text style={styles.headerSubtitle}>Select all that apply today</Text>
        </View>

        {/* Symptoms Grid */}
        <View style={styles.section}>
          <View style={styles.symptomGrid}>
            {symptoms.map((symptom) => {
              const isSelected = selectedSymptoms.includes(symptom.id);
              const SymptomIcon = symptom.icon;

              return (
                <View key={symptom.id} style={styles.symptomContainer}>
                  <TouchableOpacity
                    style={[
                      styles.symptomCard,
                      isSelected && { borderColor: symptom.color, borderWidth: 2 }
                    ]}
                    onPress={() => toggleSymptom(symptom.id)}
                  >
                    <View style={[styles.symptomIcon, { backgroundColor: symptom.bg }]}>
                      <SymptomIcon size={28} color={symptom.color} />
                    </View>
                    <Text style={styles.symptomLabel}>{symptom.label}</Text>
                    {isSelected && (
                      <View style={[styles.selectedBadge, { backgroundColor: symptom.color }]}>
                        <Text style={styles.selectedBadgeText}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>

                  {/* Intensity Selector */}
                  {isSelected && (
                    <View style={styles.intensitySelector}>
                      <Text style={styles.intensityLabel}>Intensity:</Text>
                      <View style={styles.intensityButtons}>
                        {[1, 2, 3].map((level) => (
                          <TouchableOpacity
                            key={level}
                            style={[
                              styles.intensityButton,
                              intensity[symptom.id] === level && {
                                backgroundColor: symptom.color,
                              }
                            ]}
                            onPress={() => setSymptomIntensity(symptom.id, level)}
                          >
                            <Text style={[
                              styles.intensityButtonText,
                              intensity[symptom.id] === level && { color: '#ffffff' }
                            ]}>
                              {level === 1 ? 'Mild' : level === 2 ? 'Moderate' : 'Severe'}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Tracking Tips</Text>
          <Text style={styles.tipsText}>
            • Log symptoms daily for better patterns{'\n'}
            • Be specific about intensity{'\n'}
            • Note triggers (food, stress, sleep){'\n'}
            • Track at the same time each day
          </Text>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.saveButton, 
            selectedSymptoms.length === 0 && styles.saveButtonDisabled
          ]}
          onPress={handleSave}
          disabled={selectedSymptoms.length === 0}
        >
          <Text style={styles.saveButtonText}>
            Save {selectedSymptoms.length > 0 && `(${selectedSymptoms.length} symptoms)`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  symptomGrid: {
    gap: 16,
  },
  symptomContainer: {
    marginBottom: 16,
  },
  symptomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    position: 'relative',
  },
  symptomIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  symptomLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
  },
  selectedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  intensitySelector: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  intensityLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  intensityButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  intensityButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  intensityButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  tipsCard: {
    backgroundColor: '#FFF7ED',
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  tipsText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 22,
  },
  footer: {
    padding: 24,
    paddingBottom: 32,
    backgroundColor: '#F8F9FA',
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

