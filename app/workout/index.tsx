import { View, Text, StyleSheet, TouchableOpacity, Animated, Image, ActivityIndicator, Modal, Platform, ScrollView, Dimensions } from 'react-native';
// @ts-ignore: Only used on native
import { WebView } from 'react-native-webview';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { getCycleDay, getCurrentHormonalPhase, themes } from '@/services/ThemeService';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ArrowLeft, Play, BookOpen, History, Timer, X, Camera, Image as ImageIcon } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function WorkoutScreen() {
  const { profile } = useUser();
  const router = useRouter();
  const phaseKey: 'Menstrual'|'Follicular'|'Ovulation'|'Luteal' = useMemo(() => {
    if (!profile.lastPeriodDate) return 'Follicular';
    const day = getCycleDay(profile.lastPeriodDate);
    return getCurrentHormonalPhase(day);
  }, [profile.lastPeriodDate]);

  const theme = themes[phaseKey];
  
  // Weekly streak tracking
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(42); // Mock
  const [totalMinutes, setTotalMinutes] = useState(850); // Mock
  
  useEffect(() => {
    (async () => {
      const today = new Date();
      const dates: Date[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        dates.push(d);
      }
      const keys: string[] = [];
      dates.forEach(d => {
        const y = d.getFullYear(); const m = d.getMonth() + 1; const day = d.getDate();
        keys.push(`@workout_done:${y}-${m}-${day}`);
      });
      let count = 0;
      try {
        const results = await AsyncStorage.multiGet(keys);
        count = results.filter(r => !!r[1]).length;
      } catch {}
      setWeeklyCount(count);
    })();
  }, []);

  // Video thumbnail fetching
  const YT_API_KEY = 'AIzaSyBvQcLcPhoGKqhh6bRKnGHQ4By7O6ZaMjw';
  const [videoThumb, setVideoThumb] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [player, setPlayer] = useState<{ id: string; type: 'video'|'playlist' } | null>(null);
  const [loadingThumb, setLoadingThumb] = useState(true);

  function extractVideoId(u: string): string | null {
    try {
      const urlObj = new URL(u);
      // Handle playlist URLs
      const listId = urlObj.searchParams.get('list');
      if (listId) return listId;
      // Handle regular video URLs
      const v = urlObj.searchParams.get('v');
      if (v) return v;
      // Handle youtu.be short URLs
      if (urlObj.hostname.includes('youtu.be')) {
        return urlObj.pathname.replace('/', '');
      }
    } catch {}
    return null;
  }

  useEffect(() => {
    if (!theme.workoutVideoURL) return;
    const videoId = extractVideoId(theme.workoutVideoURL);
    if (!videoId) return;
    
    (async () => {
      try {
        const resp = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YT_API_KEY}`);
        const data = await resp.json();
        const s = data?.items?.[0]?.snippet;
        if (s) {
          setVideoThumb(s.thumbnails?.high?.url || s.thumbnails?.medium?.url);
          setVideoTitle(s.title);
        }
      } catch {}
      finally { setLoadingThumb(false); }
    })();
  }, [theme.workoutVideoURL]);

  // Fetch Yoga video thumbnail
  useEffect(() => {
    if (!theme.yogaVideoURL) {
      setLoadingYogaThumb(false);
      return;
    }
    const videoId = extractVideoId(theme.yogaVideoURL);
    if (!videoId) {
      setLoadingYogaThumb(false);
      return;
    }
    
    setLoadingYogaThumb(true);
    (async () => {
      try {
        const resp = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YT_API_KEY}`);
        const data = await resp.json();
        const s = data?.items?.[0]?.snippet;
        if (s) {
          setYogaThumb(s.thumbnails?.high?.url || s.thumbnails?.medium?.url || s.thumbnails?.default?.url);
          setYogaTitle(s.title || 'Yoga Video');
        }
      } catch (err) {
        console.log('Yoga thumbnail fetch error:', err);
      }
      finally { setLoadingYogaThumb(false); }
    })();
  }, [theme.yogaVideoURL]);

  // Fetch Dance video thumbnail
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

  // Filter chips
  const [activeFilter, setActiveFilter] = useState('Full Body');
  const filters = ['Full Body', 'Upper Body Core', 'Dumbbells', 'Bands', 'Quick', 'Medium', 'Long'];
  
  // Exercise Library & Workout History
  const [showExerciseLibrary, setShowExerciseLibrary] = useState(false);
  const [showWorkoutHistory, setShowWorkoutHistory] = useState(false);
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [showProgressPhotos, setShowProgressPhotos] = useState(false);
  const [restSeconds, setRestSeconds] = useState(60);
  const [workoutHistory, setWorkoutHistory] = useState<{date: string; workout: string; duration: number}[]>([]);
  const [progressPhotos, setProgressPhotos] = useState<{id: string; date: string; notes?: string}[]>([]);
  // Determine default section based on phase
  const getDefaultSection = (phase: 'Menstrual'|'Follicular'|'Ovulation'|'Luteal'): 'workout' | 'yoga' | 'dance' => {
    switch (phase) {
      case 'Menstrual':
        return 'yoga'; // Only Yoga available
      case 'Follicular':
        return 'workout'; // Exercise and Dance available
      case 'Ovulation':
        return 'dance'; // Exercise and Dance available
      case 'Luteal':
        return 'yoga'; // Only Yoga available
      default:
        return 'workout';
    }
  };
  
  // Get available sections for current phase
  const getAvailableSections = (phase: 'Menstrual'|'Follicular'|'Ovulation'|'Luteal'): ('workout' | 'yoga' | 'dance')[] => {
    switch (phase) {
      case 'Menstrual':
      case 'Luteal':
        return ['yoga']; // Only Yoga
      case 'Follicular':
      case 'Ovulation':
        return ['workout', 'dance']; // Exercise and Dance
      default:
        return ['workout', 'yoga', 'dance'];
    }
  };
  
  const [activeSection, setActiveSection] = useState<'workout' | 'yoga' | 'dance'>(() => getDefaultSection(phaseKey));
  
  // Update section when phase changes
  useEffect(() => {
    setActiveSection(getDefaultSection(phaseKey));
  }, [phaseKey]);
  
  // Yoga and Dance video thumbnails
  const [yogaThumb, setYogaThumb] = useState<string | null>(null);
  const [yogaTitle, setYogaTitle] = useState<string>('');
  const [danceThumb, setDanceThumb] = useState<string | null>(null);
  const [danceTitle, setDanceTitle] = useState<string>('');
  const [loadingYogaThumb, setLoadingYogaThumb] = useState(true);
  const [loadingDanceThumb, setLoadingDanceThumb] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const history = await AsyncStorage.getItem('@workout_history');
        const photos = await AsyncStorage.getItem('@progress_photos');
        if (history) setWorkoutHistory(JSON.parse(history));
        if (photos) setProgressPhotos(JSON.parse(photos));
      } catch {}
    })();
  }, []);

  const addProgressPhoto = async () => {
    // In a real app, this would use expo-image-picker to capture/select photos
    // For now, we'll just add a placeholder entry
    const newPhoto = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      notes: `Progress photo - ${phaseKey} phase`,
    };
    const updated = [newPhoto, ...progressPhotos].slice(0, 50); // Keep last 50
    setProgressPhotos(updated);
    await AsyncStorage.setItem('@progress_photos', JSON.stringify(updated));
  };

  // Comprehensive Exercise library data (phase-filtered)
  const exerciseLibrary = {
    Menstrual: [
      { name: 'Gentle Yoga Flow', muscles: 'Full Body', equipment: 'Bodyweight', duration: '20 min', difficulty: 'Beginner', calories: 80, description: 'Restorative poses to ease discomfort' },
      { name: 'Stretching Routine', muscles: 'Full Body', equipment: 'Bodyweight', duration: '15 min', difficulty: 'Beginner', calories: 60, description: 'Light stretching for recovery' },
      { name: 'Walking Meditation', muscles: 'Cardio', equipment: 'None', duration: '30 min', difficulty: 'Beginner', calories: 120, description: 'Gentle walking for blood flow' },
      { name: 'Restorative Pilates', muscles: 'Core', equipment: 'Bodyweight', duration: '20 min', difficulty: 'Beginner', calories: 70, description: 'Low-impact core strengthening' },
      { name: 'Breathing Exercises', muscles: 'Mind-Body', equipment: 'None', duration: '10 min', difficulty: 'Beginner', calories: 20, description: 'Calming breathwork for relaxation' },
    ],
    Follicular: [
      { name: 'Full Body Strength', muscles: 'Full Body', equipment: 'Dumbbells', duration: '30 min', difficulty: 'Intermediate', calories: 280, description: 'Build muscle with rising energy' },
      { name: 'HIIT Cardio Blast', muscles: 'Cardio', equipment: 'Bodyweight', duration: '25 min', difficulty: 'Intermediate', calories: 320, description: 'High-intensity intervals' },
      { name: 'Upper Body & Core', muscles: 'Upper Body', equipment: 'Bands', duration: '20 min', difficulty: 'Intermediate', calories: 200, description: 'Toned arms and core' },
      { name: 'Power Yoga Flow', muscles: 'Full Body', equipment: 'Yoga Mat', duration: '35 min', difficulty: 'Intermediate', calories: 250, description: 'Dynamic yoga sequences' },
      { name: 'Circuit Training', muscles: 'Full Body', equipment: 'Dumbbells', duration: '28 min', difficulty: 'Intermediate', calories: 300, description: 'Full-body circuit workout' },
    ],
    Ovulation: [
      { name: 'High-Intensity Power', muscles: 'Full Body', equipment: 'Dumbbells', duration: '25 min', difficulty: 'Advanced', calories: 380, description: 'Maximum strength training' },
      { name: 'Explosive Cardio', muscles: 'Cardio', equipment: 'Bodyweight', duration: '30 min', difficulty: 'Advanced', calories: 400, description: 'Peak performance cardio' },
      { name: 'Strength & Conditioning', muscles: 'Full Body', equipment: 'Dumbbells', duration: '35 min', difficulty: 'Advanced', calories: 420, description: 'Build power and endurance' },
      { name: 'Athletic Performance', muscles: 'Full Body', equipment: 'Bands', duration: '28 min', difficulty: 'Advanced', calories: 350, description: 'Peak performance training' },
      { name: 'HIIT Power Intervals', muscles: 'Cardio', equipment: 'Bodyweight', duration: '32 min', difficulty: 'Advanced', calories: 450, description: 'Maximum intensity intervals' },
    ],
    Luteal: [
      { name: 'Yin Yoga Deep Stretch', muscles: 'Full Body', equipment: 'Yoga Mat', duration: '35 min', difficulty: 'Beginner', calories: 100, description: 'Deep stretches for recovery' },
      { name: 'Gentle Pilates Flow', muscles: 'Core', equipment: 'Bodyweight', duration: '25 min', difficulty: 'Beginner', calories: 120, description: 'Restorative core work' },
      { name: 'Moderate Walking', muscles: 'Cardio', equipment: 'None', duration: '30 min', difficulty: 'Beginner', calories: 150, description: 'Light cardio for energy' },
      { name: 'Restorative Yoga', muscles: 'Full Body', equipment: 'Yoga Mat', duration: '30 min', difficulty: 'Beginner', calories: 90, description: 'Calming yoga practice' },
      { name: 'Flexibility & Mobility', muscles: 'Full Body', equipment: 'Foam Roller', duration: '20 min', difficulty: 'Beginner', calories: 70, description: 'Improve flexibility' },
    ],
  };

  // Comprehensive workout programs by phase with YouTube videos
  const workoutPrograms = {
    Menstrual: [
      { id: 'm1', title: '30 Min PMS/Period Friendly Pilates', duration: '7 days', focus: 'Recovery & Self-Care', workouts: 7, completed: 0, videoUrl: 'https://www.youtube.com/watch?v=mfG0p1sv9OI' },
      { id: 'm2', title: 'Menstrual Phase Workout - Cycle Syncing', duration: '5 days', focus: 'Gentle Movement', workouts: 5, completed: 0, videoUrl: 'https://www.youtube.com/watch?v=MBzHxuw9XUw' },
    ],
    Follicular: [
      { id: 'f1', title: 'Exercise At Each Stage of Cycle', duration: '14 days', focus: 'Muscle Building', workouts: 12, completed: 0, videoUrl: 'https://www.youtube.com/watch?v=YSJubcbzJmo' },
      { id: 'f2', title: 'Feminine Energy Dance Workout', duration: '7 days', focus: 'Cardio & Strength', workouts: 7, completed: 0, videoUrl: 'https://www.youtube.com/watch?v=GQd6yeQ4-sI' },
      { id: 'f3', title: 'Workouts For Your Cycle: Day 1-14', duration: '7 days', focus: 'Energy Building', workouts: 7, completed: 0, videoUrl: 'https://www.youtube.com/playlist?list=PLG9XM5PzrT1ddTYRCBLiGcEpxfw-S-imv' },
    ],
    Ovulation: [
      { id: 'o1', title: 'Workout & Eat According to Cycle', duration: '5 days', focus: 'Maximum Power', workouts: 5, completed: 0, videoUrl: 'https://www.youtube.com/watch?v=PBd2CZC-JIE' },
      { id: 'o2', title: '20 Min Bollywood Dance Marathon', duration: '7 days', focus: 'Advanced Conditioning', workouts: 7, completed: 0, videoUrl: 'https://www.youtube.com/watch?v=9EaLMMz2KsE' },
      { id: 'o3', title: 'Dealing With Periods as a Dancer', duration: '5 days', focus: 'Peak Performance', workouts: 5, completed: 0, videoUrl: 'https://www.youtube.com/watch?v=Mit_wg8bkXc' },
    ],
    Luteal: [
      { id: 'l1', title: 'Luteal Phase Yoga - Nourish & Calm', duration: '10 days', focus: 'Recovery', workouts: 8, completed: 0, videoUrl: 'https://www.youtube.com/watch?v=Df4XI5VEKFg' },
      { id: 'l2', title: 'Luteal Phase Workout - Cycle Syncing', duration: '7 days', focus: 'Moderate Movement', workouts: 5, completed: 0, videoUrl: 'https://www.youtube.com/watch?v=AhKQdriZJMI' },
      { id: 'l3', title: 'Yoga for Cramps and PMS', duration: '7 days', focus: 'Calming Movement', workouts: 5, completed: 0, videoUrl: 'https://www.youtube.com/watch?v=4JaCcp39iVI' },
    ],
  };

  const currentExercises = exerciseLibrary[phaseKey] || exerciseLibrary.Follicular;

  const handlePlay = () => {
    if (theme.workoutVideoURL) {
      const videoId = extractVideoId(theme.workoutVideoURL);
      if (videoId) {
        const isPlaylist = theme.workoutVideoURL.includes('playlist?list=');
        setPlayerTitle(videoTitle || 'Exercise Video');
        setPlayer({ id: videoId, type: isPlaylist ? 'playlist' : 'video' });
      }
    }
  };

  const [playerTitle, setPlayerTitle] = useState<string>('Exercise Video');

  const handlePlayYoga = () => {
    if (theme.yogaVideoURL) {
      const videoId = extractVideoId(theme.yogaVideoURL);
      if (videoId) {
        setPlayerTitle(yogaTitle || 'Yoga Video');
        setPlayer({ id: videoId, type: 'video' });
      }
    }
  };

  const handlePlayDance = () => {
    if (theme.danceVideoURL) {
      const videoId = extractVideoId(theme.danceVideoURL);
      if (videoId) {
        setPlayerTitle(danceTitle || 'Dance Video');
        setPlayer({ id: videoId, type: 'video' });
      }
    }
  };

  const markWorkoutDone = async () => {
    const d = new Date();
    const key = `@workout_done:${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
    try { 
      await AsyncStorage.setItem(key, '1');
      // Save to workout history
      const historyEntry = {
        date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        workout: theme.workoutRecommendation,
        duration: parseInt(theme.workoutTime) || 30,
      };
      const updatedHistory = [historyEntry, ...workoutHistory].slice(0, 30); // Keep last 30
      setWorkoutHistory(updatedHistory);
      await AsyncStorage.setItem('@workout_history', JSON.stringify(updatedHistory));
    } catch {}
    setWeeklyCount(prev => Math.min(prev + 1, 7));
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface }]} showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => { try { router.back(); } catch { router.replace('/(tabs)'); } }}>
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
      </View>

      <Text style={styles.pageTitle}>Exercise with your cycle 💪</Text>

      {/* Phase-based Section Recommendation */}
      <View style={[styles.recommendationBanner, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Text style={[styles.recommendationText, { color: theme.accentColor }]}>
          {phaseKey === 'Menstrual' && '🧘 Most Demanding Activity: Gentle Yoga'}
          {phaseKey === 'Follicular' && '💪 Most Demanding Activity: Workout (Strength + Cardio)'}
          {phaseKey === 'Ovulation' && '💃 Most Demanding Activity: Dance + High-Intensity Workout'}
          {phaseKey === 'Luteal' && '🧘 Most Demanding Activity: Yoga + Low-Impact Workouts'}
        </Text>
      </View>

      {/* Section Tabs */}
      {getAvailableSections(phaseKey).length > 1 && (
        <View style={styles.sectionTabs}>
          {getAvailableSections(phaseKey).includes('workout') && (
            <TouchableOpacity
              style={[styles.sectionTab, activeSection === 'workout' && { backgroundColor: theme.accentColor }]}
              onPress={() => setActiveSection('workout')}
            >
              <Text style={[styles.sectionTabText, activeSection === 'workout' && styles.sectionTabTextActive]}>
                Exercise
              </Text>
            </TouchableOpacity>
          )}
          {getAvailableSections(phaseKey).includes('yoga') && (
            <TouchableOpacity
              style={[styles.sectionTab, activeSection === 'yoga' && { backgroundColor: theme.accentColor }]}
              onPress={() => setActiveSection('yoga')}
            >
              <Text style={[styles.sectionTabText, activeSection === 'yoga' && styles.sectionTabTextActive]}>
                Yoga
              </Text>
            </TouchableOpacity>
          )}
          {getAvailableSections(phaseKey).includes('dance') && (
            <TouchableOpacity
              style={[styles.sectionTab, activeSection === 'dance' && { backgroundColor: theme.accentColor }]}
              onPress={() => setActiveSection('dance')}
            >
              <Text style={[styles.sectionTabText, activeSection === 'dance' && styles.sectionTabTextActive]}>
                Dance
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Workout Section */}
      {activeSection === 'workout' && (phaseKey === 'Follicular' || phaseKey === 'Ovulation') && (
        <>
      {/* Why Section - Workout */}
      <View style={[styles.whyBanner, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Text style={[styles.whyTitle, { color: theme.accentColor }]}>Why Exercise?</Text>
        <Text style={styles.whyText}>
          {phaseKey === 'Follicular' && 'Rising estrogen boosts energy and muscle recovery, making this phase best for building strength and aerobic conditioning. Dance and yoga can be moderate.'}
          {phaseKey === 'Ovulation' && 'Peak strength, coordination, and mood create ideal conditions for skill-based dance and intense interval training. Yoga can support with power and balance but is less dominant.'}
        </Text>
      </View>

      {/* Hero Video Card */}
      <View style={[styles.videoCard, { borderColor: theme.border }]}>
        {loadingThumb ? (
          <View style={styles.videoPlaceholder}>
            <ActivityIndicator color={theme.accentColor} size="large" />
          </View>
        ) : videoThumb ? (
          <Image source={{ uri: videoThumb }} style={styles.videoThumbnail} />
        ) : (
          <View style={styles.videoPlaceholder}>
            <Text style={styles.placeholderText}>Exercise Video</Text>
          </View>
        )}
        
        {/* Phase Badge */}
        <View style={[styles.phaseBadge, { backgroundColor: 'rgba(0,0,0,0.7)' }]}>
          <Text style={styles.phaseBadgeText}>{phaseKey} Phase</Text>
          <Text style={styles.phaseBadgeMeta}>{theme.workoutTime} | {theme.workoutLevel}</Text>
        </View>

        {/* Large Play Button */}
        <TouchableOpacity style={[styles.playBtn, { backgroundColor: theme.accentColor }]} onPress={handlePlay}>
          <Play color="#FFFFFF" size={32} fill="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Workout Details */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <Text style={styles.workoutTitle}>{theme.workoutRecommendation}</Text>
        <Text style={styles.workoutDesc}>{theme.workoutDetails}</Text>
        {videoTitle && (
          <View style={[styles.videoInfoCard, { borderColor: theme.border, backgroundColor: theme.surface }]}>
            <Text style={styles.videoInfoText}>📹 {videoTitle}</Text>
          </View>
        )}
      </View>


      </>
      )}

      {/* Yoga Section */}
      {(activeSection === 'yoga' || phaseKey === 'Menstrual' || phaseKey === 'Luteal') && (
        <View style={styles.videoOnlySection}>
          {/* Why Section - Yoga */}
          <View style={[styles.whyBanner, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={[styles.whyTitle, { color: theme.accentColor }]}>Why Yoga?</Text>
            <Text style={styles.whyText}>
              {phaseKey === 'Menstrual' && 'The body needs relaxation, pain relief, and grounding. Yoga\'s emphasis on breath and mindful movement supports this phase best. Workouts and dance should be minimal or restorative.'}
              {phaseKey === 'Luteal' && 'Progesterone causes fatigue and higher body temperature, favoring calming, restorative yoga and gentle workouts with limited intensity. Dance demand is lighter here.'}
            </Text>
          </View>
          {/* First Yoga Video */}
          <View style={[styles.videoCard, { borderColor: theme.border }]}>
            {loadingYogaThumb ? (
              <View style={styles.videoPlaceholder}>
                <ActivityIndicator color={theme.accentColor} size="large" />
              </View>
            ) : yogaThumb ? (
              <Image source={{ uri: yogaThumb }} style={styles.videoThumbnail} />
            ) : (
              <View style={styles.videoPlaceholder}>
                <Text style={styles.placeholderText}>Yoga Video</Text>
              </View>
            )}
            
            <View style={[styles.phaseBadge, { backgroundColor: 'rgba(0,0,0,0.7)' }]}>
              <Text style={styles.phaseBadgeText}>{phaseKey} Phase • Yoga</Text>
            </View>

            <TouchableOpacity style={[styles.playBtn, { backgroundColor: theme.accentColor }]} onPress={handlePlayYoga}>
              <Play color="#FFFFFF" size={32} fill="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          {yogaTitle && (
            <View style={[styles.videoInfoCard, { borderColor: theme.border, backgroundColor: theme.surface, marginHorizontal: 20 }]}>
              <Text style={styles.videoInfoText}>🧘 {yogaTitle}</Text>
            </View>
          )}
        </View>
      )}

      {/* Dance Section */}
      {activeSection === 'dance' && (phaseKey === 'Follicular' || phaseKey === 'Ovulation') && (
        <View style={styles.videoOnlySection}>
          {/* Why Section - Dance */}
          <View style={[styles.whyBanner, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={[styles.whyTitle, { color: theme.accentColor }]}>Why Dance?</Text>
            <Text style={styles.whyText}>
              {phaseKey === 'Follicular' && 'Rising estrogen boosts energy and muscle recovery. Dance can be moderate during this phase, supporting strength building alongside workouts.'}
              {phaseKey === 'Ovulation' && 'Peak strength, coordination, and mood create ideal conditions for skill-based dance and intense interval training. This is your peak performance phase.'}
            </Text>
          </View>
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
        </View>
      )}

      {/* Exercise Library Modal */}
      <Modal visible={showExerciseLibrary} transparent animationType="slide" onRequestClose={() => setShowExerciseLibrary(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Exercise Library</Text>
              <TouchableOpacity onPress={() => setShowExerciseLibrary(false)}>
                <X color="#111827" size={24} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubtitle}>Phase-specific exercises for {phaseKey}</Text>
            <ScrollView style={styles.exerciseList} showsVerticalScrollIndicator={false}>
              {currentExercises.map((ex, i) => (
                <TouchableOpacity key={i} style={[styles.exerciseCard, { borderColor: theme.border }]}>
                  <View style={styles.exerciseInfo}>
                    <Text style={styles.exerciseName}>{ex.name}</Text>
                    <Text style={styles.exerciseDesc}>{ex.description}</Text>
                    <View style={styles.exerciseTags}>
                      <View style={[styles.exerciseTag, { backgroundColor: theme.surface }]}>
                        <Text style={[styles.exerciseTagText, { color: theme.accentColor }]}>{ex.muscles}</Text>
                      </View>
                      <View style={[styles.exerciseTag, { backgroundColor: theme.surface }]}>
                        <Text style={[styles.exerciseTagText, { color: theme.accentColor }]}>{ex.equipment}</Text>
                      </View>
                      <View style={[styles.exerciseTag, { backgroundColor: theme.surface }]}>
                        <Text style={[styles.exerciseTagText, { color: theme.accentColor }]}>{ex.difficulty}</Text>
                      </View>
                    </View>
                    <View style={styles.exerciseMeta}>
                      <Text style={styles.exerciseDuration}>⏱ {ex.duration}</Text>
                      <Text style={styles.exerciseCalories}>🔥 {ex.calories || 0} kcal</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Workout History Modal */}
      <Modal visible={showWorkoutHistory} transparent animationType="slide" onRequestClose={() => setShowWorkoutHistory(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Workout History</Text>
              <TouchableOpacity onPress={() => setShowWorkoutHistory(false)}>
                <X color="#111827" size={24} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.historyList} showsVerticalScrollIndicator={false}>
              {workoutHistory.length === 0 ? (
                <Text style={styles.emptyText}>No workout history yet. Start your first workout!</Text>
              ) : (
                workoutHistory.map((item, i) => (
                  <View key={i} style={[styles.historyItem, { borderColor: theme.border }]}>
                    <View style={styles.historyInfo}>
                      <Text style={styles.historyWorkout}>{item.workout}</Text>
                      <Text style={styles.historyMeta}>{item.date} • {item.duration} min</Text>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Progress Photos Modal */}
      <Modal visible={showProgressPhotos} transparent animationType="slide" onRequestClose={() => setShowProgressPhotos(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Progress Photos</Text>
              <TouchableOpacity onPress={() => setShowProgressPhotos(false)}>
                <X color="#111827" size={24} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={[styles.addPhotoBtn, { backgroundColor: theme.accentColor }]}
              onPress={addProgressPhoto}
            >
              <Camera color="#FFFFFF" size={20} />
              <Text style={styles.addPhotoText}>Add Progress Photo</Text>
            </TouchableOpacity>
            <ScrollView style={styles.photosList} showsVerticalScrollIndicator={false}>
              {progressPhotos.length === 0 ? (
                <Text style={styles.emptyText}>No progress photos yet. Track your journey!</Text>
              ) : (
                progressPhotos.map((photo) => (
                  <View key={photo.id} style={[styles.photoCard, { borderColor: theme.border }]}>
                    <View style={styles.photoPlaceholder}>
                      <ImageIcon color={theme.accentColor} size={40} />
                    </View>
                    <View style={styles.photoInfo}>
                      <Text style={styles.photoDate}>{photo.date}</Text>
                      {photo.notes && <Text style={styles.photoNotes}>{photo.notes}</Text>}
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Rest Timer Modal */}
      <Modal visible={showRestTimer} transparent animationType="fade" onRequestClose={() => setShowRestTimer(false)}>
        <View style={styles.timerOverlay}>
          <View style={[styles.timerCard, { borderColor: theme.border }]}>
            <View style={styles.timerHeader}>
              <Text style={styles.timerTitle}>Rest Timer</Text>
              <TouchableOpacity onPress={() => setShowRestTimer(false)}>
                <X color="#111827" size={20} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.timerDisplay, { color: theme.accentColor }]}>{Math.floor(restSeconds / 60)}:{(restSeconds % 60).toString().padStart(2, '0')}</Text>
            <View style={styles.timerControls}>
              <TouchableOpacity style={[styles.timerBtn, { backgroundColor: theme.accentColor }]} onPress={() => setRestSeconds(Math.max(0, restSeconds - 30))}>
                <Text style={styles.timerBtnText}>-30s</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.timerBtn, { backgroundColor: theme.accentColor }]} onPress={() => setRestSeconds(restSeconds + 30)}>
                <Text style={styles.timerBtnText}>+30s</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.timerHint}>Tap to adjust rest time</Text>
          </View>
        </View>
      </Modal>

      {/* Video Player Modal */}
      <Modal visible={!!player} transparent animationType="fade" onRequestClose={() => setPlayer(null)}>
        <View style={styles.videoModalOverlay}>
          <View style={styles.videoModalCard}>
            <View style={styles.videoHeader}>
              <Text style={styles.videoTitle} numberOfLines={1}>{playerTitle}</Text>
              <TouchableOpacity 
                style={[styles.closeVideoBtn, { backgroundColor: 'rgba(255,255,255,0.2)' }]} 
                onPress={() => {
                  setPlayer(null);
                  setPlayerTitle('Exercise Video');
                }}
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
                    src={player.type === 'playlist' 
                      ? `https://www.youtube.com/embed/videoseries?list=${player.id}&autoplay=1&playsinline=1`
                      : `https://www.youtube.com/embed/${player.id}?autoplay=1&playsinline=1`
                    }
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </View>
              ) : (
                <WebView
                  source={{ uri: player.type === 'playlist'
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
                    // Only allow YouTube embed URLs - prevent navigation to external sites
                    const allowed = request.url.includes('youtube.com/embed') || 
                                  request.url.includes('youtube.com/iframe_api') ||
                                  request.url.includes('googleapis.com') ||
                                  request.url.includes('google.com');
                    if (!allowed) {
                      return false; // Block navigation to external sites
                    }
                    return true;
                  }}
                  onNavigationStateChange={(navState) => {
                    // Prevent navigation away from YouTube embed
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
  pageTitle: { fontSize: 28, fontWeight: '700', color: '#111827', paddingHorizontal: 20, marginTop: 8, marginBottom: 20 },
  recommendationBanner: { marginHorizontal: 20, marginBottom: 16, padding: 12, borderRadius: 12, borderWidth: 1 },
  recommendationText: { fontSize: 12, fontWeight: '600', textAlign: 'center', lineHeight: 18 },
  whyBanner: { marginHorizontal: 20, marginBottom: 20, padding: 16, borderRadius: 12, borderWidth: 1 },
  whyTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  whyText: { fontSize: 13, color: '#374151', lineHeight: 20 },
  sectionTabs: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20, gap: 8 },
  sectionTab: { flex: 1, paddingVertical: 10, borderRadius: 12, backgroundColor: '#F3F4F6', alignItems: 'center' },
  sectionTabText: { fontSize: 14, fontWeight: '600', color: '#6B7280' },
  sectionTabTextActive: { color: '#FFFFFF', fontWeight: '700' },
  videoOnlySection: { paddingBottom: 20 },
  videoCard: { marginHorizontal: 20, height: 220, borderRadius: 20, overflow: 'hidden', borderWidth: 1, marginBottom: 16, position: 'relative' },
  videoThumbnail: { width: '100%', height: '100%', backgroundColor: '#000' },
  videoPlaceholder: { width: '100%', height: '100%', backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  placeholderText: { color: '#6B7280', fontSize: 14 },
  phaseBadge: { position: 'absolute', top: 12, left: 12, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 12 },
  phaseBadgeText: { color: '#FFFFFF', fontWeight: '700', fontSize: 11 },
  phaseBadgeMeta: { color: '#FFFFFF', fontSize: 10, marginTop: 2 },
  playBtn: { position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -32 }, { translateY: -32 }], width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  workoutTitle: { fontSize: 22, fontWeight: '700', color: '#111827', marginBottom: 6 },
  workoutDesc: { fontSize: 14, color: '#6B7280', marginBottom: 12, lineHeight: 20 },
  videoInfoCard: { padding: 12, borderRadius: 12, borderWidth: 1, marginTop: 12 },
  videoInfoText: { fontSize: 12, color: '#6B7280', fontWeight: '600' },
  progressSection: { marginHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 12 },
  progressBar: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden', marginBottom: 16 },
  progressFill: { height: '100%', borderRadius: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  stat: { alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#6B7280' },
  programsSection: { marginHorizontal: 20, marginBottom: 24 },
  filtersRow: { gap: 10, paddingRight: 20 },
  filterChip: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1 },
  filterChipText: { fontWeight: '700', fontSize: 13 },
  startBtn: { marginHorizontal: 20, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  startBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', alignItems: 'center', justifyContent: 'center', padding: 16 },
  modalCard: { width: '100%', maxWidth: 720, height: 400, backgroundColor: '#000', borderRadius: 12, overflow: 'hidden' },
  closeBtn: { position: 'absolute', bottom: 12, right: 12, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 16 },
  closeText: { color: '#FFF', fontWeight: '700' },
  videoModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center', alignItems: 'center' },
  videoModalCard: { width: '100%', height: '100%', backgroundColor: '#000', justifyContent: 'center' },
  videoHeader: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 56, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)' },
  videoTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  closeVideoBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  videoContainer: { flex: 1, width: '100%' },
  videoWebView: { flex: 1, width: '100%', backgroundColor: '#000' },
  quickActions: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 20, gap: 8 },
  quickActionBtn: { flex: 1, backgroundColor: '#FFFFFF', borderWidth: 1, borderRadius: 12, paddingVertical: 12, alignItems: 'center', gap: 6 },
  quickActionText: { fontSize: 11, fontWeight: '700' },
  modalContent: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '85%', padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 22, fontWeight: '700', color: '#111827' },
  modalSubtitle: { fontSize: 14, color: '#6B7280', marginBottom: 16 },
  exerciseList: { maxHeight: 500 },
  exerciseCard: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 16, marginBottom: 12 },
  exerciseInfo: { gap: 8 },
  exerciseName: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 4 },
  exerciseTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  exerciseTag: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8 },
  exerciseTagText: { fontSize: 11, fontWeight: '700' },
  exerciseDesc: { fontSize: 12, color: '#6B7280', marginTop: 4, marginBottom: 8 },
  exerciseMeta: { flexDirection: 'row', gap: 12, marginTop: 8 },
  exerciseDuration: { fontSize: 13, color: '#6B7280', fontWeight: '600' },
  exerciseCalories: { fontSize: 13, color: '#6B7280', fontWeight: '600' },
  programsSubtitle: { fontSize: 13, color: '#6B7280', marginBottom: 16 },
  programsRow: { gap: 16, paddingRight: 20 },
  programCard: { width: 280, borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  programHeader: { padding: 16 },
  programTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  programMeta: { fontSize: 12, color: 'rgba(255,255,255,0.9)' },
  programBody: { padding: 16, backgroundColor: '#FFFFFF' },
  programFocus: { fontSize: 13, color: '#6B7280', marginBottom: 12 },
  programProgress: { marginBottom: 12 },
  programProgressBar: { height: 6, backgroundColor: '#E5E7EB', borderRadius: 3, overflow: 'hidden', marginBottom: 6 },
  programProgressFill: { height: '100%', borderRadius: 3 },
  programProgressText: { fontSize: 11, color: '#6B7280', textAlign: 'right' },
  programBtn: { paddingVertical: 10, borderRadius: 10, alignItems: 'center', flexDirection: 'row', gap: 6, justifyContent: 'center' },
  programBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  videoBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8, backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, alignSelf: 'flex-start' },
  videoBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  videoProgramCard: { width: 200, borderRadius: 16, borderWidth: 1, overflow: 'hidden', marginRight: 12 },
  videoProgramHeader: { padding: 16, alignItems: 'center', minHeight: 120, justifyContent: 'center' },
  videoProgramIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  videoProgramTitle: { fontSize: 14, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', lineHeight: 18 },
  videoProgramBody: { padding: 12, backgroundColor: '#FFFFFF' },
  videoProgramFocus: { fontSize: 11, color: '#6B7280', marginBottom: 8, textAlign: 'center' },
  videoProgramBtn: { paddingVertical: 8, borderRadius: 8, alignItems: 'center', flexDirection: 'row', gap: 6, justifyContent: 'center' },
  videoProgramBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },
  historyList: { maxHeight: 500 },
  historyItem: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 16, marginBottom: 12 },
  historyInfo: { gap: 4 },
  historyWorkout: { fontSize: 16, fontWeight: '700', color: '#111827' },
  historyMeta: { fontSize: 13, color: '#6B7280' },
  emptyText: { textAlign: 'center', color: '#6B7280', fontSize: 14, paddingVertical: 40 },
  timerOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center', padding: 20 },
  timerCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 32, alignItems: 'center', borderWidth: 1, minWidth: 280 },
  timerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 20 },
  timerTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  timerDisplay: { fontSize: 48, fontWeight: '700', marginVertical: 24, fontFamily: 'monospace' },
  timerControls: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  timerBtn: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12 },
  timerBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  timerHint: { fontSize: 12, color: '#6B7280', marginTop: 8 },
  addPhotoBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, paddingHorizontal: 20, borderRadius: 12, marginBottom: 16 },
  addPhotoText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  photosList: { maxHeight: 500 },
  photoCard: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 12, marginBottom: 12, borderWidth: 1, flexDirection: 'row', gap: 12 },
  photoPlaceholder: { width: 80, height: 80, borderRadius: 8, backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  photoInfo: { flex: 1, justifyContent: 'center' },
  photoDate: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 4 },
  photoNotes: { fontSize: 12, color: '#6B7280' },
});
