import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Modal, Platform, ScrollView } from 'react-native';
// @ts-ignore: Only used on native
import { WebView } from 'react-native-webview';
import React, { useEffect, useMemo, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { getCycleDay, getCurrentHormonalPhase, themes } from '@/services/ThemeService';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Play, X, Maximize2 } from 'lucide-react-native';

const YT_API_KEY = 'AIzaSyBvQcLcPhoGKqhh6bRKnGHQ4By7O6ZaMjw';

// Menstrual Phase Yoga Videos
const MENSTRUAL_YOGA_VIDEOS = [
  'https://www.youtube.com/watch?v=4JaCcp39iVI',
  'https://www.youtube.com/watch?v=MBzHxuw9XUw',
  'https://www.youtube.com/watch?v=vCytq0eygo8',
  'https://www.youtube.com/watch?v=GJDyEdRZLIU',
  'https://www.youtube.com/watch?v=GKkha0fvIXk',
  'https://www.youtube.com/watch?v=ZsnUB2oWIz8',
];

// Luteal Phase Yoga Videos
const LUTEAL_YOGA_VIDEOS = [
  'https://www.youtube.com/watch?v=Gn3CXFJo3T4',
  'https://www.youtube.com/watch?v=BR0HW1-Ci3w',
  'https://www.youtube.com/watch?v=Df4XI5VEKFg',
  'https://www.youtube.com/watch?v=m33Yvse6fEA',
  'https://www.youtube.com/watch?v=WbuqNUoA8MM',
  'https://www.youtube.com/watch?v=ZsnUB2oWIz8',
  'https://www.youtube.com/watch?v=i7w0I8Xq0jo',
];

type VideoInfo = {
  id: string;
  url: string;
  thumbnail: string | null;
  title: string;
  loading: boolean;
  isPlaylist: boolean;
  playlistId?: string;
};

function extractVideoId(url: string): { id: string; isPlaylist: boolean } | null {
  try {
    const urlObj = new URL(url);
    // Check for playlist first
    const listId = urlObj.searchParams.get('list');
    if (listId) {
      return { id: listId, isPlaylist: true };
    }
    // Check for regular video
    const v = urlObj.searchParams.get('v');
    if (v) {
      return { id: v, isPlaylist: false };
    }
    // Check for youtu.be short URLs
    if (urlObj.hostname.includes('youtu.be')) {
      return { id: urlObj.pathname.replace('/', ''), isPlaylist: false };
    }
  } catch {}
  return null;
}

