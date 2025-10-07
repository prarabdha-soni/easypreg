import AsyncStorage from '@react-native-async-storage/async-storage';

// Hormone levels throughout cycle
export enum HormoneType {
  ESTROGEN = 'estrogen',
  PROGESTERONE = 'progesterone',
  TESTOSTERONE = 'testosterone',
  CORTISOL = 'cortisol',
  INSULIN = 'insulin',
  THYROID = 'thyroid'
}

// Health prediction categories
export enum HealthCategory {
  HAIR = 'hair',
  SKIN = 'skin',
  WEIGHT = 'weight',
  ENERGY = 'energy',
  MOOD = 'mood',
  SLEEP = 'sleep',
  DIGESTION = 'digestion',
  IMMUNE = 'immune'
}

// Cycle phases with detailed hormone profiles
export enum CyclePhase {
  MENSTRUAL = 'menstrual',        // Days 1-5
  FOLLICULAR = 'follicular',      // Days 6-13
  OVULATORY = 'ovulatory',        // Days 14-16
  LUTEAL = 'luteal'              // Days 17-28
}

// Health prediction interface
export interface HealthPrediction {
  category: HealthCategory;
  score: number; // 0-100
  trend: 'improving' | 'stable' | 'declining';
  recommendations: string[];
  supplements: string[];
  lifestyle: string[];
  phase: CyclePhase;
  confidence: number; // 0-100
}

// Hormone profile for each cycle phase
const HORMONE_PROFILES = {
  [CyclePhase.MENSTRUAL]: {
    [HormoneType.ESTROGEN]: { level: 0.2, trend: 'rising' },
    [HormoneType.PROGESTERONE]: { level: 0.1, trend: 'stable' },
    [HormoneType.TESTOSTERONE]: { level: 0.3, trend: 'stable' },
    [HormoneType.CORTISOL]: { level: 0.8, trend: 'high' },
    [HormoneType.INSULIN]: { level: 0.6, trend: 'sensitive' },
    [HormoneType.THYROID]: { level: 0.7, trend: 'active' }
  },
  [CyclePhase.FOLLICULAR]: {
    [HormoneType.ESTROGEN]: { level: 0.6, trend: 'rising' },
    [HormoneType.PROGESTERONE]: { level: 0.2, trend: 'stable' },
    [HormoneType.TESTOSTERONE]: { level: 0.4, trend: 'rising' },
    [HormoneType.CORTISOL]: { level: 0.5, trend: 'normal' },
    [HormoneType.INSULIN]: { level: 0.4, trend: 'normal' },
    [HormoneType.THYROID]: { level: 0.8, trend: 'active' }
  },
  [CyclePhase.OVULATORY]: {
    [HormoneType.ESTROGEN]: { level: 1.0, trend: 'peak' },
    [HormoneType.PROGESTERONE]: { level: 0.3, trend: 'rising' },
    [HormoneType.TESTOSTERONE]: { level: 0.6, trend: 'peak' },
    [HormoneType.CORTISOL]: { level: 0.4, trend: 'normal' },
    [HormoneType.INSULIN]: { level: 0.3, trend: 'sensitive' },
    [HormoneType.THYROID]: { level: 0.9, trend: 'peak' }
  },
  [CyclePhase.LUTEAL]: {
    [HormoneType.ESTROGEN]: { level: 0.7, trend: 'declining' },
    [HormoneType.PROGESTERONE]: { level: 0.9, trend: 'peak' },
    [HormoneType.TESTOSTERONE]: { level: 0.3, trend: 'declining' },
    [HormoneType.CORTISOL]: { level: 0.7, trend: 'rising' },
    [HormoneType.INSULIN]: { level: 0.8, trend: 'resistant' },
    [HormoneType.THYROID]: { level: 0.5, trend: 'declining' }
  }
};

