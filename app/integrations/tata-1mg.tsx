import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, Phone, Video, MessageCircle, Clock, Star, MapPin, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Tata1mgScreen() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: 'consultation',
      title: 'Doctor Consultation',
      description: 'Video/Phone consultation with specialists',
      price: '₹299',
      duration: '15-20 min',
      icon: Video,
      color: '#3B82F6',
      bg: '#EFF6FF',
    },
    {
      id: 'chat',
      title: 'Chat with Doctor',
      description: '24/7 text consultation with healthcare experts',
      price: '₹199',
      duration: 'Unlimited',
      icon: MessageCircle,
      color: '#10B981',
      bg: '#F0FDF4',
    },
    {
      id: 'emergency',
      title: 'Emergency Care',
      description: 'Immediate consultation for urgent health issues',
      price: '₹599',
      duration: '5-10 min',
      icon: Phone,
      color: '#EF4444',
      bg: '#FEF2F2',
    },
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      specialty: 'Gynecologist & Menopause Specialist',
      rating: 4.8,
      experience: '12 years',
      consultationFee: '₹399',
      nextAvailable: 'Available now',
      image: '👩‍⚕️',
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      specialty: 'Endocrinologist & PCOS Expert',
      rating: 4.9,
      experience: '15 years',
      consultationFee: '₹449',
      nextAvailable: 'In 30 mins',
      image: '👨‍⚕️',
    },
    {
      id: 3,
      name: 'Dr. Anjali Mehta',
      specialty: 'Women\'s Health & Hormone Therapy',
      rating: 4.7,
      experience: '10 years',
      consultationFee: '₹349',
      nextAvailable: 'Tomorrow 10 AM',
      image: '👩‍⚕️',
    },
  ];

  const features = [
    'Verified doctors with 5+ years experience',
    'Prescription delivery to your doorstep',
    'Lab tests at home',
    '24/7 customer support',
    'Insurance accepted',
    'Secure & confidential',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Tata 1mg</Text>
          <Text style={styles.headerSubtitle}>Healthcare at your fingertips</Text>
        </View>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>1mg</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Text style={styles.heroEmoji}>💊</Text>
          </View>
          <Text style={styles.heroTitle}>Consult with Top Doctors</Text>
          <Text style={styles.heroSubtitle}>
            Get expert medical advice from verified specialists, order medicines, and book lab tests - all in one place.
          </Text>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <TouchableOpacity
                key={service.id}
                style={[styles.serviceCard, selectedService === service.id && styles.selectedService]}
                onPress={() => setSelectedService(service.id)}
              >
                <View style={[styles.serviceIcon, { backgroundColor: service.bg }]}>
                  <IconComponent size={24} color={service.color} />
                </View>
                <View style={styles.serviceContent}>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                  <Text style={styles.serviceDuration}>{service.duration}</Text>
                </View>
                <View style={styles.servicePrice}>
                  <Text style={styles.priceText}>{service.price}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Available Doctors */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Doctors</Text>
          {doctors.map((doctor) => (
            <TouchableOpacity key={doctor.id} style={styles.doctorCard}>
              <View style={styles.doctorImage}>
                <Text style={styles.doctorEmoji}>{doctor.image}</Text>
              </View>
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                <View style={styles.doctorStats}>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.ratingText}>{doctor.rating}</Text>
                  </View>
                  <Text style={styles.experienceText}>{doctor.experience} experience</Text>
                </View>
                <Text style={styles.availabilityText}>
                  <Clock size={12} color="#10B981" />
                  <Text style={styles.availabilityTextContent}> {doctor.nextAvailable}</Text>
                </Text>
              </View>
              <View style={styles.doctorActions}>
                <Text style={styles.consultationFee}>{doctor.consultationFee}</Text>
                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose 1mg?</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA */}
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Start Consultation Now</Text>
          <ChevronRight size={20} color="#FFFFFF" />
        </TouchableOpacity>

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
    backgroundColor: '#00BFA5',
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
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  logoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logoText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
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
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0F2F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroEmoji: {
    fontSize: 40,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
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
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
    borderWidth: 2,
    borderColor: '#E8D5E8',
  },
  selectedService: {
    borderColor: '#00BFA5',
    backgroundColor: '#F0FDFA',
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  serviceDuration: {
    fontSize: 12,
    color: '#00BFA5',
    fontWeight: '500',
  },
  servicePrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#00BFA5',
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0F2F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorEmoji: {
    fontSize: 30,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },
  doctorStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  experienceText: {
    fontSize: 12,
    color: '#6B7280',
  },
  availabilityText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  availabilityTextContent: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  doctorActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  consultationFee: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00BFA5',
    marginBottom: 8,
  },
  bookButton: {
    backgroundColor: '#00BFA5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  featuresGrid: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#00BFA5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  featureText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00BFA5',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
