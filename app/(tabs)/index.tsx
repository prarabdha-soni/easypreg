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

  const phaseKey: 'Menstrual'|'Follicular'|'Ovulation'|'Luteal' = useMemo(() => {
    if (!profile.lastPeriodDate) return 'Follicular';
    return getCurrentHormonalPhase(getCycleDay(profile.lastPeriodDate));
  }, [profile.lastPeriodDate]);

  const theme = themes[phaseKey];

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

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface }]} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <Text style={styles.brand}>GLOWW</Text>
        <Text style={styles.title}>Your hormones change every week.</Text>
        <Text style={styles.subtitle}>So should your sleep, fitness, and glow.</Text>
        <Text style={styles.phaseName}>{phaseKey.toUpperCase()} {theme.phaseIcon}</Text>
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

      {/* Gloww Moment card */}
      {!momentDone && (
        <View style={styles.momentCard}>
          <Text style={styles.momentHeader}>Gloww Moment</Text>
          <Text style={styles.momentText}>
            {phaseKey === 'Menstrual' && '10‑sec belly breaths. Inhale 4, exhale 6.'}
            {phaseKey === 'Follicular' && '10‑sec heart-opening breaths. Welcome new energy.'}
            {phaseKey === 'Ovulation' && 'Shine breath: inhale confidence, exhale tension.'}
            {phaseKey === 'Luteal' && 'Soft waves: longer exhales to ease the body.'}
          </Text>
          {momentActive ? (
            <Animated.View style={[styles.momentPulse, { transform: [{ scale: breath.interpolate({ inputRange: [0,1], outputRange: [1, 1.12] }) }], opacity: breath.interpolate({ inputRange: [0,1], outputRange: [0.5, 1] }) }]} />
          ) : null}
          <TouchableOpacity onPress={() => setMomentActive(true)} disabled={momentActive} style={[styles.momentBtn, { backgroundColor: theme.accentColor, opacity: momentActive ? 0.7 : 1 }]}> 
            <Text style={styles.momentBtnText}>{momentActive ? 'Breathing… 10s' : 'Start 10‑sec breath'}</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.quickRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}>
          <TouchableOpacity style={[styles.quickChip, { borderColor: theme.border }]} onPress={() => router.push('/(tabs)/sleep' as any)}><Text style={styles.quickChipText}>Sleep</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.quickChip, { borderColor: theme.border }]} onPress={() => router.push('/(tabs)/workout' as any)}><Text style={styles.quickChipText}>Fitness</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.quickChip, { borderColor: theme.border }]} onPress={() => router.push('/(tabs)/beauty' as any)}><Text style={styles.quickChipText}>Glow</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.quickChip, { borderColor: theme.border }]} onPress={() => router.push('/(tabs)/profile' as any)}><Text style={styles.quickChipText}>Profile</Text></TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily streak</Text>
        <View style={styles.progressBar}><View style={[styles.progressFill, { width: '57%', backgroundColor: theme.accentColor }]} /></View>
        <Text style={styles.streakMeta}>4/7 routines done</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.illusWrap}>
          <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.illusCircle}>
            <Moon color="#FFFFFF" size={18} />
          </LinearGradient>
        </View>
        <Text style={styles.cardHeader}>SLEEP</Text>
        <Text style={styles.cardTitle}>Nighty-night</Text>
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
        <Text style={styles.cardTitleAlt}>Energize</Text>
        <Text style={styles.cardDescAlt}>Try a 20‑min cardio burst</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/workout' as any)} style={[styles.ctaAlt, { backgroundColor: theme.accentColor }]}><Text style={styles.ctaAltText}>Play</Text></TouchableOpacity>
      </View>

      <View style={styles.glowCard}>
        <View style={styles.illusWrap}>
          <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.illusCircle}>
            <Sparkles color="#FFFFFF" size={18} />
          </LinearGradient>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Sparkles color="#8B5A8F" size={20} />
          <Text style={styles.glowHeader}>Today’s Beauty Insight</Text>
      </View>
        <Text style={styles.glowText}>
          {phaseKey === 'Menstrual' && 'Keep skin hydrated. Try rose water mist.'}
          {phaseKey === 'Follicular' && 'Your glow peaks — exfoliate gently.'}
          {phaseKey === 'Ovulation' && 'Natural radiance — skip foundation.'}
          {phaseKey === 'Luteal' && 'Skin may break out — use calming mask.'}
        </Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/beauty' as any)} style={[styles.glowBtn, { backgroundColor: '#F3E8F3' }]}><Text style={[styles.glowBtnText, { color: theme.accentColor } ]}>See tips</Text></TouchableOpacity>
      </View>


      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F7' },
  hero: { paddingTop: 60, paddingBottom: 28, paddingHorizontal: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  brand: { fontSize: 16, color: 'rgba(255,255,255,0.9)', fontWeight: '800', letterSpacing: 2, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '800', color: '#FFF', marginBottom: 6, textAlign: 'left' },
  subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.9)', marginBottom: 16 },
  moon: { alignSelf: 'center', marginVertical: 8 },
  phaseName: { fontSize: 24, fontWeight: '800', color: '#FFF', textAlign: 'center', marginTop: 8 },
  phaseAffirm: { fontSize: 16, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginTop: 6 },

  quickRow: { marginTop: 12 },
  quickChip: { borderWidth: 1, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#FFFFFF' },
  quickChipText: { color: '#111827', fontWeight: '700' },

  section: { marginTop: 10, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#5A3A5A', marginBottom: 6 },
  progressBar: { height: 10, backgroundColor: '#E8D5E8', borderRadius: 8, overflow: 'hidden' },
  progressFill: { height: '100%' },
  streakMeta: { color: '#6B7280', marginTop: 6, fontSize: 12 },

  card: { backgroundColor: '#FFF', marginHorizontal: 20, marginTop: 18, padding: 20, borderRadius: 18, borderWidth: 1, borderColor: '#E8D5E8' },
  cardHeader: { color: '#8B5A8F', fontSize: 12, fontWeight: '800', marginBottom: 6 },
  cardTitle: { fontSize: 22, fontWeight: '800', color: '#1F2937' },
  cardDesc: { fontSize: 14, color: '#6B7280', marginTop: 6 },
  cta: { alignSelf: 'flex-end', marginTop: 12, backgroundColor: '#8B5A8F', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 10 },
  ctaText: { color: '#FFF', fontWeight: '700' },

  cardAlt: { backgroundColor: '#FFF7F3', marginHorizontal: 20, marginTop: 12, padding: 20, borderRadius: 18, borderWidth: 1, borderColor: '#F2D6C7' },
  cardHeaderAlt: { color: '#B76745', fontSize: 12, fontWeight: '800', marginBottom: 6 },
  cardTitleAlt: { fontSize: 22, fontWeight: '800', color: '#6B3A2E' },
  cardDescAlt: { fontSize: 14, color: '#8C6A60', marginTop: 6 },
  ctaAlt: { alignSelf: 'flex-end', marginTop: 12, backgroundColor: '#E38B65', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 10 },
  ctaAltText: { color: '#FFF', fontWeight: '700' },

  illusWrap: { position: 'absolute', right: 12, top: 12 },
  illusCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', opacity: 0.9 },

  glowCard: { backgroundColor: '#FFFFFF', marginHorizontal: 20, marginTop: 12, padding: 18, borderRadius: 16, borderWidth: 1, borderColor: '#E8D5E8' },
  glowHeader: { fontSize: 15, fontWeight: '800', color: '#5A3A5A' },
  glowText: { marginTop: 8, fontSize: 14, color: '#6B7280' },
  glowBtn: { alignSelf: 'flex-start', marginTop: 10, backgroundColor: '#F3E8F3', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10 },
  glowBtnText: { color: '#8B5A8F', fontWeight: '700' },

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

  momentCard: { backgroundColor: '#FFFFFF', marginHorizontal: 20, marginTop: 14, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E8D5E8', alignItems: 'center' },
  momentHeader: { fontSize: 14, fontWeight: '800', color: '#5A3A5A', marginBottom: 6 },
  momentText: { color: '#374151', textAlign: 'center', marginBottom: 10 },
  momentPulse: { width: 140, height: 140, borderRadius: 70, backgroundColor: 'rgba(138,90,143,0.15)', marginVertical: 6 },
  momentBtn: { marginTop: 8, borderRadius: 20, paddingVertical: 10, paddingHorizontal: 14 },
  momentBtnText: { color: '#FFFFFF', fontWeight: '800' },
});