export default function YogaScreen() {
  const { profile } = useUser();
  const router = useRouter();
  const phaseKey: 'Menstrual'|'Follicular'|'Ovulation'|'Luteal' = useMemo(() => {
    if (!profile.lastPeriodDate) return 'Follicular';
    const day = getCycleDay(profile.lastPeriodDate);
    return getCurrentHormonalPhase(day);
  }, [profile.lastPeriodDate]);

  const theme = themes[phaseKey];
  
  const [videos, setVideos] = useState<VideoInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null); // Track which video is playing inline
  const [player, setPlayer] = useState<{ id: string; type: 'video' | 'playlist'; isPlaylist: boolean } | null>(null);
  const [playerTitle, setPlayerTitle] = useState<string>('Yoga Video');

  useEffect(() => {
    const fetchVideos = async () => {
      let videoUrls: string[] = [];
      
      if (phaseKey === 'Menstrual') {
        videoUrls = MENSTRUAL_YOGA_VIDEOS;
      } else if (phaseKey === 'Luteal') {
        videoUrls = LUTEAL_YOGA_VIDEOS;
      } else {
        // For Follicular and Ovulation, use the single video from theme
        if (theme.yogaVideoURL) {
          videoUrls = [theme.yogaVideoURL];
        }
      }

      if (videoUrls.length === 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      
      // Extract video/playlist IDs
      const videoData = videoUrls.map(url => {
        const extracted = extractVideoId(url);
        return extracted ? { url, ...extracted } : null;
      }).filter(Boolean) as Array<{ url: string; id: string; isPlaylist: boolean }>;

      // For playlists, we'll show them but fetch differently
      // For single videos, fetch metadata
      const singleVideoIds = videoData.filter(v => !v.isPlaylist).map(v => v.id);
      
      const allVideos: VideoInfo[] = [];

      if (singleVideoIds.length > 0) {
        // Fetch in batches
        const batchSize = 5;
        for (let i = 0; i < singleVideoIds.length; i += batchSize) {
          const batch = singleVideoIds.slice(i, i + batchSize);
          try {
            const resp = await fetch(
              `https://www.googleapis.com/youtube/v3/videos?part=snippet,status&id=${batch.join(',')}&key=${YT_API_KEY}`
            );
            const data = await resp.json();
            
            if (data.items) {
              data.items.forEach((item: any) => {
                if (item.status?.privacyStatus === 'public' && item.snippet) {
                  const originalUrl = videoUrls.find(url => {
                    const extracted = extractVideoId(url);
                    return extracted && !extracted.isPlaylist && extracted.id === item.id;
                  });
                  if (originalUrl) {
                    allVideos.push({
                      id: item.id,
                      url: originalUrl,
                      thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || null,
                      title: item.snippet?.title || 'Yoga Video',
                      loading: false,
                      isPlaylist: false,
                    });
                  }
                }
              });
            }
          } catch (err) {
            console.log('Error fetching video batch:', err);
          }
        }
      }

      // Add playlists (we'll use a generic thumbnail for playlists)
      const playlists = videoData.filter(v => v.isPlaylist);
      playlists.forEach(({ url, id }) => {
        allVideos.push({
          id,
          url,
          thumbnail: null, // Playlists will use a placeholder
          title: 'Yoga Playlist',
          loading: false,
          isPlaylist: true,
          playlistId: id,
        });
      });

      setVideos(allVideos);
      setLoading(false);
    };

    fetchVideos();
  }, [phaseKey, theme.yogaVideoURL]);

  const handlePlayVideo = (video: VideoInfo) => {
    // Play inline in the same section
    setPlayingVideoId(video.id);
  };

  const handleFullscreen = (video: VideoInfo) => {
    setPlayerTitle(video.title);
    setPlayer({ 
      id: video.id, 
      type: video.isPlaylist ? 'playlist' : 'video',
      isPlaylist: video.isPlaylist 
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface }]} showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => { try { router.back(); } catch { router.replace('/(tabs)'); } }}>
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
      </View>

      <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <Text style={styles.pageTitle}>Yoga 🧘</Text>
        <Text style={styles.pageSubtitle}>Move with your cycle</Text>
      </LinearGradient>

      {/* Why Section - Yoga */}
      <View style={[styles.whyBanner, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Text style={[styles.whyTitle, { color: theme.accentColor }]}>Why Yoga?</Text>
        <Text style={styles.whyText}>
          {phaseKey === 'Menstrual' && 'The body needs relaxation, pain relief, and grounding. Yoga\'s emphasis on breath and mindful movement supports this phase best. Workouts and dance should be minimal or restorative.'}
          {phaseKey === 'Follicular' && 'Yoga can be moderate during this phase, supporting strength building alongside workouts as estrogen rises.'}
          {phaseKey === 'Ovulation' && 'Yoga can support with power and balance during your peak performance phase.'}
          {phaseKey === 'Luteal' && 'Progesterone causes fatigue and higher body temperature, favoring calming, restorative yoga and gentle workouts with limited intensity. Dance demand is lighter here.'}
        </Text>
      </View>

      {/* Yoga Videos List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={theme.accentColor} size="large" />
          <Text style={styles.loadingText}>Loading yoga videos...</Text>
        </View>
      ) : videos.length > 0 ? (
        <View style={styles.videosList}>
          {videos.map((video, index) => (
            <View key={video.id} style={[styles.videoCard, { borderColor: theme.border }]}>
              {playingVideoId === video.id ? (
                // Inline video player
                <View style={styles.inlineVideoContainer}>
                  {Platform.OS === 'web' ? (
                    <View style={styles.inlineVideoWrapper}>
                      {/* @ts-ignore */}
                      <iframe
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&playsinline=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </View>
                  ) : (
                    <WebView
                      source={{ uri: `https://www.youtube.com/embed/${video.id}?autoplay=1&playsinline=1` }}
                      style={styles.inlineVideoWebView}
                      allowsInlineMediaPlayback={true}
                      mediaPlaybackRequiresUserAction={false}
                      javaScriptEnabled={true}
                      domStorageEnabled={true}
                      startInLoadingState={true}
                      onShouldStartLoadWithRequest={(request) => {
                        const allowed = request.url.includes('youtube.com/embed') || 
                                       request.url.includes('youtube.com/iframe_api') ||
                                       request.url.includes('googleapis.com');
                        return allowed;
                      }}
                    />
                  )}
                  <View style={styles.inlineVideoControls}>
                    <TouchableOpacity 
                      style={[styles.fullscreenBtn, { backgroundColor: theme.accentColor }]}
                      onPress={() => handleFullscreen(video)}
                    >
                      <Maximize2 color="#FFFFFF" size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.closeInlineBtn, { backgroundColor: 'rgba(0,0,0,0.6)' }]}
                      onPress={() => setPlayingVideoId(null)}
                    >
                      <X color="#FFFFFF" size={18} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                // Thumbnail view
                <TouchableOpacity 
                  style={styles.thumbnailContainer}
                  onPress={() => handlePlayVideo(video)}
                >
                  {video.thumbnail ? (
                    <Image source={{ uri: video.thumbnail }} style={styles.videoThumbnail} />
                  ) : (
                    <View style={styles.videoPlaceholder}>
                      <Text style={styles.placeholderText}>Yoga Video</Text>
                    </View>
                  )}
                  
                  <View style={[styles.phaseBadge, { backgroundColor: 'rgba(0,0,0,0.7)' }]}>
                    <Text style={styles.phaseBadgeText}>
                      {video.isPlaylist ? '📋 Playlist' : `${phaseKey} Phase`}
                    </Text>
                  </View>

                  <View style={[styles.playBtn, { backgroundColor: theme.accentColor }]}>
                    <Play color="#FFFFFF" size={28} fill="#FFFFFF" />
                  </View>
                  
                  <View style={styles.videoTitleOverlay}>
                    <Text style={styles.videoTitleText} numberOfLines={2}>{video.title}</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.noVideosContainer}>
          <Text style={styles.noVideosText}>No yoga videos available for this phase.</Text>
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
                    src={player.isPlaylist 
                      ? `https://www.youtube.com/embed/videoseries?list=${player.id}&autoplay=1&playsinline=1`
                      : `https://www.youtube.com/embed/${player.id}?autoplay=1&playsinline=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </View>
              ) : (
                <WebView
                  source={{ 
                    uri: player.isPlaylist 
                      ? `https://www.youtube.com/embed/videoseries?list=${player.id}&autoplay=1&playsinline=1`
                      : `https://www.youtube.com/embed/${player.id}?autoplay=1&playsinline=1`
                  }}
                  style={styles.videoWebView}
                  allowsInlineMediaPlayback={true}
                  mediaPlaybackRequiresUserAction={false}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  startInLoadingState={true}
                  onShouldStartLoadWithRequest={(request) => {
                    const allowed = request.url.includes('youtube.com/embed') || 
                                   request.url.includes('youtube.com/iframe_api') ||
                                   request.url.includes('googleapis.com');
                    if (!allowed) {
                      return false;
                    }
                    return true;
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
  loadingContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  loadingText: { marginTop: 12, color: '#6B7280', fontSize: 14 },
  videosList: { paddingHorizontal: 20, paddingBottom: 40 },
  videoCard: { borderRadius: 16, overflow: 'hidden', borderWidth: 1, marginBottom: 16, position: 'relative' },
  thumbnailContainer: { height: 200, position: 'relative' },
  inlineVideoContainer: { height: 220, position: 'relative', backgroundColor: '#000' },
  inlineVideoWrapper: { width: '100%', height: '100%' },
  inlineVideoWebView: { width: '100%', height: '100%', backgroundColor: '#000' },
  inlineVideoControls: { position: 'absolute', top: 12, right: 12, flexDirection: 'row', gap: 8 },
  fullscreenBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  closeInlineBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  videoThumbnail: { width: '100%', height: '100%', backgroundColor: '#000' },
  videoPlaceholder: { width: '100%', height: '100%', backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  placeholderText: { color: '#6B7280', fontSize: 14, fontWeight: '600' },
  phaseBadge: { position: 'absolute', top: 12, left: 12, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 12, zIndex: 2 },
  phaseBadgeText: { color: '#FFFFFF', fontWeight: '700', fontSize: 11 },
  playBtn: { position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -14 }, { translateY: -14 }], width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  videoTitleOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.7)', padding: 12, zIndex: 2 },
  videoTitleText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600', lineHeight: 18 },
  noVideosContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60, paddingHorizontal: 20 },
  noVideosText: { color: '#6B7280', fontSize: 14, textAlign: 'center' },
  videoModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center', alignItems: 'center' },
  videoModalCard: { width: '100%', height: '100%', backgroundColor: '#000', justifyContent: 'center' },
  videoHeader: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 56, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)' },
  modalVideoTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', flex: 1, marginRight: 12 },
  closeVideoBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  videoContainer: { flex: 1, width: '100%' },
  videoWebView: { flex: 1, width: '100%', backgroundColor: '#000' },
});

