import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Notification types
export enum NotificationType {
  PERIOD_START = 'period_start',
  OVULATION = 'ovulation',
  SYMPTOM_LOGGING = 'symptom_logging',
  HEALTH_TIP = 'health_tip',
  POSITIVE_AFFIRMATION = 'positive_affirmation',
  MONTHLY_SUMMARY = 'monthly_summary',
  IRREGULARITY_ALERT = 'irregularity_alert',
  DAILY_CHECKIN = 'daily_checkin'
}

// Cycle phase types
export enum CyclePhase {
  PERIOD = 'period',
  FOLLICULAR = 'follicular',
  OVULATION = 'ovulation',
  LUTEAL = 'luteal'
}

// User preferences interface
export interface NotificationPreferences {
  periodReminders: boolean;
  ovulationReminders: boolean;
  symptomLogging: boolean;
  healthTips: boolean;
  positiveAffirmations: boolean;
  monthlySummary: boolean;
  irregularityAlerts: boolean;
  dailyCheckin: boolean;
  quietHours: {
    enabled: boolean;
    start: string; // "22:00"
    end: string;   // "08:00"
  };
  timezone: string;
}

// Cycle data interface
export interface CycleData {
  lastPeriodDate: Date;
  cycleLength: number;
  periodLength: number;
  isRegular: boolean;
  averageCycleLength: number;
  nextPeriodDate: Date;
  ovulationDate: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
}

// Notification content templates
const NOTIFICATION_CONTENT = {
  [NotificationType.PERIOD_START]: [
    "Your period is expected to start tomorrow. Get ready with your favorites! 🌸",
    "Period alert! Your cycle suggests it's starting soon. Time to prepare! 💕",
    "Tomorrow might be the day! Have your comfort items ready. 🌺",
    "Your body is preparing for your period. Take care of yourself! 💖"
  ],
  [NotificationType.OVULATION]: [
    "Ovulation window is here! A fertile day to keep in mind. 🌟",
    "It's your fertile window — be mindful today! 💫",
    "Your most fertile days are here. Track your symptoms! ✨",
    "Fertility peak detected! Perfect time for conception planning. 🌸"
  ],
  [NotificationType.SYMPTOM_LOGGING]: [
    "How are you feeling today? Log your symptoms for better insights. 📝",
    "Take a moment to check in with your body today. 💭",
    "Your wellness journey continues! How do you feel? 🌸",
    "Daily check-in time! Log any symptoms or mood changes. 💕"
  ],
  [NotificationType.HEALTH_TIP]: [
    "Health Tip: Stay hydrated today to ease menstrual discomfort. 💧",
    "Wellness reminder: Gentle exercise can help with PMS symptoms. 🧘‍♀️",
    "Nutrition tip: Iron-rich foods support your cycle health. 🥬",
    "Self-care alert: Take time for relaxation today. 🌸"
  ],
  [NotificationType.POSITIVE_AFFIRMATION]: [
    "You're doing great! Keep up your wellness streak with a calming meditation. 💖",
    "Your body is amazing and working perfectly. Trust the process! ✨",
    "Every cycle is unique and beautiful. You're exactly where you need to be. 🌸",
    "You're stronger than you know. Your body is resilient and wise. 💪"
  ],
  [NotificationType.MONTHLY_SUMMARY]: [
    "Your monthly summary is ready! Check out your cycle trends and moods. 📊",
    "Monthly insights available! Discover patterns in your wellness journey. 📈",
    "Cycle recap ready! See how your body has been doing this month. 📋",
    "Your wellness report is here! Track your progress and growth. 🌟"
  ],
  [NotificationType.IRREGULARITY_ALERT]: [
    "Your cycle seems irregular this month. Consider consulting a healthcare provider. 🩺",
    "Cycle pattern change detected. It might be worth discussing with your doctor. 💭",
    "Irregular cycle noticed. Your health provider can offer guidance. 🌸",
    "Cycle variation alert. Professional advice might be helpful. 💕"
  ],
  [NotificationType.DAILY_CHECKIN]: [
    "Good morning! Take a moment to check your cycle and log today's details. ☀️",
    "Daily wellness check-in! How's your body feeling today? 🌸",
    "Morning reminder: Connect with your body and track your wellness. 💕",
    "Start your day with self-care! Check in with your cycle today. ✨"
  ]
};

