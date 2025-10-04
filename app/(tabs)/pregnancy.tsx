import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { Baby, Calendar, Heart, AlertTriangle, CheckCircle, XCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

const pregnancyData = {
  1: {
    month: 'Month 1 (Weeks 1-4)',
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
      <View style={styles.header}>
        <Text style={styles.title}>Pregnancy Journey</Text>
        <Text style={styles.subtitle}>Month-by-month guidance for a healthy pregnancy</Text>
      </View>

      <LinearGradient
        colors={['#e91e63', '#f8bbd9']}
        style={styles.currentMonthCard}
      >
        <View style={styles.monthHeader}>
          <Baby size={32} color="#ffffff" />
        <View style={styles.monthInfo}>
          <Text style={styles.currentMonthTitle}>{currentData.month}</Text>
          <Text style={styles.currentMonthSubtitle}>
            {selectedMonth ? 'Exploring this month' : 'Your current stage'}
          </Text>
        </View>
        </View>
      </LinearGradient>

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
