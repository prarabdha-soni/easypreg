import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart } from 'lucide-react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#FDE2E7', '#FFFFFF']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Heart size={64} color="#e91e63" strokeWidth={2} />
        </View>

        <Text style={styles.logo}>NariCare</Text>
        <Text style={styles.tagline}>Know your period, know your body</Text>
        <Text style={styles.subtagline}>Private, on-device tracking with cycle-smart tips</Text>

        {/* Removed flower illustration for a cleaner hero */}

        {/* Hormone Impact Diagram */}
        <View style={styles.diagramContainer}>
          <Text style={styles.impactTitle}>Hormone imbalance can impact</Text>
          <View style={styles.pillGridRow}>
            <View style={styles.pill}>
              <Text style={styles.pillEmoji}>💇‍♀️</Text>
              <Text style={styles.pillText}>Hair Loss</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillEmoji}>✨</Text>
              <Text style={styles.pillText}>Skin Issues</Text>
            </View>
          </View>
          <View style={styles.pillGridRow}>
            <View style={styles.pill}>
              <Text style={styles.pillEmoji}>⚖️</Text>
              <Text style={styles.pillText}>Weight Gain</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillEmoji}>😊</Text>
              <Text style={styles.pillText}>Mood</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillEmoji}>⚡</Text>
              <Text style={styles.pillText}>Energy</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/onboarding/period-date')}
        >
          <LinearGradient
            colors={['#F59BB3', '#8FD3D8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Fix Hormone</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.privacyText}>
          Your data is private, encrypted, and never sold.
        </Text>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 24,
    paddingTop: 80,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logo: {
    fontSize: 40,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  tagline: {
    fontSize: 24,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '800',
  },
  subtagline: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  illustrationContainer: {},
  illustration: {},
  diagramContainer: {
    width: '100%',
    maxWidth: 360,
    minHeight: 180,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FCE7F3',
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    marginTop: 12,
    marginBottom: 24,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  centerAbsolute: {},
  centerNode: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE4E9',
    borderColor: '#F9C3D7',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  centerEmoji: { fontSize: 22, marginBottom: 4 },
  centerTitle: { fontSize: 16, fontWeight: '800', color: '#111827' },
  centerSubtitle: { fontSize: 12, color: '#6B7280' },
  satelliteNode: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  shadowSm: {},
  nodeEmoji: { fontSize: 16, marginBottom: 2 },
  nodeText: { fontSize: 14, fontWeight: '700', color: '#111827' },
  connector: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  connectorVertical: {
    position: 'absolute',
    width: 2,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  connectorH: {
    position: 'absolute',
    height: 2,
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  connectorV: {
    position: 'absolute',
    width: 2,
    backgroundColor: 'transparent',
    borderLeftWidth: 2,
    borderLeftColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  impactTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  pillGridRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  pillEmoji: { fontSize: 16, marginRight: 6 },
  pillText: { fontSize: 14, fontWeight: '700', color: '#111827' },
  button: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 32,
    marginBottom: 24,
    minWidth: 260,
    height: 64,
    overflow: 'hidden',
  },
  buttonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  privacyText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    maxWidth: 280,
  },
});
