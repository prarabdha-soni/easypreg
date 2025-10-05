import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { Calendar, TrendingUp, CircleAlert as AlertCircle, Brain, Activity, Zap, Heart, Shield, Apple, ChefHat, Star, Clock, Users, Moon, Sun } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const fertilityFoods = [
  { name: 'Shatavari', benefit: 'Hormonal Balance', icon: '🌸', color: '#FFB6C1' },
  { name: 'Ashwagandha', benefit: 'Stress Relief', icon: '🌿', color: '#98FB98' },
  { name: 'Golden Milk', benefit: 'Anti-inflammatory', icon: '🥛', color: '#FFD700' },
  { name: 'Soaked Almonds', benefit: 'Vitamin E', icon: '🥜', color: '#DEB887' },
  { name: 'Coconut Water', benefit: 'Electrolytes', icon: '🥥', color: '#F0E68C' },
  { name: 'Moong Dal', benefit: 'Protein', icon: '🫘', color: '#90EE90' },
];

const wellnessActivities = [
  { title: 'Morning Yoga', duration: '15 min', icon: '🧘‍♀️', color: '#FF69B4' },
  { title: 'Meditation', duration: '10 min', icon: '🕯️', color: '#9370DB' },
  { title: 'Breathing Exercise', duration: '5 min', icon: '🌬️', color: '#87CEEB' },
  { title: 'Evening Walk', duration: '20 min', icon: '🚶‍♀️', color: '#FFA07A' },
];

