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

  // Phase-specific weight loss benefits and why we use these techniques
  const weightLossBenefits = {
    Menstrual: {
      workout: null, // Not available in this phase
      yoga: 'Yoga in Menstrual phase supports weight loss by reducing stress hormones (cortisol), which can prevent fat storage. Gentle movement maintains metabolism without causing stress or inflammation that can hinder weight loss.',
      dance: null, // Not available in this phase
    },
    Follicular: {
      workout: 'High-intensity workouts during Follicular phase maximize weight loss because rising estrogen boosts your metabolism and fat-burning capacity. This is when your body is most efficient at building muscle and burning fat.',
      yoga: 'Moderate yoga during Follicular phase supports weight loss by maintaining flexibility and reducing stress, while your rising energy allows for more calorie-burning power yoga sessions.',
      dance: 'Dance workouts in Follicular phase are excellent for weight loss because rising estrogen provides the energy for longer, more intense sessions that burn maximum calories and build lean muscle.',
    },
    Ovulation: {
      workout: 'Peak performance workouts during Ovulation maximize weight loss through maximum calorie burn. Your hormones are at peak levels, making this the best time for high-intensity training that accelerates fat loss.',
      yoga: 'Power yoga during Ovulation supports weight loss by leveraging peak strength for more challenging poses that burn more calories while maintaining muscle mass.',
      dance: 'Dance in Ovulation phase is ideal for weight loss because peak coordination and energy allow for maximum intensity, burning the most calories and boosting metabolism for days.',
    },
    Luteal: {
      workout: null, // Not available in this phase
      yoga: 'Restorative yoga in Luteal phase supports weight loss by managing stress and preventing cortisol-induced weight gain. Gentle movement maintains metabolism while supporting hormonal balance crucial for sustainable weight loss.',
      dance: null, // Not available in this phase
    },
  };

  const phaseKey: 'Menstrual'|'Follicular'|'Ovulation'|'Luteal' = useMemo(() => {
    if (!profile.lastPeriodDate) return 'Follicular';
    return getCurrentHormonalPhase(getCycleDay(profile.lastPeriodDate));
  }, [profile.lastPeriodDate]);

  const theme = themes[phaseKey];

  // Phase number mapping for UI
  const phaseNumber = {
    Menstrual: 'Phase 1',
    Follicular: 'Phase 2',
    Ovulation: 'Phase 3',
    Luteal: 'Phase 4',
  };

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
              <Text style={styles.fertilePillText}>Peak fertile date: {peakLabel}</Text>
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
        <Text style={styles.phaseNumber}>{phaseNumber[phaseKey]}</Text>
        <Text style={styles.phaseAffirm}>{theme.phaseText}</Text>
      </LinearGradient>

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

      {/* Why These Techniques Help Weight Loss */}
      <View style={[styles.whyCard, { borderColor: theme.border, backgroundColor: theme.surface }]}>
        <View style={styles.whyHeader}>
          <Sparkles color={theme.accentColor} size={18} />
          <Text style={[styles.whyCardTitle, { color: theme.accentColor }]}>Why This Helps Weight Loss</Text>
        </View>
        <Text style={styles.whyPhaseTitle}>{phaseKey} Phase Benefits</Text>
        <View style={styles.whyBenefits}>
          {weightLossBenefits[phaseKey].workout && (
            <View style={styles.whyBenefitItem}>
              <Text style={styles.whyBenefitLabel}>💪 Workout:</Text>
              <Text style={styles.whyBenefitText}>{weightLossBenefits[phaseKey].workout}</Text>
            </View>
          )}
          {weightLossBenefits[phaseKey].yoga && (
            <View style={styles.whyBenefitItem}>
              <Text style={styles.whyBenefitLabel}>🧘 Yoga:</Text>
              <Text style={styles.whyBenefitText}>{weightLossBenefits[phaseKey].yoga}</Text>
            </View>
          )}
          {weightLossBenefits[phaseKey].dance && (
            <View style={styles.whyBenefitItem}>
              <Text style={styles.whyBenefitLabel}>💃 Dance:</Text>
              <Text style={styles.whyBenefitText}>{weightLossBenefits[phaseKey].dance}</Text>
            </View>
          )}
        </View>
      </View>


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
  fertilePillText: { color: '#1F2937', fontWeight: '700', fontSize: 14, letterSpacing: 0.2 },
  phaseContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 4, marginBottom: 8 },
  phaseName: { fontSize: 28, fontWeight: '700', color: '#FFF', letterSpacing: 1 },
  phaseIconWrapper: { marginLeft: 8, width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  phaseIconText: { fontSize: 20 },
  phaseNumber: { fontSize: 14, color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginTop: 6, fontWeight: '600', letterSpacing: 0.5 },
  phaseAffirm: { fontSize: 15, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginTop: 6, lineHeight: 22 },

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
  whyCard: { marginHorizontal: 20, marginTop: 16, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, borderWidth: 1 },
  whyHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  whyCardTitle: { fontSize: 16, fontWeight: '700', flex: 1 },
  whyPhaseTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 16 },
  whyBenefits: { gap: 16 },
  whyBenefitItem: { marginBottom: 8 },
  whyBenefitLabel: { fontSize: 14, fontWeight: '700', color: '#111827', marginBottom: 6 },
  whyBenefitText: { fontSize: 13, color: '#374151', lineHeight: 20 },
  premiumCard: { marginHorizontal: 20, marginTop: 16, borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  premiumGradient: { padding: 20, alignItems: 'center', gap: 8 },
  premiumTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginTop: 4 },
  premiumSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: 4 },
  premiumBtn: { marginTop: 8, backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  premiumBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
});
