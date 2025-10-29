import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationService } from '@/services/NotificationService';

interface UserProfile {
  age: number | null;
  menopauseStage: 'perimenopause' | 'menopause' | 'postmenopause' | null;
  healthCondition: 'menopause' | 'pcos' | 'pcod' | null;
  lastPeriodDate: Date | null;
  symptomsStartDate: Date | null;
  hasCompletedOnboarding: boolean;
  // Treatment preferences
  interestedInHRT: boolean;
  currentTreatments: string[];
  // Symptom tracking
  primarySymptoms: string[];
  symptomSeverity: 'mild' | 'moderate' | 'severe' | null;
  // Telehealth
  hasProvider: boolean;
  nextAppointment: Date | null;
}

interface UserContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isLoading: boolean;
}

const defaultProfile: UserProfile = {
  age: null,
  menopauseStage: null,
  healthCondition: null,
  lastPeriodDate: null,
  symptomsStartDate: null,
  hasCompletedOnboarding: false,
  interestedInHRT: false,
  currentTreatments: [],
  primarySymptoms: [],
  symptomSeverity: null,
  hasProvider: false,
  nextAppointment: null,
};

const STORAGE_KEY = '@user_profile';

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationService] = useState(() => NotificationService.getInstance());

  // Load profile from AsyncStorage on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedProfile) {
          const parsed = JSON.parse(storedProfile);
          // Convert date strings back to Date objects
          if (parsed.lastPeriodDate) {
            parsed.lastPeriodDate = new Date(parsed.lastPeriodDate);
          }
          if (parsed.pregnancyStartDate) {
            parsed.pregnancyStartDate = new Date(parsed.pregnancyStartDate);
          }
          setProfile(parsed);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
    // Initialize notification service when app starts
    notificationService.initialize();
  }, [notificationService]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    // Calculate the next profile state synchronously so we can decide scheduling accurately
    const nextProfile: UserProfile = { ...profile, ...updates };
    setProfile(nextProfile);

    // Save to AsyncStorage
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextProfile));
    } catch (error) {
      console.error('Error saving profile:', error);
    }

    // Schedule symptom tracking reminders if user has completed onboarding
    if (nextProfile.hasCompletedOnboarding && nextProfile.primarySymptoms.length > 0) {
      try {
        // Could schedule daily symptom tracking reminders
        await notificationService.initialize();
      } catch (error) {
        console.error('Error updating notification service:', error);
      }
    }
  };

  return (
    <UserContext.Provider value={{ profile, updateProfile, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
