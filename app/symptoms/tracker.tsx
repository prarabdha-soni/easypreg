import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Flame, Moon, Heart, Droplets, Wind, Activity, Brain, Zap } from 'lucide-react-native';
import { useState } from 'react';

export default function SymptomTrackerScreen() {
  const router = useRouter();
  const [selectedSymptoms, setSelectedSymptoms] = useState<{ [key: string]: number }>({});

  const symptoms = [
    { id: 'hot-flashes', label: 'Hot Flashes', icon: Flame, color: '#EF4444', bg: '#FEF2F2' },
    { id: 'night-sweats', label: 'Night Sweats', icon: Moon, color: '#6366F1', bg: '#EEF2FF' },
    { id: 'mood-changes', label: 'Mood Changes', icon: Heart, color: '#EC4899', bg: '#FDF2F8' },
    { id: 'sleep-issues', label: 'Sleep Issues', icon: Moon, color: '#8B5CF6', bg: '#F5F3FF' },
    { id: 'vaginal-dryness', label: 'Vaginal Dryness', icon: Droplets, color: '#10B981', bg: '#ECFDF5' },
    { id: 'brain-fog', label: 'Brain Fog', icon: Brain, color: '#F59E0B', bg: '#FFFBEB' },
    { id: 'fatigue', label: 'Fatigue', icon: Wind, color: '#6B7280', bg: '#F9FAFB' },
    { id: 'joint-pain', label: 'Joint Pain', icon: Activity, color: '#EF4444', bg: '#FEF2F2' },
    { id: 'headaches', label: 'Headaches', icon: Zap, color: '#F59E0B', bg: '#FFFBEB' },
    { id: 'weight-gain', label: 'Weight Gain', icon: Activity, color: '#EC4899', bg: '#FDF2F8' },
  ];

  const severityLevels = [
    { value: 1, label: 'Mild', color: '#10B981' },
    { value: 2, label: 'Moderate', color: '#F59E0B' },
    { value: 3, label: 'Severe', color: '#EF4444' },
  ];

  const handleSymptomSelect = (symptomId: string, severity: number) => {
    setSelectedSymptoms(prev => ({
      ...prev,
      [symptomId]: severity
    }));
  };

  const handleSave = () => {
    // Save symptoms to context/backend
    console.log('Saving symptoms:', selectedSymptoms);
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Symptoms</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How are you feeling today?</Text>
          <Text style={styles.sectionSubtitle}>
            Select symptoms and rate their severity
          </Text>
        </View>

        {/* Symptoms List */}
        {symptoms.map((symptom) => {
          const IconComponent = symptom.icon;
          const selectedSeverity = selectedSymptoms[symptom.id];

          return (
            <View key={symptom.id} style={styles.symptomItem}>
              <View style={styles.symptomHeader}>
                <View style={[styles.symptomIconContainer, { backgroundColor: symptom.bg }]}>
                  <IconComponent size={20} color={symptom.color} />
                </View>
                <Text style={styles.symptomLabel}>{symptom.label}</Text>
              </View>

              <View style={styles.severityButtons}>
                {severityLevels.map((level) => (
                  <TouchableOpacity
                    key={level.value}
                    style={[
                      styles.severityButton,
                      selectedSeverity === level.value && {
                        backgroundColor: level.color,
                        borderColor: level.color,
                      }
                    ]}
                    onPress={() => handleSymptomSelect(symptom.id, level.value)}
                  >
                    <Text style={[
                      styles.severityButtonText,
                      selectedSeverity === level.value && styles.severityButtonTextActive
                    ]}>
                      {level.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}

        {/* Save Button */}
        <TouchableOpacity 
          style={[
            styles.saveButton,
            Object.keys(selectedSymptoms).length === 0 && styles.saveButtonDisabled
          ]}
          onPress={handleSave}
          disabled={Object.keys(selectedSymptoms).length === 0}
        >
          <Text style={styles.saveButtonText}>Save Today's Symptoms</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  symptomItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  symptomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  symptomIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symptomLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  severityButtons: {
    flexDirection: 'row',
    gap: 8,
    paddingLeft: 52,
  },
  severityButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  severityButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  severityButtonTextActive: {
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#EC4899',
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

