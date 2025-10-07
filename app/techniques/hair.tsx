import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, Calendar, Droplet, Shield, Sparkles, Star, CheckCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';
import { HormonePredictionService, CyclePhase } from '@/services/HormonePredictionService';

export default function HairTechniquesScreen() {
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
      [CyclePhase.FOLLICULAR]: { name: 'Follicular', color: '#9c27b0', description: 'Growth Phase' },
      [CyclePhase.OVULATORY]: { name: 'Ovulatory', color: '#4caf50', description: 'Peak Strength' },
      [CyclePhase.LUTEAL]: { name: 'Luteal', color: '#2196f3', description: 'Preparation' }
    };
    return phaseMap[phase];
  };

  const phaseInfo = getPhaseInfo(currentPhase);

  const hairTechniques = {
    [CyclePhase.MENSTRUAL]: {
      title: "Gentle Hair Care During Menstruation",
      description: "Your hair is most fragile during this phase. Focus on gentle care and recovery.",
      techniques: [
        {
          title: "Gentle Cleansing",
          description: "Use sulfate-free shampoos to avoid stripping natural oils",
          steps: [
            "Wash hair with lukewarm water (not hot)",
            "Use a gentle, sulfate-free shampoo",
            "Apply conditioner from mid-length to ends",
            "Rinse with cool water to seal cuticles"
          ],
          frequency: "Every 2-3 days"
        },
        {
          title: "Deep Conditioning Treatment",
          description: "Restore moisture and strengthen hair during this vulnerable phase",
          steps: [
            "Apply deep conditioner to damp hair",
            "Cover with a shower cap or warm towel",
            "Leave on for 20-30 minutes",
            "Rinse thoroughly with cool water"
          ],
          frequency: "Once a week"
        },
        {
          title: "Scalp Massage",
          description: "Improve blood circulation and reduce stress-related hair loss",
          steps: [
            "Use fingertips to gently massage scalp",
            "Apply light pressure in circular motions",
            "Focus on temples and crown area",
            "Continue for 5-10 minutes"
          ],
          frequency: "Daily"
        }
      ],
      supplements: ["Iron", "Biotin", "Zinc", "Vitamin D"],
      avoid: ["Heat styling", "Tight hairstyles", "Harsh chemicals", "Over-washing"]
    },
    [CyclePhase.FOLLICULAR]: {
      title: "Hair Growth Optimization",
      description: "Perfect time for hair treatments and growth stimulation.",
      techniques: [
        {
          title: "Hair Growth Treatments",
          description: "Stimulate follicles and promote new growth",
          steps: [
            "Apply castor oil to scalp and roots",
            "Massage gently for 5 minutes",
            "Leave on overnight or for 2-3 hours",
            "Wash with mild shampoo"
          ],
          frequency: "2-3 times per week"
        },
        {
          title: "Protein Treatments",
          description: "Strengthen hair structure and prevent breakage",
          steps: [
            "Apply protein mask to clean, damp hair",
            "Focus on mid-lengths and ends",
            "Leave on for 15-20 minutes",
            "Rinse thoroughly"
          ],
          frequency: "Once a week"
        },
        {
          title: "Scalp Exfoliation",
          description: "Remove buildup and stimulate hair follicles",
          steps: [
            "Mix brown sugar with coconut oil",
            "Gently massage into scalp",
            "Rinse with warm water",
            "Follow with conditioner"
          ],
          frequency: "Once every two weeks"
        }
      ],
      supplements: ["Biotin", "Collagen", "Vitamin C", "Iron"],
      avoid: ["Over-processing", "Excessive heat", "Tight ponytails"]
    },
    [CyclePhase.OVULATORY]: {
      title: "Peak Hair Health Maintenance",
      description: "Your hair is at its strongest. Focus on maintenance and protection.",
      techniques: [
        {
          title: "UV Protection",
          description: "Shield hair from sun damage during peak strength phase",
          steps: [
            "Apply leave-in conditioner with UV protection",
            "Wear hats or scarves in direct sun",
            "Use heat protectant before styling",
            "Rinse hair after swimming"
          ],
          frequency: "Daily when exposed to sun"
        },
        {
          title: "Hair Strengthening",
          description: "Maintain hair strength and prevent damage",
          steps: [
            "Use strengthening shampoo and conditioner",
            "Apply hair serum to ends",
            "Use wide-tooth comb when wet",
            "Sleep on silk pillowcase"
          ],
          frequency: "Daily"
        },
        {
          title: "Styling Protection",
          description: "Style safely while maintaining hair health",
          steps: [
            "Always use heat protectant",
            "Keep heat tools below 350°F",
            "Use lower heat settings",
            "Limit styling to special occasions"
          ],
          frequency: "As needed"
        }
      ],
      supplements: ["Biotin", "Omega-3", "Vitamin E", "Silica"],
      avoid: ["Excessive heat", "Over-styling", "Chemical treatments"]
    },
    [CyclePhase.LUTEAL]: {
      title: "Hair Preparation & Strengthening",
      description: "Prepare hair for the upcoming menstrual phase with strengthening treatments.",
      techniques: [
        {
          title: "Hair Strengthening",
          description: "Build resilience for the upcoming vulnerable phase",
          steps: [
            "Use protein-rich hair masks",
            "Apply keratin treatments",
            "Use strengthening shampoos",
            "Focus on scalp health"
          ],
          frequency: "2-3 times per week"
        },
        {
          title: "Moisture Locking",
          description: "Seal in moisture to prepare for hormonal changes",
          steps: [
            "Apply deep conditioning treatment",
            "Use hair oils on ends",
            "Seal with leave-in conditioner",
            "Avoid over-washing"
          ],
          frequency: "Every 3-4 days"
        },
        {
          title: "Stress Management",
          description: "Reduce stress-related hair issues",
          steps: [
            "Practice scalp massage",
            "Use calming essential oils",
            "Get adequate sleep",
            "Manage stress levels"
          ],
          frequency: "Daily"
        }
      ],
      supplements: ["Biotin", "Iron", "Vitamin B12", "Folic acid"],
      avoid: ["Stress", "Over-washing", "Harsh treatments", "Tight hairstyles"]
    }
  };

  const currentTechniques = hairTechniques[currentPhase];

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
        <Text style={styles.headerTitle}>Hair Care Techniques</Text>
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
            <Sparkles size={20} color="#EC4899" />
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
          <Droplet size={20} color="#10B981" />
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
        <Text style={styles.expertButtonText}>Talk to Hair Expert</Text>
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
