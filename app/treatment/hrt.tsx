import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Pill, CheckCircle2, Info, Video } from 'lucide-react-native';
import { useUser } from '@/contexts/UserContext';

export default function HRTScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useUser();

  const treatmentOptions = [
    {
      id: 'estradiol',
      name: 'Estradiol (Estrogen)',
      type: 'Hormone Replacement',
      description: 'Helps relieve hot flashes, night sweats, and vaginal dryness',
      form: 'Patch, Pill, or Gel',
      benefits: ['Reduces hot flashes', 'Improves sleep', 'Helps with mood'],
    },
    {
      id: 'progesterone',
      name: 'Progesterone',
      type: 'Hormone Replacement',
      description: 'Protects the uterus when taking estrogen',
      form: 'Pill or Cream',
      benefits: ['Uterine protection', 'Better sleep', 'Mood support'],
    },
    {
      id: 'combination',
      name: 'Combination HRT',
      type: 'Hormone Replacement',
      description: 'Estrogen + Progesterone for complete relief',
      form: 'Pill or Patch',
      benefits: ['Complete symptom relief', 'Bone health', 'Heart health'],
    },
  ];

  const supplements = [
    { name: 'Black Cohosh', benefit: 'Hot flash relief' },
    { name: 'Evening Primrose Oil', benefit: 'Mood & skin support' },
    { name: 'Vitamin D + Calcium', benefit: 'Bone health' },
    { name: 'Magnesium', benefit: 'Sleep & muscle relaxation' },
  ];

  const handleStartTreatment = () => {
    updateProfile({ interestedInHRT: true });
    router.push('/telehealth/providers');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hormone Replacement</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Find Relief with HRT</Text>
          <Text style={styles.heroSubtitle}>
            Hormone replacement therapy can significantly reduce menopause symptoms. 
            Our providers will help you find the right treatment plan.
          </Text>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Info size={20} color="#3B82F6" />
          <Text style={styles.infoText}>
            HRT is most effective when started during perimenopause or early menopause
          </Text>
        </View>

        {/* Treatment Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Treatment Options</Text>
          
          {treatmentOptions.map((option) => (
            <View key={option.id} style={styles.treatmentCard}>
              <View style={styles.treatmentHeader}>
                <View style={styles.treatmentIconContainer}>
                  <Pill size={24} color="#EC4899" />
                </View>
                <View style={styles.treatmentInfo}>
                  <Text style={styles.treatmentName}>{option.name}</Text>
                  <Text style={styles.treatmentType}>{option.type}</Text>
                </View>
              </View>

              <Text style={styles.treatmentDescription}>{option.description}</Text>
              
              <View style={styles.treatmentMeta}>
                <Text style={styles.treatmentForm}>Available as: {option.form}</Text>
              </View>

              <View style={styles.benefitsList}>
                {option.benefits.map((benefit, index) => (
                  <View key={index} style={styles.benefitItem}>
                    <CheckCircle2 size={16} color="#10B981" />
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Supplements Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Natural Supplements</Text>
          <Text style={styles.sectionSubtitle}>
            Complement your treatment with evidence-based supplements
          </Text>

          <View style={styles.supplementsGrid}>
            {supplements.map((supplement, index) => (
              <View key={index} style={styles.supplementCard}>
                <Text style={styles.supplementName}>{supplement.name}</Text>
                <Text style={styles.supplementBenefit}>{supplement.benefit}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaIcon}>
            <Video size={32} color="#3B82F6" />
          </View>
          <Text style={styles.ctaTitle}>Ready to get started?</Text>
          <Text style={styles.ctaText}>
            Connect with our menopause specialists to discuss HRT options and get a personalized treatment plan.
          </Text>
          <TouchableOpacity style={styles.ctaButton} onPress={handleStartTreatment}>
            <Text style={styles.ctaButtonText}>Talk to a Provider</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  content: {
    flex: 1,
  },
  heroSection: {
    padding: 24,
    backgroundColor: '#FFF5F7',
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#EFF6FF',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  treatmentCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  treatmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  treatmentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF5F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  treatmentInfo: {
    flex: 1,
  },
  treatmentName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  treatmentType: {
    fontSize: 13,
    color: '#EC4899',
    fontWeight: '500',
  },
  treatmentDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  treatmentMeta: {
    marginBottom: 12,
  },
  treatmentForm: {
    fontSize: 13,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  benefitText: {
    fontSize: 14,
    color: '#1F2937',
  },
  supplementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  supplementCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  supplementName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  supplementBenefit: {
    fontSize: 12,
    color: '#6B7280',
  },
  ctaSection: {
    backgroundColor: '#EFF6FF',
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  ctaIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  ctaText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

