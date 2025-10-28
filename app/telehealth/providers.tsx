import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Video, Star, Calendar, CheckCircle2 } from 'lucide-react-native';
import { useUser } from '@/contexts/UserContext';

export default function ProvidersScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useUser();

  const providers = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      title: 'OB-GYN, Menopause Specialist',
      rating: 4.9,
      reviews: 234,
      experience: '15+ years',
      specialties: ['HRT', 'Perimenopause', 'Bone Health'],
      nextAvailable: 'Tomorrow at 2:00 PM',
      price: '₹2,400',
    },
    {
      id: 2,
      name: 'Dr. Anjali Gupta',
      title: 'Endocrinologist',
      rating: 4.8,
      reviews: 189,
      experience: '12+ years',
      specialties: ['Hormone Balance', 'Thyroid', 'Metabolism'],
      nextAvailable: 'Today at 5:30 PM',
      price: '₹2,800',
    },
    {
      id: 3,
      name: 'Dr. Kavita Reddy',
      title: 'Women Health Specialist',
      rating: 5.0,
      reviews: 156,
      experience: '10+ years',
      specialties: ['HRT', 'Sleep Disorders', 'Mood Support'],
      nextAvailable: 'Tomorrow at 10:00 AM',
      price: '₹2,200',
    },
  ];

  const handleBookAppointment = (provider: typeof providers[0]) => {
    updateProfile({ hasProvider: true });
    router.push('/telehealth/booking');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Our Providers</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Expert Menopause Care</Text>
          <Text style={styles.heroSubtitle}>
            Connect with board-certified specialists who understand menopause inside and out
          </Text>
        </View>

        {/* Benefits */}
        <View style={styles.benefitsSection}>
          <View style={styles.benefitItem}>
            <CheckCircle2 size={20} color="#10B981" />
            <Text style={styles.benefitText}>Video visits from home</Text>
          </View>
          <View style={styles.benefitItem}>
            <CheckCircle2 size={20} color="#10B981" />
            <Text style={styles.benefitText}>Same-day appointments</Text>
          </View>
          <View style={styles.benefitItem}>
            <CheckCircle2 size={20} color="#10B981" />
            <Text style={styles.benefitText}>Prescriptions sent to your pharmacy</Text>
          </View>
        </View>

        {/* Providers List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Providers</Text>
          
          {providers.map((provider) => (
            <View key={provider.id} style={styles.providerCard}>
              {/* Provider Avatar */}
              <View style={styles.providerHeader}>
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarInitials}>
                    {provider.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <View style={styles.providerInfo}>
                  <Text style={styles.providerName}>{provider.name}</Text>
                  <Text style={styles.providerTitle}>{provider.title}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.ratingText}>{provider.rating}</Text>
                    <Text style={styles.reviewsText}>({provider.reviews} reviews)</Text>
                  </View>
                </View>
              </View>

              {/* Experience */}
              <View style={styles.experienceTag}>
                <Text style={styles.experienceText}>{provider.experience} experience</Text>
              </View>

              {/* Specialties */}
              <View style={styles.specialtiesContainer}>
                {provider.specialties.map((specialty, index) => (
                  <View key={index} style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>{specialty}</Text>
                  </View>
                ))}
              </View>

              {/* Availability */}
              <View style={styles.availabilityContainer}>
                <Calendar size={16} color="#6B7280" />
                <Text style={styles.availabilityText}>{provider.nextAvailable}</Text>
              </View>

              {/* Price & Book Button */}
              <View style={styles.providerFooter}>
                <View>
                  <Text style={styles.priceLabel}>Consultation</Text>
                  <Text style={styles.priceValue}>{provider.price}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.bookButton}
                  onPress={() => handleBookAppointment(provider)}
                >
                  <Video size={16} color="#FFFFFF" />
                  <Text style={styles.bookButtonText}>Book Video Visit</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.faqTitle}>How it works</Text>
          <View style={styles.faqItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.faqText}>Choose your provider and book a time</Text>
          </View>
          <View style={styles.faqItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.faqText}>Join the video visit from your phone</Text>
          </View>
          <View style={styles.faqItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.faqText}>Get your treatment plan and prescriptions</Text>
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
    backgroundColor: '#F9FAFB',
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
    backgroundColor: '#FFFFFF',
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
  benefitsSection: {
    backgroundColor: '#F0FDF4',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#D1FAE5',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  providerCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  providerHeader: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EC4899',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  providerTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  reviewsText: {
    fontSize: 13,
    color: '#6B7280',
  },
  experienceTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  experienceText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  specialtyTag: {
    backgroundColor: '#FFF5F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },
  specialtyText: {
    fontSize: 12,
    color: '#EC4899',
    fontWeight: '500',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 16,
  },
  availabilityText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  providerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  priceLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  bookButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  faqSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  faqTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  faqItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EC4899',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  faqText: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});

