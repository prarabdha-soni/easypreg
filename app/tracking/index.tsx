import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Alert, Platform } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { SymptomTrackingService, DailySymptomEntry, SymptomType, MoodType } from '@/services/SymptomTrackingService';
import { LinearGradient } from 'expo-linear-gradient';
import { getCurrentHormonalPhase, getCycleDay, themes } from '@/services/ThemeService';
import { Check, X, Save, TrendingUp, Lock } from 'lucide-react-native';

const SYMPTOM_LABELS: Record<SymptomType, string> = {
  cramps: 'Cramps',
  bloating: 'Bloating',
  headache: 'Headache',
  fatigue: 'Fatigue',
  mood_swings: 'Mood Swings',
  acne: 'Acne',
  back_pain: 'Back Pain',
  breast_tenderness: 'Breast Tenderness',
  nausea: 'Nausea',
  constipation: 'Constipation',
  diarrhea: 'Diarrhea',
  insomnia: 'Insomnia',
  anxiety: 'Anxiety',
  irritability: 'Irritability',
  food_cravings: 'Food Cravings',
  low_libido: 'Low Libido',
  high_libido: 'High Libido',
  hot_flashes: 'Hot Flashes',
  brain_fog: 'Brain Fog',
};

const FREE_TIER_SYMPTOMS: SymptomType[] = ['cramps', 'bloating', 'headache', 'fatigue', 'mood_swings'];

