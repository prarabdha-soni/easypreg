import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { 
  Flame, Moon, Heart, Droplets, Wind, Activity, 
  Brain, Pill, Video, ChevronRight, TrendingUp, Calendar, Sparkles 
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function HomeScreen() {
  const { profile } = useUser();
  const router = useRouter();

  // Menopause-specific symptoms (forhers.com style)
  const menopauseSymptoms = [
    { id: 'hot-flashes', label: 'Hot Flashes', icon: Flame, color: '#EF4444', bg: '#FEF2F2' },
    { id: 'night-sweats', label: 'Night Sweats', icon: Moon, color: '#6366F1', bg: '#EEF2FF' },
    { id: 'mood-changes', label: 'Mood Changes', icon: Heart, color: '#EC4899', bg: '#FDF2F8' },
    { id: 'sleep-issues', label: 'Sleep Issues', icon: Moon, color: '#8B5CF6', bg: '#F5F3FF' },
    { id: 'vaginal-dryness', label: 'Vaginal Dryness', icon: Droplets, color: '#10B981', bg: '#ECFDF5' },
    { id: 'brain-fog', label: 'Brain Fog', icon: Brain, color: '#F59E0B', bg: '#FFFBEB' },
    { id: 'fatigue', label: 'Fatigue', icon: Wind, color: '#6B7280', bg: '#F9FAFB' },
    { id: 'joint-pain', label: 'Joint Pain', icon: Activity, color: '#EF4444', bg: '#FEF2F2' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Banner Section */}
      <View style={styles.heroBanner}>
        <View style={styles.heroContent}>
          <Text style={styles.appName}>Gloww</Text>
          <Text style={styles.heroTagline}>
            Your Menopause & Perimenopause Companion
          </Text>
          <Text style={styles.heroSubtext}>
            Tailored support for every stage of your hormonal journey
          </Text>
        </View>
        {/* Decorative Elements */}
        <View style={styles.decorativeElements}>
          <View style={[styles.decorativeCircle, { backgroundColor: '#D4A5D4', opacity: 0.3 }]} />
          <View style={[styles.decorativeCircle, { backgroundColor: '#F08080', opacity: 0.2 }]} />
        </View>
      </View>

      {/* Current Stage Card */}
      <View style={styles.stageCard}>
        <View style={styles.stageHeader}>
          <View style={styles.stageBadge}>
            <Text style={styles.stageBadgeText}>YOUR STAGE</Text>
          </View>
        </View>
        <Text style={styles.stageTitle}>
          {profile.menopauseStage === 'perimenopause' 
            ? '🌸 Perimenopause' 
            : profile.menopauseStage === 'menopause'
            ? '🌙 Menopause'
            : profile.menopauseStage === 'postmenopause'
            ? '✨ Postmenopause'
            : '💜 Your Journey'}
        </Text>
        <Text style={styles.stageDescription}>
          {profile.menopauseStage === 'perimenopause' 
            ? 'Navigating the transition with irregular cycles and changing hormones' 
            : profile.menopauseStage === 'menopause'
            ? 'Managing symptoms and adapting to hormonal changes'
            : profile.menopauseStage === 'postmenopause'
            ? 'Thriving beyond menopause with continued wellness support'
            : 'Understanding and supporting your unique hormonal journey'}
        </Text>
      </View>

      {/* Daily Menopause Tip */}
      <View style={styles.dailyTipCard}>
        <View style={styles.tipHeader}>
          <Sparkles size={20} color="#8B5A8F" />
          <Text style={styles.tipTitle}>Today's Menopause Tip</Text>
        </View>
        <Text style={styles.tipText}>
          {profile.menopauseStage === 'perimenopause'
            ? 'Keep a cool bedroom (65-68°F) to help manage night sweats and improve sleep quality'
            : 'Regular weight-bearing exercise helps maintain bone density during menopause'}
        </Text>
      </View>

      {/* Quick Actions - forhers.com style */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Menopause Care Options</Text>
        <Text style={styles.sectionSubtitle}>
          Evidence-based treatments designed for your stage
        </Text>
        
        <TouchableOpacity 
          style={styles.actionCard}
          onPress={() => router.push('/treatment/hrt')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#FFF5F7' }]}>
            <Pill size={24} color="#EC4899" />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Hormone Replacement Therapy</Text>
            <Text style={styles.actionSubtitle}>
              {profile.interestedInHRT 
                ? 'View your treatment plan' 
                : 'Explore HRT options & get started'}
            </Text>
          </View>
          <ChevronRight size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionCard}
          onPress={() => router.push('/telehealth/providers')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#EFF6FF' }]}>
            <Video size={24} color="#3B82F6" />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Talk to a Provider</Text>
            <Text style={styles.actionSubtitle}>
              {profile.hasProvider 
                ? 'Schedule your next visit' 
                : 'Connect with menopause specialists'}
            </Text>
          </View>
          <ChevronRight size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Symptom Tracking */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {profile.menopauseStage === 'perimenopause' 
            ? 'Track My Perimenopause' 
            : profile.menopauseStage === 'menopause'
            ? 'Track My Menopause'
            : 'Track Symptoms'}
        </Text>
        <Text style={styles.sectionSubtitle}>
          Monitor patterns to better understand your unique hormonal journey
        </Text>
        
        <View style={styles.symptomGrid}>
          {menopauseSymptoms.slice(0, 6).map((symptom) => (
            <TouchableOpacity
              key={symptom.id}
              style={styles.symptomCard}
              onPress={() => router.push('/symptoms/tracker')}
            >
              <View style={[styles.symptomIcon, { backgroundColor: symptom.bg }]}>
                <symptom.icon size={20} color={symptom.color} />
              </View>
              <Text style={styles.symptomLabel}>{symptom.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={() => router.push('/symptoms/tracker')}
        >
          <Text style={styles.viewAllText}>Track All Symptoms</Text>
          <ChevronRight size={16} color="#8B5A8F" />
        </TouchableOpacity>
      </View>

      {/* Insights & Progress */}
      <TouchableOpacity 
        style={styles.insightCard} 
        onPress={() => router.push('/(tabs)/insights')}
      >
        <View style={[styles.actionIcon, { backgroundColor: '#F0FDF4' }]}>
          <TrendingUp size={24} color="#10B981" />
        </View>
        <View style={styles.actionContent}>
          <Text style={styles.actionTitle}>Your Progress</Text>
          <Text style={styles.actionSubtitle}>
            Hot flashes down 30% this week. Great progress!
          </Text>
        </View>
        <ChevronRight size={20} color="#9CA3AF" />
      </TouchableOpacity>

      {/* Educational Content - forhers style */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {profile.menopauseStage === 'perimenopause' 
            ? 'Understanding Perimenopause' 
            : 'Learn About Menopause'}
        </Text>
        <Text style={styles.sectionSubtitle}>
          Knowledge is power—educate yourself about this natural transition
        </Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.articleScroll}>
          <TouchableOpacity 
            style={styles.articleCard}
            onPress={() => router.push('/education/hrt')}
          >
            <View style={styles.articleImagePlaceholder}>
              <Pill size={32} color="#EC4899" />
            </View>
            <Text style={styles.articleTitle}>Understanding HRT</Text>
            <Text style={styles.articleDescription}>
              What to expect from hormone replacement therapy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.articleCard}
            onPress={() => router.push('/education/lifestyle')}
          >
            <View style={styles.articleImagePlaceholder}>
              <Activity size={32} color="#10B981" />
            </View>
            <Text style={styles.articleTitle}>Lifestyle Changes</Text>
            <Text style={styles.articleDescription}>
              Natural ways to manage symptoms
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.articleCard}
            onPress={() => router.push('/education/sleep')}
          >
            <View style={styles.articleImagePlaceholder}>
              <Moon size={32} color="#6366F1" />
            </View>
            <Text style={styles.articleTitle}>Better Sleep</Text>
            <Text style={styles.articleDescription}>
              Tips for managing night sweats
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Appointment Reminder */}
      {profile.nextAppointment && (
        <View style={styles.appointmentCard}>
          <View style={styles.appointmentHeader}>
            <Calendar size={20} color="#3B82F6" />
            <Text style={styles.appointmentTitle}>Upcoming Appointment</Text>
          </View>
          <Text style={styles.appointmentDate}>
            {profile.nextAppointment.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
          <TouchableOpacity 
            style={styles.appointmentButton}
            onPress={() => router.push('/telehealth/appointment')}
          >
            <Text style={styles.appointmentButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Spacing */}
      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F7',
  },
  // Hero Banner with warm gradient feel
  heroBanner: {
    backgroundColor: '#8B5A8F',
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    zIndex: 1,
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 1,
  },
  heroTagline: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  heroSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  decorativeElements: {
    position: 'absolute',
    right: -40,
    top: 40,
    flexDirection: 'row',
    gap: 20,
  },
  decorativeCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  // Current Stage Card
  stageCard: {
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
  },
  // Daily Tip Card
  dailyTipCard: {
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
    fontSize: 21,
    fontWeight: '700',
    color: '#5A3A5A',
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#8B7280',
    marginBottom: 18,
    lineHeight: 20,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    gap: 12,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
    shadowColor: '#8B5A8F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5A3A5A',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 13,
    color: '#8B7280',
    lineHeight: 18,
  },
  symptomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  symptomCard: {
    alignItems: 'center',
    width: '30%',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
    shadowColor: '#8B5A8F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  symptomIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  symptomLabel: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 14,
    fontWeight: '500',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#8B5A8F',
    backgroundColor: '#F9F5F9',
    gap: 6,
  },
  viewAllText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#8B5A8F',
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 16,
    marginBottom: 24,
    gap: 12,
    borderWidth: 1.5,
    borderColor: '#D1FAE5',
  },
  articleScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  articleCard: {
    width: 200,
    marginRight: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
    shadowColor: '#8B5A8F',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  articleImagePlaceholder: {
    height: 120,
    backgroundColor: '#F9F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  articleTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    padding: 12,
    paddingBottom: 6,
  },
  articleDescription: {
    fontSize: 13,
    color: '#6B7280',
    paddingHorizontal: 12,
    paddingBottom: 12,
    lineHeight: 18,
  },
  appointmentCard: {
    backgroundColor: '#EFF6FF',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 22,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  appointmentDate: {
    fontSize: 15,
    color: '#3B82F6',
    marginBottom: 12,
    fontWeight: '500',
  },
  appointmentButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  appointmentButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
