import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { SubscriptionService, SubscriptionStatus } from '@/services/SubscriptionService';

interface SubscriptionContextType {
  subscription: SubscriptionStatus;
  isLoading: boolean;
  refreshSubscription: () => Promise<void>;
  hasFeature: (featureId: string) => Promise<boolean>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscription, setSubscription] = useState<SubscriptionStatus>({
    tier: 'free',
    isActive: true,
    startDate: null,
    endDate: null,
    autoRenew: false,
    paymentMethod: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const subscriptionService = SubscriptionService.getInstance();

  const loadSubscription = async () => {
    try {
      const status = await subscriptionService.getSubscriptionStatus();
      setSubscription(status);
    } catch (error) {
      console.error('Error loading subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSubscription();
  }, []);

  const refreshSubscription = async () => {
    await loadSubscription();
  };

  const hasFeature = async (featureId: string): Promise<boolean> => {
    return subscriptionService.hasFeatureAccess(featureId);
  };

  return (
    <SubscriptionContext.Provider value={{ subscription, isLoading, refreshSubscription, hasFeature }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}

