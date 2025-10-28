import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Calendar, Heart, Sunset, Flame } from 'lucide-react-native';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const generateMonths = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Generate months from 12 months ago to current month (descending order)
  const monthList = [];
  for (let i = 0; i < 12; i++) {
    const monthIndex = (currentMonth - i + 12) % 12;
    const year = currentYear - Math.floor((currentMonth - i) / 12);
    monthList.push({
      name: months[monthIndex],
      index: monthIndex,
      year: year
    });
  }
  return monthList;
};

const generateDays = (month: number, year: number) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();
  
  // If it's the current year and month, only show days up to today
  if (year === currentYear && month === currentMonth) {
    return Array.from({ length: currentDay }, (_, i) => i + 1);
  }
  
  // For past months, show all days
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

const generateYears = () => {
  const currentYear = new Date().getFullYear();
  // Generate years from current year to 5 years ago (descending order)
  return Array.from({ length: 6 }, (_, i) => currentYear - i);
};

export default function PeriodDateScreen() {
  const router = useRouter();
  const { updateProfile } = useUser();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<'control-cycle' | 'ease-perimenopause' | 'relieve-menopause' | null>(null);
  
  const today = new Date();
  // Set default to 7 days ago (typical cycle length)
  const defaultDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  
  const [selectedMonth, setSelectedMonth] = useState(defaultDate.getMonth());
  const [selectedDay, setSelectedDay] = useState(defaultDate.getDate());
  const [selectedYear, setSelectedYear] = useState(defaultDate.getFullYear());

  const handleDateSelect = () => {
    const date = new Date(selectedYear, selectedMonth, selectedDay);
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const handleComplete = () => {
    if (!selectedGoal) {
      return; // Don't proceed without a goal selected
    }

    updateProfile({
      gender: 'woman',
      age: 25,
      tryingToConceive: selectedGoal === 'control-cycle',
      planningSoon: false,
      language: 'english',
      foodPreference: 'veg',
      lastPeriodDate: selectedDate,
      cycleLength: 28,
      isRegular: true,
      hasCompletedOnboarding: true,
      healthGoal: selectedGoal,
    });

    router.replace('/(tabs)');
  };

  const days = generateDays(selectedMonth, selectedYear);
  const years = generateYears();
  const monthList = generateMonths();

  return (
    <View style={styles.outerContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Calendar size={48} color="#e91e63" />
          </View>
          
          <Text style={styles.title}>When was your last period?</Text>
          <Text style={styles.subtitle}>
            Select a past date to help us track your cycle and provide personalized insights
          </Text>

          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </TouchableOpacity>

          {/* Health Goals */}
          <Text style={styles.goalTitle}>What's your health goal?</Text>
          <Text style={styles.goalSubtitle}>Choose one to personalize your experience</Text>

          <View style={styles.goalOptions}>
            <TouchableOpacity
              style={[
                styles.goalCard,
                selectedGoal === 'control-cycle' && styles.goalCardSelected
              ]}
              onPress={() => setSelectedGoal('control-cycle')}
            >
              <View style={[styles.goalIconContainer, { backgroundColor: '#FFF5F7' }]}>
                <Heart size={32} color="#EC4899" />
              </View>
              <Text style={styles.goalCardTitle}>Control Cycle</Text>
              <Text style={styles.goalCardDescription}>
                Track your menstrual cycle, predict periods, and understand your fertility
              </Text>
              {selectedGoal === 'control-cycle' && (
                <View style={styles.selectedBadge}>
                  <Text style={styles.selectedBadgeText}>✓ Selected</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.goalCard,
                selectedGoal === 'ease-perimenopause' && styles.goalCardSelected
              ]}
              onPress={() => setSelectedGoal('ease-perimenopause')}
            >
              <View style={[styles.goalIconContainer, { backgroundColor: '#FEF3F2' }]}>
                <Sunset size={32} color="#F97316" />
              </View>
              <Text style={styles.goalCardTitle}>Ease Perimenopause</Text>
              <Text style={styles.goalCardDescription}>
                Manage symptoms, track changes, and get support during this transition
              </Text>
              {selectedGoal === 'ease-perimenopause' && (
                <View style={styles.selectedBadge}>
                  <Text style={styles.selectedBadgeText}>✓ Selected</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.goalCard,
                selectedGoal === 'relieve-menopause' && styles.goalCardSelected
              ]}
              onPress={() => setSelectedGoal('relieve-menopause')}
            >
              <View style={[styles.goalIconContainer, { backgroundColor: '#FEF9F3' }]}>
                <Flame size={32} color="#EAB308" />
              </View>
              <Text style={styles.goalCardTitle}>Relieve Menopause</Text>
              <Text style={styles.goalCardDescription}>
                Navigate hot flashes, mood changes, and other menopause symptoms
              </Text>
              {selectedGoal === 'relieve-menopause' && (
                <View style={styles.selectedBadge}>
                  <Text style={styles.selectedBadgeText}>✓ Selected</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.completeButton, !selectedGoal && styles.completeButtonDisabled]}
            onPress={handleComplete}
            disabled={!selectedGoal}
          >
            <Text style={styles.completeButtonText}>Start My Journey</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select date</Text>
            
            <View style={styles.datePickerContainer}>
              <ScrollView 
                style={styles.pickerColumn}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.pickerContent}
              >
                {monthList.map((month, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.pickerItem,
                      selectedMonth === month.index && selectedYear === month.year && styles.pickerItemSelected
                    ]}
                    onPress={() => {
                      setSelectedMonth(month.index);
                      setSelectedYear(month.year);
                    }}
                  >
                    <Text style={[
                      styles.pickerItemText,
                      selectedMonth === month.index && selectedYear === month.year && styles.pickerItemTextSelected
                    ]}>
                      {month.name} {month.year}
                    </Text>
                    {selectedMonth === month.index && selectedYear === month.year && <View style={styles.selectionLine} />}
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <ScrollView 
                style={styles.pickerColumn}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.pickerContent}
              >
                {days.map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.pickerItem,
                      selectedDay === day && styles.pickerItemSelected
                    ]}
                    onPress={() => setSelectedDay(day)}
                  >
                    <Text style={[
                      styles.pickerItemText,
                      selectedDay === day && styles.pickerItemTextSelected
                    ]}>
                      {day}
                    </Text>
                    {selectedDay === day && <View style={styles.selectionLine} />}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleDateSelect}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff5f7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 48,
    paddingHorizontal: 20,
  },
  dateButton: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e9ecef',
    marginBottom: 32,
    minWidth: 280,
  },
  dateButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  goalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 8,
  },
  goalSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  goalOptions: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
  goalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#e9ecef',
    position: 'relative',
  },
  goalCardSelected: {
    borderColor: '#EC4899',
    backgroundColor: '#FFF5F7',
  },
  goalIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  goalCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  goalCardDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  selectedBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#EC4899',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  selectedBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  completeButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 16,
    width: '100%',
    maxWidth: 300,
  },
  completeButtonDisabled: {
    backgroundColor: '#d1d5db',
    opacity: 0.6,
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 20,
    textAlign: 'left',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    height: 200,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 8,
  },
  pickerColumn: {
    flex: 1,
    marginHorizontal: 4,
  },
  pickerContent: {
    paddingVertical: 60,
  },
  pickerItem: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 2,
    position: 'relative',
  },
  pickerItemSelected: {
    backgroundColor: 'transparent',
  },
  pickerItemText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '400',
  },
  pickerItemTextSelected: {
    color: '#1a1a1a',
    fontWeight: '600',
  },
  selectionLine: {
    position: 'absolute',
    bottom: 4,
    left: 8,
    right: 8,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  confirmButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
});