export default function FertilityScreen() {
  const { profile } = useUser();

  const calculateCycleDay = () => {
    if (!profile.lastPeriodDate) return 1;
    const today = new Date();
    const lastPeriod = new Date(profile.lastPeriodDate);
    
    const diffTime = today.getTime() - lastPeriod.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const cycleDay = (diffDays % profile.cycleLength) + 1;
    return cycleDay;
  };

  const getFertileWindow = () => {
    const cycleDay = calculateCycleDay();
    const ovulationDay = profile.cycleLength - 14;
    const fertileStart = ovulationDay - 5;
    const fertileEnd = ovulationDay + 1;
    
    const nextPeriodDate = new Date(profile.lastPeriodDate);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + profile.cycleLength);
    
    const nextOvulationDate = new Date(nextPeriodDate);
    nextOvulationDate.setDate(nextOvulationDate.getDate() - 14);
    
    const nextFertileStart = new Date(nextOvulationDate);
    nextFertileStart.setDate(nextFertileStart.getDate() - 5);
    
    const nextFertileEnd = new Date(nextOvulationDate);
    nextFertileEnd.setDate(nextFertileEnd.getDate() + 1);

    if (cycleDay >= fertileStart && cycleDay <= fertileEnd) {
      return { 
        status: 'high', 
        day: cycleDay, 
        daysLeft: fertileEnd - cycleDay,
        nextFertileStart: nextFertileStart,
        nextFertileEnd: nextFertileEnd,
        ovulationDate: nextOvulationDate
      };
    } else if (cycleDay < fertileStart) {
      return { 
        status: 'medium', 
        day: cycleDay, 
        daysLeft: fertileStart - cycleDay,
        nextFertileStart: nextFertileStart,
        nextFertileEnd: nextFertileEnd,
        ovulationDate: nextOvulationDate
      };
    } else {
      return { 
        status: 'low', 
        day: cycleDay, 
        daysLeft: profile.cycleLength - cycleDay + fertileStart,
        nextFertileStart: nextFertileStart,
        nextFertileEnd: nextFertileEnd,
        ovulationDate: nextOvulationDate
      };
    }
  };

  const renderCalendar = () => {
    const days = [];
    const today = calculateCycleDay();
    const fertile = getFertileWindow();
    
    const ovulationDay = profile.cycleLength - 14;
    const fertileStart = ovulationDay - 5;
    const fertileEnd = ovulationDay + 1;

    for (let i = 1; i <= profile.cycleLength; i++) {
      let color = '#F8F9FA';
      let textColor = '#6B7280';

      if (i <= 5) {
        color = '#FEE2E2';
        textColor = '#EF4444';
      } else if (i >= fertileStart && i <= fertileEnd) {
        color = '#DCFCE7';
        textColor = '#16A34A';
      } else if (i === ovulationDay) {
        color = '#FECACA';
        textColor = '#DC2626';
      }

      if (i === today) {
        days.push(
          <View key={i} style={[styles.calendarDay, { backgroundColor: '#EC4899' }]}>
            <Text style={[styles.calendarDayText, { color: '#FFFFFF', fontWeight: '700' }]}>{i}</Text>
          </View>
        );
      } else {
        days.push(
          <View key={i} style={[styles.calendarDay, { backgroundColor: color }]}>
            <Text style={[styles.calendarDayText, { color: textColor }]}>{i}</Text>
          </View>
        );
      }
    }

    return days;
  };

  const fertile = getFertileWindow();

  return (
    <ScrollView style={styles.container}>
      {/* Header with Soft Gradient */}
      <LinearGradient
        colors={['#FFB6C1', '#FFC0CB', '#FFE4E1']}
        style={styles.header}
      >
        <Text style={styles.title}>Your Health Journey</Text>
        <Text style={styles.subtitle}>Track your cycle and nourish your body</Text>
      </LinearGradient>

      {/* Today's Status Card */}
      <View style={styles.statusCard}>
        <LinearGradient
          colors={
            fertile.status === 'high'
              ? ['#FF69B4', '#FFB6C1']
              : fertile.status === 'medium'
              ? ['#FFA500', '#FFD700']
              : ['#9370DB', '#DDA0DD']
          }
          style={styles.statusGradient}
        >
          <View style={styles.statusHeader}>
            <Text style={styles.statusEmoji}>
              {fertile.status === 'high' ? '🌸' : fertile.status === 'medium' ? '🌺' : '🌙'}
            </Text>
            <View style={styles.statusInfo}>
              <Text style={styles.statusTitle}>
                {fertile.status === 'high' ? 'High Fertility' : fertile.status === 'medium' ? 'Approaching Fertile Window' : 'Low Fertility'}
              </Text>
              <Text style={styles.statusSubtitle}>
                {fertile.status === 'high'
                  ? `You're in your fertile window! ${fertile.daysLeft} day${fertile.daysLeft !== 1 ? 's' : ''} remaining.`
                  : fertile.status === 'medium'
                  ? `Your fertile window starts in ${fertile.daysLeft} day${fertile.daysLeft !== 1 ? 's' : ''}.`
                  : `Next fertile window in ${fertile.daysLeft} day${fertile.daysLeft !== 1 ? 's' : ''}.`}
              </Text>
            </View>
          </View>
          
          <View style={styles.fertilityMeter}>
            <View style={styles.meterTrack}>
              <View
                style={[
                  styles.meterFill,
                  {
                    width: fertile.status === 'high' ? '100%' : fertile.status === 'medium' ? '60%' : '20%',
                  }
                ]}
              />
            </View>
            <View style={styles.meterLabels}>
              <Text style={styles.meterLabel}>Low</Text>
              <Text style={styles.meterLabel}>Medium</Text>
              <Text style={styles.meterLabel}>High</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Cycle Calendar */}
      <View style={styles.calendarSection}>
        <View style={styles.sectionHeader}>
          <Calendar size={24} color="#EC4899" />
          <Text style={styles.sectionTitle}>Your Cycle</Text>
        </View>
        
        <View style={styles.calendarContainer}>
          <View style={styles.calendarGrid}>
            {renderCalendar()}
          </View>
          
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
              <Text style={styles.legendText}>Period</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#16A34A' }]} />
              <Text style={styles.legendText}>Fertile</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#EC4899' }]} />
              <Text style={styles.legendText}>Today</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Fertility-Boosting Foods */}
      <View style={styles.foodsSection}>
        <View style={styles.sectionHeader}>
          <Apple size={24} color="#EC4899" />
          <Text style={styles.sectionTitle}>Fertility-Boosting Foods</Text>
        </View>
        
        <View style={styles.foodsGrid}>
          {fertilityFoods.map((food, index) => (
            <TouchableOpacity key={index} style={styles.foodCard}>
              <View style={[styles.foodIcon, { backgroundColor: food.color }]}>
                <Text style={styles.foodEmoji}>{food.icon}</Text>
              </View>
              <Text style={styles.foodName}>{food.name}</Text>
              <Text style={styles.foodBenefit}>{food.benefit}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Wellness Activities */}
      <View style={styles.wellnessSection}>
        <View style={styles.sectionHeader}>
          <Heart size={24} color="#EC4899" />
          <Text style={styles.sectionTitle}>Daily Wellness</Text>
        </View>
        
        <View style={styles.activitiesGrid}>
          {wellnessActivities.map((activity, index) => (
            <TouchableOpacity key={index} style={styles.activityCard}>
              <LinearGradient
                colors={[activity.color, `${activity.color}80`]}
                style={styles.activityGradient}
              >
                <Text style={styles.activityIcon}>{activity.icon}</Text>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDuration}>{activity.duration}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Predictive Health Analytics */}
      <View style={styles.analyticsSection}>
        <View style={styles.analyticsCard}>
          <View style={styles.analyticsHeader}>
            <Brain size={24} color="#EC4899" />
            <Text style={styles.analyticsTitle}>Predictive Health Analytics</Text>
          </View>
          
          <View style={styles.healthRisks}>
            <View style={styles.riskItem}>
              <View style={styles.riskHeader}>
                <Text style={styles.riskName}>PCOS Risk Assessment</Text>
                <View style={styles.riskLevel}>
                  <Text style={styles.riskLevelText}>Low Risk</Text>
                </View>
              </View>
              <View style={styles.riskProgress}>
                <View style={[styles.riskProgressFill, { width: '25%', backgroundColor: '#10B981' }]} />
              </View>
              <Text style={styles.riskDescription}>
                Based on your cycle patterns, you show low risk for PCOS. Continue monitoring.
              </Text>
            </View>

            <View style={styles.riskItem}>
              <View style={styles.riskHeader}>
                <Text style={styles.riskName}>Endometriosis Detection</Text>
                <View style={styles.riskLevel}>
                  <Text style={styles.riskLevelText}>Monitor</Text>
                </View>
              </View>
              <View style={styles.riskProgress}>
                <View style={[styles.riskProgressFill, { width: '40%', backgroundColor: '#F59E0B' }]} />
              </View>
              <Text style={styles.riskDescription}>
                Some symptoms detected. Consider consulting a specialist for evaluation.
              </Text>
            </View>

            <View style={styles.riskItem}>
              <View style={styles.riskHeader}>
                <Text style={styles.riskName}>Fertility Health Score</Text>
                <View style={styles.riskLevel}>
                  <Text style={styles.riskLevelText}>Good</Text>
                </View>
              </View>
              <View style={styles.riskProgress}>
                <View style={[styles.riskProgressFill, { width: '75%', backgroundColor: '#EC4899' }]} />
              </View>
              <Text style={styles.riskDescription}>
                Your fertility indicators are positive. Maintain healthy lifestyle habits.
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.detailedAnalysisButton}>
            <Text style={styles.detailedAnalysisText}>Get Detailed Health Report</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* AI Insights */}
      <View style={styles.aiSection}>
        <View style={styles.aiCard}>
          <View style={styles.aiHeader}>
            <Brain size={24} color="#EC4899" />
            <Text style={styles.aiTitle}>AI Health Insights</Text>
          </View>
          
          <View style={styles.aiInsight}>
            <Text style={styles.aiInsightTitle}>Today's Recommendation</Text>
            <Text style={styles.aiInsightText}>
              Based on your cycle, try gentle yoga and include more leafy greens in your meals today.
            </Text>
          </View>
          
          <View style={styles.aiFeatures}>
            <View style={styles.aiFeature}>
              <Zap size={16} color="#EC4899" />
              <Text style={styles.aiFeatureText}>Smart predictions</Text>
            </View>
            <View style={styles.aiFeature}>
              <TrendingUp size={16} color="#EC4899" />
              <Text style={styles.aiFeatureText}>Pattern analysis</Text>
            </View>
            <View style={styles.aiFeature}>
              <Heart size={16} color="#EC4899" />
              <Text style={styles.aiFeatureText}>Personalized tips</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Tips */}
      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>💖 Daily Health Tips</Text>
        <View style={styles.tipsList}>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>💧</Text>
            <Text style={styles.tipText}>Stay hydrated - drink 8-10 glasses of water</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>🥗</Text>
            <Text style={styles.tipText}>Include leafy greens in every meal</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>😌</Text>
            <Text style={styles.tipText}>Practice 10 minutes of meditation</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>🌙</Text>
            <Text style={styles.tipText}>Get 7-8 hours of quality sleep</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF7F7',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    opacity: 0.9,
  },
  statusCard: {
    margin: 20,
    marginTop: -16,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#EC4899',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  statusGradient: {
    padding: 24,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    lineHeight: 20,
  },
  fertilityMeter: {
    marginTop: 8,
  },
  meterTrack: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  meterFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  meterLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  meterLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    fontWeight: '500',
  },
  calendarSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#EC4899',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  calendarDay: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarDayText: {
    fontSize: 14,
    fontWeight: '600',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  foodsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  foodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  foodCard: {
    width: (width - 64) / 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#EC4899',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  foodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  foodEmoji: {
    fontSize: 24,
  },
  foodName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  foodBenefit: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  wellnessSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  activityCard: {
    width: (width - 64) / 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  activityGradient: {
    padding: 20,
    alignItems: 'center',
  },
  activityIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  activityDuration: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  aiSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  aiCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#EC4899',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  aiInsight: {
    backgroundColor: '#FEF7F7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  aiInsightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  aiInsightText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  aiFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  aiFeature: {
    alignItems: 'center',
    flex: 1,
  },
  aiFeatureText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  tipsSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  tipsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#EC4899',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  tipIcon: {
    fontSize: 20,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  analyticsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  analyticsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#EC4899',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  analyticsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  analyticsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  healthRisks: {
    marginBottom: 20,
  },
  riskItem: {
    marginBottom: 20,
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  riskName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  riskLevel: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskLevelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  riskProgress: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  riskProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  riskDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  detailedAnalysisButton: {
    backgroundColor: '#EC4899',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  detailedAnalysisText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});