import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Settings, Bell, Clock, Heart, MessageCircle, TrendingUp, AlertTriangle, Sun, Zap, Brain } from 'lucide-react-native';
import { NotificationService, NotificationPreferences } from '@/services/NotificationService';

export default function NotificationSettingsScreen() {
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const notificationService = NotificationService.getInstance();

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      // Initialize the notification service first
      await notificationService.initialize();
      const prefs = notificationService.getPreferences();
      
      if (prefs) {
        setPreferences(prefs);
      } else {
        // Fallback to default preferences if none exist
        const defaultPrefs: NotificationPreferences = {
          periodReminders: true,
          ovulationReminders: true,
          symptomLogging: true,
          healthTips: true,
          positiveAffirmations: true,
          monthlySummary: true,
          irregularityAlerts: true,
          dailyCheckin: true,
          highFrequency: true,
          intervalMinutes: 15,
          quietHours: {
            enabled: false,
            start: '22:00',
            end: '08:00'
          },
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        setPreferences(defaultPrefs);
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
      // Set fallback preferences on error
      const fallbackPrefs: NotificationPreferences = {
        periodReminders: true,
        ovulationReminders: true,
        symptomLogging: true,
        healthTips: true,
        positiveAffirmations: true,
        monthlySummary: true,
        irregularityAlerts: true,
        dailyCheckin: true,
        highFrequency: true,
        intervalMinutes: 15,
        quietHours: {
          enabled: false,
          start: '22:00',
          end: '08:00'
        },
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
      setPreferences(fallbackPrefs);
    } finally {
      setLoading(false);
    }
  };

  const updatePreference = async (key: keyof NotificationPreferences, value: any) => {
    if (!preferences) return;

    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    
    try {
      await notificationService.updatePreferences(newPreferences);
    } catch (error) {
      console.error('Error updating preferences:', error);
      Alert.alert('Error', 'Failed to update notification settings');
    }
  };

  const updateQuietHours = async (key: 'start' | 'end', value: string) => {
    if (!preferences) return;

    const newPreferences = {
      ...preferences,
      quietHours: {
        ...preferences.quietHours,
        [key]: value
      }
    };
    setPreferences(newPreferences);
    
    try {
      await notificationService.updatePreferences(newPreferences);
    } catch (error) {
      console.error('Error updating quiet hours:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading settings...</Text>
      </View>
    );
  }

  if (!preferences) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load notification settings</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Settings size={24} color="#EC4899" />
        <Text style={styles.headerTitle}>Notification Settings</Text>
        <Text style={styles.headerSubtitle}>Customize your wellness reminders</Text>
      </View>

      {/* Active Notifications Preview */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Zap size={20} color="#EC4899" />
          <Text style={styles.sectionTitle}>Active Notifications</Text>
        </View>
        <Text style={styles.sectionDescription}>Your scheduled smart notifications</Text>
        
        <View style={styles.notificationCards}>
          <View style={styles.notificationCard}>
            <View style={styles.notificationIconContainer}>
              <Clock size={20} color="#EC4899" />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Period Reminder</Text>
              <Text style={styles.notificationSubtitle}>Expected in 3 days</Text>
              <Text style={styles.notificationTime}>Tomorrow at 8:00 AM</Text>
            </View>
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>Active</Text>
            </View>
          </View>

          <View style={styles.notificationCard}>
            <View style={styles.notificationIconContainer}>
              <Heart size={20} color="#EC4899" />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Fertile Window</Text>
              <Text style={styles.notificationSubtitle}>Peak fertility days</Text>
              <Text style={styles.notificationTime}>Daily at 9:00 AM</Text>
            </View>
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>Active</Text>
            </View>
          </View>

          <View style={styles.notificationCard}>
            <View style={styles.notificationIconContainer}>
              <Brain size={20} color="#EC4899" />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Health Check-in</Text>
              <Text style={styles.notificationSubtitle}>Log symptoms & mood</Text>
              <Text style={styles.notificationTime}>Daily at 7:00 PM</Text>
            </View>
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>Active</Text>
            </View>
          </View>

          <View style={styles.notificationCard}>
            <View style={styles.notificationIconContainer}>
              <Text style={styles.emojiIcon}>✨</Text>
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Skin Health</Text>
              <Text style={styles.notificationSubtitle}>Cycle-based skincare tips</Text>
              <Text style={styles.notificationTime}>Daily at 2:00 PM</Text>
            </View>
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>Active</Text>
            </View>
          </View>

          <View style={styles.notificationCard}>
            <View style={styles.notificationIconContainer}>
              <Text style={styles.emojiIcon}>💇‍♀️</Text>
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Hair Care</Text>
              <Text style={styles.notificationSubtitle}>Hormone-friendly hair tips</Text>
              <Text style={styles.notificationTime}>Daily at 3:00 PM</Text>
            </View>
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>Active</Text>
            </View>
          </View>

          <View style={styles.notificationCard}>
            <View style={styles.notificationIconContainer}>
              <Text style={styles.emojiIcon}>⚖️</Text>
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Weight Management</Text>
              <Text style={styles.notificationSubtitle}>Cycle-aware nutrition tips</Text>
              <Text style={styles.notificationTime}>Daily at 4:00 PM</Text>
            </View>
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>Active</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Period & Cycle Reminders */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Period & Cycle Reminders</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Bell size={20} color="#EC4899" />
            <View style={styles.settingText}>
              <Text style={styles.settingName}>Period Start Reminder</Text>
              <Text style={styles.settingDescription}>Get notified 1 day before your expected period</Text>
            </View>
          </View>
          <Switch
            value={preferences.periodReminders}
            onValueChange={(value) => updatePreference('periodReminders', value)}
            trackColor={{ false: '#e5e7eb', true: '#EC4899' }}
            thumbColor={preferences.periodReminders ? '#ffffff' : '#f3f4f6'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Heart size={20} color="#EC4899" />
            <View style={styles.settingText}>
              <Text style={styles.settingName}>Ovulation Reminder</Text>
              <Text style={styles.settingDescription}>Fertility awareness notifications</Text>
            </View>
          </View>
          <Switch
            value={preferences.ovulationReminders}
            onValueChange={(value) => updatePreference('ovulationReminders', value)}
            trackColor={{ false: '#e5e7eb', true: '#EC4899' }}
            thumbColor={preferences.ovulationReminders ? '#ffffff' : '#f3f4f6'}
          />
        </View>
      </View>

      {/* Smart Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Smart Notifications</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Bell size={20} color="#EC4899" />
            <View style={styles.settingText}>
              <Text style={styles.settingName}>High Frequency Mode</Text>
              <Text style={styles.settingDescription}>Send a notification every 15 minutes</Text>
            </View>
          </View>
          <Switch
            value={preferences.highFrequency}
            onValueChange={(value) => updatePreference('highFrequency', value)}
            trackColor={{ false: '#e5e7eb', true: '#EC4899' }}
            thumbColor={preferences.highFrequency ? '#ffffff' : '#f3f4f6'}
          />
        </View>

        {preferences.highFrequency && (
          <View style={styles.testSection}>
            <Text style={styles.testTitle}>🧪 Test Mode Active</Text>
            <Text style={styles.testDescription}>
              You'll receive dummy notifications every 15 minutes with cycle-based tips and affirmations.
            </Text>
            <TouchableOpacity 
              style={styles.testButton}
              onPress={async () => {
                try {
                  await notificationService.scheduleNotifications();
                  Alert.alert('Success', 'Test notifications scheduled! You should receive them every 15 minutes.');
                } catch (error) {
                  Alert.alert('Error', 'Failed to schedule test notifications');
                }
              }}
            >
              <Text style={styles.testButtonText}>Reschedule Test Notifications</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <MessageCircle size={20} color="#EC4899" />
            <View style={styles.settingText}>
              <Text style={styles.settingName}>Symptom Logging</Text>
              <Text style={styles.settingDescription}>Daily prompts to log symptoms and mood</Text>
            </View>
          </View>
          <Switch
            value={preferences.symptomLogging}
            onValueChange={(value) => updatePreference('symptomLogging', value)}
            trackColor={{ false: '#e5e7eb', true: '#EC4899' }}
            thumbColor={preferences.symptomLogging ? '#ffffff' : '#f3f4f6'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Sun size={20} color="#EC4899" />
            <View style={styles.settingText}>
              <Text style={styles.settingName}>Health Tips</Text>
              <Text style={styles.settingDescription}>Personalized wellness tips based on your cycle</Text>
            </View>
          </View>
          <Switch
            value={preferences.healthTips}
            onValueChange={(value) => updatePreference('healthTips', value)}
            trackColor={{ false: '#e5e7eb', true: '#EC4899' }}
            thumbColor={preferences.healthTips ? '#ffffff' : '#f3f4f6'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Heart size={20} color="#EC4899" />
            <View style={styles.settingText}>
              <Text style={styles.settingName}>Positive Affirmations</Text>
              <Text style={styles.settingDescription}>Daily uplifting messages and motivation</Text>
            </View>
          </View>
          <Switch
            value={preferences.positiveAffirmations}
            onValueChange={(value) => updatePreference('positiveAffirmations', value)}
            trackColor={{ false: '#e5e7eb', true: '#EC4899' }}
            thumbColor={preferences.positiveAffirmations ? '#ffffff' : '#f3f4f6'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Bell size={20} color="#EC4899" />
            <View style={styles.settingText}>
              <Text style={styles.settingName}>Daily Check-in</Text>
              <Text style={styles.settingDescription}>Gentle reminders to open the app</Text>
            </View>
          </View>
          <Switch
            value={preferences.dailyCheckin}
            onValueChange={(value) => updatePreference('dailyCheckin', value)}
            trackColor={{ false: '#e5e7eb', true: '#EC4899' }}
            thumbColor={preferences.dailyCheckin ? '#ffffff' : '#f3f4f6'}
          />
        </View>
      </View>

      {/* Insights & Reports */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Insights & Reports</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <TrendingUp size={20} color="#EC4899" />
            <View style={styles.settingText}>
              <Text style={styles.settingName}>Monthly Summary</Text>
              <Text style={styles.settingDescription}>Cycle trends and wellness insights</Text>
            </View>
          </View>
          <Switch
            value={preferences.monthlySummary}
            onValueChange={(value) => updatePreference('monthlySummary', value)}
            trackColor={{ false: '#e5e7eb', true: '#EC4899' }}
            thumbColor={preferences.monthlySummary ? '#ffffff' : '#f3f4f6'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <AlertTriangle size={20} color="#EC4899" />
            <View style={styles.settingText}>
              <Text style={styles.settingName}>Irregularity Alerts</Text>
              <Text style={styles.settingDescription}>Notifications for cycle irregularities</Text>
            </View>
          </View>
          <Switch
            value={preferences.irregularityAlerts}
            onValueChange={(value) => updatePreference('irregularityAlerts', value)}
            trackColor={{ false: '#e5e7eb', true: '#EC4899' }}
            thumbColor={preferences.irregularityAlerts ? '#ffffff' : '#f3f4f6'}
          />
        </View>
      </View>

      {/* Quiet Hours */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quiet Hours</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Clock size={20} color="#EC4899" />
            <View style={styles.settingText}>
              <Text style={styles.settingName}>Enable Quiet Hours</Text>
              <Text style={styles.settingDescription}>Pause notifications during sleep time</Text>
            </View>
          </View>
          <Switch
            value={preferences.quietHours.enabled}
            onValueChange={(value) => updatePreference('quietHours', { ...preferences.quietHours, enabled: value })}
            trackColor={{ false: '#e5e7eb', true: '#EC4899' }}
            thumbColor={preferences.quietHours.enabled ? '#ffffff' : '#f3f4f6'}
          />
        </View>

        {preferences.quietHours.enabled && (
          <View style={styles.quietHoursContainer}>
            <View style={styles.timeSelector}>
              <Text style={styles.timeLabel}>Start Time</Text>
              <TouchableOpacity style={styles.timeButton}>
                <Text style={styles.timeText}>{preferences.quietHours.start}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.timeSelector}>
              <Text style={styles.timeLabel}>End Time</Text>
              <TouchableOpacity style={styles.timeButton}>
                <Text style={styles.timeText}>{preferences.quietHours.end}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Privacy Notice */}
      <View style={styles.privacyNotice}>
        <Text style={styles.privacyTitle}>🔒 Privacy & Data</Text>
        <Text style={styles.privacyText}>
          All your cycle data and preferences are stored locally on your device. 
          We never share your personal health information with third parties.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF7F7',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#FCE7F3',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#EC4899',
    marginTop: 12,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  quietHoursContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f8f9fa',
  },
  timeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  timeLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  timeButton: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EC4899',
  },
  privacyNotice: {
    margin: 20,
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 8,
  },
  privacyText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF7F7',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF7F7',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
  },
  testSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  testTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 8,
  },
  testDescription: {
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 20,
    marginBottom: 12,
  },
  testButton: {
    backgroundColor: '#EC4899',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  testButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  notificationCards: {
    gap: 12,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEFEFE',
    borderWidth: 1,
    borderColor: '#FCE7F3',
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiIcon: {
    fontSize: 20,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  notificationSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 2,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  notificationBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065F46',
  },
});
