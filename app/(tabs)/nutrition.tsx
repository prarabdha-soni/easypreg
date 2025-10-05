import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { Apple, ChefHat, Book, Activity, Clock, Users, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function NutritionScreen() {
  const { profile } = useUser();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nutrition</Text>
        <Text style={styles.subtitle}>Eat right for your fertility journey</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🌿 Ayurvedic Supplements</Text>
        </View>

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

        <View style={styles.supplementCard}>
          <View style={styles.supplementHeader}>
            <Text style={styles.supplementIcon}>🌿</Text>
            <View style={styles.supplementInfo}>
              <Text style={styles.supplementName}>Triphala</Text>
              <Text style={styles.supplementSubtitle}>For Overall Health</Text>
            </View>
          </View>
          <Text style={styles.supplementDescription}>
            Traditional Ayurvedic formula combining three fruits. Supports digestion, 
            detoxification, and overall reproductive health for both men and women.
          </Text>
          <View style={styles.supplementBenefits}>
            <Text style={styles.benefitItem}>✓ Improves digestion and absorption</Text>
            <Text style={styles.benefitItem}>✓ Natural detoxification</Text>
            <Text style={styles.benefitItem}>✓ Boosts immunity</Text>
            <Text style={styles.benefitItem}>✓ Supports overall fertility</Text>
          </View>
          <View style={styles.supplementDosage}>
            <Text style={styles.dosageText}>Recommended: 1-2 teaspoons with warm water before bed</Text>
          </View>
        </View>

        <View style={styles.supplementCard}>
          <View style={styles.supplementHeader}>
            <Text style={styles.supplementIcon}>🌺</Text>
            <View style={styles.supplementInfo}>
              <Text style={styles.supplementName}>Gokshura</Text>
              <Text style={styles.supplementSubtitle}>For Reproductive Health</Text>
            </View>
          </View>
          <Text style={styles.supplementDescription}>
            Ancient Ayurvedic herb known for its reproductive benefits. 
            Supports both male and female fertility, libido, and reproductive function.
          </Text>
          <View style={styles.supplementBenefits}>
            <Text style={styles.benefitItem}>✓ Enhances libido and sexual function</Text>
            <Text style={styles.benefitItem}>✓ Supports reproductive organs</Text>
            <Text style={styles.benefitItem}>✓ Improves sperm quality</Text>
            <Text style={styles.benefitItem}>✓ Balances reproductive hormones</Text>
          </View>
          <View style={styles.supplementDosage}>
            <Text style={styles.dosageText}>Recommended: 500mg twice daily with meals</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ChefHat size={24} color="#1a1a1a" />
          <Text style={styles.sectionTitle}>Fertility Boosting Foods</Text>
        </View>

        <View style={styles.foodGrid}>
          <View style={styles.foodItem}>
            <Text style={styles.foodIcon}>🥜</Text>
            <Text style={styles.foodName}>Almonds & Walnuts</Text>
            <Text style={styles.foodBenefit}>Zinc & Omega-3</Text>
          </View>
          <View style={styles.foodItem}>
            <Text style={styles.foodIcon}>🥥</Text>
            <Text style={styles.foodName}>Coconut</Text>
            <Text style={styles.foodBenefit}>Healthy Fats</Text>
          </View>
          <View style={styles.foodItem}>
            <Text style={styles.foodIcon}>🥬</Text>
            <Text style={styles.foodName}>Palak & Methi</Text>
            <Text style={styles.foodBenefit}>Folate & Iron</Text>
          </View>
          <View style={styles.foodItem}>
            <Text style={styles.foodIcon}>🫘</Text>
            <Text style={styles.foodName}>Dal & Rajma</Text>
            <Text style={styles.foodBenefit}>Protein & Fiber</Text>
          </View>
          <View style={styles.foodItem}>
            <Text style={styles.foodIcon}>🥛</Text>
            <Text style={styles.foodName}>Paneer & Dahi</Text>
            <Text style={styles.foodBenefit}>Calcium & Probiotics</Text>
          </View>
          <View style={styles.foodItem}>
            <Text style={styles.foodIcon}>🥭</Text>
            <Text style={styles.foodName}>Mango & Pomegranate</Text>
            <Text style={styles.foodBenefit}>Vitamin C & Antioxidants</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🍛 Traditional Indian Pregnancy Foods</Text>
        </View>
        
        <View style={styles.traditionalFoodsGrid}>
          <View style={styles.traditionalFoodItem}>
            <Text style={styles.traditionalFoodIcon}>🥛</Text>
            <Text style={styles.traditionalFoodName}>Golden Milk</Text>
            <Text style={styles.traditionalFoodBenefit}>Turmeric + Milk for immunity</Text>
          </View>
          <View style={styles.traditionalFoodItem}>
            <Text style={styles.traditionalFoodIcon}>🌰</Text>
            <Text style={styles.traditionalFoodName}>Soaked Almonds</Text>
            <Text style={styles.traditionalFoodBenefit}>Protein + Vitamin E</Text>
          </View>
          <View style={styles.traditionalFoodItem}>
            <Text style={styles.traditionalFoodIcon}>🥥</Text>
            <Text style={styles.traditionalFoodName}>Coconut Water</Text>
            <Text style={styles.traditionalFoodBenefit}>Natural electrolytes</Text>
          </View>
          <View style={styles.traditionalFoodItem}>
            <Text style={styles.traditionalFoodIcon}>🫘</Text>
            <Text style={styles.traditionalFoodName}>Moong Dal</Text>
            <Text style={styles.traditionalFoodBenefit}>Easy to digest protein</Text>
          </View>
          <View style={styles.traditionalFoodItem}>
            <Text style={styles.traditionalFoodIcon}>🥬</Text>
            <Text style={styles.traditionalFoodName}>Methi Paratha</Text>
            <Text style={styles.traditionalFoodBenefit}>Iron + Folate</Text>
          </View>
          <View style={styles.traditionalFoodItem}>
            <Text style={styles.traditionalFoodIcon}>🍯</Text>
            <Text style={styles.traditionalFoodName}>Ghee + Jaggery</Text>
            <Text style={styles.traditionalFoodBenefit}>Healthy fats + Iron</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.recipesButton}>
        <Book size={20} color="#ffffff" />
        <Text style={styles.recipesButtonText}>View All Recipes</Text>
      </TouchableOpacity>

      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>Indian Pregnancy Nutrition Tips</Text>
        <Text style={styles.tip}>✓ Start with warm water and soaked almonds</Text>
        <Text style={styles.tip}>✓ Include dal, rajma, or chana in every meal</Text>
        <Text style={styles.tip}>✓ Drink coconut water and herbal teas</Text>
        <Text style={styles.tip}>✓ Eat seasonal Indian fruits like mango, pomegranate</Text>
        <Text style={styles.tip}>✓ Use ghee, turmeric, and ginger in cooking</Text>
        <Text style={styles.tip}>✓ Include paneer, dahi, and milk for calcium</Text>
        <Text style={styles.tip}>✓ Eat palak, methi, and other leafy greens daily</Text>
      </View>

      {/* Indian Diet-Based Meal Plans */}
      <View style={styles.mealPlansSection}>
        <Text style={styles.sectionTitle}>🇮🇳 Indian Diet-Based Meal Plans</Text>
        
        <View style={styles.mealPlanCard}>
          <LinearGradient
            colors={['#FF6B6B', '#FF8E8E']}
            style={styles.mealPlanGradient}
          >
            <View style={styles.mealPlanHeader}>
              <Text style={styles.mealPlanTitle}>Fertility-Boosting Breakfast</Text>
              <Text style={styles.mealPlanTime}>⏰ 7:00 AM</Text>
            </View>
            <Text style={styles.mealPlanDescription}>
              Start your day with traditional Indian superfoods for optimal fertility
            </Text>
            <View style={styles.mealPlanItems}>
              <Text style={styles.mealPlanItem}>🥛 Golden Milk (Turmeric + Milk)</Text>
              <Text style={styles.mealPlanItem}>🥜 Soaked Almonds (5-6 pieces)</Text>
              <Text style={styles.mealPlanItem}>🍌 Banana with Honey</Text>
              <Text style={styles.mealPlanItem}>🌿 Methi Paratha</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.mealPlanCard}>
          <LinearGradient
            colors={['#4ECDC4', '#6ED5D1']}
            style={styles.mealPlanGradient}
          >
            <View style={styles.mealPlanHeader}>
              <Text style={styles.mealPlanTitle}>Nutrient-Rich Lunch</Text>
              <Text style={styles.mealPlanTime}>⏰ 1:00 PM</Text>
            </View>
            <Text style={styles.mealPlanDescription}>
              Balanced Indian meal with fertility-enhancing ingredients
            </Text>
            <View style={styles.mealPlanItems}>
              <Text style={styles.mealPlanItem}>🍚 Brown Rice or Quinoa</Text>
              <Text style={styles.mealPlanItem}>🥗 Dal (Lentils) with Ghee</Text>
              <Text style={styles.mealPlanItem}>🥬 Palak Paneer</Text>
              <Text style={styles.mealPlanItem}>🥒 Cucumber Raita</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.mealPlanCard}>
          <LinearGradient
            colors={['#45B7D1', '#6BC5D1']}
            style={styles.mealPlanGradient}
          >
            <View style={styles.mealPlanHeader}>
              <Text style={styles.mealPlanTitle}>Light & Healthy Dinner</Text>
              <Text style={styles.mealPlanTime}>⏰ 7:30 PM</Text>
            </View>
            <Text style={styles.mealPlanDescription}>
              Evening meal focused on digestion and hormone balance
            </Text>
            <View style={styles.mealPlanItems}>
              <Text style={styles.mealPlanItem}>🍲 Moong Dal Khichdi</Text>
              <Text style={styles.mealPlanItem}>🥕 Carrot & Beetroot Salad</Text>
              <Text style={styles.mealPlanItem}>🥛 Warm Milk with Turmeric</Text>
              <Text style={styles.mealPlanItem}>🌰 Walnuts (2-3 pieces)</Text>
            </View>
          </LinearGradient>
        </View>
      </View>

      {/* Fitness Routines */}
      <View style={styles.fitnessSection}>
        <Text style={styles.sectionTitle}>🏃‍♀️ Indian Fitness Routines</Text>
        
        <View style={styles.fitnessGrid}>
          <TouchableOpacity style={styles.fitnessCard}>
            <View style={styles.fitnessIcon}>
              <Activity size={24} color="#8B5CF6" />
            </View>
            <Text style={styles.fitnessTitle}>Yoga for Fertility</Text>
            <Text style={styles.fitnessDuration}>20 min</Text>
            <Text style={styles.fitnessDescription}>
              Traditional yoga poses to improve reproductive health
            </Text>
            <View style={styles.fitnessBenefits}>
              <Text style={styles.fitnessBenefit}>• Improves blood circulation</Text>
              <Text style={styles.fitnessBenefit}>• Reduces stress hormones</Text>
              <Text style={styles.fitnessBenefit}>• Balances reproductive system</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.fitnessCard}>
            <View style={styles.fitnessIcon}>
              <Clock size={24} color="#10B981" />
            </View>
            <Text style={styles.fitnessTitle}>Pranayama Breathing</Text>
            <Text style={styles.fitnessDuration}>15 min</Text>
            <Text style={styles.fitnessDescription}>
              Ancient breathing techniques for hormonal balance
            </Text>
            <View style={styles.fitnessBenefits}>
              <Text style={styles.fitnessBenefit}>• Reduces cortisol levels</Text>
              <Text style={styles.fitnessBenefit}>• Improves oxygen flow</Text>
              <Text style={styles.fitnessBenefit}>• Enhances mental clarity</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.fitnessCard}>
            <View style={styles.fitnessIcon}>
              <Users size={24} color="#F59E0B" />
            </View>
            <Text style={styles.fitnessTitle}>Partner Workouts</Text>
            <Text style={styles.fitnessDuration}>30 min</Text>
            <Text style={styles.fitnessDescription}>
              Couple-friendly exercises for fertility journey
            </Text>
            <View style={styles.fitnessBenefits}>
              <Text style={styles.fitnessBenefit}>• Strengthens relationship</Text>
              <Text style={styles.fitnessBenefit}>• Mutual motivation</Text>
              <Text style={styles.fitnessBenefit}>• Shared wellness goals</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.fitnessCard}>
            <View style={styles.fitnessIcon}>
              <Star size={24} color="#EF4444" />
            </View>
            <Text style={styles.fitnessTitle}>Meditation & Mindfulness</Text>
            <Text style={styles.fitnessDuration}>10 min</Text>
            <Text style={styles.fitnessDescription}>
              Mental wellness practices for fertility success
            </Text>
            <View style={styles.fitnessBenefits}>
              <Text style={styles.fitnessBenefit}>• Reduces anxiety</Text>
              <Text style={styles.fitnessBenefit}>• Improves sleep quality</Text>
              <Text style={styles.fitnessBenefit}>• Enhances emotional balance</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Traditional Indian Recipes */}
      <View style={styles.recipesSection}>
        <Text style={styles.sectionTitle}>👩‍🍳 Traditional Indian Recipes</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recipesScroll}>
          <TouchableOpacity style={styles.recipeCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop' }}
              style={styles.recipeImage}
            />
            <View style={styles.recipeContent}>
              <Text style={styles.recipeTitle}>Golden Milk (Haldi Doodh)</Text>
              <Text style={styles.recipeTime}>⏱️ 10 min</Text>
              <Text style={styles.recipeDescription}>
                Turmeric milk for anti-inflammatory benefits
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.recipeCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop' }}
              style={styles.recipeImage}
            />
            <View style={styles.recipeContent}>
              <Text style={styles.recipeTitle}>Moong Dal Khichdi</Text>
              <Text style={styles.recipeTime}>⏱️ 25 min</Text>
              <Text style={styles.recipeDescription}>
                Protein-rich comfort food for fertility
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.recipeCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop' }}
              style={styles.recipeImage}
            />
            <View style={styles.recipeContent}>
              <Text style={styles.recipeTitle}>Palak Paneer</Text>
              <Text style={styles.recipeTime}>⏱️ 20 min</Text>
              <Text style={styles.recipeDescription}>
                Iron-rich spinach curry with cottage cheese
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#FCE7F3',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '400',
    lineHeight: 22,
  },
  todayCard: {
    margin: 20,
    marginTop: 0,
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  todayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  todayTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: -0.3,
  },
  todaySubtitle: {
    fontSize: 15,
    color: '#6b7280',
    fontWeight: '400',
    lineHeight: 20,
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: -0.4,
  },
  foodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  foodItem: {
    width: '30%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  foodIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  foodName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  foodBenefit: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 16,
  },
  recipesButton: {
    margin: 20,
    marginTop: 0,
    paddingVertical: 18,
    backgroundColor: '#059669',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipesButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: -0.2,
  },
  tipsCard: {
    margin: 20,
    marginTop: 0,
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  tip: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 22,
    fontWeight: '400',
  },
  supplementCard: {
    marginBottom: 24,
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  supplementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  supplementIcon: {
    fontSize: 28,
  },
  supplementInfo: {
    flex: 1,
  },
  supplementName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  supplementSubtitle: {
    fontSize: 15,
    color: '#6b7280',
    fontWeight: '500',
  },
  supplementDescription: {
    fontSize: 15,
    color: '#6b7280',
    lineHeight: 22,
    marginBottom: 20,
    fontWeight: '400',
  },
  supplementBenefits: {
    marginBottom: 20,
  },
  benefitItem: {
    fontSize: 15,
    color: '#059669',
    marginBottom: 8,
    fontWeight: '500',
    lineHeight: 20,
  },
  supplementDosage: {
    padding: 16,
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
  },
  dosageText: {
    fontSize: 14,
    color: '#047857',
    fontWeight: '600',
    lineHeight: 18,
  },
  traditionalFoodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  traditionalFoodItem: {
    width: '30%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  traditionalFoodIcon: {
    fontSize: 28,
    marginBottom: 12,
  },
  traditionalFoodName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  traditionalFoodBenefit: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 16,
  },
  mealPlansSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  mealPlanCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  mealPlanGradient: {
    padding: 20,
  },
  mealPlanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealPlanTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  mealPlanTime: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  mealPlanDescription: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 16,
    lineHeight: 20,
  },
  mealPlanItems: {
    gap: 8,
  },
  mealPlanItem: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  fitnessSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  fitnessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  fitnessCard: {
    width: (width - 52) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  fitnessIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  fitnessTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  fitnessDuration: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '600',
    marginBottom: 8,
  },
  fitnessDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 16,
  },
  fitnessBenefits: {
    gap: 4,
  },
  fitnessBenefit: {
    fontSize: 11,
    color: '#6b7280',
    lineHeight: 14,
  },
  recipesSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  recipesScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  recipeCard: {
    width: 200,
    marginRight: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  recipeImage: {
    width: 200,
    height: 120,
    backgroundColor: '#f5f5f5',
  },
  recipeContent: {
    padding: 16,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  recipeTime: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '600',
    marginBottom: 8,
  },
  recipeDescription: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
  },
});
