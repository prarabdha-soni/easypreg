import { SymptomTrackingService, DailySymptomEntry, SymptomPattern } from './SymptomTrackingService';
import { getCycleDay, getCurrentHormonalPhase } from './ThemeService';

export interface Insight {
  id: string;
  type: 'pattern' | 'prediction' | 'recommendation' | 'trend';
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'positive';
  confidence: number; // 0-100
  actionable: boolean;
  actionText?: string;
}

export class InsightsService {
  private static instance: InsightsService;
  private symptomService: SymptomTrackingService;

  private constructor() {
    this.symptomService = SymptomTrackingService.getInstance();
  }

  public static getInstance(): InsightsService {
    if (!InsightsService.instance) {
      InsightsService.instance = new InsightsService();
    }
    return InsightsService.instance;
  }

  // Generate personalized insights based on user data
  public async generateInsights(lastPeriodDate: Date | null): Promise<Insight[]> {
    const insights: Insight[] = [];
    
    if (!lastPeriodDate) {
      insights.push({
        id: 'no-data',
        type: 'recommendation',
        title: 'Start Tracking Your Cycle',
        description: 'Log your symptoms daily to unlock personalized insights about your cycle patterns.',
        severity: 'info',
        confidence: 100,
        actionable: true,
        actionText: 'Start Tracking',
      });
      return insights;
    }

    const entries = await this.symptomService.getAllEntries();
    
    if (entries.length < 7) {
      insights.push({
        id: 'need-more-data',
        type: 'recommendation',
        title: 'Keep Tracking',
        description: `You've logged ${entries.length} days. Track for at least 2-3 cycles to see meaningful patterns.`,
        severity: 'info',
        confidence: 100,
        actionable: false,
      });
    }

    // Analyze patterns
    const patterns = this.symptomService.analyzePatterns(entries);
    
    // Generate pattern insights
    for (const pattern of patterns) {
      if (pattern.frequency > 50 && pattern.averageSeverity > 5) {
        insights.push({
          id: `pattern-${pattern.symptom}-${pattern.phase}`,
          type: 'pattern',
          title: `${this.formatSymptomName(pattern.symptom)} in ${pattern.phase} Phase`,
          description: `You experience ${this.formatSymptomName(pattern.symptom)} ${pattern.frequency}% of the time during ${pattern.phase} phase, with average severity of ${pattern.averageSeverity}/10.`,
          severity: pattern.averageSeverity > 7 ? 'warning' : 'info',
          confidence: Math.min(100, pattern.frequency),
          actionable: true,
          actionText: 'View Recommendations',
        });
      }
    }

    // Predict next period
    const nextPeriodInsight = this.predictNextPeriod(lastPeriodDate, entries);
    if (nextPeriodInsight) insights.push(nextPeriodInsight);

    // Energy pattern insights
    const energyInsight = this.analyzeEnergyPatterns(entries);
    if (energyInsight) insights.push(energyInsight);

    // Sleep pattern insights
    const sleepInsight = this.analyzeSleepPatterns(entries);
    if (sleepInsight) insights.push(sleepInsight);

    // Mood pattern insights
    const moodInsight = this.analyzeMoodPatterns(entries);
    if (moodInsight) insights.push(moodInsight);

    // Symptom correlation insights
    const correlationInsights = this.findSymptomCorrelations(entries);
    insights.push(...correlationInsights);

    // Sort by confidence and severity
    return insights.sort((a, b) => {
      const severityOrder = { warning: 3, info: 2, positive: 1 };
      if (severityOrder[a.severity] !== severityOrder[b.severity]) {
        return severityOrder[b.severity] - severityOrder[a.severity];
      }
      return b.confidence - a.confidence;
    });
  }

