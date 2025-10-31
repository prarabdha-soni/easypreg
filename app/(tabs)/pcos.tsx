import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Modal, Platform } from 'react-native';
// @ts-ignore: Only used on native
import { WebView } from 'react-native-webview';
import React, { useEffect, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { getCycleDay, getCurrentHormonalPhase, themes } from '@/services/ThemeService';
import { Play, X } from 'lucide-react-native';

const YT_API_KEY = 'AIzaSyBvQcLcPhoGKqhh6bRKnGHQ4By7O6ZaMjw';

const PCOS_VIDEOS = [
  'https://www.youtube.com/watch?v=inpok4MKVLM', // Featured Yoga Video for PCOS
  'https://www.youtube.com/watch?v=9K8SZpdMkOQ',
  'https://www.youtube.com/watch?v=5JvbjrLESPs',
  'https://www.youtube.com/watch?v=19jSUzUIvlM',
  'https://www.youtube.com/watch?v=mbTxReAwS0k',
  'https://www.youtube.com/watch?v=5rcW9GeUEos',
  'https://www.youtube.com/watch?v=57qFHTzxV0E',
  'https://www.youtube.com/watch?v=VJHk_9fG3So',
  'https://www.youtube.com/watch?v=X1qYwV3fyQA',
  'https://www.youtube.com/watch?v=Lt9OdTc-_kU',
  'https://www.youtube.com/watch?v=z5IXPQZc0TI',
];

type VideoInfo = {
  id: string;
  url: string;
  thumbnail: string | null;
  title: string;
  loading: boolean;
};

function extractVideoId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const v = urlObj.searchParams.get('v');
    if (v) return v;
    if (urlObj.hostname.includes('youtu.be')) {
      return urlObj.pathname.replace('/', '');
    }
  } catch {}
  return null;
}

