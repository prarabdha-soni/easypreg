import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Users, MessageCircle, Heart, Sparkles, Video, BookOpen, Calendar, ThumbsUp } from 'lucide-react-native';
import { useUser } from '@/contexts/UserContext';

export default function CircleScreen() {
  const { profile } = useUser();

  const stageGroups = [
    {
      id: 1,
      name: 'PCOS Warriors',
      members: '32.5K',
      online: '2,456',
      description: 'Managing PCOS with strength',
      color: '#EC4899',
      bg: '#FDF2F8',
      emoji: '💖',
      stage: 'pcos',
    },
    {
      id: 2,
      name: 'PCOD Support Circle',
      members: '18.7K',
      online: '1,567',
      description: 'Together for hormonal balance',
      color: '#F59E0B',
      bg: '#FFFBEB',
      emoji: '💗',
      stage: 'pcod',
    },
    {
      id: 3,
      name: 'Perimenopause Circle',
      members: '15.2K',
      online: '1,234',
      description: 'For women navigating the transition',
      color: '#F08080',
      bg: '#FFF5F5',
      emoji: '🌸',
      stage: 'perimenopause',
    },
    {
      id: 4,
      name: 'Menopause Warriors',
      members: '22.8K',
      online: '2,103',
      description: 'Managing menopause together',
      color: '#8B5A8F',
      bg: '#F3E8F3',
      emoji: '🌙',
      stage: 'menopause',
    },
    {
      id: 5,
      name: 'Postmenopause Thrivers',
      members: '8.5K',
      online: '678',
      description: 'Life after menopause',
      color: '#D4A5D4',
      bg: '#F9F5F9',
      emoji: '✨',
      stage: 'postmenopause',
    },
  ];

  const expertSessions = [
    {
      id: 1,
      expert: 'Dr. Prarabdha Soni',
      title: 'PCOS Diet & Nutrition Tips',
      specialty: 'Endocrinologist',
      date: 'Today, 4:00 PM',
      registered: 312,
      color: '#EC4899',
    },
    {
      id: 2,
      expert: 'Dr. Prarabdha Soni',
      title: 'Managing Hot Flashes Naturally',
      specialty: 'OB-GYN',
      date: 'Tomorrow, 2:00 PM',
      registered: 234,
      color: '#EF4444',
    },
    {
      id: 3,
      expert: 'Dr. Prarabdha Soni',
      title: 'Sleep Solutions for Menopause',
      specialty: 'Sleep Specialist',
      date: 'Friday, 7:00 PM',
      registered: 189,
      color: '#6366F1',
    },
  ];

  const upliftingStories = [
    {
      id: 1,
      author: 'Priya, 28',
      title: 'Lost 8kg with PCOS!',
      preview: 'Through consistent low-GI diet and exercise, I finally feel in control of my body again...',
      likes: 487,
      comments: 92,
      time: '6 hours ago',
      stage: 'pcos',
    },
    {
      id: 2,
      author: 'Jessica, 48',
      title: 'Hot Flashes Reduced by 70%',
      preview: 'After 6 months of lifestyle changes and HRT, my quality of life is transformed...',
      likes: 342,
      comments: 67,
      time: '1 day ago',
      stage: 'perimenopause',
    },
    {
      id: 3,
      author: 'Anjali, 32',
      title: 'My PCOD Journey to Balance',
      preview: 'It took time, but I finally found the right combination of treatment and self-care...',
      likes: 356,
      comments: 78,
      time: '1 day ago',
      stage: 'pcod',
    },
    {
      id: 4,
      author: 'Linda, 52',
      title: 'Finding Myself Again',
      preview: 'Menopause was tough, but I came out stronger. Here\'s what helped me...',
      likes: 289,
      comments: 54,
      time: '2 days ago',
      stage: 'menopause',
    },
    {
      id: 5,
      author: 'Carol, 55',
      title: 'Thriving at 55',
      preview: 'Postmenopause has been liberating! My energy is back and I feel amazing...',
      likes: 256,
      comments: 43,
      time: '3 days ago',
      stage: 'postmenopause',
    },
  ];

  const trendingTopics = [
    { tag: 'PCOS Diet Tips', posts: 523, color: '#EC4899' },
    { tag: 'HRT Success Stories', posts: 456, color: '#8B5A8F' },
    { tag: 'Natural Remedies', posts: 389, color: '#10B981' },
    { tag: 'Sleep Tips', posts: 324, color: '#6366F1' },
    { tag: 'Exercise Routines', posts: 267, color: '#F59E0B' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerBanner}>
        <Users size={32} color="#FFFFFF" />
        <Text style={styles.headerTitle}>Your Circle</Text>
        <Text style={styles.headerSubtitle}>
          Connect, share, and support each other
        </Text>
      </View>

      {/* My Stage Group (Highlighted) */}
      <View style={[styles.section, styles.firstSection]}>
        <Text style={styles.sectionTitle}>Your Stage Group</Text>
        <Text style={styles.sectionSubtitle}>
          Connect with women at the same stage
        </Text>

        {stageGroups
          .filter(group => group.stage === profile.menopauseStage)
          .map((group) => (
            <TouchableOpacity key={group.id} style={[
              styles.featuredGroupCard,
              { borderColor: group.color }
            ]}>
              <View style={styles.groupHeader}>
                <View style={[styles.groupIcon, { backgroundColor: group.bg }]}>
                  <Text style={styles.groupEmoji}>{group.emoji}</Text>
                </View>
                <View style={styles.groupInfo}>
                  <Text style={styles.groupName}>{group.name}</Text>
                  <Text style={styles.groupDescription}>{group.description}</Text>
                </View>
              </View>
              
              <View style={styles.groupStats}>
                <View style={styles.statItem}>
                  <Users size={16} color="#6B7280" />
                  <Text style={styles.statText}>{group.members} members</Text>
                </View>
                <View style={styles.statItem}>
                  <View style={styles.onlineDot} />
                  <Text style={styles.statText}>{group.online} online</Text>
                </View>
              </View>

              <TouchableOpacity style={[styles.joinButton, { backgroundColor: group.color }]}>
                <Text style={styles.joinButtonText}>Join Conversation</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
      </View>

      {/* All Support Groups */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Support Groups</Text>
        
        <View style={styles.groupsGrid}>
          {stageGroups.map((group) => (
            <TouchableOpacity 
              key={group.id} 
              style={[
                styles.groupCard,
                { borderColor: group.color }
              ]}
            >
              <Text style={styles.groupCardEmoji}>{group.emoji}</Text>
              <Text style={styles.groupCardName}>{group.name}</Text>
              <Text style={styles.groupCardMembers}>{group.members} members</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Expert Q&A Sessions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Video size={20} color="#3B82F6" />
          <Text style={styles.sectionTitle}>Expert Q&A Sessions</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          Live sessions with menopause specialists
        </Text>

        {expertSessions.map((session) => (
          <View key={session.id} style={styles.sessionCard}>
            <View style={styles.sessionHeader}>
              <View style={[styles.sessionIcon, { backgroundColor: `${session.color}15` }]}>
                <Video size={20} color={session.color} />
              </View>
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionTitle}>{session.title}</Text>
                <Text style={styles.sessionExpert}>
                  {session.expert} • {session.specialty}
                </Text>
              </View>
            </View>

            <View style={styles.sessionFooter}>
              <View style={styles.sessionMeta}>
                <Calendar size={14} color="#6B7280" />
                <Text style={styles.sessionDate}>{session.date}</Text>
              </View>
              <View style={styles.sessionMeta}>
                <Users size={14} color="#6B7280" />
                <Text style={styles.sessionRegistered}>{session.registered} registered</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Uplifting Stories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Sparkles size={20} color="#F59E0B" />
          <Text style={styles.sectionTitle}>Uplifting Stories</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          Real success stories from our community
        </Text>

        {upliftingStories.map((story) => (
          <TouchableOpacity key={story.id} style={styles.storyCard}>
            <View style={styles.storyHeader}>
              <View style={styles.storyAvatar}>
                <Heart size={16} color="#EC4899" />
              </View>
              <View style={styles.storyAuthorInfo}>
                <Text style={styles.storyAuthor}>{story.author}</Text>
                <Text style={styles.storyTime}>{story.time}</Text>
              </View>
            </View>

            <Text style={styles.storyTitle}>{story.title}</Text>
            <Text style={styles.storyPreview}>{story.preview}</Text>

            <View style={styles.storyFooter}>
              <View style={styles.storyMeta}>
                <ThumbsUp size={14} color="#6B7280" />
                <Text style={styles.storyMetaText}>{story.likes}</Text>
              </View>
              <View style={styles.storyMeta}>
                <MessageCircle size={14} color="#6B7280" />
                <Text style={styles.storyMetaText}>{story.comments}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Trending Topics */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <BookOpen size={20} color="#8B5A8F" />
          <Text style={styles.sectionTitle}>Trending Topics</Text>
        </View>

        <View style={styles.topicsContainer}>
          {trendingTopics.map((topic, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.topicTag, { borderColor: topic.color }]}
            >
              <Text style={[styles.topicText, { color: topic.color }]}>
                #{topic.tag}
              </Text>
              <Text style={styles.topicCount}>{topic.posts} posts</Text>
            </TouchableOpacity>
          ))}
        </View>
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
  headerBanner: {
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
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  firstSection: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
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
  featuredGroupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  groupHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  groupIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupEmoji: {
    fontSize: 28,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  groupDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  groupStats: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 13,
    color: '#6B7280',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  joinButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  joinButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  groupsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  groupCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  groupCardEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  groupCardName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  groupCardMembers: {
    fontSize: 12,
    color: '#6B7280',
  },
  sessionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  sessionHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  sessionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  sessionExpert: {
    fontSize: 13,
    color: '#6B7280',
  },
  sessionFooter: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  sessionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sessionDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  sessionRegistered: {
    fontSize: 12,
    color: '#6B7280',
  },
  registerButton: {
    borderWidth: 1.5,
    borderColor: '#3B82F6',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  storyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8D5E8',
  },
  storyHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  storyAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyAuthorInfo: {
    flex: 1,
  },
  storyAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  storyTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  storyPreview: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  storyFooter: {
    flexDirection: 'row',
    gap: 20,
  },
  storyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  storyMetaText: {
    fontSize: 13,
    color: '#6B7280',
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  topicTag: {
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  topicText: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  topicCount: {
    fontSize: 11,
    color: '#9CA3AF',
  },
});
