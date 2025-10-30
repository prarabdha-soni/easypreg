import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function OnboardingWelcome() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#EED8F0", "#FDE7F0"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Your hormones change every week —</Text>
        <Text style={styles.subtitle}>so should your sleep, workouts, and glow.</Text>
        <TouchableOpacity
          style={styles.cta}
          onPress={() => router.push('/(tabs)/profile' as any)}
        >
          <Text style={styles.ctaText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EED8F0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E8D5E8',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#3C2A3C',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B5A6B',
    textAlign: 'center',
    marginBottom: 24,
  },
  cta: {
    backgroundColor: '#8B5A8F',
    paddingVertical: 16,
    borderRadius: 14,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});

