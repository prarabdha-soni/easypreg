import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'expo-router';
import { getCycleDay as svcGetCycleDay, getCurrentHormonalPhase, themes } from '@/services/ThemeService';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Edit3, ChevronRight, TrendingUp, Settings } from 'lucide-react-native';

function getNextPeriodDate(lastPeriodDate: Date): Date {
  const next = new Date(lastPeriodDate);
  next.setDate(next.getDate() + 28);
  return next;
}

export default function ProfileScreen() {
  const { profile } = useUser();
  const router = useRouter();

  const today = new Date();
  const themeKey = profile.lastPeriodDate ? getCurrentHormonalPhase(svcGetCycleDay(profile.lastPeriodDate)) : 'Follicular';
  const theme = themes[themeKey];
  
  const cycleDay = profile.lastPeriodDate ? svcGetCycleDay(profile.lastPeriodDate) : 6;
  const phaseKey = profile.lastPeriodDate ? getCurrentHormonalPhase(cycleDay) : 'Follicular';
  const daysTillNext = profile.lastPeriodDate ? 28 - cycleDay : null;
  const nextPeriodDate = profile.lastPeriodDate ? getNextPeriodDate(profile.lastPeriodDate) : null;
  const nextOvulationDate = profile.lastPeriodDate ? (() => {
    const nextOv = new Date(profile.lastPeriodDate);
    nextOv.setDate(nextOv.getDate() + 14);
    // If ovulation has passed, add 28 days for next cycle
    if (nextOv.getTime() <= today.getTime()) {
      nextOv.setDate(nextOv.getDate() + 28);
    }
    return nextOv;
  })() : null;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface }]} showsVerticalScrollIndicator={false}>
      {/* Hero Header */}
      <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <Text style={styles.heroTitle}>Profile</Text>
        <Text style={styles.heroSubtitle}>Manage your cycle & preferences</Text>
      </LinearGradient>

      {/* Cycle Overview Card */}
      <View style={[styles.sectionCard, { borderColor: theme.border, backgroundColor: '#FFFFFF' }]}>
        <View style={styles.sectionHeader}>
          <Calendar color={theme.accentColor} size={20} />
          <Text style={[styles.sectionTitle, { color: '#111827' }]}>Cycle Overview</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Current Phase</Text>
          <View style={[styles.phaseBadge, { backgroundColor: theme.accentColor + '15' }]}>
            <Text style={[styles.phaseBadgeText, { color: theme.accentColor }]}>
              {phaseKey} {theme.phaseIcon}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Cycle Day</Text>
          <Text style={[styles.infoValue, { color: theme.accentColor }]}>Day {cycleDay + 1} of 28</Text>
        </View>

        {profile.lastPeriodDate && (
          <>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Last Period</Text>
              <Text style={styles.infoValue}>
                {profile.lastPeriodDate.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </Text>
            </View>

            {daysTillNext !== null && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Days Until Next Period</Text>
                <Text style={[styles.infoValue, { color: theme.accentColor }]}>{daysTillNext} days</Text>
              </View>
            )}

            {nextPeriodDate && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Next Period Expected</Text>
                <Text style={styles.infoValue}>
                  {nextPeriodDate.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </Text>
              </View>
            )}

            {nextOvulationDate && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Next Ovulation</Text>
                <Text style={styles.infoValue}>
                  {nextOvulationDate.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </Text>
              </View>
            )}
          </>
        )}

        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: theme.accentColor }]} 
          onPress={() => router.push('/onboarding/period-date' as any)}
        >
          <Edit3 color="#FFFFFF" size={16} />
          <Text style={styles.actionButtonText}>Update Period Date</Text>
          <ChevronRight color="#FFFFFF" size={16} />
        </TouchableOpacity>
      </View>

      {/* Cycle Statistics */}
      {profile.lastPeriodDate && (
        <View style={[styles.sectionCard, { borderColor: theme.border, backgroundColor: '#FFFFFF' }]}>
          <View style={styles.sectionHeader}>
            <TrendingUp color={theme.accentColor} size={20} />
            <Text style={[styles.sectionTitle, { color: '#111827' }]}>Cycle Statistics</Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Text style={styles.statValue}>{cycleDay + 1}</Text>
              <Text style={styles.statLabel}>Current Day</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Text style={styles.statValue}>28</Text>
              <Text style={styles.statLabel}>Cycle Length</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Text style={styles.statValue}>{daysTillNext}</Text>
              <Text style={styles.statLabel}>Days Remaining</Text>
            </View>
          </View>
        </View>
      )}

      {/* Quick Actions */}
      <View style={[styles.sectionCard, { borderColor: theme.border, backgroundColor: '#FFFFFF' }]}>
        <View style={styles.sectionHeader}>
          <Settings color={theme.accentColor} size={20} />
          <Text style={[styles.sectionTitle, { color: '#111827' }]}>Quick Actions</Text>
        </View>

        <TouchableOpacity 
          style={[styles.menuItem, { borderColor: theme.border }]}
          onPress={() => router.push('/onboarding/period-date' as any)}
        >
          <View style={styles.menuItemLeft}>
            <Calendar color={theme.accentColor} size={18} />
            <Text style={styles.menuItemText}>Edit Period Date</Text>
          </View>
          <ChevronRight color="#9CA3AF" size={18} />
        </TouchableOpacity>

        {!profile.lastPeriodDate && (
          <View style={[styles.emptyState, { backgroundColor: theme.surface }]}>
            <Calendar color={theme.accentColor} size={32} />
            <Text style={styles.emptyStateTitle}>Set Your Period Date</Text>
            <Text style={styles.emptyStateText}>
              Track your cycle and get personalized recommendations
            </Text>
            <TouchableOpacity 
              style={[styles.emptyStateButton, { backgroundColor: theme.accentColor }]}
              onPress={() => router.push('/onboarding/period-date' as any)}
            >
              <Text style={styles.emptyStateButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { paddingTop: 56, paddingBottom: 28, paddingHorizontal: 20, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  heroTitle: { color: '#FFFFFF', fontSize: 28, fontWeight: '700', marginBottom: 6 },
  heroSubtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 15 },
  sectionCard: { marginTop: 20, borderRadius: 16, borderWidth: 1, padding: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  infoLabel: { fontSize: 14, color: '#6B7280', fontWeight: '500' },
  infoValue: { fontSize: 15, color: '#111827', fontWeight: '600' },
  phaseBadge: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 12 },
  phaseBadgeText: { fontSize: 13, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 12 },
  actionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 12, marginTop: 16 },
  actionButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  statsGrid: { flexDirection: 'row', gap: 12, marginTop: 8 },
  statCard: { flex: 1, padding: 16, borderRadius: 12, borderWidth: 1, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: '700', color: '#111827', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#6B7280', fontWeight: '500' },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1 },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuItemText: { fontSize: 15, color: '#111827', fontWeight: '500' },
  emptyState: { padding: 32, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  emptyStateTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginTop: 12, marginBottom: 6 },
  emptyStateText: { fontSize: 14, color: '#6B7280', textAlign: 'center', lineHeight: 20, marginBottom: 20 },
  emptyStateButton: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 10 },
  emptyStateButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
});


