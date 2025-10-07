import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Calendar, Activity, Shield, Sparkles, Star, CheckCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';
import { HormonePredictionService, CyclePhase } from '@/services/HormonePredictionService';

export default function WeightTechniquesScreen() {
  const router = useRouter();
  const { profile } = useUser();
  const [hormoneService] = useState(() => HormonePredictionService.getInstance());
  const [currentPhase, setCurrentPhase] = useState<CyclePhase>(CyclePhase.FOLLICULAR);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  useEffect(() => {
    if (profile.lastPeriodDate) {
      const cycleData = {
        lastPeriodDate: new Date(profile.lastPeriodDate),
        cycleLength: profile.cycleLength
      };
      hormoneService.initialize(profile, cycleData);
      setCurrentPhase(hormoneService.getCurrentCyclePhase());
    }
  }, [profile.lastPeriodDate, profile.cycleLength]);

  const getPhaseInfo = (phase: CyclePhase) => {
    const phaseMap = {
      [CyclePhase.MENSTRUAL]: { name: 'Menstrual', color: '#e91e63', description: 'Rest & Recovery' },
      [CyclePhase.FOLLICULAR]: { name: 'Follicular', color: '#9c27b0', description: 'Energy Building' },
      [CyclePhase.OVULATORY]: { name: 'Ovulatory', color: '#4caf50', description: 'Peak Performance' },
      [CyclePhase.LUTEAL]: { name: 'Luteal', color: '#2196f3', description: 'Endurance Focus' }
    };
    return phaseMap[phase];
  };

  const phaseInfo = getPhaseInfo(currentPhase);

  const weightTechniques = {
    [CyclePhase.MENSTRUAL]: {
      title: "Gentle Movement & Recovery",
      description: "Focus on gentle movement and recovery during this vulnerable phase.",
      techniques: [
        {
          title: "Gentle Movement",
          description: "Light exercise to maintain circulation without overexertion",
          steps: [
            "Start with 10-15 minute walks",
            "Practice gentle yoga or stretching",
            "Listen to your body's signals",
            "Stop if you feel fatigued"
          ],
          frequency: "Daily, 15-30 minutes"
        },
        {
          title: "Hydration Focus",
          description: "Maintain proper hydration to support recovery",
          steps: [
            "Drink 8-10 glasses of water daily",
            "Add electrolytes if needed",
            "Avoid excessive caffeine",
            "Include herbal teas"
          ],
          frequency: "Throughout the day"
        },
        {
          title: "Nutrient-Dense Eating",
          description: "Focus on iron-rich foods and anti-inflammatory nutrients",
          steps: [
            "Include leafy greens and lean proteins",
            "Add iron-rich foods like spinach and lentils",
            "Include omega-3 rich foods",
            "Avoid processed foods"
          ],
          frequency: "Every meal"
        }
      ],
      supplements: ["Iron", "Magnesium", "Vitamin B12", "Omega-3"],
      avoid: ["Intense workouts", "Excessive cardio", "Restrictive diets", "Stress"]
    },
    [CyclePhase.FOLLICULAR]: {
      title: "Energy Building & Strength Training",
      description: "Perfect time for building strength and increasing energy levels.",
      techniques: [
        {
          title: "Strength Training",
          description: "Build muscle and increase metabolism",
          steps: [
            "Focus on compound movements",
            "Start with bodyweight exercises",
            "Progress to weights gradually",
            "Include rest days between sessions"
          ],
          frequency: "3-4 times per week"
        },
        {
          title: "Cardio Intervals",
          description: "Boost cardiovascular fitness and fat burning",
          steps: [
            "Start with 20-30 minute sessions",
            "Alternate between high and low intensity",
            "Include walking, cycling, or swimming",
            "Monitor heart rate and energy levels"
          ],
          frequency: "2-3 times per week"
        },
        {
          title: "Protein-Rich Nutrition",
          description: "Support muscle building and recovery",
          steps: [
            "Include protein in every meal",
            "Aim for 1.2-1.6g protein per kg body weight",
            "Choose lean protein sources",
            "Time protein around workouts"
          ],
          frequency: "Daily"
        }
      ],
      supplements: ["Protein", "Creatine", "Branched-chain amino acids", "Vitamin D"],
      avoid: ["Overtraining", "Inadequate protein", "Skipping meals", "Dehydration"]
    },
    [CyclePhase.OVULATORY]: {
      title: "Peak Performance Training",
      description: "Your body is at its strongest. Focus on high-intensity training.",
      techniques: [
        {
          title: "High-Intensity Training",
          description: "Maximize performance during peak strength phase",
          steps: [
            "Include HIIT workouts",
            "Focus on power and speed training",
            "Challenge yourself with new exercises",
            "Push your limits safely"
          ],
          frequency: "3-4 times per week"
        },
        {
          title: "Competition Preparation",
          description: "Perfect time for fitness challenges and goals",
          steps: [
            "Set new personal records",
            "Try new workout classes",
            "Increase training intensity",
            "Focus on performance metrics"
          ],
          frequency: "As desired"
        },
        {
          title: "Optimal Nutrition",
          description: "Fuel peak performance with proper nutrition",
          steps: [
            "Increase carbohydrate intake for energy",
            "Maintain adequate protein",
            "Stay well hydrated",
            "Time meals around workouts"
          ],
          frequency: "Daily"
        }
      ],
      supplements: ["Protein", "Creatine", "Beta-alanine", "Caffeine"],
      avoid: ["Undereating", "Inadequate hydration", "Overtraining", "Poor sleep"]
    },
    [CyclePhase.LUTEAL]: {
      title: "Endurance & Stress Management",
      description: "Focus on endurance training and managing energy fluctuations.",
      techniques: [
        {
          title: "Endurance Training",
          description: "Build stamina and manage energy levels",
          steps: [
            "Focus on longer, steady-state cardio",
            "Include moderate-intensity activities",
            "Practice stress-reducing exercises",
            "Listen to your body's energy levels"
          ],
          frequency: "3-4 times per week"
        },
        {
          title: "Stress Management",
          description: "Reduce stress-related weight fluctuations",
          steps: [
            "Practice meditation or deep breathing",
            "Get adequate sleep (7-9 hours)",
            "Include relaxation techniques",
            "Manage cortisol levels"
          ],
          frequency: "Daily"
        },
        {
          title: "Balanced Nutrition",
          description: "Support energy levels and mood stability",
          steps: [
            "Include complex carbohydrates",
            "Focus on whole, unprocessed foods",
            "Include mood-supporting nutrients",
            "Avoid extreme dieting"
          ],
          frequency: "Daily"
        }
      ],
      supplements: ["Magnesium", "B-vitamins", "Omega-3", "Adaptogens"],
      avoid: ["Extreme dieting", "Overtraining", "Stress", "Inadequate sleep"]
    }
  };

  const currentTechniques = weightTechniques[currentPhase];

  const toggleTask = (task: string) => {
    setCompletedTasks(prev => 
      prev.includes(task) 
        ? prev.filter(t => t !== task)
        : [...prev, task]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Weight Management Techniques</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Current Phase Card */}
      <View style={[styles.phaseCard, { borderLeftColor: phaseInfo.color }]}>
        <View style={styles.phaseHeader}>
          <Calendar size={20} color={phaseInfo.color} />
          <Text style={[styles.phaseName, { color: phaseInfo.color }]}>{phaseInfo.name} Phase</Text>
        </View>
        <Text style={styles.phaseDescription}>{phaseInfo.description}</Text>
        <Text style={styles.phaseTitle}>{currentTechniques.title}</Text>
        <Text style={styles.phaseSubtitle}>{currentTechniques.description}</Text>
      </View>

      {/* Techniques */}
      <Text style={styles.sectionTitle}>Recommended Techniques</Text>
      
      {currentTechniques.techniques.map((technique, index) => (
        <View key={index} style={styles.techniqueCard}>
          <View style={styles.techniqueHeader}>
            <Activity size={20} color="#EC4899" />
            <Text style={styles.techniqueTitle}>{technique.title}</Text>
          </View>
          <Text style={styles.techniqueDescription}>{technique.description}</Text>
          
          <View style={styles.stepsContainer}>
            <Text style={styles.stepsTitle}>Steps:</Text>
            {technique.steps.map((step, stepIndex) => (
              <TouchableOpacity
                key={stepIndex}
                style={styles.stepItem}
                onPress={() => toggleTask(`${technique.title}-${stepIndex}`)}
              >
                <CheckCircle 
                  size={16} 
                  color={completedTasks.includes(`${technique.title}-${stepIndex}`) ? "#10B981" : "#D1D5DB"} 
                />
                <Text style={[
                  styles.stepText,
                  completedTasks.includes(`${technique.title}-${stepIndex}`) && styles.completedStep
                ]}>
                  {step}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.frequencyContainer}>
            <Text style={styles.frequencyLabel}>Frequency:</Text>
            <Text style={styles.frequencyText}>{technique.frequency}</Text>
          </View>
        </View>
      ))}

      {/* Supplements */}
      <View style={styles.supplementsCard}>
        <View style={styles.supplementsHeader}>
          <Activity size={20} color="#10B981" />
          <Text style={styles.supplementsTitle}>Recommended Supplements</Text>
        </View>
        <View style={styles.supplementsList}>
          {currentTechniques.supplements.map((supplement, index) => (
            <View key={index} style={styles.supplementItem}>
              <Star size={16} color="#F59E0B" />
              <Text style={styles.supplementText}>{supplement}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Things to Avoid */}
      <View style={styles.avoidCard}>
        <View style={styles.avoidHeader}>
          <Shield size={20} color="#EF4444" />
          <Text style={styles.avoidTitle}>Things to Avoid</Text>
        </View>
        <View style={styles.avoidList}>
          {currentTechniques.avoid.map((item, index) => (
            <View key={index} style={styles.avoidItem}>
              <Text style={styles.avoidText}>• {item}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Expert Consultation */}
      <TouchableOpacity 
        style={styles.expertButton}
        onPress={() => router.push('/experts')}
      >
        <Text style={styles.expertButtonText}>Talk to Fitness Expert</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF7F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  placeholder: {
    width: 24,
  },
  phaseCard: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  phaseName: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  phaseDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  phaseTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  phaseSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  techniqueCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  techniqueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  techniqueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginLeft: 8,
  },
  techniqueDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  stepsContainer: {
    marginBottom: 16,
  },
  stepsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    flex: 1,
  },
  completedStep: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  frequencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  frequencyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginRight: 8,
  },
  frequencyText: {
    fontSize: 14,
    color: '#EC4899',
    fontWeight: '500',
  },
  supplementsCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  supplementsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  supplementsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginLeft: 8,
  },
  supplementsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  supplementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  supplementText: {
    fontSize: 12,
    color: '#059669',
    marginLeft: 4,
    fontWeight: '500',
  },
  avoidCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  avoidHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avoidTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginLeft: 8,
  },
  avoidList: {
    gap: 4,
  },
  avoidItem: {
    marginBottom: 4,
  },
  avoidText: {
    fontSize: 14,
    color: '#DC2626',
  },
  expertButton: {
    margin: 20,
    backgroundColor: '#EC4899',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  expertButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
