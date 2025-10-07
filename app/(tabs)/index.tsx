import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { Calendar, Droplet, Heart, TrendingUp, Users, Zap, Shield, Sparkles, Activity, AlertTriangle, Star, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { HormonePredictionService, HealthCategory, CyclePhase } from '@/services/HormonePredictionService';

export default function HomeScreen() {
  const { profile } = useUser();
  const router = useRouter();
  const [hormoneService] = useState(() => HormonePredictionService.getInstance());
  const [healthPredictions, setHealthPredictions] = useState<any[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<CyclePhase>(CyclePhase.FOLLICULAR);

  useEffect(() => {
    const initializeHormoneService = async () => {
      if (profile.lastPeriodDate) {
        const cycleData = {
          lastPeriodDate: new Date(profile.lastPeriodDate),
          cycleLength: profile.cycleLength
        };
        await hormoneService.initialize(profile, cycleData);
        
        const predictions = hormoneService.getAllHealthPredictions();
        const score = hormoneService.getOverallWellnessScore();
        const phase = hormoneService.getCurrentCyclePhase();
        
        setHealthPredictions(predictions);
        setOverallScore(score);
        setCurrentPhase(phase);
      }
    };

    initializeHormoneService();
  }, [profile.lastPeriodDate, profile.cycleLength]);

  const calculateCycleDay = () => {
    if (!profile.lastPeriodDate) return 1;
    const today = new Date();
    const lastPeriod = new Date(profile.lastPeriodDate);
    const diffTime = Math.abs(today.getTime() - lastPeriod.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return (diffDays % profile.cycleLength) || 1;
  };

  const getCyclePhaseInfo = (phase: CyclePhase) => {
    const phaseMap = {
      [CyclePhase.MENSTRUAL]: { name: 'Menstrual', color: '#e91e63', icon: '🩸', description: 'Rest & Renewal' },
      [CyclePhase.FOLLICULAR]: { name: 'Follicular', color: '#9c27b0', icon: '🌱', description: 'Energy Rising' },
      [CyclePhase.OVULATORY]: { name: 'Ovulatory', color: '#4caf50', icon: '🌸', description: 'Peak Power' },
      [CyclePhase.LUTEAL]: { name: 'Luteal', color: '#2196f3', icon: '🌙', description: 'Preparation' }
    };
    return phaseMap[phase];
  };

  const cycleDay = calculateCycleDay();
  const phaseInfo = getCyclePhaseInfo(currentPhase);

  const getPredictionColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getPredictionIcon = (category: string) => {
    switch (category) {
      case 'hair': return '💇‍♀️';
      case 'skin': return '✨';
      case 'weight': return '⚖️';
      case 'energy': return '⚡';
      case 'mood': return '😊';
      case 'sleep': return '😴';
      default: return '💪';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Your Health Predictions</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
      </View>

      {/* Current Phase Status */}
      <LinearGradient
        colors={[phaseInfo.color + '20', phaseInfo.color + '10']}
        style={styles.phaseCard}
      >
        <View style={styles.phaseHeader}>
          <Text style={styles.phaseIcon}>{phaseInfo.icon}</Text>
          <View style={styles.phaseInfo}>
            <Text style={styles.phaseName}>{phaseInfo.name} Phase</Text>
            <Text style={styles.phaseDescription}>Day {cycleDay} • {phaseInfo.description}</Text>
          </View>
        </View>
        <View style={styles.overallScore}>
          <Text style={styles.scoreLabel}>Overall Health Score</Text>
          <Text style={[styles.scoreValue, { color: phaseInfo.color }]}>{overallScore}/100</Text>
        </View>
      </LinearGradient>

      {/* Health Predictions */}
      <Text style={styles.sectionTitle}>Today's Health Predictions</Text>
      
      <View style={styles.predictionsContainer}>
        {healthPredictions.slice(0, 6).map((prediction, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.predictionCard, { borderLeftColor: getPredictionColor(prediction.score) }]}
            onPress={() => {
              Alert.alert(
                `${prediction.category.charAt(0).toUpperCase() + prediction.category.slice(1)} Health`,
                `Score: ${prediction.score}/100\nTrend: ${prediction.trend}\n\nRecommendations:\n${prediction.recommendations.slice(0, 2).join('\n')}`,
                [
                  { text: 'Talk to Expert', onPress: () => router.push('/experts') },
                  { text: 'View Details', onPress: () => {} },
                  { text: 'Close', style: 'cancel' }
                ]
              );
            }}
          >
            <View style={styles.predictionHeader}>
              <Text style={styles.predictionIcon}>{getPredictionIcon(prediction.category)}</Text>
              <View style={styles.predictionScore}>
                <Text style={[styles.scoreNumber, { color: getPredictionColor(prediction.score) }]}>
                  {prediction.score}
                </Text>
                <Text style={styles.scoreLabel}>/100</Text>
              </View>
            </View>
            <Text style={styles.predictionCategory}>
              {prediction.category.charAt(0).toUpperCase() + prediction.category.slice(1)}
            </Text>
            <View style={styles.predictionTrend}>
              <Text style={styles.trendText}>
                {prediction.trend === 'improving' ? '📈 Improving' :
                 prediction.trend === 'stable' ? '➡️ Stable' : '📉 Needs Attention'}
              </Text>
              <ArrowRight size={16} color="#6B7280" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Expert Recommendations */}
      <Text style={styles.sectionTitle}>Expert Recommendations</Text>
      
      <View style={styles.recommendationsGrid}>
        <TouchableOpacity 
          style={[styles.recommendationCard, { backgroundColor: '#F0FDF4' }]}
          onPress={() => router.push('/experts')}
        >
          <Users size={24} color="#10B981" />
          <Text style={styles.recommendationTitle}>Talk to Expert</Text>
          <Text style={styles.recommendationDesc}>Get personalized advice for your cycle phase</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.recommendationCard, { backgroundColor: '#FEF3F2' }]}
          onPress={() => Alert.alert('Supplements', 'Recommended supplements for your current phase:\n\n' + hormoneService.getSupplementRecommendations().slice(0, 4).join('\n'))}
        >
          <Zap size={24} color="#EF4444" />
          <Text style={styles.recommendationTitle}>Supplements</Text>
          <Text style={styles.recommendationDesc}>Essential nutrients for your phase</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.actionGrid}>
        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: '#fff5f7' }]}
          onPress={() => router.push('/log/period')}
        >
          <Droplet size={32} color="#e91e63" />
          <Text style={styles.actionText}>Log Period</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: '#f3f9ff' }]}
          onPress={() => router.push('/log/symptoms')}
        >
          <Heart size={32} color="#2196f3" />
          <Text style={styles.actionText}>Log Symptoms</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: '#f1f8f4' }]}
          onPress={() => router.push('/fertility')}
        >
          <TrendingUp size={32} color="#4caf50" />
          <Text style={styles.actionText}>View Insights</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: '#f0fdf4' }]}
          onPress={() => router.push('/experts')}
        >
          <Users size={32} color="#10B981" />
          <Text style={styles.actionText}>Talk to Expert</Text>
        </TouchableOpacity>
      </View>

      {/* Personalized Recommendations */}
      <View style={styles.insightCard}>
        <Text style={styles.insightTitle}>Today's Recommendations</Text>
        <View style={styles.recommendationsContainer}>
          <View style={styles.recommendationItem}>
            <Shield size={20} color="#10B981" />
            <Text style={styles.recommendationText}>
              {hormoneService.getLifestyleRecommendations().slice(0, 2).join(', ')}
            </Text>
          </View>
          <View style={styles.recommendationItem}>
            <Activity size={20} color="#3b82f6" />
            <Text style={styles.recommendationText}>
              Supplements: {hormoneService.getSupplementRecommendations().slice(0, 3).join(', ')}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  phaseCard: {
    margin: 24,
    marginTop: 0,
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  phaseIcon: {
    fontSize: 48,
    marginRight: 16,
  },
  phaseInfo: {
    flex: 1,
  },
  phaseName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  phaseDescription: {
    fontSize: 14,
    color: '#666',
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 10,
    color: '#999',
  },
  focusCard: {
    margin: 24,
    marginTop: 0,
    padding: 20,
    backgroundColor: '#fffbf0',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ffe082',
  },
  focusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  focusContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  focusIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  focusText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 21,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 24,
  },
  actionCard: {
    width: '47%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    gap: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  insightCard: {
    margin: 24,
    marginTop: 0,
    padding: 24,
    backgroundColor: '#f3f9ff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  miniChartWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 16,
  },
  healthCard: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    padding: 12,
  },
  healthCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  healthIcon: { fontSize: 20 },
  healthScore: { fontSize: 16, fontWeight: '700', color: '#111827' },
  healthCategory: { fontSize: 14, fontWeight: '600', color: '#111827' },
  healthTrend: { fontSize: 12, color: '#6b7280', marginTop: 4 },
  recommendationsContainer: {
    gap: 10,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  recommendationText: {
    fontSize: 14,
    color: '#1f2937',
    flex: 1,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  score: {
    fontSize: 56,
    fontWeight: '700',
    color: '#2196f3',
    marginRight: 20,
  },
  scoreDetails: {
    flex: 1,
  },
  scoreLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  scoreDesc: {
    fontSize: 14,
    color: '#666',
  },
  predictionsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  predictionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  predictionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  predictionIcon: {
    fontSize: 24,
  },
  predictionScore: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreNumber: {
    fontSize: 24,
    fontWeight: '700',
  },
  predictionCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  predictionTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trendText: {
    fontSize: 14,
    color: '#6B7280',
  },
  recommendationsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  recommendationCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 8,
    marginBottom: 4,
  },
  recommendationDesc: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});
