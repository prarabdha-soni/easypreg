import React, { createContext, useContext, useState, ReactNode } from 'react';

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

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
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
