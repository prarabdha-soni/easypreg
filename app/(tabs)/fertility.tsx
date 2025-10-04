import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { Calendar, TrendingUp, CircleAlert as AlertCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FertilityScreen() {
  const { profile } = useUser();

  const calculateCycleDay = () => {
    if (!profile.lastPeriodDate) return 1;
    const today = new Date();
    const lastPeriod = new Date(profile.lastPeriodDate);
    
    // Calculate days since last period
    const diffTime = today.getTime() - lastPeriod.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Calculate current cycle day
    const cycleDay = (diffDays % profile.cycleLength) + 1;
    return cycleDay;
  };

  const getFertileWindow = () => {
    const cycleDay = calculateCycleDay();
    
    // More accurate ovulation calculation based on cycle length
    const ovulationDay = profile.cycleLength - 14; // Ovulation typically occurs 14 days before next period
    const fertileStart = ovulationDay - 5; // 5 days before ovulation
    const fertileEnd = ovulationDay + 1; // 1 day after ovulation
    
    // Calculate next fertile window dates
    const nextPeriodDate = new Date(profile.lastPeriodDate);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + profile.cycleLength);
    
    const nextOvulationDate = new Date(nextPeriodDate);
    nextOvulationDate.setDate(nextOvulationDate.getDate() - 14);
    
    const nextFertileStart = new Date(nextOvulationDate);
    nextFertileStart.setDate(nextFertileStart.getDate() - 5);
    
    const nextFertileEnd = new Date(nextOvulationDate);
    nextFertileEnd.setDate(nextFertileEnd.getDate() + 1);

    if (cycleDay >= fertileStart && cycleDay <= fertileEnd) {
      return { 
        status: 'high', 
        day: cycleDay, 
        daysLeft: fertileEnd - cycleDay,
        nextFertileStart: nextFertileStart,
        nextFertileEnd: nextFertileEnd,
        ovulationDate: nextOvulationDate
      };
    } else if (cycleDay < fertileStart) {
      return { 
        status: 'medium', 
        day: cycleDay, 
        daysLeft: fertileStart - cycleDay,
        nextFertileStart: nextFertileStart,
        nextFertileEnd: nextFertileEnd,
        ovulationDate: nextOvulationDate
      };
    } else {
      return { 
        status: 'low', 
        day: cycleDay, 
        daysLeft: profile.cycleLength - cycleDay + fertileStart,
        nextFertileStart: nextFertileStart,
        nextFertileEnd: nextFertileEnd,
        ovulationDate: nextOvulationDate
      };
    }
  };

  const renderCalendar = () => {
    const days = [];
    const today = calculateCycleDay();
    const fertile = getFertileWindow();
    
    // Calculate fertile window based on actual cycle length
    const ovulationDay = profile.cycleLength - 14;
    const fertileStart = ovulationDay - 5;
    const fertileEnd = ovulationDay + 1;

    for (let i = 1; i <= profile.cycleLength; i++) {
      let color = '#f5f5f5';
      let textColor = '#666';

      // Period days (first 5 days)
      if (i <= 5) {
        color = '#ffebee';
        textColor = '#e91e63';
      } 
      // Fertile window
      else if (i >= fertileStart && i <= fertileEnd) {
        color = '#e8f5e9';
        textColor = '#4caf50';
      } 
      // Ovulation day
      else if (i === ovulationDay) {
        color = '#4caf50';
        textColor = '#ffffff';
      }

      if (i === today) {
        days.push(
          <View key={i} style={[styles.calendarDay, { backgroundColor: '#2196f3' }]}>
            <Text style={[styles.calendarDayText, { color: '#ffffff', fontWeight: '700' }]}>{i}</Text>
          </View>
        );
      } else {
        days.push(
          <View key={i} style={[styles.calendarDay, { backgroundColor: color }]}>
            <Text style={[styles.calendarDayText, { color: textColor }]}>{i}</Text>
          </View>
        );
      }
    }

    return days;
  };

  const fertile = getFertileWindow();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fertility Insights</Text>
        <Text style={styles.subtitle}>Track your fertile window</Text>
      </View>

      <LinearGradient
        colors={
          fertile.status === 'high'
            ? ['#4caf50', '#66bb6a']
            : fertile.status === 'medium'
            ? ['#ff9800', '#ffb74d']
            : ['#9e9e9e', '#bdbdbd']
        }
        style={styles.ovulationCard}
      >
        <Text style={styles.ovulationTitle}>
          {fertile.status === 'high' ? 'High Fertility' : fertile.status === 'medium' ? 'Approaching Fertile Window' : 'Low Fertility'}
        </Text>
        <Text style={styles.ovulationSubtitle}>
          {fertile.status === 'high'
            ? `You're in your fertile window! ${fertile.daysLeft} day${fertile.daysLeft !== 1 ? 's' : ''} remaining.`
            : fertile.status === 'medium'
            ? `Your fertile window starts in ${fertile.daysLeft} day${fertile.daysLeft !== 1 ? 's' : ''}.`
            : `Next fertile window in ${fertile.daysLeft} day${fertile.daysLeft !== 1 ? 's' : ''}.`}
        </Text>

        {fertile.nextFertileStart && (
          <View style={styles.dateInfo}>
            <Text style={styles.dateInfoText}>
              Next fertile window: {fertile.nextFertileStart.toLocaleDateString()} - {fertile.nextFertileEnd.toLocaleDateString()}
            </Text>
            <Text style={styles.dateInfoText}>
              Expected ovulation: {fertile.ovulationDate.toLocaleDateString()}
            </Text>
          </View>
        )}

        <View style={styles.probabilityMeter}>
          <View style={styles.meterBar}>
            <View
              style={[
                styles.meterFill,
                {
                  width: fertile.status === 'high' ? '100%' : fertile.status === 'medium' ? '60%' : '20%',
                }
              ]}
            />
          </View>
          <View style={styles.meterLabels}>
            <Text style={styles.meterLabel}>Low</Text>
            <Text style={styles.meterLabel}>Medium</Text>
            <Text style={styles.meterLabel}>High</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Calendar size={24} color="#1a1a1a" />
          <Text style={styles.sectionTitle}>Cycle Calendar</Text>
        </View>

        <View style={styles.calendarGrid}>
          {renderCalendar()}
        </View>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#e91e63' }]} />
            <Text style={styles.legendText}>Period</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#4caf50' }]} />
            <Text style={styles.legendText}>Fertile</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#2196f3' }]} />
            <Text style={styles.legendText}>Today</Text>
          </View>
        </View>
      </View>

      {!profile.isRegular && (
        <View style={styles.alertCard}>
          <AlertCircle size={24} color="#ff9800" />
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Irregular Cycle Detected</Text>
            <Text style={styles.alertText}>
              Consider tracking more data points or consulting with a healthcare provider. We can help you understand patterns.
            </Text>
            <TouchableOpacity style={styles.alertButton}>
              <Text style={styles.alertButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Fertility Tips for Today</Text>
        <View style={styles.tip}>
          <Text style={styles.tipIcon}>💧</Text>
          <Text style={styles.tipText}>Stay hydrated - drink 8-10 glasses of water</Text>
        </View>
        <View style={styles.tip}>
          <Text style={styles.tipIcon}>🥜</Text>
          <Text style={styles.tipText}>Include zinc-rich foods like nuts and seeds</Text>
        </View>
        <View style={styles.tip}>
          <Text style={styles.tipIcon}>😌</Text>
          <Text style={styles.tipText}>Practice stress reduction for 10-15 minutes</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  ovulationCard: {
    margin: 24,
    marginTop: 0,
    padding: 24,
    borderRadius: 20,
  },
  ovulationTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  ovulationSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 24,
    opacity: 0.9,
  },
  probabilityMeter: {
    marginTop: 8,
  },
  meterBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  meterFill: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  meterLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  meterLabel: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.8,
  },
  section: {
    padding: 24,
    paddingTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  calendarDay: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarDayText: {
    fontSize: 14,
    fontWeight: '500',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 8,
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
  alertCard: {
    margin: 24,
    marginTop: 0,
    padding: 20,
    backgroundColor: '#fff8f0',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ffe082',
    flexDirection: 'row',
    gap: 16,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  alertText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 21,
    marginBottom: 12,
  },
  alertButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#ff9800',
    borderRadius: 8,
  },
  alertButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  tipsCard: {
    margin: 24,
    marginTop: 0,
    padding: 20,
    backgroundColor: '#f3f9ff',
    borderRadius: 16,
    marginBottom: 32,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  tipIcon: {
    fontSize: 24,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  dateInfo: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  dateInfoText: {
    fontSize: 13,
    color: '#ffffff',
    marginBottom: 4,
    opacity: 0.9,
  },
});
