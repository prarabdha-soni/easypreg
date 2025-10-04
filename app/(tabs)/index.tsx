import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { Calendar, Droplet, Heart, TrendingUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { profile } = useUser();
  const router = useRouter();

  const calculateCycleDay = () => {
    if (!profile.lastPeriodDate) return 1;
    const today = new Date();
    const lastPeriod = new Date(profile.lastPeriodDate);
    const diffTime = Math.abs(today.getTime() - lastPeriod.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return (diffDays % profile.cycleLength) || 1;
  };

  const getCyclePhase = (day: number) => {
    if (day <= 5) return { phase: 'Period', color: '#e91e63', icon: '🩸' };
    if (day <= 11) return { phase: 'Follicular', color: '#9c27b0', icon: '🌱' };
    if (day <= 17) return { phase: 'Fertile Window', color: '#4caf50', icon: '🌸' };
    if (day <= 14) return { phase: 'Ovulation', color: '#ff9800', icon: '🥚' };
    return { phase: 'Luteal', color: '#2196f3', icon: '🌙' };
  };

  const cycleDay = calculateCycleDay();
  const { phase, color, icon } = getCyclePhase(cycleDay);
  const daysUntilOvulation = Math.max(0, 14 - cycleDay);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {profile.gender === 'woman' ? 'Beautiful' : 'There'}!</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
      </View>

      <LinearGradient
        colors={[color + '20', color + '10']}
        style={styles.cycleCard}
      >
        <View style={styles.cycleHeader}>
          <Text style={styles.cycleIcon}>{icon}</Text>
          <View style={styles.cycleTitleContainer}>
            <Text style={styles.cyclePhase}>{phase}</Text>
            <Text style={styles.cycleDay}>Day {cycleDay} of {profile.cycleLength}</Text>
          </View>
        </View>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(cycleDay / profile.cycleLength) * 100}%`, backgroundColor: color }
              ]}
            />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>Period</Text>
            <Text style={styles.progressLabel}>Fertile</Text>
            <Text style={styles.progressLabel}>Ovulation</Text>
            <Text style={styles.progressLabel}>Luteal</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.focusCard}>
        <Text style={styles.focusTitle}>Today's Focus</Text>
        <View style={styles.focusContent}>
          <Text style={styles.focusIcon}>🌸</Text>
          <Text style={styles.focusText}>
            {daysUntilOvulation === 0
              ? "Today is your most fertile day! Stay hydrated and eat zinc-rich foods."
              : daysUntilOvulation <= 3
              ? `Your fertile window is approaching in ${daysUntilOvulation} days. Focus on nutrient-rich foods.`
              : "Maintain a balanced diet and stay active for optimal fertility."}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <View style={styles.actionGrid}>
        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: '#fff5f7' }]}
          onPress={() => router.push('/log/period')}
        >
          <Droplet size={32} color="#e91e63" />
          <Text style={styles.actionText}>Log Period</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: '#f3f9ff' }]}
          onPress={() => router.push('/log/symptoms')}
        >
          <Heart size={32} color="#2196f3" />
          <Text style={styles.actionText}>Log Symptoms</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: '#f1f8f4' }]}
          onPress={() => router.push('/fertility')}
        >
          <TrendingUp size={32} color="#4caf50" />
          <Text style={styles.actionText}>View Insights</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: '#fff8f0' }]}
          onPress={() => router.push('/log/partner')}
        >
          <Calendar size={32} color="#ff9800" />
          <Text style={styles.actionText}>Partner Log</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.insightCard}>
        <Text style={styles.insightTitle}>Fertility Score</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>85</Text>
          <View style={styles.scoreDetails}>
            <Text style={styles.scoreLabel}>Good</Text>
            <Text style={styles.scoreDesc}>You're on track!</Text>
          </View>
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
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  cycleCard: {
    margin: 24,
    marginTop: 0,
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cycleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cycleIcon: {
    fontSize: 48,
    marginRight: 16,
  },
  cycleTitleContainer: {
    flex: 1,
  },
  cyclePhase: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  cycleDay: {
    fontSize: 14,
    color: '#666',
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 10,
    color: '#999',
  },
  focusCard: {
    margin: 24,
    marginTop: 0,
    padding: 20,
    backgroundColor: '#fffbf0',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ffe082',
  },
  focusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  focusContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  focusIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  focusText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 21,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 24,
  },
  actionCard: {
    width: '47%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    gap: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  insightCard: {
    margin: 24,
    marginTop: 0,
    padding: 24,
    backgroundColor: '#f3f9ff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  score: {
    fontSize: 56,
    fontWeight: '700',
    color: '#2196f3',
    marginRight: 20,
  },
  scoreDetails: {
    flex: 1,
  },
  scoreLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  scoreDesc: {
    fontSize: 14,
    color: '#666',
  },
});
