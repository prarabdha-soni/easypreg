import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Platform } from 'react-native';
import { 
  Brain, Video, Play, X
} from 'lucide-react-native';
import { useUser } from '@/contexts/UserContext';
import { WebView } from 'react-native-webview';
import { useState, useEffect } from 'react';

const YOUTUBE_API_KEY = 'AIzaSyBvQcLcPhoGKqhh6bRKnGHQ4By7O6ZaMjw';

// Helper function to extract YouTube video ID
const getYouTubeVideoId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
};

// Helper function to get YouTube thumbnail
const getYouTubeThumbnail = (url: string): string => {
  const videoId = getYouTubeVideoId(url);
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

export default function EducationScreen() {
  const { profile } = useUser();
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; title: string; url: string } | null>(null);
  const [videoMetadata, setVideoMetadata] = useState<any>({});

  const isPCOS = profile.healthCondition === 'pcos' || profile.healthCondition === 'pcod';

  // Fetch video metadata from YouTube API
  useEffect(() => {
    const fetchVideoMetadata = async () => {
      const allVideos = isPCOS ? pcosVideos : menopauseVideos;
      const videoIds = allVideos.map(v => getYouTubeVideoId(v.url)).filter(id => id);
      
      if (videoIds.length === 0) return;

      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoIds.join(',')}&key=${YOUTUBE_API_KEY}`
        );
        const data = await response.json();
        
        if (data.items) {
          const metadata: any = {};
          data.items.forEach((item: any) => {
            metadata[item.id] = {
              title: item.snippet.title,
              thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
              channelTitle: item.snippet.channelTitle,
              description: item.snippet.description,
            };
          });
          setVideoMetadata(metadata);
        }
      } catch (error) {
        console.log('Error fetching video metadata:', error);
      }
    };

    fetchVideoMetadata();
  }, [isPCOS]);

  // PCOS/PCOD Videos
  const pcosVideos = [
    {
      id: 1,
      title: 'Explaining PCOD',
      expert: 'Dr. Karthika Reddy',
      url: 'https://www.youtube.com/watch?v=63z0SxYvxcs',
      thumbnail: '🎬',
      description: 'Comprehensive overview of PCOD',
    },
    {
      id: 2,
      title: 'What is PCOS? Symptoms & Treatment',
      expert: 'Medical Animation',
      url: 'https://medshadow.org/videos/pcos-medical-animation-video/',
      thumbnail: '🎬',
      description: 'Animated guide to PCOS',
    },
    {
      id: 3,
      title: 'PCOD Overview',
      expert: 'Health Education',
      url: 'https://www.youtube.com/watch?v=Lx4C_keQB4s',
      thumbnail: '🎬',
      description: 'Understanding PCOD basics',
    },
    {
      id: 4,
      title: 'PCOS Made Easy',
      expert: 'Medical Education',
      url: 'https://www.youtube.com/watch?v=YVQzolMgNp0',
      thumbnail: '🎬',
      description: 'PCOS explained simply',
    },
    {
      id: 5,
      title: 'PCOS by Nucleus Health',
      expert: 'Nucleus Health',
      url: 'https://www.youtube.com/watch?v=FsNKyKS7M_s',
      thumbnail: '🎬',
      description: 'Detailed medical explanation',
    },
  ];

  // Menopause Videos
  const menopauseVideos = [
    {
      id: 1,
      title: 'What Is Menopause?',
      expert: 'Health Education',
      url: 'https://www.youtube.com/watch?v=af-356SbCkY',
      thumbnail: '🎬',
      description: 'Introduction to menopause',
    },
    {
      id: 2,
      title: 'Managing Menopause',
      expert: 'Women\'s Health',
      url: 'https://www.youtube.com/watch?v=QNZfEtZ53RY',
      thumbnail: '🎬',
      description: 'Complete management guide',
    },
    {
      id: 3,
      title: 'Menopause Explained (HealthSketch)',
      expert: 'HealthSketch',
      url: 'https://www.youtube.com/watch?v=NIhQT7VFT9A',
      thumbnail: '🎬',
      description: 'Visual guide to menopause',
    },
    {
      id: 4,
      title: 'Understanding Perimenopause',
      expert: 'Medical Expert',
      url: 'https://www.youtube.com/watch?v=gYJAPCw9qqA',
      thumbnail: '🎬',
      description: 'Perimenopause & Menopause',
    },
    {
      id: 5,
      title: 'Perimenopause: Myths & Management',
      expert: 'Women\'s Health',
      url: 'https://www.youtube.com/watch?v=vZFsjdzXBus',
      thumbnail: '🎬',
      description: 'Debunking myths',
    },
  ];

  const featuredVideos = isPCOS ? pcosVideos : menopauseVideos;

  const handleVideoPress = (video: { id: number; title: string; url: string }) => {
    const videoId = getYouTubeVideoId(video.url);
    setSelectedVideo({
      id: videoId,
      title: video.title,
      url: video.url,
    });
  };

  const closeVideoPlayer = () => {
    setSelectedVideo(null);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Banner */}
      <View style={styles.headerBanner}>
        <Brain size={32} color="#FFFFFF" />
        <Text style={styles.headerTitle}>Educational Hub</Text>
        <Text style={styles.headerSubtitle}>
          {isPCOS 
            ? 'Learn about PCOS/PCOD management'
            : 'Knowledge for your menopause journey'}
        </Text>
      </View>

      {/* Featured Videos */}
      <View style={[styles.section, styles.firstSection]}>
        <View style={styles.sectionHeader}>
          <Video size={20} color="#EC4899" />
          <Text style={styles.sectionTitle}>Expert Videos</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          Watch and learn from specialists
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.videosScroll}>
          {featuredVideos.map((video) => (
            <TouchableOpacity 
              key={video.id} 
              style={styles.videoCard}
              onPress={() => handleVideoPress(video)}
            >
              <View style={styles.videoThumbnail}>
                <Image 
                  source={{ 
                    uri: videoMetadata[getYouTubeVideoId(video.url)]?.thumbnail || getYouTubeThumbnail(video.url) 
                  }}
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
                <View style={styles.playButton}>
                  <Play size={28} color="#FFFFFF" fill="#FFFFFF" />
                </View>
              </View>
              <Text style={styles.videoTitle} numberOfLines={2}>
                {videoMetadata[getYouTubeVideoId(video.url)]?.title || video.title}
              </Text>
              <Text style={styles.videoExpert}>
                {videoMetadata[getYouTubeVideoId(video.url)]?.channelTitle || video.expert}
              </Text>
              <Text style={styles.videoDescription} numberOfLines={1}>{video.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Complete Video Library */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Video size={20} color="#EC4899" />
          <Text style={styles.sectionTitle}>Complete Video Library</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          {isPCOS ? 'All PCOS/PCOD Educational Videos' : 'All Menopause Educational Videos'}
        </Text>

        <View style={styles.videoLibrary}>
          {featuredVideos.map((video, index) => (
            <TouchableOpacity
              key={video.id}
              style={styles.videoListItem}
              onPress={() => handleVideoPress(video)}
            >
              <Image 
                source={{ 
                  uri: videoMetadata[getYouTubeVideoId(video.url)]?.thumbnail || getYouTubeThumbnail(video.url) 
                }}
                style={styles.videoListThumbnail}
                resizeMode="cover"
              />
              <View style={styles.videoListContent}>
                <Text style={styles.videoListTitle}>
                  {videoMetadata[getYouTubeVideoId(video.url)]?.title || video.title}
                </Text>
                <Text style={styles.videoListExpert}>
                  {videoMetadata[getYouTubeVideoId(video.url)]?.channelTitle || video.expert}
                </Text>
                <Text style={styles.videoListDescription}>{video.description}</Text>
              </View>
              <View style={styles.videoListPlayIcon}>
                <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ height: 40 }} />

      {/* Video Player Modal */}
      <Modal
        visible={selectedVideo !== null}
        animationType="slide"
        onRequestClose={closeVideoPlayer}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle} numberOfLines={1}>
              {selectedVideo?.title}
            </Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={closeVideoPlayer}
            >
              <X size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          {selectedVideo && Platform.OS === 'web' ? (
            // For Web: Use iframe directly
            <iframe
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                border: 'none',
                backgroundColor: '#000',
              }}
              src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0&modestbranding=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : selectedVideo ? (
            // For Native: Use WebView
            <WebView
              style={styles.webView}
              source={{ 
                html: `
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                      <style>
                        body {
                          margin: 0;
                          padding: 0;
                          background-color: #000;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          height: 100vh;
                        }
                        .video-container {
                          position: relative;
                          width: 100%;
                          padding-bottom: 56.25%; /* 16:9 aspect ratio */
                          height: 0;
                        }
                        iframe {
                          position: absolute;
                          top: 0;
                          left: 0;
                          width: 100%;
                          height: 100%;
                          border: none;
                        }
                      </style>
                    </head>
                    <body>
                      <div class="video-container">
                        <iframe 
                          src="https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0&modestbranding=1"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                      </div>
                    </body>
                  </html>
                `
              }}
              allowsFullscreenVideo
              mediaPlaybackRequiresUserAction={false}
              javaScriptEnabled={true}
              domStorageEnabled={true}
            />
          ) : null}
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F7',
  },
  headerBanner: {
    backgroundColor: '#8B5A8F',
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  firstSection: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  videosScroll: {
    paddingHorizontal: 20,
  },
  videoCard: {
    width: 200,
    marginRight: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  videoThumbnail: {
    height: 120,
    backgroundColor: '#F3E8F3',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  playButton: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    padding: 12,
    paddingBottom: 6,
    minHeight: 40,
  },
  videoExpert: {
    fontSize: 12,
    color: '#8B5A8F',
    paddingHorizontal: 12,
    paddingBottom: 4,
    fontWeight: '500',
  },
  videoDescription: {
    fontSize: 11,
    color: '#6B7280',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  videoLibrary: {
    paddingHorizontal: 20,
    gap: 12,
  },
  videoListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 14,
    gap: 12,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
    shadowColor: '#8B5A8F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  videoListThumbnail: {
    width: 120,
    height: 68,
    borderRadius: 8,
    backgroundColor: '#F3E8F3',
  },
  videoListPlayIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5A8F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoListContent: {
    flex: 1,
  },
  videoListTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  videoListExpert: {
    fontSize: 12,
    color: '#8B5A8F',
    fontWeight: '500',
    marginBottom: 3,
  },
  videoListDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTitleContainer: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 13,
    color: '#6B7280',
  },
  articlesList: {
    gap: 10,
    marginBottom: 14,
  },
  articleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 10,
  },
  articleInfo: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 3,
  },
  articleDuration: {
    fontSize: 12,
    color: '#6B7280',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5A8F',
  },
  tipsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  tipCard: {
    backgroundColor: '#FFFBEB',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    alignItems: 'center',
  },
  tipEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 10,
    textAlign: 'center',
  },
  tipText: {
    fontSize: 14,
    color: '#78350F',
    lineHeight: 21,
    textAlign: 'center',
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
  },
  achievementTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 8,
  },
  achievementText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 21,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#8B5A8F',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  modalTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 12,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webView: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