  private predictNextPeriod(lastPeriodDate: Date, entries: DailySymptomEntry[]): Insight | null {
    const today = new Date();
    const cycleDay = getCycleDay(lastPeriodDate);
    const daysUntilPeriod = 28 - cycleDay;
    
    if (daysUntilPeriod > 7) return null;
    
    // Look for pre-period symptoms in past cycles
    const prePeriodEntries = entries.filter(e => {
      const day = e.cycleDay;
      return day >= 24 && day <= 28; // Last 5 days of cycle
    });
    
    const hasPrePeriodSymptoms = prePeriodEntries.some(e => 
      e.symptoms.cramps > 3 || 
      e.symptoms.bloating > 3 || 
      e.symptoms.mood_swings > 3 ||
      e.symptoms.fatigue > 5
    );
    
    if (daysUntilPeriod <= 3 && hasPrePeriodSymptoms) {
      return {
        id: 'period-prediction',
        type: 'prediction',
        title: 'Your Period is Coming Soon',
        description: `Based on your cycle, your period is likely to start in ${daysUntilPeriod} day${daysUntilPeriod !== 1 ? 's' : ''}. Prepare with iron-rich meals and gentle movement.`,
        severity: 'info',
        confidence: 85,
        actionable: true,
        actionText: 'View Preparation Tips',
      };
    }
    
    return null;
  }

  private analyzeEnergyPatterns(entries: DailySymptomEntry[]): Insight | null {
    if (entries.length < 14) return null;
    
    const phaseEnergy: Record<string, number[]> = {};
    entries.forEach(e => {
      if (!phaseEnergy[e.phase]) phaseEnergy[e.phase] = [];
      phaseEnergy[e.phase].push(e.energyLevel);
    });
    
    const phaseAverages: Record<string, number> = {};
    Object.entries(phaseEnergy).forEach(([phase, levels]) => {
      phaseAverages[phase] = levels.reduce((a, b) => a + b, 0) / levels.length;
    });
    
    const highestPhase = Object.entries(phaseAverages)
      .sort((a, b) => b[1] - a[1])[0];
    const lowestPhase = Object.entries(phaseAverages)
      .sort((a, b) => a[1] - b[1])[0];
    
    if (highestPhase && lowestPhase && highestPhase[1] - lowestPhase[1] > 2) {
      return {
        id: 'energy-pattern',
        type: 'pattern',
        title: `Your Energy Peaks in ${highestPhase[0]} Phase`,
        description: `Your energy averages ${highestPhase[1].toFixed(1)}/10 during ${highestPhase[0]} phase, compared to ${lowestPhase[1].toFixed(1)}/10 in ${lowestPhase[0]} phase. Schedule important activities during your peak phase!`,
        severity: 'positive',
        confidence: 75,
        actionable: true,
        actionText: 'View Best Days',
      };
    }
    
    return null;
  }

  private analyzeSleepPatterns(entries: DailySymptomEntry[]): Insight | null {
    if (entries.length < 14) return null;
    
    const phaseSleep: Record<string, number[]> = {};
    entries.forEach(e => {
      if (!phaseSleep[e.phase]) phaseSleep[e.phase] = [];
      phaseSleep[e.phase].push(e.sleepQuality);
    });
    
    const phaseAverages: Record<string, number> = {};
    Object.entries(phaseSleep).forEach(([phase, qualities]) => {
      phaseAverages[phase] = qualities.reduce((a, b) => a + b, 0) / qualities.length;
    });
    
    const worstPhase = Object.entries(phaseAverages)
      .sort((a, b) => a[1] - b[1])[0];
    
    if (worstPhase && worstPhase[1] < 6) {
      return {
        id: 'sleep-pattern',
        type: 'pattern',
        title: `Sleep Quality Drops in ${worstPhase[0]} Phase`,
        description: `Your sleep quality averages ${worstPhase[1].toFixed(1)}/10 during ${worstPhase[0]} phase. Try magnesium supplements and a cooler room temperature.`,
        severity: 'warning',
        confidence: 70,
        actionable: true,
        actionText: 'View Sleep Tips',
      };
    }
    
    return null;
  }