// Health predictions based on hormone levels
const HEALTH_PREDICTIONS = {
  [HealthCategory.HAIR]: {
    [CyclePhase.MENSTRUAL]: {
      score: 60,
      trend: 'declining' as const,
      recommendations: [
        "Use gentle, sulfate-free shampoos",
        "Apply hair masks with biotin and keratin",
        "Avoid heat styling during this phase"
      ],
      supplements: ["Iron", "Biotin", "Zinc", "Vitamin D"],
      lifestyle: ["Gentle scalp massage", "Protective hairstyles", "Avoid tight ponytails"]
    },
    [CyclePhase.FOLLICULAR]: {
      score: 85,
      trend: 'improving' as const,
      recommendations: [
        "Perfect time for hair treatments",
        "Try new hairstyles and colors",
        "Focus on scalp health"
      ],
      supplements: ["Biotin", "Collagen", "Vitamin C", "Iron"],
      lifestyle: ["Regular trims", "Scalp exfoliation", "Hair growth treatments"]
    },
    [CyclePhase.OVULATORY]: {
      score: 95,
      trend: 'improving' as const,
      recommendations: [
        "Hair is at its strongest and shiniest",
        "Ideal time for major hair changes",
        "Focus on maintenance and protection"
      ],
      supplements: ["Biotin", "Omega-3", "Vitamin E", "Silica"],
      lifestyle: ["Deep conditioning", "UV protection", "Gentle brushing"]
    },
    [CyclePhase.LUTEAL]: {
      score: 70,
      trend: 'stable' as const,
      recommendations: [
        "Focus on hair strengthening",
        "Use protein treatments",
        "Avoid harsh chemicals"
      ],
      supplements: ["Biotin", "Iron", "Vitamin B12", "Folic acid"],
      lifestyle: ["Gentle care", "Moisturizing treatments", "Avoid over-washing"]
    }
  },
  [HealthCategory.SKIN]: {
    [CyclePhase.MENSTRUAL]: {
      score: 50,
      trend: 'declining' as const,
      recommendations: [
        "Use gentle, non-comedogenic products",
        "Focus on hydration and barrier repair",
        "Avoid harsh exfoliants"
      ],
      supplements: ["Zinc", "Omega-3", "Vitamin A", "Probiotics"],
      lifestyle: ["Gentle cleansing", "Moisturizing", "Avoid picking at skin"]
    },
    [CyclePhase.FOLLICULAR]: {
      score: 80,
      trend: 'improving' as const,
      recommendations: [
        "Perfect time for new skincare routines",
        "Try active ingredients like retinol",
        "Focus on prevention and protection"
      ],
      supplements: ["Vitamin C", "Collagen", "Hyaluronic acid", "Antioxidants"],
      lifestyle: ["Regular cleansing", "Sun protection", "Gentle exfoliation"]
    },
    [CyclePhase.OVULATORY]: {
      score: 95,
      trend: 'improving' as const,
      recommendations: [
        "Skin is at its most radiant",
        "Ideal time for treatments and procedures",
        "Focus on maintenance and enhancement"
      ],
      supplements: ["Vitamin C", "Vitamin E", "Zinc", "Selenium"],
      lifestyle: ["Consistent routine", "Sun protection", "Hydration focus"]
    },
    [CyclePhase.LUTEAL]: {
      score: 65,
      trend: 'declining' as const,
      recommendations: [
        "Focus on oil control and pore care",
        "Use gentle, calming ingredients",
        "Prepare for potential breakouts"
      ],
      supplements: ["Zinc", "Vitamin B6", "Magnesium", "Probiotics"],
      lifestyle: ["Oil control", "Gentle exfoliation", "Stress management"]
    }
  },
  [HealthCategory.WEIGHT]: {
    [CyclePhase.MENSTRUAL]: {
      score: 70,
      trend: 'stable' as const,
      recommendations: [
        "Focus on gentle movement and rest",
        "Increase iron-rich foods",
        "Stay hydrated and manage cravings"
      ],
      supplements: ["Iron", "Magnesium", "Vitamin B12", "Fiber"],
      lifestyle: ["Gentle yoga", "Walking", "Adequate sleep", "Stress reduction"]
    },
    [CyclePhase.FOLLICULAR]: {
      score: 90,
      trend: 'improving' as const,
      recommendations: [
        "Perfect time for intense workouts",
        "Focus on strength training",
        "Try new fitness challenges"
      ],
      supplements: ["Protein", "Creatine", "Branched-chain amino acids", "Vitamin D"],
      lifestyle: ["High-intensity training", "Strength training", "Cardio", "Proper nutrition"]
    },
    [CyclePhase.OVULATORY]: {
      score: 95,
      trend: 'improving' as const,
      recommendations: [
        "Peak performance phase",
        "Focus on power and speed training",
        "Ideal for fitness goals and challenges"
      ],
      supplements: ["Protein", "Creatine", "Beta-alanine", "Caffeine"],
      lifestyle: ["Peak training", "Competition prep", "Recovery focus", "Nutrition optimization"]
    },
    [CyclePhase.LUTEAL]: {
      score: 75,
      trend: 'stable' as const,
      recommendations: [
        "Focus on endurance and recovery",
        "Manage energy levels carefully",
        "Prepare for next cycle"
      ],
      supplements: ["Magnesium", "B-vitamins", "Omega-3", "Adaptogens"],
      lifestyle: ["Moderate exercise", "Recovery focus", "Stress management", "Sleep optimization"]
    }
  }
};

// Only these categories currently have static predictions defined above
const AVAILABLE_PREDICTION_CATEGORIES: HealthCategory[] = [
  HealthCategory.HAIR,
  HealthCategory.SKIN,
  HealthCategory.WEIGHT,
];

