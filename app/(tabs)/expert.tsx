import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { BookOpen, Video, Users, Stethoscope, FlaskConical, Building2, ShoppingBag } from 'lucide-react-native';

const articles = [
  {
    title: 'Myths vs Facts: Fertility Edition',
    category: 'myths',
    author: 'Dr. Priya Sharma',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/4506109/pexels-photo-4506109.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'Understanding Your Ovulation Cycle',
    category: 'doctor_tips',
    author: 'Dr. Anjali Mehta',
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'Stress and Fertility: What You Need to Know',
    category: 'lifestyle',
    author: 'Dr. Rahul Desai',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export default function ExpertScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Expert Content</Text>
        <Text style={styles.subtitle}>Learn from the best</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Articles</Text>

        {articles.map((article, index) => (
          <TouchableOpacity key={index} style={styles.articleCard}>
            <Image source={{ uri: article.image }} style={styles.articleImage} />
            <View style={styles.articleContent}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{article.category.replace('_', ' ')}</Text>
              </View>
              <Text style={styles.articleTitle}>{article.title}</Text>
              <View style={styles.articleMeta}>
                <Text style={styles.author}>{article.author}</Text>
                <Text style={styles.readTime}>{article.readTime}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Video size={24} color="#1a1a1a" />
          <Text style={styles.sectionTitle}>Video Library</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.videoScroll}>
          <TouchableOpacity style={styles.videoCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/3958464/pexels-photo-3958464.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              style={styles.videoThumbnail}
            />
            <View style={styles.playButton}>
              <Text style={styles.playIcon}>▶</Text>
            </View>
            <Text style={styles.videoTitle}>Fertility Yoga Series</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.videoCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/6798953/pexels-photo-6798953.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              style={styles.videoThumbnail}
            />
            <View style={styles.playButton}>
              <Text style={styles.playIcon}>▶</Text>
            </View>
            <Text style={styles.videoTitle}>Nutrition Basics</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.videoCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              style={styles.videoThumbnail}
            />
            <View style={styles.playButton}>
              <Text style={styles.playIcon}>▶</Text>
            </View>
            <Text style={styles.videoTitle}>Stress Management</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Users size={24} color="#1a1a1a" />
          <Text style={styles.sectionTitle}>Community</Text>
        </View>

        <View style={styles.communityCard}>
          <Text style={styles.communityTitle}>Anonymous Q&A</Text>
          <Text style={styles.communityText}>
            Connect with others on the same journey. Ask questions and share experiences anonymously.
          </Text>
          <TouchableOpacity style={styles.communityButton}>
            <Text style={styles.communityButtonText}>Join Community</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Partner Services</Text>

        <View style={styles.servicesGrid}>
          <TouchableOpacity style={styles.serviceCard}>
            <FlaskConical size={32} color="#e91e63" />
            <Text style={styles.serviceName}>Lab Tests</Text>
            <Text style={styles.serviceDesc}>Book diagnostic tests</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceCard}>
            <Stethoscope size={32} color="#2196f3" />
            <Text style={styles.serviceName}>Consultations</Text>
            <Text style={styles.serviceDesc}>Talk to specialists</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceCard}>
            <Building2 size={32} color="#4caf50" />
            <Text style={styles.serviceName}>IVF Clinics</Text>
            <Text style={styles.serviceDesc}>Find nearby clinics</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceCard}>
            <ShoppingBag size={32} color="#ff9800" />
            <Text style={styles.serviceName}>Supplements</Text>
            <Text style={styles.serviceDesc}>Fertility vitamins</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.premiumCard}>
        <Text style={styles.premiumBadge}>PREMIUM</Text>
        <Text style={styles.premiumTitle}>Unlock Expert Access</Text>
        <Text style={styles.premiumText}>
          Get personalized insights, AI-based predictions, and direct access to gynecologists.
        </Text>
        <View style={styles.premiumFeatures}>
          <Text style={styles.premiumFeature}>✓ Advanced cycle predictions</Text>
          <Text style={styles.premiumFeature}>✓ Personalized meal plans</Text>
          <Text style={styles.premiumFeature}>✓ Expert webinars</Text>
          <Text style={styles.premiumFeature}>✓ Priority support</Text>
        </View>
        <TouchableOpacity style={styles.premiumButton}>
          <Text style={styles.premiumButtonText}>Upgrade Now</Text>
        </TouchableOpacity>
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
  section: {
    padding: 24,
    paddingTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  articleCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  articleImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#f5f5f5',
  },
  articleContent: {
    padding: 16,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: '#f3f9ff',
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2196f3',
    textTransform: 'capitalize',
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  articleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
  readTime: {
    fontSize: 14,
    color: '#999',
  },
  videoScroll: {
    marginLeft: -24,
    paddingLeft: 24,
  },
  videoCard: {
    width: 200,
    marginRight: 16,
  },
  videoThumbnail: {
    width: 200,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
  },
  playButton: {
    position: 'absolute',
    top: 40,
    left: 80,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    fontSize: 16,
    color: '#1a1a1a',
    marginLeft: 4,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  communityCard: {
    padding: 20,
    backgroundColor: '#f1f8f4',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#c8e6c9',
  },
  communityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  communityText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 21,
    marginBottom: 16,
  },
  communityButton: {
    paddingVertical: 12,
    backgroundColor: '#4caf50',
    borderRadius: 8,
    alignItems: 'center',
  },
  communityButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  serviceCard: {
    width: '47%',
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 12,
    marginBottom: 4,
  },
  serviceDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  premiumCard: {
    margin: 24,
    marginTop: 0,
    padding: 24,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    marginBottom: 32,
  },
  premiumBadge: {
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: '700',
    color: '#ffd700',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  premiumTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  premiumText: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 21,
    marginBottom: 20,
  },
  premiumFeatures: {
    marginBottom: 20,
  },
  premiumFeature: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 8,
  },
  premiumButton: {
    paddingVertical: 16,
    backgroundColor: '#ffd700',
    borderRadius: 12,
    alignItems: 'center',
  },
  premiumButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
});
