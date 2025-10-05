import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ShoppingBag, Star, Heart, Search, Filter, ShoppingCart, Plus, Minus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const categories = [
  { id: 'supplements', name: 'Fertility Supplements', icon: '💊', color: '#EC4899' },
  { id: 'pregnancy', name: 'Pregnancy Care', icon: '🤱', color: '#FF69B4' },
  { id: 'skincare', name: 'Skincare', icon: '✨', color: '#FFB6C1' },
  { id: 'wellness', name: 'Wellness', icon: '🧘‍♀️', color: '#98FB98' },
  { id: 'baby', name: 'Baby Care', icon: '👶', color: '#87CEEB' },
];

const products = [
  {
    id: 1,
    name: 'Shatavari Capsules',
    brand: 'Himalaya',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 1247,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop',
    category: 'supplements',
    description: 'Traditional Ayurvedic herb for women\'s reproductive health',
    benefits: ['Hormonal Balance', 'Fertility Support', 'Stress Relief'],
    inStock: true,
  },
  {
    id: 2,
    name: 'Ashwagandha Tablets',
    brand: 'Baidyanath',
    price: 199,
    originalPrice: 299,
    rating: 4.6,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop',
    category: 'supplements',
    description: 'Powerful adaptogen for stress relief and vitality',
    benefits: ['Stress Relief', 'Energy Boost', 'Hormonal Balance'],
    inStock: true,
  },
  {
    id: 3,
    name: 'Pregnancy Skincare Set',
    brand: 'Mamaearth',
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 2156,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
    category: 'pregnancy',
    description: 'Safe skincare essentials for expecting mothers',
    benefits: ['Stretch Mark Prevention', 'Safe Ingredients', 'Hydration'],
    inStock: true,
  },
  {
    id: 4,
    name: 'Maternity Yoga Mat',
    brand: 'Decathlon',
    price: 899,
    originalPrice: 1199,
    rating: 4.7,
    reviews: 543,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop',
    category: 'pregnancy',
    description: 'Extra thick yoga mat designed for pregnant women',
    benefits: ['Joint Support', 'Non-slip Surface', 'Easy to Clean'],
    inStock: true,
  },
  {
    id: 5,
    name: 'Golden Milk Powder',
    brand: 'Organic India',
    price: 399,
    originalPrice: 499,
    rating: 4.5,
    reviews: 678,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
    category: 'wellness',
    description: 'Traditional turmeric milk for immunity and wellness',
    benefits: ['Anti-inflammatory', 'Immunity Boost', 'Better Sleep'],
    inStock: true,
  },
  {
    id: 6,
    name: 'Baby Care Kit',
    brand: 'Johnson\'s',
    price: 599,
    originalPrice: 799,
    rating: 4.8,
    reviews: 1234,
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=300&h=300&fit=crop',
    category: 'baby',
    description: 'Complete baby care essentials for new mothers',
    benefits: ['Gentle Formula', 'Hypoallergenic', 'Pediatrician Tested'],
    inStock: true,
  },
];

