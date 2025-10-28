import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { 
  User, Settings, Bell, HelpCircle, Heart, Shield, Crown, ChevronRight, 
  Target, Activity, Pill, Video, Calendar, LogOut 
} from 'lucide-react-native';
import { useUser } from '@/contexts/UserContext';

export default function MyWellnessProfile() {
  const { profile } = useUser();

  const myGoals = [
    { id: 1, goal: 'Reduce hot flashes by 50%', progress: 65, color: '#EF4444' },
    { id: 2, goal: 'Sleep 7+ hours nightly', progress: 80, color: '#6366F1' },
    { id: 3, goal: 'Daily symptom tracking', progress: 90, color: '#10B981' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Banner */}
      <View style={styles.headerBanner}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <User size={40} color="#8B5A8F" />
          </View>
        </View>
        <Text style={styles.headerTitle}>My Wellness Profile</Text>
        <Text style={styles.headerSubtitle}>
          {profile.age ? `Age ${profile.age}` : 'Track your journey'}
        </Text>
      </View>

      {/* Stage Card */}
      <View style={styles.stageCard}>
        <View style={styles.stageHeader}>
          <View style={styles.stageBadge}>
            <Text style={styles.stageBadgeText}>MY CURRENT STAGE</Text>
          </View>
        </View>
        <Text style={styles.stageTitle}>
          {profile.menopauseStage === 'perimenopause' 
            ? '🌸 Perimenopause' 
            : profile.menopauseStage === 'menopause'
            ? '🌙 Menopause'
            : profile.menopauseStage === 'postmenopause'
            ? '✨ Postmenopause'
            : '💜 Not Set'}
        </Text>
        <Text style={styles.stageDescription}>
          {profile.menopauseStage === 'perimenopause' 
            ? 'Navigating the transition with irregular cycles' 
            : profile.menopauseStage === 'menopause'
            ? 'Managing symptoms and hormonal changes'
            : profile.menopauseStage === 'postmenopause'
            ? 'Thriving beyond menopause'
            : 'Update your stage to get personalized support'}
        </Text>
        
        {profile.lastPeriodDate && (
          <View style={styles.periodInfo}>
            <Calendar size={16} color="#8B5A8F" />
            <Text style={styles.periodText}>
              Last period: {Math.floor((new Date().getTime() - profile.lastPeriodDate.getTime()) / (1000 * 60 * 60 * 24))} days ago
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.updateStageButton}>
          <Text style={styles.updateStageText}>Update Stage or Details</Text>
        </TouchableOpacity>
      </View>

      {/* Tracked Symptoms Overview */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Activity size={20} color="#8B5A8F" />
          <Text style={styles.sectionTitle}>Tracked Symptoms</Text>
        </View>

        {profile.primarySymptoms && profile.primarySymptoms.length > 0 ? (
          <View style={styles.symptomsOverview}>
            <Text style={styles.symptomsCount}>
              Currently tracking {profile.primarySymptoms.length} symptoms
            </Text>
            <View style={styles.symptomsList}>
              {profile.primarySymptoms.map((symptom, index) => (
                <View key={index} style={styles.symptomBubble}>
                  <Text style={styles.symptomBubbleText}>{symptom}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.manageButton}>
              <Text style={styles.manageButtonText}>Manage Symptoms</Text>
              <ChevronRight size={16} color="#8B5A8F" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Start tracking symptoms to get personalized insights
            </Text>
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.startButtonText}>Start Tracking</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* My Care Plan */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Pill size={20} color="#EC4899" />
          <Text style={styles.sectionTitle}>My Care Plan</Text>
        </View>

        <View style={styles.carePlanCard}>
          {profile.interestedInHRT ? (
            <View style={styles.carePlanActive}>
              <Text style={styles.carePlanTitle}>Hormone Replacement Therapy</Text>
              <Text style={styles.carePlanDescription}>
                Exploring HRT options with menopause specialist
              </Text>
              <TouchableOpacity style={styles.carePlanButton}>
                <Text style={styles.carePlanButtonText}>View Treatment Plan</Text>
                <ChevronRight size={14} color="#EC4899" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.carePlanEmpty}>
              <Text style={styles.carePlanEmptyText}>
                No active care plan yet
              </Text>
              <TouchableOpacity style={styles.exploreTreatmentsButton}>
                <Text style={styles.exploreTreatmentsText}>Explore Treatment Options</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {profile.hasProvider && (
          <View style={styles.providerCard}>
            <View style={styles.providerIcon}>
              <Video size={20} color="#3B82F6" />
            </View>
            <View style={styles.providerInfo}>
              <Text style={styles.providerLabel}>Connected Provider</Text>
              <Text style={styles.providerName}>Menopause Specialist</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </View>
        )}
      </View>

      {/* Wellness Goals */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Target size={20} color="#10B981" />
          <Text style={styles.sectionTitle}>My Wellness Goals</Text>
        </View>

        {myGoals.map((goal) => (
          <View key={goal.id} style={styles.goalCard}>
            <Text style={styles.goalText}>{goal.goal}</Text>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBg}>
                <View style={[
                  styles.progressBarFill,
                  { width: `${goal.progress}%`, backgroundColor: goal.color }
                ]} />
              </View>
              <Text style={styles.progressText}>{goal.progress}%</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addGoalButton}>
          <Text style={styles.addGoalText}>+ Add New Goal</Text>
        </TouchableOpacity>
      </View>

      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account & Settings</Text>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <User size={20} color="#8B5A8F" />
          </View>
          <Text style={styles.menuLabel}>Personal Information</Text>
          <ChevronRight size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Bell size={20} color="#F59E0B" />
          </View>
          <Text style={styles.menuLabel}>Notifications</Text>
          <ChevronRight size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Shield size={20} color="#10B981" />
          </View>
          <Text style={styles.menuLabel}>Privacy & Security</Text>
          <ChevronRight size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Settings size={20} color="#6B7280" />
          </View>
          <Text style={styles.menuLabel}>App Settings</Text>
          <ChevronRight size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <HelpCircle size={20} color="#3B82F6" />
          </View>
          <Text style={styles.menuLabel}>Help & Support</Text>
          <ChevronRight size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Premium Upgrade */}
      <TouchableOpacity style={styles.premiumCard}>
        <View style={styles.premiumIcon}>
          <Crown size={28} color="#EAB308" />
        </View>
        <View style={styles.premiumContent}>
          <Text style={styles.premiumTitle}>Upgrade to Gloww Premium</Text>
          <Text style={styles.premiumDescription}>
            • Unlimited AI insights{'\n'}
            • Priority expert consultations{'\n'}
            • Advanced symptom analytics{'\n'}
            • Personalized treatment plans
          </Text>
        </View>
      </TouchableOpacity>

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
    paddingBottom: 40,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  stageCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -20,
    marginBottom: 24,
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
  stageHeader: {
    marginBottom: 12,
  },
  stageBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3E8F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  stageBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8B5A8F',
    letterSpacing: 1,
  },
  stageTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#5A3A5A',
    marginBottom: 8,
  },
  stageDescription: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 12,
  },
  periodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  periodText: {
    fontSize: 13,
    color: '#8B7280',
  },
  updateStageButton: {
    borderWidth: 1.5,
    borderColor: '#8B5A8F',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  updateStageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5A8F',
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5A3A5A',
  },
  symptomsOverview: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E8D5E8',
  },
  symptomsCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  symptomsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  symptomBubble: {
    backgroundColor: '#F3E8F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  symptomBubbleText: {
    fontSize: 12,
    color: '#8B5A8F',
    fontWeight: '500',
  },
  manageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 10,
  },
  manageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5A8F',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8D5E8',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: '#8B5A8F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  carePlanCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E8D5E8',
    marginBottom: 12,
  },
  carePlanActive: {},
  carePlanTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  carePlanDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  carePlanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  carePlanButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EC4899',
  },
  carePlanEmpty: {
    alignItems: 'center',
  },
  carePlanEmptyText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  exploreTreatmentsButton: {
    backgroundColor: '#EC4899',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  exploreTreatmentsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 16,
    gap: 12,
  },
  providerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerInfo: {
    flex: 1,
  },
  providerLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  providerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8D5E8',
  },
  goalText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 10,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    width: 40,
  },
  addGoalButton: {
    borderWidth: 1.5,
    borderColor: '#10B981',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addGoalText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E8D5E8',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#1F2937',
  },
  premiumCard: {
    flexDirection: 'row',
    backgroundColor: 'linear-gradient(135deg, #FEF3C7 0%, #FCD34D 100%)',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    gap: 16,
    borderWidth: 2,
    borderColor: '#EAB308',
  },
  premiumIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumContent: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#78350F',
    marginBottom: 8,
  },
  premiumDescription: {
    fontSize: 13,
    color: '#92400E',
    lineHeight: 20,
  },
});
