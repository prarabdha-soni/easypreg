import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image, ActivityIndicator, Modal, Platform } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { getCycleDay, getCurrentHormonalPhase, themes } from '@/services/ThemeService';
import { useMemo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
// @ts-ignore: Only used on native
import { WebView } from 'react-native-webview';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

// using centralized ThemeService

export default function BeautyScreen() {
  const { profile } = useUser();
  const router = useRouter();
  const phaseKey: 'Menstrual'|'Follicular'|'Ovulation'|'Luteal' = useMemo(() => {
    if (!profile.lastPeriodDate) return 'Follicular';
    return getCurrentHormonalPhase(getCycleDay(profile.lastPeriodDate));
  }, [profile.lastPeriodDate]);
  const theme = themes[phaseKey];
  const [mode, setMode] = React.useState<'skin'|'hair'>('skin');

  const YT_API_KEY = 'AIzaSyBvQcLcPhoGKqhh6bRKnGHQ4By7O6ZaMjw';
  const beautyVideos = [
    { type: 'video' as const, url: 'https://www.youtube.com/watch?v=3K35nXrhIRY' }, // skincare & hormones overview
    { type: 'video' as const, url: 'https://www.youtube.com/watch?v=2U1FVLtZLk8' }, // hormonal acne routine
  ];
  const [ytLoading, setYtLoading] = React.useState<boolean>(true);
  const [ytItems, setYtItems] = React.useState<{ id: string; title: string; thumb: string; url: string; channel?: string; type: 'video'|'playlist' }[] | null>(null);
  const [player, setPlayer] = React.useState<{ id: string; type: 'video'|'playlist' } | null>(null);
  function getParam(u: string, k: string) { try { const o = new URL(u); return o.searchParams.get(k); } catch { return null; } }
  function vid(u: string) { const v = getParam(u,'v'); if(v) return v; try{const o=new URL(u); if(o.hostname.includes('youtu.be')) return o.pathname.replace('/','');}catch{} return null; }
  React.useEffect(() => {
    (async () => {
      try {
        const out: any[] = [];
        for (const r of beautyVideos) {
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

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => { try { router.back(); } catch { router.replace('/(tabs)'); } }}>
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
      </View>
      <Text style={styles.pageTitle}>Glow with your cycle ✨</Text>

      <View style={styles.toggleRow}>
        <TouchableOpacity 
          style={[
            styles.toggleChip, 
            mode==='skin' && { backgroundColor: theme.accentColor, borderColor: theme.accentColor },
            mode !== 'skin' && { borderColor: theme.border }
          ]} 
          onPress={() => setMode('skin')}
        >
          <Text style={[styles.toggleChipText, mode==='skin' && { color: '#FFFFFF' }, mode !== 'skin' && { color: '#111827' }]}>Skin</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.toggleChip, 
            mode==='hair' && { backgroundColor: theme.accentColor, borderColor: theme.accentColor },
            mode !== 'hair' && { borderColor: theme.border }
          ]} 
          onPress={() => setMode('hair')}
        >
          <Text style={[styles.toggleChipText, mode==='hair' && { color: '#FFFFFF' }, mode !== 'hair' && { color: '#111827' }]}>Hair</Text>
        </TouchableOpacity>
      </View>

      {mode === 'skin' ? (
        <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.cardGrad}>
          <Text style={styles.phaseSmall}>🌿 Tip for the {phaseKey} Phase</Text>
          <Text style={styles.titleBig}>{theme.beautyTip}</Text>
          <Text style={styles.textDark}>{theme.beautyAction}</Text>
          <TouchableOpacity style={[styles.pillCta, { backgroundColor: '#FFFFFF' }]}>
            <Text style={[styles.pillCtaText, { color: '#111827' }]}>See my recommended products</Text>
          </TouchableOpacity>
        </LinearGradient>
      ) : (
        <View style={[styles.whiteCard, { borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.accentColor }]}>Hair care this phase</Text>
          <Text style={{ color: '#374151', marginBottom: 8 }}>{theme.hairSummary}</Text>
          {theme.hairTips.map((t, i) => (
            <View key={i} style={styles.hairRow}>
              <View style={styles.hairDot} />
              <Text style={styles.hairText}>{t}</Text>
            </View>
          ))}
        </View>
      )}

      {mode === 'skin' && (
        <View style={[styles.whiteCard, { borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.accentColor }]}>Suggested routine today</Text>
          <Text style={{ color: '#374151', marginBottom: 8 }}>{theme.beautySummary}</Text>
          {theme.beautyRoutine.map((step, i) => (
            <View key={i} style={styles.routineRow}>
              <View style={[styles.routineBadge, { backgroundColor: '#F3E8F3', borderColor: '#E8D5E8' }]}>
                <Text style={styles.routineBadgeText}>{i + 1}</Text>
              </View>
              <Text style={styles.routineText}>{step}</Text>
            </View>
          ))}
        </View>
      )}

      {mode === 'skin' && (
        <View style={[styles.whiteCard, { borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.accentColor }]}>Common concerns this phase</Text>
          <View style={styles.concernWrap}>
            {theme.beautyConcerns.map((c, i) => (
              <View key={i} style={styles.concernChip}><Text style={styles.concernChipText}>{c}</Text></View>
            ))}
          </View>
        </View>
      )}

      {mode === 'hair' && null}

      <View style={styles.exploreBox}> 
        <Text style={styles.exploreTitle}>Explore products for this phase</Text>
        <View style={styles.tipsList}>
          {theme.suggestions.map((s, i) => (
            <View key={i} style={styles.tipChip}><Text style={styles.tipChipText}>{s}</Text></View>
          ))}
        </View>
      </View>

      <View style={styles.resourcesCard}>
        <Text style={styles.resourcesHeader}>Beauty – Videos</Text>
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

      <View style={styles.resourcesCard}>
        <Text style={styles.resourcesHeader}>Beauty / Skin & Hormones – Articles</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://hertilityhealth.com/blog/tips-for-dealing-with-period-skincare?utm_source=chatgpt.com')}>
          <Text style={[styles.resourceLink, { color: theme.accentColor }]}>Hertility Health — Tips for Dealing With Period Skincare</Text>
          <Text style={styles.resourceMeta}>hertilityhealth.com</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://beautybybie.com/blogs/journal/skin-care-tips-for-changing-hormones?srsltid=AfmBOoq43l3p-wIJgoyH5EaxZ04ZSCECPNBDTBqQbfUlcJPbZ4jDprEV&utm_source=chatgpt.com')}>
          <Text style={[styles.resourceLink, { color: theme.accentColor }]}>BeautyByBiE — Skin Care Tips for Changing Hormones</Text>
          <Text style={styles.resourceMeta}>beautybybie</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.verywellhealth.com/cycle-syncing-how-to-attune-to-each-menstrual-phase-5189040')}>
          <Text style={[styles.resourceLink, { color: theme.accentColor }]}>Verywell Health — Cycle Syncing</Text>
          <Text style={styles.resourceMeta}>verywellhealth.com</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={!!player} transparent animationType="fade" onRequestClose={() => setPlayer(null)}>
        <View style={styles.videoModalOverlay}>
          <View style={styles.videoModalCard}>
            <View style={styles.videoHeader}>
              <Text style={styles.videoTitle}>Beauty Video</Text>
              <TouchableOpacity 
                style={[styles.closeVideoBtn, { backgroundColor: 'rgba(255,255,255,0.2)' }]} 
                onPress={() => setPlayer(null)}
              >
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>
            {player && (
              Platform.OS === 'web' ? (
                <View style={styles.videoContainer}>
                  {/* @ts-ignore */}
                  <iframe
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    src={`https://www.youtube.com/embed/${player.id}?autoplay=1&playsinline=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </View>
              ) : (
                <WebView 
                  source={{ uri: `https://www.youtube.com/embed/${player.id}?autoplay=1&playsinline=1` }} 
                  style={styles.videoWebView}
                  allowsInlineMediaPlayback={true}
                  mediaPlaybackRequiresUserAction={false}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  startInLoadingState={true}
                  onShouldStartLoadWithRequest={(request) => {
                    return request.url.includes('youtube.com/embed');
                  }}
                />
              )
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F7' },
  pageTitle: { fontSize: 28, fontWeight: '800', color: '#111827', paddingHorizontal: 20, paddingTop: 24 },
  cardGrad: { marginTop: 12, marginHorizontal: 20, borderRadius: 28, padding: 22 },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8D5E8',
  },
  phaseSmall: { fontSize: 13, color: '#111827', fontWeight: '700', marginBottom: 8 },
  titleBig: { fontSize: 26, fontWeight: '800', color: '#111827', marginBottom: 8 },
  textDark: { fontSize: 15, color: '#1F2937', marginBottom: 16, lineHeight: 22 },
  pillCta: { alignSelf: 'center', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 28, marginTop: 8 },
  pillCtaText: { fontWeight: '800' },
  toggleRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginTop: 10 },
  toggleChip: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 18, paddingVertical: 8, paddingHorizontal: 14, backgroundColor: '#FFFFFF' },
  toggleChipText: { color: '#111827', fontWeight: '700' },
  header: { fontSize: 13, color: '#8B5A8F', fontWeight: '800', marginBottom: 6 },
  title: { fontSize: 22, fontWeight: '800', color: '#1F2937', marginBottom: 8 },
  text: { fontSize: 15, color: '#6B7280', marginBottom: 14, lineHeight: 22 },
  subheader: { fontSize: 14, fontWeight: '700', color: '#5A3A5A', marginBottom: 8 },
  bullet: { fontSize: 14, color: '#374151', marginBottom: 6 },
  linkBtn: { alignSelf: 'flex-start', marginTop: 4 },
  linkText: { fontWeight: '800' },
  exploreBox: { backgroundColor: '#FFFFFF', margin: 20, borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#E8D5E8' },
  exploreTitle: { fontSize: 15, fontWeight: '800', color: '#5A3A5A', marginBottom: 10 },
  tipsList: { flexDirection: 'row', gap: 10 },
  tipChip: { flex: 1, backgroundColor: '#F8F5FA', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 12, borderWidth: 1, borderColor: '#E8D5E8', alignItems: 'center' },
  tipChipText: { color: '#374151', fontWeight: '600', textAlign: 'center' },
  whiteCard: { backgroundColor: '#FFFFFF', marginHorizontal: 20, marginTop: 12, borderRadius: 20, padding: 16, borderWidth: 1 },
  sectionTitle: { fontSize: 15, fontWeight: '800', marginBottom: 10 },
  routineRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  routineBadge: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1, marginRight: 10 },
  routineBadgeText: { color: '#8B5A8F', fontWeight: '800' },
  routineText: { color: '#1F2937', fontWeight: '600' },
  concernWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  concernChip: { backgroundColor: '#F3F4F6', borderRadius: 14, paddingVertical: 6, paddingHorizontal: 10, borderWidth: 1, borderColor: '#E5E7EB' },
  concernChipText: { color: '#374151', fontWeight: '600' },
  topBar: { paddingHorizontal: 16, paddingTop: 16 },
  resourcesCard: { backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#E8D5E8', padding: 16, marginHorizontal: 20, marginBottom: 20 },
  resourcesHeader: { fontSize: 15, fontWeight: '800', color: '#5A3A5A', marginBottom: 10 },
  vidRow: { flexDirection: 'row', gap: 12, marginBottom: 12, alignItems: 'center' },
  vidThumb: { width: 120, height: 68, borderRadius: 10, backgroundColor: '#E8D5E8' },
  vidTitle: { color: '#1F2937', fontWeight: '700' },
  vidMeta: { color: '#6B7280', fontSize: 12, marginTop: 2 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', padding: 16 },
  modalCard: { width: '100%', maxWidth: 720, height: 400, backgroundColor: '#000', borderRadius: 12, overflow: 'hidden' },
  closeBtn: { position: 'absolute', bottom: 12, right: 12, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 12 },
  closeText: { color: '#FFF', fontWeight: '800' },
  videoModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center', alignItems: 'center' },
  videoModalCard: { width: '100%', height: '100%', backgroundColor: '#000', justifyContent: 'center' },
  videoHeader: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 56, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)' },
  videoTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  closeVideoBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  videoContainer: { flex: 1, width: '100%' },
  videoWebView: { flex: 1, width: '100%', backgroundColor: '#000' },
  resourceLink: { fontSize: 14, fontWeight: '700', marginTop: 8 },
  resourceMeta: { fontSize: 12, color: '#6B7280' },
  hairRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 6 },
  hairDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#8B5A8F', marginTop: 7 },
  hairText: { color: '#374151', flex: 1, lineHeight: 20 },
});


