import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Modal, Platform, ScrollView } from 'react-native';
// @ts-ignore: Only used on native
import { WebView } from 'react-native-webview';
import React, { useEffect, useMemo, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { getCycleDay, getCurrentHormonalPhase, themes } from '@/services/ThemeService';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Play, X } from 'lucide-react-native';

const YT_API_KEY = 'AIzaSyBvQcLcPhoGKqhh6bRKnGHQ4By7O6ZaMjw';

export default function DanceScreen() {
  const { profile } = useUser();
  const router = useRouter();
  const phaseKey: 'Menstrual'|'Follicular'|'Ovulation'|'Luteal' = useMemo(() => {
    if (!profile.lastPeriodDate) return 'Follicular';
    const day = getCycleDay(profile.lastPeriodDate);
    return getCurrentHormonalPhase(day);
  }, [profile.lastPeriodDate]);

  const theme = themes[phaseKey];
  
  const [danceThumb, setDanceThumb] = useState<string | null>(null);
  const [danceTitle, setDanceTitle] = useState<string>('');
  const [loadingDanceThumb, setLoadingDanceThumb] = useState(true);
  const [player, setPlayer] = useState<{ id: string; type: 'video' } | null>(null);
  const [playerTitle, setPlayerTitle] = useState<string>('Dance Video');

  function extractVideoId(u: string): string | null {
    try {
      const urlObj = new URL(u);
      const v = urlObj.searchParams.get('v');
      if (v) return v;
      if (urlObj.hostname.includes('youtu.be')) {
        return urlObj.pathname.replace('/', '');
      }
    } catch {}
    return null;
  }

  useEffect(() => {
    if (!theme.danceVideoURL) {
      setLoadingDanceThumb(false);
      return;
    }
    const videoId = extractVideoId(theme.danceVideoURL);
    if (!videoId) {
      setLoadingDanceThumb(false);
      return;
    }
    
    setLoadingDanceThumb(true);
    (async () => {
      try {
        const resp = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YT_API_KEY}`);
        const data = await resp.json();
        const s = data?.items?.[0]?.snippet;
        if (s) {
          setDanceThumb(s.thumbnails?.high?.url || s.thumbnails?.medium?.url || s.thumbnails?.default?.url);
          setDanceTitle(s.title || 'Dance Video');
        }
      } catch (err) {
        console.log('Dance thumbnail fetch error:', err);
      }
      finally { setLoadingDanceThumb(false); }
    })();
  }, [theme.danceVideoURL]);

  const handlePlayDance = () => {
    if (theme.danceVideoURL) {
      const videoId = extractVideoId(theme.danceVideoURL);
      if (videoId) {
        setPlayerTitle(danceTitle || 'Dance Video');
        setPlayer({ id: videoId, type: 'video' });
      }
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface }]} showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => { try { router.back(); } catch { router.replace('/(tabs)'); } }}>
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
      </View>

      <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <Text style={styles.pageTitle}>Dance 💃</Text>
        <Text style={styles.pageSubtitle}>Move with your cycle</Text>
      </LinearGradient>

      {/* Why Section - Dance */}
      <View style={[styles.whyBanner, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Text style={[styles.whyTitle, { color: theme.accentColor }]}>Why Dance?</Text>
        <Text style={styles.whyText}>
          {phaseKey === 'Follicular' && 'Rising estrogen boosts energy and muscle recovery. Dance can be moderate during this phase, supporting strength building alongside workouts.'}
          {phaseKey === 'Ovulation' && 'Peak strength, coordination, and mood create ideal conditions for skill-based dance and intense interval training. This is your peak performance phase.'}
          {(phaseKey === 'Menstrual' || phaseKey === 'Luteal') && 'Dance is less recommended during this phase. Consider gentle yoga or restorative movement instead.'}
        </Text>
      </View>

      {/* Dance Video */}
      {(phaseKey === 'Follicular' || phaseKey === 'Ovulation') ? (
        <>
          <View style={[styles.videoCard, { borderColor: theme.border }]}>
            {loadingDanceThumb ? (
              <View style={styles.videoPlaceholder}>
                <ActivityIndicator color={theme.accentColor} size="large" />
              </View>
            ) : danceThumb ? (
              <Image source={{ uri: danceThumb }} style={styles.videoThumbnail} />
            ) : (
              <View style={styles.videoPlaceholder}>
                <Text style={styles.placeholderText}>Dance Video</Text>
              </View>
            )}
            
            <View style={[styles.phaseBadge, { backgroundColor: 'rgba(0,0,0,0.7)' }]}>
              <Text style={styles.phaseBadgeText}>{phaseKey} Phase • Dance</Text>
            </View>

            <TouchableOpacity style={[styles.playBtn, { backgroundColor: theme.accentColor }]} onPress={handlePlayDance}>
              <Play color="#FFFFFF" size={32} fill="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          {danceTitle && (
            <View style={[styles.videoInfoCard, { borderColor: theme.border, backgroundColor: theme.surface, marginHorizontal: 20 }]}>
              <Text style={styles.videoInfoText}>💃 {danceTitle}</Text>
            </View>
          )}
        </>
      ) : (
        <View style={[styles.notAvailableCard, { borderColor: theme.border, backgroundColor: theme.surface }]}>
          <Text style={styles.notAvailableText}>
            Dance workouts are best suited for Follicular and Ovulation phases when your energy is highest. 
            During {phaseKey} phase, consider gentle yoga or restorative movement instead.
          </Text>
        </View>
      )}

      <View style={{ height: 40 }} />

      {/* Video Player Modal */}
      <Modal visible={!!player} transparent animationType="fade" onRequestClose={() => setPlayer(null)}>
        <View style={styles.videoModalOverlay}>
          <View style={styles.videoModalCard}>
            <View style={styles.videoHeader}>
              <Text style={styles.modalVideoTitle}>{playerTitle}</Text>
              <TouchableOpacity 
                style={[styles.closeVideoBtn, { backgroundColor: 'rgba(255,255,255,0.2)' }]} 
                onPress={() => setPlayer(null)}
              >
                <X color="#FFFFFF" size={20} />
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
                  onNavigationStateChange={(navState) => {
                    if (!navState.url.includes('youtube.com/embed')) {
                      return false;
                    }
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
  container: { flex: 1 },
  topBar: { paddingHorizontal: 16, paddingTop: 16 },
  hero: { paddingTop: 56, paddingBottom: 28, paddingHorizontal: 20, borderBottomLeftRadius: 28, borderBottomRightRadius: 28, marginBottom: 20 },
  pageTitle: { fontSize: 28, fontWeight: '700', color: '#FFF', marginBottom: 6 },
  pageSubtitle: { fontSize: 15, color: 'rgba(255,255,255,0.9)' },
  whyBanner: { marginHorizontal: 20, marginBottom: 20, padding: 16, borderRadius: 12, borderWidth: 1 },
  whyTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  whyText: { fontSize: 13, color: '#374151', lineHeight: 20 },
  videoCard: { marginHorizontal: 20, height: 220, borderRadius: 20, overflow: 'hidden', borderWidth: 1, marginBottom: 16, position: 'relative' },
  videoThumbnail: { width: '100%', height: '100%', backgroundColor: '#000' },
  videoPlaceholder: { width: '100%', height: '100%', backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  placeholderText: { color: '#6B7280', fontSize: 14 },
  phaseBadge: { position: 'absolute', top: 12, left: 12, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 12 },
  phaseBadgeText: { color: '#FFFFFF', fontWeight: '700', fontSize: 11 },
  playBtn: { position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -28 }, { translateY: -28 }], width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  videoInfoCard: { padding: 16, borderRadius: 12, borderWidth: 1, marginTop: 8 },
  videoInfoText: { fontSize: 15, fontWeight: '600', color: '#111827', lineHeight: 20 },
  notAvailableCard: { marginHorizontal: 20, padding: 20, borderRadius: 12, borderWidth: 1 },
  notAvailableText: { fontSize: 14, color: '#6B7280', lineHeight: 20, textAlign: 'center' },
  videoModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center', alignItems: 'center' },
  videoModalCard: { width: '100%', height: '100%', backgroundColor: '#000', justifyContent: 'center' },
  videoHeader: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 56, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)' },
  modalVideoTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', flex: 1, marginRight: 12 },
  closeVideoBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  videoContainer: { flex: 1, width: '100%' },
  videoWebView: { flex: 1, width: '100%', backgroundColor: '#000' },
});

