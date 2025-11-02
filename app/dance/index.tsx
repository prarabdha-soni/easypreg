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

// Dance Workout Playlist ID (shared for both Follicular and Ovulation phases)
const DANCE_PLAYLIST_ID = 'PLN99XDk2SYr7YFHIVmTffejyRZliMGGIM';

// Follicular Phase Dance Videos - Using playlist
const FOLLICULAR_DANCE_VIDEOS = [
  `https://www.youtube.com/playlist?list=${DANCE_PLAYLIST_ID}`,
];

// Ovulatory Phase Dance Videos - Using playlist
const OVULATORY_DANCE_VIDEOS = [
  `https://www.youtube.com/playlist?list=${DANCE_PLAYLIST_ID}`,
];

type VideoInfo = {
  id: string;
  url: string;
  thumbnail: string | null;
  title: string;
  loading: boolean;
  isPlaylist: boolean;
};

function extractVideoId(url: string): { id: string; isPlaylist: boolean } | null {
  try {
    const urlObj = new URL(url);
    const listId = urlObj.searchParams.get('list');
    if (listId) {
      return { id: listId, isPlaylist: true };
    }
    const v = urlObj.searchParams.get('v');
    if (v) {
      return { id: v, isPlaylist: false };
    }
    if (urlObj.hostname.includes('youtu.be')) {
      return { id: urlObj.pathname.replace('/', ''), isPlaylist: false };
    }
  } catch {}
  return null;
}

export default function DanceScreen() {
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
  const [playerTitle, setPlayerTitle] = useState<string>('Dance Video');

  useEffect(() => {
    const fetchVideos = async () => {
      let videoUrls: string[] = [];
      
      if (phaseKey === 'Follicular') {
        videoUrls = FOLLICULAR_DANCE_VIDEOS;
      } else if (phaseKey === 'Ovulation') {
        videoUrls = OVULATORY_DANCE_VIDEOS;
      } else {
        // For Menstrual and Luteal, show message that dance isn't recommended
        setLoading(false);
        return;
      }

      if (videoUrls.length === 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      
      const videoData = videoUrls.map(url => {
        const extracted = extractVideoId(url);
        return extracted ? { url, ...extracted } : null;
      }).filter(Boolean) as Array<{ url: string; id: string; isPlaylist: boolean }>;

      const singleVideoIds = videoData.filter(v => !v.isPlaylist).map(v => v.id);
      const allVideos: VideoInfo[] = [];

      // Fetch videos from playlist if we have playlists
      const playlists = videoData.filter(v => v.isPlaylist);
      if (playlists.length > 0) {
        // Fetch all videos from the playlist
        try {
          const resp = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlists[0].id}&maxResults=50&key=${YT_API_KEY}`
          );
          const data = await resp.json();
          
          if (data.items) {
            data.items.forEach((item: any) => {
              if (item.snippet?.resourceId?.videoId) {
                allVideos.push({
                  id: item.snippet.resourceId.videoId,
                  url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
                  thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || null,
                  title: item.snippet?.title || 'Dance Video',
                  loading: false,
                  isPlaylist: false,
                });
              }
            });
          }
        } catch (err) {
          console.log('Error fetching playlist:', err);
        }
      }

      // Fetch individual videos if we have any
      if (singleVideoIds.length > 0) {
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
                      title: item.snippet?.title || 'Dance Video',
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

      setVideos(allVideos);
      setLoading(false);
    };

    fetchVideos();
  }, [phaseKey]);

  const handlePlayVideo = (video: VideoInfo) => {
    // Play inline in the same section
    setPlayingVideoId(video.id);
  };

  const handleFullscreen = (video: VideoInfo) => {
    setPlayingVideoId(null); // Stop inline video first
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

      {/* Dance Videos */}
      {(phaseKey === 'Follicular' || phaseKey === 'Ovulation') ? (
        loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={theme.accentColor} size="large" />
            <Text style={styles.loadingText}>Loading dance videos...</Text>
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
                        <Text style={styles.placeholderText}>{video.isPlaylist ? '📋 Playlist' : 'Dance Video'}</Text>
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
            <Text style={styles.noVideosText}>No dance videos available for this phase.</Text>
          </View>
        )
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