export default function PCOSScreen() {
  const { profile } = useUser();
  const phaseKey: 'Menstrual'|'Follicular'|'Ovulation'|'Luteal' = profile.lastPeriodDate 
    ? getCurrentHormonalPhase(getCycleDay(profile.lastPeriodDate)) 
    : 'Follicular';
  const theme = themes[phaseKey];
  
  const [videos, setVideos] = useState<VideoInfo[]>([]);
  const [player, setPlayer] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const videoIds = PCOS_VIDEOS.map(url => extractVideoId(url)).filter(Boolean) as string[];
      
      // Fetch in batches to avoid rate limiting
      const batchSize = 5;
      const batches: string[][] = [];
      for (let i = 0; i < videoIds.length; i += batchSize) {
        batches.push(videoIds.slice(i, i + batchSize));
      }

      const allVideos: VideoInfo[] = [];

      for (const batch of batches) {
        try {
          const ids = batch.join(',');
          const resp = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,status&id=${ids}&key=${YT_API_KEY}`
          );
          const data = await resp.json();
          
          if (data.items) {
            data.items.forEach((item: any) => {
              // Only include videos that are available and public
              if (item.status?.privacyStatus === 'public' && item.snippet) {
                const originalUrl = PCOS_VIDEOS.find(url => extractVideoId(url) === item.id);
                if (originalUrl) {
                  allVideos.push({
                    id: item.id,
                    url: originalUrl,
                    thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || null,
                    title: item.snippet?.title || 'PCOS Video',
                    loading: false,
                  });
                }
              }
            });
          }
        } catch (err) {
          console.log('Error fetching video batch:', err);
        }
      }

      // Don't add videos that failed to fetch or are unavailable
      // Only show videos that were successfully fetched and are public

      setVideos(allVideos);
    };

    fetchVideos();
  }, []);

  const handlePlay = (videoId: string) => {
    setPlayer({ id: videoId });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface }]} showsVerticalScrollIndicator={false}>
      <Text style={styles.pageTitle}>PCOS Education & Support</Text>

      <View style={[styles.headerBanner, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Text style={[styles.headerText, { color: theme.accentColor }]}>
          📚 Learn about PCOS with expert guidance and evidence-based information
        </Text>
      </View>

      {/* Why Yoga for PCOS Section */}
      <View style={[styles.yogaInfoCard, { backgroundColor: theme.accentColor + '10', borderColor: theme.accentColor }]}>
        <View style={styles.yogaInfoHeader}>
          <Text style={[styles.yogaInfoIcon, { color: theme.accentColor }]}>🧘‍♀️</Text>
          <Text style={[styles.yogaInfoTitle, { color: theme.accentColor }]}>Why Yoga is Essential for PCOS</Text>
        </View>
        <Text style={styles.yogaInfoText}>
          Yoga offers multiple benefits for managing PCOS symptoms:
        </Text>
        <View style={styles.benefitsList}>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitBullet}>•</Text>
            <Text style={styles.benefitText}>
              <Text style={styles.benefitLabel}>Hormone Balance:</Text> Regular practice helps regulate insulin levels and reduce androgen production
            </Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitBullet}>•</Text>
            <Text style={styles.benefitText}>
              <Text style={styles.benefitLabel}>Stress Reduction:</Text> Lowers cortisol, which is often elevated in PCOS
            </Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitBullet}>•</Text>
            <Text style={styles.benefitText}>
              <Text style={styles.benefitLabel}>Weight Management:</Text> Supports healthy metabolism and helps maintain optimal body weight
            </Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitBullet}>•</Text>
            <Text style={styles.benefitText}>
              <Text style={styles.benefitLabel}>Improved Fertility:</Text> Enhances reproductive health by balancing hormones naturally
            </Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitBullet}>•</Text>
            <Text style={styles.benefitText}>
              <Text style={styles.benefitLabel}>Better Sleep:</Text> Promotes relaxation and improves sleep quality, crucial for hormone regulation
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.videosGrid}>
        {videos.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={theme.accentColor} size="large" />
            <Text style={styles.loadingText}>Loading videos...</Text>
          </View>
        ) : (
          videos.map((video) => (
            <TouchableOpacity
              key={video.id}
              style={[styles.videoCard, { borderColor: theme.border, backgroundColor: theme.surface }]}
              onPress={() => handlePlay(video.id)}
            >
              {video.thumbnail ? (
                <Image source={{ uri: video.thumbnail }} style={styles.videoThumbnail} />
              ) : (
                <View style={[styles.videoPlaceholder, { backgroundColor: theme.border }]}>
                  <Play color={theme.accentColor} size={32} />
                </View>
              )}
              <View style={styles.playOverlay}>
                <View style={[styles.playButton, { backgroundColor: theme.accentColor }]}>
                  <Play color="#FFFFFF" size={20} fill="#FFFFFF" />
                </View>
              </View>
              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>

      {/* Video Player Modal */}
      <Modal visible={!!player} transparent animationType="fade" onRequestClose={() => setPlayer(null)}>
        <View style={styles.videoModalOverlay}>
          <View style={styles.videoModalCard}>
            <View style={styles.videoHeader}>
              <Text style={styles.modalVideoTitle}>PCOS Video</Text>
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
  pageTitle: { fontSize: 28, fontWeight: '700', color: '#111827', paddingHorizontal: 20, marginTop: 20, marginBottom: 16 },
  headerBanner: { marginHorizontal: 20, marginBottom: 20, padding: 16, borderRadius: 12, borderWidth: 1 },
  headerText: { fontSize: 14, fontWeight: '600', textAlign: 'center', lineHeight: 20 },
  yogaInfoCard: { marginHorizontal: 20, marginBottom: 24, padding: 20, borderRadius: 16, borderWidth: 2 },
  yogaInfoHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  yogaInfoIcon: { fontSize: 28 },
  yogaInfoTitle: { fontSize: 20, fontWeight: '700', flex: 1 },
  yogaInfoText: { fontSize: 15, color: '#374151', marginBottom: 16, lineHeight: 22, fontWeight: '500' },
  benefitsList: { gap: 12 },
  benefitItem: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  benefitBullet: { fontSize: 18, color: '#111827', fontWeight: '700', marginTop: 2 },
  benefitText: { fontSize: 14, color: '#4B5563', lineHeight: 20, flex: 1 },
  benefitLabel: { fontWeight: '700', color: '#111827' },
  videosGrid: { paddingHorizontal: 20, paddingBottom: 20 },
  loadingContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  loadingText: { marginTop: 12, fontSize: 14, color: '#6B7280' },
  videoCard: { marginBottom: 20, borderRadius: 16, overflow: 'hidden', borderWidth: 1, position: 'relative' },
  videoThumbnail: { width: '100%', height: 200, backgroundColor: '#000' },
  videoPlaceholder: { width: '100%', height: 200, alignItems: 'center', justifyContent: 'center' },
  playOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  playButton: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  videoInfo: { padding: 16, backgroundColor: '#FFFFFF' },
  videoTitle: { fontSize: 15, fontWeight: '600', color: '#111827', lineHeight: 20 },
  videoModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center', alignItems: 'center' },
  videoModalCard: { width: '100%', height: '100%', backgroundColor: '#000', justifyContent: 'center' },
  videoHeader: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 56, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)' },
  modalVideoTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  closeVideoBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  videoContainer: { flex: 1, width: '100%' },
  videoWebView: { flex: 1, width: '100%', backgroundColor: '#000' },
});

