import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform, ScrollView } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { getCycleDay, getCurrentHormonalPhase, themes } from '@/services/ThemeService';
import { useMemo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Phone, Video } from 'lucide-react-native';

type Doctor = { id: string; name: string; role: string; exp: string; languages: string; }

const DOCTORS: Doctor[] = [
  { id: 'anuj', name: 'Dr. Anuj Mehta', role: 'Gynecologist', exp: '12 yrs', languages: 'EN, HI' },
  { id: 'neha', name: 'Dr. Neha Kapoor', role: 'Endocrinologist', exp: '9 yrs', languages: 'EN, HI' },
  { id: 'sana', name: 'Dr. Sana Iqbal', role: 'Women’s Health', exp: '7 yrs', languages: 'EN, HI' },
];

export default function DoctorsScreen() {
  const { profile } = useUser();
  const router = useRouter();
  const phaseKey: 'Menstrual'|'Follicular'|'Ovulation'|'Luteal' = useMemo(() => {
    if (!profile.lastPeriodDate) return 'Follicular';
    return getCurrentHormonalPhase(getCycleDay(profile.lastPeriodDate));
  }, [profile.lastPeriodDate]);
  const theme = themes[phaseKey];

  const callHelpline = () => Linking.openURL('tel:+1800123456');
  const callDoctor = (name: string) => Linking.openURL('tel:+1800456789');
  const videoDoctor = (id: string) => Linking.openURL(`https://meet.jit.si/gloww-${id}`);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => { try { router.back(); } catch { router.replace('/(tabs)'); } }}>
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
      </View>

      <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <Text style={styles.heroTitle}>Expert care, 24/7</Text>
        <Text style={styles.heroSub}>Telemedicine and instant calling when you need it</Text>
        <TouchableOpacity onPress={callHelpline} style={[styles.helplineBtn, { backgroundColor: '#FFFFFF' }]}>
          <Text style={[styles.helplineText, { color: '#111827' }]}>Call 24/7 Helpline</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.list}> 
        {DOCTORS.map(d => (
          <View key={d.id} style={[styles.card, { borderColor: theme.border }]}> 
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{d.name}</Text>
              <Text style={styles.meta}>{d.role} • {d.exp} • {d.languages}</Text>
            </View>
            <View style={styles.actions}> 
              <TouchableOpacity onPress={() => callDoctor(d.name)} style={[styles.btn, { backgroundColor: theme.accentColor }]}>
                <Phone color="#FFF" size={16} />
                <Text style={styles.btnText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => videoDoctor(d.id)} style={[styles.btn, { backgroundColor: '#111827' }]}>
                <Video color="#FFF" size={16} />
                <Text style={styles.btnText}>Video</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { paddingHorizontal: 16, paddingTop: 16 },
  hero: { borderRadius: 20, marginHorizontal: 16, padding: 20 },
  heroTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: '800', marginBottom: 6 },
  heroSub: { color: 'rgba(255,255,255,0.9)' },
  helplineBtn: { alignSelf: 'flex-start', marginTop: 12, borderRadius: 16, paddingVertical: 10, paddingHorizontal: 14 },
  helplineText: { fontWeight: '800' },
  list: { marginTop: 14, paddingHorizontal: 16 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, borderWidth: 1, marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
  name: { color: '#1F2937', fontWeight: '800', fontSize: 16 },
  meta: { color: '#6B7280', marginTop: 4 },
  actions: { flexDirection: 'row', gap: 8, marginLeft: 12 },
  btn: { flexDirection: 'row', alignItems: 'center', gap: 6, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 10 },
  btnText: { color: '#FFFFFF', fontWeight: '800' },
});


