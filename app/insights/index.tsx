import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Platform, Share } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { InsightsService, Insight } from '@/services/InsightsService';
import { SymptomTrackingService } from '@/services/SymptomTrackingService';
import { LinearGradient } from 'expo-linear-gradient';
import { getCurrentHormonalPhase, getCycleDay, themes } from '@/services/ThemeService';
import { Sparkles, TrendingUp, AlertCircle, Info, Lock, Download, Lightbulb } from 'lucide-react-native';

export default function InsightsScreen() {
  const { profile } = useUser();
  const { subscription, hasFeature } = useSubscription();
  const insightsService = InsightsService.getInstance();
  const symptomService = SymptomTrackingService.getInstance();
  
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [canExport, setCanExport] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const phaseKey = profile.lastPeriodDate 
    ? getCurrentHormonalPhase(getCycleDay(profile.lastPeriodDate))
    : 'Follicular';
  const theme = themes[phaseKey];

  useEffect(() => {
    loadInsights();
    checkExportAccess();
  }, [profile.lastPeriodDate]);

  const checkExportAccess = async () => {
    const exportAccess = await hasFeature('data_export');
    setCanExport(exportAccess);
  };

  const loadInsights = async () => {
    setLoading(true);
    try {
      symptomService.setLastPeriodDate(profile.lastPeriodDate);
      const generatedInsights = await insightsService.generateInsights(profile.lastPeriodDate);
      setInsights(generatedInsights);
    } catch (error) {
      console.error('Error loading insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    if (!canExport) {
      setShowPremiumModal(true);
      return;
    }

    try {
      const csv = await symptomService.exportToCSV();
      if (Platform.OS === 'web') {
        // Web: Download file
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `gloww-data-${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        URL.revokeObjectURL(url);
      } else {
        // Mobile: Share
        await Share.share({
          message: csv,
          title: 'GLOWW Data Export',
        });
      }
      Alert.alert('Success', 'Data exported successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to export data.');
      console.error('Error exporting:', error);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'pattern':
        return <TrendingUp size={20} />;
      case 'prediction':
        return <Lightbulb size={20} />;
      case 'recommendation':
        return <Info size={20} />;
      case 'trend':
        return <Sparkles size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'warning':
        return '#F59E0B';
      case 'positive':
        return '#10B981';
      default:
        return theme.accentColor;
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.surface }]}>
        <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <Text style={styles.pageTitle}>Insights</Text>
          <Text style={styles.pageSubtitle}>Analyzing your patterns...</Text>
        </LinearGradient>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={theme.accentColor} size="large" />
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface }]} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <View style={styles.heroHeader}>
          <View>
            <Text style={styles.pageTitle}>Insights</Text>
            <Text style={styles.pageSubtitle}>Personalized patterns & predictions</Text>
          </View>
          {subscription.tier === 'free' && (
            <TouchableOpacity onPress={() => setShowPremiumModal(true)}>
              <Lock color="#FFFFFF" size={20} />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      {/* Export Button */}
      {insights.length > 0 && (
        <View style={styles.exportContainer}>
          <TouchableOpacity
            style={[styles.exportButton, { borderColor: theme.accentColor }]}
            onPress={handleExport}
          >
            <Download color={theme.accentColor} size={18} />
            <Text style={[styles.exportButtonText, { color: theme.accentColor }]}>
              {canExport ? 'Export Data' : 'Export (Premium)'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Insights List */}
      {insights.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Sparkles color={theme.accentColor} size={48} />
          <Text style={styles.emptyTitle}>Start Tracking to See Insights</Text>
          <Text style={styles.emptyText}>
            Track your symptoms daily for at least 2-3 cycles to unlock personalized insights about your patterns.
          </Text>
        </View>
      ) : (
        <View style={styles.insightsList}>
          {insights.map((insight) => (
            <View
              key={insight.id}
              style={[
                styles.insightCard,
                { borderColor: theme.border, borderLeftColor: getSeverityColor(insight.severity) },
              ]}
            >
              <View style={styles.insightHeader}>
                <View style={[styles.insightIcon, { backgroundColor: getSeverityColor(insight.severity) + '20' }]}>
                  {getInsightIcon(insight.type)}
                </View>
                <View style={styles.insightHeaderText}>
                  <Text style={styles.insightTitle}>{insight.title}</Text>
                  <Text style={styles.insightType}>{insight.type.toUpperCase()}</Text>
                </View>
                {insight.severity === 'warning' && (
                  <AlertCircle color={getSeverityColor(insight.severity)} size={20} />
                )}
              </View>
              <Text style={styles.insightDescription}>{insight.description}</Text>
              <View style={styles.insightFooter}>
                <View style={styles.confidenceBadge}>
                  <Text style={styles.confidenceText}>{insight.confidence}% confidence</Text>
                </View>
                {insight.actionable && insight.actionText && (
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: theme.accentColor + '20' }]}
                  >
                    <Text style={[styles.actionButtonText, { color: theme.accentColor }]}>
                      {insight.actionText}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Premium CTA */}
      {subscription.tier === 'free' && insights.length > 0 && (
        <View style={[styles.premiumCTA, { borderColor: theme.border }]}>
          <Lock color={theme.accentColor} size={24} />
          <Text style={styles.premiumCTATitle}>Unlock Advanced Insights</Text>
          <Text style={styles.premiumCTAText}>
            Get AI-powered pattern recognition, trend analysis, and personalized recommendations with Premium.
          </Text>
          <TouchableOpacity
            style={[styles.premiumCTAButton, { backgroundColor: theme.accentColor }]}
            onPress={() => setShowPremiumModal(true)}
          >
            <Text style={styles.premiumCTAButtonText}>Upgrade to Premium</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ height: 40 }} />

      {/* Premium Modal */}
      {showPremiumModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Lock color={theme.accentColor} size={24} />
              <Text style={styles.modalTitle}>Upgrade to Premium</Text>
            </View>
            <Text style={styles.modalText}>
              Unlock advanced analytics, AI insights, and data export with Premium.
            </Text>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: theme.accentColor }]}
              onPress={() => {
                setShowPremiumModal(false);
                // Navigate to premium screen
              }}
            >
              <Text style={styles.modalButtonText}>View Plans</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowPremiumModal(false)}>
              <Text style={styles.modalCancelText}>Maybe Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { paddingTop: 56, paddingBottom: 28, paddingHorizontal: 20, borderBottomLeftRadius: 28, borderBottomRightRadius: 28, marginBottom: 20 },
  heroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  pageTitle: { fontSize: 28, fontWeight: '700', color: '#FFF', marginBottom: 6 },
  pageSubtitle: { fontSize: 15, color: 'rgba(255,255,255,0.9)' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 60 },
  exportContainer: { marginHorizontal: 20, marginBottom: 20 },
  exportButton: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 12, borderWidth: 1.5, backgroundColor: '#FFFFFF' },
  exportButtonText: { fontSize: 14, fontWeight: '700' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60, paddingHorizontal: 20 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#111827', marginTop: 16, marginBottom: 8 },
  emptyText: { fontSize: 14, color: '#6B7280', textAlign: 'center', lineHeight: 20 },
  insightsList: { paddingHorizontal: 20 },
  insightCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderLeftWidth: 4 },
  insightHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, gap: 12 },
  insightIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  insightHeaderText: { flex: 1 },
  insightTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 4 },
  insightType: { fontSize: 11, color: '#6B7280', fontWeight: '600', letterSpacing: 0.5 },
  insightDescription: { fontSize: 14, color: '#374151', lineHeight: 20, marginBottom: 16 },
  insightFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  confidenceBadge: { backgroundColor: '#F3F4F6', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  confidenceText: { fontSize: 12, color: '#6B7280', fontWeight: '600' },
  actionButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  actionButtonText: { fontSize: 12, fontWeight: '700' },
  premiumCTA: { marginHorizontal: 20, marginTop: 20, padding: 24, borderRadius: 16, borderWidth: 1, backgroundColor: '#FFFFFF', alignItems: 'center' },
  premiumCTATitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginTop: 12, marginBottom: 8 },
  premiumCTAText: { fontSize: 14, color: '#6B7280', textAlign: 'center', lineHeight: 20, marginBottom: 20 },
  premiumCTAButton: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 },
  premiumCTAButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  modalOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24, width: '100%', maxWidth: 400 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#111827' },
  modalText: { fontSize: 15, color: '#6B7280', lineHeight: 22, marginBottom: 24 },
  modalButton: { paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  modalButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  modalCancelText: { textAlign: 'center', fontSize: 14, color: '#6B7280', fontWeight: '600' },
});