  private analyzeMoodPatterns(entries: DailySymptomEntry[]): Insight | null {
    if (entries.length < 14) return null;
    
    const moodScores: Record<string, number> = {
      '😊': 3,
      '😐': 2,
      '😌': 2,
      '😔': 1,
      '😤': 1,
      '😴': 2,
    };
    
    const phaseMoods: Record<string, number[]> = {};
    entries.forEach(e => {
      if (e.mood) {
        if (!phaseMoods[e.phase]) phaseMoods[e.phase] = [];
        phaseMoods[e.phase].push(moodScores[e.mood] || 2);
      }
    });
    
    const phaseAverages: Record<string, number> = {};
    Object.entries(phaseMoods).forEach(([phase, scores]) => {
      phaseAverages[phase] = scores.reduce((a, b) => a + b, 0) / scores.length;
    });
    
    const lowestPhase = Object.entries(phaseAverages)
      .sort((a, b) => a[1] - b[1])[0];
    
    if (lowestPhase && lowestPhase[1] < 1.8) {
      return {
        id: 'mood-pattern',
        type: 'pattern',
        title: `Mood Tends to Drop in ${lowestPhase[0]} Phase`,
        description: `Your mood is typically lower during ${lowestPhase[0]} phase. This is normal due to hormonal changes. Practice self-care and consider talking to a healthcare provider if it's severe.`,
        severity: 'warning',
        confidence: 65,
        actionable: true,
        actionText: 'View Self-Care Tips',
      };
    }
    
    return null;
  }

  private findSymptomCorrelations(entries: DailySymptomEntry[]): Insight[] {
    const insights: Insight[] = [];
    
    if (entries.length < 21) return insights;
    
    // Check if fatigue correlates with poor sleep
    const fatigueWithPoorSleep = entries.filter(e => 
      e.symptoms.fatigue > 5 && e.sleepQuality < 5
    ).length;
    const totalFatigue = entries.filter(e => e.symptoms.fatigue > 5).length;
    
    if (totalFatigue > 5 && fatigueWithPoorSleep / totalFatigue > 0.6) {
      insights.push({
        id: 'fatigue-sleep-correlation',
        type: 'pattern',
        title: 'Fatigue Correlates with Poor Sleep',
        description: `${Math.round((fatigueWithPoorSleep / totalFatigue) * 100)}% of your fatigue days also have poor sleep quality. Improving sleep may help reduce fatigue.`,
        severity: 'info',
        confidence: 70,
        actionable: true,
        actionText: 'View Sleep Tips',
      });
    }
    
    // Check if mood swings correlate with anxiety
    const moodSwingsWithAnxiety = entries.filter(e => 
      e.symptoms.mood_swings > 5 && e.symptoms.anxiety > 5
    ).length;
    const totalMoodSwings = entries.filter(e => e.symptoms.mood_swings > 5).length;
    
    if (totalMoodSwings > 5 && moodSwingsWithAnxiety / totalMoodSwings > 0.5) {
      insights.push({
        id: 'mood-anxiety-correlation',
        type: 'pattern',
        title: 'Mood Swings Often Co-occur with Anxiety',
        description: `When you experience mood swings, you also often experience anxiety. Consider stress management techniques during these times.`,
        severity: 'info',
        confidence: 65,
        actionable: true,
        actionText: 'View Stress Management',
      });
    }
    
    return insights;
  }

  private formatSymptomName(symptom: string): string {
    const names: Record<string, string> = {
      cramps: 'Cramps',
      bloating: 'Bloating',
      headache: 'Headaches',
      fatigue: 'Fatigue',
      mood_swings: 'Mood Swings',
      acne: 'Acne',
      back_pain: 'Back Pain',
      breast_tenderness: 'Breast Tenderness',
      nausea: 'Nausea',
      constipation: 'Constipation',
      diarrhea: 'Diarrhea',
      insomnia: 'Insomnia',
      anxiety: 'Anxiety',
      irritability: 'Irritability',
      food_cravings: 'Food Cravings',
      low_libido: 'Low Libido',
      high_libido: 'High Libido',
      hot_flashes: 'Hot Flashes',
      brain_fog: 'Brain Fog',
    };
    return names[symptom] || symptom;
  }
}

