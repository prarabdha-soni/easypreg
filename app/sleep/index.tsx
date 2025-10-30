import { View, Text, StyleSheet, TouchableOpacity, Linking, Image, ActivityIndicator, Modal, Platform } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { getCycleDay, getCurrentHormonalPhase, themes } from '@/services/ThemeService';
import { useEffect, useMemo, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
// @ts-ignore: Only used on native
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

// using centralized ThemeService

export default function SleepScreen() {
  const { profile } = useUser();
  const router = useRouter();
  const [done, setDone] = useState(false);
  const [ytLoading, setYtLoading] = useState<boolean>(true);
  const [ytItems, setYtItems] = useState<{ id: string; title: string; thumb: string; url: string; channel?: string; type: 'video'|'playlist' }[] | null>(null);
  const [player, setPlayer] = useState<{ id: string; type: 'video'|'playlist' } | null>(null);

  const phaseKey: 'Menstrual'|'Follicular'|'Ovulation'|'Luteal' = useMemo(() => {
    if (!profile.lastPeriodDate) return 'Follicular';
    return getCurrentHormonalPhase(getCycleDay(profile.lastPeriodDate));
  }, [profile.lastPeriodDate]);
  const theme = themes[phaseKey];

  const storageKey = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();
    return `@sleep_done:${y}-${m}-${day}:${phaseKey}`;
  }, [phaseKey]);

  useEffect(() => {
    const load = async () => {
      try {
        const v = await AsyncStorage.getItem(storageKey);
        setDone(v === '1');
      } catch {}
    };
    load();
  }, [storageKey]);

  // YouTube videos for sleep
  const YT_API_KEY = 'AIzaSyBvQcLcPhoGKqhh6bRKnGHQ4By7O6ZaMjw';
  const sleepVideos = [
    { type: 'video' as const, url: 'https://www.youtube.com/watch?v=ZToicYcHIOU' }, // Headspace breathing
    { type: 'video' as const, url: 'https://www.youtube.com/watch?v=aEqlQvczMJQ' }, // 10-min guided meditation
  ];
  function getParam(u: string, k: string) { try { const o = new URL(u); return o.searchParams.get(k); } catch { return null; } }
  function vid(u: string) { const v = getParam(u,'v'); if(v) return v; try{const o=new URL(u); if(o.hostname.includes('youtu.be')) return o.pathname.replace('/','');}catch{} return null; }
  useEffect(() => {
    (async () => {
      try {
        const out: any[] = [];
        for (const r of sleepVideos) {
          const id = vid(r.url);
          if (!id) continue;
          const resp = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${YT_API_KEY}`);
          const data = await resp.json();
          const s = data?.items?.[0]?.snippet;
          if (s) out.push({ id, type: 'video', url: r.url, title: s.title, thumb: s.thumbnails?.medium?.url || s.thumbnails?.default?.url, channel: s.channelTitle });
        }
        setYtItems(out);
      } catch { setYtItems([]); }
      finally { setYtLoading(false); }
    })();
  }, []);

  // no-op animation removed for simpler pill CTA

  const handleMarkDone = async () => {
    try {
      await AsyncStorage.setItem(storageKey, '1');
      setDone(true);
    } catch {}
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => { try { router.back(); } catch { router.replace('/(tabs)'); } }}>
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Sleep better this week 💫</Text>
      </View>

      

      <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.cardGrad}>
        <Text style={styles.phaseSmall}>🌙 {phaseKey} Phase</Text>
        <Text style={styles.titleDark}>{theme.sleepRecommendation}</Text>
        <Text style={styles.textDark}>{theme.sleepDetails}</Text>
        <TouchableOpacity style={[styles.pillCta, { backgroundColor: theme.accentColor }]} onPress={handleMarkDone}>
          <Text style={styles.pillCtaText}>{done ? 'Marked Done' : 'Play Sleep Sound'}</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.resourcesCard}>
        <Text style={styles.resourcesHeader}>Sleep – Videos</Text>
        {ytLoading && (
          <View style={{ paddingVertical: 12 }}>
            <ActivityIndicator color={theme.accentColor} />
          </View>
        )}
        {!ytLoading && ytItems && ytItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.vidRow} onPress={() => setPlayer({ id: item.id, type: item.type })}>
            <Image source={{ uri: item.thumb }} style={styles.vidThumb} />
            <View style={{ flex: 1 }}>
              <Text style={styles.vidTitle} numberOfLines={2}>{item.title}</Text>
              {!!item.channel && <Text style={styles.vidMeta}>{item.channel}</Text>}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.whiteCard}>
        <Text style={styles.sectionTitle}>Sleep pattern this phase</Text>
        <Text style={styles.infoText}>{theme.sleepPattern}</Text>
      </View>

      <View style={styles.whiteCard}>
        <Text style={styles.sectionTitle}>Recommended tonight</Text>
        {theme.sleepRecommendations.map((rec, i) => (
          <View key={i} style={styles.bulletRow}>
            <View style={styles.dot} />
            <Text style={styles.bulletText}>{rec}</Text>
          </View>
        ))}
      </View>

      <View style={styles.whiteCard}>
        <Text style={styles.sectionTitle}>Helpful aids</Text>
        <View style={styles.chipsWrap}>
          {theme.sleepAids.map((aid, i) => (
            <View key={i} style={styles.chip}><Text style={styles.chipText}>{aid}</Text></View>
          ))}
        </View>
      </View>

      <View style={styles.resourcesCard}>
        <Text style={styles.resourcesHeader}>Sleep – Blogs & Tips</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.calm.com/blog/how-to-sleep-better?utm_source=chatgpt.com')}>
          <Text style={[styles.resourceLink, { color: theme.accentColor }]}>Calm Blog — How to Sleep Better</Text>
          <Text style={styles.resourceMeta}>Calm</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.health.harvard.edu/newsletter_article/8-secrets-to-a-good-nights-sleep?utm_source=chatgpt.com')}>
          <Text style={[styles.resourceLink, { color: theme.accentColor }]}>Harvard Health — 8 Secrets to Better Sleep</Text>
          <Text style={styles.resourceMeta}>Harvard Health</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.medanta.org/patient-education-blog/12-sleep-hygiene-tips-to-improve-your-sleep-naturally?utm_source=chatgpt.com')}>
          <Text style={[styles.resourceLink, { color: theme.accentColor }]}>Medanta Blog — Sleep Hygiene Tips</Text>
          <Text style={styles.resourceMeta}>@Medanta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://unplugged.rest/blog/5-breathing-techniques-to-help-you-fall-asleep?utm_source=chatgpt.com')}>
          <Text style={[styles.resourceLink, { color: theme.accentColor }]}>Unplugged.rest — 5 Breathing Techniques</Text>
          <Text style={styles.resourceMeta}>unplugged.rest</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={!!player} transparent animationType="slide" onRequestClose={() => setPlayer(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {player && (
              Platform.OS === 'web' ? (
                // @ts-ignore
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${player.id}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <WebView source={{ uri: `https://www.youtube.com/embed/${player.id}` }} style={{ flex: 1 }} allowsInlineMediaPlayback javaScriptEnabled />
              )
            )}
            <TouchableOpacity style={[styles.closeBtn, { backgroundColor: theme.accentColor }]} onPress={() => setPlayer(null)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F1F9' },
  hero: { backgroundColor: '#FFFFFF', paddingTop: 24, paddingBottom: 8, paddingHorizontal: 20 },
  topBar: { paddingHorizontal: 16, paddingTop: 16 },
  heroTitle: { color: '#111827', fontSize: 24, fontWeight: '800' },
  cardGrad: { marginTop: 12, marginHorizontal: 20, borderRadius: 28, padding: 22 },
  header: { fontSize: 13, color: '#8B5A8F', fontWeight: '800', marginBottom: 6 },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#382838',
    marginBottom: 8,
  },
  titleDark: { fontSize: 26, fontWeight: '800', color: '#111827', marginBottom: 8 },
  text: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 22,
  },
  textDark: { fontSize: 15, color: '#1F2937', marginBottom: 16, lineHeight: 22 },
  phaseSmall: { fontSize: 13, color: '#111827', fontWeight: '700', marginBottom: 8 },
  pillCta: { alignSelf: 'center', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 28, marginTop: 8 },
  pillCtaText: { color: '#FFFFFF', fontWeight: '800' },
  whiteCard: { backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#E8D5E8', padding: 16, marginHorizontal: 20, marginTop: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: '#5A3A5A', marginBottom: 8 },
  infoText: { color: '#374151' },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#8B5A8F', marginTop: 7 },
  bulletText: { color: '#374151', flex: 1, lineHeight: 20 },
  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#F3E8F3', borderRadius: 14, paddingVertical: 6, paddingHorizontal: 10, borderWidth: 1, borderColor: '#E8D5E8' },
  chipText: { color: '#5A3A5A', fontWeight: '700' },
  vidRow: { flexDirection: 'row', gap: 12, marginBottom: 12, alignItems: 'center' },
  vidThumb: { width: 120, height: 68, borderRadius: 10, backgroundColor: '#E8D5E8' },
  vidTitle: { color: '#1F2937', fontWeight: '700' },
  vidMeta: { color: '#6B7280', fontSize: 12, marginTop: 2 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', padding: 16 },
  modalCard: { width: '100%', maxWidth: 720, height: 400, backgroundColor: '#000', borderRadius: 12, overflow: 'hidden' },
  closeBtn: { position: 'absolute', bottom: 12, right: 12, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 12 },
  closeText: { color: '#FFF', fontWeight: '800' },
  bigPlayWrap: { alignItems: 'center', justifyContent: 'center', marginTop: 6, marginBottom: 20 },
  bigPulse: { position: 'absolute', width: 210, height: 210, borderRadius: 105, backgroundColor: '#E4D6EE' },
  bigPlay: { width: 200, height: 200, borderRadius: 100, backgroundColor: '#8B5A8F', alignItems: 'center', justifyContent: 'center', elevation: 4, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } },
  bigPlayText: { color: '#FFFFFF', fontWeight: '800', textAlign: 'center', paddingHorizontal: 18 },
  streakRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 4 },
  streakDot: { width: 20, height: 10, borderRadius: 6, backgroundColor: '#E7E0EA' },
  streakDotActive: { backgroundColor: '#8B5A8F' },
  streakText: { textAlign: 'center', marginTop: 8, color: '#6B7280', fontSize: 13 },
  resourcesCard: { backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#E8D5E8', padding: 16, marginHorizontal: 20, marginTop: 12 },
  resourcesHeader: { fontSize: 15, fontWeight: '800', color: '#5A3A5A', marginBottom: 10 },
  resourceLink: { fontSize: 14, fontWeight: '700', marginTop: 8 },
  resourceMeta: { fontSize: 12, color: '#6B7280' },
});


