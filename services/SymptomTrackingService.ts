import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCycleDay, getCurrentHormonalPhase } from './ThemeService';

export type SymptomType = 
  | 'cramps' 
  | 'bloating' 
  | 'headache' 
  | 'fatigue' 
  | 'mood_swings' 
  | 'acne' 
  | 'back_pain' 
  | 'breast_tenderness' 
  | 'nausea' 
  | 'constipation' 
  | 'diarrhea' 
  | 'insomnia' 
  | 'anxiety' 
  | 'irritability' 
  | 'food_cravings' 
  | 'low_libido' 
  | 'high_libido' 
  | 'hot_flashes' 
  | 'brain_fog';

export type MoodType = '😊' | '😐' | '😔' | '😴' | '😤' | '😌';

export interface DailySymptomEntry {
  date: string; // ISO date string (YYYY-MM-DD)
  symptoms: Record<SymptomType, number>; // symptom -> severity (0-10, 0 = not present)
  mood: MoodType | null;
  energyLevel: number; // 0-10
  sleepQuality: number; // 0-10
  sleepHours: number | null;
  weight: number | null; // kg
  notes: string;
  cycleDay: number;
  phase: 'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal';
}

export interface SymptomPattern {
  symptom: SymptomType;
  phase: 'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal';
  averageSeverity: number;
  frequency: number; // percentage of cycles this symptom appears
  trend: 'increasing' | 'decreasing' | 'stable';
}

export class SymptomTrackingService {
  private static instance: SymptomTrackingService;
  private lastPeriodDate: Date | null = null;

  private constructor() {}

  public static getInstance(): SymptomTrackingService {
    if (!SymptomTrackingService.instance) {
      SymptomTrackingService.instance = new SymptomTrackingService();
    }
    return SymptomTrackingService.instance;
  }

  public setLastPeriodDate(date: Date | null) {
    this.lastPeriodDate = date;
  }

  // Save daily symptom entry
  public async saveDailyEntry(entry: DailySymptomEntry): Promise<void> {
    try {
      const key = `@symptom_entry:${entry.date}`;
      await AsyncStorage.setItem(key, JSON.stringify(entry));
      
      // Also maintain a list of all entry dates for quick lookup
      const datesKey = '@symptom_entry_dates';
      const datesStr = await AsyncStorage.getItem(datesKey);
      const dates: string[] = datesStr ? JSON.parse(datesStr) : [];
      if (!dates.includes(entry.date)) {
        dates.push(entry.date);
        dates.sort();
        await AsyncStorage.setItem(datesKey, JSON.stringify(dates));
      }
    } catch (error) {
      console.error('Error saving symptom entry:', error);
      throw error;
    }
  }

  // Get entry for a specific date
  public async getEntryForDate(date: string): Promise<DailySymptomEntry | null> {
    try {
      const key = `@symptom_entry:${date}`;
      const entryStr = await AsyncStorage.getItem(key);
      if (!entryStr) return null;
      return JSON.parse(entryStr);
    } catch (error) {
      console.error('Error loading symptom entry:', error);
      return null;
    }
  }

  // Get today's entry
  public async getTodayEntry(): Promise<DailySymptomEntry | null> {
    const today = new Date().toISOString().slice(0, 10);
    return this.getEntryForDate(today);
  }

  // Get entries for a date range
  public async getEntriesForRange(startDate: string, endDate: string): Promise<DailySymptomEntry[]> {
    try {
      const datesKey = '@symptom_entry_dates';
      const datesStr = await AsyncStorage.getItem(datesKey);
      const dates: string[] = datesStr ? JSON.parse(datesStr) : [];
      
      const filteredDates = dates.filter(d => d >= startDate && d <= endDate);
      const entries: DailySymptomEntry[] = [];
      
      for (const date of filteredDates) {
        const entry = await this.getEntryForDate(date);
        if (entry) entries.push(entry);
      }
      
      return entries.sort((a, b) => a.date.localeCompare(b.date));
    } catch (error) {
      console.error('Error loading entries for range:', error);
      return [];
    }
  }

