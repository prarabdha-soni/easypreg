import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { Apple, ChefHat, Book } from 'lucide-react-native';

const mealPlans = {
  veg: [
    {
      name: 'Fertility Smoothie',
      category: 'Breakfast',
      ingredients: ['Banana', 'Spinach', 'Almonds', 'Chia seeds', 'Milk'],
      benefits: 'Rich in folate, vitamin E, and omega-3',
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Paneer & Quinoa Bowl',
      category: 'Lunch',
      ingredients: ['Quinoa', 'Paneer', 'Mixed vegetables', 'Turmeric', 'Cumin'],
      benefits: 'High protein and iron for egg health',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Dal with Sprouts',
      category: 'Dinner',
      ingredients: ['Yellow dal', 'Sprouts', 'Tomatoes', 'Ghee'],
      benefits: 'Complete protein and zinc',
      image: 'https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg?auto=compress&cs=tinysrgb&w=400',
    },
  ],
  'non-veg': [
    {
      name: 'Egg White Omelette',
      category: 'Breakfast',
      ingredients: ['Egg whites', 'Spinach', 'Tomatoes', 'Cheese'],
      benefits: 'Lean protein for hormone balance',
      image: 'https://images.pexels.com/photos/3434523/pexels-photo-3434523.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Grilled Chicken Salad',
      category: 'Lunch',
      ingredients: ['Chicken breast', 'Mixed greens', 'Avocado', 'Walnuts'],
      benefits: 'Rich in selenium and healthy fats',
      image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Fish Curry',
      category: 'Dinner',
      ingredients: ['Salmon', 'Coconut milk', 'Curry leaves', 'Ginger'],
      benefits: 'Omega-3 fatty acids for fertility',
      image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ],
};

export default function NutritionScreen() {
  const { profile } = useUser();
  const meals = mealPlans[profile.foodPreference] || mealPlans.veg;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nutrition</Text>
        <Text style={styles.subtitle}>Eat right for your fertility journey</Text>
      </View>

      <View style={styles.todayCard}>
        <View style={styles.todayHeader}>
          <Apple size={24} color="#4caf50" />
          <Text style={styles.todayTitle}>Today's Meal Plan</Text>
        </View>
        <Text style={styles.todaySubtitle}>
          Customized for your {profile.foodPreference} preference
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended Meals</Text>

        {meals.map((meal, index) => (
          <TouchableOpacity key={index} style={styles.mealCard}>
            <Image source={{ uri: meal.image }} style={styles.mealImage} />
            <View style={styles.mealContent}>
              <View style={styles.mealHeader}>
                <Text style={styles.mealCategory}>{meal.category}</Text>
              </View>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealBenefits}>{meal.benefits}</Text>
              <View style={styles.ingredientsContainer}>
                <Text style={styles.ingredientsLabel}>Key ingredients:</Text>
                <Text style={styles.ingredients}>{meal.ingredients.join(', ')}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ChefHat size={24} color="#1a1a1a" />
          <Text style={styles.sectionTitle}>Fertility Boosting Foods</Text>
        </View>

        <View style={styles.foodGrid}>
          <View style={styles.foodItem}>
            <Text style={styles.foodIcon}>🥜</Text>
            <Text style={styles.foodName}>Nuts & Seeds</Text>
            <Text style={styles.foodBenefit}>Zinc & Vitamin E</Text>
          </View>
          <View style={styles.foodItem}>
            <Text style={styles.foodIcon}>🥑</Text>
            <Text style={styles.foodName}>Avocado</Text>
            <Text style={styles.foodBenefit}>Healthy Fats</Text>
          </View>
          <View style={styles.foodItem}>
            <Text style={styles.foodIcon}>🥬</Text>
            <Text style={styles.foodName}>Leafy Greens</Text>
            <Text style={styles.foodBenefit}>Folate & Iron</Text>
          </View>
          <View style={styles.foodItem}>
            <Text style={styles.foodIcon}>🫘</Text>
            <Text style={styles.foodName}>Lentils</Text>
            <Text style={styles.foodBenefit}>Protein & Fiber</Text>
          </View>
          <View style={styles.foodItem}>
            <Text style={styles.foodIcon}>🥛</Text>
            <Text style={styles.foodName}>Dairy</Text>
            <Text style={styles.foodBenefit}>Calcium & D3</Text>
          </View>
          <View style={styles.foodItem}>
            <Text style={styles.foodIcon}>🍇</Text>
            <Text style={styles.foodName}>Berries</Text>
            <Text style={styles.foodBenefit}>Antioxidants</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🌿 Ayurvedic Supplements</Text>
        </View>

        {profile.gender === 'woman' && (
          <View style={styles.supplementCard}>
            <View style={styles.supplementHeader}>
              <Text style={styles.supplementIcon}>🌸</Text>
              <View style={styles.supplementInfo}>
                <Text style={styles.supplementName}>Shatavari</Text>
                <Text style={styles.supplementSubtitle}>For Women's Fertility</Text>
              </View>
            </View>
            <Text style={styles.supplementDescription}>
              Traditional Ayurvedic herb known as "Queen of Herbs" for women's reproductive health. 
              Helps balance hormones, supports ovulation, and enhances fertility.
            </Text>
            <View style={styles.supplementBenefits}>
              <Text style={styles.benefitItem}>✓ Supports hormonal balance</Text>
              <Text style={styles.benefitItem}>✓ Enhances ovulation</Text>
              <Text style={styles.benefitItem}>✓ Improves egg quality</Text>
              <Text style={styles.benefitItem}>✓ Reduces stress and anxiety</Text>
            </View>
            <View style={styles.supplementDosage}>
              <Text style={styles.dosageText}>Recommended: 500mg twice daily with meals</Text>
            </View>
          </View>
        )}

        {profile.gender === 'man' && (
          <View style={styles.supplementCard}>
            <View style={styles.supplementHeader}>
              <Text style={styles.supplementIcon}>💪</Text>
              <View style={styles.supplementInfo}>
                <Text style={styles.supplementName}>Ashwagandha</Text>
                <Text style={styles.supplementSubtitle}>For Men's Fertility</Text>
              </View>
            </View>
            <Text style={styles.supplementDescription}>
              Powerful adaptogenic herb that supports male reproductive health. 
              Known to improve sperm count, motility, and overall fertility.
            </Text>
            <View style={styles.supplementBenefits}>
              <Text style={styles.benefitItem}>✓ Increases sperm count</Text>
              <Text style={styles.benefitItem}>✓ Improves sperm motility</Text>
              <Text style={styles.benefitItem}>✓ Enhances testosterone levels</Text>
              <Text style={styles.benefitItem}>✓ Reduces stress and cortisol</Text>
            </View>
            <View style={styles.supplementDosage}>
              <Text style={styles.dosageText}>Recommended: 300-600mg once daily</Text>
            </View>
          </View>
        )}

        {profile.gender === 'couple' && (
          <View style={styles.supplementCard}>
            <View style={styles.supplementHeader}>
              <Text style={styles.supplementIcon}>💑</Text>
              <View style={styles.supplementInfo}>
                <Text style={styles.supplementName}>Couple's Fertility Support</Text>
                <Text style={styles.supplementSubtitle}>For Both Partners</Text>
              </View>
            </View>
            <Text style={styles.supplementDescription}>
              Comprehensive approach combining Shatavari for women and Ashwagandha for men 
              to support both partners' reproductive health and fertility journey.
            </Text>
            <View style={styles.supplementBenefits}>
              <Text style={styles.benefitItem}>✓ Shatavari for women's hormonal balance</Text>
              <Text style={styles.benefitItem}>✓ Ashwagandha for men's sperm health</Text>
              <Text style={styles.benefitItem}>✓ Stress reduction for both partners</Text>
              <Text style={styles.benefitItem}>✓ Enhanced overall fertility</Text>
            </View>
            <View style={styles.supplementDosage}>
              <Text style={styles.dosageText}>Women: Shatavari 500mg twice daily | Men: Ashwagandha 300-600mg daily</Text>
            </View>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.recipesButton}>
        <Book size={20} color="#ffffff" />
        <Text style={styles.recipesButtonText}>View All Recipes</Text>
      </TouchableOpacity>

      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Nutrition Tips</Text>
        <Text style={styles.tip}>✓ Eat within 1 hour of waking up</Text>
        <Text style={styles.tip}>✓ Include protein in every meal</Text>
        <Text style={styles.tip}>✓ Stay hydrated - 8-10 glasses daily</Text>
        <Text style={styles.tip}>✓ Limit processed foods and sugar</Text>
        <Text style={styles.tip}>✓ Add warming spices like ginger and turmeric</Text>
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
  todayCard: {
    margin: 24,
    marginTop: 0,
    padding: 20,
    backgroundColor: '#f1f8f4',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#c8e6c9',
  },
  todayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  todayTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  todaySubtitle: {
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
  mealCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  mealImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#f5f5f5',
  },
  mealContent: {
    padding: 16,
  },
  mealHeader: {
    marginBottom: 8,
  },
  mealCategory: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4caf50',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  mealName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  mealBenefits: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  ingredientsContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  ingredientsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  ingredients: {
    fontSize: 14,
    color: '#666',
  },
  foodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  foodItem: {
    width: '31%',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    alignItems: 'center',
  },
  foodIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  foodName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 4,
  },
  foodBenefit: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  recipesButton: {
    margin: 24,
    marginTop: 0,
    paddingVertical: 16,
    backgroundColor: '#4caf50',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  recipesButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  tipsCard: {
    margin: 24,
    marginTop: 0,
    padding: 20,
    backgroundColor: '#fffbf0',
    borderRadius: 16,
    marginBottom: 32,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  tip: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 21,
  },
  supplementCard: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  supplementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  supplementIcon: {
    fontSize: 32,
  },
  supplementInfo: {
    flex: 1,
  },
  supplementName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  supplementSubtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  supplementDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 21,
    marginBottom: 16,
  },
  supplementBenefits: {
    marginBottom: 16,
  },
  benefitItem: {
    fontSize: 14,
    color: '#4caf50',
    marginBottom: 6,
    fontWeight: '500',
  },
  supplementDosage: {
    padding: 12,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  dosageText: {
    fontSize: 13,
    color: '#2e7d32',
    fontWeight: '600',
  },
});
