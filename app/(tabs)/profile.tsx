import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { User, Settings, Bell, Heart, Languages, Apple, Calendar, LogOut } from 'lucide-react-native';
import { useState } from 'react';

export default function ProfileScreen() {
  const { profile } = useUser();
  const [notifications, setNotifications] = useState({
    fertileWindow: true,
    diet: true,
    lifestyle: true,
    motivational: true,
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <User size={48} color="#e91e63" />
          </View>
        </View>
        <Text style={styles.name}>Welcome Back!</Text>
        <Text style={styles.email}>Age: {profile.age} • {profile.gender}</Text>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>28</Text>
          <Text style={styles.statLabel}>Day Cycle</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statValue}>85%</Text>
          <Text style={styles.statLabel}>Health Score</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Days Tracked</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Settings</Text>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <User size={20} color="#666" />
            <Text style={styles.settingText}>Personal Information</Text>
          </View>
          <Text style={styles.settingValue}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Calendar size={20} color="#666" />
            <Text style={styles.settingText}>Cycle Details</Text>
          </View>
          <Text style={styles.settingValue}>{profile.cycleLength} days</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Languages size={20} color="#666" />
            <Text style={styles.settingText}>Language</Text>
          </View>
          <Text style={styles.settingValue}>{profile.language}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Apple size={20} color="#666" />
            <Text style={styles.settingText}>Food Preference</Text>
          </View>
          <Text style={styles.settingValue}>{profile.foodPreference}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Bell size={20} color="#1a1a1a" />
          <Text style={styles.sectionTitle}>Notifications</Text>
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingText}>Fertile Window Reminders</Text>
          </View>
          <Switch
            value={notifications.fertileWindow}
            onValueChange={(value) => setNotifications({ ...notifications, fertileWindow: value })}
            trackColor={{ false: '#e0e0e0', true: '#ffcdd2' }}
            thumbColor={notifications.fertileWindow ? '#e91e63' : '#f5f5f5'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingText}>Diet Nudges</Text>
          </View>
          <Switch
            value={notifications.diet}
            onValueChange={(value) => setNotifications({ ...notifications, diet: value })}
            trackColor={{ false: '#e0e0e0', true: '#ffcdd2' }}
            thumbColor={notifications.diet ? '#e91e63' : '#f5f5f5'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingText}>Lifestyle Nudges</Text>
          </View>
          <Switch
            value={notifications.lifestyle}
            onValueChange={(value) => setNotifications({ ...notifications, lifestyle: value })}
            trackColor={{ false: '#e0e0e0', true: '#ffcdd2' }}
            thumbColor={notifications.lifestyle ? '#e91e63' : '#f5f5f5'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingText}>Motivational Messages</Text>
          </View>
          <Switch
            value={notifications.motivational}
            onValueChange={(value) => setNotifications({ ...notifications, motivational: value })}
            trackColor={{ false: '#e0e0e0', true: '#ffcdd2' }}
            thumbColor={notifications.motivational ? '#e91e63' : '#f5f5f5'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Partner Mode</Text>

        <TouchableOpacity style={styles.partnerCard}>
          <Heart size={24} color="#e91e63" />
          <View style={styles.partnerContent}>
            <Text style={styles.partnerTitle}>Connect with Partner</Text>
            <Text style={styles.partnerText}>
              Track both journeys together and share insights
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>More</Text>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Settings size={20} color="#666" />
            <Text style={styles.settingText}>App Settings</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingText}>Privacy Policy</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingText}>Terms of Service</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingText}>Help & Support</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.settingItem, styles.logoutItem]}>
          <View style={styles.settingLeft}>
            <LogOut size={20} color="#f44336" />
            <Text style={[styles.settingText, styles.logoutText]}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
        <Text style={styles.versionSubtext}>Made with love for your fertility journey</Text>
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
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff5f7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#e91e63',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  statsCard: {
    margin: 24,
    marginTop: 0,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    flexDirection: 'row',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    padding: 24,
    paddingTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
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
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
  },
  partnerCard: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff5f7',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f8bbd0',
    gap: 16,
  },
  partnerContent: {
    flex: 1,
  },
  partnerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  partnerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 21,
  },
  logoutItem: {
    marginTop: 8,
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#f44336',
    fontWeight: '600',
  },
  versionContainer: {
    padding: 24,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 10,
    color: '#ccc',
  },
});
