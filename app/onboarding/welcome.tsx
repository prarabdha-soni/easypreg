import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowRight, Zap } from 'lucide-react-native';

export default function OnboardingWelcome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Zap size={48} color="#e91e63" />
        </View>
        
        <Text style={styles.title}>
          Do you know Yoga, Dance is your best medicine for {' '}
          <Text style={styles.highlight}>Weight Loss!</Text>
        </Text>
        <Text style={styles.subtitle}>Personalize your fitness journey with cycle-based workouts</Text>

        <View style={styles.benefitCard}>
          <Text style={styles.benefitTitle}>See results in just</Text>
          <Text style={styles.benefitHighlight}>2 months!</Text>
        </View>

        <TouchableOpacity
          style={styles.cta}
          onPress={() => router.push('/onboarding/period-date' as any)}
        >
          <LinearGradient
            colors={["#4ADE80", "#22C55E"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaText}>Start Your Transformation</Text>
            <ArrowRight color="#FFFFFF" size={20} />
          </LinearGradient>
        </TouchableOpacity>

        {/* Pagination Dots */}
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff5f7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 38,
  },
  highlight: {
    color: '#F97316',
    textDecorationLine: 'underline',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 48,
    paddingHorizontal: 20,
  },
  benefitCard: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e9ecef',
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
  },
  benefitTitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  benefitHighlight: {
    fontSize: 32,
    fontWeight: '700',
    color: '#22C55E',
    textAlign: 'center',
  },
  cta: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  ctaGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    backgroundColor: '#22C55E',
    width: 24,
  },
});