  // Get last N entries
  public async getLastNEntries(n: number): Promise<DailySymptomEntry[]> {
    try {
      const datesKey = '@symptom_entry_dates';
      const datesStr = await AsyncStorage.getItem(datesKey);
      const dates: string[] = datesStr ? JSON.parse(datesStr) : [];
      
      const lastNDates = dates.slice(-n);
      const entries: DailySymptomEntry[] = [];
      
      for (const date of lastNDates) {
        const entry = await this.getEntryForDate(date);
        if (entry) entries.push(entry);
      }
      
      return entries.sort((a, b) => a.date.localeCompare(b.date));
    } catch (error) {
      console.error('Error loading last N entries:', error);
      return [];
    }
  }

  // Get all entries
  public async getAllEntries(): Promise<DailySymptomEntry[]> {
    try {
      const datesKey = '@symptom_entry_dates';
      const datesStr = await AsyncStorage.getItem(datesKey);
      const dates: string[] = datesStr ? JSON.parse(datesStr) : [];
      
      const entries: DailySymptomEntry[] = [];
      for (const date of dates) {
        const entry = await this.getEntryForDate(date);
        if (entry) entries.push(entry);
      }
      
      return entries.sort((a, b) => a.date.localeCompare(b.date));
    } catch (error) {
      console.error('Error loading all entries:', error);
      return [];
    }
  }

  // Create a new entry for today with cycle info
  public createTodayEntry(): DailySymptomEntry {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10);
    
    let cycleDay = 0;
    let phase: 'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal' = 'Follicular';
    
    if (this.lastPeriodDate) {
      cycleDay = getCycleDay(this.lastPeriodDate);
      phase = getCurrentHormonalPhase(cycleDay);
    }
    
    const allSymptoms: Record<SymptomType, number> = {
      cramps: 0,
      bloating: 0,
      headache: 0,
      fatigue: 0,
      mood_swings: 0,
      acne: 0,
      back_pain: 0,
      breast_tenderness: 0,
      nausea: 0,
      constipation: 0,
      diarrhea: 0,
      insomnia: 0,
      anxiety: 0,
      irritability: 0,
      food_cravings: 0,
      low_libido: 0,
      high_libido: 0,
      hot_flashes: 0,
      brain_fog: 0,
    };
    
