import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { Heart, Calendar, Droplet, TrendingUp, Info, Baby, AlertCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function OvulationScreen() {
  const { profile } = useUser();
  const router = useRouter();

  // Calculate ovulation and fertile window
  const calculateFertility = () => {
    if (!profile.lastPeriodDate) {
      return null;
    }

    const lastPeriod = new Date(profile.lastPeriodDate);
    const cycleLength = profile.cycleLength || 28;
    const today = new Date();

    // Ovulation typically occurs 14 days before next period
    const ovulationDay = cycleLength - 14;
    const ovulationDate = new Date(lastPeriod);
    ovulationDate.setDate(lastPeriod.getDate() + ovulationDay);

    // Fertile window: 5 days before ovulation to 1 day after
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(ovulationDate.getDate() - 5);

    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(ovulationDate.getDate() + 1);

    // Next period date
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(lastPeriod.getDate() + cycleLength);

    // Days until ovulation
    const daysToOvulation = Math.ceil((ovulationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    // Check if today is in fertile window
    const isInFertileWindow = today >= fertileStart && today <= fertileEnd;

    // Conception probability
    let conceptionProbability = 0;
    if (isInFertileWindow) {
      const dayInFertileWindow = Math.ceil((today.getTime() - fertileStart.getTime()) / (1000 * 60 * 60 * 24));
      // Peak fertility 2 days before ovulation to ovulation day
      if (dayInFertileWindow >= 3 && dayInFertileWindow <= 5) {
        conceptionProbability = 95;
      } else if (dayInFertileWindow === 2 || dayInFertileWindow === 6) {
        conceptionProbability = 70;
      } else {
        conceptionProbability = 40;
      }
    }

    return {
      ovulationDate,
      fertileStart,
      fertileEnd,
      nextPeriod,
      daysToOvulation,
      isInFertileWindow,
      conceptionProbability,
    };
  };

  const fertility = calculateFertility();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Baby size={32} color="#EC4899" />
          <Text style={styles.appName}>Fertility & Ovulation</Text>
        </View>
        <Text style={styles.subtitle}>Track your fertile window and conception chances</Text>
      </View>

      {!fertility ? (
        <View style={styles.noDataCard}>
          <AlertCircle size={48} color="#9CA3AF" />
          <Text style={styles.noDataTitle}>No cycle data available</Text>
          <Text style={styles.noDataText}>
            Please log your last period date to see fertility insights
          </Text>
          <TouchableOpacity 
            style={styles.setupButton}
            onPress={() => router.push('/onboarding/period-date')}
          >
            <Text style={styles.setupButtonText}>Set Up Period Tracking</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Fertile Window Status */}
          <LinearGradient
            colors={fertility.isInFertileWindow ? ['#FEE2E2', '#FECACA'] : ['#F3F4F6', '#E5E7EB']}
            style={styles.statusCard}
          >
            <View style={styles.statusHeader}>
              <Heart 
                size={40} 
                color={fertility.isInFertileWindow ? '#EF4444' : '#6B7280'} 
                fill={fertility.isInFertileWindow ? '#EF4444' : 'none'}
              />
              <Text style={styles.statusTitle}>
                {fertility.isInFertileWindow ? 'Fertile Window' : 'Not Fertile Today'}
              </Text>
            </View>
            
            {fertility.isInFertileWindow && (
              <View style={styles.probabilityContainer}>
                <Text style={styles.probabilityLabel}>Conception Probability</Text>
                <Text style={styles.probabilityValue}>{fertility.conceptionProbability}%</Text>
                <View style={styles.probabilityBar}>
                  <View style={[
                    styles.probabilityFill, 
                    { width: `${fertility.conceptionProbability}%`, backgroundColor: '#EF4444' }
                  ]} />
                </View>
              </View>
            )}
          </LinearGradient>

          {/* Ovulation Info */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Calendar size={24} color="#EC4899" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Ovulation Date</Text>
                <Text style={styles.infoValue}>{formatDate(fertility.ovulationDate)}</Text>
                <Text style={styles.infoDetail}>
                  {fertility.daysToOvulation > 0 
                    ? `In ${fertility.daysToOvulation} days` 
                    : fertility.daysToOvulation === 0
                    ? 'Today!'
                    : `${Math.abs(fertility.daysToOvulation)} days ago`}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Heart size={24} color="#EC4899" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Fertile Window</Text>
                <Text style={styles.infoValue}>
                  {formatDate(fertility.fertileStart)} - {formatDate(fertility.fertileEnd)}
                </Text>
                <Text style={styles.infoDetail}>6-day window for conception</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Droplet size={24} color="#EC4899" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Next Period</Text>
                <Text style={styles.infoValue}>{formatDate(fertility.nextPeriod)}</Text>
                <Text style={styles.infoDetail}>Expected start date</Text>
              </View>
            </View>
          </View>

          {/* Calendar View */}
          <View style={styles.calendarCard}>
            <View style={styles.calendarHeader}>
              <TrendingUp size={24} color="#EC4899" />
              <Text style={styles.calendarTitle}>Your Cycle Calendar</Text>
            </View>
            
            <View style={styles.calendarLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#FCA5A5' }]} />
                <Text style={styles.legendText}>Period</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.legendText}>Fertile</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#EC4899' }]} />
                <Text style={styles.legendText}>Ovulation</Text>
              </View>
            </View>
          </View>

          {/* Tips */}
          <View style={styles.tipsCard}>
            <View style={styles.tipsHeader}>
              <Info size={20} color="#3B82F6" />
              <Text style={styles.tipsTitle}>Fertility Tips</Text>
            </View>
            
            {fertility.isInFertileWindow ? (
              <>
                <Text style={styles.tipText}>✨ Peak fertility window! This is the best time to conceive.</Text>
                <Text style={styles.tipText}>💑 Have regular intercourse during this period.</Text>
                <Text style={styles.tipText}>🌡️ Track basal body temperature for accuracy.</Text>
                <Text style={styles.tipText}>💧 Monitor cervical mucus - it should be clear and stretchy.</Text>
              </>
            ) : (
              <>
                <Text style={styles.tipText}>📅 Mark your calendar for the fertile window</Text>
                <Text style={styles.tipText}>🏃‍♀️ Maintain a healthy lifestyle and exercise routine</Text>
                <Text style={styles.tipText}>🥗 Eat a balanced diet rich in nutrients</Text>
                <Text style={styles.tipText}>😴 Get adequate sleep (7-9 hours/night)</Text>
              </>
            )}
          </View>

          {/* Track More */}
          <View style={styles.trackingCard}>
            <Text style={styles.trackingTitle}>Want more accuracy?</Text>
            <Text style={styles.trackingText}>
              Track basal body temperature, cervical mucus, and symptoms for better predictions
            </Text>
            <TouchableOpacity 
              style={styles.trackButton}
              onPress={() => router.push('/log/symptoms')}
            >
              <Text style={styles.trackButtonText}>Track Symptoms</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
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
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#FCE7F3',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  statusCard: {
    margin: 24,
    marginBottom: 16,
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  statusHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 12,
    textAlign: 'center',
  },
  probabilityContainer: {
    alignItems: 'center',
  },
  probabilityLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  probabilityValue: {
    fontSize: 48,
    fontWeight: '700',
    color: '#EF4444',
  },
  probabilityBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 16,
  },
  probabilityFill: {
    height: '100%',
    borderRadius: 4,
  },
  infoCard: {
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    gap: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  infoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF5F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  infoDetail: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  calendarCard: {
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  calendarLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
  },
  tipsCard: {
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E40AF',
  },
  tipText: {
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 24,
    marginBottom: 8,
  },
  trackingCard: {
    marginHorizontal: 24,
    marginBottom: 32,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  trackingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  trackingText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  trackButton: {
    backgroundColor: '#EC4899',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  trackButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  noDataCard: {
    margin: 24,
    padding: 32,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    alignItems: 'center',
  },
  noDataTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 16,
    marginBottom: 8,
  },
  noDataText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  setupButton: {
    backgroundColor: '#EC4899',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  setupButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

