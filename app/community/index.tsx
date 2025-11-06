import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Alert, RefreshControl } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { CommunityService, CommunityPost, PostCategory, Comment } from '@/services/CommunityService';
import { LinearGradient } from 'expo-linear-gradient';
import { getCurrentHormonalPhase, getCycleDay, themes } from '@/services/ThemeService';
import { MessageCircle, Heart, Plus, X, Send, Users, Filter } from 'lucide-react-native';

const CATEGORY_LABELS: Record<PostCategory, string> = {
  general: 'General',
  symptoms: 'Symptoms',
  pcos: 'PCOS',
  menopause: 'Menopause',
  workout: 'Workout',
  nutrition: 'Nutrition',
  support: 'Support',
  tips: 'Tips',
};

export default function CommunityScreen() {
  const { profile } = useUser();
  const communityService = CommunityService.getInstance();
  
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PostCategory | null>(null);
  
  // Create post form
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<PostCategory>('general');
  const [newComment, setNewComment] = useState('');

  const phaseKey = profile.lastPeriodDate 
    ? getCurrentHormonalPhase(getCycleDay(profile.lastPeriodDate))
    : 'Follicular';
  const theme = themes[phaseKey];

  useEffect(() => {
    loadPosts();
  }, [selectedCategory]);

  const loadPosts = async () => {
    try {
      const loadedPosts = await communityService.getPosts(selectedCategory || undefined);
      setPosts(loadedPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadPosts();
  };

  const handleCreatePost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      Alert.alert('Error', 'Please fill in both title and content');
      return;
    }

    try {
      const post = await communityService.createPost(
        newPostTitle,
        newPostContent,
        newPostCategory,
        phaseKey,
        []
      );
      setPosts([post, ...posts]);
      setShowCreateModal(false);
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostCategory('general');
      Alert.alert('Success', 'Your post has been shared!');
    } catch (error) {
      Alert.alert('Error', 'Failed to create post. Please try again.');
      console.error('Error creating post:', error);
    }
  };

  const handleToggleLike = async (postId: string) => {
    try {
      await communityService.togglePostLike(postId);
      loadPosts(); // Reload to get updated like status
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleViewComments = async (post: CommunityPost) => {
    setSelectedPost(post);
    try {
      const loadedComments = await communityService.getComments(post.id);
      setComments(loadedComments);
      setShowCommentsModal(true);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !selectedPost) return;

    try {
      await communityService.addComment(selectedPost.id, newComment);
      const loadedComments = await communityService.getComments(selectedPost.id);
      setComments(loadedComments);
      setNewComment('');
      loadPosts(); // Update comment count
    } catch (error) {
      Alert.alert('Error', 'Failed to add comment. Please try again.');
      console.error('Error adding comment:', error);
    }
  };

  const supportGroups = communityService.getSupportGroups();

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <View style={styles.heroHeader}>
          <View>
            <Text style={styles.pageTitle}>Community</Text>
            <Text style={styles.pageSubtitle}>Connect & share experiences</Text>
          </View>
          <TouchableOpacity
            style={[styles.createButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
            onPress={() => setShowCreateModal(true)}
          >
            <Plus color="#FFFFFF" size={20} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContainer}
      >
        <TouchableOpacity
          style={[
            styles.categoryChip,
            !selectedCategory && { backgroundColor: theme.accentColor },
          ]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text style={[styles.categoryText, !selectedCategory && { color: '#FFFFFF' }]}>
            All
          </Text>
        </TouchableOpacity>
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.categoryChip,
              selectedCategory === key && { backgroundColor: theme.accentColor },
            ]}
            onPress={() => setSelectedCategory(key as PostCategory)}
          >
            <Text style={[styles.categoryText, selectedCategory === key && { color: '#FFFFFF' }]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Support Groups */}
      <View style={styles.supportGroupsSection}>
        <Text style={[styles.sectionTitle, { color: theme.accentColor }]}>Support Groups</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.groupsScroll}>
          {supportGroups.map((group) => (
            <TouchableOpacity
              key={group.id}
              style={[styles.groupCard, { borderColor: theme.border }]}
              onPress={() => setSelectedCategory(group.category)}
            >
              <Users color={theme.accentColor} size={20} />
              <Text style={styles.groupName}>{group.name}</Text>
              <Text style={styles.groupDescription}>{group.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Posts List */}
      <ScrollView
        style={styles.postsList}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        {posts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MessageCircle color={theme.accentColor} size={48} />
            <Text style={styles.emptyTitle}>No posts yet</Text>
            <Text style={styles.emptyText}>Be the first to share your experience!</Text>
            <TouchableOpacity
              style={[styles.emptyButton, { backgroundColor: theme.accentColor }]}
              onPress={() => setShowCreateModal(true)}
            >
              <Text style={styles.emptyButtonText}>Create First Post</Text>
            </TouchableOpacity>
          </View>
        ) : (
          posts.map((post) => (
            <View key={post.id} style={[styles.postCard, { borderColor: theme.border }]}>
              <View style={styles.postHeader}>
                <View style={styles.postUserInfo}>
                  <View style={[styles.avatar, { backgroundColor: theme.accentColor + '20' }]}>
                    <Text style={[styles.avatarText, { color: theme.accentColor }]}>
                      {post.userName[0].toUpperCase()}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.userName}>{post.userName}</Text>
                    <Text style={styles.postMeta}>
                      {new Date(post.createdAt).toLocaleDateString()} • {CATEGORY_LABELS[post.category]}
                    </Text>
                  </View>
                </View>
                {post.isPinned && (
                  <View style={styles.pinnedBadge}>
                    <Text style={styles.pinnedText}>📌</Text>
                  </View>
                )}
              </View>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postContent}>{post.content}</Text>
              {post.phase && (
                <View style={[styles.phaseBadge, { backgroundColor: theme.accentColor + '20' }]}>
                  <Text style={[styles.phaseText, { color: theme.accentColor }]}>
                    {post.phase} Phase
                  </Text>
                </View>
              )}
              <View style={styles.postActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleToggleLike(post.id)}
                >
                  <Heart
                    color={post.isLiked ? '#EF4444' : '#6B7280'}
                    size={20}
                    fill={post.isLiked ? '#EF4444' : 'none'}
                  />
                  <Text style={[styles.actionText, post.isLiked && { color: '#EF4444' }]}>
                    {post.likes}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleViewComments(post)}
                >
                  <MessageCircle color="#6B7280" size={20} />
                  <Text style={styles.actionText}>{post.comments}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Create Post Modal */}
      <Modal visible={showCreateModal} transparent animationType="slide" onRequestClose={() => setShowCreateModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Post</Text>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <X color="#6B7280" size={24} />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newPostTitle}
              onChangeText={setNewPostTitle}
              placeholderTextColor="#9CA3AF"
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="What's on your mind?"
              value={newPostContent}
              onChangeText={setNewPostContent}
              multiline
              placeholderTextColor="#9CA3AF"
            />
            <Text style={styles.label}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categorySelect}>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.categoryOption,
                    newPostCategory === key && { backgroundColor: theme.accentColor },
                  ]}
                  onPress={() => setNewPostCategory(key as PostCategory)}
                >
                  <Text style={[styles.categoryOptionText, newPostCategory === key && { color: '#FFFFFF' }]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: theme.accentColor }]}
              onPress={handleCreatePost}
            >
              <Text style={styles.submitButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Comments Modal */}
      <Modal visible={showCommentsModal} transparent animationType="slide" onRequestClose={() => setShowCommentsModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Comments</Text>
              <TouchableOpacity onPress={() => setShowCommentsModal(false)}>
                <X color="#6B7280" size={24} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.commentsList}>
              {comments.length === 0 ? (
                <Text style={styles.noComments}>No comments yet. Be the first!</Text>
              ) : (
                comments.map((comment) => (
                  <View key={comment.id} style={styles.commentCard}>
                    <View style={styles.commentHeader}>
                      <View style={[styles.avatar, { backgroundColor: theme.accentColor + '20' }]}>
                        <Text style={[styles.avatarText, { color: theme.accentColor }]}>
                          {comment.userName[0].toUpperCase()}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.userName}>{comment.userName}</Text>
                        <Text style={styles.commentMeta}>
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.commentContent}>{comment.content}</Text>
                  </View>
                ))
              )}
            </ScrollView>
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                value={newComment}
                onChangeText={setNewComment}
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                style={[styles.sendButton, { backgroundColor: theme.accentColor }]}
                onPress={handleAddComment}
              >
                <Send color="#FFFFFF" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { paddingTop: 56, paddingBottom: 24, paddingHorizontal: 20, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  heroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  pageTitle: { fontSize: 28, fontWeight: '700', color: '#FFF', marginBottom: 6 },
  pageSubtitle: { fontSize: 15, color: 'rgba(255,255,255,0.9)' },
  createButton: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  categoryScroll: { marginTop: 16 },
  categoryContainer: { paddingHorizontal: 20, gap: 8 },
  categoryChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F3F4F6' },
  categoryText: { fontSize: 14, fontWeight: '600', color: '#111827' },
  supportGroupsSection: { marginTop: 20, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginHorizontal: 20, marginBottom: 12 },
  groupsScroll: { paddingHorizontal: 20 },
  groupCard: { width: 200, padding: 16, borderRadius: 12, borderWidth: 1, backgroundColor: '#FFFFFF', marginRight: 12 },
  groupName: { fontSize: 16, fontWeight: '700', color: '#111827', marginTop: 8, marginBottom: 4 },
  groupDescription: { fontSize: 12, color: '#6B7280', lineHeight: 16 },
  postsList: { flex: 1, paddingHorizontal: 20 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#111827', marginTop: 16, marginBottom: 8 },
  emptyText: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 24 },
  emptyButton: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 },
  emptyButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  postCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1 },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  postUserInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, fontWeight: '700' },
  userName: { fontSize: 15, fontWeight: '700', color: '#111827' },
  postMeta: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  pinnedBadge: { padding: 4 },
  pinnedText: { fontSize: 16 },
  postTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 8 },
  postContent: { fontSize: 14, color: '#374151', lineHeight: 20, marginBottom: 12 },
  phaseBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginBottom: 12 },
  phaseText: { fontSize: 12, fontWeight: '700' },
  postActions: { flexDirection: 'row', gap: 24, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  actionButton: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionText: { fontSize: 14, color: '#6B7280', fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '90%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#111827' },
  input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 12, fontSize: 14, color: '#111827', marginBottom: 12 },
  textArea: { minHeight: 120, textAlignVertical: 'top' },
  label: { fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 8 },
  categorySelect: { marginBottom: 20 },
  categoryOption: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F3F4F6', marginRight: 8 },
  categoryOptionText: { fontSize: 14, fontWeight: '600', color: '#111827' },
  submitButton: { paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  submitButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  commentsList: { maxHeight: 400, marginBottom: 16 },
  noComments: { textAlign: 'center', color: '#6B7280', marginTop: 40 },
  commentCard: { marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  commentHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  commentMeta: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  commentContent: { fontSize: 14, color: '#374151', lineHeight: 20, marginLeft: 52 },
  commentInputContainer: { flexDirection: 'row', gap: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  commentInput: { flex: 1, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14 },
  sendButton: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
});

