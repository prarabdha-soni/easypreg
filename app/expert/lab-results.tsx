import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Beaker, ArrowLeft, TrendingUp, TrendingDown, AlertCircle, Upload } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function LabResultsScreen() {
  const router = useRouter();

  const recentTests = [
    {
      id: 1,
      name: 'Estradiol (E2)',
      value: '45 pg/mL',
      range: '< 30 pg/mL (Postmenopause)',
      status: 'normal',
      trend: 'down',
      interpretation: 'Your estrogen levels are within the expected range for perimenopause',
    },
    {
      id: 2,
      name: 'FSH (Follicle Stimulating Hormone)',
      value: '35 mIU/mL',
      range: '> 30 mIU/mL (Menopause)',
      status: 'elevated',
      trend: 'up',
      interpretation: 'Elevated FSH confirms menopausal transition',
    },
    {
      id: 3,
      name: 'TSH (Thyroid)',
      value: '2.1 mIU/L',
      range: '0.4 - 4.0 mIU/L',
      status: 'normal',
      trend: 'stable',
      interpretation: 'Thyroid function is normal',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lab & Screening</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.uploadCard}>
          <Upload size={24} color="#8B5A8F" />
          <View style={styles.uploadContent}>
            <Text style={styles.uploadTitle}>Upload Lab Results</Text>
            <Text style={styles.uploadDescription}>
              Get automated explanations from our AI
            </Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Recent Hormone Tests</Text>
        <Text style={styles.sectionSubtitle}>
          Last updated: 2 weeks ago
        </Text>

        {recentTests.map((test) => (
          <View key={test.id} style={styles.testCard}>
            <View style={styles.testHeader}>
              <Text style={styles.testName}>{test.name}</Text>
              {test.trend === 'up' && <TrendingUp size={16} color="#EF4444" />}
              {test.trend === 'down' && <TrendingDown size={16} color="#10B981" />}
            </View>

            <View style={styles.testValues}>
              <View>
                <Text style={styles.valueLabel}>Your Result</Text>
                <Text style={styles.valueText}>{test.value}</Text>
              </View>
              <View>
                <Text style={styles.valueLabel}>Reference Range</Text>
                <Text style={styles.rangeText}>{test.range}</Text>
              </View>
            </View>

            <View style={[
              styles.statusBadge,
              test.status === 'normal' && styles.statusNormal,
              test.status === 'elevated' && styles.statusElevated,
            ]}>
              <Text style={[
                styles.statusText,
                test.status === 'normal' && styles.statusTextNormal,
                test.status === 'elevated' && styles.statusTextElevated,
              ]}>
                {test.status === 'normal' ? 'Normal' : 'Elevated'}
              </Text>
            </View>

            <View style={styles.interpretationBox}>
              <AlertCircle size={16} color="#6366F1" />
              <Text style={styles.interpretationText}>
                {test.interpretation}
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Understanding Your Results</Text>
          <Text style={styles.infoText}>
            Hormone levels naturally fluctuate during menopause. These results help your doctor personalize your treatment plan. Always discuss results with your healthcare provider.
          </Text>
        </View>

        <TouchableOpacity style={styles.scheduleButton}>
          <Text style={styles.scheduleButtonText}>Schedule Follow-up Test</Text>
        </TouchableOpacity>
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
    backgroundColor: '#8B5A8F',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    padding: 20,
  },
  uploadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#F3E8F3',
    padding: 18,
    borderRadius: 14,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#8B5A8F',
    marginBottom: 24,
  },
  uploadContent: {
    flex: 1,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5A3A5A',
    marginBottom: 4,
  },
  uploadDescription: {
    fontSize: 13,
    color: '#8B7280',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  testCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  testName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
  },
  testValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  valueLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  valueText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  rangeText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  statusNormal: {
    backgroundColor: '#D1FAE5',
  },
  statusElevated: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextNormal: {
    color: '#065F46',
  },
  statusTextElevated: {
    color: '#92400E',
  },
  interpretationBox: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#EEF2FF',
    padding: 12,
    borderRadius: 10,
  },
  interpretationText: {
    flex: 1,
    fontSize: 13,
    color: '#4338CA',
    lineHeight: 18,
  },
  infoCard: {
    backgroundColor: '#FFF7ED',
    borderRadius: 14,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#C2410C',
    lineHeight: 20,
  },
  scheduleButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  scheduleButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