// Health tips by cycle phase
const HEALTH_TIPS_BY_PHASE = {
  [CyclePhase.PERIOD]: [
    "Stay hydrated and rest well during your period. 💧",
    "Gentle yoga can help with menstrual cramps. 🧘‍♀️",
    "Iron-rich foods support your body during menstruation. 🥬",
    "Warm baths can ease period discomfort. 🛁"
  ],
  [CyclePhase.FOLLICULAR]: [
    "Your energy is rising! Perfect time for light exercise. 💪",
    "Focus on protein-rich foods to support hormone production. 🥗",
    "Fresh air and sunlight boost your mood during this phase. ☀️",
    "Gentle cardio can enhance your natural energy. 🏃‍♀️"
  ],
  [CyclePhase.OVULATION]: [
    "Peak fertility days! Track your symptoms carefully. 📊",
    "Your body is at its most energetic. Enjoy it! ⚡",
    "Fertility awareness: Your body is working perfectly. 🌟",
    "Ovulation energy is powerful. Channel it positively! ✨"
  ],
  [CyclePhase.LUTEAL]: [
    "Progesterone is rising. Focus on relaxation and self-care. 🧘‍♀️",
    "Your body is preparing. Be gentle with yourself. 💕",
    "PMS prevention: Magnesium-rich foods can help. 🥜",
    "Luteal phase calls for extra rest and nourishment. 🌙"
  ]
};

// Positive affirmations by cycle phase
const AFFIRMATIONS_BY_PHASE = {
  [CyclePhase.PERIOD]: [
    "Your body is cleansing and renewing. Trust the process. 🌸",
    "Menstruation is a sign of health and vitality. You're amazing! 💪",
    "Your body is working perfectly. Honor this natural process. ✨",
    "Every period is a fresh start. You're exactly where you need to be. 🌺"
  ],
  [CyclePhase.FOLLICULAR]: [
    "New beginnings are here! Your energy is building beautifully. 🌱",
    "Your body is preparing for new possibilities. Trust the journey. 💫",
    "Fresh energy flows through you. Embrace this renewal. 🌸",
    "The follicular phase brings hope and new energy. You're growing! 🌟"
  ],
  [CyclePhase.OVULATION]: [
    "You're at your peak! Your body is powerful and fertile. ⚡",
    "Ovulation energy is creative and strong. Channel it wisely. ✨",
    "Your fertility is a gift. Honor this powerful phase. 🌸",
    "Peak performance time! Your body is amazing. 💪"
  ],
  [CyclePhase.LUTEAL]: [
    "Your body is preparing with wisdom and care. Trust it. 🌙",
    "The luteal phase brings depth and intuition. Honor it. 💕",
    "Your body knows exactly what to do. Trust the process. 🌸",
    "Preparation phase is beautiful. You're exactly where you need to be. ✨"
  ]
};

export class NotificationService {
  private static instance: NotificationService;
  private preferences: NotificationPreferences | null = null;
  private cycleData: CycleData | null = null;

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Initialize notification service
  public async initialize(): Promise<void> {
    // Request notification permissions
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Notification permission not granted');
      return;
    }

