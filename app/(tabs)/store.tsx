import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { 
  ShoppingBag, Star, Sparkles, Heart, Droplets, Pill, Package,
  ChevronRight, TrendingUp, Award, Shield
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';
import { useState } from 'react';

export default function StoreScreen() {
  const router = useRouter();
  const { profile } = useUser();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const isPCOS = profile.healthCondition === 'pcos' || profile.healthCondition === 'pcod';

  const categories = [
    { id: 'all', name: 'All Products', icon: Package },
    { id: 'hygiene', name: 'Hygiene', icon: Droplets },
    { id: 'supplements', name: 'Supplements', icon: Pill },
    { id: 'wellness', name: 'Wellness', icon: Heart },
  ];

  const products = [
    // Hygiene Products
    {
      id: 1,
      name: 'Organic Cotton Pads',
      category: 'hygiene',
      price: '₹249',
      originalPrice: '₹349',
      rating: 4.8,
      reviews: 1234,
      image: '🩹',
      description: 'Ultra-soft, chemical-free organic cotton pads',
      tag: 'Bestseller',
      tagColor: '#10B981',
    },
    {
      id: 2,
      name: 'Menstrual Cup',
      category: 'hygiene',
      price: '₹599',
      originalPrice: '₹799',
      rating: 4.9,
      reviews: 856,
      image: '🌸',
      description: 'Medical-grade silicone, reusable for 10 years',
      tag: 'Eco-Friendly',
      tagColor: '#10B981',
    },
    {
      id: 3,
      name: 'Period Panties (Pack of 3)',
      category: 'hygiene',
      price: '₹1,299',
      originalPrice: '₹1,799',
      rating: 4.7,
      reviews: 623,
      image: '👙',
      description: 'Leak-proof, comfortable, washable period underwear',
      tag: 'Popular',
      tagColor: '#EC4899',
    },
    {
      id: 4,
      name: 'Organic Tampons (Box of 16)',
      category: 'hygiene',
      price: '₹299',
      originalPrice: '₹399',
      rating: 4.6,
      reviews: 445,
      image: '🌿',
      description: '100% organic cotton, no chemicals or fragrances',
      tag: 'Organic',
      tagColor: '#10B981',
    },
    {
      id: 5,
      name: 'Intimate Hygiene Wash',
      category: 'hygiene',
      price: '₹349',
      originalPrice: '₹449',
      rating: 4.8,
      reviews: 892,
      image: '🧴',
      description: 'pH-balanced, gynecologist-approved formula',
      tag: 'Recommended',
      tagColor: '#6366F1',
    },

    // Supplements
    {
      id: 6,
      name: 'Inositol (Myo & D-Chiro)',
      category: 'supplements',
      price: '₹1,499',
      originalPrice: '₹1,999',
      rating: 4.9,
      reviews: 1567,
      image: '💊',
      description: 'For PCOS, insulin sensitivity & hormonal balance',
      tag: 'Top Rated',
      tagColor: '#F59E0B',
      pcosRelevant: true,
    },
    {
      id: 7,
      name: 'Vitamin D3 + K2',
      category: 'supplements',
      price: '₹699',
      originalPrice: '₹899',
      rating: 4.7,
      reviews: 934,
      image: '☀️',
      description: 'Supports bone health & hormone regulation',
      tag: 'Essential',
      tagColor: '#F59E0B',
    },
    {
      id: 8,
      name: 'Omega-3 Fish Oil',
      category: 'supplements',
      price: '₹899',
      originalPrice: '₹1,199',
      rating: 4.8,
      reviews: 1123,
      image: '🐟',
      description: 'Reduces inflammation, supports heart health',
      tag: 'Bestseller',
      tagColor: '#10B981',
    },
    {
      id: 9,
      name: 'Black Cohosh Extract',
      category: 'supplements',
      price: '₹799',
      originalPrice: '₹999',
      rating: 4.5,
      reviews: 567,
      image: '🌿',
      description: 'Natural relief for menopause hot flashes',
      tag: 'Natural',
      tagColor: '#10B981',
      menopauseRelevant: true,
    },
    {
      id: 10,
      name: 'Calcium + Magnesium',
      category: 'supplements',
      price: '₹649',
      originalPrice: '₹849',
      rating: 4.6,
      reviews: 789,
      image: '🦴',
      description: 'Essential for bone health during menopause',
      tag: 'Essential',
      tagColor: '#F59E0B',
      menopauseRelevant: true,
    },

    // Wellness Products
    {
      id: 11,
      name: 'Heating Pad for Cramps',
      category: 'wellness',
      price: '₹1,299',
      originalPrice: '₹1,699',
      rating: 4.9,
      reviews: 2134,
      image: '🔥',
      description: 'Electric heating pad with auto shut-off',
      tag: 'Pain Relief',
      tagColor: '#EF4444',
    },
    {
      id: 12,
      name: 'Essential Oil Diffuser Set',
      category: 'wellness',
      price: '₹1,599',
      originalPrice: '₹2,199',
      rating: 4.8,
      reviews: 845,
      image: '🕯️',
      description: 'Lavender, chamomile oils for relaxation',
      tag: 'Stress Relief',
      tagColor: '#8B5CF6',
    },
    {
      id: 13,
      name: 'Cooling Pillow & Sheets',
      category: 'wellness',
      price: '₹2,499',
      originalPrice: '₹3,499',
      rating: 4.7,
      reviews: 456,
      image: '🛏️',
      description: 'Temperature-regulating for night sweats',
      tag: 'Hot Flash Relief',
      tagColor: '#3B82F6',
      menopauseRelevant: true,
    },
    {
      id: 14,
      name: 'Pelvic Floor Exerciser',
      category: 'wellness',
      price: '₹1,899',
      originalPrice: '₹2,499',
      rating: 4.6,
      reviews: 378,
      image: '💪',
      description: 'Kegel exercise device with app guidance',
      tag: 'Wellness',
      tagColor: '#EC4899',
    },
    {
      id: 15,
      name: 'Herbal Tea Collection',
      category: 'wellness',
      price: '₹599',
      originalPrice: '₹799',
      rating: 4.8,
      reviews: 1245,
      image: '🍵',
      description: 'Chamomile, ginger, spearmint for hormone balance',
      tag: 'Natural',
      tagColor: '#10B981',
    },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const featuredDeals = products.slice(0, 3);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Banner */}
      <View style={styles.headerBanner}>
        <ShoppingBag size={32} color="#FFFFFF" />
        <Text style={styles.headerTitle}>Wellness Store</Text>
        <Text style={styles.headerSubtitle}>
          Curated products for your hormonal health
        </Text>
      </View>

      {/* Special Banner */}
      <View style={styles.specialBanner}>
        <View style={styles.specialBadge}>
          <Star size={14} color="#FFFFFF" fill="#FFFFFF" />
          <Text style={styles.specialBadgeText}>LIMITED OFFER</Text>
        </View>
        <Text style={styles.specialTitle}>Get 25% OFF on your first order!</Text>
        <Text style={styles.specialSubtitle}>Use code: GLOWW25</Text>
      </View>

      {/* Featured Deals */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <TrendingUp size={20} color="#EC4899" />
          <Text style={styles.sectionTitle}>Today's Deals</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dealsScroll}>
          {featuredDeals.map((product) => (
            <TouchableOpacity key={product.id} style={styles.dealCard}>
              <Text style={styles.dealEmoji}>{product.image}</Text>
              <Text style={styles.dealName}>{product.name}</Text>
              <View style={styles.dealPriceRow}>
                <Text style={styles.dealPrice}>{product.price}</Text>
                <Text style={styles.dealOriginalPrice}>{product.originalPrice}</Text>
              </View>
              <View style={styles.dealRating}>
                <Star size={12} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.dealRatingText}>{product.rating}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Category Filter */}
      <View style={styles.categorySection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryChip, isSelected && styles.categoryChipActive]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <IconComponent size={16} color={isSelected ? '#FFFFFF' : '#8B5A8F'} />
                <Text style={[styles.categoryChipText, isSelected && styles.categoryChipTextActive]}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Products Grid */}
      <View style={styles.productsSection}>
        <Text style={styles.productsTitle}>
          {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
        </Text>
        <Text style={styles.productsSubtitle}>{filteredProducts.length} products available</Text>

        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => {
            const showForCondition = isPCOS ? !product.menopauseRelevant : !product.pcosRelevant;
            if (product.pcosRelevant !== undefined || product.menopauseRelevant !== undefined) {
              if (!showForCondition) return null;
            }

            return (
              <TouchableOpacity key={product.id} style={styles.productCard}>
                {product.tag && (
                  <View style={[styles.productTag, { backgroundColor: product.tagColor }]}>
                    <Text style={styles.productTagText}>{product.tag}</Text>
                  </View>
                )}
                
                <Text style={styles.productEmoji}>{product.image}</Text>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
                
                <View style={styles.productRating}>
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.productRatingText}>{product.rating}</Text>
                  <Text style={styles.productReviews}>({product.reviews})</Text>
                </View>

                <View style={styles.productPriceRow}>
                  <View>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    <Text style={styles.productOriginalPrice}>{product.originalPrice}</Text>
                  </View>
                  <TouchableOpacity style={styles.addToCartButton}>
                    <ShoppingBag size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Trust Badges */}
      <View style={styles.trustSection}>
        <View style={styles.trustBadge}>
          <Shield size={24} color="#10B981" />
          <Text style={styles.trustText}>100% Authentic</Text>
        </View>
        <View style={styles.trustBadge}>
          <Package size={24} color="#6366F1" />
          <Text style={styles.trustText}>Free Delivery</Text>
        </View>
        <View style={styles.trustBadge}>
          <Award size={24} color="#EC4899" />
          <Text style={styles.trustText}>Quality Assured</Text>
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
  specialBanner: {
    backgroundColor: '#EC4899',
    marginHorizontal: 20,
    marginTop: 24,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  specialBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 10,
  },
  specialBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  specialTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  specialSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  section: {
    marginTop: 24,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  dealsScroll: {
    paddingHorizontal: 20,
  },
  dealCard: {
    width: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  dealEmoji: {
    fontSize: 40,
    marginBottom: 8,
    textAlign: 'center',
  },
  dealName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
    height: 32,
  },
  dealPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  dealPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EC4899',
  },
  dealOriginalPrice: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  dealRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dealRatingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  categorySection: {
    marginVertical: 20,
  },
  categoryScroll: {
    paddingHorizontal: 20,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F9F5F9',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  categoryChipActive: {
    backgroundColor: '#8B5A8F',
    borderColor: '#8B5A8F',
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5A8F',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  productsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  productsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  productsSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
    position: 'relative',
  },
  productTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 1,
  },
  productTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  productEmoji: {
    fontSize: 48,
    marginBottom: 10,
    textAlign: 'center',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
    height: 36,
  },
  productDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    height: 32,
    lineHeight: 16,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 10,
  },
  productRatingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  productReviews: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  productPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EC4899',
  },
  productOriginalPrice: {
    fontSize: 11,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    backgroundColor: '#8B5A8F',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 32,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E8D5E8',
  },
  trustBadge: {
    alignItems: 'center',
  },
  trustText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 8,
  },
});

