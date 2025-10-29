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

  const isPCOS = profile.healthCondition === 'pcos' || profile.healthCondition === 'pcod';

  // Menopause-specific symptoms
  const menopauseSymptoms = [
    { id: 'hot-flashes', label: 'Hot Flashes', icon: Flame, color: '#EF4444', bg: '#FEF2F2' },
    { id: 'night-sweats', label: 'Night Sweats', icon: Moon, color: '#6366F1', bg: '#EEF2FF' },
    { id: 'mood-changes', label: 'Mood Changes', icon: Heart, color: '#EC4899', bg: '#FDF2F8' },
    { id: 'sleep-issues', label: 'Sleep Issues', icon: Moon, color: '#8B5CF6', bg: '#F5F3FF' },
    { id: 'vaginal-dryness', label: 'Vaginal Dryness', icon: Droplets, color: '#10B981', bg: '#ECFDF5' },
    { id: 'brain-fog', label: 'Brain Fog', icon: Brain, color: '#F59E0B', bg: '#FFFBEB' },
  ];

  // PCOS/PCOD-specific symptoms
  const pcosSymptoms = [
    { id: 'irregular-periods', label: 'Irregular Periods', icon: Calendar, color: '#EC4899', bg: '#FDF2F8' },
    { id: 'weight-gain', label: 'Weight Changes', icon: Activity, color: '#F59E0B', bg: '#FFFBEB' },
    { id: 'acne', label: 'Acne', icon: Flame, color: '#EF4444', bg: '#FEF2F2' },
    { id: 'hair-growth', label: 'Hair Growth', icon: TrendingUp, color: '#6366F1', bg: '#EEF2FF' },
    { id: 'mood-swings', label: 'Mood Swings', icon: Heart, color: '#EC4899', bg: '#FDF2F8' },
    { id: 'fatigue', label: 'Fatigue', icon: Wind, color: '#6B7280', bg: '#F9FAFB' },
  ];

  const symptoms = isPCOS ? pcosSymptoms : menopauseSymptoms;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Banner Section */}
      <View style={styles.heroBanner}>
        <View style={styles.heroContent}>
          <Text style={styles.appName}>Gloww</Text>
          <Text style={styles.heroTagline}>
            PCOS, PCOD, Menopause & Perimenopause
          </Text>
          <Text style={styles.heroSubtext}>
            {isPCOS
              ? 'Personalized support for PCOS/PCOD management'
              : 'Expert care for Menopause & Perimenopause'}
          </Text>
        </View>
        {/* Decorative Elements */}
        <View style={styles.decorativeElements}>
          <View style={[styles.decorativeCircle, { backgroundColor: isPCOS ? '#FCD34D' : '#D4A5D4', opacity: 0.3 }]} />
          <View style={[styles.decorativeCircle, { backgroundColor: isPCOS ? '#F472B6' : '#F08080', opacity: 0.2 }]} />
        </View>
      </View>

      {/* Current Stage Card */}
      <View style={styles.stageCard}>
        <View style={styles.stageHeader}>
          <View style={styles.stageBadge}>
            <Text style={styles.stageBadgeText}>{isPCOS ? 'YOUR CONDITION' : 'YOUR STAGE'}</Text>
          </View>
        </View>
        <Text style={styles.stageTitle}>
          {isPCOS
            ? (profile.healthCondition === 'pcos' ? '💖 PCOS Support' : '💗 PCOD Support')
            : (profile.menopauseStage === 'perimenopause' 
                ? '🌸 Perimenopause' 
                : profile.menopauseStage === 'menopause'
                ? '🌙 Menopause'
                : profile.menopauseStage === 'postmenopause'
                ? '✨ Postmenopause'
                : '💜 Your Journey')}
        </Text>
        <Text style={styles.stageDescription}>
          {isPCOS
            ? 'Managing hormonal balance with personalized care and lifestyle support'
            : (profile.menopauseStage === 'perimenopause' 
                ? 'Navigating the transition with irregular cycles and changing hormones' 
                : profile.menopauseStage === 'menopause'
                ? 'Managing symptoms and adapting to hormonal changes'
                : profile.menopauseStage === 'postmenopause'
                ? 'Thriving beyond menopause with continued wellness support'
                : 'Understanding and supporting your unique hormonal journey')}
        </Text>
      </View>

      {/* Daily Tip */}
      <View style={styles.dailyTipCard}>
        <View style={styles.tipHeader}>
          <Sparkles size={20} color={isPCOS ? '#EC4899' : '#8B5A8F'} />
          <Text style={styles.tipTitle}>{isPCOS ? 'Today\'s PCOS Wellness Tip' : 'Today\'s Menopause Tip'}</Text>
        </View>
        <Text style={styles.tipText}>
          {isPCOS
            ? 'Start your day with a protein-rich breakfast to help stabilize blood sugar and reduce cravings throughout the day'
            : (profile.menopauseStage === 'perimenopause'
                ? 'Keep a cool bedroom (65-68°F) to help manage night sweats and improve sleep quality'
                : 'Regular weight-bearing exercise helps maintain bone density during menopause')}
        </Text>
      </View>

      {/* Our Top Products */}
      <View style={styles.section}>
        <View style={styles.productsBadge}>
          <Sparkles size={16} color="#F59E0B" />
          <Text style={styles.productsBadgeText}>OUR TOP PRODUCTS</Text>
        </View>
        <Text style={styles.sectionTitle}>Comprehensive Care Programs</Text>
        <Text style={styles.sectionSubtitle}>
          Complete solutions for your hormonal health journey
        </Text>
        
        {/* Product 1: Personalized Care Programs */}
        <TouchableOpacity
          style={styles.productCard}
          onPress={() => router.push('/products/care-programs' as any)}
        >
          <View style={styles.productHeader}>
            <View style={[styles.productIcon, { backgroundColor: '#FFF5F7' }]}>
              <Heart size={28} color="#EC4899" />
            </View>
            <View style={styles.productBadge}>
              <Text style={styles.productBadgeText}>MOST POPULAR</Text>
            </View>
          </View>
          <Text style={styles.productTitle}>Personalized Care Programs</Text>
          <Text style={styles.productDescription}>
            Tailored hormone health support plans with licensed providers, including HRT prescription and management.
          </Text>
          <View style={styles.productFeatures}>
            <View style={styles.featureItem}>
              <Sparkles size={14} color="#8B5A8F" />
              <Text style={styles.featureText}>Custom treatment plans</Text>
            </View>
            <View style={styles.featureItem}>
              <Sparkles size={14} color="#8B5A8F" />
              <Text style={styles.featureText}>Licensed provider support</Text>
            </View>
            <View style={styles.featureItem}>
              <Sparkles size={14} color="#8B5A8F" />
              <Text style={styles.featureText}>HRT management</Text>
            </View>
          </View>
          <View style={styles.productFooter}>
            <Text style={styles.productPrice}>Starting at ₹2,999/month</Text>
            <View style={styles.productButton}>
              <Text style={styles.productButtonText}>Learn More</Text>
              <ChevronRight size={16} color="#FFFFFF" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Product 2: Expert Telehealth */}
        <TouchableOpacity
          style={styles.productCard}
          onPress={() => router.push('/products/telehealth' as any)}
        >
          <View style={styles.productHeader}>
            <View style={[styles.productIcon, { backgroundColor: '#EFF6FF' }]}>
              <Video size={28} color="#3B82F6" />
            </View>
          </View>
          <Text style={styles.productTitle}>Expert Telehealth Consultations</Text>
          <Text style={styles.productDescription}>
            24/7 virtual access to menopause specialists and women's health experts for personalized guidance.
          </Text>
          <View style={styles.productFeatures}>
            <View style={styles.featureItem}>
              <Sparkles size={14} color="#8B5A8F" />
              <Text style={styles.featureText}>Available 24/7</Text>
            </View>
            <View style={styles.featureItem}>
              <Sparkles size={14} color="#8B5A8F" />
              <Text style={styles.featureText}>Certified specialists</Text>
            </View>
            <View style={styles.featureItem}>
              <Sparkles size={14} color="#8B5A8F" />
              <Text style={styles.featureText}>Video & chat support</Text>
            </View>
          </View>
          <View style={styles.productFooter}>
            <Text style={styles.productPrice}>₹599 per consultation</Text>
            <View style={styles.productButton}>
              <Text style={styles.productButtonText}>Book Now</Text>
              <ChevronRight size={16} color="#FFFFFF" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Product 3: Symptom Tracking & Education */}
        <TouchableOpacity
          style={styles.productCard}
          onPress={() => router.push('/products/tracking-education' as any)}
        >
          <View style={styles.productHeader}>
            <View style={[styles.productIcon, { backgroundColor: '#F0FDF4' }]}>
              <Activity size={28} color="#10B981" />
            </View>
          </View>
          <Text style={styles.productTitle}>Symptom Tracking & Education</Text>
          <Text style={styles.productDescription}>
            Integrated symptom trackers with educational content to understand and manage your symptoms effectively.
          </Text>
          <View style={styles.productFeatures}>
            <View style={styles.featureItem}>
              <Sparkles size={14} color="#8B5A8F" />
              <Text style={styles.featureText}>Daily symptom logging</Text>
            </View>
            <View style={styles.featureItem}>
              <Sparkles size={14} color="#8B5A8F" />
              <Text style={styles.featureText}>AI-powered insights</Text>
            </View>
            <View style={styles.featureItem}>
              <Sparkles size={14} color="#8B5A8F" />
              <Text style={styles.featureText}>Expert resources</Text>
            </View>
          </View>
          <View style={styles.productFooter}>
            <Text style={styles.productPrice}>Free with membership</Text>
            <View style={styles.productButton}>
              <Text style={styles.productButtonText}>Start Tracking</Text>
              <ChevronRight size={16} color="#FFFFFF" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Product 4: Prescription Delivery */}
        <TouchableOpacity
          style={styles.productCard}
          onPress={() => router.push('/products/prescription-delivery' as any)}
        >
          <View style={styles.productHeader}>
            <View style={[styles.productIcon, { backgroundColor: '#F5F3FF' }]}>
              <Pill size={28} color="#8B5CF6" />
            </View>
            <View style={[styles.productBadge, { backgroundColor: '#10B981' }]}>
              <Text style={styles.productBadgeText}>NEW</Text>
            </View>
          </View>
          <Text style={styles.productTitle}>Prescription Delivery Service</Text>
          <Text style={styles.productDescription}>
            Convenient direct-to-door medication and supplement delivery with discreet packaging and subscriptions.
          </Text>
          <View style={styles.productFeatures}>
            <View style={styles.featureItem}>
              <Sparkles size={14} color="#8B5A8F" />
              <Text style={styles.featureText}>Free home delivery</Text>
            </View>
            <View style={styles.featureItem}>
              <Sparkles size={14} color="#8B5A8F" />
              <Text style={styles.featureText}>Discreet packaging</Text>
            </View>
            <View style={styles.featureItem}>
              <Sparkles size={14} color="#8B5A8F" />
              <Text style={styles.featureText}>Auto-refill options</Text>
            </View>
          </View>
          <View style={styles.productFooter}>
            <Text style={styles.productPrice}>Free delivery on orders ₹500+</Text>
            <View style={styles.productButton}>
              <Text style={styles.productButtonText}>View Options</Text>
              <ChevronRight size={16} color="#FFFFFF" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Product 5: Holistic Wellness */}
        <TouchableOpacity
          style={styles.productCard}
          onPress={() => router.push('/products/holistic-wellness' as any)}
        >
          <View style={styles.productHeader}>
            <View style={[styles.productIcon, { backgroundColor: '#FFFBEB' }]}>
              <Sparkles size={28} color="#F59E0B" />
            </View>
          </View>
          <Text style={styles.productTitle}>Holistic Wellness Support</Text>
          <Text style={styles.productDescription}>
            Lifestyle coaching, wellness tips, and mental health support for menopause symptoms and quality of life.
          </Text>
          <View style={styles.productFeatures}>
            <View style={styles.featureItem}>
              <Sparkles size={14} color="#8B5A8F" />
              <Text style={styles.featureText}>Personal wellness coach</Text>
            </View>
            <View style={styles.featureItem}>
              <Sparkles size={14} color="#8B5A8F" />
              <Text style={styles.featureText}>Mental health support</Text>
            </View>
            <View style={styles.featureItem}>
              <Sparkles size={14} color="#8B5A8F" />
              <Text style={styles.featureText}>Lifestyle guidance</Text>
            </View>
          </View>
          <View style={styles.productFooter}>
            <Text style={styles.productPrice}>₹1,499/month</Text>
            <View style={styles.productButton}>
              <Text style={styles.productButtonText}>Get Started</Text>
              <ChevronRight size={16} color="#FFFFFF" />
            </View>
          </View>
        </TouchableOpacity>

      </View>

      {/* Why Choose Us */}
      <View style={styles.whyChooseSection}>
        <Text style={styles.whyChooseTitle}>Why Choose Gloww?</Text>
        <View style={styles.benefitsList}>
          <View style={styles.benefitItem}>
            <View style={styles.benefitIcon}>
              <Activity size={20} color="#10B981" />
            </View>
            <Text style={styles.benefitText}>Evidence-based treatments</Text>
          </View>
          <View style={styles.benefitItem}>
            <View style={styles.benefitIcon}>
              <Heart size={20} color="#EC4899" />
            </View>
            <Text style={styles.benefitText}>Personalized care plans</Text>
          </View>
          <View style={styles.benefitItem}>
            <View style={styles.benefitIcon}>
              <Video size={20} color="#3B82F6" />
            </View>
            <Text style={styles.benefitText}>24/7 expert access</Text>
          </View>
          <View style={styles.benefitItem}>
            <View style={styles.benefitIcon}>
              <Sparkles size={20} color="#F59E0B" />
            </View>
            <Text style={styles.benefitText}>Holistic approach</Text>
          </View>
        </View>
      </View>

      {/* Symptom Tracking */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {isPCOS
            ? 'Track My PCOS/PCOD'
            : (profile.menopauseStage === 'perimenopause'
                ? 'Track My Perimenopause'
                : profile.menopauseStage === 'menopause'
                ? 'Track My Menopause'
                : 'Track Symptoms')}
        </Text>
        <Text style={styles.sectionSubtitle}>
          Monitor patterns to better understand your unique hormonal journey
        </Text>

        <View style={styles.symptomGrid}>
          {symptoms.slice(0, 6).map((symptom) => (
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
          {isPCOS
            ? 'Understanding PCOS/PCOD'
            : (profile.menopauseStage === 'perimenopause' 
                ? 'Understanding Perimenopause' 
                : 'Learn About Menopause')}
        </Text>
        <Text style={styles.sectionSubtitle}>
          {isPCOS
            ? 'Evidence-based information to manage your condition'
            : 'Knowledge is power—educate yourself about this natural transition'}
        </Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.articleScroll}>
          {isPCOS ? (
            <>
              <TouchableOpacity 
                style={styles.articleCard}
                onPress={() => router.push('/treatment/pcos')}
              >
                <View style={styles.articleImagePlaceholder}>
                  <Pill size={32} color="#EC4899" />
                </View>
                <Text style={styles.articleTitle}>Treatment Options</Text>
                <Text style={styles.articleDescription}>
                  Medications, supplements & therapies
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.articleCard}
                onPress={() => router.push('/education/pcos-diet')}
              >
                <View style={styles.articleImagePlaceholder}>
                  <Activity size={32} color="#10B981" />
                </View>
                <Text style={styles.articleTitle}>PCOS Diet Guide</Text>
                <Text style={styles.articleDescription}>
                  Foods to eat and avoid for balance
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.articleCard}
                onPress={() => router.push('/education/pcos-exercise')}
              >
                <View style={styles.articleImagePlaceholder}>
                  <Activity size={32} color="#F59E0B" />
                </View>
                <Text style={styles.articleTitle}>Exercise for PCOS</Text>
                <Text style={styles.articleDescription}>
                  Best workouts to manage symptoms
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity 
                style={styles.articleCard}
                onPress={() => router.push('/education/hrt')}
              >
                <View style={styles.articleImagePlaceholder}>
                  <Pill size={32} color="#8B5A8F" />
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
                  <Activity size={32} color="#6366F1" />
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
                  <Moon size={32} color="#F59E0B" />
                </View>
                <Text style={styles.articleTitle}>Better Sleep</Text>
                <Text style={styles.articleDescription}>
                  Tips for managing night sweats
                </Text>
              </TouchableOpacity>
            </>
          )}
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
  productsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  productsBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
    letterSpacing: 0.5,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 18,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E8D5E8',
    shadowColor: '#8B5A8F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  productIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productBadge: {
    backgroundColor: '#EC4899',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  productBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  productTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10,
    lineHeight: 26,
  },
  productDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 21,
    marginBottom: 16,
  },
  productFeatures: {
    gap: 8,
    marginBottom: 18,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#8B5A8F',
  },
  productButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5A8F',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  productButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  whyChooseSection: {
    backgroundColor: '#F9F5F9',
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 18,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  whyChooseTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 18,
    textAlign: 'center',
  },
  benefitsList: {
    gap: 14,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
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
