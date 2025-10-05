import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { Baby, Calendar, Heart, AlertTriangle, CheckCircle, XCircle, Info, Settings, Plus, ChevronRight, Play, BookOpen, Users, MessageCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const pregnancyData = {
  1: {
    week: 'Week 4',
    month: 'Month 1',
    fruitSize: 'Poppy Seed',
    fruitEmoji: '🌱',
    babySize: '2-4mm',
    babyImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    symptoms: ['Missed period', 'Nausea', 'Fatigue', 'Breast tenderness'],
    tips: ['Start prenatal vitamins', 'Get plenty of rest', 'Eat small frequent meals'],
    milestones: ['First prenatal visit', 'Blood tests', 'Ultrasound scan']
  },
  2: {
    week: 'Week 8',
    month: 'Month 2',
    fruitSize: 'Blueberry',
    fruitEmoji: '🫐',
    babySize: '1.6cm',
    babyImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
    symptoms: ['Morning sickness', 'Increased fatigue', 'Food aversions', 'Mood swings'],
    tips: ['Keep crackers by bedside', 'Stay hydrated', 'Get fresh air'],
    milestones: ['Heartbeat detection', 'Organ development', 'Limb buds forming']
  },
  3: {
    week: 'Week 12',
    month: 'Month 3',
    fruitSize: 'Lime',
    fruitEmoji: '🍋',
    babySize: '5.4cm',
    babyImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center',
    symptoms: ['Nausea improving', 'Energy returning', 'Frequent urination', 'Constipation'],
    tips: ['Focus on nutrient-dense foods', 'Stay active', 'Get adequate sleep'],
    milestones: ['First trimester screening', 'NT scan', 'Genetic testing']
  },
  4: {
    week: 'Week 16',
    month: 'Month 4',
    fruitSize: 'Avocado',
    fruitEmoji: '🥑',
    babySize: '11.6cm',
    babyImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    symptoms: ['Energy boost', 'Appetite increase', 'Glowing skin', 'Round ligament pain'],
    tips: ['Enjoy increased energy', 'Focus on balanced nutrition', 'Stay hydrated'],
    milestones: ['Gender reveal possible', 'Baby movements felt', 'Second trimester begins']
  },
  5: {
    week: 'Week 20',
    month: 'Month 5',
    fruitSize: 'Banana',
    fruitEmoji: '🍌',
    babySize: '16.4cm',
    babyImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
    symptoms: ['Baby bump visible', 'Heartburn', 'Nasal congestion', 'Skin changes'],
    tips: ['Eat smaller meals', 'Sleep with head elevated', 'Stay active'],
    milestones: ['Anatomy scan', 'Baby kicks', 'Belly button changes']
  },
  6: {
    week: 'Week 24',
    month: 'Month 6',
    fruitSize: 'Corn',
    fruitEmoji: '🌽',
    babySize: '21cm',
    babyImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center',
    symptoms: ['Growing belly', 'Back pain', 'Leg cramps', 'Baby movements'],
    tips: ['Focus on bone development nutrients', 'Stay active', 'Consider prenatal massage'],
    milestones: ['Viability milestone', 'Glucose test', 'Iron levels check']
  },
  7: {
    week: 'Week 28',
    month: 'Month 7',
    fruitSize: 'Eggplant',
    fruitEmoji: '🍆',
    babySize: '25.6cm',
    babyImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    symptoms: ['Increased fatigue', 'Back pain', 'Swelling', 'Braxton Hicks'],
    tips: ['Eat smaller frequent meals', 'Elevate feet when resting', 'Stay hydrated'],
    milestones: ['Third trimester begins', 'Rhogam shot', 'Gestational diabetes test']
  },
  8: {
    week: 'Week 32',
    month: 'Month 8',
    fruitSize: 'Coconut',
    fruitEmoji: '🥥',
    babySize: '28.2cm',
    babyImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center',
    symptoms: ['Increased discomfort', 'Frequent urination', 'Shortness of breath', 'Difficulty sleeping'],
    tips: ['Focus on comfort', 'Stay hydrated', 'Get adequate rest'],
    milestones: ['Growth scan', 'Group B strep test', 'Birth plan discussion']
  },
  9: {
    week: 'Week 36',
    month: 'Month 9',
    fruitSize: 'Watermelon',
    fruitEmoji: '🍉',
    babySize: '30.5cm',
    babyImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center',
    symptoms: ['Nesting instincts', 'Pelvic pressure', 'Anxiety about labor', 'Final preparations'],
    tips: ['Focus on energy', 'Prepare for labor', 'Final preparations'],
    milestones: ['Full term', 'Labor preparation', 'Hospital bag ready']
  }
};

const dailyTips = [
  "Stay hydrated with 8-10 glasses of water daily",
  "Take your prenatal vitamins with breakfast",
  "Practice gentle stretching or prenatal yoga",
  "Get 7-9 hours of quality sleep each night",
  "Eat small, frequent meals to manage nausea",
  "Practice deep breathing exercises for relaxation",
  "Avoid standing for long periods to prevent swelling",
  "Wear comfortable, supportive shoes",
  "Keep healthy snacks nearby for energy",
  "Listen to your body and rest when needed"
];

const educationalContent = [
  {
    title: "Prenatal Nutrition Guide",
    type: "Article",
    duration: "5 min read",
    icon: "🥗"
  },
  {
    title: "Safe Exercise During Pregnancy",
    type: "Video",
    duration: "12 min",
    icon: "🏃‍♀️"
  },
  {
    title: "Managing Morning Sickness",
    type: "Article",
    duration: "3 min read",
    icon: "🤢"
  },
  {
    title: "Prenatal Yoga Flow",
    type: "Video",
    duration: "20 min",
    icon: "🧘‍♀️"
  }
];

const upcomingAppointments = [
  {
    date: "Dec 15, 2024",
    time: "10:00 AM",
    type: "Prenatal Checkup",
    doctor: "Dr. Sarah Johnson"
  },
  {
    date: "Dec 22, 2024",
    time: "2:00 PM",
    type: "Ultrasound Scan",
    doctor: "Dr. Sarah Johnson"
  },
  {
    date: "Jan 5, 2025",
    time: "11:30 AM",
    type: "Glucose Test",
    doctor: "Dr. Sarah Johnson"
  }
];

export default function PregnancyScreen() {
  const { profile, updateProfile } = useUser();
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  
  // Calculate current pregnancy week based on pregnancy start date
  const calculatePregnancyWeek = () => {
    if (!profile.isPregnant || !profile.pregnancyStartDate) return 4;
    
    const today = new Date();
    const startDate = new Date(profile.pregnancyStartDate);
    const diffTime = today.getTime() - startDate.getTime();
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    
    return Math.min(diffWeeks + 4, 40); // Start from week 4, cap at 40
  };
  
  const currentWeek = calculatePregnancyWeek();
  const currentMonth = Math.ceil(currentWeek / 4);
  const currentData = pregnancyData[currentMonth as keyof typeof pregnancyData] || pregnancyData[1];
  const progressPercentage = (currentWeek / 40) * 100;
  const daysRemaining = 280 - (currentWeek * 7);

  if (!profile.isPregnant) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Pregnancy Journey</Text>
          <Text style={styles.subtitle}>Track your pregnancy progress and get personalized guidance</Text>
        </View>

        <View style={styles.notPregnantCard}>
          <Baby size={48} color="#EC4899" />
          <Text style={styles.notPregnantTitle}>Ready to Start Your Journey?</Text>
          <Text style={styles.notPregnantSubtitle}>
            Track your pregnancy progress and get personalized guidance for each week of your pregnancy journey.
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
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Pregnancy</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={20} color="#EC4899" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>Week {currentWeek} of 40</Text>
      </View>

      {/* Main Progress Card */}
      <View style={styles.mainCard}>
        <View style={styles.weekDisplay}>
          <Text style={styles.weekNumber}>{currentWeek}</Text>
          <Text style={styles.weekLabel}>WEEKS</Text>
        </View>
        
        <View style={styles.babyInfo}>
          <Text style={styles.babySizeText}>Your baby is the size of a</Text>
          <Text style={styles.fruitText}>{currentData.fruitSize}</Text>
          <Text style={styles.measurementText}>{currentData.babySize}</Text>
        </View>

        <View style={styles.progressBar}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
          </View>
          <Text style={styles.progressText}>{daysRemaining} days until due date</Text>
        </View>
      </View>

      {/* Daily Health Tip */}
      <View style={styles.dailyTipCard}>
        <View style={styles.tipHeader}>
          <Info size={20} color="#EC4899" />
          <Text style={styles.tipTitle}>Today's Health Tip</Text>
        </View>
        <Text style={styles.tipText}>
          {dailyTips[currentWeek % dailyTips.length]}
        </Text>
      </View>

      {/* Baby Development Visual */}
      <View style={styles.babyDevelopmentCard}>
        <View style={styles.babyImageContainer}>
          <Image source={{ uri: currentData.babyImage }} style={styles.babyImage} />
          <View style={styles.fruitComparisonOverlay}>
            <Text style={styles.fruitEmoji}>{currentData.fruitEmoji}</Text>
          </View>
        </View>
        <View style={styles.babyInfo}>
          <Text style={styles.babySizeText}>Your baby is the size of a</Text>
          <Text style={styles.fruitText}>{currentData.fruitSize}</Text>
          <Text style={styles.measurementText}>{currentData.babySize}</Text>
        </View>
      </View>

      {/* Symptom Tracker */}
      <View style={styles.symptomTrackerCard}>
        <Text style={styles.sectionTitle}>Log Your Symptoms</Text>
        <View style={styles.symptomsGrid}>
          {currentData.symptoms.map((symptom, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.symptomButton,
                selectedSymptom === symptom && styles.selectedSymptomButton
              ]}
              onPress={() => setSelectedSymptom(selectedSymptom === symptom ? null : symptom)}
            >
              <Text style={styles.symptomEmoji}>🤰</Text>
              <Text style={[
                styles.symptomText,
                selectedSymptom === symptom && styles.selectedSymptomText
              ]}>
                {symptom}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.addSymptomButton}>
          <Plus size={16} color="#EC4899" />
          <Text style={styles.addSymptomText}>Add Custom Symptom</Text>
        </TouchableOpacity>
      </View>

      {/* Upcoming Milestones & Reminders */}
      <View style={styles.milestonesCard}>
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        {upcomingAppointments.map((appointment, index) => (
          <View key={index} style={styles.appointmentItem}>
            <View style={styles.appointmentDate}>
              <Text style={styles.appointmentDay}>{appointment.date.split(' ')[1]}</Text>
              <Text style={styles.appointmentMonth}>{appointment.date.split(' ')[0]}</Text>
            </View>
            <View style={styles.appointmentDetails}>
              <Text style={styles.appointmentType}>{appointment.type}</Text>
              <Text style={styles.appointmentTime}>{appointment.time}</Text>
              <Text style={styles.appointmentDoctor}>{appointment.doctor}</Text>
            </View>
            <TouchableOpacity style={styles.appointmentButton}>
              <ChevronRight size={16} color="#EC4899" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Educational Articles & Videos */}
      <View style={styles.educationalCard}>
        <Text style={styles.sectionTitle}>Educational Content</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.educationalScroll}>
          {educationalContent.map((content, index) => (
            <TouchableOpacity key={index} style={styles.educationalItem}>
              <View style={styles.educationalIcon}>
                <Text style={styles.educationalEmoji}>{content.icon}</Text>
              </View>
              <Text style={styles.educationalTitle}>{content.title}</Text>
              <Text style={styles.educationalType}>{content.type}</Text>
              <Text style={styles.educationalDuration}>{content.duration}</Text>
              <TouchableOpacity style={styles.playButton}>
                <Play size={16} color="#EC4899" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Community & Support Access */}
      <View style={styles.communityCard}>
        <Text style={styles.sectionTitle}>Community & Support</Text>
        <View style={styles.communityButtons}>
          <TouchableOpacity style={styles.communityButton}>
            <Users size={20} color="#EC4899" />
            <Text style={styles.communityButtonText}>Join Community</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.communityButton}>
            <MessageCircle size={20} color="#EC4899" />
            <Text style={styles.communityButtonText}>Expert Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.communityButton}>
            <BookOpen size={20} color="#EC4899" />
            <Text style={styles.communityButtonText}>Resources</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Add Button */}
      <TouchableOpacity style={styles.quickAddButton}>
        <Plus size={24} color="#ffffff" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF7F7',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#FCE7F3',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#EC4899',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainCard: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  weekDisplay: {
    alignItems: 'center',
    marginBottom: 24,
  },
  weekNumber: {
    fontSize: 64,
    fontWeight: '800',
    color: '#EC4899',
    lineHeight: 72,
  },
  weekLabel: {
    fontSize: 18,
    color: '#6b7280',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
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
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  measurementText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  progressBar: {
    marginTop: 8,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#EC4899',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  dailyTipCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#fff8f0',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ffe082',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginLeft: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#1a1a1a',
    lineHeight: 20,
  },
  babyDevelopmentCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
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
  babyImageContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#f8f9fa',
    borderWidth: 3,
    borderColor: '#EC4899',
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
  symptomTrackerCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  symptomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  selectedSymptomButton: {
    backgroundColor: '#EC4899',
    borderColor: '#EC4899',
  },
  symptomEmoji: {
    fontSize: 16,
    marginRight: 8,
  },
  symptomText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  selectedSymptomText: {
    color: '#ffffff',
  },
  addSymptomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EC4899',
    borderStyle: 'dashed',
  },
  addSymptomText: {
    fontSize: 14,
    color: '#EC4899',
    fontWeight: '500',
    marginLeft: 8,
  },
  milestonesCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
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
  appointmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  appointmentDate: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 60,
  },
  appointmentDay: {
    fontSize: 20,
    fontWeight: '700',
    color: '#EC4899',
  },
  appointmentMonth: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  appointmentDetails: {
    flex: 1,
  },
  appointmentType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  appointmentTime: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  appointmentDoctor: {
    fontSize: 12,
    color: '#9ca3af',
  },
  appointmentButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  educationalCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
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
  educationalScroll: {
    marginBottom: 16,
  },
  educationalItem: {
    width: 160,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    position: 'relative',
  },
  educationalIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  educationalEmoji: {
    fontSize: 20,
  },
  educationalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 4,
  },
  educationalType: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  educationalDuration: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 12,
  },
  playButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EC4899',
    alignItems: 'center',
    justifyContent: 'center',
  },
  communityCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
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
  communityButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  communityButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  communityButtonText: {
    fontSize: 14,
    color: '#EC4899',
    fontWeight: '600',
    marginLeft: 8,
  },
  quickAddButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EC4899',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
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
    backgroundColor: '#EC4899',
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
});