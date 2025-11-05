import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { getCycleDay, getCurrentHormonalPhase, themes } from '@/services/ThemeService';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Leaf, Sparkles, Heart, Droplet } from 'lucide-react-native';

type NutritionTip = {
  category: 'hair' | 'skin' | 'overall';
  title: string;
  description: string;
  foods: string[];
  icon: string;
};

type PhaseNutritionData = {
  title: string;
  description: string;
  tips: NutritionTip[];
};

const nutritionData: Record<'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal', PhaseNutritionData> = {
  Menstrual: {
    title: 'Iron & Recovery Nutrition',
    description: 'Restore and replenish with iron-rich vegetarian foods to support hair growth and skin repair during your period.',
    tips: [
      {
        category: 'hair',
        title: 'Hair Growth & Strength',
        description: 'Support hair follicles with iron-rich foods to combat potential shedding and promote new growth.',
        foods: [
          'Spinach & leafy greens (Palak, Methi)',
          'Lentils & chickpeas (Dal, Chana)',
          'Sesame seeds (Til) - rich in iron & zinc',
          'Jaggery (Gur) with warm water',
          'Dates & dried apricots',
          'Beetroot & pomegranate juice',
        ],
        icon: '💇‍♀️',
      },
      {
        category: 'skin',
        title: 'Skin Repair & Hydration',
        description: 'Nourish sensitive skin with hydrating foods and anti-inflammatory nutrients.',
        foods: [
          'Coconut water - natural electrolytes',
          'Cucumber & watermelon - high water content',
          'Sweet potatoes - beta-carotene for skin healing',
          'Almonds - vitamin E for skin barrier',
          'Turmeric milk - anti-inflammatory',
          'Ghee - healthy fats for skin suppleness',
        ],
        icon: '✨',
      },
      {
        category: 'overall',
        title: 'Energy & Recovery',
        description: 'Combat fatigue and support your body\'s natural recovery process.',
        foods: [
          'Moong dal khichdi - easy to digest',
          'Banana with dates - quick energy',
          'Warm milk with turmeric & honey',
          'Whole grains (brown rice, oats)',
          'Nuts & seeds mix',
          'Herbal teas (ginger, chamomile)',
        ],
        icon: '🌱',
      },
    ],
  },
  Follicular: {
    title: 'Protein & Growth Nutrition',
    description: 'Fuel your rising energy with high-protein vegetarian foods to support hair strength and glowing skin.',
    tips: [
      {
        category: 'hair',
        title: 'Hair Strength & Growth',
        description: 'Build stronger hair with protein-rich foods as estrogen rises and hair growth accelerates.',
        foods: [
          'Paneer & tofu - complete protein',
          'Sprouted lentils & beans - high protein',
          'Quinoa & amaranth - complete proteins',
          'Nuts (almonds, walnuts) - biotin & protein',
          'Greek yogurt (dahi) - protein & probiotics',
          'Chia seeds - omega-3 & protein',
        ],
        icon: '💇‍♀️',
      },
      {
        category: 'skin',
        title: 'Radiant Skin Boost',
        description: 'Enhance your natural glow with antioxidant-rich foods and vitamin C.',
        foods: [
          'Amla (Indian gooseberry) - vitamin C powerhouse',
          'Oranges, guava, papaya - vitamin C',
          'Carrots - beta-carotene for glow',
          'Tomatoes - lycopene for skin protection',
          'Green leafy vegetables - antioxidants',
          'Flaxseeds - omega-3 for skin health',
        ],
        icon: '✨',
      },
      {
        category: 'overall',
        title: 'Energy & Vitality',
        description: 'Support your rising energy levels with nutrient-dense foods.',
        foods: [
          'Oats with nuts & seeds - sustained energy',
          'Moong chilla - high protein breakfast',
          'Sprout salad - protein & fiber',
          'Whole grain roti with dal',
          'Fresh fruit smoothies',
          'Mixed nuts & raisins',
        ],
        icon: '🌱',
      },
    ],
  },
  Ovulation: {
    title: 'Zinc & Antioxidant Nutrition',
    description: 'Peak performance nutrition with zinc-rich vegetarian foods to maintain hair shine and radiant skin.',
    tips: [
      {
        category: 'hair',
        title: 'Hair Shine & Health',
        description: 'Maintain peak hair quality with zinc and omega-3 rich foods during your most radiant phase.',
        foods: [
          'Pumpkin seeds - highest zinc content',
          'Sesame seeds (Til) - zinc & healthy fats',
          'Chickpeas & beans - zinc & protein',
          'Cashews - zinc & healthy fats',
          'Whole grains (brown rice, ragi) - zinc',
          'Flaxseeds & walnuts - omega-3 for shine',
        ],
        icon: '💇‍♀️',
      },
      {
        category: 'skin',
        title: 'Peak Glow & Protection',
        description: 'Maximize your natural radiance with antioxidant-rich foods and skin-protective nutrients.',
        foods: [
          'Berries (blueberries, strawberries) - antioxidants',
          'Bell peppers - vitamin C & antioxidants',
          'Broccoli & cauliflower - vitamin C & folate',
          'Green tea - polyphenols for skin',
          'Dark chocolate (70%+) - flavonoids',
          'Nuts & seeds - vitamin E for skin protection',
        ],
        icon: '✨',
      },
      {
        category: 'overall',
        title: 'Peak Performance Fuel',
        description: 'Support your highest energy and mental clarity with optimal nutrition.',
        foods: [
          'Ragi dosa - zinc & fiber',
          'Sprout salad with seeds - complete nutrition',
          'Quinoa khichdi - protein & zinc',
          'Fresh fruit salads',
          'Nuts & seeds trail mix',
          'Herbal teas with lemon',
        ],
        icon: '🌱',
      },
    ],
  },
  Luteal: {
    title: 'Magnesium & Mood Nutrition',
    description: 'Stabilize mood and support hair/skin health with magnesium-rich vegetarian foods during PMS.',
    tips: [
      {
        category: 'hair',
        title: 'Scalp Health & Balance',
        description: 'Manage potential scalp oiliness and support hair health with magnesium-rich foods.',
        foods: [
          'Dark leafy greens (spinach, kale) - magnesium',
          'Almonds & cashews - magnesium & biotin',
          'Pumpkin seeds - magnesium & zinc',
          'Black beans - magnesium & protein',
          'Brown rice - magnesium & B vitamins',
          'Avocado - healthy fats & magnesium',
        ],
        icon: '💇‍♀️',
      },
      {
        category: 'skin',
        title: 'Clear & Calm Skin',
        description: 'Combat hormonal breakouts and maintain skin balance with anti-inflammatory foods.',
        foods: [
          'Turmeric - anti-inflammatory',
          'Ginger tea - reduces inflammation',
          'Green leafy vegetables - magnesium & antioxidants',
          'Cucumber - cooling & hydrating',
          'Probiotic yogurt - gut-skin connection',
          'Omega-3 rich foods (flaxseeds, walnuts)',
        ],
        icon: '✨',
      },
      {
        category: 'overall',
        title: 'Mood & Energy Balance',
        description: 'Support stable energy and mood with complex carbs and magnesium.',
        foods: [
          'Dalia (broken wheat) - complex carbs',
          'Jowar roti - magnesium & fiber',
          'Moong dal khichdi - easy digestible comfort',
          'Dark chocolate (70%+) - mood support',
          'Banana - magnesium & natural sugars',
          'Herbal teas (chamomile, lavender)',
        ],
        icon: '🌱',
      },
    ],
  },
};

