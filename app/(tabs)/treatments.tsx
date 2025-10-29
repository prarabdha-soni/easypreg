import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { 
  Pill, Sparkles, Apple, Activity, Heart, Moon, Droplets, 
  ChevronRight, CheckCircle2, AlertCircle, Zap 
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';

export default function TreatmentsScreen() {
  const router = useRouter();
  const { profile } = useUser();

  const isPCOS = profile.healthCondition === 'pcos' || profile.healthCondition === 'pcod';

  // PCOS/PCOD Treatment Categories
  const pcosTreatments = [
    {
      id: 1,
      category: 'Medications',
      icon: Pill,
      color: '#EC4899',
      bg: '#FDF2F8',
      treatments: [
        { name: 'Metformin', purpose: 'Insulin resistance', effectiveness: 'High' },
        { name: 'Birth Control Pills', purpose: 'Cycle regulation', effectiveness: 'High' },
        { name: 'Spironolactone', purpose: 'Anti-androgen', effectiveness: 'Moderate' },
        { name: 'Clomiphene', purpose: 'Fertility support', effectiveness: 'Moderate' },
      ],
      route: '/treatment/pcos',
    },
    {
      id: 2,
      category: 'Supplements',
      icon: Sparkles,
      color: '#10B981',
      bg: '#ECFDF5',
      treatments: [
        { name: 'Inositol (Myo & D-Chiro)', purpose: 'Insulin sensitivity', effectiveness: 'High' },
        { name: 'Vitamin D3', purpose: 'Hormone balance', effectiveness: 'Moderate' },
        { name: 'Omega-3 Fatty Acids', purpose: 'Anti-inflammatory', effectiveness: 'Moderate' },
        { name: 'Berberine', purpose: 'Blood sugar control', effectiveness: 'High' },
      ],
      route: '/treatment/pcos',
    },
    {
      id: 3,
      category: 'Diet & Nutrition',
      icon: Apple,
      color: '#F59E0B',
      bg: '#FFFBEB',
      treatments: [
        { name: 'Low Glycemic Index Diet', purpose: 'Blood sugar management', effectiveness: 'High' },
        { name: 'Anti-inflammatory Foods', purpose: 'Reduce inflammation', effectiveness: 'High' },
        { name: 'High-Fiber Diet', purpose: 'Digestive health', effectiveness: 'Moderate' },
        { name: 'Limit Processed Foods', purpose: 'Weight management', effectiveness: 'High' },
      ],
      route: '/education/pcos-diet',
    },
    {
      id: 4,
      category: 'Exercise & Lifestyle',
      icon: Activity,
      color: '#6366F1',
      bg: '#EEF2FF',
      treatments: [
        { name: 'Cardio Exercise (5x/week)', purpose: 'Weight & insulin', effectiveness: 'High' },
        { name: 'Strength Training', purpose: 'Muscle mass', effectiveness: 'High' },
        { name: 'HIIT Workouts', purpose: 'Fat burning', effectiveness: 'Moderate' },
        { name: 'Yoga & Meditation', purpose: 'Stress reduction', effectiveness: 'Moderate' },
      ],
      route: '/education/pcos-exercise',
    },
  ];

  // Menopause/Perimenopause Treatment Categories
  const menopauseTreatments = [
    {
      id: 1,
      category: 'Hormone Replacement Therapy (HRT)',
      icon: Pill,
      color: '#8B5A8F',
      bg: '#F3E8F3',
      treatments: [
        { name: 'Estrogen Therapy', purpose: 'Hot flashes, bone health', effectiveness: 'High' },
        { name: 'Combined HRT (Estrogen + Progesterone)', purpose: 'Menopause symptoms', effectiveness: 'High' },
        { name: 'Vaginal Estrogen', purpose: 'Vaginal dryness', effectiveness: 'High' },
        { name: 'Tibolone', purpose: 'Multiple symptoms', effectiveness: 'Moderate' },
      ],
      route: '/treatment/hrt',
    },
    {
      id: 2,
      category: 'Non-Hormonal Medications',
      icon: Zap,
      color: '#EF4444',
      bg: '#FEF2F2',
      treatments: [
        { name: 'SSRIs/SNRIs', purpose: 'Hot flashes, mood', effectiveness: 'Moderate' },
        { name: 'Gabapentin', purpose: 'Hot flashes, sleep', effectiveness: 'Moderate' },
        { name: 'Clonidine', purpose: 'Hot flashes', effectiveness: 'Low-Moderate' },
        { name: 'Oxybutynin', purpose: 'Hot flashes', effectiveness: 'Moderate' },
      ],
      route: '/treatment/hrt',
    },
    {
      id: 3,
      category: 'Natural Supplements',
      icon: Sparkles,
      color: '#10B981',
      bg: '#ECFDF5',
      treatments: [
        { name: 'Black Cohosh', purpose: 'Hot flashes', effectiveness: 'Low-Moderate' },
        { name: 'Soy Isoflavones', purpose: 'Menopause symptoms', effectiveness: 'Low-Moderate' },
        { name: 'Evening Primrose Oil', purpose: 'Breast pain, mood', effectiveness: 'Low' },
        { name: 'Vitamin D & Calcium', purpose: 'Bone health', effectiveness: 'High' },
      ],
      route: '/education/lifestyle',
    },
    {
      id: 4,
      category: 'Lifestyle Interventions',
      icon: Heart,
      color: '#EC4899',
      bg: '#FDF2F8',
      treatments: [
        { name: 'Regular Exercise', purpose: 'Weight, mood, bone health', effectiveness: 'High' },
        { name: 'Healthy Diet', purpose: 'Overall health', effectiveness: 'High' },
        { name: 'Stress Management', purpose: 'Symptom relief', effectiveness: 'Moderate' },
        { name: 'Sleep Hygiene', purpose: 'Better sleep', effectiveness: 'High' },
      ],
      route: '/education/lifestyle',
    },
    {
      id: 5,
      category: 'Symptom-Specific Treatments',
      icon: Moon,
      color: '#6366F1',
      bg: '#EEF2FF',
      treatments: [
        { name: 'Vaginal Lubricants', purpose: 'Vaginal dryness', effectiveness: 'High' },
        { name: 'Cooling Techniques', purpose: 'Hot flashes', effectiveness: 'Moderate' },
        { name: 'Cognitive Behavioral Therapy', purpose: 'Mood, sleep', effectiveness: 'Moderate-High' },
        { name: 'Pelvic Floor Exercises', purpose: 'Bladder control', effectiveness: 'High' },
      ],
      route: '/education/sleep',
    },
  ];

  const treatments = isPCOS ? pcosTreatments : menopauseTreatments;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Banner */}
      <View style={styles.headerBanner}>
        <Pill size={32} color="#FFFFFF" />
        <Text style={styles.headerTitle}>Treatment Options</Text>
        <Text style={styles.headerSubtitle}>
          {isPCOS 
            ? 'Evidence-based treatments for PCOS/PCOD management'
            : 'Comprehensive options for menopause & perimenopause'}
        </Text>
      </View>

      {/* Important Notice */}
      <View style={styles.noticeCard}>
        <AlertCircle size={20} color="#F59E0B" />
        <Text style={styles.noticeText}>
          Always consult with your healthcare provider before starting any new treatment. This information is for educational purposes only.
        </Text>
      </View>

      {/* Treatment Categories */}
      <View style={[styles.section, styles.firstSection]}>
        <Text style={styles.sectionTitle}>Browse by Category</Text>
        <Text style={styles.sectionSubtitle}>
          Explore different treatment approaches
        </Text>

        {treatments.map((category) => {
          const IconComponent = category.icon;
          return (
            <View key={category.id} style={styles.categoryCard}>
              <View style={styles.categoryHeader}>
                <View style={[styles.categoryIcon, { backgroundColor: category.bg }]}>
                  <IconComponent size={28} color={category.color} />
                </View>
                <View style={styles.categoryTitleContainer}>
                  <Text style={styles.categoryTitle}>{category.category}</Text>
                  <Text style={styles.categoryCount}>{category.treatments.length} options</Text>
                </View>
              </View>

              <View style={styles.treatmentsList}>
                {category.treatments.map((treatment, index) => (
                  <View key={index} style={styles.treatmentItem}>
                    <View style={styles.treatmentInfo}>
                      <Text style={styles.treatmentName}>{treatment.name}</Text>
                      <Text style={styles.treatmentPurpose}>{treatment.purpose}</Text>
                    </View>
                    <View style={[
                      styles.effectivenessBadge,
                      treatment.effectiveness === 'High' && styles.effectivenessHigh,
                      treatment.effectiveness === 'Moderate' && styles.effectivenessMed,
                      (treatment.effectiveness === 'Low' || treatment.effectiveness === 'Low-Moderate' || treatment.effectiveness === 'Moderate-High') && styles.effectivenessLow,
                    ]}>
                      <Text style={[
                        styles.effectivenessText,
                        treatment.effectiveness === 'High' && styles.effectivenessTextHigh,
                        treatment.effectiveness === 'Moderate' && styles.effectivenessTextMed,
                        (treatment.effectiveness === 'Low' || treatment.effectiveness === 'Low-Moderate' || treatment.effectiveness === 'Moderate-High') && styles.effectivenessTextLow,
                      ]}>
                        {treatment.effectiveness}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              <TouchableOpacity 
                style={styles.learnMoreButton}
                onPress={() => router.push(category.route as any)}
              >
                <Text style={styles.learnMoreText}>Learn More About {category.category}</Text>
                <ChevronRight size={16} color={category.color} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {/* Consultation CTA */}
      <View style={styles.ctaCard}>
        <Text style={styles.ctaTitle}>Need Personalized Guidance?</Text>
        <Text style={styles.ctaText}>
          Connect with our specialists to create a personalized treatment plan tailored to your needs.
        </Text>
        <TouchableOpacity 
          style={styles.ctaButton}
          onPress={() => router.push('/telehealth/providers')}
        >
          <Text style={styles.ctaButtonText}>Talk to a Specialist</Text>
          <ChevronRight size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Treatment Comparison */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Understanding Effectiveness</Text>
        <Text style={styles.sectionSubtitle}>
          How we rate treatment effectiveness
        </Text>

        <View style={styles.legendCard}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
            <View>
              <Text style={styles.legendTitle}>High Effectiveness</Text>
              <Text style={styles.legendDescription}>Strong clinical evidence, works for most people</Text>
            </View>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
            <View>
              <Text style={styles.legendTitle}>Moderate Effectiveness</Text>
              <Text style={styles.legendDescription}>Some evidence, works for some people</Text>
            </View>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#9CA3AF' }]} />
            <View>
              <Text style={styles.legendTitle}>Low-Moderate Effectiveness</Text>
              <Text style={styles.legendDescription}>Limited evidence, may help some individuals</Text>
            </View>
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
    textAlign: 'center',
  },
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#FFFBEB',
    marginHorizontal: 20,
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  noticeText: {
    flex: 1,
    fontSize: 13,
    color: '#92400E',
    lineHeight: 19,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  firstSection: {
    marginTop: 24,
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
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 18,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTitleContainer: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 13,
    color: '#6B7280',
  },
  treatmentsList: {
    gap: 12,
    marginBottom: 16,
  },
  treatmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  treatmentInfo: {
    flex: 1,
    marginRight: 12,
  },
  treatmentName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 3,
  },
  treatmentPurpose: {
    fontSize: 13,
    color: '#6B7280',
  },
  effectivenessBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  effectivenessHigh: {
    backgroundColor: '#D1FAE5',
  },
  effectivenessMed: {
    backgroundColor: '#FEF3C7',
  },
  effectivenessLow: {
    backgroundColor: '#F3F4F6',
  },
  effectivenessText: {
    fontSize: 11,
    fontWeight: '700',
  },
  effectivenessTextHigh: {
    color: '#065F46',
  },
  effectivenessTextMed: {
    color: '#92400E',
  },
  effectivenessTextLow: {
    color: '#4B5563',
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#8B5A8F',
    backgroundColor: '#F9F5F9',
    gap: 6,
  },
  learnMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5A8F',
  },
  ctaCard: {
    backgroundColor: '#EEF2FF',
    marginHorizontal: 20,
    marginBottom: 32,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 10,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 18,
    textAlign: 'center',
    lineHeight: 21,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  ctaButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  legendCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
  },
  legendTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 3,
  },
  legendDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
});