// Fallback in case a category/phase mapping is missing
const DEFAULT_PREDICTION = (category: HealthCategory, phase: CyclePhase) => ({
  category,
  score: 70,
  trend: 'stable' as const,
  recommendations: ['Stay hydrated', 'Light movement', 'Balanced meals'],
  supplements: ['Multivitamin'],
  lifestyle: ['7-8h sleep', 'Manage stress'],
  phase,
  confidence: 60,
});

export class HormonePredictionService {
  private static instance: HormonePredictionService;
  private cycleData: any = null;
  private userProfile: any = null;

  private constructor() {}

  public static getInstance(): HormonePredictionService {
    if (!HormonePredictionService.instance) {
      HormonePredictionService.instance = new HormonePredictionService();
    }
    return HormonePredictionService.instance;
  }

  // Initialize with user data
  public async initialize(userProfile: any, cycleData: any): Promise<void> {
    this.userProfile = userProfile;
    this.cycleData = cycleData;
  }

  // Get current cycle phase
  public getCurrentCyclePhase(): CyclePhase {
    if (!this.cycleData) return CyclePhase.FOLLICULAR;

    const today = new Date();
    const daysSinceLastPeriod = Math.floor(
      (today.getTime() - this.cycleData.lastPeriodDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceLastPeriod <= 5) return CyclePhase.MENSTRUAL;
    if (daysSinceLastPeriod <= 13) return CyclePhase.FOLLICULAR;
    if (daysSinceLastPeriod <= 16) return CyclePhase.OVULATORY;
    return CyclePhase.LUTEAL;
  }

  // Get hormone levels for current phase
  public getCurrentHormoneLevels(): Record<HormoneType, { level: number; trend: string }> {
    const currentPhase = this.getCurrentCyclePhase();
    return HORMONE_PROFILES[currentPhase];
  }

  // Get health predictions for all categories
  public getAllHealthPredictions(): HealthPrediction[] {
    const currentPhase = this.getCurrentCyclePhase();
    return AVAILABLE_PREDICTION_CATEGORIES.map((category) =>
      this.getHealthPrediction(category, currentPhase)
    );
  }

  // Get specific health prediction
  public getHealthPrediction(category: HealthCategory, phase: CyclePhase): HealthPrediction {
    const categoryMap = (HEALTH_PREDICTIONS as any)[category];
    if (!categoryMap) return DEFAULT_PREDICTION(category, phase);
    const prediction = categoryMap[phase];
    if (!prediction) return DEFAULT_PREDICTION(category, phase);
    return {
      category,
      score: prediction.score,
      trend: prediction.trend,
      recommendations: prediction.recommendations,
      supplements: prediction.supplements,
      lifestyle: prediction.lifestyle,
      phase,
      confidence: this.calculateConfidence(category, phase)
    };
  }

  // Calculate prediction confidence based on user data
  private calculateConfidence(category: HealthCategory, phase: CyclePhase): number {
    // Base confidence on cycle regularity and user engagement
    let confidence = 75; // Base confidence

    if (this.cycleData?.isRegular) confidence += 15;
    if (this.userProfile?.hasCompletedOnboarding) confidence += 10;

    return Math.min(confidence, 100);
  }

  // Get personalized supplement recommendations
  public getSupplementRecommendations(): string[] {
    const currentPhase = this.getCurrentCyclePhase();
    const allSupplements = new Set<string>();

    Object.values(HealthCategory).forEach(category => {
      const prediction = this.getHealthPrediction(category, currentPhase);
      prediction.supplements.forEach(supplement => allSupplements.add(supplement));
    });

    return Array.from(allSupplements);
  }

  // Get lifestyle recommendations
  public getLifestyleRecommendations(): string[] {
    const currentPhase = this.getCurrentCyclePhase();
    const allLifestyle = new Set<string>();

    Object.values(HealthCategory).forEach(category => {
      const prediction = this.getHealthPrediction(category, currentPhase);
      prediction.lifestyle.forEach(activity => allLifestyle.add(activity));
    });

    return Array.from(allLifestyle);
  }

  // Get overall wellness score
  public getOverallWellnessScore(): number {
    const predictions = this.getAllHealthPredictions();
    const totalScore = predictions.reduce((sum, prediction) => sum + prediction.score, 0);
    return Math.round(totalScore / predictions.length);
  }

  // Get trend analysis
  public getTrendAnalysis(): { improving: number; stable: number; declining: number } {
    const predictions = this.getAllHealthPredictions();
    const trends = { improving: 0, stable: 0, declining: 0 };

    predictions.forEach(prediction => {
      trends[prediction.trend]++;
    });

    return trends;
  }

  // Save user preferences
  public async saveUserPreferences(preferences: any): Promise<void> {
    await AsyncStorage.setItem('hormonePredictionPreferences', JSON.stringify(preferences));
  }

  // Load user preferences
  public async loadUserPreferences(): Promise<any> {
    const data = await AsyncStorage.getItem('hormonePredictionPreferences');
    return data ? JSON.parse(data) : null;
  }
}
