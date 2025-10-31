import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Platform } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { getCycleDay, getCurrentHormonalPhase, themes } from '@/services/ThemeService';
import { useRouter } from 'expo-router';
import { ArrowLeft, Brain, Heart, Sparkles, Moon, Wind, Play, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
// @ts-ignore: Only used on native
import { WebView } from 'react-native-webview';

export default function MindScreen() {
  const { profile } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'meditation' | 'breathwork' | 'affirmations'>('meditation');
  
  const phaseKey: 'Menstrual'|'Follicular'|'Ovulation'|'Luteal' = useMemo(() => {
    if (!profile.lastPeriodDate) return 'Follicular';
    return getCurrentHormonalPhase(getCycleDay(profile.lastPeriodDate));
  }, [profile.lastPeriodDate]);
  
  const theme = themes[phaseKey];
  const [player, setPlayer] = useState<{ id: string; type: 'video' | 'audio' } | null>(null);

  // Phase-specific mindfulness content
  const mindfulnessContent = {
    Menstrual: {
      meditation: {
        title: 'Restorative Deep Rest',
        description: 'Gentle guided meditation for recovery and self-compassion',
        duration: '15 min',
        focus: 'Compassion & Rest',
        practices: [
          { name: 'Body Scan for Comfort', duration: '10 min', focus: 'Pain relief and relaxation', videoUrl: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
          { name: 'Self-Compassion Meditation', duration: '12 min', focus: 'Kindness to yourself', videoUrl: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
          { name: 'Restorative Yoga Nidra', duration: '20 min', focus: 'Deep rest and healing', videoUrl: 'https://www.youtube.com/watch?v=inpok4MKVLM' },
        ],
        videoUrl: 'https://www.youtube.com/watch?v=inpok4MKVLM',
      },
      breathwork: {
        title: 'Calming Breath',
        description: 'Slow, deep breathing to ease discomfort and promote relaxation',
        techniques: [
          { name: '4-7-8 Breathing', steps: 'Inhale 4, Hold 7, Exhale 8', benefit: 'Reduces cramps and tension' },
          { name: 'Belly Breathing', steps: 'Deep diaphragmatic breathing', benefit: 'Calms nervous system' },
          { name: 'Alternate Nostril', steps: 'Nadi Shodhana pranayama', benefit: 'Balances hormones' },
        ],
      },
      affirmations: [
        'My body is strong and healing itself with every breath.',
        'I honor my need for rest and self-care.',
        'This discomfort is temporary, and I am supported.',
        'I give myself permission to slow down and restore.',
      ],
    },
    Follicular: {
      meditation: {
        title: 'Energizing Morning Flow',
        description: 'Dynamic meditation to boost creativity and rising energy',
        duration: '12 min',
        focus: 'Energy & Creativity',
        practices: [
          { name: 'Moving Meditation Walk', duration: '15 min', focus: 'Energy activation', videoUrl: 'https://www.youtube.com/watch?v=z6X5oEIg6Ak' },
          { name: 'Creative Visualization', duration: '10 min', focus: 'Goal setting and vision', videoUrl: 'https://www.youtube.com/watch?v=z6X5oEIg6Ak' },
          { name: 'Mindful Movement Flow', duration: '20 min', focus: 'Body-mind connection', videoUrl: 'https://www.youtube.com/watch?v=z6X5oEIg6Ak' },
        ],
        videoUrl: 'https://www.youtube.com/watch?v=z6X5oEIg6Ak',
      },
      breathwork: {
        title: 'Energizing Breath',
        description: 'Active breathing techniques to amplify rising energy',
        techniques: [
          { name: 'Kapalabhati (Breath of Fire)', steps: 'Rapid, forceful exhalations', benefit: 'Increases energy and alertness' },
          { name: 'Box Breathing', steps: '4-4-4-4 equal count breathing', benefit: 'Focus and clarity' },
          { name: 'Breath Hold Practice', steps: 'Inhale, hold, exhale cycles', benefit: 'Boosts vitality' },
        ],
      },
      affirmations: [
        'My energy is rising, and I am ready for new beginnings.',
        'I am creative, capable, and full of potential.',
        'I welcome the growth and opportunities this phase brings.',
        'I am building strength, inside and out.',
      ],
    },
    Ovulation: {
      meditation: {
        title: 'Peak Presence & Clarity',
        description: 'Mindful practices for maximum performance and confidence',
        duration: '10 min',
        focus: 'Clarity & Confidence',
        practices: [
          { name: 'Power Visualization', duration: '8 min', focus: 'Peak performance mindset', videoUrl: 'https://www.youtube.com/watch?v=U9YKY7fdwyg' },
          { name: 'Focused Attention Meditation', duration: '15 min', focus: 'Mental sharpness', videoUrl: 'https://www.youtube.com/watch?v=U9YKY7fdwyg' },
          { name: 'Confidence Building Practice', duration: '12 min', focus: 'Self-assurance', videoUrl: 'https://www.youtube.com/watch?v=U9YKY7fdwyg' },
        ],
        videoUrl: 'https://www.youtube.com/watch?v=U9YKY7fdwyg',
      },
      breathwork: {
        title: 'Peak Performance Breath',
        description: 'Oxygenating techniques for peak mental and physical performance',
        techniques: [
          { name: 'Wim Hof Breathing', steps: 'Deep inhales, relaxed exhales', benefit: 'Increases energy and focus' },
          { name: 'Victorious Breath (Ujjayi)', steps: 'Ocean-sound breathing', benefit: 'Mental clarity' },
          { name: 'Tummo Breathing', steps: 'Inner fire breath practice', benefit: 'Peak vitality' },
        ],
      },
      affirmations: [
        'I am at my peak—strong, clear, and radiant.',
        'I trust my intuition and make confident decisions.',
        'I am magnetic, confident, and fully present.',
        'I embrace my power and shine my brightest.',
      ],
    },
    Luteal: {
      meditation: {
        title: 'Calming & Grounding',
        description: 'Soothing practices to support mood stability and preparation',
        duration: '18 min',
        focus: 'Calm & Stability',
        practices: [
          { name: 'Loving-Kindness Meditation', duration: '15 min', focus: 'Self-compassion and emotional balance', videoUrl: 'https://www.youtube.com/watch?v=it4MfjpB0fY' },
          { name: 'Grounding Body Scan', duration: '20 min', focus: 'Anxiety reduction', videoUrl: 'https://www.youtube.com/watch?v=it4MfjpB0fY' },
          { name: 'Restorative Practice', duration: '25 min', focus: 'Preparing for rest', videoUrl: 'https://www.youtube.com/watch?v=it4MfjpB0fY' },
        ],
        videoUrl: 'https://www.youtube.com/watch?v=it4MfjpB0fY',
      },
      breathwork: {
        title: 'Calming & Balancing Breath',
        description: 'Gentle techniques to soothe PMS symptoms and ease tension',
        techniques: [
          { name: 'Extended Exhale', steps: 'Exhale longer than inhale', benefit: 'Activates relaxation response' },
          { name: 'Cooling Breath (Sitali)', steps: 'Inhale through curled tongue', benefit: 'Cools body and calms mind' },
          { name: 'Progressive Relaxation Breath', steps: 'Breath with muscle release', benefit: 'Reduces PMS tension' },
        ],
      },
      affirmations: [
        'I am gentle with myself as my body prepares for change.',
        'I honor my feelings and give myself space to process.',
        'I trust my body\'s wisdom and take care of my needs.',
        'I am supported, grounded, and at peace.',
      ],
    },
  };

  const content = mindfulnessContent[phaseKey];

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface }]} showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => { try { router.back(); } catch { router.replace('/(tabs)'); } }}>
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.pageTitle}>Mind & Mindfulness 🧘</Text>
        <Text style={styles.pageSubtitle}>Phase-specific practices for mental wellness</Text>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabRow}>
        {(['meditation', 'breathwork', 'affirmations'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabChip,
              activeTab === tab && { backgroundColor: theme.accentColor },
              activeTab !== tab && { borderColor: theme.border }
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.tabChipText,
              activeTab === tab && { color: '#FFFFFF' },
              activeTab !== tab && { color: '#111827' }
            ]}>
              {tab === 'meditation' ? 'Meditation' : tab === 'breathwork' ? 'Breathwork' : 'Affirmations'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Phase Banner */}
      <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.phaseBanner}>
        <Text style={styles.phaseBadge}>{phaseKey} Phase</Text>
        <Text style={styles.phaseTitle}>{content.meditation.title}</Text>
        <Text style={styles.phaseDesc}>{content.meditation.description}</Text>
      </LinearGradient>

      {/* Meditation Tab */}
      {activeTab === 'meditation' && (
        <View style={styles.contentSection}>
          <View style={styles.meditationCard}>
            <View style={styles.cardHeader}>
              <Brain color={theme.accentColor} size={20} />
              <Text style={styles.sectionTitle}>Guided Practices</Text>
            </View>
            <Text style={styles.focusText}>Focus: {content.meditation.focus}</Text>
            
            {content.meditation.practices.map((practice, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.practiceCard, { borderColor: theme.border }]}
                onPress={() => {
                  const videoUrl = practice.videoUrl || content.meditation.videoUrl;
                  if (videoUrl) {
                    const videoId = extractVideoId(videoUrl);
                    if (videoId) setPlayer({ id: videoId, type: 'video' });
                  }
                }}
              >
                <View style={styles.practiceInfo}>
                  <Text style={styles.practiceName}>{practice.name}</Text>
                  <Text style={styles.practiceMeta}>⏱ {practice.duration} • {practice.focus}</Text>
                </View>
                <Play color={theme.accentColor} size={20} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Breathwork Tab */}
      {activeTab === 'breathwork' && (
        <View style={styles.contentSection}>
          <View style={styles.breathworkCard}>
            <View style={styles.cardHeader}>
              <Wind color={theme.accentColor} size={20} />
              <Text style={styles.sectionTitle}>Breathing Techniques</Text>
            </View>
            <Text style={styles.breathworkSubtitle}>{content.breathwork.title}</Text>
            <Text style={styles.breathworkDesc}>{content.breathwork.description}</Text>
            
            {content.breathwork.techniques.map((technique, index) => (
              <View key={index} style={[styles.techniqueCard, { borderColor: theme.border, backgroundColor: theme.surface }]}>
                <Text style={styles.techniqueName}>{technique.name}</Text>
                <View style={styles.techniqueSteps}>
                  <Text style={styles.stepLabel}>Steps:</Text>
                  <Text style={styles.stepText}>{technique.steps}</Text>
                </View>
                <View style={styles.techniqueBenefit}>
                  <Sparkles color={theme.accentColor} size={14} />
                  <Text style={styles.benefitText}>{technique.benefit}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Affirmations Tab */}
      {activeTab === 'affirmations' && (
        <View style={styles.contentSection}>
          <View style={styles.affirmationsCard}>
            <View style={styles.cardHeader}>
              <Heart color={theme.accentColor} size={20} />
              <Text style={styles.sectionTitle}>Daily Affirmations</Text>
            </View>
            <Text style={styles.affirmationsSubtitle}>Repeat these {phaseKey} phase affirmations daily</Text>
            
            {content.affirmations.map((affirmation, index) => (
              <View key={index} style={[styles.affirmationCard, { borderColor: theme.border }]}>
                <Text style={styles.affirmationText}>{affirmation}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={{ height: 40 }} />

      {/* Video Player Modal */}
      <Modal visible={!!player} transparent animationType="fade" onRequestClose={() => setPlayer(null)}>
        <View style={styles.videoModalOverlay}>
          <View style={styles.videoModalCard}>
            <View style={styles.videoHeader}>
              <Text style={styles.videoTitle}>Meditation Practice</Text>
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
  topBar: { paddingHorizontal: 16, paddingTop: 16 },
  header: { paddingHorizontal: 20, marginTop: 8, marginBottom: 20 },
  pageTitle: { fontSize: 28, fontWeight: '700', color: '#111827', marginBottom: 6 },
  pageSubtitle: { fontSize: 14, color: '#6B7280' },
  tabRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginBottom: 20 },
  tabChip: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: 20, borderWidth: 1 },
  tabChipText: { fontSize: 13, fontWeight: '700' },
  phaseBanner: { marginHorizontal: 20, borderRadius: 16, padding: 20, marginBottom: 24 },
  phaseBadge: { fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.9)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
  phaseTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF', marginBottom: 6 },
  phaseDesc: { fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 20 },
  contentSection: { paddingHorizontal: 20, marginBottom: 24 },
  meditationCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#E5E7EB' },
  breathworkCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#E5E7EB' },
  affirmationsCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#E5E7EB' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  focusText: { fontSize: 13, color: '#6B7280', marginBottom: 16, fontStyle: 'italic' },
  practiceCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 12, backgroundColor: '#F9FAFB' },
  practiceInfo: { flex: 1 },
  practiceName: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 4 },
  practiceMeta: { fontSize: 12, color: '#6B7280' },
  breathworkSubtitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 8 },
  breathworkDesc: { fontSize: 13, color: '#6B7280', marginBottom: 16, lineHeight: 20 },
  techniqueCard: { padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 12 },
  techniqueName: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 8 },
  techniqueSteps: { marginBottom: 8 },
  stepLabel: { fontSize: 12, fontWeight: '700', color: '#6B7280', marginBottom: 4 },
  stepText: { fontSize: 13, color: '#374151', lineHeight: 20 },
  techniqueBenefit: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  benefitText: { fontSize: 12, color: '#6B7280', fontStyle: 'italic' },
  affirmationsSubtitle: { fontSize: 13, color: '#6B7280', marginBottom: 16, textAlign: 'center' },
  affirmationCard: { padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 12, backgroundColor: '#F9FAFB' },
  affirmationText: { fontSize: 15, color: '#374151', lineHeight: 24, fontStyle: 'italic' },
  videoModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center', alignItems: 'center' },
  videoModalCard: { width: '100%', height: '100%', backgroundColor: '#000', justifyContent: 'center' },
  videoHeader: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 56, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)' },
  videoTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  closeVideoBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  videoContainer: { flex: 1, width: '100%' },
  videoWebView: { flex: 1, width: '100%', backgroundColor: '#000' },
});

