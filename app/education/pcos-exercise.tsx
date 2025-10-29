import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Activity, Clock, Flame, Heart } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function PCOSExerciseScreen() {
  const router = useRouter();

  const exerciseTypes = [
    {
      id: 1,
      type: 'Cardio Exercise',
      icon: Heart,
      color: '#EF4444',
      duration: '30-45 min',
      frequency: '5x per week',
      benefits: ['Improves insulin sensitivity', 'Burns calories', 'Boosts mood'],
      examples: ['Brisk walking', 'Jogging', 'Cycling', 'Swimming', 'Dancing'],
    },
    {
      id: 2,
      type: 'Strength Training',
      icon: Flame,
      color: '#F59E0B',
      duration: '30-40 min',
      frequency: '2-3x per week',
      benefits: ['Builds muscle mass', 'Increases metabolism', 'Improves insulin response'],
      examples: ['Weight lifting', 'Bodyweight exercises', 'Resistance bands', 'Kettlebells'],
    },
    {
      id: 3,
      type: 'HIIT (High-Intensity)',
      icon: Activity,
      color: '#8B5CF6',
      duration: '20-30 min',
      frequency: '2-3x per week',
      benefits: ['Burns fat efficiently', 'Improves cardiovascular health', 'Time-efficient'],
      examples: ['Burpees', 'Jump squats', 'Mountain climbers', 'Sprint intervals'],
    },
    {
      id: 4,
      type: 'Mind-Body Exercise',
      icon: Clock,
      color: '#10B981',
      duration: '30-60 min',
      frequency: '3-4x per week',
      benefits: ['Reduces stress', 'Improves flexibility', 'Balances hormones'],
      examples: ['Yoga', 'Pilates', 'Tai Chi', 'Stretching routines'],
    },
  ];

  const weeklyPlan = [
    { day: 'Monday', workout: 'Cardio (30 min walk/jog) + Yoga (20 min)' },
    { day: 'Tuesday', workout: 'Strength Training (full body, 40 min)' },
    { day: 'Wednesday', workout: 'HIIT (25 min) + Stretching (10 min)' },
    { day: 'Thursday', workout: 'Cardio (30 min cycling) + Pilates (20 min)' },
    { day: 'Friday', workout: 'Strength Training (upper/lower split, 40 min)' },
    { day: 'Saturday', workout: 'HIIT (30 min) or Active recovery (gentle yoga)' },
    { day: 'Sunday', workout: 'Rest or light walk (20-30 min)' },
  ];

  const tips = [
    {
      title: 'Start Slow',
      description: 'If you\'re new to exercise, begin with 10-15 minutes daily and gradually increase.',
    },
    {
      title: 'Consistency Over Intensity',
      description: 'Regular moderate exercise is more beneficial than sporadic intense workouts.',
    },
    {
      title: 'Listen to Your Body',
      description: 'Rest when needed. Overtraining can increase cortisol and worsen PCOS symptoms.',
    },
    {
      title: 'Post-Meal Movement',
      description: 'A 10-15 minute walk after meals helps regulate blood sugar levels.',
    },
    {
      title: 'Track Your Progress',
      description: 'Monitor how exercise affects your energy, mood, and menstrual cycle.',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PCOS Exercise Guide</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Intro */}
        <View style={styles.introCard}>
          <Activity size={32} color="#F59E0B" />
          <Text style={styles.introTitle}>Exercise for PCOS</Text>
          <Text style={styles.introText}>
            Regular physical activity is one of the most effective ways to manage PCOS. It improves insulin sensitivity, promotes weight loss, reduces inflammation, and balances hormones.
          </Text>
        </View>

        {/* Exercise Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Types of Exercise</Text>
          {exerciseTypes.map((exercise) => {
            const IconComponent = exercise.icon;
            return (
              <View key={exercise.id} style={styles.exerciseCard}>
                <View style={[styles.exerciseIcon, { backgroundColor: exercise.color + '20' }]}>
                  <IconComponent size={28} color={exercise.color} />
                </View>
                <View style={styles.exerciseContent}>
                  <Text style={styles.exerciseType}>{exercise.type}</Text>
                  <View style={styles.exerciseStats}>
                    <View style={styles.statTag}>
                      <Clock size={14} color="#6B7280" />
                      <Text style={styles.statText}>{exercise.duration}</Text>
                    </View>
                    <View style={styles.statTag}>
                      <Text style={styles.statText}>{exercise.frequency}</Text>
                    </View>
                  </View>
                  <Text style={styles.benefitsTitle}>Benefits:</Text>
                  {exercise.benefits.map((benefit, index) => (
                    <Text key={index} style={styles.benefitText}>• {benefit}</Text>
                  ))}
                  <Text style={styles.examplesTitle}>Examples:</Text>
                  <View style={styles.examplesContainer}>
                    {exercise.examples.map((example, index) => (
                      <View key={index} style={[styles.exampleTag, { borderColor: exercise.color }]}>
                        <Text style={[styles.exampleText, { color: exercise.color }]}>{example}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Weekly Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sample Weekly Plan</Text>
          <View style={styles.planCard}>
            {weeklyPlan.map((day, index) => (
              <View key={index} style={styles.dayRow}>
                <Text style={styles.dayName}>{day.day}</Text>
                <Text style={styles.dayWorkout}>{day.workout}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercise Tips for PCOS</Text>
          {tips.map((tip, index) => (
            <View key={index} style={styles.tipCard}>
              <Text style={styles.tipTitle}>💡 {tip.title}</Text>
              <Text style={styles.tipDescription}>{tip.description}</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity 
          style={styles.consultButton}
          onPress={() => router.push('/telehealth/providers')}
        >
          <Text style={styles.consultButtonText}>Get Personalized Exercise Plan</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F7',
  },
  header: {
    backgroundColor: '#F59E0B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  introCard: {
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  introTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#92400E',
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
  introText: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  exerciseCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 14,
  },
  exerciseIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseType: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  exerciseStats: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  statTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '600',
  },
  benefitsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  benefitText: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
    lineHeight: 18,
  },
  examplesTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 10,
    marginBottom: 8,
  },
  examplesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  exampleTag: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  exampleText: {
    fontSize: 12,
    fontWeight: '600',
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dayRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dayName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  dayWorkout: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  tipCard: {
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 6,
  },
  tipDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  consultButton: {
    backgroundColor: '#F59E0B',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  consultButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

