import AsyncStorage from '@react-native-async-storage/async-storage';

export type SubscriptionTier = 'free' | 'premium' | 'premium_plus';

export interface SubscriptionStatus {
  tier: SubscriptionTier;
  isActive: boolean;
  startDate: string | null;
  endDate: string | null;
  autoRenew: boolean;
  paymentMethod: string | null;
}

export interface SubscriptionFeature {
  id: string;
  name: string;
  description: string;
  free: boolean;
  premium: boolean;
  premiumPlus: boolean;
}

export const SUBSCRIPTION_FEATURES: SubscriptionFeature[] = [
  {
    id: 'basic_tracking',
    name: 'Basic Symptom Tracking',
    description: 'Track up to 5 symptoms per day',
    free: true,
    premium: true,
    premiumPlus: true,
  },
  {
    id: 'unlimited_tracking',
    name: 'Unlimited Symptom Tracking',
    description: 'Track all symptoms with detailed severity ratings',
    free: false,
    premium: true,
    premiumPlus: true,
  },
  {
    id: 'basic_analytics',
    name: 'Basic Analytics',
    description: 'View last 30 days of data',
    free: true,
    premium: true,
    premiumPlus: true,
  },
  {
    id: 'advanced_analytics',
    name: 'Advanced Analytics',
    description: 'Pattern recognition, trend analysis, and insights',
    free: false,
    premium: true,
    premiumPlus: true,
  },
  {
    id: 'ai_insights',
    name: 'AI-Powered Insights',
    description: 'Personalized pattern recognition and predictions',
    free: false,
    premium: true,
    premiumPlus: true,
  },
  {
    id: 'data_export',
    name: 'Data Export',
    description: 'Export your data as CSV for doctor visits',
    free: false,
    premium: true,
    premiumPlus: true,
  },
  {
    id: 'ad_free',
    name: 'Ad-Free Experience',
    description: 'No advertisements',
    free: false,
    premium: true,
    premiumPlus: true,
  },
  {
    id: 'personalized_meal_plans',
    name: 'Personalized Meal Plans',
    description: 'Custom meal plans based on your cycle and preferences',
    free: false,
    premium: true,
    premiumPlus: true,
  },
  {
    id: 'health_coaching',
    name: '1-on-1 Health Coaching',
    description: 'Monthly call with a certified health coach',
    free: false,
    premium: false,
    premiumPlus: true,
  },
  {
    id: 'wearable_integration',
    name: 'Wearable Integration',
    description: 'Sync with Apple Health, Fitbit, Oura Ring',
    free: false,
    premium: false,
    premiumPlus: true,
  },
  {
    id: 'custom_supplements',
    name: 'Custom Supplement Plans',
    description: 'Personalized supplement recommendations',
    free: false,
    premium: false,
    premiumPlus: true,
  },
  {
    id: 'doctor_booking',
    name: 'Doctor Appointment Booking',
    description: 'Book appointments with cycle-aware doctors',
    free: false,
    premium: false,
    premiumPlus: true,
  },
];

export class SubscriptionService {
  private static instance: SubscriptionService;
  private static STORAGE_KEY = '@subscription_status';

  private constructor() {}

  public static getInstance(): SubscriptionService {
    if (!SubscriptionService.instance) {
      SubscriptionService.instance = new SubscriptionService();
    }
    return SubscriptionService.instance;
  }

  // Get current subscription status
  public async getSubscriptionStatus(): Promise<SubscriptionStatus> {
    try {
      const stored = await AsyncStorage.getItem(SubscriptionService.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading subscription status:', error);
    }
    
    // Default to free tier
    return {
      tier: 'free',
      isActive: true,
      startDate: null,
      endDate: null,
      autoRenew: false,
      paymentMethod: null,
    };
  }

  // Update subscription status
  public async updateSubscriptionStatus(status: SubscriptionStatus): Promise<void> {
    try {
      await AsyncStorage.setItem(
        SubscriptionService.STORAGE_KEY,
        JSON.stringify(status)
      );
    } catch (error) {
      console.error('Error saving subscription status:', error);
      throw error;
    }
  }

  // Check if user has access to a feature
  public async hasFeatureAccess(featureId: string): Promise<boolean> {
    const status = await this.getSubscriptionStatus();
    const feature = SUBSCRIPTION_FEATURES.find(f => f.id === featureId);
    
    if (!feature) return false;
    
    if (status.tier === 'premium_plus') return feature.premiumPlus;
    if (status.tier === 'premium') return feature.premium;
    return feature.free;
  }

  // Subscribe to a tier (simulated - in production, integrate with payment provider)
  public async subscribe(tier: 'premium' | 'premium_plus'): Promise<void> {
    const today = new Date();
    const endDate = new Date(today);
    
    if (tier === 'premium') {
      endDate.setMonth(endDate.getMonth() + 1); // 1 month
    } else {
      endDate.setMonth(endDate.getMonth() + 1); // 1 month
    }
    
    const status: SubscriptionStatus = {
      tier,
      isActive: true,
      startDate: today.toISOString(),
      endDate: endDate.toISOString(),
      autoRenew: true,
      paymentMethod: 'card', // In production, get from payment provider
    };
    
    await this.updateSubscriptionStatus(status);
  }

  // Cancel subscription
  public async cancelSubscription(): Promise<void> {
    const status = await this.getSubscriptionStatus();
    status.autoRenew = false;
    await this.updateSubscriptionStatus(status);
  }

  // Check if subscription is expired
  public async isSubscriptionExpired(): Promise<boolean> {
    const status = await this.getSubscriptionStatus();
    if (!status.endDate) return false;
    
    const endDate = new Date(status.endDate);
    const today = new Date();
    return today > endDate;
  }

  // Get subscription pricing
  public getPricing(tier: 'premium' | 'premium_plus'): { monthly: number; yearly: number } {
    if (tier === 'premium') {
      return { monthly: 9.99, yearly: 79.99 };
    } else {
      return { monthly: 19.99, yearly: 179.99 };
    }
  }

  // Get features for a tier
  public getFeaturesForTier(tier: SubscriptionTier): SubscriptionFeature[] {
    return SUBSCRIPTION_FEATURES.filter(f => {
      if (tier === 'premium_plus') return f.premiumPlus;
      if (tier === 'premium') return f.premium;
      return f.free;
    });
  }
}

