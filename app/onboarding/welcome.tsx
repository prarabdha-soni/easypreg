import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowRight, Activity, Sparkles } from 'lucide-react-native';

export default function OnboardingWelcome() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#FFE5F1", "#FFF0B8", "#E0F2FE"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={["#FF6B9D", "#FF8CC8", "#FFB3E0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconGradient}
          >
            <Activity size={48} color="#FFFFFF" />
          </LinearGradient>
          <View style={styles.sparkleContainer}>
            <Sparkles size={24} color="#FFD700" />
          </View>
        </View>
        
        <Text style={styles.title}>
          Your body has a cycle —{'\n'}
          <Text style={styles.highlight}>your workout should too</Text>
        </Text>
        
        <Text style={styles.subtitle}>
          Sync your fitness with your body's natural rhythm for optimal results
        </Text>

        <View style={styles.benefitCard}>
          <LinearGradient
            colors={["#FFFFFF", "#FFF9F0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <Text style={styles.benefitTitle}>Transform your body in</Text>
            <Text style={styles.benefitHighlight}>2 months</Text>
            <Text style={styles.benefitSubtext}>with cycle-based workouts</Text>
          </LinearGradient>
        </View>

        <TouchableOpacity
          style={styles.cta}
          onPress={() => router.push('/onboarding/period-date' as any)}
        >
          <LinearGradient
            colors={["#FF6B9D", "#FF8CC8", "#FFB3E0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaText}>Start Your Journey</Text>
            <ArrowRight color="#FFFFFF" size={22} />
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    position: 'relative',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  iconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkleContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2D1B69',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 42,
    letterSpacing: -0.5,
  },
  highlight: {
    color: '#FF6B9D',
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 17,
    color: '#5B4A7D',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 48,
    paddingHorizontal: 24,
    fontWeight: '500',
  },
  benefitCard: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 36,
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  cardGradient: {
    padding: 28,
    alignItems: 'center',
    borderRadius: 24,
  },
  benefitTitle: {
    fontSize: 18,
    color: '#5B4A7D',
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '600',
  },
  benefitHighlight: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FF6B9D',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -1,
  },
  benefitSubtext: {
    fontSize: 15,
    color: '#8B7BA8',
    textAlign: 'center',
    fontWeight: '500',
  },
  cta: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 12,
  },
  ctaGradient: {
    paddingVertical: 20,
    paddingHorizontal: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  dotActive: {
    backgroundColor: '#FF6B9D',
    width: 28,
    height: 10,
    borderRadius: 5,
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
});