    // Configure notification behavior
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    // Load user preferences and cycle data
    await this.loadUserData();
  }

  // Load user preferences and cycle data from local storage
  private async loadUserData(): Promise<void> {
    try {
      const preferencesData = await AsyncStorage.getItem('notificationPreferences');
      const cycleDataString = await AsyncStorage.getItem('cycleData');

      if (preferencesData) {
        this.preferences = JSON.parse(preferencesData);
      } else {
        // Set default preferences
        this.preferences = {
          periodReminders: true,
          ovulationReminders: true,
          symptomLogging: true,
          healthTips: true,
          positiveAffirmations: true,
          monthlySummary: true,
          irregularityAlerts: true,
          dailyCheckin: true,
          quietHours: {
            enabled: false,
            start: '22:00',
            end: '08:00'
          },
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        await this.savePreferences();
      }

      if (cycleDataString) {
        const cycleData = JSON.parse(cycleDataString);
        this.cycleData = {
          ...cycleData,
          lastPeriodDate: new Date(cycleData.lastPeriodDate),
          nextPeriodDate: new Date(cycleData.nextPeriodDate),
          ovulationDate: new Date(cycleData.ovulationDate),
          fertileWindowStart: new Date(cycleData.fertileWindowStart),
          fertileWindowEnd: new Date(cycleData.fertileWindowEnd)
        };
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  // Save user preferences to local storage
  private async savePreferences(): Promise<void> {
    if (this.preferences) {
      await AsyncStorage.setItem('notificationPreferences', JSON.stringify(this.preferences));
    }
  }

  // Save cycle data to local storage
  private async saveCycleData(): Promise<void> {
    if (this.cycleData) {
      await AsyncStorage.setItem('cycleData', JSON.stringify(this.cycleData));
    }
  }

  // Update cycle data
  public async updateCycleData(lastPeriodDate: Date, cycleLength: number = 28, periodLength: number = 5): Promise<void> {
    const today = new Date();
    const nextPeriodDate = new Date(lastPeriodDate);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);

    const ovulationDate = new Date(nextPeriodDate);
    ovulationDate.setDate(ovulationDate.getDate() - 14);

    const fertileWindowStart = new Date(ovulationDate);
    fertileWindowStart.setDate(fertileWindowStart.getDate() - 5);

    const fertileWindowEnd = new Date(ovulationDate);
    fertileWindowEnd.setDate(fertileWindowEnd.getDate() + 1);

    this.cycleData = {
      lastPeriodDate,
      cycleLength,
      periodLength,
      isRegular: true, // This would be calculated based on historical data
      averageCycleLength: cycleLength,
      nextPeriodDate,
      ovulationDate,
      fertileWindowStart,
      fertileWindowEnd
    };

    await this.saveCycleData();
    await this.scheduleNotifications();
  }

  // Calculate current cycle phase
  private getCurrentCyclePhase(): CyclePhase {
    if (!this.cycleData) return CyclePhase.FOLLICULAR;

    const today = new Date();
    const daysSinceLastPeriod = Math.floor((today.getTime() - this.cycleData.lastPeriodDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSinceLastPeriod <= this.cycleData.periodLength) {
      return CyclePhase.PERIOD;
    } else if (daysSinceLastPeriod <= 14) {
      return CyclePhase.FOLLICULAR;
    } else if (daysSinceLastPeriod <= 16) {
      return CyclePhase.OVULATION;
    } else {
      return CyclePhase.LUTEAL;
    }
  }

  // Schedule all notifications
  public async scheduleNotifications(): Promise<void> {
    if (!this.preferences || !this.cycleData) return;

    // Cancel existing notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    const today = new Date();
    const currentPhase = this.getCurrentCyclePhase();

    // Schedule period start reminder (1 day before)
    if (this.preferences.periodReminders) {
      const periodReminderDate = new Date(this.cycleData.nextPeriodDate);
      periodReminderDate.setDate(periodReminderDate.getDate() - 1);
      
      if (periodReminderDate > today) {
        await this.scheduleNotification(
          NotificationType.PERIOD_START,
          periodReminderDate,
          this.getRandomContent(NotificationType.PERIOD_START)
        );
      }
    }

    // Schedule ovulation reminder
    if (this.preferences.ovulationReminders) {
      if (this.cycleData.ovulationDate > today) {
        await this.scheduleNotification(
          NotificationType.OVULATION,
          this.cycleData.ovulationDate,
          this.getRandomContent(NotificationType.OVULATION)
        );
      }
    }

    // Schedule daily symptom logging (every day at 9 AM)
    if (this.preferences.symptomLogging) {
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        date.setHours(9, 0, 0, 0);
        
        if (date > today) {
          await this.scheduleNotification(
            NotificationType.SYMPTOM_LOGGING,
            date,
            this.getRandomContent(NotificationType.SYMPTOM_LOGGING)
          );
        }
      }
    }

    // Schedule health tips (every day at 2 PM)
    if (this.preferences.healthTips) {
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        date.setHours(14, 0, 0, 0);
        
        if (date > today) {
          const phase = this.getCurrentCyclePhase();
          const healthTip = this.getRandomContent(HEALTH_TIPS_BY_PHASE[phase]);
          await this.scheduleNotification(
            NotificationType.HEALTH_TIP,
            date,
            healthTip
          );
        }
      }
    }

    // Schedule positive affirmations (every day at 7 PM)
    if (this.preferences.positiveAffirmations) {
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        date.setHours(19, 0, 0, 0);
        
        if (date > today) {
          const phase = this.getCurrentCyclePhase();
          const affirmation = this.getRandomContent(AFFIRMATIONS_BY_PHASE[phase]);
          await this.scheduleNotification(
            NotificationType.POSITIVE_AFFIRMATION,
            date,
            affirmation
          );
        }
      }
    }

    // Schedule monthly summary (1st of each month at 10 AM)
    if (this.preferences.monthlySummary) {
      const nextMonth = new Date(today);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      nextMonth.setDate(1);
      nextMonth.setHours(10, 0, 0, 0);
      
      await this.scheduleNotification(
        NotificationType.MONTHLY_SUMMARY,
        nextMonth,
        this.getRandomContent(NotificationType.MONTHLY_SUMMARY)
      );
    }

    // Schedule daily check-in (every day at 8 AM)
    if (this.preferences.dailyCheckin) {
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        date.setHours(8, 0, 0, 0);
        
        if (date > today) {
          await this.scheduleNotification(
            NotificationType.DAILY_CHECKIN,
            date,
            this.getRandomContent(NotificationType.DAILY_CHECKIN)
          );
        }
      }
    }
  }

  // Schedule a single notification
  private async scheduleNotification(
    type: NotificationType,
    date: Date,
    content: string
  ): Promise<void> {
    if (!this.preferences) return;

    // Check quiet hours
    if (this.preferences.quietHours.enabled) {
      const notificationTime = date.getHours() * 60 + date.getMinutes();
      const quietStart = this.timeToMinutes(this.preferences.quietHours.start);
      const quietEnd = this.timeToMinutes(this.preferences.quietHours.end);
      
      if (this.isInQuietHours(notificationTime, quietStart, quietEnd)) {
        return;
      }
    }

    const trigger: Notifications.NotificationTriggerInput = {
      date: date,
      repeats: false,
    };

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'EasyPreg',
        body: content,
        data: { type },
        sound: 'default',
      },
      trigger,
    });
  }

  // Convert time string to minutes
  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Check if time is in quiet hours
  private isInQuietHours(time: number, start: number, end: number): boolean {
    if (start <= end) {
      return time >= start && time <= end;
    } else {
      return time >= start || time <= end;
    }
  }

  // Get random content from array
  private getRandomContent(contentArray: string[]): string {
    return contentArray[Math.floor(Math.random() * contentArray.length)];
  }

  // Update notification preferences
  public async updatePreferences(newPreferences: Partial<NotificationPreferences>): Promise<void> {
    if (this.preferences) {
      this.preferences = { ...this.preferences, ...newPreferences };
      await this.savePreferences();
      await this.scheduleNotifications();
    }
  }

  // Get current preferences
  public getPreferences(): NotificationPreferences | null {
    return this.preferences;
  }

  // Get current cycle data
  public getCycleData(): CycleData | null {
    return this.cycleData;
  }

  // Cancel all notifications
  public async cancelAllNotifications(): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }

  // Get scheduled notifications
  public async getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
    return await Notifications.getAllScheduledNotificationsAsync();
  }
}
