import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Heart, Check, ArrowLeft, ChevronRight, Sparkles, Calendar, Video, FileText } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function CareProgramsScreen() {
  const router = useRouter();

  const features = [
    { icon: Heart, title: 'Personalized Assessment', description: 'Comprehensive health evaluation by licensed providers' },
    { icon: FileText, title: 'Custom Treatment Plan', description: 'Tailored HRT and hormone management strategy' },
    { icon: Video, title: 'Monthly Check-ins', description: 'Regular consultations to monitor progress' },
    { icon: Calendar, title: 'Ongoing Support', description: '24/7 access to your care team' },
  ];

  const plans = [
    {
      name: 'Essential',
      price: '2,999',
      period: 'month',
      features: [
        'Initial health assessment',
        'Personalized treatment plan',
        '1 monthly provider consultation',
        'Prescription management',
        'Basic symptom tracking',
      ],
    },
    {
      name: 'Premium',
      price: '4,999',
      period: 'month',
      popular: true,
      features: [
        'Everything in Essential',
        '2 monthly provider consultations',
        'Priority scheduling',
        'Nutrition & lifestyle coaching',
        'Advanced symptom analytics',
        'Wellness resource library',
      ],
    },
    {
      name: 'Complete Care',
      price: '7,999',
      period: 'month',
      features: [
        'Everything in Premium',
        'Unlimited consultations',
        'Dedicated care coordinator',
        'Mental health support',
        'Lab test coordination',
        'Family education sessions',
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personalized Care Programs</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Heart size={48} color="#EC4899" />
          </View>
          <Text style={styles.heroTitle}>Complete Hormone Health Support</Text>
          <Text style={styles.heroSubtitle}>
            Work with licensed providers to create a personalized treatment plan that includes HRT prescription, monitoring, and ongoing support.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's Included</Text>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <IconComponent size={24} color="#8B5A8F" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Plans */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Your Plan</Text>
          {plans.map((plan, index) => (
            <View key={index} style={[styles.planCard, plan.popular && styles.popularPlan]}>
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Sparkles size={14} color="#FFFFFF" />
                  <Text style={styles.popularText}>MOST POPULAR</Text>
                </View>
              )}
              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.planPrice}>
                <Text style={styles.planAmount}>₹{plan.price}</Text>
                <Text style={styles.planPeriod}>/{plan.period}</Text>
              </View>
              <View style={styles.planFeatures}>
                {plan.features.map((feature, fIndex) => (
                  <View key={fIndex} style={styles.planFeatureItem}>
                    <Check size={18} color="#10B981" />
                    <Text style={styles.planFeatureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity style={[styles.planButton, plan.popular && styles.popularButton]}>
                <Text style={[styles.planButtonText, plan.popular && styles.popularButtonText]}>
                  Get Started
                </Text>
                <ChevronRight size={18} color={plan.popular ? '#FFFFFF' : '#8B5A8F'} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* How It Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.stepsContainer}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepTitle}>Complete Assessment</Text>
              <Text style={styles.stepDescription}>
                Fill out a comprehensive health questionnaire
              </Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepTitle}>Meet Your Provider</Text>
              <Text style={styles.stepDescription}>
                Connect with a licensed specialist via video
              </Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepTitle}>Get Your Plan</Text>
              <Text style={styles.stepDescription}>
                Receive personalized treatment recommendations
              </Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <Text style={styles.stepTitle}>Start Treatment</Text>
              <Text style={styles.stepDescription}>
                Begin your journey with ongoing support
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5A8F',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  hero: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E8D5E8',
  },
  heroIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FFF5F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 23,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    gap: 14,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  featureIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F9F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 18,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E8D5E8',
  },
  popularPlan: {
    borderColor: '#8B5A8F',
    borderWidth: 3,
  },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#8B5A8F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    marginBottom: 16,
  },
  popularText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  planName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  planPrice: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 24,
  },
  planAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#8B5A8F',
  },
  planPeriod: {
    fontSize: 18,
    color: '#6B7280',
    marginLeft: 4,
  },
  planFeatures: {
    gap: 12,
    marginBottom: 24,
  },
  planFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  planFeatureText: {
    fontSize: 15,
    color: '#374151',
  },
  planButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F5F9',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    borderWidth: 2,
    borderColor: '#8B5A8F',
  },
  popularButton: {
    backgroundColor: '#8B5A8F',
    borderColor: '#8B5A8F',
  },
  planButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5A8F',
  },
  popularButtonText: {
    color: '#FFFFFF',
  },
  stepsContainer: {
    gap: 16,
  },
  step: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#8B5A8F',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  stepNumberText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  stepDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});

