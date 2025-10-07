import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart } from 'lucide-react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#fff5f7', '#ffffff']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Heart size={64} color="#e91e63" strokeWidth={2} />
        </View>

        <Text style={styles.logo}>NariCare</Text>
        <Text style={styles.tagline}>Your complete women's health companion</Text>
        <Text style={styles.subtagline}>From first periods to motherhood - we guide you every step of the way</Text>

        <View style={styles.illustrationContainer}>
          <Text style={styles.illustration}>🌸</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/onboarding/period-date')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logo: {
    fontSize: 40,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtagline: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 20,
  },
  illustrationContainer: {
    marginBottom: 60,
  },
  illustration: {
    fontSize: 80,
  },
  button: {
    backgroundColor: '#e91e63',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    marginBottom: 24,
    minWidth: 200,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  privacyText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    maxWidth: 280,
  },
});
