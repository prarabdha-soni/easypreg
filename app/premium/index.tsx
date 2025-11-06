import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { SubscriptionService, SubscriptionFeature, SUBSCRIPTION_FEATURES } from '@/services/SubscriptionService';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '@/contexts/UserContext';
import { getCurrentHormonalPhase, getCycleDay, themes } from '@/services/ThemeService';
import { Crown, Check, X, Sparkles, Lock, Zap } from 'lucide-react-native';

export default function PremiumScreen() {
  const { profile } = useUser();
  const { subscription, refreshSubscription } = useSubscription();
  const subscriptionService = SubscriptionService.getInstance();
  
  const [selectedTier, setSelectedTier] = useState<'premium' | 'premium_plus'>('premium');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [processing, setProcessing] = useState(false);

  const phaseKey = profile.lastPeriodDate 
    ? getCurrentHormonalPhase(getCycleDay(profile.lastPeriodDate))
    : 'Follicular';
  const theme = themes[phaseKey];

  const pricing = subscriptionService.getPricing(selectedTier);
  const price = billingCycle === 'yearly' ? pricing.yearly : pricing.monthly;
  const monthlyPrice = selectedTier === 'premium' ? 9.99 : 19.99;
  const savings = billingCycle === 'yearly' ? Math.round(((monthlyPrice * 12 - pricing.yearly) / (monthlyPrice * 12)) * 100) : 0;

  const handleSubscribe = async () => {
    setProcessing(true);
    try {
      // In production, integrate with payment provider (Stripe, RevenueCat, etc.)
      await subscriptionService.subscribe(selectedTier);
      await refreshSubscription();
      Alert.alert('Success!', `Welcome to ${selectedTier === 'premium' ? 'Premium' : 'Premium+'}!`);
    } catch (error) {
      Alert.alert('Error', 'Failed to process subscription. Please try again.');
      console.error('Subscription error:', error);
    } finally {
      setProcessing(false);
    }
  };

  const getFeaturesForTier = (tier: 'free' | 'premium' | 'premium_plus') => {
    return SUBSCRIPTION_FEATURES.filter(f => {
      if (tier === 'premium_plus') return f.premiumPlus;
      if (tier === 'premium') return f.premium;
      return f.free;
    });
  };

  const freeFeatures = getFeaturesForTier('free');
  const premiumFeatures = getFeaturesForTier('premium');
  const premiumPlusFeatures = getFeaturesForTier('premium_plus');

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface }]} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <Crown color="#FFFFFF" size={32} />
        <Text style={styles.pageTitle}>Unlock Premium</Text>
        <Text style={styles.pageSubtitle}>Get the most out of your cycle</Text>
      </LinearGradient>

      {/* Current Plan */}
      {subscription.tier !== 'free' && (
        <View style={[styles.currentPlan, { borderColor: theme.accentColor }]}>
          <Text style={styles.currentPlanText}>
            Current Plan: <Text style={{ fontWeight: '700' }}>{subscription.tier === 'premium' ? 'Premium' : 'Premium+'}</Text>
          </Text>
        </View>
      )}

      {/* Tier Selection */}
      <View style={styles.tierSelection}>
        <TouchableOpacity
          style={[
            styles.tierCard,
            selectedTier === 'premium' && { borderColor: theme.accentColor, borderWidth: 2 },
          ]}
          onPress={() => setSelectedTier('premium')}
        >
          <Text style={styles.tierName}>Premium</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              ${billingCycle === 'yearly' ? (9.99 / 12).toFixed(2) : 9.99}
            </Text>
            <Text style={styles.priceUnit}>/month</Text>
          </View>
          {billingCycle === 'yearly' && (
            <Text style={styles.yearlyPrice}>$79.99/year</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tierCard,
            selectedTier === 'premium_plus' && { borderColor: theme.accentColor, borderWidth: 2 },
          ]}
          onPress={() => setSelectedTier('premium_plus')}
        >
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>MOST POPULAR</Text>
          </View>
          <Text style={styles.tierName}>Premium+</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              ${billingCycle === 'yearly' ? (19.99 / 12).toFixed(2) : 19.99}
            </Text>
            <Text style={styles.priceUnit}>/month</Text>
          </View>
          {billingCycle === 'yearly' && (
            <Text style={styles.yearlyPrice}>$179.99/year</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Billing Cycle */}
      <View style={styles.billingCycle}>
        <TouchableOpacity
          style={[styles.billingOption, billingCycle === 'monthly' && { backgroundColor: theme.accentColor }]}
          onPress={() => setBillingCycle('monthly')}
        >
          <Text style={[styles.billingText, billingCycle === 'monthly' && { color: '#FFFFFF' }]}>
            Monthly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.billingOption, billingCycle === 'yearly' && { backgroundColor: theme.accentColor }]}
          onPress={() => setBillingCycle('yearly')}
        >
          <Text style={[styles.billingText, billingCycle === 'yearly' && { color: '#FFFFFF' }]}>
            Yearly {savings > 0 && `(Save ${savings}%)`}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Features Comparison */}
      <View style={styles.featuresSection}>
        <Text style={[styles.sectionTitle, { color: theme.accentColor }]}>What's Included</Text>
        
        <View style={styles.comparisonTable}>
          <View style={styles.comparisonHeader}>
            <Text style={styles.comparisonHeaderText}>Feature</Text>
            <Text style={styles.comparisonHeaderText}>Free</Text>
            <Text style={styles.comparisonHeaderText}>Premium</Text>
            <Text style={styles.comparisonHeaderText}>Premium+</Text>
          </View>
          
          {SUBSCRIPTION_FEATURES.map((feature) => (
            <View key={feature.id} style={styles.comparisonRow}>
              <Text style={styles.comparisonFeatureName}>{feature.name}</Text>
              <View style={styles.comparisonCell}>
                {feature.free ? <Check color="#10B981" size={20} /> : <X color="#EF4444" size={20} />}
              </View>
              <View style={styles.comparisonCell}>
                {feature.premium ? <Check color="#10B981" size={20} /> : <X color="#EF4444" size={20} />}
              </View>
              <View style={styles.comparisonCell}>
                {feature.premiumPlus ? <Check color="#10B981" size={20} /> : <X color="#EF4444" size={20} />}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Subscribe Button */}
      {subscription.tier === 'free' && (
        <TouchableOpacity
          style={[styles.subscribeButton, { backgroundColor: theme.accentColor }]}
          onPress={handleSubscribe}
          disabled={processing}
        >
          {processing ? (
            <Text style={styles.subscribeButtonText}>Processing...</Text>
          ) : (
            <>
              <Sparkles color="#FFFFFF" size={20} />
              <Text style={styles.subscribeButtonText}>
                Subscribe to {selectedTier === 'premium' ? 'Premium' : 'Premium+'} - ${price}/{billingCycle === 'yearly' ? 'year' : 'month'}
              </Text>
            </>
          )}
        </TouchableOpacity>
      )}

      {/* Benefits */}
      <View style={styles.benefitsSection}>
        <Text style={[styles.sectionTitle, { color: theme.accentColor }]}>Why Upgrade?</Text>
        <View style={styles.benefitCard}>
          <Zap color={theme.accentColor} size={24} />
          <Text style={styles.benefitTitle}>Unlimited Tracking</Text>
          <Text style={styles.benefitText}>Track all symptoms, not just 5</Text>
        </View>
        <View style={styles.benefitCard}>
          <Sparkles color={theme.accentColor} size={24} />
          <Text style={styles.benefitTitle}>AI Insights</Text>
          <Text style={styles.benefitText}>Get personalized pattern recognition</Text>
        </View>
        <View style={styles.benefitCard}>
          <Lock color={theme.accentColor} size={24} />
          <Text style={styles.benefitTitle}>Ad-Free Experience</Text>
          <Text style={styles.benefitText}>Focus on your health without distractions</Text>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { paddingTop: 56, paddingBottom: 32, paddingHorizontal: 20, borderBottomLeftRadius: 28, borderBottomRightRadius: 28, marginBottom: 20, alignItems: 'center' },
  pageTitle: { fontSize: 28, fontWeight: '700', color: '#FFF', marginTop: 12, marginBottom: 6 },
  pageSubtitle: { fontSize: 15, color: 'rgba(255,255,255,0.9)' },
  currentPlan: { marginHorizontal: 20, marginBottom: 20, padding: 16, borderRadius: 12, borderWidth: 2, backgroundColor: '#FFFFFF' },
  currentPlanText: { fontSize: 16, color: '#111827', textAlign: 'center' },
  tierSelection: { flexDirection: 'row', gap: 12, marginHorizontal: 20, marginBottom: 16 },
  tierCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#E5E7EB', alignItems: 'center', position: 'relative' },
  popularBadge: { position: 'absolute', top: -8, backgroundColor: '#F59E0B', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  popularText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.5 },
  tierName: { fontSize: 20, fontWeight: '700', color: '#111827', marginTop: 8, marginBottom: 12 },
  priceContainer: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 },
  price: { fontSize: 28, fontWeight: '700', color: '#111827' },
  priceUnit: { fontSize: 14, color: '#6B7280', marginLeft: 4 },
  yearlyPrice: { fontSize: 12, color: '#6B7280' },
  billingCycle: { flexDirection: 'row', marginHorizontal: 20, marginBottom: 24, gap: 12 },
  billingOption: { flex: 1, paddingVertical: 12, borderRadius: 12, backgroundColor: '#F3F4F6', alignItems: 'center' },
  billingText: { fontSize: 14, fontWeight: '700', color: '#111827' },
  featuresSection: { marginHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  comparisonTable: { backgroundColor: '#FFFFFF', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#E5E7EB' },
  comparisonHeader: { flexDirection: 'row', backgroundColor: '#F9FAFB', paddingVertical: 12, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  comparisonHeaderText: { flex: 1, fontSize: 12, fontWeight: '700', color: '#6B7280', textTransform: 'uppercase' },
  comparisonRow: { flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  comparisonFeatureName: { flex: 2, fontSize: 14, color: '#111827', fontWeight: '600' },
  comparisonCell: { flex: 1, alignItems: 'center' },
  subscribeButton: { marginHorizontal: 20, marginTop: 24, paddingVertical: 16, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  subscribeButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  benefitsSection: { marginHorizontal: 20, marginTop: 24 },
  benefitCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  benefitTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginTop: 12, marginBottom: 4 },
  benefitText: { fontSize: 14, color: '#6B7280', lineHeight: 20 },
});

