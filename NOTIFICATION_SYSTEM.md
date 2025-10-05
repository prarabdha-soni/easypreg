# 🔔 Notification System Documentation

## Overview
The EaseMyPreg app includes a comprehensive notification system that provides Flo/Clue-style reminders and health tips based on the user's menstrual cycle. All data is stored locally on the device for complete privacy.

## Features

### 📅 Cycle-Based Notifications
- **Period Start Reminder**: Notifies 1 day before expected period
- **Ovulation Reminder**: Alerts during fertile window
- **Fertile Window Tracking**: Awareness of peak fertility days

### 💡 Daily Wellness
- **Health Tips**: Phase-specific wellness advice
- **Symptom Logging**: Gentle prompts to track symptoms
- **Positive Affirmations**: Cycle-phase appropriate motivation
- **Daily Check-in**: App engagement reminders

### 📊 Insights & Reports
- **Monthly Summary**: Cycle trends and patterns
- **Irregularity Alerts**: Healthcare provider recommendations
- **Cycle Analysis**: Comprehensive health insights

## Notification Types

### 1. Period Start Reminder
```
"Your period is expected to start tomorrow. Get ready with your favorites! 🌸"
"Period alert! Your cycle suggests it's starting soon. Time to prepare! 💕"
```

### 2. Ovulation Reminder
```
"Ovulation window is here! A fertile day to keep in mind. 🌟"
"It's your fertile window — be mindful today! 💫"
```

### 3. Symptom Logging
```
"How are you feeling today? Log your symptoms for better insights. 📝"
"Take a moment to check in with your body today. 💭"
```

### 4. Health Tips (Phase-Specific)
- **Period**: "Stay hydrated and rest well during your period. 💧"
- **Follicular**: "Your energy is rising! Perfect time for light exercise. 💪"
- **Ovulation**: "Peak fertility days! Track your symptoms carefully. 📊"
- **Luteal**: "Progesterone is rising. Focus on relaxation and self-care. 🧘‍♀️"

### 5. Positive Affirmations
```
"Your body is cleansing and renewing. Trust the process. 🌸"
"You're at your peak! Your body is powerful and fertile. ⚡"
```

## Technical Implementation

### Dependencies
- `expo-notifications`: For scheduling and managing notifications
- `@react-native-async-storage/async-storage`: For local data storage

### Core Files
- `services/NotificationService.ts`: Main notification service
- `app/(tabs)/notification-settings.tsx`: User preferences screen
- `app/(tabs)/notification-test.tsx`: Test and debug notifications
- `contexts/UserContext.tsx`: Integration with user data

### Data Storage
All data is stored locally using AsyncStorage:
- User preferences
- Cycle data
- Notification schedules
- Historical data

## User Experience

### Setup Process
1. User enters last period date during onboarding
2. System automatically calculates cycle predictions
3. Notifications are scheduled based on cycle data
4. Users can customize preferences in settings

### Daily Experience
- **Morning check-in** (8 AM): Daily engagement reminder
- **Health tips** (2 PM): Personalized wellness advice
- **Symptom logging** (9 AM): Gentle prompts to track health
- **Evening affirmations** (7 PM): Positive motivation before bed

### Customization Options
- Enable/disable specific notification types
- Set quiet hours for sleep time
- Test notifications before going live
- View scheduled notifications

## Privacy & Security

### Local-Only Storage
- No external servers or data sharing
- Complete user control over data
- Minimal permissions required
- Data ownership remains with user

### Permissions
- Notification permissions only
- No location or personal data access
- No third-party data sharing

## Usage Examples

### Basic Setup
```typescript
import { NotificationService } from '@/services/NotificationService';

const notificationService = NotificationService.getInstance();
await notificationService.initialize();

// Update cycle data
await notificationService.updateCycleData(
  new Date('2024-01-01'), // Last period date
  28, // Cycle length
  5   // Period length
);
```

### Customizing Preferences
```typescript
await notificationService.updatePreferences({
  periodReminders: true,
  ovulationReminders: true,
  healthTips: true,
  quietHours: {
    enabled: true,
    start: '22:00',
    end: '08:00'
  }
});
```

### Testing Notifications
```typescript
// Test a specific notification type
await notificationService.testNotification(NotificationType.PERIOD_START);

// Get scheduled notifications
const scheduled = await notificationService.getScheduledNotifications();
```

## Best Practices

### Content Guidelines
- Use encouraging, supportive language
- Include relevant emojis for visual appeal
- Keep messages concise and actionable
- Respect user's cycle phase and mood

### Timing Considerations
- Avoid notifications during sleep hours
- Space out notifications throughout the day
- Consider user's timezone and schedule
- Provide quiet hours option

### User Control
- Always allow users to disable notifications
- Provide clear settings and preferences
- Offer test functionality
- Explain notification purposes clearly

## Troubleshooting

### Common Issues
1. **Notifications not appearing**: Check device notification settings
2. **Wrong timing**: Verify timezone settings
3. **Missing notifications**: Ensure cycle data is updated
4. **Too many notifications**: Adjust preferences in settings

### Debug Tools
- Use the notification test screen to verify functionality
- Check scheduled notifications list
- Verify user preferences are saved
- Test individual notification types

## Future Enhancements

### Planned Features
- Machine learning for better predictions
- Integration with health apps
- Advanced cycle analysis
- Community features
- Expert consultation integration

### Technical Improvements
- Background sync capabilities
- Advanced scheduling algorithms
- Better error handling
- Performance optimizations

---

*This notification system provides a complete Flo/Clue-style experience while maintaining user privacy through local-only data storage.*
