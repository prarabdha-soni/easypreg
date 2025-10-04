import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { Baby, Calendar, Heart, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const pregnancyData = {
  1: {
    month: 'Month 1 (Weeks 1-4)',
    week: '4 weeks',
    fruitSize: 'Poppy Seed',
    fruitEmoji: '🌱',
    babySize: '2-4mm',
    babyImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    symptoms: [
      'Missed period',
      'Nausea and morning sickness',
      'Fatigue and tiredness',
      'Breast tenderness',
      'Frequent urination',
      'Mood swings'
    ],
    foodsToEat: [
      'Folic acid rich foods (leafy greens, citrus fruits)',
      'Iron-rich foods (lean meats, beans)',
      'Whole grains and complex carbohydrates',
      'Fresh fruits and vegetables',
      'Dairy products for calcium',
      'Plenty of water'
    ],
    foodsToAvoid: [
      'Raw or undercooked meat',
      'Unpasteurized dairy products',
      'High-mercury fish (shark, swordfish)',
      'Excessive caffeine (limit to 200mg/day)',
      'Alcohol',
      'Raw eggs'
    ],
    tips: [
      'Start taking prenatal vitamins',
      'Get plenty of rest',
      'Eat small, frequent meals',
      'Stay hydrated',
      'Begin gentle exercise routine'
    ]
  },
  2: {
    month: 'Month 2 (Weeks 5-8)',
    week: '8 weeks',
    fruitSize: 'Blueberry',
    fruitEmoji: '🫐',
    babySize: '1.6cm',
    babyImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
    symptoms: [
      'Continued morning sickness',
      'Increased fatigue',
      'Breast changes and tenderness',
      'Food aversions and cravings',
      'Mood swings and emotional changes',
      'Bloating and gas'
    ],
    foodsToEat: [
      'Ginger tea for nausea relief',
      'Bland foods (crackers, rice)',
      'Protein-rich snacks',
      'Vitamin B6 rich foods (bananas, nuts)',
      'Small, frequent meals',
      'Herbal teas (peppermint, chamomile)'
    ],
    foodsToAvoid: [
      'Spicy and greasy foods',
      'Strong-smelling foods',
      'Large meals',
      'Foods that trigger nausea',
      'Raw fish and sushi',
      'Excessive sugar'
    ],
    tips: [
      'Keep crackers by your bedside',
      'Eat before getting out of bed',
      'Stay well-hydrated',
      'Get fresh air and light exercise',
      'Consider acupuncture for nausea'
    ]
  },
  3: {
    month: 'Month 3 (Weeks 9-12)',
    week: '12 weeks',
    fruitSize: 'Lime',
    fruitEmoji: '🍋',
    babySize: '5.4cm',
    babyImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center',
    symptoms: [
      'Nausea may start to improve',
      'Increased energy levels',
      'Breast tenderness continues',
      'Frequent urination',
      'Constipation',
      'Mood swings'
    ],
    foodsToEat: [
      'High-fiber foods (whole grains, fruits)',
      'Iron-rich foods (spinach, lean meat)',
      'Omega-3 rich foods (salmon, walnuts)',
      'Calcium-rich foods (dairy, leafy greens)',
      'Vitamin C foods (citrus, berries)',
      'Plenty of water and fluids'
    ],
    foodsToAvoid: [
      'Processed foods high in sodium',
      'Excessive caffeine',
      'Raw or undercooked foods',
      'High-mercury fish',
      'Unpasteurized cheeses',
      'Artificial sweeteners'
    ],
    tips: [
      'Focus on nutrient-dense foods',
      'Stay active with gentle exercise',
      'Get adequate sleep',
      'Manage stress with relaxation techniques',
      'Continue prenatal vitamins'
    ]
  },
  4: {
    month: 'Month 4 (Weeks 13-16)',
    week: '16 weeks',
    fruitSize: 'Avocado',
    fruitEmoji: '🥑',
    babySize: '11.6cm',
    babyImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    symptoms: [
      'Energy levels improve',
      'Nausea typically subsides',
      'Appetite increases',
      'Breast changes continue',
      'Possible round ligament pain',
      'Glowing skin'
    ],
    foodsToEat: [
      'Lean proteins (chicken, fish, beans)',
      'Complex carbohydrates',
      'Healthy fats (avocado, nuts)',
      'Colorful fruits and vegetables',
      'Whole grains',
      'Dairy products'
    ],
    foodsToAvoid: [
      'High-sodium processed foods',
      'Excessive caffeine',
      'Raw or undercooked foods',
      'High-mercury fish',
      'Alcohol',
      'Excessive sugar'
    ],
    tips: [
      'Enjoy increased energy',
      'Focus on balanced nutrition',
      'Stay hydrated',
      'Continue regular exercise',
      'Plan for second trimester'
    ]
  },
  5: {
    month: 'Month 5 (Weeks 17-20)',
    week: '20 weeks',
    fruitSize: 'Banana',
    fruitEmoji: '🍌',
    babySize: '16.4cm',
    babyImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
    symptoms: [
      'Baby bump becomes visible',
      'Increased appetite',
      'Possible heartburn',
      'Round ligament pain',
      'Nasal congestion',
      'Skin changes'
    ],
    foodsToEat: [
      'Calcium-rich foods (dairy, leafy greens)',
      'Iron-rich foods (lean meat, spinach)',
      'Protein sources (fish, poultry, beans)',
      'Healthy fats (nuts, avocado)',
      'Fiber-rich foods',
      'Plenty of water'
    ],
    foodsToAvoid: [
      'Spicy foods that trigger heartburn',
      'Large meals',
      'High-sodium foods',
      'Raw or undercooked foods',
      'Excessive caffeine',
      'Processed foods'
    ],
    tips: [
      'Eat smaller, frequent meals',
      'Sleep with head elevated',
      'Stay active with pregnancy-safe exercises',
      'Focus on nutrient density',
      'Stay well-hydrated'
    ]
  },
  6: {
    month: 'Month 6 (Weeks 21-24)',
    week: '24 weeks',
    fruitSize: 'Corn',
    fruitEmoji: '🌽',
    babySize: '21cm',
    babyImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center',
    symptoms: [
      'Increased energy',
      'Growing belly',
      'Possible back pain',
      'Leg cramps',
      'Increased appetite',
      'Baby movements felt'
    ],
    foodsToEat: [
      'Magnesium-rich foods (nuts, seeds)',
      'Calcium sources (dairy, leafy greens)',
      'Iron-rich foods (lean meat, beans)',
      'Omega-3 foods (fish, flaxseeds)',
      'Complex carbohydrates',
      'Fresh fruits and vegetables'
    ],
    foodsToAvoid: [
      'High-sodium foods',
      'Processed meats',
      'Raw or undercooked foods',
      'Excessive caffeine',
      'High-mercury fish',
      'Artificial additives'
    ],
    tips: [
      'Focus on bone and brain development nutrients',
      'Stay active with pregnancy exercises',
      'Get adequate rest',
      'Stay hydrated',
      'Consider prenatal massage'
    ]
  },
  7: {
    month: 'Month 7 (Weeks 25-28)',
    week: '28 weeks',
    fruitSize: 'Eggplant',
    fruitEmoji: '🍆',
    babySize: '25.6cm',
    babyImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    symptoms: [
      'Increased fatigue',
      'Back pain and discomfort',
      'Swelling in feet and ankles',
      'Shortness of breath',
      'Heartburn and indigestion',
      'Braxton Hicks contractions'
    ],
    foodsToEat: [
      'High-fiber foods for digestion',
      'Iron-rich foods (lean meat, spinach)',
      'Calcium sources (dairy, leafy greens)',
      'Protein-rich foods',
      'Healthy fats',
      'Plenty of water'
    ],
    foodsToAvoid: [
      'High-sodium foods that cause swelling',
      'Large meals that trigger heartburn',
      'Spicy foods',
      'Processed foods',
      'Excessive caffeine',
      'Raw or undercooked foods'
    ],
    tips: [
      'Eat smaller, frequent meals',
      'Elevate feet when resting',
      'Stay hydrated but limit evening fluids',
      'Focus on comfort foods',
      'Get adequate rest'
    ]
  },
  8: {
    month: 'Month 8 (Weeks 29-32)',
    week: '32 weeks',
    fruitSize: 'Coconut',
    fruitEmoji: '🥥',
    babySize: '28.2cm',
    babyImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
    symptoms: [
      'Increased discomfort',
      'Frequent urination',
      'Back pain',
      'Swelling in extremities',
      'Shortness of breath',
      'Difficulty sleeping'
    ],
    foodsToEat: [
      'Nutrient-dense foods',
      'Iron-rich sources',
      'Calcium for bone development',
      'Protein for growth',
      'Healthy fats',
      'Fiber-rich foods'
    ],
    foodsToAvoid: [
      'High-sodium foods',
      'Large meals',
      'Spicy foods',
      'Processed foods',
      'Excessive caffeine',
      'Raw foods'
    ],
    tips: [
      'Focus on comfort and nutrition',
      'Stay hydrated',
      'Get adequate rest',
      'Prepare for labor',
      'Continue prenatal care'
    ]
  },
  9: {
    month: 'Month 9 (Weeks 33-36)',
    week: '36 weeks',
    fruitSize: 'Watermelon',
    fruitEmoji: '🍉',
    babySize: '30.5cm',
    babyImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center',
    symptoms: [
      'Increased fatigue',
      'Nesting instincts',
      'Braxton Hicks contractions',
      'Pelvic pressure',
      'Difficulty sleeping',
      'Anxiety about labor'
    ],
    foodsToEat: [
      'Energy-boosting foods',
      'Iron-rich foods',
      'Calcium sources',
      'Protein for strength',
      'Complex carbohydrates',
      'Hydrating foods'
    ],
    foodsToAvoid: [
      'Heavy, greasy foods',
      'Large meals',
      'High-sodium foods',
      'Spicy foods',
      'Excessive caffeine',
      'Raw foods'
    ],
    tips: [
      'Focus on energy and strength',
      'Prepare for labor nutrition',
      'Stay hydrated',
      'Get adequate rest',
      'Final preparations'
    ]
  }
};

export default function PregnancyScreen() {
  const { profile, updateProfile } = useUser();
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  
  // Calculate current pregnancy month based on pregnancy start date
  const calculatePregnancyMonth = () => {
    if (!profile.isPregnant || !profile.pregnancyStartDate) return 1;
    
    const today = new Date();
    const startDate = new Date(profile.pregnancyStartDate);
    const diffTime = today.getTime() - startDate.getTime();
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    
    // Convert weeks to months (approximately 4.33 weeks per month)
    const month = Math.floor(diffWeeks / 4.33) + 1;
    return Math.min(month, 9); // Cap at 9 months
  };
  
  const actualCurrentMonth = profile.isPregnant ? calculatePregnancyMonth() : 1;
  const currentMonth = selectedMonth || actualCurrentMonth;
  const currentData = pregnancyData[currentMonth as keyof typeof pregnancyData];

  if (!profile.isPregnant) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Pregnancy Journey</Text>
          <Text style={styles.subtitle}>Month-by-month guidance for a healthy pregnancy</Text>
        </View>

        <View style={styles.notPregnantCard}>
          <Baby size={48} color="#e91e63" />
          <Text style={styles.notPregnantTitle}>Ready to Start Your Journey?</Text>
          <Text style={styles.notPregnantSubtitle}>
            Track your pregnancy progress and get personalized guidance for each month of your pregnancy journey.
          </Text>
          
          <TouchableOpacity 
            style={styles.confirmPregnancyButton}
            onPress={() => {
              updateProfile({
                isPregnant: true,
                pregnancyStartDate: new Date(),
                currentPregnancyMonth: 1
              });
            }}
          >
            <Text style={styles.confirmPregnancyButtonText}>I'm Pregnant!</Text>
          </TouchableOpacity>
          
          <Text style={styles.exploreText}>Or explore what to expect during pregnancy:</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pregnancy</Text>
        <Text style={styles.headerSubtitle}>Week {currentData.week.replace(' weeks', '')} of 40</Text>
      </View>

      {/* Main Content Card */}
      <View style={styles.mainCard}>
        <View style={styles.weekDisplay}>
          <Text style={styles.weekNumber}>{currentData.week.replace(' weeks', '')}</Text>
          <Text style={styles.weekLabel}>weeks</Text>
        </View>
        
        <View style={styles.babyInfo}>
          <Text style={styles.babySizeText}>Your baby is the size of</Text>
          <Text style={styles.fruitText}>{currentData.fruitSize}</Text>
          <Text style={styles.measurementText}>{currentData.babySize}</Text>
        </View>

        <View style={styles.progressBar}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${(parseInt(currentData.week.replace(' weeks', '')) / 40) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {Math.round((parseInt(currentData.week.replace(' weeks', '')) / 40) * 100)}% complete
          </Text>
        </View>
      </View>

      {/* Insights Section */}
      <View style={styles.insightsSection}>
        <Text style={styles.insightsTitle}>Today's insights</Text>
        
        <View style={styles.insightsGrid}>
          <TouchableOpacity style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <Heart size={20} color="#DC2626" />
            </View>
            <Text style={styles.insightTitle}>Symptoms</Text>
            <Text style={styles.insightSubtitle}>Track how you feel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <Baby size={20} color="#059669" />
            </View>
            <Text style={styles.insightTitle}>Development</Text>
            <Text style={styles.insightSubtitle}>Baby's growth</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <Calendar size={20} color="#6366F1" />
            </View>
            <Text style={styles.insightTitle}>Appointments</Text>
            <Text style={styles.insightSubtitle}>Upcoming visits</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <AlertTriangle size={20} color="#7C3AED" />
            </View>
            <Text style={styles.insightTitle}>Health Tips</Text>
            <Text style={styles.insightSubtitle}>Stay healthy</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Heart size={24} color="#e91e63" />
          <Text style={styles.sectionTitle}>Common Symptoms</Text>
        </View>
        
        <View style={styles.symptomsGrid}>
          {currentData.symptoms.map((symptom, index) => (
            <View key={index} style={styles.symptomItem}>
              <Text style={styles.symptomIcon}>🤰</Text>
              <Text style={styles.symptomText}>{symptom}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <CheckCircle size={24} color="#4caf50" />
          <Text style={styles.sectionTitle}>Foods to Eat</Text>
        </View>
        
        <View style={styles.foodsGrid}>
          {currentData.foodsToEat.map((food, index) => (
            <View key={index} style={styles.foodItem}>
              <Text style={styles.foodIcon}>✅</Text>
              <Text style={styles.foodText}>{food}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <XCircle size={24} color="#f44336" />
          <Text style={styles.sectionTitle}>Foods to Avoid</Text>
        </View>
        
        <View style={styles.foodsGrid}>
          {currentData.foodsToAvoid.map((food, index) => (
            <View key={index} style={styles.foodItem}>
              <Text style={styles.foodIcon}>❌</Text>
              <Text style={styles.foodText}>{food}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Calendar size={24} color="#ff9800" />
          <Text style={styles.sectionTitle}>Monthly Tips</Text>
        </View>
        
        <View style={styles.tipsCard}>
          {currentData.tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.tipIcon}>💡</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.alertCard}>
        <AlertTriangle size={24} color="#ff9800" />
        <View style={styles.alertContent}>
          <Text style={styles.alertTitle}>Important Reminder</Text>
          <Text style={styles.alertText}>
            Always consult with your healthcare provider before making significant dietary changes during pregnancy. 
            Individual needs may vary based on your health condition and pregnancy progress.
          </Text>
        </View>
      </View>

      <View style={styles.monthSelector}>
        <View style={styles.monthSelectorHeader}>
          <Text style={styles.monthSelectorTitle}>Explore Other Months</Text>
          {profile.isPregnant && selectedMonth && (
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={() => setSelectedMonth(null)}
            >
              <Text style={styles.resetButtonText}>Current Month</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.monthButtons}>
          {Object.keys(pregnancyData).map((month) => (
            <TouchableOpacity 
              key={month} 
              style={[
                styles.monthButton, 
                currentMonth === parseInt(month) && styles.activeMonthButton
              ]}
              onPress={() => {
                const monthNum = parseInt(month);
                setSelectedMonth(monthNum);
              }}
            >
              <Text style={[
                styles.monthButtonText,
                currentMonth === parseInt(month) && styles.activeMonthButtonText
              ]}>
                {month}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbfc',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  mainCard: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
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
  weekDisplay: {
    alignItems: 'center',
    marginBottom: 24,
  },
  weekNumber: {
    fontSize: 48,
    fontWeight: '800',
    color: '#8B5CF6',
    lineHeight: 56,
  },
  weekLabel: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  babyInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  babySizeText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  fruitText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  measurementText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  progressBar: {
    marginTop: 8,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  insightsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  insightsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  insightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  insightCard: {
    width: (width - 52) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  insightSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  durationText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginRight: 8,
  },
  infoButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  settingsButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  bottomSection: {
    backgroundColor: '#ffffff',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  mainCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    minHeight: 100,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  insightsHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  insightsScroll: {
    marginBottom: 20,
  },
  insightsContent: {
    paddingRight: 20,
  },
  insightCard: {
    width: 160,
    height: 140,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  insightCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  insightCardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  plusIcon: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ff6b35',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  bodyIllustration: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 60,
    height: 80,
  },
  bodyShape: {
    width: 40,
    height: 60,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  breastArea: {
    width: 20,
    height: 15,
    backgroundColor: '#ffb3ba',
    borderRadius: 10,
    position: 'absolute',
    top: 5,
    left: 20,
  },
  uterusArea: {
    width: 30,
    height: 25,
    backgroundColor: '#ff9a9e',
    borderRadius: 15,
    position: 'absolute',
    bottom: 5,
    left: 15,
  },
  babyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#20b2aa',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  nutritionIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#90EE90',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nutritionEmoji: {
    fontSize: 20,
  },
  exerciseIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#87CEEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseEmoji: {
    fontSize: 20,
  },
  weekCalendar: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  weekLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentDay: {
    backgroundColor: '#ff6b35',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  currentDayText: {
    color: '#ffffff',
  },
  babySizeCard: {
    margin: 20,
    padding: 32,
    backgroundColor: '#ff6b35',
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  babySizeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  weekText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  dayText: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 24,
  },
  babyDevelopment: {
    alignItems: 'center',
    marginBottom: 24,
  },
  babyImageContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  babyImage: {
    width: '100%',
    height: '100%',
  },
  fruitComparisonOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  fruitEmoji: {
    fontSize: 20,
  },
  babyInfo: {
    alignItems: 'center',
  },
  fruitSizeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  babySizeText: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  detailsButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  detailsButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff6b35',
  },
  activityStats: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 16,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
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
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  monthSelector: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  monthSelectorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  monthCard: {
    width: (width - 80) / 3,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeMonthCard: {
    backgroundColor: '#fff3e0',
    borderColor: '#ff6b35',
  },
  monthCardImage: {
    position: 'relative',
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#e9ecef',
  },
  monthCardBabyImage: {
    width: '100%',
    height: '100%',
  },
  monthCardFruit: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    fontSize: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  monthCardWeek: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 2,
  },
  monthCardSize: {
    fontSize: 10,
    color: '#9ca3af',
    textAlign: 'center',
  },
  activeMonthCardText: {
    color: '#ff6b35',
  },
  resetButton: {
    backgroundColor: '#ff6b35',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    alignSelf: 'center',
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  currentMonthCard: {
    margin: 24,
    marginTop: 0,
    padding: 24,
    borderRadius: 20,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  monthInfo: {
    flex: 1,
  },
  currentMonthTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  currentMonthSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
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
  },
  symptomsGrid: {
    gap: 12,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    gap: 12,
  },
  symptomIcon: {
    fontSize: 24,
  },
  symptomText: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  foodsGrid: {
    gap: 12,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    gap: 12,
  },
  foodIcon: {
    fontSize: 20,
  },
  foodText: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
    lineHeight: 20,
  },
  tipsCard: {
    backgroundColor: '#fff8f0',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ffe082',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  tipIcon: {
    fontSize: 20,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
    lineHeight: 20,
  },
  alertCard: {
    margin: 24,
    marginTop: 0,
    padding: 20,
    backgroundColor: '#fff8f0',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ffe082',
    flexDirection: 'row',
    gap: 16,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  alertText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 21,
  },
  monthSelector: {
    padding: 24,
    paddingTop: 0,
    marginBottom: 32,
  },
  monthSelectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthSelectorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  resetButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#e91e63',
    borderRadius: 20,
  },
  resetButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  monthButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  monthButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeMonthButton: {
    backgroundColor: '#e91e63',
    borderColor: '#e91e63',
  },
  monthButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeMonthButtonText: {
    color: '#ffffff',
  },
  notPregnantCard: {
    margin: 24,
    marginTop: 0,
    padding: 32,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  notPregnantTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  notPregnantSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  confirmPregnancyButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 16,
  },
  confirmPregnancyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  exploreText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
