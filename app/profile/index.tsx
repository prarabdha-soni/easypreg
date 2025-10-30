import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'expo-router';
import { getCycleDay as svcGetCycleDay, getCurrentHormonalPhase, themes } from '@/services/ThemeService';
import { LinearGradient } from 'expo-linear-gradient';

function getCycleDay(lastPeriodDate: Date) {
  const now = new Date();
  const ms = now.getTime() - lastPeriodDate.getTime();
  const d = Math.floor(ms / (1000 * 60 * 60 * 24));
  return ((d % 28) + 28) % 28;
}

function getPhase(day: number) {
  if (day <= 4) return 'Menstrual';
  if (day <= 12) return 'Follicular';
  if (day <= 16) return 'Ovulation';
  return 'Luteal';
}

export default function ProfileScreen() {
  const { profile } = useUser();
  const router = useRouter();

  const today = new Date();
  const daysSince = profile.lastPeriodDate ? Math.floor((today.getTime() - profile.lastPeriodDate.getTime()) / (1000*60*60*24)) : null;
  const cycleDay = profile.lastPeriodDate ? ((daysSince! % 28) + 28) % 28 : 6;
  const phase = getPhase(cycleDay);
  const daysTillNext = 28 - cycleDay;

  const themeKey = profile.lastPeriodDate ? getCurrentHormonalPhase(svcGetCycleDay(profile.lastPeriodDate)) : 'Follicular';
  const theme = themes[themeKey];

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }] }>
      <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}> 
        <Text style={styles.heroTitle}>Your Profile ✨</Text>
      </LinearGradient>
      <View style={styles.card}>
        <Text style={styles.title}>My Cycle Data</Text>

        <Text style={styles.label}>Last Period Start Date</Text>
        <Text style={styles.value}>
          {profile.lastPeriodDate ? profile.lastPeriodDate.toLocaleDateString() : 'Not set'}
        </Text>
        <TouchableOpacity style={[styles.update, { backgroundColor: '#F3E8F3', borderColor: theme.border }]} onPress={() => router.push('/onboarding/period-date' as any)}>
          <Text style={styles.updateText}>Update Date</Text>
        </TouchableOpacity>

        <View style={styles.metrics}>
          <Text style={styles.metricTitle}>Calculated Phase: <Text style={styles.metricStrong}>{phase}</Text></Text>
          <Text style={styles.metricSub}>Days till next period: <Text style={styles.metricStrong}>{daysTillNext}</Text></Text>
        </View>

        <TouchableOpacity style={[styles.button, { backgroundColor: theme.accentColor }]} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F7', padding: 20 },
  hero: { paddingTop: 56, paddingBottom: 20, paddingHorizontal: 20, borderRadius: 20, marginBottom: 14 },
  heroTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#E8D5E8', padding: 20, marginTop: 20 },
  header: { fontSize: 13, color: '#8B5A8F', fontWeight: '800' },
  title: { fontSize: 22, fontWeight: '800', color: '#1F2937', marginBottom: 16 },
  label: { fontSize: 12, color: '#8B5A8F', fontWeight: '700' },
  value: { fontSize: 16, color: '#374151', marginTop: 4, marginBottom: 12 },
  update: { alignSelf: 'flex-start', backgroundColor: '#F3E8F3', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, marginBottom: 16 },
  updateText: { color: '#8B5A8F', fontWeight: '700' },
  metrics: { backgroundColor: '#FAF5FF', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#E8D5E8', marginBottom: 16 },
  metricTitle: { color: '#1F2937', fontWeight: '700', marginBottom: 6 },
  metricSub: { color: '#6B7280' },
  metricStrong: { color: '#8B5A8F', fontWeight: '800' },
  button: { backgroundColor: '#8B5A8F', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: '800' },
});


