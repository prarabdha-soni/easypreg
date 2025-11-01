import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';

export default function OnboardingWelcome() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#E0F2FE", "#D1FAE5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Easily Lose Weight</Text>
        <Text style={styles.subtitle}>By Following Your Hormone Cycle</Text>

        {/* Transformation Graphic */}
        <View style={styles.transformationContainer}>
          <View style={styles.figureContainer}>
            {/* Before Figure */}
            <View style={styles.figureWrapper}>
              <View style={[styles.figure, styles.figureBefore]}>
                <View style={styles.figureHead} />
                <View style={[styles.figureBody, styles.figureBodyBefore]} />
                <View style={styles.figureLegs}>
                  <View style={[styles.leg, styles.legBefore]} />
                  <View style={[styles.leg, styles.legBefore]} />
                </View>
              </View>
            </View>

            {/* Arrows */}
            <View style={styles.arrowsContainer}>
              <View style={[styles.arrowPath, styles.arrowPath1]} />
              <View style={[styles.arrowPath, styles.arrowPath2]} />
            </View>

            {/* After Figure */}
            <View style={styles.figureWrapper}>
              <View style={[styles.figure, styles.figureAfter]}>
                <View style={styles.figureHead} />
                <View style={[styles.figureBody, styles.figureBodyAfter]} />
                <View style={styles.figureLegs}>
                  <View style={[styles.leg, styles.legAfter]} />
                  <View style={[styles.leg, styles.legAfter]} />
                </View>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.resultsText}>
          See results in just <Text style={styles.resultsHighlight}>2 months!</Text>
        </Text>

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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    paddingTop: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 40,
  },
  transformationContainer: {
    width: '100%',
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  figureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  figureWrapper: {
    width: 120,
    height: 240,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  figure: {
    width: 100,
    height: 200,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  figureBefore: {
    borderWidth: 3,
    borderColor: '#A855F7',
    borderStyle: 'dashed',
    borderRadius: 50,
    padding: 10,
  },
  figureAfter: {
    borderWidth: 3,
    borderColor: '#22C55E',
    borderStyle: 'dashed',
    borderRadius: 50,
    padding: 10,
  },
  figureHead: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#6B7280',
    marginBottom: 8,
  },
  figureBody: {
    width: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  figureBodyBefore: {
    height: 80,
    backgroundColor: '#DDD6FE',
  },
  figureBodyAfter: {
    height: 60,
    backgroundColor: '#D1FAE5',
  },
  figureLegs: {
    flexDirection: 'row',
    gap: 12,
  },
  leg: {
    width: 24,
    borderRadius: 12,
  },
  legBefore: {
    height: 50,
    backgroundColor: '#DDD6FE',
  },
  legAfter: {
    height: 45,
    backgroundColor: '#D1FAE5',
  },
  arrowsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowPath: {
    position: 'absolute',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#A855F7',
    width: 100,
    height: 80,
    borderRadius: 50,
  },
  arrowPath1: {
    borderColor: '#A855F7',
    transform: [{ rotate: '25deg' }],
    top: 20,
    right: 80,
  },
  arrowPath2: {
    borderColor: '#22C55E',
    transform: [{ rotate: '-25deg' }],
    bottom: 20,
    left: 80,
  },
  resultsText: {
    fontSize: 18,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 32,
  },
  resultsHighlight: {
    color: '#22C55E',
    fontWeight: '700',
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

