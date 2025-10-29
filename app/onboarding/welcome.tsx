import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Sparkles, ChevronRight } from 'lucide-react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Icon */}
        <View style={styles.iconContainer}>
          <Sparkles size={64} color="#EC4899" />
        </View>

        {/* Title */}
        <Text style={styles.title}>Welcome to Gloww</Text>
        <Text style={styles.subtitle}>
          Your personalized support system for PCOS, PCOD, Menopause, and Perimenopause
        </Text>

        {/* Benefits */}
        <View style={styles.benefitsContainer}>
          <View style={styles.benefitItem}>
            <View style={styles.benefitDot} />
            <Text style={styles.benefitText}>Track symptoms and identify patterns</Text>
          </View>
          <View style={styles.benefitItem}>
            <View style={styles.benefitDot} />
            <Text style={styles.benefitText}>Access specialized healthcare providers</Text>
          </View>
          <View style={styles.benefitItem}>
            <View style={styles.benefitDot} />
            <Text style={styles.benefitText}>Get personalized treatment plans</Text>
          </View>
          <View style={styles.benefitItem}>
            <View style={styles.benefitDot} />
            <Text style={styles.benefitText}>Learn about treatments and lifestyle changes</Text>
          </View>
        </View>
      </View>

      {/* CTA */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/onboarding/age')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <ChevronRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.disclaimer}>
          Takes less than 2 minutes • Free to start
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  iconContainer: {
    alignSelf: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 17,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 48,
  },
  benefitsContainer: {
    gap: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  benefitDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EC4899',
  },
  benefitText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#EC4899',
    paddingVertical: 18,
    borderRadius: 14,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  disclaimer: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

