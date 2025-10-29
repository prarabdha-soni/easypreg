import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Pill, Activity, Apple, Sparkles, CheckCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function PCOSTreatmentScreen() {
  const router = useRouter();

  const medications = [
    {
      id: 1,
      name: 'Metformin',
      purpose: 'Insulin Resistance',
      description: 'Helps improve insulin sensitivity and regulate menstrual cycles',
      dosage: '500-2000mg daily',
      color: '#3B82F6',
    },
    {
      id: 2,
      name: 'Birth Control Pills',
      purpose: 'Hormone Regulation',
      description: 'Regulates periods, reduces androgen levels, helps with acne',
      dosage: 'As prescribed',
      color: '#EC4899',
    },
    {
      id: 3,
      name: 'Spironolactone',
      purpose: 'Anti-Androgen',
      description: 'Reduces excess hair growth and acne',
      dosage: '50-200mg daily',
      color: '#8B5CF6',
    },
  ];

  const supplements = [
    { name: 'Inositol (Myo & D-Chiro)', benefit: 'Improves insulin sensitivity and ovulation' },
    { name: 'Vitamin D3', benefit: 'Supports hormone balance and fertility' },
    { name: 'Omega-3 Fatty Acids', benefit: 'Reduces inflammation and improves metabolism' },
    { name: 'Berberine', benefit: 'Natural insulin sensitizer' },
    { name: 'Chromium', benefit: 'Helps regulate blood sugar levels' },
    { name: 'Cinnamon', benefit: 'Improves insulin sensitivity' },
  ];

  const lifestyleChanges = [
    {
      title: 'Diet Modifications',
      tips: [
        'Follow low GI diet (whole grains, legumes, vegetables)',
        'Reduce refined carbs and sugar',
        'Include lean proteins (fish, chicken, tofu)',
        'Eat anti-inflammatory foods (berries, leafy greens)',
        'Limit dairy if it triggers symptoms',
      ],
    },
    {
      title: 'Exercise Routine',
      tips: [
        '150 minutes moderate cardio per week',
        'Strength training 2-3 times weekly',
        'High-Intensity Interval Training (HIIT)',
        'Yoga for stress reduction',
        'Daily walking after meals',
      ],
    },
    {
      title: 'Stress Management',
      tips: [
        'Practice daily meditation (10-20 minutes)',
        'Ensure 7-9 hours quality sleep',
        'Try breathing exercises',
        'Reduce caffeine intake',
        'Consider therapy or counseling',
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PCOS/PCOD Treatment</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Overview */}
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Treatment Approach</Text>
          <Text style={styles.overviewText}>
            PCOS treatment focuses on managing symptoms through a combination of medications, lifestyle changes, and supplements. Your personalized plan should be developed with your healthcare provider.
          </Text>
        </View>

        {/* Medications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Pill size={24} color="#EC4899" />
            <Text style={styles.sectionTitle}>Common Medications</Text>
          </View>

          {medications.map((med) => (
            <View key={med.id} style={styles.medCard}>
              <View style={[styles.medIndicator, { backgroundColor: med.color }]} />
              <View style={styles.medContent}>
                <Text style={styles.medName}>{med.name}</Text>
                <Text style={styles.medPurpose}>{med.purpose}</Text>
                <Text style={styles.medDescription}>{med.description}</Text>
                <View style={styles.dosageTag}>
                  <Text style={styles.dosageText}>💊 {med.dosage}</Text>
                </View>
              </View>
            </View>
          ))}

          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              ⚠️ Always consult your doctor before starting any medication. Dosages vary based on individual needs.
            </Text>
          </View>
        </View>

        {/* Supplements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Sparkles size={24} color="#10B981" />
            <Text style={styles.sectionTitle}>Recommended Supplements</Text>
          </View>

          {supplements.map((supplement, index) => (
            <View key={index} style={styles.supplementCard}>
              <CheckCircle size={18} color="#10B981" />
              <View style={styles.supplementContent}>
                <Text style={styles.supplementName}>{supplement.name}</Text>
                <Text style={styles.supplementBenefit}>{supplement.benefit}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Lifestyle Changes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity size={24} color="#F59E0B" />
            <Text style={styles.sectionTitle}>Lifestyle Modifications</Text>
          </View>

          {lifestyleChanges.map((category, index) => (
            <View key={index} style={styles.lifestyleCard}>
              <Text style={styles.lifestyleTitle}>{category.title}</Text>
              {category.tips.map((tip, tipIndex) => (
                <View key={tipIndex} style={styles.tipRow}>
                  <View style={styles.bullet} />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity 
          style={styles.consultButton}
          onPress={() => router.push('/telehealth/providers')}
        >
          <Text style={styles.consultButtonText}>Consult PCOS Specialist</Text>
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
    backgroundColor: '#EC4899',
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
  overviewCard: {
    backgroundColor: '#FFF5F7',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#BE185D',
    marginBottom: 12,
  },
  overviewText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 21,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  medCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  medIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: 16,
  },
  medContent: {
    flex: 1,
  },
  medName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  medPurpose: {
    fontSize: 13,
    fontWeight: '600',
    color: '#EC4899',
    marginBottom: 8,
  },
  medDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 10,
  },
  dosageTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  dosageText: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '600',
  },
  warningBox: {
    backgroundColor: '#FEF3C7',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginTop: 8,
  },
  warningText: {
    fontSize: 13,
    color: '#92400E',
    lineHeight: 19,
  },
  supplementCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  supplementContent: {
    flex: 1,
  },
  supplementName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  supplementBenefit: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  lifestyleCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  lifestyleTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 14,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingLeft: 4,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F59E0B',
    marginTop: 6,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  consultButton: {
    backgroundColor: '#EC4899',
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

