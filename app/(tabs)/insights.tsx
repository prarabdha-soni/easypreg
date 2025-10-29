import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { 
  Brain, TrendingUp, TrendingDown, Flame, Moon, Heart, Activity, 
  Sparkles, AlertCircle, ChevronRight, Info 
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';

export default function StageInsights() {
  const router = useRouter();
  const { profile } = useUser();

  const isPCOS = profile.healthCondition === 'pcos' || profile.healthCondition === 'pcod';

  const pcosInsights = [
    {
      id: 1,
      title: 'Weight Trend Analysis',
      description: 'You\'ve lost 1.2kg this month! Your consistent exercise and low-GI diet are working.',
      action: 'View Plan',
      actionRoute: '/education/pcos-diet',
      icon: Activity,
      color: '#10B981',
      bg: '#ECFDF5',
      severity: 'positive',
    },
    {
      id: 2,
      title: 'Cycle Regularity Improving',
      description: 'Your cycle has regulated to 28-30 days. This is a great sign of hormonal balance!',
      action: 'Continue Tracking',
      actionRoute: null,
      icon: Heart,
      color: '#EC4899',
      bg: '#FDF2F8',
      severity: 'positive',
    },
    {
      id: 3,
      title: 'Blood Sugar Management',
      description: 'Post-meal walks have helped reduce cravings by 40%. Keep up this habit!',
      action: 'Learn More',
      actionRoute: '/treatment/pcos',
      icon: Sparkles,
      color: '#F59E0B',
      bg: '#FFFBEB',
      severity: 'moderate',
    },
  ];

  const menopauseInsights = [
    {
      id: 1,
      title: 'Sleep Issues Increased',
      description: 'Your sleep disturbances have increased by 30% this month. Night sweats may be the cause.',
      action: 'Try These Tips',
      actionRoute: '/education/sleep',
      icon: Moon,
      color: '#6366F1',
      bg: '#EEF2FF',
      severity: 'moderate',
    },
    {
      id: 2,
      title: 'Hot Flashes Pattern',
      description: 'Hot flashes peak between 2-4 PM and after evening meals. Avoid spicy foods and caffeine.',
      action: 'Learn More',
      actionRoute: '/education/lifestyle',
      icon: Flame,
      color: '#EF4444',
      bg: '#FEF2F2',
      severity: 'high',
    },
    {
      id: 3,
      title: 'Mood Stability Improving',
      description: 'Your mood has been 25% more stable this week. Exercise and sleep improvements are helping!',
      action: 'Continue',
      actionRoute: null,
      icon: Heart,
      color: '#10B981',
      bg: '#ECFDF5',
      severity: 'positive',
    },
  ];

  const stageInsights = isPCOS ? pcosInsights : menopauseInsights;

  const pcosEducation = [
    {
      title: 'Understanding Insulin Resistance',
      description: 'PCOS often involves insulin resistance, which affects weight, energy, and hormone balance. Diet and exercise are powerful tools.',
      stage: profile.healthCondition,
    },
    {
      title: 'Androgen Balance',
      description: 'Elevated androgens cause symptoms like acne, hair growth, and irregular periods. Treatment helps restore balance.',
      stage: profile.healthCondition,
    },
  ];

  const menopauseEducation = [
    {
      title: 'Understanding Estrogen Decline',
      description: 'During perimenopause, estrogen levels fluctuate irregularly before declining. This affects sleep, mood, and temperature regulation.',
      stage: profile.menopauseStage,
    },
    {
      title: 'Bone Health Focus',
      description: profile.menopauseStage === 'postmenopause' 
        ? 'Postmenopause increases osteoporosis risk. Weight-bearing exercise and calcium are crucial.'
        : 'Declining estrogen affects bone density. Start weight-bearing exercises now.',
      stage: profile.menopauseStage,
    },
  ];

  const hormoneEducation = isPCOS ? pcosEducation : menopauseEducation;

  const pcosSymptomTrends = [
    { symptom: 'Weight', thisWeek: 65.5, lastWeek: 66.7, change: -1.8, color: '#10B981', unit: 'kg' },
    { symptom: 'Energy Level', thisWeek: 7, lastWeek: 6, change: 16.7, color: '#F59E0B', unit: '/10' },
    { symptom: 'Mood Score', thisWeek: 8, lastWeek: 7, change: 14.3, color: '#EC4899', unit: '/10' },
    { symptom: 'Sleep Hours', thisWeek: 7.5, lastWeek: 6.5, change: 15.4, color: '#6366F1', unit: 'hrs' },
  ];

  const menopauseSymptomTrends = [
    { symptom: 'Hot Flashes', thisWeek: 12, lastWeek: 15, change: -20, color: '#EF4444', unit: 'count' },
    { symptom: 'Night Sweats', thisWeek: 8, lastWeek: 10, change: -20, color: '#6366F1', unit: 'count' },
    { symptom: 'Brain Fog', thisWeek: 5, lastWeek: 5, change: 0, color: '#F59E0B', unit: 'count' },
    { symptom: 'Mood Swings', thisWeek: 4, lastWeek: 6, change: -33, color: '#EC4899', unit: 'count' },
  ];

  const symptomTrends = isPCOS ? pcosSymptomTrends : menopauseSymptomTrends;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Banner */}
      <View style={styles.headerBanner}>
        <Brain size={32} color="#FFFFFF" />
        <Text style={styles.headerTitle}>{isPCOS ? 'PCOS Insights' : 'Stage Insights'}</Text>
        <Text style={styles.headerSubtitle}>
          Personalized analysis for {
            isPCOS
              ? (profile.healthCondition === 'pcos' ? 'PCOS management' : 'PCOD management')
              : (profile.menopauseStage === 'perimenopause' ? 'perimenopause'
                  : profile.menopauseStage === 'menopause' ? 'menopause'
                  : profile.menopauseStage === 'postmenopause' ? 'postmenopause'
                  : 'your journey')
          }
        </Text>
      </View>

      {/* AI Insights */}
      <View style={[styles.section, styles.firstSection]}>
        <View style={styles.sectionHeader}>
          <Sparkles size={20} color="#8B5A8F" />
          <Text style={styles.sectionTitle}>AI-Powered Insights</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          Based on your symptom patterns and stage
        </Text>

        {stageInsights.map((insight) => {
          const IconComponent = insight.icon;
          return (
            <View key={insight.id} style={[
              styles.insightCard,
              { borderLeftWidth: 4, borderLeftColor: insight.color }
            ]}>
              <View style={styles.insightHeader}>
                <View style={[styles.insightIcon, { backgroundColor: insight.bg }]}>
                  <IconComponent size={20} color={insight.color} />
                </View>
                <View style={styles.insightContent}>
                  <Text style={styles.insightTitle}>{insight.title}</Text>
                  <Text style={styles.insightDescription}>{insight.description}</Text>
                </View>
              </View>
              {insight.actionRoute && (
                <TouchableOpacity 
                  style={styles.insightAction}
                  onPress={() => insight.actionRoute && router.push(insight.actionRoute as any)}
                >
                  <Text style={[styles.insightActionText, { color: insight.color }]}>
                    {insight.action}
                  </Text>
                  <ChevronRight size={16} color={insight.color} />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>

      {/* Symptom Trends Graph */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <TrendingUp size={20} color="#10B981" />
          <Text style={styles.sectionTitle}>Symptom Trends</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          Week-over-week comparison
        </Text>

        <View style={styles.trendsCard}>
          {symptomTrends.map((trend, index) => (
            <View 
              key={index} 
              style={[
                styles.trendRow,
                index < symptomTrends.length - 1 && styles.trendRowBorder
              ]}
            >
              <View style={styles.trendInfo}>
                <Text style={styles.trendSymptom}>{trend.symptom}</Text>
                <Text style={styles.trendCount}>
                  {trend.thisWeek} occurrences (was {trend.lastWeek})
                </Text>
              </View>
              
              {/* Simple bar visualization */}
              <View style={styles.trendBars}>
                <View style={styles.barContainer}>
                  <View style={[
                    styles.bar,
                    { width: `${(trend.lastWeek / 20) * 100}%`, backgroundColor: '#E5E7EB' }
                  ]} />
                </View>
                <View style={styles.barContainer}>
                  <View style={[
                    styles.bar,
                    { width: `${(trend.thisWeek / 20) * 100}%`, backgroundColor: trend.color }
                  ]} />
                </View>
              </View>

              <View style={[
                styles.changeLabel,
                trend.change < 0 ? styles.changeLabelPositive : styles.changeLabelNeutral
              ]}>
                {trend.change < 0 ? (
                  <TrendingDown size={14} color="#10B981" />
                ) : trend.change > 0 ? (
                  <TrendingUp size={14} color="#EF4444" />
                ) : (
                  <TrendingUp size={14} color="#6B7280" />
                )}
                <Text style={[
                  styles.changeText,
                  trend.change < 0 ? { color: '#10B981' } : 
                  trend.change > 0 ? { color: '#EF4444' } : 
                  { color: '#6B7280' }
                ]}>
                  {trend.change === 0 ? 'Stable' : `${Math.abs(trend.change)}%`}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Educational Content */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Info size={20} color="#8B5A8F" />
          <Text style={styles.sectionTitle}>Understanding Your Stage</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          Learn about hormone changes and self-care
        </Text>

        {hormoneEducation.map((edu, index) => (
          <View key={index} style={styles.eduCard}>
            <Text style={styles.eduTitle}>{edu.title}</Text>
            <Text style={styles.eduDescription}>{edu.description}</Text>
            <TouchableOpacity style={styles.eduButton}>
              <Text style={styles.eduButtonText}>Read More</Text>
              <ChevronRight size={14} color="#8B5A8F" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Actionable Recommendations */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <AlertCircle size={20} color="#F59E0B" />
          <Text style={styles.sectionTitle}>Recommended Actions</Text>
        </View>

        <View style={styles.recommendationCard}>
          <View style={styles.recommendationItem}>
            <View style={styles.checkCircle}>
              <Activity size={16} color="#10B981" />
            </View>
            <Text style={styles.recommendationText}>
              Add 20 minutes of walking 3x this week
            </Text>
          </View>

          <View style={styles.recommendationItem}>
            <View style={styles.checkCircle}>
              <Moon size={16} color="#6366F1" />
            </View>
            <Text style={styles.recommendationText}>
              Keep bedroom temperature below 68°F
            </Text>
          </View>

          <View style={styles.recommendationItem}>
            <View style={styles.checkCircle}>
              <Flame size={16} color="#EF4444" />
            </View>
            <Text style={styles.recommendationText}>
              Avoid caffeine after 2 PM to reduce hot flashes
            </Text>
          </View>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F7',
  },
  headerBanner: {
    backgroundColor: '#8B5A8F',
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  firstSection: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5A3A5A',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#8B7280',
    marginBottom: 18,
  },
  insightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8D5E8',
  },
  insightHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  insightDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  insightAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  insightActionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  trendsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  trendRow: {
    paddingVertical: 16,
  },
  trendRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  trendInfo: {
    marginBottom: 12,
  },
  trendSymptom: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  trendCount: {
    fontSize: 13,
    color: '#6B7280',
  },
  trendBars: {
    gap: 6,
    marginBottom: 8,
  },
  barContainer: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
  changeLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  changeLabelPositive: {
    backgroundColor: '#D1FAE5',
  },
  changeLabelNeutral: {
    backgroundColor: '#F3F4F6',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  eduCard: {
    backgroundColor: '#FFF5F7',
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F8E4E8',
  },
  eduTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5A3A5A',
    marginBottom: 8,
  },
  eduDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 21,
    marginBottom: 12,
  },
  eduButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  eduButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5A8F',
  },
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
    gap: 16,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
});