export default function MarketplaceScreen() {
  const [selectedCategory, setSelectedCategory] = useState('supplements');
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => 
    product.category === selectedCategory && 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (productId) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => {
      const newItems = { ...prev };
      if (newItems[productId] > 1) {
        newItems[productId] -= 1;
      } else {
        delete newItems[productId];
      }
      return newItems;
    });
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((sum, count) => sum + count, 0);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#EC4899', '#F472B6', '#FBB6CE']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.title}>Wellness Marketplace</Text>
          <Text style={styles.subtitle}>Curated products for your health journey</Text>
        </View>
        
        <View style={styles.searchBar}>
          <Search size={20} color="#6B7280" />
          <Text style={styles.searchPlaceholder}>Search products...</Text>
        </View>
      </LinearGradient>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                selectedCategory === category.id && styles.selectedCategoryCard
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <LinearGradient
                colors={
                  selectedCategory === category.id 
                    ? [category.color, `${category.color}CC`]
                    : ['#FFFFFF', '#FFFFFF']
                }
                style={styles.categoryGradient}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[
                  styles.categoryName,
                  selectedCategory === category.id && styles.selectedCategoryName
                ]}>
                  {category.name}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Products Grid */}
      <View style={styles.productsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {categories.find(cat => cat.id === selectedCategory)?.name}
          </Text>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#EC4899" />
          </TouchableOpacity>
        </View>

        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productImageContainer}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <TouchableOpacity style={styles.wishlistButton}>
                  <Heart size={16} color="#EC4899" />
                </TouchableOpacity>
                {product.originalPrice > product.price && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.productBrand}>{product.brand}</Text>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
                
                <View style={styles.productRating}>
                  <Star size={12} color="#F59E0B" />
                  <Text style={styles.ratingText}>{product.rating}</Text>
                  <Text style={styles.reviewsText}>({product.reviews} reviews)</Text>
                </View>

                <View style={styles.benefitsContainer}>
                  {product.benefits.slice(0, 2).map((benefit, index) => (
                    <View key={index} style={styles.benefitTag}>
                      <Text style={styles.benefitText}>{benefit}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.productFooter}>
                  <View style={styles.priceContainer}>
                    <Text style={styles.currentPrice}>₹{product.price}</Text>
                    {product.originalPrice > product.price && (
                      <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
                    )}
                  </View>

                  {cartItems[product.id] ? (
                    <View style={styles.cartControls}>
                      <TouchableOpacity 
                        style={styles.cartButton}
                        onPress={() => removeFromCart(product.id)}
                      >
                        <Minus size={16} color="#EC4899" />
                      </TouchableOpacity>
                      <Text style={styles.cartCount}>{cartItems[product.id]}</Text>
                      <TouchableOpacity 
                        style={styles.cartButton}
                        onPress={() => addToCart(product.id)}
                      >
                        <Plus size={16} color="#EC4899" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity 
                      style={styles.addToCartButton}
                      onPress={() => addToCart(product.id)}
                    >
                      <ShoppingBag size={16} color="#FFFFFF" />
                      <Text style={styles.addToCartText}>Add</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Cart Summary */}
      {getCartCount() > 0 && (
        <View style={styles.cartSummary}>
          <View style={styles.cartInfo}>
            <ShoppingCart size={20} color="#EC4899" />
            <Text style={styles.cartText}>{getCartCount()} items in cart</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
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
    paddingBottom: 24,
  },
  headerContent: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    opacity: 0.9,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#6B7280',
    flex: 1,
  },
  categoriesSection: {
    paddingVertical: 20,
  },
  categoriesScroll: {
    paddingLeft: 20,
  },
  categoryCard: {
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  selectedCategoryCard: {
    shadowColor: '#EC4899',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryGradient: {
    padding: 16,
    alignItems: 'center',
    minWidth: 100,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    textAlign: 'center',
  },
  selectedCategoryName: {
    color: '#FFFFFF',
  },
  productsSection: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  filterButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  productCard: {
    width: (width - 56) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#EC4899',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#F3F4F6',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  productInfo: {
    padding: 16,
  },
  productBrand: {
    fontSize: 12,
    color: '#EC4899',
    fontWeight: '600',
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
    lineHeight: 20,
  },
  productDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 16,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  reviewsText: {
    fontSize: 12,
    color: '#6B7280',
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 12,
  },
  benefitTag: {
    backgroundColor: '#FEF7F7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  benefitText: {
    fontSize: 10,
    color: '#EC4899',
    fontWeight: '500',
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  originalPrice: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EC4899',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  addToCartText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cartButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    minWidth: 20,
    textAlign: 'center',
  },
  cartSummary: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  checkoutButton: {
    backgroundColor: '#EC4899',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