export default function NutritionScreen() {
  const { profile } = useUser();
  const router = useRouter();
  const phaseKey: 'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal' = useMemo(() => {
    if (!profile.lastPeriodDate) return 'Follicular';
    const day = getCycleDay(profile.lastPeriodDate);
    return getCurrentHormonalPhase(day);
  }, [profile.lastPeriodDate]);

  const theme = themes[phaseKey];
  const phaseData = nutritionData[phaseKey];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hair':
        return <Sparkles color={theme.accentColor} size={20} />;
      case 'skin':
        return <Heart color={theme.accentColor} size={20} />;
      case 'overall':
        return <Leaf color={theme.accentColor} size={20} />;
      default:
        return <Droplet color={theme.accentColor} size={20} />;
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface }]} showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => { try { router.back(); } catch { router.replace('/(tabs)'); } }}>
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
      </View>

      <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <Text style={styles.pageTitle}>Nutrition Tips 🥗</Text>
        <Text style={styles.pageSubtitle}>Vegetarian nutrition for hair, skin & wellness</Text>
        <View style={styles.phaseBadge}>
          <Text style={styles.phaseBadgeText}>{phaseKey} Phase</Text>
        </View>
      </LinearGradient>

      {/* Phase Overview */}
      <View style={[styles.overviewCard, { borderColor: theme.border, backgroundColor: theme.surface }]}>
        <Text style={[styles.overviewTitle, { color: theme.accentColor }]}>{phaseData.title}</Text>
        <Text style={styles.overviewDescription}>{phaseData.description}</Text>
      </View>

      {/* Nutrition Tips by Category */}
      {phaseData.tips.map((tip, index) => (
        <View key={index} style={[styles.tipCard, { borderColor: theme.border, backgroundColor: '#FFFFFF' }]}>
          <View style={styles.tipHeader}>
            <View style={[styles.iconContainer, { backgroundColor: `${theme.accentColor}15` }]}>
              {getCategoryIcon(tip.category)}
            </View>
            <View style={styles.tipHeaderText}>
              <Text style={styles.tipCategory}>{tip.category.toUpperCase()}</Text>
              <Text style={[styles.tipTitle, { color: theme.accentColor }]}>{tip.title}</Text>
            </View>
          </View>
          
          <Text style={styles.tipDescription}>{tip.description}</Text>

          <View style={styles.foodsSection}>
            <Text style={styles.foodsTitle}>Key Foods:</Text>
            {tip.foods.map((food, foodIndex) => (
              <View key={foodIndex} style={[styles.foodItem, { borderColor: theme.border }]}>
                <Text style={styles.foodBullet}>•</Text>
                <Text style={styles.foodText}>{food}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* Quick Tips Banner */}
      <View style={[styles.quickTipsBanner, { borderColor: theme.border, backgroundColor: '#FFFFFF' }]}>
        <Text style={[styles.quickTipsTitle, { color: theme.accentColor }]}>💡 Quick Tips</Text>
        <View style={styles.quickTipItem}>
          <Text style={styles.quickTipText}>
            • Combine iron-rich foods with vitamin C (e.g., dal with lemon) for better absorption
          </Text>
        </View>
        <View style={styles.quickTipItem}>
          <Text style={styles.quickTipText}>
            • Soak nuts and seeds overnight to improve nutrient availability
          </Text>
        </View>
        <View style={styles.quickTipItem}>
          <Text style={styles.quickTipText}>
            • Aim for 2-3 liters of water daily to support hair and skin health
          </Text>
        </View>
        <View style={styles.quickTipItem}>
          <Text style={styles.quickTipText}>
            • Include a variety of colors in your meals for diverse nutrients
          </Text>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { paddingHorizontal: 16, paddingTop: 16 },
  hero: { paddingTop: 56, paddingBottom: 28, paddingHorizontal: 20, borderBottomLeftRadius: 28, borderBottomRightRadius: 28, marginBottom: 20 },
  pageTitle: { fontSize: 28, fontWeight: '700', color: '#FFF', marginBottom: 6 },
  pageSubtitle: { fontSize: 15, color: 'rgba(255,255,255,0.9)', marginBottom: 12 },
  phaseBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.3)', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 12 },
  phaseBadgeText: { color: '#FFFFFF', fontWeight: '700', fontSize: 11, letterSpacing: 0.5 },
  overviewCard: { marginHorizontal: 20, marginBottom: 20, padding: 20, borderRadius: 16, borderWidth: 1 },
  overviewTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  overviewDescription: { fontSize: 14, color: '#6B7280', lineHeight: 20 },
  tipCard: { marginHorizontal: 20, marginBottom: 20, padding: 20, borderRadius: 16, borderWidth: 1 },
  tipHeader: { flexDirection: 'row', marginBottom: 16 },
  iconContainer: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  tipHeaderText: { flex: 1, justifyContent: 'center' },
  tipCategory: { fontSize: 11, fontWeight: '700', color: '#9CA3AF', letterSpacing: 1, marginBottom: 4 },
  tipTitle: { fontSize: 18, fontWeight: '700' },
  tipDescription: { fontSize: 14, color: '#6B7280', lineHeight: 20, marginBottom: 16 },
  foodsSection: { marginTop: 8 },
  foodsTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 12 },
  foodItem: { flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, marginBottom: 8, backgroundColor: '#F9FAFB' },
  foodBullet: { fontSize: 16, color: '#6B7280', marginRight: 10, fontWeight: '700' },
  foodText: { fontSize: 14, color: '#374151', flex: 1, lineHeight: 20 },
  quickTipsBanner: { marginHorizontal: 20, marginBottom: 20, padding: 20, borderRadius: 16, borderWidth: 1 },
  quickTipsTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  quickTipItem: { marginBottom: 12 },
  quickTipText: { fontSize: 14, color: '#6B7280', lineHeight: 20 },
});

