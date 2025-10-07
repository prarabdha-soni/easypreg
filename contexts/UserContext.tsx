import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { NotificationService } from '@/services/NotificationService';

interface UserProfile {
  gender: 'woman' | 'man' | 'couple' | null;
  age: number | null;
  tryingToConceive: boolean;
  planningSoon: boolean;
  language: 'english' | 'hindi' | 'regional';
  foodPreference: 'veg' | 'non-veg' | 'vegan' | 'ayurvedic';
  lastPeriodDate: Date | null;
  cycleLength: number;
  isRegular: boolean;
  hasCompletedOnboarding: boolean;
  isPregnant: boolean;
  pregnancyStartDate: Date | null;
  currentPregnancyMonth: number | null;
}

interface UserContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const defaultProfile: UserProfile = {
  gender: null,
  age: null,
  tryingToConceive: true,
  planningSoon: false,
  language: 'english',
  foodPreference: 'veg',
  lastPeriodDate: null,
  cycleLength: 28,
  isRegular: true,
  hasCompletedOnboarding: false,
  isPregnant: false,
  pregnancyStartDate: null,
  currentPregnancyMonth: null,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [notificationService] = useState(() => NotificationService.getInstance());

  useEffect(() => {
    // Initialize notification service when app starts
    notificationService.initialize();
  }, [notificationService]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    // Calculate the next profile state synchronously so we can decide scheduling accurately
    const nextProfile: UserProfile = { ...profile, ...updates };
    setProfile(nextProfile);

    // If we have enough data, (re)schedule notifications even if fields were set in separate calls
    if (nextProfile.lastPeriodDate && nextProfile.cycleLength) {
      try {
        await notificationService.updateCycleData(
          nextProfile.lastPeriodDate,
          nextProfile.cycleLength,
          5 // Default period length
        );
      } catch (error) {
        console.error('Error updating notification service:', error);
      }
    }
  };

  return (
    <UserContext.Provider value={{ profile, updateProfile }}>
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
