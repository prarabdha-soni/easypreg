import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Animated } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { Sparkles, Moon, Dumbbell } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useMemo, useState, useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { getCycleDay, getCurrentHormonalPhase, themes } from '@/services/ThemeService';
import AsyncStorage from '@react-native-async-storage/async-storage';

// theming and phase helpers centralized in ThemeService

export default function HomeScreen() {
  const { profile } = useUser();
  const router = useRouter();
  const [showGlow, setShowGlow] = useState(false);
  const [momentActive, setMomentActive] = useState(false);
  const [momentDone, setMomentDone] = useState(false);
  const breath = useRef(new Animated.Value(0)).current;
  const [weeklyCount, setWeeklyCount] = useState(0);

  const phaseKey: 'Menstrual'|'Follicular'|'Ovulation'|'Luteal' = useMemo(() => {
    if (!profile.lastPeriodDate) return 'Follicular';
    return getCurrentHormonalPhase(getCycleDay(profile.lastPeriodDate));
  }, [profile.lastPeriodDate]);

  const theme = themes[phaseKey];

  function getNextOvulationDate(last: Date | null): Date | null {
    if (!last) return null;
    const msDay = 24 * 60 * 60 * 1000;
    let ov = new Date(last);
    ov.setDate(ov.getDate() + 14);
    const now = new Date();
    while (ov.getTime() < now.getTime() - msDay) {
      ov = new Date(ov.getTime() + 28 * msDay);
    }
    return ov;
  }

  const peakFertile = getNextOvulationDate(profile.lastPeriodDate ?? null);
  const peakLabel = peakFertile ? peakFertile.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : null;

  // Entry moment overlay (3 seconds)
  const [showIntro, setShowIntro] = useState(true);
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    );
    loop.start();
    const t = setTimeout(() => setShowIntro(false), 3000);
    return () => { loop.stop(); clearTimeout(t); };
  }, [pulse]);

  const introByPhase: Record<'Menstrual'|'Follicular'|'Ovulation'|'Luteal', { gradient: [string,string]; message: string }> = {
    Menstrual: { gradient: ['#3F2A58', '#5C1349'], message: 'Breathe in calm. Your body is restoring itself today.' },
    Follicular: { gradient: ['#A9C6FF', '#E7A0F8'], message: 'Energy is rising 🌼 — open your heart to new flow.' },
    Ovulation: { gradient: ['#FFD27A', '#FFB347'], message: 'You’re radiant ✨ — breathe in confidence.' },
    Luteal: { gradient: ['#F1E0D6', '#D9BBA8'], message: 'Ease into calm — your body seeks gentleness now.' },
  };
  const intro = introByPhase[phaseKey];

  // Gloww Moment once per day (10s breath)
  useEffect(() => {
    (async () => {
      const todayKey = new Date().toISOString().slice(0,10);
      const stored = await AsyncStorage.getItem(`@gloww_moment:${todayKey}`);
      setMomentDone(!!stored);
    })();
  }, []);

  useEffect(() => {
    if (!momentActive) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breath, { toValue: 1, duration: 2500, useNativeDriver: true }),
        Animated.timing(breath, { toValue: 0, duration: 2500, useNativeDriver: true })
      ])
    );
    loop.start();
    const t = setTimeout(async () => {
      loop.stop();
      setMomentActive(false);
      const todayKey = new Date().toISOString().slice(0,10);
      await AsyncStorage.setItem(`@gloww_moment:${todayKey}`, '1');
      setMomentDone(true);
    }, 10000);
    return () => { loop.stop(); clearTimeout(t); };
  }, [momentActive, breath]);

  // Compute 7‑day streak from stored completions (sleep/workout/gloww)
  useEffect(() => {
    (async () => {
      const today = new Date();
      const dates: Date[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        dates.push(d);
      }
      // Generate keys per date
      const keys: string[] = [];
      dates.forEach(d => {
        const y = d.getFullYear(); const m = d.getMonth() + 1; const day = d.getDate();
        keys.push(`@gloww_moment:${d.toISOString().slice(0,10)}`);
        keys.push(`@sleep_done:${y}-${m}-${day}:Menstrual`);
        keys.push(`@sleep_done:${y}-${m}-${day}:Follicular`);
        keys.push(`@sleep_done:${y}-${m}-${day}:Ovulation`);
        keys.push(`@sleep_done:${y}-${m}-${day}:Luteal`);
        keys.push(`@workout_done:${y}-${m}-${day}`);
      });
      let count = 0;
      try {
        const results = await AsyncStorage.multiGet(keys);
        for (let i = 0; i < dates.length; i++) {
          const base = i * 6; // 6 keys per day
          const slice = results.slice(base, base + 6).map(r => r[1]);
          const any = slice.some(v => !!v);
          if (any) count++;
        }
      } catch {}
      setWeeklyCount(count);
    })();
  }, [momentDone]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface }]} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <View style={styles.heroTop}>
          <Text style={styles.brand}>GLOWW</Text>
          {peakLabel && (
            <View style={styles.fertilePill}>
              <Text style={styles.fertilePillText}>Peak fertile: {peakLabel}</Text>
            </View>
          )}
        </View>
        <Text style={styles.title}>Your hormones change every week.</Text>
        <Text style={styles.subtitle}>So should your sleep, fitness, and glow.</Text>
        <View style={styles.phaseContainer}>
          <Text style={styles.phaseName}>{phaseKey.toUpperCase()}</Text>
          <View style={styles.phaseIconWrapper}>
            <Text style={styles.phaseIconText}>{theme.phaseIcon}</Text>
          </View>
        </View>
        <Text style={styles.phaseAffirm}>{theme.phaseText}</Text>
      </LinearGradient>

      {/* Intro overlay */}
      {showIntro && (
        <Modal transparent animationType="fade" visible={showIntro}>
          <LinearGradient colors={intro.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.introLayer}>
            <Text style={styles.introBrand}>GLOWW</Text>
            <Text style={styles.introText}>{intro.message}</Text>
            <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulse.interpolate({ inputRange: [0,1], outputRange: [1, 1.12] }) }], opacity: pulse.interpolate({ inputRange: [0,1], outputRange: [0.5, 1] }) }]} />
          </LinearGradient>
        </Modal>
      )}

      {/* quick actions removed as requested */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily streak</Text>
        <View style={styles.progressBar}><View style={[styles.progressFill, { width: `${Math.round((weeklyCount/7)*100)}%`, backgroundColor: theme.accentColor }]} /></View>
        <Text style={styles.streakMeta}>{weeklyCount}/7 routines done</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.illusWrap}>
          <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.illusCircle}>
            <Moon color="#FFFFFF" size={18} />
          </LinearGradient>
        </View>
        <Text style={styles.cardHeader}>SLEEP</Text>
        <Text style={styles.cardTitle}>Improve sleep</Text>
        <Text style={styles.cardDesc}>Wind down with a calming meditation</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/sleep' as any)} style={[styles.cta, { backgroundColor: theme.accentColor }]}><Text style={styles.ctaText}>Start</Text></TouchableOpacity>
      </View>

      <View style={styles.cardAlt}>
        <View style={styles.illusWrap}>
          <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.illusCircle}>
            <Dumbbell color="#FFFFFF" size={18} />
          </LinearGradient>
        </View>
        <Text style={styles.cardHeaderAlt}>FITNESS</Text>
        <Text style={styles.cardTitleAlt}>Workout</Text>
        <Text style={styles.cardDescAlt}>Try a 20‑min cardio burst</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/workout' as any)} style={[styles.ctaAlt, { backgroundColor: theme.accentColor }]}><Text style={styles.ctaAltText}>Play</Text></TouchableOpacity>
      </View>

      <View style={styles.glowCard}>
        <View style={styles.illusWrap}>
          <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.illusCircle}>
            <Sparkles color="#FFFFFF" size={18} strokeWidth={2} />
          </LinearGradient>
        </View>
        <Text style={styles.glowHeader}>Hair / Skin Care</Text>
        <Text style={styles.glowText}>Open for phase‑based skin and hair routines.</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/beauty' as any)} style={styles.glowBtn}>
          <Text style={[styles.glowBtnText, { color: theme.accentColor }]}>Open</Text>
        </TouchableOpacity>
      </View>


      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F7' },
  hero: { paddingTop: 56, paddingBottom: 32, paddingHorizontal: 20, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  brand: { fontSize: 18, color: 'rgba(255,255,255,0.95)', fontWeight: '700', letterSpacing: 3, fontFamily: 'System' },
  title: { fontSize: 26, fontWeight: '700', color: '#FFF', marginBottom: 8, textAlign: 'left', lineHeight: 34 },
  subtitle: { fontSize: 15, color: 'rgba(255,255,255,0.88)', marginBottom: 20, lineHeight: 22 },
  fertilePill: { backgroundColor: 'rgba(255,255,255,0.92)', paddingVertical: 5, paddingHorizontal: 12, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  fertilePillText: { color: '#1F2937', fontWeight: '700', fontSize: 11, letterSpacing: 0.3 },
  phaseContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 4, marginBottom: 8 },
  phaseName: { fontSize: 28, fontWeight: '700', color: '#FFF', letterSpacing: 1 },
  phaseIconWrapper: { marginLeft: 8, width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  phaseIconText: { fontSize: 20 },
  phaseAffirm: { fontSize: 15, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginTop: 4, lineHeight: 22 },

  quickRow: { marginTop: 12 },
  quickChip: { borderWidth: 1, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#FFFFFF' },
  quickChipText: { color: '#111827', fontWeight: '700' },

  section: { marginTop: 18, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#4B5563', marginBottom: 8, letterSpacing: 0.3 },
  progressBar: { height: 6, backgroundColor: '#E5E7EB', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  streakMeta: { color: '#6B7280', marginTop: 8, fontSize: 12, fontWeight: '500' },

  card: { backgroundColor: '#FFF', marginHorizontal: 20, marginTop: 20, padding: 22, borderRadius: 20, borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  cardHeader: { color: '#6B7280', fontSize: 11, fontWeight: '700', marginBottom: 8, letterSpacing: 1.2, textTransform: 'uppercase' },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#111827', lineHeight: 28 },
  cardDesc: { fontSize: 14, color: '#6B7280', marginTop: 8, lineHeight: 20 },
  cta: { alignSelf: 'flex-end', marginTop: 16, paddingVertical: 11, paddingHorizontal: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  ctaText: { color: '#FFF', fontWeight: '700', fontSize: 14, letterSpacing: 0.3 },

  cardAlt: { backgroundColor: '#FFF', marginHorizontal: 20, marginTop: 14, padding: 22, borderRadius: 20, borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  cardHeaderAlt: { color: '#6B7280', fontSize: 11, fontWeight: '700', marginBottom: 8, letterSpacing: 1.2, textTransform: 'uppercase' },
  cardTitleAlt: { fontSize: 20, fontWeight: '700', color: '#111827', lineHeight: 28 },
  cardDescAlt: { fontSize: 14, color: '#6B7280', marginTop: 8, lineHeight: 20 },
  ctaAlt: { alignSelf: 'flex-end', marginTop: 16, paddingVertical: 11, paddingHorizontal: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  ctaAltText: { color: '#FFF', fontWeight: '700', fontSize: 14, letterSpacing: 0.3 },

  illusWrap: { position: 'absolute', right: 12, top: 12 },
  illusCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', opacity: 0.9 },

  glowCard: { backgroundColor: '#FFFFFF', marginHorizontal: 20, marginTop: 14, padding: 22, borderRadius: 20, borderWidth: 1, borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  glowHeader: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 6 },
  glowText: { marginTop: 4, fontSize: 14, color: '#6B7280', lineHeight: 20 },
  glowBtn: { alignSelf: 'flex-start', marginTop: 14, backgroundColor: '#F9FAFB', borderWidth: 1.5, borderColor: '#E5E7EB', paddingVertical: 9, paddingHorizontal: 18, borderRadius: 10 },
  glowBtnText: { fontWeight: '700', fontSize: 13, letterSpacing: 0.3 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, width: '100%', maxWidth: 360, borderWidth: 1, borderColor: '#E5E7EB' },
  modalTitle: { fontSize: 16, fontWeight: '800', color: '#111827', marginBottom: 8 },
  modalLine: { fontSize: 14, color: '#4B5563', marginBottom: 6 },
  close: { marginTop: 12, backgroundColor: '#8B5A8F', borderRadius: 10, paddingVertical: 10 },
  closeText: { color: '#FFF', fontWeight: '700', textAlign: 'center' },

  introLayer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  introBrand: { color: 'rgba(255,255,255,0.85)', letterSpacing: 2, fontWeight: '800', marginBottom: 16 },
  introText: { color: '#FFFFFF', fontSize: 18, fontWeight: '800', textAlign: 'center', paddingHorizontal: 28 },
  pulseCircle: { position: 'absolute', width: 220, height: 220, borderRadius: 110, backgroundColor: 'rgba(255,255,255,0.15)' },

  momentCard: { backgroundColor: '#FFFFFF', marginHorizontal: 20, marginTop: 20, padding: 24, borderRadius: 20, borderWidth: 1, borderColor: '#E5E7EB', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  momentHeader: { fontSize: 13, fontWeight: '700', color: '#4B5563', marginBottom: 10, letterSpacing: 1.2, textTransform: 'uppercase' },
  momentText: { color: '#374151', textAlign: 'center', marginBottom: 16, fontSize: 15, lineHeight: 22, paddingHorizontal: 8 },
  momentPulse: { width: 140, height: 140, borderRadius: 70, backgroundColor: 'rgba(138,90,143,0.12)', marginVertical: 8 },
  momentBtn: { marginTop: 4, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  momentBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14, letterSpacing: 0.3 },
});
