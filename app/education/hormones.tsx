import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, BookOpen, Heart, Activity, Scale } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function HormonesEducation() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#FEFEFE' }}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#1a1a1a" />
          </TouchableOpacity>
          <BookOpen size={40} color="#EC4899" />
          <Text style={styles.headerTitle}>Understanding Hormones</Text>
          <Text style={styles.headerSubtitle}>How hormones affect your health</Text>
        </View>

        {/* Intro Section */}
        <View style={styles.section}>
          <Text style={styles.introText}>
            Hormones are powerful chemical messengers that regulate nearly every function in your body. Understanding the connection between hormones and your symptoms is the first step toward better health.
          </Text>
        </View>

        {/* Hair Health Section */}
        <View style={styles.topicCard}>
          <View style={styles.topicHeader}>
            <Activity size={24} color="#EC4899" />
            <Text style={styles.topicTitle}>💇‍♀️ Hair Health</Text>
          </View>
          
          <Text style={styles.topicSubtitle}>Common Issues:</Text>
          <Text style={styles.topicList}>
            • Hair thinning or loss{'\n'}
            • Excessive growth (hirsutism){'\n'}
            • Breakage and texture changes
          </Text>

          <Text style={styles.topicSubtitle}>Hormonal Links:</Text>
          
          <View style={styles.hormoneItem}>
            <Text style={styles.hormoneName}>Androgens (Testosterone, DHT)</Text>
            <Text style={styles.hormoneDesc}>
              High levels (often seen in PCOS) can lead to androgenic alopecia (pattern baldness) and hirsutism (excessive facial/body hair).
            </Text>
          </View>

          <View style={styles.hormoneItem}>
            <Text style={styles.hormoneName}>Thyroid Hormones</Text>
            <Text style={styles.hormoneDesc}>
              Both hypo- and hyperthyroidism can cause hair loss or changes in hair texture.
            </Text>
          </View>

          <View style={styles.hormoneItem}>
            <Text style={styles.hormoneName}>Estrogen/Progesterone</Text>
            <Text style={styles.hormoneDesc}>
              Fluctuations, particularly drops (postpartum, perimenopause), can trigger telogen effluvium (shedding).
            </Text>
          </View>

          <View style={styles.hormoneItem}>
            <Text style={styles.hormoneName}>Insulin</Text>
            <Text style={styles.hormoneDesc}>
              High insulin levels (insulin resistance) common in PCOS can indirectly impact androgens, affecting hair.
            </Text>
          </View>

          <View style={styles.helpBox}>
            <Text style={styles.helpTitle}>How Hormonal Control Helps:</Text>
            <Text style={styles.helpText}>
              Balancing androgens, optimizing thyroid function, and supporting healthy estrogen/progesterone levels can significantly improve hair growth, reduce shedding, and manage unwanted hair.
            </Text>
          </View>
        </View>

        {/* Weight Management Section */}
        <View style={styles.topicCard}>
          <View style={styles.topicHeader}>
            <Scale size={24} color="#F97316" />
            <Text style={styles.topicTitle}>⚖️ Weight Management</Text>
          </View>
          
          <Text style={styles.topicSubtitle}>Common Issues:</Text>
          <Text style={styles.topicList}>
            • Stubborn weight gain{'\n'}
            • Difficulty losing weight{'\n'}
            • Abdominal fat accumulation
          </Text>

          <Text style={styles.topicSubtitle}>Hormonal Links:</Text>
          
          <View style={styles.hormoneItem}>
            <Text style={styles.hormoneName}>Insulin</Text>
            <Text style={styles.hormoneDesc}>
              Insulin resistance is a primary driver of weight gain, especially around the abdomen, and is central to PCOS.
            </Text>
          </View>

          <View style={styles.hormoneItem}>
            <Text style={styles.hormoneName}>Thyroid Hormones</Text>
            <Text style={styles.hormoneDesc}>
              Hypothyroidism slows metabolism, making weight loss difficult.
            </Text>
          </View>

          <View style={styles.hormoneItem}>
            <Text style={styles.hormoneName}>Cortisol (Stress Hormone)</Text>
            <Text style={styles.hormoneDesc}>
              Chronic high cortisol promotes fat storage, particularly visceral fat.
            </Text>
          </View>

          <View style={styles.hormoneItem}>
            <Text style={styles.hormoneName}>Estrogen/Progesterone</Text>
            <Text style={styles.hormoneDesc}>
              Hormonal shifts during perimenopause can change fat distribution and make weight loss harder.
            </Text>
          </View>

          <View style={styles.hormoneItem}>
            <Text style={styles.hormoneName}>Leptin/Ghrelin</Text>
            <Text style={styles.hormoneDesc}>
              Hormonal imbalances can disrupt these satiety/hunger hormones, leading to increased appetite.
            </Text>
          </View>

          <View style={styles.helpBox}>
            <Text style={styles.helpTitle}>How Hormonal Control Helps:</Text>
            <Text style={styles.helpText}>
              Addressing insulin resistance, optimizing thyroid, managing stress (cortisol), and supporting balanced sex hormones are crucial for effective and sustainable weight management.
            </Text>
          </View>
        </View>

        {/* Cycle Health Section */}
        <View style={styles.topicCard}>
          <View style={styles.topicHeader}>
            <Heart size={24} color="#10B981" />
            <Text style={styles.topicTitle}>🌸 Cycle Health</Text>
          </View>
          
          <Text style={styles.topicSubtitle}>Common Issues:</Text>
          <Text style={styles.topicList}>
            • Irregular periods{'\n'}
            • Heavy bleeding{'\n'}
            • Severe PMS/PMDD{'\n'}
            • Painful periods
          </Text>

          <Text style={styles.topicSubtitle}>Hormonal Links:</Text>
          
          <View style={styles.hormoneItem}>
            <Text style={styles.hormoneName}>Estrogen & Progesterone</Text>
            <Text style={styles.hormoneDesc}>
              The balance and rhythm of these two hormones drive the menstrual cycle. Imbalances lead to irregularities, heavy bleeding, severe PMS, and PMDD.
            </Text>
          </View>

          <View style={styles.hormoneItem}>
            <Text style={styles.hormoneName}>Androgens</Text>
            <Text style={styles.hormoneDesc}>
              High androgens (e.g., in PCOS) can suppress ovulation, leading to irregular or absent periods.
            </Text>
          </View>

          <View style={styles.hormoneItem}>
            <Text style={styles.hormoneName}>Thyroid Hormones</Text>
            <Text style={styles.hormoneDesc}>
              Thyroid dysfunction is a common cause of cycle irregularities.
            </Text>
          </View>

          <View style={styles.hormoneItem}>
            <Text style={styles.hormoneName}>Cortisol</Text>
            <Text style={styles.hormoneDesc}>
              Chronic stress can disrupt the HPA axis, interfering with ovulation and cycle regularity.
            </Text>
          </View>

          <View style={styles.hormoneItem}>
            <Text style={styles.hormoneName}>Prolactin</Text>
            <Text style={styles.hormoneDesc}>
              High prolactin levels can inhibit ovulation.
            </Text>
          </View>

          <View style={styles.helpBox}>
            <Text style={styles.helpTitle}>How Hormonal Control Helps:</Text>
            <Text style={styles.helpText}>
              Restoring the natural rhythm and balance of sex hormones, addressing underlying conditions like PCOS, optimizing thyroid function, and managing stress are fundamental to achieving regular, healthier, and less symptomatic cycles.
            </Text>
          </View>
        </View>

        {/* NariCare Support Section */}
        <View style={styles.supportCard}>
          <Text style={styles.supportTitle}>How NariCare Supports You</Text>
          
          <View style={styles.supportItem}>
            <Text style={styles.supportBullet}>📊</Text>
            <Text style={styles.supportText}>
              <Text style={styles.supportBold}>Integrated Tracking:</Text> Log symptoms for hair, weight, and cycle, alongside lifestyle factors (diet, exercise, stress, sleep).
            </Text>
          </View>

          <View style={styles.supportItem}>
            <Text style={styles.supportBullet}>🤖</Text>
            <Text style={styles.supportText}>
              <Text style={styles.supportBold}>AI-Driven Insights:</Text> Identify correlations and potential hormonal imbalances based on your logged data.
            </Text>
          </View>

          <View style={styles.supportItem}>
            <Text style={styles.supportBullet}>🎯</Text>
            <Text style={styles.supportText}>
              <Text style={styles.supportBold}>Personalized Programs:</Text> Evidence-based nutrition, stress management, exercise, and supplement recommendations.
            </Text>
          </View>

          <View style={styles.supportItem}>
            <Text style={styles.supportBullet}>👩‍⚕️</Text>
            <Text style={styles.supportText}>
              <Text style={styles.supportBold}>Expert Telemedicine:</Text> Direct access to specialists who can diagnose, prescribe, and guide your treatment.
            </Text>
          </View>

          <View style={styles.supportItem}>
            <Text style={styles.supportBullet}>📈</Text>
            <Text style={styles.supportText}>
              <Text style={styles.supportBold}>Progress Monitoring:</Text> Visual trends and reports showing improvements in symptoms and overall health.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 16,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  introText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
  },
  topicCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  topicTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  topicSubtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 16,
    marginBottom: 8,
  },
  topicList: {
    fontSize: 14,
    color: '#666',
    lineHeight: 24,
    marginBottom: 8,
  },
  hormoneItem: {
    marginBottom: 16,
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#EC4899',
  },
  hormoneName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  hormoneDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  helpBox: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  helpTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#166534',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#166534',
    lineHeight: 20,
  },
  supportCard: {
    marginHorizontal: 24,
    marginBottom: 32,
    backgroundColor: '#FFF5F7',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },
  supportTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  supportItem: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  supportBullet: {
    fontSize: 20,
  },
  supportText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  supportBold: {
    fontWeight: '700',
    color: '#1a1a1a',
  },
});