export default function TrackingScreen() {
  const { profile } = useUser();
  const { subscription, hasFeature } = useSubscription();
  const symptomService = SymptomTrackingService.getInstance();
  
  const [entry, setEntry] = useState<DailySymptomEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [canTrackUnlimited, setCanTrackUnlimited] = useState(false);

  const phaseKey = profile.lastPeriodDate 
    ? getCurrentHormonalPhase(getCycleDay(profile.lastPeriodDate))
    : 'Follicular';
  const theme = themes[phaseKey];

  useEffect(() => {
    symptomService.setLastPeriodDate(profile.lastPeriodDate);
    loadTodayEntry();
    checkUnlimitedAccess();
  }, [profile.lastPeriodDate]);

  const checkUnlimitedAccess = async () => {
    const unlimited = await hasFeature('unlimited_tracking');
    setCanTrackUnlimited(unlimited);
  };

  const loadTodayEntry = async () => {
    try {
      const todayEntry = await symptomService.getTodayEntry();
      if (todayEntry) {
        setEntry(todayEntry);
      } else {
        const newEntry = symptomService.createTodayEntry();
        setEntry(newEntry);
      }
    } catch (error) {
      console.error('Error loading entry:', error);
      const newEntry = symptomService.createTodayEntry();
      setEntry(newEntry);
    } finally {
      setLoading(false);
    }
  };

  const updateSymptom = (symptom: SymptomType, severity: number) => {
    if (!entry) return;
    
    // Check if user can track this symptom
    if (!canTrackUnlimited && !FREE_TIER_SYMPTOMS.includes(symptom)) {
      setShowPremiumModal(true);
      return;
    }
    
    setEntry({
      ...entry,
      symptoms: {
        ...entry.symptoms,
        [symptom]: severity,
      },
    });
  };

  const updateMood = (mood: MoodType) => {
    if (!entry) return;
    setEntry({ ...entry, mood });
  };

  const updateEnergy = (level: number) => {
    if (!entry) return;
    setEntry({ ...entry, energyLevel: level });
  };

  const updateSleepQuality = (quality: number) => {
    if (!entry) return;
    setEntry({ ...entry, sleepQuality: quality });
  };

  const saveEntry = async () => {
    if (!entry) return;
    
    setSaving(true);
    try {
      await symptomService.saveDailyEntry(entry);
      Alert.alert('Saved!', 'Your daily check-in has been saved.');
    } catch (error) {
      Alert.alert('Error', 'Failed to save entry. Please try again.');
      console.error('Error saving entry:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !entry) {
    return (
      <View style={[styles.container, { backgroundColor: theme.surface }]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const availableSymptoms = canTrackUnlimited 
    ? Object.keys(SYMPTOM_LABELS) as SymptomType[]
    : FREE_TIER_SYMPTOMS;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface }]} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <Text style={styles.pageTitle}>Daily Check-In</Text>
        <Text style={styles.pageSubtitle}>Track your symptoms and mood</Text>
      </LinearGradient>

      {/* Mood Section */}
      <View style={[styles.section, { borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.accentColor }]}>How are you feeling?</Text>
        <View style={styles.moodRow}>
          {(['😊', '😐', '😔', '😴', '😤', '😌'] as MoodType[]).map((mood) => (
            <TouchableOpacity
              key={mood}
              style={[
                styles.moodButton,
                entry.mood === mood && { backgroundColor: theme.accentColor + '20', borderColor: theme.accentColor },
              ]}
              onPress={() => updateMood(mood)}
            >
              <Text style={styles.moodEmoji}>{mood}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Energy Level */}
      <View style={[styles.section, { borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.accentColor }]}>Energy Level</Text>
        <Text style={styles.sectionSubtitle}>{entry.energyLevel}/10</Text>
        <View style={styles.sliderContainer}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.sliderDot,
                entry.energyLevel === level && { backgroundColor: theme.accentColor },
              ]}
              onPress={() => updateEnergy(level)}
            />
          ))}
        </View>
      </View>

      {/* Symptoms Section */}
      <View style={[styles.section, { borderColor: theme.border }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.accentColor }]}>Symptoms</Text>
          {!canTrackUnlimited && (
            <TouchableOpacity onPress={() => setShowPremiumModal(true)}>
              <Text style={[styles.upgradeText, { color: theme.accentColor }]}>Upgrade for more</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.sectionSubtitle}>
          {canTrackUnlimited ? 'Track all symptoms' : 'Free: Track 5 symptoms'}
        </Text>
        
        {availableSymptoms.map((symptom) => (
          <View key={symptom} style={styles.symptomRow}>
            <Text style={styles.symptomLabel}>{SYMPTOM_LABELS[symptom]}</Text>
            <View style={styles.severityRow}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((severity) => (
                <TouchableOpacity
                  key={severity}
                  style={[
                    styles.severityDot,
                    entry.symptoms[symptom] === severity && { backgroundColor: theme.accentColor },
                  ]}
                  onPress={() => updateSymptom(symptom, severity)}
                />
              ))}
            </View>
            <Text style={styles.severityLabel}>{entry.symptoms[symptom]}/10</Text>
          </View>
        ))}
      </View>

      {/* Sleep Quality */}
      <View style={[styles.section, { borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.accentColor }]}>Sleep Quality</Text>
        <Text style={styles.sectionSubtitle}>{entry.sleepQuality}/10</Text>
        <View style={styles.sliderContainer}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((quality) => (
            <TouchableOpacity
              key={quality}
              style={[
                styles.sliderDot,
                entry.sleepQuality === quality && { backgroundColor: theme.accentColor },
              ]}
              onPress={() => updateSleepQuality(quality)}
            />
          ))}
        </View>
      </View>

      {/* Notes */}
      <View style={[styles.section, { borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.accentColor }]}>Notes</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Add any additional notes..."
          multiline
          value={entry.notes}
          onChangeText={(text) => setEntry({ ...entry, notes: text })}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: theme.accentColor }]}
        onPress={saveEntry}
        disabled={saving}
      >
        {saving ? (
          <Text style={styles.saveButtonText}>Saving...</Text>
        ) : (
          <>
            <Save color="#FFFFFF" size={20} />
            <Text style={styles.saveButtonText}>Save Check-In</Text>
          </>
        )}
      </TouchableOpacity>

      <View style={{ height: 40 }} />

      {/* Premium Modal */}
      <Modal visible={showPremiumModal} transparent animationType="fade" onRequestClose={() => setShowPremiumModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Lock color={theme.accentColor} size={24} />
              <Text style={styles.modalTitle}>Upgrade to Premium</Text>
            </View>
            <Text style={styles.modalText}>
              Track unlimited symptoms and get advanced analytics with Premium.
            </Text>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: theme.accentColor }]}
              onPress={() => {
                setShowPremiumModal(false);
                // Navigate to premium screen
              }}
            >
              <Text style={styles.modalButtonText}>View Plans</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowPremiumModal(false)}>
              <Text style={styles.modalCancelText}>Maybe Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { paddingTop: 56, paddingBottom: 28, paddingHorizontal: 20, borderBottomLeftRadius: 28, borderBottomRightRadius: 28, marginBottom: 20 },
  pageTitle: { fontSize: 28, fontWeight: '700', color: '#FFF', marginBottom: 6 },
  pageSubtitle: { fontSize: 15, color: 'rgba(255,255,255,0.9)' },
  section: { marginHorizontal: 20, marginBottom: 20, padding: 20, borderRadius: 16, borderWidth: 1, backgroundColor: '#FFFFFF' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  sectionSubtitle: { fontSize: 14, color: '#6B7280', marginBottom: 16 },
  upgradeText: { fontSize: 12, fontWeight: '600' },
  moodRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  moodButton: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB' },
  moodEmoji: { fontSize: 32 },
  sliderContainer: { flexDirection: 'row', gap: 8, justifyContent: 'space-between', marginTop: 12 },
  sliderDot: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#E5E7EB' },
  symptomRow: { marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  symptomLabel: { fontSize: 15, fontWeight: '600', color: '#111827', marginBottom: 8 },
  severityRow: { flexDirection: 'row', gap: 4, alignItems: 'center', flex: 1 },
  severityDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#E5E7EB' },
  severityLabel: { fontSize: 12, color: '#6B7280', marginLeft: 8, minWidth: 40 },
  notesInput: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 12, minHeight: 100, textAlignVertical: 'top', fontSize: 14, color: '#111827' },
  saveButton: { marginHorizontal: 20, marginTop: 20, paddingVertical: 16, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24, width: '100%', maxWidth: 400 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#111827' },
  modalText: { fontSize: 15, color: '#6B7280', lineHeight: 22, marginBottom: 24 },
  modalButton: { paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  modalButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  modalCancelText: { textAlign: 'center', fontSize: 14, color: '#6B7280', fontWeight: '600' },
});

