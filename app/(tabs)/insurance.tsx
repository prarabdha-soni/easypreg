import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Shield, CheckCircle, ExternalLink, Phone, Mail } from 'lucide-react-native';

export default function InsuranceScreen() {
  
  const insurancePlans = [
    {
      id: 1,
      name: 'Future Generali Health POWHER',
      company: 'Future Generali',
      coverage: ['Menopause consultations', 'Puberty support', 'Infertility consults', 'Diagnostic tests'],
      color: '#3B82F6',
      bg: '#EFF6FF',
      premium: '₹8,000/year',
      helpline: '1800-220-233',
    },
    {
      id: 2,
      name: 'Tata AIG Women Health',
      company: 'Tata AIG',
      coverage: ['Consultation add-ons', 'Diagnostic tests', 'Mental wellness counseling', 'Annual health checkups'],
      color: '#EC4899',
      bg: '#FDF2F8',
      premium: '₹10,500/year',
      helpline: '1800-266-7780',
    },
    {
      id: 3,
      name: 'HDFC Ergo Women Suraksha',
      company: 'HDFC Ergo',
      coverage: ['Menopause treatments', 'Mental wellness support', 'HRT coverage', 'Preventive care'],
      color: '#10B981',
      bg: '#ECFDF5',
      premium: '₹9,200/year',
      helpline: '1800-419-6969',
    },
    {
      id: 4,
      name: 'Star Women Care Insurance',
      company: 'Star Health',
      coverage: ['Critical illness cover', 'Menopause support', 'Maternity benefits', 'Day care procedures'],
      color: '#F59E0B',
      bg: '#FFFBEB',
      premium: '₹7,500/year',
      helpline: '1800-425-2255',
    },
  ];

  const handleCallHelpline = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Shield size={32} color="#FFFFFF" />
        <Text style={styles.headerTitle}>Insurance</Text>
        <Text style={styles.headerSubtitle}>
          Coverage for menopause care
        </Text>
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Why Insurance Matters</Text>
        <Text style={styles.infoText}>
          Menopause care can be expensive. These specialized women's health insurance plans cover consultations, treatments, and wellness support.
        </Text>
      </View>

      {/* Insurance Plans */}
      <View style={[styles.section, styles.firstSection]}>
        <Text style={styles.sectionTitle}>Available Plans</Text>
        <Text style={styles.sectionSubtitle}>
          Compare coverage options for menopause care
        </Text>

        {insurancePlans.map((plan) => (
          <View key={plan.id} style={styles.planCard}>
            {/* Plan Header */}
            <View style={styles.planHeader}>
              <View style={[styles.planIcon, { backgroundColor: plan.bg }]}>
                <Shield size={24} color={plan.color} />
              </View>
              <View style={styles.planTitleContainer}>
                <Text style={styles.planName}>{plan.name}</Text>
                <Text style={styles.planCompany}>{plan.company}</Text>
              </View>
            </View>

            {/* Premium */}
            <View style={styles.premiumContainer}>
              <Text style={styles.premiumLabel}>Premium</Text>
              <Text style={styles.premiumValue}>{plan.premium}</Text>
            </View>

            {/* Coverage */}
            <Text style={styles.coverageTitle}>Coverage Details</Text>
            <View style={styles.coverageList}>
              {plan.coverage.map((item, index) => (
                <View key={index} style={styles.coverageItem}>
                  <CheckCircle size={16} color="#10B981" />
                  <Text style={styles.coverageText}>{item}</Text>
                </View>
              ))}
            </View>

            {/* Actions */}
            <View style={styles.planActions}>
              <TouchableOpacity 
                style={styles.callButton}
                onPress={() => handleCallHelpline(plan.helpline)}
              >
                <Phone size={16} color="#6B7280" />
                <Text style={styles.callButtonText}>Call Helpline</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.learnMoreButton, { backgroundColor: plan.color }]}>
                <Text style={styles.learnMoreText}>Learn More</Text>
                <ExternalLink size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Help Section */}
      <View style={styles.helpSection}>
        <Text style={styles.helpTitle}>Need Help Choosing?</Text>
        <Text style={styles.helpText}>
          Our team can help you compare plans and find the best coverage for your needs.
        </Text>
        <TouchableOpacity style={styles.contactButton}>
          <Mail size={18} color="#8B5A8F" />
          <Text style={styles.contactButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
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
    paddingBottom: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  infoCard: {
    backgroundColor: '#EFF6FF',
    marginHorizontal: 20,
    marginTop: 24,
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 21,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  firstSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5A3A5A',
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#8B7280',
    marginBottom: 18,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  planHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  planIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planTitleContainer: {
    flex: 1,
  },
  planName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  planCompany: {
    fontSize: 14,
    color: '#6B7280',
  },
  premiumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  premiumLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  premiumValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  coverageTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  coverageList: {
    gap: 10,
    marginBottom: 16,
  },
  coverageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  coverageText: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
  },
  planActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  callButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  learnMoreButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
  },
  learnMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  helpSection: {
    backgroundColor: '#F3E8F3',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8D5E8',
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5A3A5A',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 16,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#8B5A8F',
    backgroundColor: '#FFFFFF',
  },
  contactButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8B5A8F',
  },
});

