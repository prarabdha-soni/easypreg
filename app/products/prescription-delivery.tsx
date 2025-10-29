import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Pill, ArrowLeft, Truck, Shield, Clock, Package, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function PrescriptionDeliveryScreen() {
  const router = useRouter();

  const medications = [
    { name: 'Estradiol (HRT)', price: '₹899', subscription: '₹799/month' },
    { name: 'Progesterone', price: '₹749', subscription: '₹649/month' },
    { name: 'Inositol (PCOS)', price: '₹599', subscription: '₹499/month' },
    { name: 'Vitamin D3', price: '₹349', subscription: '₹299/month' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prescription Delivery</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Pill size={48} color="#8B5CF6" />
          </View>
          <Text style={styles.heroTitle}>Medications Delivered to Your Door</Text>
          <Text style={styles.heroSubtitle}>
            Convenient, discreet delivery of prescribed medications and supplements with auto-refill options.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          
          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Get Your Prescription</Text>
              <Text style={styles.stepDescription}>
                Consult with our providers to get your prescription
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Place Your Order</Text>
              <Text style={styles.stepDescription}>
                Choose one-time purchase or subscription
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Receive at Home</Text>
              <Text style={styles.stepDescription}>
                Discreet packaging delivered within 2-3 days
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Benefits</Text>
          
          <View style={styles.benefitCard}>
            <Truck size={24} color="#10B981" />
            <Text style={styles.benefitTitle}>Free Delivery</Text>
            <Text style={styles.benefitDescription}>On all orders above ₹500</Text>
          </View>

          <View style={styles.benefitCard}>
            <Package size={24} color="#8B5CF6" />
            <Text style={styles.benefitTitle}>Discreet Packaging</Text>
            <Text style={styles.benefitDescription}>Your privacy is our priority</Text>
          </View>

          <View style={styles.benefitCard}>
            <Clock size={24} color="#F59E0B" />
            <Text style={styles.benefitTitle}>Auto-Refill</Text>
            <Text style={styles.benefitDescription}>Never run out of medication</Text>
          </View>

          <View style={styles.benefitCard}>
            <Shield size={24} color="#EF4444" />
            <Text style={styles.benefitTitle}>Quality Assured</Text>
            <Text style={styles.benefitDescription}>Authentic medications from certified pharmacies</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Medications</Text>
          {medications.map((med, index) => (
            <View key={index} style={styles.medCard}>
              <View style={styles.medInfo}>
                <Text style={styles.medName}>{med.name}</Text>
                <Text style={styles.medPrice}>{med.price}</Text>
                {med.subscription && (
                  <Text style={styles.medSubscription}>Subscribe & Save: {med.subscription}</Text>
                )}
              </View>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>View All Medications</Text>
          <ChevronRight size={20} color="#FFFFFF" />
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  hero: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E8D5E8',
  },
  heroIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 23,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    gap: 14,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  benefitCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
    alignItems: 'center',
  },
  benefitTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 6,
  },
  benefitDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  medCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    gap: 14,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  medInfo: {
    flex: 1,
  },
  medName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  medPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  medSubscription: {
    fontSize: 13,
    color: '#10B981',
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
  },
  ctaButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

