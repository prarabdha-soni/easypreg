import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Activity, ArrowLeft, Brain, TrendingUp, BookOpen, Sparkles } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function TrackingEducationScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Symptom Tracking & Education</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Activity size={48} color="#10B981" />
          </View>
          <Text style={styles.heroTitle}>Track, Learn, Improve</Text>
          <Text style={styles.heroSubtitle}>
            Understand your symptoms with intelligent tracking and expert educational resources.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Activity size={28} color="#10B981" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Daily Symptom Logging</Text>
              <Text style={styles.featureDescription}>
                Track hot flashes, mood changes, sleep quality, and more with our intuitive logging system.
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Brain size={28} color="#8B5CF6" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>AI-Powered Insights</Text>
              <Text style={styles.featureDescription}>
                Get personalized insights and pattern recognition to understand your hormonal journey.
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <TrendingUp size={28} color="#F59E0B" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Progress Analytics</Text>
              <Text style={styles.featureDescription}>
                Visualize your progress with charts and trends to see what's working.
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <BookOpen size={28} color="#EC4899" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Expert Resources</Text>
              <Text style={styles.featureDescription}>
                Access educational content tailored to your symptoms and stage.
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.ctaButton}>
          <Sparkles size={20} color="#FFFFFF" />
          <Text style={styles.ctaButtonText}>Start Tracking Free</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  hero: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E8D5E8',
  },
  heroIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 23,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    gap: 14,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F9F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
  },
  ctaButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