    return {
      date: dateStr,
      symptoms: allSymptoms,
      mood: null,
      energyLevel: 5,
      sleepQuality: 5,
      sleepHours: null,
      weight: null,
      notes: '',
      cycleDay,
      phase,
    };
  }

  // Analyze symptom patterns by phase
  public analyzePatterns(entries: DailySymptomEntry[]): SymptomPattern[] {
    if (entries.length === 0) return [];
    
    const patterns: SymptomPattern[] = [];
    const symptomTypes: SymptomType[] = [
      'cramps', 'bloating', 'headache', 'fatigue', 'mood_swings', 
      'acne', 'back_pain', 'breast_tenderness', 'nausea', 'constipation',
      'diarrhea', 'insomnia', 'anxiety', 'irritability', 'food_cravings',
      'low_libido', 'high_libido', 'hot_flashes', 'brain_fog'
    ];
    
    const phases: Array<'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal'> = 
      ['Menstrual', 'Follicular', 'Ovulation', 'Luteal'];
    
    for (const symptom of symptomTypes) {
      for (const phase of phases) {
        const phaseEntries = entries.filter(e => e.phase === phase);
        if (phaseEntries.length === 0) continue;
        
        const severities = phaseEntries
          .map(e => e.symptoms[symptom])
          .filter(s => s > 0);
        
        if (severities.length === 0) continue;
        
        const averageSeverity = severities.reduce((a, b) => a + b, 0) / severities.length;
        const frequency = (severities.length / phaseEntries.length) * 100;
        
        // Calculate trend (simplified - compare first half vs second half of entries)
        const sortedEntries = phaseEntries.sort((a, b) => a.date.localeCompare(b.date));
        const mid = Math.floor(sortedEntries.length / 2);
        const firstHalf = sortedEntries.slice(0, mid).map(e => e.symptoms[symptom]).filter(s => s > 0);
        const secondHalf = sortedEntries.slice(mid).map(e => e.symptoms[symptom]).filter(s => s > 0);
        
        const firstAvg = firstHalf.length > 0 ? firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length : 0;
        const secondAvg = secondHalf.length > 0 ? secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length : 0;
        
        let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
        if (secondAvg > firstAvg + 0.5) trend = 'increasing';
        else if (secondAvg < firstAvg - 0.5) trend = 'decreasing';
        
        patterns.push({
          symptom,
          phase,
          averageSeverity: Math.round(averageSeverity * 10) / 10,
          frequency: Math.round(frequency),
          trend,
        });
      }
    }
    
    // Filter to only significant patterns (frequency > 20% or severity > 3)
    return patterns.filter(p => p.frequency > 20 || p.averageSeverity > 3);
  }

  // Get symptom statistics
  public getSymptomStats(entries: DailySymptomEntry[], symptom: SymptomType): {
    totalOccurrences: number;
    averageSeverity: number;
    maxSeverity: number;
    mostCommonPhase: string;
  } {
    const occurrences = entries.filter(e => e.symptoms[symptom] > 0);
    const severities = occurrences.map(e => e.symptoms[symptom]);
    
    const phaseCounts: Record<string, number> = {};
    occurrences.forEach(e => {
      phaseCounts[e.phase] = (phaseCounts[e.phase] || 0) + 1;
    });
    
    const mostCommonPhase = Object.entries(phaseCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
    
    return {
      totalOccurrences: occurrences.length,
      averageSeverity: severities.length > 0 
        ? Math.round((severities.reduce((a, b) => a + b, 0) / severities.length) * 10) / 10 
        : 0,
      maxSeverity: severities.length > 0 ? Math.max(...severities) : 0,
      mostCommonPhase,
    };
  }

  // Export data as CSV
  public async exportToCSV(): Promise<string> {
    const entries = await this.getAllEntries();
    if (entries.length === 0) return '';
    
    const headers = [
      'Date', 'Cycle Day', 'Phase', 'Mood', 'Energy Level', 'Sleep Quality', 
      'Sleep Hours', 'Weight', 'Cramps', 'Bloating', 'Headache', 'Fatigue',
      'Mood Swings', 'Acne', 'Back Pain', 'Breast Tenderness', 'Nausea',
      'Constipation', 'Diarrhea', 'Insomnia', 'Anxiety', 'Irritability',
      'Food Cravings', 'Low Libido', 'High Libido', 'Hot Flashes', 'Brain Fog', 'Notes'
    ];
    
    const rows = entries.map(entry => [
      entry.date,
      entry.cycleDay.toString(),
      entry.phase,
      entry.mood || '',
      entry.energyLevel.toString(),
      entry.sleepQuality.toString(),
      entry.sleepHours?.toString() || '',
      entry.weight?.toString() || '',
      entry.symptoms.cramps.toString(),
      entry.symptoms.bloating.toString(),
      entry.symptoms.headache.toString(),
      entry.symptoms.fatigue.toString(),
      entry.symptoms.mood_swings.toString(),
      entry.symptoms.acne.toString(),
      entry.symptoms.back_pain.toString(),
      entry.symptoms.breast_tenderness.toString(),
      entry.symptoms.nausea.toString(),
      entry.symptoms.constipation.toString(),
      entry.symptoms.diarrhea.toString(),
      entry.symptoms.insomnia.toString(),
      entry.symptoms.anxiety.toString(),
      entry.symptoms.irritability.toString(),
      entry.symptoms.food_cravings.toString(),
      entry.symptoms.low_libido.toString(),
      entry.symptoms.high_libido.toString(),
      entry.symptoms.hot_flashes.toString(),
      entry.symptoms.brain_fog.toString(),
      entry.notes.replace(/,/g, ';'), // Replace commas in notes
    ]);
    
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    return csv;
  }
}

