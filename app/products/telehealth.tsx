import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Video, ArrowLeft, ChevronRight, Clock, MessageCircle, Calendar, Shield } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function TelehealthScreen() {
  const router = useRouter();

  const specialists = [
    { name: 'Dr. Anuj Mehta', specialty: 'Menopause Specialist', rating: 4.9, consultations: 500 },
    { name: 'Dr. Priya Sharma', specialty: 'Hormone Health Expert', rating: 4.8, consultations: 450 },
    { name: 'Dr. Raj Kumar', specialty: 'Women\'s Health', rating: 4.9, consultations: 600 },
  ];

  const services = [
    { icon: Video, title: 'Video Consultations', description: 'Face-to-face virtual appointments', price: '₹599' },
    { icon: MessageCircle, title: 'Chat Support', description: 'Secure messaging with specialists', price: '₹299' },
    { icon: Calendar, title: 'Follow-up Visits', description: 'Ongoing care and monitoring', price: '₹399' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Expert Telehealth</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Video size={48} color="#3B82F6" />
          </View>
          <Text style={styles.heroTitle}>24/7 Access to Specialists</Text>
          <Text style={styles.heroSubtitle}>
            Connect with certified menopause specialists and women's health experts anytime, anywhere.
          </Text>
        </View>

        {/* Benefits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Our Telehealth</Text>
          <View style={styles.benefitCard}>
            <Clock size={24} color="#10B981" />
            <Text style={styles.benefitTitle}>Available 24/7</Text>
            <Text style={styles.benefitDescription}>
              Get expert care whenever you need it, day or night
            </Text>
          </View>
          <View style={styles.benefitCard}>
            <Shield size={24} color="#8B5CF6" />
            <Text style={styles.benefitTitle}>Board-Certified Experts</Text>
            <Text style={styles.benefitDescription}>
              All providers are licensed and specialized in women's health
            </Text>
          </View>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <View key={index} style={styles.serviceCard}>
                <View style={styles.serviceIcon}>
                  <IconComponent size={28} color="#8B5A8F" />
                </View>
                <View style={styles.serviceContent}>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                </View>
                <Text style={styles.servicePrice}>{service.price}</Text>
              </View>
            );
          })}
        </View>

        {/* Specialists */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Specialists</Text>
          {specialists.map((doctor, index) => (
            <TouchableOpacity key={index} style={styles.doctorCard}>
              <View style={styles.doctorAvatar}>
                <Text style={styles.doctorInitials}>{doctor.name.split(' ').map(n => n[0]).join('')}</Text>
              </View>
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                <Text style={styles.doctorStats}>⭐ {doctor.rating} • {doctor.consultations}+ consultations</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Book Consultation Now</Text>
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
    backgroundColor: '#3B82F6',
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
    backgroundColor: '#EFF6FF',
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
  benefitCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
    alignItems: 'center',
  },
  benefitTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 8,
  },
  benefitDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    gap: 14,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F9F5F9',
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
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3B82F6',
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    gap: 12,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  doctorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorInitials: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
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
    marginBottom: 4,
  },
  doctorStats: {
    fontSize: 12,
    color: '#8B5A8F',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
  },
  ctaButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

