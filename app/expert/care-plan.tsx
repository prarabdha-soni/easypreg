import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FileText, ArrowLeft, Calendar, Pill, TrendingUp, CheckCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';

export default function CarePlanScreen() {
  const router = useRouter();
  const { profile } = useUser();

  const carePlanItems = [
    {
      id: 1,
      title: 'Hormone Replacement Therapy',
      status: profile.interestedInHRT ? 'Active' : 'Not Started',
      statusColor: profile.interestedInHRT ? '#10B981' : '#9CA3AF',
      details: profile.interestedInHRT 
        ? 'Currently exploring HRT options with specialist'
        : 'Discuss with your doctor to get started',
      icon: Pill,
    },
    {
      id: 2,
      title: 'Symptom Monitoring',
      status: 'Active',
      statusColor: '#10B981',
      details: 'Tracking hot flashes, sleep, and mood daily',
      icon: TrendingUp,
    },
    {
      id: 3,
      title: 'Follow-up Appointments',
      status: profile.nextAppointment ? 'Scheduled' : 'Pending',
      statusColor: profile.nextAppointment ? '#3B82F6' : '#F59E0B',
      details: profile.nextAppointment 
        ? `Next visit: ${profile.nextAppointment.toLocaleDateString()}`
        : 'Schedule your next check-in',
      icon: Calendar,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Care Plan Review</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Your Menopause Care Plan</Text>
          <Text style={styles.summaryDescription}>
            Doctor-monitored health plans personalized to your stage and symptoms
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Active Care Components</Text>
        {carePlanItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <View key={item.id} style={styles.planCard}>
              <View style={styles.planHeader}>
                <View style={styles.planIcon}>
                  <IconComponent size={20} color="#8B5A8F" />
                </View>
                <View style={styles.planInfo}>
                  <Text style={styles.planTitle}>{item.title}</Text>
                  <Text style={styles.planDetails}>{item.details}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: `${item.statusColor}15` }]}>
                <Text style={[styles.statusText, { color: item.statusColor }]}>
                  {item.status}
                </Text>
              </View>
            </View>
          );
        })}

        <View style={styles.recommendationsCard}>
          <Text style={styles.recommendationsTitle}>Doctor's Recommendations</Text>
          <View style={styles.recommendationsList}>
            <View style={styles.recommendationItem}>
              <CheckCircle size={16} color="#10B981" />
              <Text style={styles.recommendationText}>
                Continue daily symptom tracking for pattern analysis
              </Text>
            </View>
            <View style={styles.recommendationItem}>
              <CheckCircle size={16} color="#10B981" />
              <Text style={styles.recommendationText}>
                Consider calcium and vitamin D supplements for bone health
              </Text>
            </View>
            <View style={styles.recommendationItem}>
              <CheckCircle size={16} color="#10B981" />
              <Text style={styles.recommendationText}>
                Schedule follow-up in 3 months to review HRT progress
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact Your Care Team</Text>
        </TouchableOpacity>
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
    backgroundColor: '#8B5A8F',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  summaryCard: {
    backgroundColor: '#F3E8F3',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E8D5E8',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5A3A5A',
    marginBottom: 8,
  },
  summaryDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  planHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  planIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3E8F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planInfo: {
    flex: 1,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  planDetails: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  recommendationsCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 18,
    marginTop: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 14,
  },
  recommendationsList: {
    gap: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: '#047857',
    lineHeight: 20,
  },
  contactButton: {
    backgroundColor: '#8B5A8F',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

