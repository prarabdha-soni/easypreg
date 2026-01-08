import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { getCycleDay, getCurrentHormonalPhase, themes } from '@/services/ThemeService';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

type Treatment = { key: string; title: string; blurb: string; };
type Company = { id: string; name: string; focus: string; url: string };

const TREATMENTS: Treatment[] = [
  { key: 'pcos', title: 'PCOS', blurb: 'Cycle‑first plan: insulin sensitivity, stress care, sleep, and ovulatory support.' },
  { key: 'pcod', title: 'PCOD', blurb: 'Lifestyle routine for regularity: nutrition, movement, supplements, and rest.' },
  { key: 'perimenopause', title: 'Perimenopause', blurb: 'Hot flashes and mood: evidence‑based routines, sleep, and symptom tracking.' },
  { key: 'menopause', title: 'Menopause', blurb: 'Bone, heart, and skin health; holistic care and HRT consults as appropriate.' },
];

const INDIAN_COMPANIES: Company[] = [
  { id: 'practo', name: 'Practo', focus: 'Online doctor consults & digital prescriptions', url: 'https://www.practo.com' },
  { id: 'mfine', name: 'mfine', focus: 'Virtual hospital with specialist networks', url: 'https://www.mfine.co' },
  { id: 'tata1mg', name: 'Tata 1mg', focus: 'Pharmacy + diagnostics + teleconsults', url: 'https://www.1mg.com' },
  { id: 'pharmeasy', name: 'PharmEasy', focus: 'Medicines, tests & telemedicine at home', url: 'https://pharmeasy.in' },
  { id: 'apollo24x7', name: 'Apollo 24/7', focus: 'Apollo Hospitals doctors on chat/video', url: 'https://www.apollo247.com' },
];

export default function TreatmentsScreen() {
  const { profile } = useUser();
  const router = useRouter();
  const phaseKey: 'Menstrual'|'Follicular'|'Ovulation'|'Luteal' = useMemo(() => {
    if (!profile.lastPeriodDate) return 'Follicular';
    return getCurrentHormonalPhase(getCycleDay(profile.lastPeriodDate));
  }, [profile.lastPeriodDate]);
  const theme = themes[phaseKey];

  const callHelpline = () => Linking.openURL('tel:+1800123456');
  const openCompany = (url: string) => Linking.openURL(url);

  const featuredCompanies = useMemo(() => {
    // simple random shuffle, then take first 3
    const shuffled = [...INDIAN_COMPANIES].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => { try { router.back(); } catch { router.replace('/(tabs)'); } }}>
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
      </View>

      <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <Text style={styles.heroTitle}>Personalized Treatments</Text>
        <Text style={styles.heroSub}>Cycle‑aware care for PCOS, PCOD, Perimenopause, Menopause</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/doctors' as any)} style={[styles.primaryCta, { backgroundColor: '#111827' }]}>
          <Text style={styles.primaryCtaText}>Connect to a Doctor</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={callHelpline} style={[styles.helplineBtn, { backgroundColor: '#FFFFFF' }]}>
          <Text style={[styles.helplineText, { color: '#111827' }]}>Call 24/7 Helpline</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Random Indian companies, inspired by midi health partner section */}
      <View style={styles.companySection}>
        <Text style={styles.companyTitle}>Trusted Indian partners</Text>
        <Text style={styles.companySub}>Explore telemedicine and diagnostics platforms from India.</Text>
        <View style={styles.companyList}>
          {featuredCompanies.map(c => (
            <TouchableOpacity
              key={c.id}
              style={[styles.companyCard, { borderColor: theme.border }]}
              onPress={() => openCompany(c.url)}
            >
              <Text style={styles.companyName}>{c.name}</Text>
              <Text style={styles.companyFocus}>{c.focus}</Text>
              <Text style={styles.companyLink}>Open website ↗</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.grid}> 
        {TREATMENTS.map(t => (
          <View key={t.key} style={[styles.card, { borderColor: theme.border }]}> 
            <Text style={styles.title}>{t.title}</Text>
            <Text style={styles.blurb}>{t.blurb}</Text>
            <View style={styles.row}> 
              <TouchableOpacity onPress={() => router.push('/(tabs)/doctors' as any)} style={[styles.btn, { backgroundColor: theme.accentColor }]}>
                <Text style={styles.btnText}>Find Doctors</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/(tabs)/doctors' as any)} style={[styles.btn, { backgroundColor: '#111827' }]}>
                <Text style={styles.btnText}>Telemedicine</Text>
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
  heroSub: { color: 'rgba(255,255,255,0.9)', marginTop: 2 },
  primaryCta: { alignSelf: 'flex-start', marginTop: 12, borderRadius: 18, paddingVertical: 10, paddingHorizontal: 16 },
  primaryCtaText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  helplineBtn: { alignSelf: 'flex-start', marginTop: 10, borderRadius: 16, paddingVertical: 10, paddingHorizontal: 14 },
  helplineText: { fontWeight: '800' },
  companySection: { paddingHorizontal: 16, marginTop: 18 },
  companyTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 4 },
  companySub: { fontSize: 13, color: '#6B7280', marginBottom: 12 },
  companyList: { gap: 10 },
  companyCard: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 12, borderWidth: 1 },
  companyName: { fontSize: 15, fontWeight: '800', color: '#111827', marginBottom: 2 },
  companyFocus: { fontSize: 13, color: '#6B7280', marginBottom: 6 },
  companyLink: { fontSize: 12, color: '#2563EB', fontWeight: '700' },
  grid: { paddingHorizontal: 16, marginTop: 20 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, borderWidth: 1, marginBottom: 12 },
  title: { color: '#1F2937', fontWeight: '800', fontSize: 16, marginBottom: 6 },
  blurb: { color: '#6B7280', marginBottom: 10 },
  row: { flexDirection: 'row', gap: 8 },
  btn: { borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12 },
  btnText: { color: '#FFFFFF', fontWeight: '800' },
});


