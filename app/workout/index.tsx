import { View, Text, StyleSheet, TouchableOpacity, Animated, Linking, Image, ActivityIndicator, Modal, Platform } from 'react-native';
// @ts-ignore: Only used on native
import { WebView } from 'react-native-webview';
import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { getCycleDay, getCurrentHormonalPhase, themes } from '@/services/ThemeService';
import { useEffect, useMemo, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

// using centralized ThemeService

export default function WorkoutScreen() {
  const { profile } = useUser();
  const router = useRouter();
  const phaseKey: 'Menstrual'|'Follicular'|'Ovulation'|'Luteal' = useMemo(() => {
    if (!profile.lastPeriodDate) return 'Follicular';
    const day = getCycleDay(profile.lastPeriodDate);
    return getCurrentHormonalPhase(day);
  }, [profile.lastPeriodDate]);

  const theme = themes[phaseKey];

  // Animated weekly streak progress (mock 4/7)
  const progress = useRef(new Animated.Value(0)).current;
  const completed = 4;
  const total = 7;
  const target = completed / total;
  useEffect(() => {
    Animated.timing(progress, { toValue: target, duration: 650, useNativeDriver: false }).start();
  }, [target]);

  const widthInterpolate = progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  // YouTube resources with metadata fetch
  const YT_API_KEY = 'AIzaSyBvQcLcPhoGKqhh6bRKnGHQ4By7O6ZaMjw';
  type YtResource = { url: string; type: 'video' | 'playlist' };
  type YtItem = { id: string; title: string; thumb: string; url: string; type: 'video' | 'playlist'; channel?: string };
  const resources: YtResource[] = [
    { type: 'video', url: 'https://www.youtube.com/watch?v=YSJubcbzJmo&utm_source=chatgpt.com' },
    { type: 'playlist', url: 'https://www.youtube.com/playlist?list=PL4SJd-G_GUh20CvrfTIwKrjCS998C1jWe&utm_source=chatgpt.com' },
    { type: 'video', url: 'https://www.youtube.com/watch?v=mfG0p1sv9OI&utm_source=chatgpt.com' },
  ];

  const [ytItems, setYtItems] = React.useState<YtItem[] | null>(null);
  const [ytLoading, setYtLoading] = React.useState<boolean>(true);
  const [player, setPlayer] = React.useState<{ id: string; type: 'video'|'playlist' } | null>(null);

  function getQueryParam(u: string, key: string): string | null {
    try {
      const urlObj = new URL(u);
      return urlObj.searchParams.get(key);
    } catch {
      return null;
    }
  }

  function extractVideoId(u: string): string | null {
    const v = getQueryParam(u, 'v');
    if (v) return v;
    // youtu.be/<id>
    try {
      const urlObj = new URL(u);
      if (urlObj.hostname.includes('youtu.be')) {
        return urlObj.pathname.replace('/', '');
      }
    } catch {}
    return null;
  }

  function extractPlaylistId(u: string): string | null {
    return getQueryParam(u, 'list');
  }

  React.useEffect(() => {
    (async () => {
      try {
        const out: YtItem[] = [];
        for (const r of resources) {
          if (r.type === 'video') {
            const id = extractVideoId(r.url);
            if (!id) continue;
            const resp = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${YT_API_KEY}`);
            const data = await resp.json();
            const s = data?.items?.[0]?.snippet;
            if (s) {
              out.push({ id, type: 'video', url: r.url, title: s.title, thumb: s.thumbnails?.medium?.url || s.thumbnails?.default?.url, channel: s.channelTitle });
            }
          } else {
            const pid = extractPlaylistId(r.url);
            if (!pid) continue;
            const resp = await fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${pid}&key=${YT_API_KEY}`);
            const data = await resp.json();
            const s = data?.items?.[0]?.snippet;
            if (s) {
              out.push({ id: pid, type: 'playlist', url: r.url, title: s.title, thumb: s.thumbnails?.medium?.url || s.thumbnails?.default?.url, channel: s.channelTitle });
            }
          }
        }
        setYtItems(out);
      } catch {
        setYtItems([]);
      } finally {
        setYtLoading(false);
      }
    })();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => { try { router.back(); } catch { router.replace('/(tabs)'); } }}>
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
      </View>
      <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}><Text style={styles.heroTitle}>Move with your hormones 💪</Text></LinearGradient>

      <Text style={styles.sectionLabel}>Weekly Streak</Text>
      <View style={styles.progressBar}>
        <Animated.View style={[styles.progressFill, { width: widthInterpolate, backgroundColor: theme.accentColor }]} />
      </View>
      <Text style={styles.streakText}>{completed}/{total} days completed</Text>

      <View style={styles.card}>
        <Text style={styles.cardHeader}>{theme.phaseIcon} {phaseKey} Phase</Text>
        <Text style={styles.title}>{theme.workoutRecommendation}</Text>
        <Text style={styles.subtitle}>{theme.workoutDetails}</Text>
        <TouchableOpacity style={[styles.start, { backgroundColor: theme.accentColor }]}>
          <Text style={styles.startText}>Start Workout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.guidanceCard}>
        <Text style={styles.sectionLabel}>For this phase</Text>
        <Text style={styles.focusText}><Text style={{ fontWeight: '800' }}>Focus:</Text> {theme.workoutFocus}</Text>
        <Text style={[styles.sectionLabel, { marginTop: 10 }]}>Workout types</Text>
        <View style={styles.typeChips}>
          {theme.workoutTypes.map((t, i) => (
            <View key={i} style={styles.typeChip}><Text style={styles.typeChipText}>{t}</Text></View>
          ))}
        </View>
        <Text style={styles.whyText}><Text style={{ fontWeight: '800' }}>Why:</Text> {theme.workoutWhy}</Text>
      </View>

      <TouchableOpacity style={styles.exploreMore}>
        <Text style={styles.exploreText}>Explore More Workouts</Text>
      </TouchableOpacity>

      <View style={styles.resourcesCard}>
        <Text style={styles.resourcesHeader}>Workout – Videos</Text>
        {ytLoading && (
          <View style={{ paddingVertical: 12 }}>
            <ActivityIndicator color={theme.accentColor} />
          </View>
        )}
        {!ytLoading && ytItems && ytItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.vidRow} onPress={() => setPlayer({ id: item.id, type: item.type })}>
            <Image source={{ uri: item.thumb }} style={styles.vidThumb} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.vidTitle]} numberOfLines={2}>{item.title}</Text>
              {!!item.channel && <Text style={styles.vidMeta}>{item.channel}{item.type === 'playlist' ? ' • Playlist' : ''}</Text>}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Modal visible={!!player} transparent animationType="slide" onRequestClose={() => setPlayer(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {player && (
              Platform.OS === 'web' ? (
                // @ts-ignore iframe allowed on web
                <iframe
                  width="100%"
                  height="100%"
                  src={player.type === 'playlist' ? `https://www.youtube.com/embed/videoseries?list=${player.id}` : `https://www.youtube.com/embed/${player.id}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <WebView
                  source={{ uri: player.type === 'playlist' ? `https://www.youtube.com/embed/videoseries?list=${player.id}` : `https://www.youtube.com/embed/${player.id}` }}
                  style={{ flex: 1 }}
                  allowsInlineMediaPlayback
                  javaScriptEnabled
                />
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
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
    padding: 20,
  },
  hero: { paddingTop: 56, paddingBottom: 20, paddingHorizontal: 20, borderRadius: 20, marginBottom: 14 },
  heroTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  topBar: { paddingHorizontal: 16, paddingTop: 16 },
  sectionLabel: { fontSize: 13, color: '#8C6A60', fontWeight: '800', marginBottom: 8, marginTop: 6 },
  progressBar: { height: 12, borderRadius: 8, backgroundColor: '#F2D6C7', overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 8 },
  streakText: { textAlign: 'right', color: '#8C6A60', marginTop: 6, marginBottom: 12 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F2D6C7',
    marginBottom: 12,
  },
  cardHeader: { fontSize: 13, color: '#B76745', fontWeight: '800', marginBottom: 6 },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  start: { borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  startText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  exploreMore: { alignItems: 'center', marginTop: 10 },
  exploreText: { color: '#B76745', fontWeight: '700' },
  resourcesCard: { backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#F2D6C7', padding: 16, marginTop: 12 },
  resourcesHeader: { fontSize: 15, fontWeight: '800', color: '#6B3A2E', marginBottom: 10 },
  resourceLink: { fontSize: 14, fontWeight: '700', marginTop: 8 },
  resourceMeta: { fontSize: 12, color: '#8C6A60' },
  vidRow: { flexDirection: 'row', gap: 12, marginBottom: 12, alignItems: 'center' },
  vidThumb: { width: 120, height: 68, borderRadius: 10, backgroundColor: '#F2D6C7' },
  vidTitle: { color: '#1F2937', fontWeight: '700' },
  vidMeta: { color: '#8C6A60', fontSize: 12, marginTop: 2 },
  guidanceCard: { backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#F2D6C7', padding: 16, marginTop: 12 },
  focusText: { color: '#4B2D2F' },
  typeChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  typeChip: { backgroundColor: '#FFF1E8', borderRadius: 14, paddingVertical: 6, paddingHorizontal: 10, borderWidth: 1, borderColor: '#F2D6C7' },
  typeChipText: { color: '#6B3A2E', fontWeight: '700' },
  whyText: { color: '#6B7280', marginTop: 10, lineHeight: 20 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', padding: 16 },
  modalCard: { width: '100%', maxWidth: 720, height: 400, backgroundColor: '#000', borderRadius: 12, overflow: 'hidden' },
  closeBtn: { position: 'absolute', bottom: 12, right: 12, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 12 },
  closeText: { color: '#FFF', fontWeight: '800' },
});


