import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { Calendar, CircleAlert as AlertCircle, Brain, Activity, Zap, Heart, Shield, Apple, ChefHat, Star, Clock, Users, Moon, Sun } from 'lucide-react-native';
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

const pcosSymptoms = [
  { name: 'Irregular Periods', severity: 'High', icon: '📅', color: '#FF6B6B' },
  { name: 'Weight Gain', severity: 'Medium', icon: '⚖️', color: '#4ECDC4' },
  { name: 'Hair Growth', severity: 'Medium', icon: '💇‍♀️', color: '#45B7D1' },
  { name: 'Acne', severity: 'Low', icon: '🔴', color: '#96CEB4' },
  { name: 'Mood Swings', severity: 'High', icon: '😔', color: '#FFEAA7' },
  { name: 'Insulin Resistance', severity: 'High', icon: '🍯', color: '#DDA0DD' },
];

// Removed deprecated health journey stages

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

  // Advanced Health Predictions based on cycle data
  const calculatePCOSRisk = () => {
    const cycleDay = calculateCycleDay();
    const cycleLength = profile.cycleLength;
    const isRegular = profile.isRegular;
    
    let riskScore = 0;
    let riskLevel = 'Low';
    let riskPercentage = 25;
    
    // Irregular cycles (major PCOS indicator)
    if (!isRegular || cycleLength < 21 || cycleLength > 35) {
      riskScore += 40;
    }
    
    // Very short cycles (< 21 days)
    if (cycleLength < 21) {
      riskScore += 30;
    }
    
    // Very long cycles (> 35 days)
    if (cycleLength > 35) {
      riskScore += 35;
    }
    
    // Extremely long cycles (> 45 days)
    if (cycleLength > 45) {
      riskScore += 50;
    }
    
    // Age factor (PCOS more common in reproductive age)
    if (profile.age && profile.age >= 15 && profile.age <= 35) {
      riskScore += 10;
    }
    
    // Determine risk level
    if (riskScore >= 70) {
      riskLevel = 'High';
      riskPercentage = 85;
    } else if (riskScore >= 40) {
      riskLevel = 'Medium';
      riskPercentage = 60;
    } else {
      riskLevel = 'Low';
      riskPercentage = 25;
    }
    
    return { riskScore, riskLevel, riskPercentage };
  };

  const calculateEndometriosisRisk = () => {
    const cycleDay = calculateCycleDay();
    const cycleLength = profile.cycleLength;
    
    let riskScore = 0;
    let riskLevel = 'Low';
    let riskPercentage = 20;
    
    // Short cycles (endometriosis can cause shorter cycles)
    if (cycleLength < 24) {
      riskScore += 25;
    }
    
    // Very heavy or painful periods (would need symptom tracking)
    // For now, we'll use cycle length as a proxy
    if (cycleLength < 26) {
      riskScore += 20;
    }
    
    // Age factor (endometriosis often develops in 20s-30s)
    if (profile.age && profile.age >= 20 && profile.age <= 40) {
      riskScore += 15;
    }
    
    // Family history would increase risk (not available in current data)
    
    if (riskScore >= 50) {
      riskLevel = 'High';
      riskPercentage = 75;
    } else if (riskScore >= 30) {
      riskLevel = 'Medium';
      riskPercentage = 45;
    } else {
      riskLevel = 'Low';
      riskPercentage = 20;
    }
    
    return { riskScore, riskLevel, riskPercentage };
  };

  const calculateFertilityScore = () => {
    const cycleDay = calculateCycleDay();
    const cycleLength = profile.cycleLength;
    const isRegular = profile.isRegular;
    const age = profile.age || 25;
    
    let fertilityScore = 0;
    let scorePercentage = 0;
    
    // Regular cycles (excellent for fertility)
    if (isRegular && cycleLength >= 26 && cycleLength <= 32) {
      fertilityScore += 40;
    }
    
    // Optimal cycle length (28-30 days)
    if (cycleLength >= 28 && cycleLength <= 30) {
      fertilityScore += 30;
    }
    
    // Age factor (peak fertility 20-30)
    if (age >= 20 && age <= 30) {
      fertilityScore += 25;
    } else if (age >= 31 && age <= 35) {
      fertilityScore += 15;
    } else if (age >= 36 && age <= 40) {
      fertilityScore += 5;
    }
    
    // Cycle regularity bonus
    if (isRegular) {
      fertilityScore += 20;
    }
    
    // Calculate percentage
    scorePercentage = Math.min(fertilityScore, 100);
    
    let scoreLevel = 'Good';
    if (scorePercentage >= 80) {
      scoreLevel = 'Excellent';
    } else if (scorePercentage >= 60) {
      scoreLevel = 'Good';
    } else if (scorePercentage >= 40) {
      scoreLevel = 'Fair';
    } else {
      scoreLevel = 'Needs Attention';
    }
    
    return { fertilityScore, scorePercentage, scoreLevel };
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
        <Text style={styles.title}>Cycle Insights</Text>
        <Text style={styles.subtitle}>Health starts with your cycle</Text>
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



      {/* Smart Notification System */}
      <View style={styles.notificationSection}>
        <View style={styles.sectionHeader}>
          <Zap size={24} color="#EC4899" />
          <Text style={styles.sectionTitle}>Smart Notifications</Text>
        </View>
        <Text style={styles.sectionSubtitle}>AI-powered daily guidance and reminders</Text>
        
        <View style={styles.notificationCards}>
          <TouchableOpacity style={styles.notificationCard}>
            <View style={styles.notificationIcon}>
              <Clock size={20} color="#EC4899" />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Period Reminder</Text>
              <Text style={styles.notificationSubtitle}>Expected in 3 days</Text>
              <Text style={styles.notificationTime}>Tomorrow at 8:00 AM</Text>
            </View>
            <View style={styles.notificationStatus}>
              <Text style={styles.statusText}>Active</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.notificationCard}>
            <View style={styles.notificationIcon}>
              <Heart size={20} color="#EC4899" />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Fertile Window</Text>
              <Text style={styles.notificationSubtitle}>Peak fertility days</Text>
              <Text style={styles.notificationTime}>Daily at 9:00 AM</Text>
            </View>
            <View style={styles.notificationStatus}>
              <Text style={styles.statusText}>Active</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.notificationCard}>
            <View style={styles.notificationIcon}>
              <Brain size={20} color="#EC4899" />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Health Check-in</Text>
              <Text style={styles.notificationSubtitle}>Log symptoms & mood</Text>
              <Text style={styles.notificationTime}>Daily at 7:00 PM</Text>
            </View>
            <View style={styles.notificationStatus}>
              <Text style={styles.statusText}>Active</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Engagement/gamification removed as requested */}

      {/* Predictive Health Analytics */}
      <View style={styles.analyticsSection}>
        <View style={styles.analyticsCard}>
          <View style={styles.analyticsHeader}>
            <Brain size={24} color="#EC4899" />
            <Text style={styles.analyticsTitle}>Predictive Health Analytics</Text>
          </View>
          
          <View style={styles.healthRisks}>
            {(() => {
              const pcosRisk = calculatePCOSRisk();
              const endometriosisRisk = calculateEndometriosisRisk();
              const fertilityScore = calculateFertilityScore();
              
              return (
                <>
                  <View style={styles.riskItem}>
                    <View style={styles.riskHeader}>
                      <Text style={styles.riskName}>PCOS Risk Assessment</Text>
                      <View style={[styles.riskLevel, { backgroundColor: pcosRisk.riskLevel === 'High' ? '#FF6B6B' : pcosRisk.riskLevel === 'Medium' ? '#F59E0B' : '#10B981' }]}>
                        <Text style={styles.riskLevelText}>{pcosRisk.riskLevel} Risk</Text>
                      </View>
                    </View>
                    <View style={styles.riskProgress}>
                      <View style={[styles.riskProgressFill, { width: `${pcosRisk.riskPercentage}%`, backgroundColor: pcosRisk.riskLevel === 'High' ? '#FF6B6B' : pcosRisk.riskLevel === 'Medium' ? '#F59E0B' : '#10B981' }]} />
                    </View>
                    <Text style={styles.riskDescription}>
                      {pcosRisk.riskLevel === 'High' 
                        ? `High risk detected based on cycle patterns (${profile.cycleLength} days). Consider consulting a specialist.`
                        : pcosRisk.riskLevel === 'Medium'
                        ? `Medium risk based on cycle patterns (${profile.cycleLength} days). Monitor symptoms closely.`
                        : `Based on your cycle patterns (${profile.cycleLength} days), you show low risk for PCOS. Continue monitoring.`
                      }
                    </Text>
                  </View>

                  <View style={styles.riskItem}>
                    <View style={styles.riskHeader}>
                      <Text style={styles.riskName}>Endometriosis Detection</Text>
                      <View style={[styles.riskLevel, { backgroundColor: endometriosisRisk.riskLevel === 'High' ? '#FF6B6B' : endometriosisRisk.riskLevel === 'Medium' ? '#F59E0B' : '#10B981' }]}>
                        <Text style={styles.riskLevelText}>{endometriosisRisk.riskLevel} Risk</Text>
                      </View>
                    </View>
                    <View style={styles.riskProgress}>
                      <View style={[styles.riskProgressFill, { width: `${endometriosisRisk.riskPercentage}%`, backgroundColor: endometriosisRisk.riskLevel === 'High' ? '#FF6B6B' : endometriosisRisk.riskLevel === 'Medium' ? '#F59E0B' : '#10B981' }]} />
                    </View>
                    <Text style={styles.riskDescription}>
                      {endometriosisRisk.riskLevel === 'High' 
                        ? `High risk detected. Consider consulting a specialist for evaluation.`
                        : endometriosisRisk.riskLevel === 'Medium'
                        ? `Medium risk detected. Monitor for symptoms like severe cramps and heavy bleeding.`
                        : `Low risk based on current cycle patterns. Continue monitoring.`
                      }
                    </Text>
                  </View>

                  <View style={styles.riskItem}>
                    <View style={styles.riskHeader}>
                      <Text style={styles.riskName}>Fertility Health Score</Text>
                      <View style={[styles.riskLevel, { backgroundColor: fertilityScore.scoreLevel === 'Excellent' ? '#10B981' : fertilityScore.scoreLevel === 'Good' ? '#22C55E' : fertilityScore.scoreLevel === 'Fair' ? '#F59E0B' : '#FF6B6B' }]}>
                        <Text style={styles.riskLevelText}>{fertilityScore.scoreLevel}</Text>
                      </View>
                    </View>
                    <View style={styles.riskProgress}>
                      <View style={[styles.riskProgressFill, { width: `${fertilityScore.scorePercentage}%`, backgroundColor: fertilityScore.scoreLevel === 'Excellent' ? '#10B981' : fertilityScore.scoreLevel === 'Good' ? '#22C55E' : fertilityScore.scoreLevel === 'Fair' ? '#F59E0B' : '#FF6B6B' }]} />
                    </View>
                    <Text style={styles.riskDescription}>
                      {fertilityScore.scoreLevel === 'Excellent' 
                        ? `Excellent fertility indicators! Your cycle patterns (${profile.cycleLength} days) and age (${profile.age || 'N/A'}) are optimal.`
                        : fertilityScore.scoreLevel === 'Good'
                        ? `Good fertility indicators. Your cycle patterns are healthy. Maintain current lifestyle habits.`
                        : fertilityScore.scoreLevel === 'Fair'
                        ? `Fair fertility indicators. Consider lifestyle improvements and cycle optimization.`
                        : `Fertility indicators need attention. Consider consulting a specialist for personalized guidance.`
                      }
                    </Text>
                  </View>
                </>
              );
            })()}
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
  journeySection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  journeyScroll: {
    marginBottom: 16,
  },
  journeyCard: {
    width: 140,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  journeyIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  journeyEmoji: {
    fontSize: 24,
  },
  journeyStage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
    textAlign: 'center',
  },
  journeyAge: {
    fontSize: 12,
    color: '#EC4899',
    fontWeight: '500',
    marginBottom: 4,
  },
  journeyDescription: {
    fontSize: 11,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  pcosSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  pcosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  pcosCard: {
    width: (width - 64) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  pcosIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  pcosEmoji: {
    fontSize: 20,
  },
  pcosName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  pcosActionButton: {
    backgroundColor: '#EC4899',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignSelf: 'center',
  },
  pcosActionText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  notificationSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  notificationCards: {
    gap: 12,
  },
  notificationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FCE7F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  notificationSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  notificationTime: {
    fontSize: 12,
    color: '#EC4899',
    fontWeight: '500',
  },
  notificationStatus: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  engagementSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  engagementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  engagementCard: {
    width: (width - 64) / 2,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  engagementGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  engagementEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  engagementTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
    textAlign: 'center',
  },
  engagementSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    textAlign: 'center',
  },
  socialProofSection: {
    marginBottom: 20,
  },
  socialProofCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  socialProofHeader: {
    marginBottom: 16,
  },
  socialProofTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  socialProofSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  socialProofStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialStat: {
    alignItems: 'center',
  },
  socialStatNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#EC4899',
    marginBottom: 4,
  },
  socialStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  urgencySection: {
    marginBottom: 20,
  },
  urgencyCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  urgencyGradient: {
    padding: 20,
    alignItems: 'center',
  },
  urgencyEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  urgencyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  urgencySubtitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 12,
  },
  urgencyTimer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  timerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  rewardsSection: {
    marginBottom: 20,
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  rewardsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  rewardCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  rewardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FCE7F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  rewardEmoji: {
    fontSize: 20,
  },
  rewardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  rewardSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  rewardProgress: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  rewardProgressFill: {
    height: '100%',
    backgroundColor: '#EC4899',
    borderRadius: 2,
  },
  lossAversionSection: {
    marginBottom: 20,
  },
  lossCard: {
    backgroundColor: '#FFF3CD',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  lossTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 4,
  },
  lossSubtitle: {
    fontSize: 14,
    color: '#92400E',
    marginBottom: 12,
  },
  lossStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  lossStat: {
    alignItems: 'center',
  },
  lossStatNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 4,
  },
  lossStatLabel: {
    fontSize: 12,
    color: '#92400E',
  },
  lossButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignSelf: 'center',
  },
  lossButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  comparisonSection: {
    marginBottom: 20,
  },
  comparisonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  leaderboard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  currentUserItem: {
    backgroundColor: '#FCE7F3',
    borderRadius: 8,
    marginHorizontal: -8,
    paddingHorizontal: 8,
  },
  leaderboardRank: {
    width: 30,
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  leaderboardInfo: {
    flex: 1,
  },
  leaderboardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  leaderboardScore: {
    fontSize: 14,
    color: '#6b7280',
  },
  leaderboardBadge: {
    width: 30,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 20,
  },
});