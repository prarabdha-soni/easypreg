import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Activity, Wind, Users, Moon } from 'lucide-react-native';

const yogaPoses = [
  {
    name: 'Butterfly Pose',
    sanskrit: 'Baddha Konasana',
    benefits: 'Improves blood flow to pelvic region',
    image: 'https://images.pexels.com/photos/3822356/pexels-photo-3822356.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Bridge Pose',
    sanskrit: 'Setu Bandhasana',
    benefits: 'Strengthens reproductive organs',
    image: 'https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Legs Up Wall',
    sanskrit: 'Viparita Karani',
    benefits: 'Reduces stress and promotes relaxation',
    image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export default function LifestyleScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lifestyle</Text>
        <Text style={styles.subtitle}>Support your fertility naturally</Text>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Activity size={24} color="#4caf50" />
          <Text style={styles.statValue}>7,234</Text>
          <Text style={styles.statLabel}>Steps Today</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Moon size={24} color="#2196f3" />
          <Text style={styles.statValue}>7.5h</Text>
          <Text style={styles.statLabel}>Sleep</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Wind size={24} color="#9c27b0" />
          <Text style={styles.statValue}>15m</Text>
          <Text style={styles.statLabel}>Meditation</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Yoga for Fertility</Text>
        </View>

        {yogaPoses.map((pose, index) => (
          <TouchableOpacity key={index} style={styles.poseCard}>
            <Image source={{ uri: pose.image }} style={styles.poseImage} />
            <View style={styles.poseContent}>
              <Text style={styles.poseName}>{pose.name}</Text>
              <Text style={styles.poseSanskrit}>{pose.sanskrit}</Text>
              <Text style={styles.poseBenefits}>{pose.benefits}</Text>
              <TouchableOpacity style={styles.watchButton}>
                <Text style={styles.watchButtonText}>Watch Video</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Goals</Text>

        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <Activity size={20} color="#4caf50" />
            <Text style={styles.goalTitle}>Walking Goal</Text>
          </View>
          <Text style={styles.goalProgress}>7,234 / 10,000 steps</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '72%', backgroundColor: '#4caf50' }]} />
          </View>
          <Text style={styles.goalNote}>Keep moving! Walking improves circulation.</Text>
        </View>

        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <Wind size={20} color="#9c27b0" />
            <Text style={styles.goalTitle}>Stress Management</Text>
          </View>
          <Text style={styles.goalProgress}>15 / 20 minutes</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '75%', backgroundColor: '#9c27b0' }]} />
          </View>
          <Text style={styles.goalNote}>Try deep breathing or meditation.</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Users size={24} color="#1a1a1a" />
          <Text style={styles.sectionTitle}>Couple Bonding</Text>
        </View>

        <View style={styles.bondingCard}>
          <Text style={styles.bondingTitle}>Quality Time Together</Text>
          <Text style={styles.bondingText}>
            Schedule 30 minutes of uninterrupted time with your partner. Emotional connection supports your fertility journey.
          </Text>
          <View style={styles.bondingActivities}>
            <Text style={styles.bondingActivity}>💬 Talk about your day</Text>
            <Text style={styles.bondingActivity}>🚶 Take an evening walk</Text>
            <Text style={styles.bondingActivity}>🎵 Cook together</Text>
          </View>
        </View>
      </View>

      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Lifestyle Tips</Text>
        <View style={styles.tip}>
          <Text style={styles.tipIcon}>💤</Text>
          <Text style={styles.tipText}>Aim for 7-8 hours of quality sleep</Text>
        </View>
        <View style={styles.tip}>
          <Text style={styles.tipIcon}>🚭</Text>
          <Text style={styles.tipText}>Avoid smoking and limit alcohol</Text>
        </View>
        <View style={styles.tip}>
          <Text style={styles.tipIcon}>🧘</Text>
          <Text style={styles.tipText}>Practice stress-reduction daily</Text>
        </View>
        <View style={styles.tip}>
          <Text style={styles.tipIcon}>☀️</Text>
          <Text style={styles.tipText}>Get 15 minutes of sunlight for Vitamin D</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  statsCard: {
    margin: 24,
    marginTop: 0,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  section: {
    padding: 24,
    paddingTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  poseCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  poseImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f5f5f5',
  },
  poseContent: {
    padding: 16,
  },
  poseName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  poseSanskrit: {
    fontSize: 14,
    color: '#9c27b0',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  poseBenefits: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  watchButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#9c27b0',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  watchButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  goalCard: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 12,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  goalProgress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  goalNote: {
    fontSize: 12,
    color: '#999',
  },
  bondingCard: {
    padding: 20,
    backgroundColor: '#fff5f7',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f8bbd0',
  },
  bondingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  bondingText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 21,
    marginBottom: 16,
  },
  bondingActivities: {
    gap: 8,
  },
  bondingActivity: {
    fontSize: 14,
    color: '#1a1a1a',
  },
  tipsCard: {
    margin: 24,
    marginTop: 0,
    padding: 20,
    backgroundColor: '#f3f9ff',
    borderRadius: 16,
    marginBottom: 32,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  tipIcon: {
    fontSize: 24,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
});
