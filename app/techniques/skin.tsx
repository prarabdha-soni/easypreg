import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Calendar, Droplet, Shield, Sparkles, Star, CheckCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';
import { HormonePredictionService, CyclePhase } from '@/services/HormonePredictionService';

export default function SkinTechniquesScreen() {
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
      [CyclePhase.MENSTRUAL]: { name: 'Menstrual', color: '#e91e63', description: 'Gentle Care' },
      [CyclePhase.FOLLICULAR]: { name: 'Follicular', color: '#9c27b0', description: 'Renewal Phase' },
      [CyclePhase.OVULATORY]: { name: 'Ovulatory', color: '#4caf50', description: 'Peak Radiance' },
      [CyclePhase.LUTEAL]: { name: 'Luteal', color: '#2196f3', description: 'Oil Control' }
    };
    return phaseMap[phase];
  };

  const phaseInfo = getPhaseInfo(currentPhase);

  const skinTechniques = {
    [CyclePhase.MENSTRUAL]: {
      title: "Gentle Skin Care During Menstruation",
      description: "Your skin is most sensitive. Focus on gentle, hydrating care.",
      techniques: [
        {
          title: "Gentle Cleansing Routine",
          description: "Use mild, non-stripping cleansers to avoid irritation",
          steps: [
            "Use lukewarm water (not hot)",
            "Apply gentle, sulfate-free cleanser",
            "Massage gently for 30 seconds",
            "Rinse thoroughly with cool water"
          ],
          frequency: "Twice daily"
        },
        {
          title: "Hydrating Mask Treatment",
          description: "Restore moisture and calm sensitive skin",
          steps: [
            "Apply hydrating sheet mask",
            "Leave on for 15-20 minutes",
            "Gently pat excess serum into skin",
            "Follow with moisturizer"
          ],
          frequency: "2-3 times per week"
        },
        {
          title: "Barrier Repair",
          description: "Strengthen skin barrier during vulnerable phase",
          steps: [
            "Apply ceramide-rich moisturizer",
            "Use gentle, fragrance-free products",
            "Avoid harsh exfoliants",
            "Protect with SPF during day"
          ],
          frequency: "Daily"
        }
      ],
      supplements: ["Omega-3", "Vitamin C", "Zinc", "Probiotics"],
      avoid: ["Harsh exfoliants", "Retinoids", "Strong acids", "Hot water"]
    },
    [CyclePhase.FOLLICULAR]: {
      title: "Skin Renewal & Brightening",
      description: "Perfect time for active ingredients and skin renewal treatments.",
      techniques: [
        {
          title: "Gentle Exfoliation",
          description: "Remove dead skin cells and promote cell turnover",
          steps: [
            "Use mild AHA or BHA exfoliant",
            "Apply to clean, dry skin",
            "Start with 2-3 times per week",
            "Always follow with moisturizer"
          ],
          frequency: "2-3 times per week"
        },
        {
          title: "Vitamin C Treatment",
          description: "Brighten skin and boost collagen production",
          steps: [
            "Apply vitamin C serum to clean skin",
            "Use in the morning before sunscreen",
            "Start with lower concentration",
            "Build up tolerance gradually"
          ],
          frequency: "Daily"
        },
        {
          title: "Hydrating Routine",
          description: "Maintain optimal moisture levels for healthy skin",
          steps: [
            "Apply hyaluronic acid serum",
            "Follow with moisturizer",
            "Use facial oil for extra hydration",
            "Don't forget eye cream"
          ],
          frequency: "Daily"
        }
      ],
      supplements: ["Vitamin C", "Collagen", "Hyaluronic acid", "Antioxidants"],
      avoid: ["Over-exfoliation", "Too many actives", "Harsh scrubs"]
    },
    [CyclePhase.OVULATORY]: {
      title: "Peak Skin Health Maintenance",
      description: "Your skin is at its most radiant. Focus on protection and enhancement.",
      techniques: [
        {
          title: "Sun Protection",
          description: "Shield skin from UV damage during peak strength",
          steps: [
            "Apply broad-spectrum SPF 30+",
            "Reapply every 2 hours if outdoors",
            "Use antioxidant serum under sunscreen",
            "Wear protective clothing and hats"
          ],
          frequency: "Daily"
        },
        {
          title: "Skin Strengthening",
          description: "Maintain skin resilience and prevent damage",
          steps: [
            "Use peptides for skin strengthening",
            "Apply niacinamide for barrier support",
            "Use gentle, effective cleansers",
            "Maintain consistent routine"
          ],
          frequency: "Daily"
        },
        {
          title: "Radiance Enhancement",
          description: "Enhance natural glow during peak phase",
          steps: [
            "Use illuminating primers",
            "Apply brightening serums",
            "Use gentle face massage",
            "Get adequate sleep"
          ],
          frequency: "Daily"
        }
      ],
      supplements: ["Vitamin C", "Vitamin E", "Zinc", "Selenium"],
      avoid: ["Excessive sun exposure", "Harsh treatments", "Over-cleansing"]
    },
    [CyclePhase.LUTEAL]: {
      title: "Oil Control & Breakout Prevention",
      description: "Manage increased oil production and prevent hormonal breakouts.",
      techniques: [
        {
          title: "Oil Control Routine",
          description: "Manage excess sebum production",
          steps: [
            "Use oil-free, non-comedogenic products",
            "Apply salicylic acid toner",
            "Use clay masks for oil absorption",
            "Blot excess oil throughout day"
          ],
          frequency: "Daily"
        },
        {
          title: "Breakout Prevention",
          description: "Prevent and treat hormonal acne",
          steps: [
            "Use benzoyl peroxide spot treatment",
            "Apply tea tree oil to problem areas",
            "Keep skin clean but not over-washed",
            "Change pillowcases frequently"
          ],
          frequency: "As needed"
        },
        {
          title: "Stress Management",
          description: "Reduce stress-related skin issues",
          steps: [
            "Practice stress-reducing techniques",
            "Get adequate sleep (7-9 hours)",
            "Use calming skincare ingredients",
            "Maintain consistent routine"
          ],
          frequency: "Daily"
        }
      ],
      supplements: ["Zinc", "Vitamin B6", "Magnesium", "Probiotics"],
      avoid: ["Over-washing", "Harsh scrubs", "Stress", "Touching face"]
    }
  };

  const currentTechniques = skinTechniques[currentPhase];

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
        <Text style={styles.headerTitle}>Skin Care Techniques</Text>
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
        <Text style={styles.expertButtonText}>Talk to Skin Expert</Text>
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
