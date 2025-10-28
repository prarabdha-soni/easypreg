import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { 
  Video, MessageCircle, FileText, Beaker, Sparkles, 
  Calendar, Clock, ChevronRight, CheckCircle, User,
  Phone, Mail, Award, TrendingUp
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';

export default function ExpertCareScreen() {
  const router = useRouter();
  const { profile } = useUser();

  const quickActions = [
    {
      id: 'book-visit',
      title: 'Book a Visit',
      subtitle: 'Video or phone consultation',
      icon: Video,
      color: '#3B82F6',
      bg: '#EFF6FF',
      route: '/telehealth/booking',
    },
    {
      id: 'ask-question',
      title: 'Ask a Question',
      subtitle: 'Get expert advice within 24h',
      icon: MessageCircle,
      color: '#10B981',
      bg: '#ECFDF5',
      route: '/expert/ask-question',
    },
  ];

  const careServices = [
    {
      id: 'care-plan',
      title: 'Care Plan Review',
      description: 'Doctor-monitored health plans and HRT discussion',
      icon: FileText,
      color: '#EC4899',
      bg: '#FDF2F8',
      badge: profile.interestedInHRT ? 'Active' : null,
      badgeColor: '#10B981',
      route: '/expert/care-plan',
    },
    {
      id: 'lab-screening',
      title: 'Lab & Screening',
      description: 'Hormone tests with automated result explanations',
      icon: Beaker,
      color: '#F59E0B',
      bg: '#FFFBEB',
      badge: null,
      route: '/expert/lab-results',
    },
    {
      id: 'personalized-advice',
      title: 'Personalized Advice',
      description: 'Clinician tips based on your tracked symptoms',
      icon: Sparkles,
      color: '#8B5CF6',
      bg: '#F5F3FF',
      badge: 'New',
      badgeColor: '#8B5CF6',
      route: '/expert/advice',
    },
  ];

  const upcomingAppointments = profile.nextAppointment ? [
    {
      id: 1,
      doctor: 'Dr. Prarabdha Soni',
      specialty: 'Menopause Specialist',
      date: profile.nextAppointment,
      type: 'Video Call',
      duration: '30 min',
    }
  ] : [];

  const recentMessages = [
    {
      id: 1,
      from: 'Dr. Prarabdha Soni',
      subject: 'Your Sleep Question',
      preview: 'Based on your symptoms, I recommend trying these sleep hygiene tips...',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      from: 'Care Team',
      subject: 'HRT Follow-up',
      preview: 'Your recent hormone levels look stable. Let\'s schedule a check-in...',
      time: '1 day ago',
      unread: false,
    },
  ];

  const availableDoctors = [
    {
      id: 1,
      name: 'Dr. Prarabdha Soni',
      specialty: 'OB-GYN, Menopause Specialist',
      rating: 4.9,
      reviews: 234,
      nextAvailable: 'Today at 3:00 PM',
      price: '₹2,500',
      verified: true,
    },
    {
      id: 2,
      name: 'Dr. Prarabdha Soni',
      specialty: 'Endocrinologist',
      rating: 4.8,
      reviews: 189,
      nextAvailable: 'Tomorrow at 10:00 AM',
      price: '₹3,000',
      verified: true,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Banner */}
      <View style={styles.headerBanner}>
        <Video size={32} color="#FFFFFF" />
        <Text style={styles.headerTitle}>Expert Care</Text>
        <Text style={styles.headerSubtitle}>
          Connect with menopause specialists
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, styles.firstSection]}>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <TouchableOpacity
                key={action.id}
                style={[styles.quickActionCard, { borderColor: action.color }]}
                onPress={() => router.push(action.route as any)}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.bg }]}>
                  <IconComponent size={28} color={action.color} />
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Upcoming Appointments */}
      {upcomingAppointments.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Calendar size={20} color="#3B82F6" />
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
          </View>

          {upcomingAppointments.map((appointment) => (
            <TouchableOpacity 
              key={appointment.id} 
              style={styles.appointmentCard}
              onPress={() => router.push('/telehealth/appointment')}
            >
              <View style={styles.appointmentHeader}>
                <View style={styles.doctorAvatar}>
                  <User size={24} color="#3B82F6" />
                </View>
                <View style={styles.appointmentInfo}>
                  <Text style={styles.doctorName}>{appointment.doctor}</Text>
                  <Text style={styles.doctorSpecialty}>{appointment.specialty}</Text>
                </View>
                <ChevronRight size={20} color="#9CA3AF" />
              </View>

              <View style={styles.appointmentDetails}>
                <View style={styles.detailItem}>
                  <Calendar size={14} color="#6B7280" />
                  <Text style={styles.detailText}>
                    {appointment.date.toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Clock size={14} color="#6B7280" />
                  <Text style={styles.detailText}>{appointment.duration}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Video size={14} color="#6B7280" />
                  <Text style={styles.detailText}>{appointment.type}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Recent Messages */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MessageCircle size={20} color="#10B981" />
          <Text style={styles.sectionTitle}>Messages from Care Team</Text>
        </View>

        {recentMessages.map((message) => (
          <TouchableOpacity 
            key={message.id} 
            style={[
              styles.messageCard,
              message.unread && styles.messageCardUnread
            ]}
          >
            <View style={styles.messageHeader}>
              <Text style={styles.messageFrom}>{message.from}</Text>
              <Text style={styles.messageTime}>{message.time}</Text>
            </View>
            <Text style={styles.messageSubject}>{message.subject}</Text>
            <Text style={styles.messagePreview} numberOfLines={2}>
              {message.preview}
            </Text>
            {message.unread && (
              <View style={styles.unreadBadge}>
                <View style={styles.unreadDot} />
                <Text style={styles.unreadText}>New</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All Messages</Text>
          <ChevronRight size={16} color="#10B981" />
        </TouchableOpacity>
      </View>

      {/* Care Services */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Expert Services</Text>
        <Text style={styles.sectionSubtitle}>
          Comprehensive menopause care from certified specialists
        </Text>

        {careServices.map((service) => {
          const IconComponent = service.icon;
          return (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => router.push(service.route as any)}
            >
              <View style={[styles.serviceIcon, { backgroundColor: service.bg }]}>
                <IconComponent size={24} color={service.color} />
              </View>
              <View style={styles.serviceContent}>
                <View style={styles.serviceTitleRow}>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  {service.badge && (
                    <View style={[
                      styles.serviceBadge,
                      { backgroundColor: `${service.badgeColor}15`, borderColor: service.badgeColor }
                    ]}>
                      <Text style={[styles.serviceBadgeText, { color: service.badgeColor }]}>
                        {service.badge}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Available Doctors */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Award size={20} color="#8B5A8F" />
          <Text style={styles.sectionTitle}>Available Specialists</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          Board-certified menopause experts ready to help
        </Text>

        {availableDoctors.map((doctor) => (
          <TouchableOpacity 
            key={doctor.id} 
            style={styles.doctorCard}
            onPress={() => router.push('/telehealth/providers')}
          >
            <View style={styles.doctorCardHeader}>
              <View style={styles.doctorCardAvatar}>
                <User size={28} color="#8B5A8F" />
              </View>
              <View style={styles.doctorCardInfo}>
                <View style={styles.doctorNameRow}>
                  <Text style={styles.doctorCardName}>{doctor.name}</Text>
                  {doctor.verified && (
                    <View style={styles.verifiedBadge}>
                      <CheckCircle size={14} color="#3B82F6" />
                    </View>
                  )}
                </View>
                <Text style={styles.doctorCardSpecialty}>{doctor.specialty}</Text>
                <View style={styles.doctorRating}>
                  <Text style={styles.ratingText}>⭐ {doctor.rating}</Text>
                  <Text style={styles.reviewsText}>({doctor.reviews} reviews)</Text>
                </View>
              </View>
            </View>

            <View style={styles.doctorCardFooter}>
              <View style={styles.availabilityInfo}>
                <Clock size={14} color="#10B981" />
                <Text style={styles.availabilityText}>{doctor.nextAvailable}</Text>
              </View>
              <View style={styles.priceTag}>
                <Text style={styles.priceText}>{doctor.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={styles.viewAllDoctorsButton}
          onPress={() => router.push('/telehealth/providers')}
        >
          <Text style={styles.viewAllDoctorsText}>View All Specialists</Text>
          <ChevronRight size={16} color="#8B5A8F" />
        </TouchableOpacity>
      </View>

      {/* Why Expert Care */}
      <View style={styles.section}>
        <View style={styles.whyCard}>
          <Text style={styles.whyTitle}>Why Expert Care Matters</Text>
          <View style={styles.whyList}>
            <View style={styles.whyItem}>
              <CheckCircle size={16} color="#10B981" />
              <Text style={styles.whyText}>Specialists trained in menopause management</Text>
            </View>
            <View style={styles.whyItem}>
              <CheckCircle size={16} color="#10B981" />
              <Text style={styles.whyText}>Personalized treatment plans based on your data</Text>
            </View>
            <View style={styles.whyItem}>
              <CheckCircle size={16} color="#10B981" />
              <Text style={styles.whyText}>Convenient telehealth from home</Text>
            </View>
            <View style={styles.whyItem}>
              <CheckCircle size={16} color="#10B981" />
              <Text style={styles.whyText}>Ongoing monitoring and adjustments</Text>
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
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  firstSection: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
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
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  quickActionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 6,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  appointmentCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
    marginBottom: 12,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appointmentInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 13,
    color: '#6B7280',
  },
  appointmentDetails: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#DBEAFE',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: '#6B7280',
  },
  messageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E8D5E8',
    position: 'relative',
  },
  messageCardUnread: {
    borderColor: '#10B981',
    borderWidth: 2,
    backgroundColor: '#ECFDF5',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  messageFrom: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  messageTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  messageSubject: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  messagePreview: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  unreadBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  unreadText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 12,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  serviceIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  serviceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  serviceBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  serviceDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  doctorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  doctorCardHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  doctorCardAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3E8F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorCardInfo: {
    flex: 1,
  },
  doctorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  doctorCardName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
  },
  verifiedBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorCardSpecialty: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
  },
  doctorRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  reviewsText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  doctorCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  availabilityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  availabilityText: {
    fontSize: 13,
    color: '#10B981',
    fontWeight: '600',
  },
  priceTag: {
    backgroundColor: '#F3E8F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#8B5A8F',
  },
  viewAllDoctorsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#8B5A8F',
    gap: 6,
    marginTop: 8,
  },
  viewAllDoctorsText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  whyCard: {
    backgroundColor: '#F3E8F3',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E8D5E8',
  },
  whyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5A3A5A',
    marginBottom: 16,
  },
  whyList: {
    gap: 12,
  },
  whyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  whyText: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
});
