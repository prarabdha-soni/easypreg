import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Animated } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { Sparkles, Crown } from 'lucide-react-native';
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
  
  // Mood Tracker
  const [todayMood, setTodayMood] = useState<'😊' | '😐' | '😔' | null>(null);
  const [showEducation, setShowEducation] = useState(true);
  
  useEffect(() => {
    (async () => {
      const todayKey = new Date().toISOString().slice(0, 10);
      const mood = await AsyncStorage.getItem(`@mood:${todayKey}`);
      if (mood) setTodayMood(mood as '😊' | '😐' | '😔');
    })();
  }, []);

  const setMood = async (mood: '😊' | '😐' | '😔') => {
    setTodayMood(mood);
    const todayKey = new Date().toISOString().slice(0, 10);
    await AsyncStorage.setItem(`@mood:${todayKey}`, mood);
  };

  // Comprehensive education insights by phase
  const educationInsights = {
    Menstrual: {
      title: 'Menstrual Phase (Days 1-5)',
      points: [
        '🎯 Energy & Hormones: Estrogen and progesterone are at their lowest. Your body is focused on shedding and recovery.',
        '💪 Fitness: Prioritize rest and gentle movement. Yoga, stretching, and light walking help maintain mobility without strain.',
        '🥗 Nutrition: Focus on iron-rich foods (leafy greens, lentils, beans) and anti-inflammatory ingredients to support recovery.',
        '😴 Sleep: Sleep may be lighter due to discomfort. Use warming techniques, meditation, and maintain consistent bedtime routines.',
        '✨ Beauty: Skin may be more sensitive or dry. Use gentle, fragrance-free products and rich moisturizers for barrier repair.',
        '🧘 Wellbeing: This is your natural rest phase. Perfect for reflection, planning, and self-compassion practices.'
      ]
    },
    Follicular: {
      title: 'Follicular Phase (Days 6-14)',
      points: [
        '🎯 Energy & Hormones: Estrogen is rising, boosting energy, strength, and endurance. Your body is preparing for ovulation.',
        '💪 Fitness: Best time for high-intensity workouts! Try HIIT, strength training, cardio, and circuit training to build muscle.',
        '🥗 Nutrition: Focus on protein and fiber-rich meals. Great time for lean meats, legumes, whole grains, and fresh vegetables.',
        '😴 Sleep: Sleep quality improves with more deep and REM sleep. Maintain regular sleep schedules and morning sunlight exposure.',
        '✨ Beauty: Skin appears brighter and more resilient. Perfect time for exfoliation, antioxidant serums, and trying new treatments.',
        '🧠 Mind: Increased creativity and mental clarity. Ideal for starting new projects, brainstorming, and tackling challenging tasks.'
      ]
    },
    Ovulation: {
      title: 'Ovulation Phase (Days 15-17)',
      points: [
        '🎯 Energy & Hormones: Peak estrogen and LH surge provide maximum strength, speed, coordination, and mental clarity.',
        '💪 Fitness: Peak performance phase! Ideal for high-intensity intervals, strength training, dance, and skill-based workouts.',
        '🥗 Nutrition: Focus on zinc and antioxidants. Include seafood, nuts, seeds, and colorful vegetables to support peak function.',
        '😴 Sleep: Some may experience restlessness. Practice calming pre-sleep routines, keep room cool, and avoid screens before bed.',
        '✨ Beauty: Natural radiance peaks thanks to high estrogen. Skin glows but may be slightly oilier—maintain regular cleansing.',
        '💡 Peak Fertility: Your most fertile window. Hormones support confidence, social energy, and peak cognitive performance.'
      ]
    },
    Luteal: {
      title: 'Luteal Phase (Days 18-28)',
      points: [
        '🎯 Energy & Hormones: Progesterone rises, leading to lower energy and increased fatigue. Body temperature may be elevated.',
        '💪 Fitness: Focus on moderate, enjoyable workouts. Yoga, Pilates, light cardio, and walking support consistency without overexertion.',
        '🥗 Nutrition: Prioritize magnesium and complex carbs for stable mood and energy. Include dark leafy greens, whole grains, and seeds.',
        '😴 Sleep: More awakenings and less restful sleep possible. Use CBT-I techniques, guided meditations, and maintain cooler room temperature.',
        '✨ Beauty: Increased chance of breakouts due to hormonal changes. Use gentle exfoliants, non-comedogenic products, and calming skincare.',
        '🌙 Self-Care: Focus on winding down, planning ahead, and supporting your body through PMS symptoms with rest and nourishment.'
      ]
    },
  };

  const phaseKey: 'Menstrual'|'Follicular'|'Ovulation'|'Luteal' = useMemo(() => {
    if (!profile.lastPeriodDate) return 'Follicular';
    return getCurrentHormonalPhase(getCycleDay(profile.lastPeriodDate));
  }, [profile.lastPeriodDate]);

  const theme = themes[phaseKey];

  function getNextOvulationDate(last: Date | null): Date | null {
    if (!last) return null;
    
    try {
      // Ensure last is a valid Date object
      const lastDate = last instanceof Date ? last : new Date(last);
      if (isNaN(lastDate.getTime())) {
        console.warn('Invalid lastPeriodDate:', last);
        return null;
      }
      
      const msDay = 24 * 60 * 60 * 1000;
      const now = new Date();
      now.setHours(0, 0, 0, 0); // Normalize to start of day
      
      // Calculate next ovulation (typically day 14 from last period start)
      let ov = new Date(lastDate);
      ov.setDate(ov.getDate() + 14);
      ov.setHours(0, 0, 0, 0);
      
      // If ovulation has passed or is today, find the next one (add 28 days)
      while (ov.getTime() <= now.getTime()) {
        ov = new Date(ov.getTime() + 28 * msDay);
      }
      
      return ov;
    } catch (error) {
      console.error('Error calculating ovulation date:', error);
      return null;
    }
  }

  const peakFertile = useMemo(() => getNextOvulationDate(profile.lastPeriodDate ?? null), [profile.lastPeriodDate]);
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
          {profile.lastPeriodDate && peakLabel ? (
            <View style={styles.fertilePill}>
              <Text style={styles.fertilePillText}>Peak fertile: {peakLabel}</Text>
            </View>
          ) : null}
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

      {/* Mood Tracker */}
      <View style={[styles.moodCard, { borderColor: theme.border }]}>
        <Text style={styles.moodTitle}>How do you feel today?</Text>
        <View style={styles.moodRow}>
          {(['😊', '😐', '😔'] as const).map((mood) => (
            <TouchableOpacity
              key={mood}
              style={[
                styles.moodBtn,
                todayMood === mood && { backgroundColor: theme.accentColor, borderColor: theme.accentColor },
                todayMood !== mood && { borderColor: theme.border }
              ]}
              onPress={() => setMood(mood)}
            >
              <Text style={styles.moodEmoji}>{mood}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {todayMood && <Text style={styles.moodNote}>Thanks for checking in! 💙</Text>}
      </View>

      {/* Education Bubble */}
      {showEducation && (
        <View style={[styles.educationCard, { borderColor: theme.border, backgroundColor: theme.surface }]}>
          <View style={styles.educationHeader}>
            <Sparkles color={theme.accentColor} size={18} />
            <Text style={styles.educationTitle}>Did you know?</Text>
            <TouchableOpacity onPress={() => setShowEducation(false)}>
              <Text style={[styles.educationClose, { color: theme.accentColor }]}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.educationPhaseTitle}>{educationInsights[phaseKey].title}</Text>
          <View style={styles.educationPoints}>
            {educationInsights[phaseKey].points.map((point, index) => (
              <View key={index} style={styles.educationPoint}>
                <Text style={styles.educationPointText}>{point}</Text>
              </View>
            ))}
          </View>
        </View>
      )}


      {/* Premium Upsell Card */}
      <View style={[styles.premiumCard, { borderColor: theme.border }]}>
        <LinearGradient colors={[theme.accentColor, theme.gradient[1]]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.premiumGradient}>
          <Crown color="#FFFFFF" size={20} />
          <Text style={styles.premiumTitle}>Unlock Premium</Text>
          <Text style={styles.premiumSubtitle}>Cycle-based meal plans & advanced insights</Text>
          <TouchableOpacity style={styles.premiumBtn}>
            <Text style={styles.premiumBtnText}>Explore Premium</Text>
          </TouchableOpacity>
        </LinearGradient>
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
  fertilePill: { backgroundColor: 'rgba(255,255,255,0.95)', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 3 },
  fertilePillText: { color: '#1F2937', fontWeight: '700', fontSize: 12, letterSpacing: 0.2 },
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
  moodCard: { marginHorizontal: 20, marginTop: 20, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18, borderWidth: 1 },
  moodTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 12 },
  moodRow: { flexDirection: 'row', gap: 12, justifyContent: 'center' },
  moodBtn: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB' },
  moodEmoji: { fontSize: 28 },
  moodNote: { textAlign: 'center', marginTop: 12, fontSize: 12, color: '#6B7280', fontStyle: 'italic' },
  educationCard: { marginHorizontal: 20, marginTop: 16, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18, borderWidth: 1 },
  educationHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  educationTitle: { fontSize: 15, fontWeight: '700', color: '#111827', flex: 1 },
  educationClose: { fontSize: 18, fontWeight: '700' },
  educationPhaseTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 12 },
  educationPoints: { gap: 10 },
  educationPoint: { marginBottom: 4 },
  educationPointText: { fontSize: 13, color: '#374151', lineHeight: 20 },
  premiumCard: { marginHorizontal: 20, marginTop: 16, borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  premiumGradient: { padding: 20, alignItems: 'center', gap: 8 },
  premiumTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginTop: 4 },
  premiumSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 4 },
  premiumBtn: { marginTop: 8, backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  premiumBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
});
