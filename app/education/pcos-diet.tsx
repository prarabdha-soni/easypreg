import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, Apple, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function PCOSDietScreen() {
  const router = useRouter();

  const dietPrinciples = [
    {
      title: 'Low Glycemic Index Foods',
      description: 'Choose foods that don\'t spike blood sugar',
      foods: ['Quinoa', 'Brown rice', 'Oats', 'Sweet potatoes', 'Lentils', 'Chickpeas'],
      color: '#10B981',
    },
    {
      title: 'Anti-Inflammatory Foods',
      description: 'Reduce inflammation to manage PCOS symptoms',
      foods: ['Leafy greens', 'Berries', 'Fatty fish', 'Turmeric', 'Ginger', 'Walnuts'],
      color: '#F59E0B',
    },
    {
      title: 'High-Fiber Foods',
      description: 'Improve digestion and insulin sensitivity',
      foods: ['Broccoli', 'Brussels sprouts', 'Avocado', 'Chia seeds', 'Flaxseeds', 'Beans'],
      color: '#8B5CF6',
    },
    {
      title: 'Lean Proteins',
      description: 'Balance blood sugar and support weight management',
      foods: ['Chicken breast', 'Turkey', 'Fish', 'Tofu', 'Greek yogurt', 'Eggs'],
      color: '#3B82F6',
    },
  ];

  const foodsToAvoid = [
    'Refined carbohydrates (white bread, pasta, pastries)',
    'Sugary drinks and desserts',
    'Processed and fried foods',
    'Red meat and processed meats',
    'Excessive caffeine',
    'High-sugar fruits (in large quantities)',
  ];

  const sampleMealPlan = [
    {
      meal: 'Breakfast',
      options: [
        'Greek yogurt with berries, chia seeds, and nuts',
        'Oatmeal with cinnamon, walnuts, and apple slices',
        'Vegetable omelet with avocado and whole grain toast',
      ],
    },
    {
      meal: 'Lunch',
      options: [
        'Grilled salmon with quinoa and roasted vegetables',
        'Chickpea salad with mixed greens and olive oil dressing',
        'Turkey wrap with hummus, veggies in whole wheat tortilla',
      ],
    },
    {
      meal: 'Dinner',
      options: [
        'Baked chicken with sweet potato and steamed broccoli',
        'Lentil curry with brown rice and spinach',
        'Grilled tofu stir-fry with vegetables and cauliflower rice',
      ],
    },
    {
      meal: 'Snacks',
      options: [
        'Apple slices with almond butter',
        'Handful of mixed nuts',
        'Carrot sticks with hummus',
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PCOS Diet Guide</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Intro */}
        <View style={styles.introCard}>
          <Apple size={32} color="#10B981" />
          <Text style={styles.introTitle}>Eating for PCOS Management</Text>
          <Text style={styles.introText}>
            A balanced, nutrient-rich diet can significantly improve PCOS symptoms by managing insulin resistance, reducing inflammation, and supporting hormonal balance.
          </Text>
        </View>

        {/* Diet Principles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Diet Principles</Text>
          {dietPrinciples.map((principle, index) => (
            <View key={index} style={styles.principleCard}>
              <View style={[styles.principleHeader, { borderLeftColor: principle.color }]}>
                <Text style={styles.principleTitle}>{principle.title}</Text>
                <Text style={styles.principleDescription}>{principle.description}</Text>
              </View>
              <View style={styles.foodsGrid}>
                {principle.foods.map((food, foodIndex) => (
                  <View key={foodIndex} style={[styles.foodTag, { borderColor: principle.color }]}>
                    <Text style={[styles.foodText, { color: principle.color }]}>{food}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Foods to Avoid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Foods to Limit or Avoid</Text>
          <View style={styles.avoidCard}>
            {foodsToAvoid.map((food, index) => (
              <View key={index} style={styles.avoidItem}>
                <Text style={styles.avoidBullet}>✕</Text>
                <Text style={styles.avoidText}>{food}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Sample Meal Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sample Daily Meal Plan</Text>
          {sampleMealPlan.map((section, index) => (
            <View key={index} style={styles.mealCard}>
              <Text style={styles.mealTitle}>{section.meal}</Text>
              {section.options.map((option, optionIndex) => (
                <View key={optionIndex} style={styles.mealOption}>
                  <View style={styles.mealBullet} />
                  <Text style={styles.mealText}>{option}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Hydration Tip */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💧 Hydration Matters</Text>
          <Text style={styles.tipText}>
            Drink 8-10 glasses of water daily. Herbal teas like spearmint and green tea can help reduce androgen levels and support weight management.
          </Text>
        </View>

        {/* CTA */}
        <TouchableOpacity 
          style={styles.consultButton}
          onPress={() => router.push('/telehealth/providers')}
        >
          <Text style={styles.consultButtonText}>Get Personalized Nutrition Plan</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F7',
  },
  header: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  introCard: {
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  introTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#065F46',
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
  introText: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  principleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  principleHeader: {
    borderLeftWidth: 4,
    paddingLeft: 14,
    marginBottom: 14,
  },
  principleTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  principleDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  foodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  foodTag: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  foodText: {
    fontSize: 13,
    fontWeight: '600',
  },
  avoidCard: {
    backgroundColor: '#FEF2F2',
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  avoidItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avoidBullet: {
    fontSize: 16,
    color: '#EF4444',
    marginRight: 12,
    fontWeight: '700',
  },
  avoidText: {
    flex: 1,
    fontSize: 14,
    color: '#7F1D1D',
    lineHeight: 20,
  },
  mealCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  mealTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  mealOption: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  mealBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginTop: 6,
    marginRight: 12,
  },
  mealText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  tipCard: {
    backgroundColor: '#EFF6FF',
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 21,
  },
  consultButton: {
    backgroundColor: '#10B981',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  consultButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

