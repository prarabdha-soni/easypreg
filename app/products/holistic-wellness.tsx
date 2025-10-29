import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Sparkles, ArrowLeft, Heart, Brain, Activity, Moon, Apple, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function HolisticWellnessScreen() {
  const router = useRouter();

  const programs = [
    {
      icon: Activity,
      title: 'Lifestyle Coaching',
      description: 'Personalized guidance on nutrition, exercise, and daily habits',
      color: '#10B981',
      bg: '#F0FDF4',
    },
    {
      icon: Brain,
      title: 'Mental Health Support',
      description: 'Counseling and resources for emotional wellbeing',
      color: '#8B5CF6',
      bg: '#F5F3FF',
    },
    {
      icon: Moon,
      title: 'Sleep Optimization',
      description: 'Expert tips and tracking for better sleep quality',
      color: '#6366F1',
      bg: '#EEF2FF',
    },
    {
      icon: Apple,
      title: 'Nutrition Planning',
      description: 'Custom meal plans designed for hormonal balance',
      color: '#F59E0B',
      bg: '#FFFBEB',
    },
    {
      icon: Heart,
      title: 'Stress Management',
      description: 'Mindfulness practices and relaxation techniques',
      color: '#EC4899',
      bg: '#FDF2F8',
    },
    {
      icon: Users,
      title: 'Support Community',
      description: 'Connect with others on similar journeys',
      color: '#3B82F6',
      bg: '#EFF6FF',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Holistic Wellness</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Sparkles size={48} color="#F59E0B" />
          </View>
          <Text style={styles.heroTitle}>Complete Wellness Support</Text>
          <Text style={styles.heroSubtitle}>
            Beyond medical treatment—lifestyle coaching, mental health support, and holistic care for better quality of life.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Holistic Approach</Text>
          {programs.map((program, index) => {
            const IconComponent = program.icon;
            return (
              <View key={index} style={styles.programCard}>
                <View style={[styles.programIcon, { backgroundColor: program.bg }]}>
                  <IconComponent size={28} color={program.color} />
                </View>
                <View style={styles.programContent}>
                  <Text style={styles.programTitle}>{program.title}</Text>
                  <Text style={styles.programDescription}>{program.description}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.pricingCard}>
          <Text style={styles.pricingTitle}>Complete Wellness Package</Text>
          <View style={styles.pricingAmount}>
            <Text style={styles.price}>₹1,499</Text>
            <Text style={styles.period}>/month</Text>
          </View>
          <Text style={styles.pricingDescription}>
            Access to all wellness programs, personal coach, and community support
          </Text>
          <TouchableOpacity style={styles.enrollButton}>
            <Sparkles size={20} color="#FFFFFF" />
            <Text style={styles.enrollButtonText}>Start Your Wellness Journey</Text>
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
    backgroundColor: '#FAF9F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B',
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
    backgroundColor: '#FFFBEB',
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
  programCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    gap: 14,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  programIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  programContent: {
    flex: 1,
  },
  programTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  programDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  pricingCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 28,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#F59E0B',
    alignItems: 'center',
  },
  pricingTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  pricingAmount: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  price: {
    fontSize: 40,
    fontWeight: '700',
    color: '#F59E0B',
  },
  period: {
    fontSize: 20,
    color: '#6B7280',
    marginLeft: 4,
  },
  pricingDescription: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  enrollButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F59E0B',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    width: '100%',
  },
  enrollButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

