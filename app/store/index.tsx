import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { getCycleDay, getCurrentHormonalPhase, themes } from '@/services/ThemeService';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShoppingBag, Package, Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

type Product = {
  id: string;
  name: string;
  category: 'workout' | 'hygiene';
  price: string;
  image?: string;
  rating: number;
  reviews: number;
  description: string;
  phaseRecommended?: string[];
};

const PRODUCTS: Product[] = [
  // Workout Equipment
  { 
    id: 'w1', 
    name: 'Premium Yoga Mat', 
    category: 'workout', 
    price: '₹2,499', 
    rating: 4.8, 
    reviews: 1240, 
    description: 'Non-slip, eco-friendly mat perfect for all phases', 
    phaseRecommended: ['Menstrual', 'Luteal'],
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop'
  },
  { 
    id: 'w2', 
    name: 'Adjustable Dumbbells Set', 
    category: 'workout', 
    price: '₹4,999', 
    rating: 4.7, 
    reviews: 856, 
    description: '2-10kg adjustable weights for strength training', 
    phaseRecommended: ['Follicular', 'Ovulation'],
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop'
  },
  { 
    id: 'w3', 
    name: 'Resistance Bands Set', 
    category: 'workout', 
    price: '₹1,299', 
    rating: 4.6, 
    reviews: 2100, 
    description: '5-band set for full-body workouts', 
    phaseRecommended: ['Follicular', 'Ovulation'],
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=300&fit=crop'
  },
  { 
    id: 'w4', 
    name: 'Pilates Ring', 
    category: 'workout', 
    price: '₹1,899', 
    rating: 4.5, 
    reviews: 634, 
    description: 'Compact pilates ring for core and flexibility', 
    phaseRecommended: ['Luteal', 'Menstrual'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
  },
  { 
    id: 'w5', 
    name: 'Foam Roller', 
    category: 'workout', 
    price: '₹999', 
    rating: 4.7, 
    reviews: 1890, 
    description: 'Muscle recovery and relaxation tool', 
    phaseRecommended: ['Luteal', 'Menstrual'],
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop'
  },
  { 
    id: 'w6', 
    name: 'Meditation Cushion Set', 
    category: 'workout', 
    price: '₹1,599', 
    rating: 4.8, 
    reviews: 450, 
    description: 'Ergonomic cushions for meditation and yoga', 
    phaseRecommended: ['Menstrual', 'Luteal'],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop'
  },
  
  // Hygiene Products
  { 
    id: 'h1', 
    name: 'Organic Cotton Pads (Pack of 30)', 
    category: 'hygiene', 
    price: '₹299', 
    rating: 4.9, 
    reviews: 3200, 
    description: 'Chemical-free, ultra-absorbent pads', 
    phaseRecommended: ['Menstrual'],
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop'
  },
  { 
    id: 'h2', 
    name: 'Menstrual Cup Set', 
    category: 'hygiene', 
    price: '₹899', 
    rating: 4.7, 
    reviews: 1850, 
    description: 'Eco-friendly, reusable cup with storage case', 
    phaseRecommended: ['Menstrual'],
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop'
  },
  { 
    id: 'h3', 
    name: 'Period Panties (3-pack)', 
    category: 'hygiene', 
    price: '₹2,499', 
    rating: 4.8, 
    reviews: 2100, 
    description: 'Leak-proof, breathable period underwear', 
    phaseRecommended: ['Menstrual'],
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=300&fit=crop'
  },
  { 
    id: 'h4', 
    name: 'Herbal Pain Relief Roll-On', 
    category: 'hygiene', 
    price: '₹449', 
    rating: 4.6, 
    reviews: 920, 
    description: 'Natural pain relief for cramps and discomfort', 
    phaseRecommended: ['Menstrual'],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop'
  },
  { 
    id: 'h5', 
    name: 'Organic Tampons (Box of 20)', 
    category: 'hygiene', 
    price: '₹349', 
    rating: 4.7, 
    reviews: 1500, 
    description: '100% organic cotton tampons', 
    phaseRecommended: ['Menstrual'],
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop'
  },
  { 
    id: 'h6', 
    name: 'Intimate Wash (pH Balanced)', 
    category: 'hygiene', 
    price: '₹249', 
    rating: 4.8, 
    reviews: 2800, 
    description: 'Gentle, pH-balanced intimate care', 
    phaseRecommended: ['All'],
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop'
  },
];

export default function StoreScreen() {
  const { profile } = useUser();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'workout' | 'hygiene'>('all');
  
  const phaseKey: 'Menstrual'|'Follicular'|'Ovulation'|'Luteal' = useMemo(() => {
    if (!profile.lastPeriodDate) return 'Follicular';
    return getCurrentHormonalPhase(getCycleDay(profile.lastPeriodDate));
  }, [profile.lastPeriodDate]);
  
  const theme = themes[phaseKey];
  
  const filteredProducts = selectedCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);
  
  const phaseRecommendedProducts = filteredProducts.filter(p => 
    !p.phaseRecommended || p.phaseRecommended.includes(phaseKey) || p.phaseRecommended.includes('All')
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface }]} showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => { try { router.back(); } catch { router.replace('/(tabs)'); } }}>
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.pageTitle}>Cycle Wellness Store 🛍️</Text>
        <Text style={styles.pageSubtitle}>Phase-optimized products for your journey</Text>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryRow}>
        {(['all', 'workout', 'hygiene'] as const).map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryChip,
              selectedCategory === cat && { backgroundColor: theme.accentColor },
              selectedCategory !== cat && { borderColor: theme.border }
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[
              styles.categoryChipText,
              selectedCategory === cat && { color: '#FFFFFF' },
              selectedCategory !== cat && { color: '#111827' }
            ]}>
              {cat === 'all' ? 'All' : cat === 'workout' ? 'Workout' : 'Hygiene'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Phase Recommendation Banner */}
      {phaseRecommendedProducts.length > 0 && (
        <View style={[styles.banner, { backgroundColor: theme.surface, borderColor: theme.accentColor }]}>
          <Text style={[styles.bannerText, { color: theme.accentColor }]}>
            ✨ {phaseRecommendedProducts.length} products recommended for your {phaseKey} phase
          </Text>
        </View>
      )}

      {/* Products Grid */}
      <View style={styles.productsGrid}>
        {filteredProducts.map((product) => {
          const isRecommended = product.phaseRecommended?.includes(phaseKey) || product.phaseRecommended?.includes('All');
          
          return (
            <View key={product.id} style={[styles.productCard, { borderColor: theme.border }]}>
              {isRecommended && (
                <View style={[styles.recommendedBadge, { backgroundColor: theme.accentColor }]}>
                  <Text style={styles.recommendedText}>Recommended</Text>
                </View>
              )}
              
              <View style={styles.productImageContainer}>
                {product.image ? (
                  <Image 
                    source={{ uri: product.image }} 
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.productImagePlaceholder}>
                    {product.category === 'workout' ? (
                      <Package color={theme.accentColor} size={32} />
                    ) : (
                      <Heart color={theme.accentColor} size={32} />
                    )}
                  </View>
                )}
              </View>
              
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                <Text style={styles.productDesc} numberOfLines={2}>{product.description}</Text>
                
                <View style={styles.productRating}>
                  <Text style={styles.stars}>⭐</Text>
                  <Text style={styles.ratingText}>{product.rating}</Text>
                  <Text style={styles.reviewsText}>({product.reviews})</Text>
                </View>
                
                <View style={styles.productFooter}>
                  <Text style={[styles.productPrice, { color: theme.accentColor }]}>{product.price}</Text>
                  <TouchableOpacity style={[styles.addToCartBtn, { backgroundColor: theme.accentColor }]}>
                    <ShoppingBag color="#FFFFFF" size={16} />
                    <Text style={styles.addToCartText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { paddingHorizontal: 16, paddingTop: 16 },
  header: { paddingHorizontal: 20, marginTop: 8, marginBottom: 20 },
  pageTitle: { fontSize: 28, fontWeight: '700', color: '#111827', marginBottom: 6 },
  pageSubtitle: { fontSize: 14, color: '#6B7280' },
  categoryRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginBottom: 20 },
  categoryChip: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: 20, borderWidth: 1 },
  categoryChipText: { fontSize: 14, fontWeight: '700' },
  banner: { marginHorizontal: 20, padding: 12, borderRadius: 12, borderWidth: 1, marginBottom: 20 },
  bannerText: { fontSize: 13, fontWeight: '700', textAlign: 'center' },
  productsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12 },
  productCard: { width: (width - 44) / 2, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 12, borderWidth: 1, marginBottom: 12 },
  recommendedBadge: { position: 'absolute', top: 8, right: 8, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, zIndex: 1 },
  recommendedText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  productImageContainer: { width: '100%', height: 120, marginBottom: 10, borderRadius: 12, overflow: 'hidden' },
  productImage: { width: '100%', height: '100%', borderRadius: 12 },
  productImagePlaceholder: { width: '100%', height: '100%', backgroundColor: '#F9FAFB', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  productInfo: { gap: 6 },
  productName: { fontSize: 14, fontWeight: '700', color: '#111827' },
  productDesc: { fontSize: 11, color: '#6B7280', lineHeight: 16 },
  productRating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  stars: { fontSize: 12 },
  ratingText: { fontSize: 12, fontWeight: '700', color: '#111827' },
  reviewsText: { fontSize: 11, color: '#6B7280' },
  productFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  productPrice: { fontSize: 16, fontWeight: '700' },
  addToCartBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8 },
  addToCartText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
});

