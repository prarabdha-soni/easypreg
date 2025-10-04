import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { Apple, ChefHat, Book } from 'lucide-react-native';

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
  traditionalFoodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  traditionalFoodItem: {
    width: '31%',
    padding: 16,
    backgroundColor: '#fff8f0',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffe082',
  },
  traditionalFoodIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  traditionalFoodName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 4,
  },
  traditionalFoodBenefit: {
    fontSize: 11,
    color: '#e65100',
    textAlign: 'center',
    fontWeight: '500',
  },
});
