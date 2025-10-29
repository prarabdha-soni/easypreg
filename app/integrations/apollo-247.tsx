import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ArrowLeft, Phone, Video, MessageCircle, Clock, Star, MapPin, ChevronRight, Heart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Apollo247Screen() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: 'video-consultation',
      title: 'Video Consultation',
      description: 'Face-to-face consultation with specialists',
      price: '₹399',
      duration: '20-30 min',
      icon: Video,
      color: '#3B82F6',
      bg: '#EFF6FF',
    },
    {
      id: 'phone-consultation',
      title: 'Phone Consultation',
      description: 'Audio consultation with healthcare experts',
      price: '₹299',
      duration: '15-20 min',
      icon: Phone,
      color: '#10B981',
      bg: '#F0FDF4',
    },
    {
      id: 'chat-consultation',
      title: 'Chat Consultation',
      description: 'Text-based consultation with doctors',
      price: '₹199',
      duration: 'Unlimited',
      icon: MessageCircle,
      color: '#8B5CF6',
      bg: '#F5F3FF',
    },
    {
      id: 'emergency',
      title: 'Emergency Care',
      description: '24/7 emergency medical assistance',
      price: '₹799',
      duration: 'Immediate',
      icon: Heart,
      color: '#EF4444',
      bg: '#FEF2F2',
    },
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Anjali Mehta',
      specialty: 'Gynecologist & Menopause Specialist',
      rating: 4.9,
      experience: '15 years',
      consultationFee: '₹499',
      nextAvailable: 'Available now',
      image: '👩‍⚕️',
      hospital: 'Apollo Hospitals, Delhi',
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      specialty: 'Endocrinologist & PCOS Expert',
      rating: 4.8,
      experience: '18 years',
      consultationFee: '₹549',
      nextAvailable: 'In 45 mins',
      image: '👨‍⚕️',
      hospital: 'Apollo Hospitals, Mumbai',
    },
    {
      id: 3,
      name: 'Dr. Priya Sharma',
      specialty: 'Women\'s Health & Hormone Therapy',
      rating: 4.9,
      experience: '12 years',
      consultationFee: '₹449',
      nextAvailable: 'Tomorrow 9 AM',
      image: '👩‍⚕️',
      hospital: 'Apollo Hospitals, Bangalore',
    },
    {
      id: 4,
      name: 'Dr. Vikram Singh',
      specialty: 'Reproductive Medicine & Fertility',
      rating: 4.7,
      experience: '14 years',
      consultationFee: '₹599',
      nextAvailable: 'Today 3 PM',
      image: '👨‍⚕️',
      hospital: 'Apollo Hospitals, Chennai',
    },
  ];

  const features = [
    'Apollo\'s trusted network of 10,000+ doctors',
    'Prescription delivery in 2-4 hours',
    'Lab tests at home with instant reports',
    '24/7 emergency helpline',
    'Insurance & cashless treatment',
    'Multi-language support',
    'Secure video consultations',
    'Medicine reminders & refills',
  ];

  const quickActions = [
    { title: 'Book Lab Test', icon: '🧪', color: '#3B82F6' },
    { title: 'Order Medicines', icon: '💊', color: '#10B981' },
    { title: 'Find Hospital', icon: '🏥', color: '#8B5CF6' },
    { title: 'Emergency', icon: '🚨', color: '#EF4444' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Apollo 247</Text>
          <Text style={styles.headerSubtitle}>Healthcare beyond boundaries</Text>
        </View>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Apollo</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Text style={styles.heroEmoji}>🏥</Text>
          </View>
          <Text style={styles.heroTitle}>India's Most Trusted Healthcare</Text>
          <Text style={styles.heroSubtitle}>
            Connect with Apollo's expert doctors, get medicines delivered, and access comprehensive healthcare services.
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.quickActionCard}>
                <Text style={styles.quickActionEmoji}>{action.icon}</Text>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Consultation Services</Text>
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
          <Text style={styles.sectionTitle}>Available Specialists</Text>
          {doctors.map((doctor) => (
            <TouchableOpacity key={doctor.id} style={styles.doctorCard}>
              <View style={styles.doctorImage}>
                <Text style={styles.doctorEmoji}>{doctor.image}</Text>
              </View>
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                <View style={styles.hospitalContainer}>
                  <MapPin size={12} color="#6B7280" />
                  <Text style={styles.hospitalText}>{doctor.hospital}</Text>
                </View>
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
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Apollo 247?</Text>
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
          <Text style={styles.ctaButtonText}>Start Your Health Journey</Text>
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
    backgroundColor: '#1E40AF',
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
    backgroundColor: '#EFF6FF',
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
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  quickActionCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  quickActionEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
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
    borderColor: '#1E40AF',
    backgroundColor: '#EFF6FF',
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
    color: '#1E40AF',
    fontWeight: '500',
  },
  servicePrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E40AF',
  },
  doctorCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  doctorEmoji: {
    fontSize: 30,
  },
  doctorInfo: {
    marginBottom: 12,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
  },
  hospitalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  hospitalText: {
    fontSize: 12,
    color: '#6B7280',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  consultationFee: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E40AF',
  },
  bookButton: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  bookButtonText: {
    fontSize: 14,
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
    backgroundColor: '#1E40AF',
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
    backgroundColor: '#1E40AF',
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
