import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { 
  Flame, Moon, Heart, Droplets, Wind, Brain, Activity, Sparkles,
  TrendingUp, Calendar, ChevronRight 
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';

export default function MyHormonalJourney() {
  const router = useRouter();
  const { profile } = useUser();

  const isPCOS = profile.healthCondition === 'pcos' || profile.healthCondition === 'pcod';

  const lastPeriodDays = profile.lastPeriodDate 
    ? Math.floor((new Date().getTime() - profile.lastPeriodDate.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const menopauseSymptoms = [
    { id: 'hot-flashes', label: 'Hot Flashes', icon: Flame, color: '#EF4444', bg: '#FEF2F2', tracked: true },
    { id: 'night-sweats', label: 'Night Sweats', icon: Moon, color: '#6366F1', bg: '#EEF2FF', tracked: true },
    { id: 'mood-changes', label: 'Mood Swings', icon: Heart, color: '#EC4899', bg: '#FDF2F8', tracked: false },
    { id: 'sleep-issues', label: 'Sleep Issues', icon: Moon, color: '#8B5CF6', bg: '#F5F3FF', tracked: true },
    { id: 'vaginal-dryness', label: 'Vaginal Dryness', icon: Droplets, color: '#10B981', bg: '#ECFDF5', tracked: false },
    { id: 'brain-fog', label: 'Brain Fog', icon: Brain, color: '#F59E0B', bg: '#FFFBEB', tracked: true },
    { id: 'fatigue', label: 'Energy Levels', icon: Wind, color: '#6B7280', bg: '#F9FAFB', tracked: true },
    { id: 'joint-pain', label: 'Joint Pain', icon: Activity, color: '#EF4444', bg: '#FEF2F2', tracked: false },
  ];

  const pcosSymptoms = [
    { id: 'irregular-periods', label: 'Period Tracking', icon: Calendar, color: '#EC4899', bg: '#FDF2F8', tracked: true },
    { id: 'weight', label: 'Weight', icon: Activity, color: '#F59E0B', bg: '#FFFBEB', tracked: true },
    { id: 'acne', label: 'Acne', icon: Flame, color: '#EF4444', bg: '#FEF2F2', tracked: false },
    { id: 'hair-growth', label: 'Hair Growth', icon: TrendingUp, color: '#6366F1', bg: '#EEF2FF', tracked: false },
    { id: 'mood', label: 'Mood', icon: Heart, color: '#EC4899', bg: '#FDF2F8', tracked: true },
    { id: 'energy', label: 'Energy', icon: Wind, color: '#10B981', bg: '#ECFDF5', tracked: true },
    { id: 'sleep', label: 'Sleep', icon: Moon, color: '#8B5CF6', bg: '#F5F3FF', tracked: false },
    { id: 'cravings', label: 'Cravings', icon: Brain, color: '#F59E0B', bg: '#FFFBEB', tracked: true },
  ];

  const symptoms = isPCOS ? pcosSymptoms : menopauseSymptoms;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Banner */}
      <View style={styles.headerBanner}>
        <Text style={styles.headerTitle}>My Hormonal Journey</Text>
        <Text style={styles.headerSubtitle}>
          {isPCOS
            ? (profile.healthCondition === 'pcos' 
                ? 'Tracking your PCOS management'
                : 'Monitoring your PCOD journey')
            : (profile.menopauseStage === 'perimenopause' 
                ? 'Tracking your perimenopause transition'
                : profile.menopauseStage === 'menopause'
                ? 'Monitoring your menopause experience'
                : 'Understanding your hormonal changes')}
        </Text>
      </View>

      {/* Cycle Status Card */}
      <View style={styles.cycleStatusCard}>
        <View style={styles.cycleHeader}>
          <Calendar size={24} color="#8B5A8F" />
          <Text style={styles.cycleTitle}>{isPCOS ? 'Cycle Tracking' : 'Cycle Status'}</Text>
        </View>
        
        <View style={styles.cycleContent}>
          <View style={styles.cycleRow}>
            <Text style={styles.cycleLabel}>Last Period:</Text>
            <Text style={styles.cycleValue}>
              {lastPeriodDays !== null ? `${lastPeriodDays} days ago` : 'Not tracked'}
            </Text>
          </View>
          
          <View style={styles.cycleRow}>
            <Text style={styles.cycleLabel}>Status:</Text>
            <Text style={styles.cycleValue}>
              {isPCOS
                ? 'Irregular cycles common with PCOS'
                : (profile.menopauseStage === 'perimenopause' 
                    ? 'Irregular cycles expected'
                    : profile.menopauseStage === 'menopause'
                    ? 'No period for 12+ months'
                    : 'Tracking')}
            </Text>
          </View>

          <View style={styles.cycleRow}>
            <Text style={styles.cycleLabel}>{isPCOS ? 'Condition:' : 'Stage:'}</Text>
            <View style={styles.stagePill}>
              <Text style={styles.stagePillText}>
                {isPCOS
                  ? (profile.healthCondition === 'pcos' ? '💖 PCOS' : '💗 PCOD')
                  : (profile.menopauseStage === 'perimenopause' 
                      ? '🌸 Perimenopause'
                      : profile.menopauseStage === 'menopause'
                      ? '🌙 Menopause'
                      : profile.menopauseStage === 'postmenopause'
                      ? '✨ Postmenopause'
                      : '💜 Your Journey')}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update Period Date</Text>
        </TouchableOpacity>
      </View>

      {/* Today's Wellness Tip */}
      <View style={styles.tipCard}>
        <View style={styles.tipHeader}>
          <Sparkles size={20} color="#8B5A8F" />
          <Text style={styles.tipTitle}>Today's Wellness Tip</Text>
        </View>
        <Text style={styles.tipText}>
          {isPCOS
            ? 'Add cinnamon to your morning coffee or oatmeal—it helps improve insulin sensitivity'
            : (profile.menopauseStage === 'perimenopause'
                ? 'Layer your clothing to easily adjust to temperature changes throughout the day'
                : 'Stay hydrated—aim for 8 glasses of water daily to support overall wellness')}
        </Text>
      </View>

      {/* Daily Symptom Tracker */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Log Today's Symptoms</Text>
        <Text style={styles.sectionSubtitle}>
          Track how you're feeling to identify patterns
        </Text>

        <View style={styles.symptomGrid}>
          {symptoms.map((symptom) => {
            const IconComponent = symptom.icon;
            return (
              <TouchableOpacity
                key={symptom.id}
                style={[
                  styles.symptomCard,
                  symptom.tracked && styles.symptomCardTracked
                ]}
                onPress={() => router.push('/symptoms/tracker')}
              >
                <View style={[styles.symptomIcon, { backgroundColor: symptom.bg }]}>
                  <IconComponent size={20} color={symptom.color} />
                  {symptom.tracked && (
                    <View style={styles.trackedBadge} />
                  )}
                </View>
                <Text style={styles.symptomLabel}>{symptom.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity 
          style={styles.fullTrackerButton}
          onPress={() => router.push('/symptoms/tracker')}
        >
          <Text style={styles.fullTrackerText}>Open Full Symptom Tracker</Text>
          <ChevronRight size={16} color="#8B5A8F" />
        </TouchableOpacity>
      </View>

      {/* Hormonal Trends */}
      <View style={styles.section}>
        <View style={styles.trendsHeader}>
          <TrendingUp size={24} color="#10B981" />
          <Text style={styles.sectionTitle}>Your Trends This Week</Text>
        </View>

        <View style={styles.trendCard}>
          {isPCOS ? (
            <>
              <View style={styles.trendRow}>
                <View style={styles.trendIcon}>
                  <Activity size={20} color="#F59E0B" />
                </View>
                <View style={styles.trendContent}>
                  <Text style={styles.trendTitle}>Weight Management</Text>
                  <Text style={styles.trendDescription}>Down 1.2 kg this month</Text>
                </View>
                <View style={[styles.trendBadge, { backgroundColor: '#D1FAE5' }]}>
                  <Text style={[styles.trendBadgeText, { color: '#065F46' }]}>Better</Text>
                </View>
              </View>

              <View style={styles.trendRow}>
                <View style={styles.trendIcon}>
                  <Calendar size={20} color="#EC4899" />
                </View>
                <View style={styles.trendContent}>
                  <Text style={styles.trendTitle}>Cycle Regularity</Text>
                  <Text style={styles.trendDescription}>28-day cycle this month</Text>
                </View>
                <View style={[styles.trendBadge, { backgroundColor: '#D1FAE5' }]}>
                  <Text style={[styles.trendBadgeText, { color: '#065F46' }]}>Better</Text>
                </View>
              </View>

              <View style={styles.trendRow}>
                <View style={styles.trendIcon}>
                  <Wind size={20} color="#10B981" />
                </View>
                <View style={styles.trendContent}>
                  <Text style={styles.trendTitle}>Energy Levels</Text>
                  <Text style={styles.trendDescription}>Improved with exercise</Text>
                </View>
                <View style={[styles.trendBadge, { backgroundColor: '#D1FAE5' }]}>
                  <Text style={[styles.trendBadgeText, { color: '#065F46' }]}>Better</Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={styles.trendRow}>
                <View style={styles.trendIcon}>
                  <Flame size={20} color="#EF4444" />
                </View>
                <View style={styles.trendContent}>
                  <Text style={styles.trendTitle}>Hot Flashes</Text>
                  <Text style={styles.trendDescription}>Decreased by 20% this week</Text>
                </View>
                <View style={[styles.trendBadge, { backgroundColor: '#D1FAE5' }]}>
                  <Text style={[styles.trendBadgeText, { color: '#065F46' }]}>Better</Text>
                </View>
              </View>

              <View style={styles.trendRow}>
                <View style={styles.trendIcon}>
                  <Moon size={20} color="#6366F1" />
                </View>
                <View style={styles.trendContent}>
                  <Text style={styles.trendTitle}>Sleep Quality</Text>
                  <Text style={styles.trendDescription}>Improved - averaging 7 hours</Text>
                </View>
                <View style={[styles.trendBadge, { backgroundColor: '#D1FAE5' }]}>
                  <Text style={[styles.trendBadgeText, { color: '#065F46' }]}>Better</Text>
                </View>
              </View>

              <View style={styles.trendRow}>
                <View style={styles.trendIcon}>
                  <Brain size={20} color="#F59E0B" />
                </View>
                <View style={styles.trendContent}>
                  <Text style={styles.trendTitle}>Brain Fog</Text>
                  <Text style={styles.trendDescription}>Stable compared to last week</Text>
                </View>
                <View style={[styles.trendBadge, { backgroundColor: '#FEF3C7' }]}>
                  <Text style={[styles.trendBadgeText, { color: '#92400E' }]}>Stable</Text>
                </View>
              </View>
            </>
          )}
        </View>

        <TouchableOpacity 
          style={styles.viewInsightsButton}
          onPress={() => router.push('/(tabs)/insights')}
        >
          <Text style={styles.viewInsightsText}>View Detailed Insights</Text>
          <ChevronRight size={16} color="#8B5A8F" />
        </TouchableOpacity>
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
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  cycleStatusCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -16,
    marginBottom: 20,
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E8D5E8',
  },
  cycleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  cycleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5A3A5A',
  },
  cycleContent: {
    gap: 12,
    marginBottom: 16,
  },
  cycleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cycleLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  cycleValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5A3A5A',
  },
  stagePill: {
    backgroundColor: '#F3E8F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  stagePillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8B5A8F',
  },
  updateButton: {
    borderWidth: 1.5,
    borderColor: '#8B5A8F',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  updateButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5A8F',
  },
  tipCard: {
    backgroundColor: '#FFF5F7',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F8E4E8',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8B5A8F',
  },
  tipText: {
    fontSize: 14,
    color: '#5A3A5A',
    lineHeight: 21,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5A3A5A',
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#8B7280',
    marginBottom: 18,
  },
  symptomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  symptomCard: {
    alignItems: 'center',
    width: '22%',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  symptomCardTracked: {
    borderColor: '#8B5A8F',
    backgroundColor: '#F9F5F9',
  },
  symptomIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  trackedBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  symptomLabel: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 12,
    fontWeight: '500',
  },
  fullTrackerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#8B5A8F',
    backgroundColor: '#F9F5F9',
    gap: 6,
  },
  fullTrackerText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#8B5A8F',
  },
  trendsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  trendCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
    marginBottom: 16,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  trendIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendContent: {
    flex: 1,
  },
  trendTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  trendDescription: {
    fontSize: 13,
    color: '#6B7280',
  },
  trendBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  trendBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  viewInsightsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#8B5A8F',
    gap: 6,
  },
  viewInsightsText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
