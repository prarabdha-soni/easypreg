import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Sparkles, ArrowLeft, CheckCircle, Clock, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function PersonalizedAdviceScreen() {
  const router = useRouter();

  const advice = [
    {
      id: 1,
      from: 'Dr. Prarabdha Soni',
      specialty: 'Menopause Specialist',
      date: 'Today',
      title: 'Managing Hot Flashes',
      content: 'Based on your tracking, your hot flashes tend to peak in the afternoon. Try keeping a portable fan with you and wearing breathable, layered clothing. Avoid caffeine after noon.',
      priority: 'high',
      implemented: false,
    },
    {
      id: 2,
      from: 'Dr. Prarabdha Soni',
      specialty: 'Sleep Specialist',
      date: 'Yesterday',
      title: 'Sleep Hygiene Tips',
      content: 'Your sleep quality has been declining. I recommend keeping your bedroom at 65-68°F, establishing a wind-down routine 30 minutes before bed, and limiting screen time after 9 PM.',
      priority: 'medium',
      implemented: true,
    },
    {
      id: 3,
      from: 'Nutritionist Team',
      specialty: 'Nutrition',
      date: '3 days ago',
      title: 'Bone Health Support',
      content: 'Given your stage, focus on calcium-rich foods (aim for 1200mg/day). Add leafy greens, fortified plant milk, and consider a vitamin D supplement. Weight-bearing exercise is crucial.',
      priority: 'medium',
      implemented: false,
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
        <Text style={styles.headerTitle}>Personalized Advice</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <Sparkles size={24} color="#8B5CF6" />
          <View style={styles.summaryContent}>
            <Text style={styles.summaryTitle}>Clinician Tips</Text>
            <Text style={styles.summaryDescription}>
              Personalized recommendations based on your tracked symptoms and health data
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Advice ({advice.length})</Text>

        {advice.map((item) => (
          <View key={item.id} style={[
            styles.adviceCard,
            item.priority === 'high' && styles.adviceCardHigh,
          ]}>
            <View style={styles.adviceHeader}>
              <View style={styles.doctorInfo}>
                <View style={styles.doctorAvatar}>
                  <User size={20} color="#8B5A8F" />
                </View>
                <View>
                  <Text style={styles.doctorName}>{item.from}</Text>
                  <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
                </View>
              </View>
              <View style={styles.dateInfo}>
                <Clock size={14} color="#9CA3AF" />
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
            </View>

            {item.priority === 'high' && (
              <View style={styles.priorityBadge}>
                <Text style={styles.priorityText}>High Priority</Text>
              </View>
            )}

            <Text style={styles.adviceTitle}>{item.title}</Text>
            <Text style={styles.adviceContent}>{item.content}</Text>

            <View style={styles.adviceFooter}>
              {item.implemented ? (
                <View style={styles.implementedBadge}>
                  <CheckCircle size={14} color="#10B981" />
                  <Text style={styles.implementedText}>Implemented</Text>
                </View>
              ) : (
                <TouchableOpacity style={styles.markButton}>
                  <Text style={styles.markButtonText}>Mark as Implemented</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            💡 New advice is generated weekly based on your symptom patterns and health goals
          </Text>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#F5F3FF',
    padding: 18,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  summaryContent: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#5B21B6',
    marginBottom: 4,
  },
  summaryDescription: {
    fontSize: 13,
    color: '#7C3AED',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  adviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  adviceCardHigh: {
    borderColor: '#EF4444',
    borderWidth: 2,
  },
  adviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  doctorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3E8F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  doctorSpecialty: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#EF4444',
    textTransform: 'uppercase',
  },
  adviceTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10,
  },
  adviceContent: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 21,
    marginBottom: 14,
  },
  adviceFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  implementedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  implementedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  markButton: {
    backgroundColor: '#8B5A8F',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  markButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  infoBox: {
    backgroundColor: '#FFFBEB',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: 40,
  },
  infoText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
});

