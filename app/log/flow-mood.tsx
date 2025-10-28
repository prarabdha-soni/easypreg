import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Droplet, Smile, Frown, Meh, Heart, Zap, Moon, Check } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const flowLevels = [
  { id: 'spotting', label: 'Spotting', icon: '💧', color: '#FEE2E2' },
  { id: 'light', label: 'Light', icon: '💧💧', color: '#FECACA' },
  { id: 'medium', label: 'Medium', icon: '💧💧💧', color: '#FCA5A5' },
  { id: 'heavy', label: 'Heavy', icon: '💧💧💧💧', color: '#F87171' },
];

const moods = [
  { id: 'happy', label: 'Happy', icon: Smile, color: '#10B981' },
  { id: 'calm', label: 'Calm', icon: Heart, color: '#3B82F6' },
  { id: 'neutral', label: 'Neutral', icon: Meh, color: '#6B7280' },
  { id: 'anxious', label: 'Anxious', icon: Zap, color: '#F59E0B' },
  { id: 'sad', label: 'Sad', icon: Frown, color: '#8B5CF6' },
  { id: 'irritable', label: 'Irritable', icon: Moon, color: '#EF4444' },
];

const energyLevels = [
  { id: 1, label: 'Very Low', emoji: '😴' },
  { id: 2, label: 'Low', emoji: '😔' },
  { id: 3, label: 'Normal', emoji: '😊' },
  { id: 4, label: 'High', emoji: '😄' },
  { id: 5, label: 'Very High', emoji: '🚀' },
];

export default function FlowMoodTracker() {
  const router = useRouter();
  const { profile } = useUser();
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedEnergy, setSelectedEnergy] = useState<number | null>(null);

  const handleSave = async () => {
    const today = new Date().toISOString().split('T')[0];
    const logEntry = {
      date: today,
      flow: selectedFlow,
      mood: selectedMood,
      energy: selectedEnergy,
      timestamp: new Date().toISOString(),
    };

    try {
      // Get existing logs
      const existingLogs = await AsyncStorage.getItem('@flow_mood_logs');
      const logs = existingLogs ? JSON.parse(existingLogs) : [];
      
      // Add new log
      logs.push(logEntry);
      
      // Save back
      await AsyncStorage.setItem('@flow_mood_logs', JSON.stringify(logs));
      
      // Navigate back
      router.back();
    } catch (error) {
      console.error('Error saving log:', error);
    }
  };

  const canSave = selectedFlow || selectedMood || selectedEnergy;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Track Your Day</Text>
        <Text style={styles.subtitle}>Log flow, mood, and energy levels</Text>

        {/* Flow Intensity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Droplet size={24} color="#EC4899" />
            <Text style={styles.sectionTitle}>Flow Intensity</Text>
          </View>
          
          <View style={styles.optionsGrid}>
            {flowLevels.map((level) => (
              <TouchableOpacity
                key={level.id}
                style={[
                  styles.flowCard,
                  { backgroundColor: level.color },
                  selectedFlow === level.id && styles.selectedCard
                ]}
                onPress={() => setSelectedFlow(level.id)}
              >
                <Text style={styles.flowEmoji}>{level.icon}</Text>
                <Text style={styles.flowLabel}>{level.label}</Text>
                {selectedFlow === level.id && (
                  <View style={styles.checkBadge}>
                    <Check size={16} color="#ffffff" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Mood */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Smile size={24} color="#EC4899" />
            <Text style={styles.sectionTitle}>How are you feeling?</Text>
          </View>
          
          <View style={styles.moodGrid}>
            {moods.map((mood) => {
              const IconComponent = mood.icon;
              return (
                <TouchableOpacity
                  key={mood.id}
                  style={[
                    styles.moodCard,
                    selectedMood === mood.id && { borderColor: mood.color, borderWidth: 3 }
                  ]}
                  onPress={() => setSelectedMood(mood.id)}
                >
                  <View style={[styles.moodIconContainer, { backgroundColor: mood.color + '20' }]}>
                    <IconComponent size={32} color={mood.color} />
                  </View>
                  <Text style={styles.moodLabel}>{mood.label}</Text>
                  {selectedMood === mood.id && (
                    <View style={[styles.checkBadge, { backgroundColor: mood.color }]}>
                      <Check size={16} color="#ffffff" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Energy Level */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Zap size={24} color="#EC4899" />
            <Text style={styles.sectionTitle}>Energy Level</Text>
          </View>
          
          <View style={styles.energyContainer}>
            {energyLevels.map((level) => (
              <TouchableOpacity
                key={level.id}
                style={[
                  styles.energyButton,
                  selectedEnergy === level.id && styles.selectedEnergyButton
                ]}
                onPress={() => setSelectedEnergy(level.id)}
              >
                <Text style={styles.energyEmoji}>{level.emoji}</Text>
                <Text style={[
                  styles.energyLabel,
                  selectedEnergy === level.id && styles.selectedEnergyLabel
                ]}>
                  {level.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!canSave}
        >
          <Text style={styles.saveButtonText}>Save Entry</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={() => router.back()}>
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 24,
    paddingTop: 60,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  flowCard: {
    width: '47%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#EC4899',
    borderWidth: 3,
  },
  flowEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  flowLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  moodCard: {
    width: '30%',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f0f0f0',
    position: 'relative',
  },
  moodIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  energyContainer: {
    gap: 12,
  },
  energyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  selectedEnergyButton: {
    backgroundColor: '#FFF5F7',
    borderColor: '#EC4899',
  },
  energyEmoji: {
    fontSize: 28,
    marginRight: 16,
  },
  energyLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  selectedEnergyLabel: {
    color: '#EC4899',
    fontWeight: '700',
  },
  checkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#EC4899',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#EC4899',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonDisabled: {
    backgroundColor: '#d1d5db',
    opacity: 0.6,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  skipButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 16,
    color: '#6B7280',
  },
});

