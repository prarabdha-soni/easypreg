import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { BookOpen, Heart, Shield, Star, Trophy, Play, CheckCircle, Lock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const modules = [
  {
    id: 1,
    title: 'Understanding Puberty',
    description: 'Learn about the changes happening in your body',
    icon: '🌱',
    progress: 100,
    unlocked: true,
    lessons: 5,
    completed: 5,
  },
  {
    id: 2,
    title: 'Menstrual Health',
    description: 'Everything about periods and menstrual hygiene',
    icon: '🌸',
    progress: 80,
    unlocked: true,
    lessons: 6,
    completed: 4,
  },
  {
    id: 3,
    title: 'Emotional Wellness',
    description: 'Managing emotions and mental health',
    icon: '💖',
    progress: 60,
    unlocked: true,
    lessons: 4,
    completed: 2,
  },
  {
    id: 4,
    title: 'Healthy Relationships',
    description: 'Building positive relationships with others',
    icon: '🤝',
    progress: 0,
    unlocked: false,
    lessons: 3,
    completed: 0,
  },
  {
    id: 5,
    title: 'Body Safety',
    description: 'Understanding consent and personal boundaries',
    icon: '🛡️',
    progress: 0,
    unlocked: false,
    lessons: 4,
    completed: 0,
  },
  {
    id: 6,
    title: 'Nutrition & Fitness',
    description: 'Healthy eating and exercise for teens',
    icon: '🏃‍♀️',
    progress: 0,
    unlocked: false,
    lessons: 5,
    completed: 0,
  },
];

const achievements = [
  {
    id: 1,
    title: 'First Steps',
    description: 'Completed your first lesson',
    icon: '🎯',
    earned: true,
    date: '2024-01-15',
  },
  {
    id: 2,
    title: 'Knowledge Seeker',
    description: 'Completed 10 lessons',
    icon: '📚',
    earned: true,
    date: '2024-01-20',
  },
  {
    id: 3,
    title: 'Health Champion',
    description: 'Completed all puberty lessons',
    icon: '🏆',
    earned: true,
    date: '2024-01-25',
  },
  {
    id: 4,
    title: 'Wellness Warrior',
    description: 'Completed 25 lessons',
    icon: '⚔️',
    earned: false,
    progress: 20,
  },
  {
    id: 5,
    title: 'Expert Explorer',
    description: 'Completed all modules',
    icon: '🌟',
    earned: false,
    progress: 0,
  },
];

export default function AdolescentScreen() {
  const [selectedModule, setSelectedModule] = useState(null);

  const getProgressColor = (progress) => {
    if (progress === 100) return '#10B981';
    if (progress >= 50) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Teen Wellness Academy</Text>
        <Text style={styles.subtitle}>Learn about your body and health in a safe space</Text>
      </View>

      {/* Progress Overview */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Trophy size={24} color="#8B5CF6" />
          <Text style={styles.progressTitle}>Your Progress</Text>
        </View>
        <View style={styles.progressStats}>
          <View style={styles.progressStat}>
            <Text style={styles.progressNumber}>11</Text>
            <Text style={styles.progressLabel}>Lessons Completed</Text>
          </View>
          <View style={styles.progressStat}>
            <Text style={styles.progressNumber}>3</Text>
            <Text style={styles.progressLabel}>Modules Done</Text>
          </View>
          <View style={styles.progressStat}>
            <Text style={styles.progressNumber}>65%</Text>
            <Text style={styles.progressLabel}>Overall Progress</Text>
          </View>
        </View>
        <View style={styles.overallProgress}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '65%' }]} />
          </View>
        </View>
      </View>

      {/* Learning Modules */}
      <View style={styles.modulesSection}>
        <Text style={styles.sectionTitle}>Learning Modules</Text>
        {modules.map((module) => (
          <TouchableOpacity
            key={module.id}
            style={[
              styles.moduleCard,
              !module.unlocked && styles.lockedModuleCard
            ]}
            onPress={() => module.unlocked && setSelectedModule(module)}
            disabled={!module.unlocked}
          >
            <View style={styles.moduleHeader}>
              <View style={styles.moduleIcon}>
                <Text style={styles.moduleIconText}>{module.icon}</Text>
              </View>
              <View style={styles.moduleInfo}>
                <Text style={styles.moduleTitle}>{module.title}</Text>
                <Text style={styles.moduleDescription}>{module.description}</Text>
                <View style={styles.moduleStats}>
                  <Text style={styles.moduleLessons}>{module.lessons} lessons</Text>
                  <Text style={styles.moduleProgress}>{module.completed}/{module.lessons} completed</Text>
                </View>
              </View>
              <View style={styles.moduleStatus}>
                {module.unlocked ? (
                  module.progress === 100 ? (
                    <CheckCircle size={24} color="#10B981" />
                  ) : (
                    <Play size={24} color="#8B5CF6" />
                  )
                ) : (
                  <Lock size={24} color="#9CA3AF" />
                )}
              </View>
            </View>
            
            {module.unlocked && (
              <View style={styles.moduleProgressBar}>
                <View style={styles.progressTrack}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${module.progress}%`,
                        backgroundColor: getProgressColor(module.progress)
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>{module.progress}%</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Achievements */}
      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsGrid}>
          {achievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementCard}>
              <View style={styles.achievementIcon}>
                <Text style={styles.achievementIconText}>{achievement.icon}</Text>
              </View>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
              {achievement.earned ? (
                <View style={styles.achievementEarned}>
                  <CheckCircle size={16} color="#10B981" />
                  <Text style={styles.achievementEarnedText}>Earned</Text>
                </View>
              ) : (
                <View style={styles.achievementProgress}>
                  <View style={styles.achievementProgressBar}>
                    <View 
                      style={[
                        styles.achievementProgressFill, 
                        { width: `${achievement.progress}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.achievementProgressText}>{achievement.progress}%</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Safety & Privacy */}
      <View style={styles.safetyCard}>
        <View style={styles.safetyHeader}>
          <Shield size={24} color="#10B981" />
          <Text style={styles.safetyTitle}>Safe & Private</Text>
        </View>
        <Text style={styles.safetyDescription}>
          Your learning journey is completely private. No personal information is shared, 
          and you can learn at your own pace in a safe environment.
        </Text>
        <View style={styles.safetyFeatures}>
          <View style={styles.safetyFeature}>
            <CheckCircle size={16} color="#10B981" />
            <Text style={styles.safetyFeatureText}>100% Anonymous</Text>
          </View>
          <View style={styles.safetyFeature}>
            <CheckCircle size={16} color="#10B981" />
            <Text style={styles.safetyFeatureText}>Age-Appropriate Content</Text>
          </View>
          <View style={styles.safetyFeature}>
            <CheckCircle size={16} color="#10B981" />
            <Text style={styles.safetyFeatureText}>Expert-Reviewed</Text>
          </View>
        </View>
      </View>

      {/* Quick Access */}
      <View style={styles.quickAccessSection}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.quickAccessGrid}>
          <TouchableOpacity style={styles.quickAccessItem}>
            <Heart size={24} color="#EF4444" />
            <Text style={styles.quickAccessTitle}>Emergency Help</Text>
            <Text style={styles.quickAccessDesc}>Get help when you need it</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAccessItem}>
            <BookOpen size={24} color="#3B82F6" />
            <Text style={styles.quickAccessTitle}>FAQ</Text>
            <Text style={styles.quickAccessDesc}>Common questions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAccessItem}>
            <Shield size={24} color="#10B981" />
            <Text style={styles.quickAccessTitle}>Privacy Guide</Text>
            <Text style={styles.quickAccessDesc}>Stay safe online</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickAccessItem}>
            <Star size={24} color="#F59E0B" />
            <Text style={styles.quickAccessTitle}>Parent Resources</Text>
            <Text style={styles.quickAccessDesc}>For parents & guardians</Text>
          </TouchableOpacity>
        </View>
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
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#FCE7F3',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  progressCard: {
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
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  progressStat: {
    alignItems: 'center',
    flex: 1,
  },
  progressNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  overallProgress: {
    marginTop: 8,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 4,
  },
  modulesSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  moduleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  lockedModuleCard: {
    opacity: 0.6,
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  moduleIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  moduleIconText: {
    fontSize: 24,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  moduleStats: {
    flexDirection: 'row',
    gap: 16,
  },
  moduleLessons: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  moduleProgress: {
    fontSize: 12,
    color: '#6b7280',
  },
  moduleStatus: {
    marginLeft: 12,
  },
  moduleProgressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  achievementsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    width: (width - 52) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  achievementIconText: {
    fontSize: 20,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  achievementEarned: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  achievementEarnedText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  achievementProgress: {
    width: '100%',
  },
  achievementProgressBar: {
    height: 4,
    backgroundColor: '#f3f4f6',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  achievementProgressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 2,
  },
  achievementProgressText: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
  },
  safetyCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#f0fdf4',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  safetyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  safetyDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  safetyFeatures: {
    gap: 8,
  },
  safetyFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  safetyFeatureText: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  quickAccessSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAccessItem: {
    width: (width - 52) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  quickAccessTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  quickAccessDesc: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});
