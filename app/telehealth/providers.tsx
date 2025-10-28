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
      name: 'Dr. Prarabdha Soni',
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
      name: 'Dr. Prarabdha Soni',
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
      name: 'Dr. Prarabdha Soni',
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Banner */}
      <View style={styles.headerBanner}>
        <Video size={32} color="#FFFFFF" />
        <Text style={styles.headerTitle}>Talk to Providers</Text>
        <Text style={styles.headerSubtitle}>
          Board-certified menopause specialists
        </Text>
      </View>

      {/* Providers List */}
      <View style={[styles.section, styles.firstSection]}>
        <Text style={styles.sectionTitle}>Available Specialists</Text>
        <Text style={styles.sectionSubtitle}>
          Board-certified menopause experts ready to help
        </Text>
          
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
  providerCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
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
    backgroundColor: '#8B5A8F',
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
    backgroundColor: '#F3E8F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  experienceText: {
    fontSize: 12,
    color: '#8B5A8F',
    fontWeight: '600',
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  specialtyTag: {
    backgroundColor: '#F9F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8D5E8',
  },
  specialtyText: {
    fontSize: 12,
    color: '#8B5A8F',
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
    backgroundColor: '#8B5A8F',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  bookButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

