import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Bell, Play, Pause, Trash2, Clock, CheckCircle } from 'lucide-react-native';
import { NotificationService, NotificationType } from '@/services/NotificationService';
import * as Notifications from 'expo-notifications';

export default function NotificationTestScreen() {
  const [scheduledNotifications, setScheduledNotifications] = useState<Notifications.NotificationRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const notificationService = NotificationService.getInstance();

  useEffect(() => {
    loadScheduledNotifications();
  }, []);

  const loadScheduledNotifications = async () => {
    try {
      const notifications = await notificationService.getScheduledNotifications();
      setScheduledNotifications(notifications);
    } catch (error) {
      console.error('Error loading scheduled notifications:', error);
    }
  };

  const testNotification = async (type: NotificationType) => {
    try {
      setLoading(true);
      
      // Schedule a test notification for 5 seconds from now
      const trigger: Notifications.NotificationTriggerInput = {
        seconds: 5,
      };

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'EasyPreg Test',
          body: `Test ${type} notification - This is a preview of what you'll receive!`,
          data: { type },
          sound: 'default',
        },
        trigger,
      });

      Alert.alert(
        'Test Notification Scheduled',
        'You will receive a test notification in 5 seconds. Make sure your device is not in silent mode.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error scheduling test notification:', error);
      Alert.alert('Error', 'Failed to schedule test notification');
    } finally {
      setLoading(false);
    }
  };

  const cancelAllNotifications = async () => {
    try {
      await notificationService.cancelAllNotifications();
      await loadScheduledNotifications();
      Alert.alert('Success', 'All notifications have been cancelled');
    } catch (error) {
      console.error('Error cancelling notifications:', error);
      Alert.alert('Error', 'Failed to cancel notifications');
    }
  };

  const rescheduleNotifications = async () => {
    try {
      setLoading(true);
      await notificationService.scheduleNotifications();
      await loadScheduledNotifications();
      Alert.alert('Success', 'All notifications have been rescheduled');
    } catch (error) {
      console.error('Error rescheduling notifications:', error);
      Alert.alert('Error', 'Failed to reschedule notifications');
    } finally {
      setLoading(false);
    }
  };

  const getNotificationTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'period_start': 'Period Start',
      'ovulation': 'Ovulation',
      'symptom_logging': 'Symptom Logging',
      'health_tip': 'Health Tip',
      'positive_affirmation': 'Positive Affirmation',
      'monthly_summary': 'Monthly Summary',
      'irregularity_alert': 'Irregularity Alert',
      'daily_checkin': 'Daily Check-in'
    };
    return labels[type] || type;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Bell size={24} color="#EC4899" />
        <Text style={styles.headerTitle}>Notification Test Center</Text>
        <Text style={styles.headerSubtitle}>Test and manage your notifications</Text>
      </View>

      {/* Test Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Test Notifications</Text>
        <Text style={styles.sectionDescription}>
          Send yourself test notifications to see how they'll appear on your device.
        </Text>
        
        <View style={styles.testButtons}>
          <TouchableOpacity 
            style={styles.testButton}
            onPress={() => testNotification(NotificationType.PERIOD_START)}
            disabled={loading}
          >
            <Play size={16} color="#EC4899" />
            <Text style={styles.testButtonText}>Period Start</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.testButton}
            onPress={() => testNotification(NotificationType.OVULATION)}
            disabled={loading}
          >
            <Play size={16} color="#EC4899" />
            <Text style={styles.testButtonText}>Ovulation</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.testButton}
            onPress={() => testNotification(NotificationType.HEALTH_TIP)}
            disabled={loading}
          >
            <Play size={16} color="#EC4899" />
            <Text style={styles.testButtonText}>Health Tip</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.testButton}
            onPress={() => testNotification(NotificationType.POSITIVE_AFFIRMATION)}
            disabled={loading}
          >
            <Play size={16} color="#EC4899" />
            <Text style={styles.testButtonText}>Affirmation</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Notification Management */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Management</Text>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={rescheduleNotifications}
          disabled={loading}
        >
          <Clock size={20} color="#EC4899" />
          <Text style={styles.actionButtonText}>Reschedule All Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.dangerButton]}
          onPress={cancelAllNotifications}
          disabled={loading}
        >
          <Trash2 size={20} color="#ef4444" />
          <Text style={[styles.actionButtonText, styles.dangerButtonText]}>Cancel All Notifications</Text>
        </TouchableOpacity>
      </View>

      {/* Scheduled Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Scheduled Notifications</Text>
        <Text style={styles.sectionDescription}>
          {scheduledNotifications.length} notifications currently scheduled
        </Text>

        {scheduledNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Bell size={32} color="#d1d5db" />
            <Text style={styles.emptyStateText}>No notifications scheduled</Text>
            <Text style={styles.emptyStateSubtext}>
              Update your cycle data to schedule notifications
            </Text>
          </View>
        ) : (
          <View style={styles.notificationsList}>
            {scheduledNotifications.slice(0, 10).map((notification, index) => (
              <View key={index} style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <Text style={styles.notificationType}>
                    {getNotificationTypeLabel(notification.content.data?.type || 'unknown')}
                  </Text>
                  <Text style={styles.notificationBody}>
                    {notification.content.body}
                  </Text>
                  <Text style={styles.notificationDate}>
                    {formatDate(new Date(notification.trigger.date || Date.now()))}
                  </Text>
                </View>
                <CheckCircle size={16} color="#10b981" />
              </View>
            ))}
            {scheduledNotifications.length > 10 && (
              <Text style={styles.moreText}>
                +{scheduledNotifications.length - 10} more notifications
              </Text>
            )}
          </View>
        )}
      </View>

      {/* Tips */}
      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>💡 Tips</Text>
        <Text style={styles.tipText}>
          • Make sure notifications are enabled in your device settings
        </Text>
        <Text style={styles.tipText}>
          • Test notifications will appear in 5 seconds
        </Text>
        <Text style={styles.tipText}>
          • Check your device's notification center if you don't see them
        </Text>
        <Text style={styles.tipText}>
          • Update your cycle data to schedule personalized notifications
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
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  testButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EC4899',
  },
  testButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EC4899',
    marginLeft: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginLeft: 12,
  },
  dangerButton: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  dangerButtonText: {
    color: '#ef4444',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 12,
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  notificationsList: {
    gap: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  notificationInfo: {
    flex: 1,
  },
  notificationType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EC4899',
    marginBottom: 4,
  },
  notificationBody: {
    fontSize: 14,
    color: '#1a1a1a',
    marginBottom: 4,
    lineHeight: 18,
  },
  notificationDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  moreText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  tipsSection: {
    margin: 20,
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#1e40af',
    marginBottom: 8,
    lineHeight: 20,
  },
});
