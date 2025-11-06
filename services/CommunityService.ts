import AsyncStorage from '@react-native-async-storage/async-storage';

export type PostCategory = 
  | 'general' 
  | 'symptoms' 
  | 'pcos' 
  | 'menopause' 
  | 'workout' 
  | 'nutrition' 
  | 'support' 
  | 'tips';

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string; // Anonymous display name
  category: PostCategory;
  title: string;
  content: string;
  phase?: 'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal';
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isPinned: boolean;
  tags: string[];
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

export interface CycleBuddy {
  id: string;
  userId: string;
  userName: string;
  avatar?: string;
  cycleSyncStatus: 'synced' | 'close' | 'different';
  lastActive: string;
  isConnected: boolean;
}

export class CommunityService {
  private static instance: CommunityService;
  private static POSTS_KEY = '@community_posts';
  private static COMMENTS_KEY = '@community_comments';
  private static BUDDIES_KEY = '@cycle_buddies';
  private static USER_ID_KEY = '@user_id';

  private constructor() {}

  public static getInstance(): CommunityService {
    if (!CommunityService.instance) {
      CommunityService.instance = new CommunityService();
    }
    return CommunityService.instance;
  }

  // Generate or get user ID
  private async getUserId(): Promise<string> {
    let userId = await AsyncStorage.getItem(CommunityService.USER_ID_KEY);
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await AsyncStorage.setItem(CommunityService.USER_ID_KEY, userId);
    }
    return userId;
  }

  // Generate anonymous display name
  private async getUserName(): Promise<string> {
    const userId = await this.getUserId();
    // Use a hash of userId to generate consistent anonymous name
    const hash = userId.split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0) | 0;
    }, 0);
    const names = ['Moon', 'Star', 'Bloom', 'Glow', 'Luna', 'Aurora', 'Willow', 'River', 'Sky', 'Ocean'];
    return `${names[Math.abs(hash) % names.length]}${Math.abs(hash) % 1000}`;
  }

  // Get all posts
  public async getPosts(category?: PostCategory, limit?: number): Promise<CommunityPost[]> {
    try {
      const stored = await AsyncStorage.getItem(CommunityService.POSTS_KEY);
      const posts: CommunityPost[] = stored ? JSON.parse(stored) : [];
      
      let filtered = category 
        ? posts.filter(p => p.category === category)
        : posts;
      
      // Sort by pinned first, then by date
      filtered.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      
      return limit ? filtered.slice(0, limit) : filtered;
    } catch (error) {
      console.error('Error loading posts:', error);
      return [];
    }
  }

  // Create a new post
  public async createPost(
    title: string,
    content: string,
    category: PostCategory,
    phase?: 'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal',
    tags: string[] = []
  ): Promise<CommunityPost> {
    const userId = await this.getUserId();
    const userName = await this.getUserName();
    const now = new Date().toISOString();
    
    const post: CommunityPost = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      userName,
      category,
      title,
      content,
      phase,
      createdAt: now,
      updatedAt: now,
      likes: 0,
      comments: 0,
      isLiked: false,
      isPinned: false,
      tags,
    };
    
    try {
      const stored = await AsyncStorage.getItem(CommunityService.POSTS_KEY);
      const posts: CommunityPost[] = stored ? JSON.parse(stored) : [];
      posts.push(post);
      await AsyncStorage.setItem(CommunityService.POSTS_KEY, JSON.stringify(posts));
      return post;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  // Like/unlike a post
  public async togglePostLike(postId: string): Promise<boolean> {
    try {
      const stored = await AsyncStorage.getItem(CommunityService.POSTS_KEY);
      const posts: CommunityPost[] = stored ? JSON.parse(stored) : [];
      const post = posts.find(p => p.id === postId);
      
      if (!post) return false;
      
      const userId = await this.getUserId();
      const likeKey = `@post_like:${postId}:${userId}`;
      const isLiked = !!(await AsyncStorage.getItem(likeKey));
      
      if (isLiked) {
        await AsyncStorage.removeItem(likeKey);
        post.likes = Math.max(0, post.likes - 1);
        post.isLiked = false;
      } else {
        await AsyncStorage.setItem(likeKey, '1');
        post.likes += 1;
        post.isLiked = true;
      }
      
      await AsyncStorage.setItem(CommunityService.POSTS_KEY, JSON.stringify(posts));
      return !isLiked;
    } catch (error) {
      console.error('Error toggling like:', error);
      return false;
    }
  }

  // Get comments for a post
  public async getComments(postId: string): Promise<Comment[]> {
    try {
      const stored = await AsyncStorage.getItem(CommunityService.COMMENTS_KEY);
      const comments: Comment[] = stored ? JSON.parse(stored) : [];
      return comments
        .filter(c => c.postId === postId)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } catch (error) {
      console.error('Error loading comments:', error);
      return [];
    }
  }

  // Add a comment
  public async addComment(postId: string, content: string): Promise<Comment> {
    const userId = await this.getUserId();
    const userName = await this.getUserName();
    const now = new Date().toISOString();
    
    const comment: Comment = {
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      postId,
      userId,
      userName,
      content,
      createdAt: now,
      likes: 0,
      isLiked: false,
    };
    
    try {
      const stored = await AsyncStorage.getItem(CommunityService.COMMENTS_KEY);
      const comments: Comment[] = stored ? JSON.parse(stored) : [];
      comments.push(comment);
      await AsyncStorage.setItem(CommunityService.COMMENTS_KEY, JSON.stringify(comments));
      
      // Update post comment count
      const postsStored = await AsyncStorage.getItem(CommunityService.POSTS_KEY);
      const posts: CommunityPost[] = postsStored ? JSON.parse(postsStored) : [];
      const post = posts.find(p => p.id === postId);
      if (post) {
        post.comments += 1;
        await AsyncStorage.setItem(CommunityService.POSTS_KEY, JSON.stringify(posts));
      }
      
      return comment;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  // Get cycle buddies
  public async getCycleBuddies(): Promise<CycleBuddy[]> {
    try {
      const stored = await AsyncStorage.getItem(CommunityService.BUDDIES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading buddies:', error);
      return [];
    }
  }

  // Add a cycle buddy (by user ID or code)
  public async addCycleBuddy(buddyUserId: string, buddyUserName: string): Promise<CycleBuddy> {
    const buddies = await this.getCycleBuddies();
    
    // Check if already exists
    if (buddies.some(b => b.userId === buddyUserId)) {
      throw new Error('Buddy already added');
    }
    
    const buddy: CycleBuddy = {
      id: `buddy_${Date.now()}`,
      userId: buddyUserId,
      userName: buddyUserName,
      cycleSyncStatus: 'different', // Would calculate based on cycle data
      lastActive: new Date().toISOString(),
      isConnected: true,
    };
    
    buddies.push(buddy);
    await AsyncStorage.setItem(CommunityService.BUDDIES_KEY, JSON.stringify(buddies));
    return buddy;
  }

  // Generate share code for cycle buddy
  public async generateShareCode(): Promise<string> {
    const userId = await this.getUserId();
    // Simple encoding - in production, use proper encryption
    // Using btoa for web compatibility, or a simple hash for React Native
    if (typeof btoa !== 'undefined') {
      return btoa(userId).substring(0, 8).toUpperCase();
    }
    // Fallback: use first 8 characters of a hash
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      const char = userId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36).substring(0, 8).toUpperCase();
  }

  // Decode share code to user ID
  public decodeShareCode(code: string): string | null {
    try {
      // In production, use proper decryption
      // For now, return null as this is a simplified version
      return null;
    } catch {
      return null;
    }
  }

  // Get support groups (predefined groups)
  public getSupportGroups(): Array<{
    id: string;
    name: string;
    description: string;
    memberCount: number;
    category: PostCategory;
  }> {
    return [
      {
        id: 'pcos',
        name: 'PCOS Support',
        description: 'Connect with others managing PCOS',
        memberCount: 0, // Would calculate from actual data
        category: 'pcos',
      },
      {
        id: 'menopause',
        name: 'Menopause Journey',
        description: 'Support for perimenopause and menopause',
        memberCount: 0,
        category: 'menopause',
      },
      {
        id: 'irregular',
        name: 'Irregular Cycles',
        description: 'Support for managing irregular cycles',
        memberCount: 0,
        category: 'symptoms',
      },
      {
        id: 'fertility',
        name: 'Fertility & TTC',
        description: 'Support for those trying to conceive',
        memberCount: 0,
        category: 'general',
      },
    ];
  }
}

