# Menopause-Focused Redesign - Complete

## Overview
The app has been completely redesigned to focus exclusively on perimenopause and menopause users, following the forhers.com approach for personalized menopause care.

## Target Audience
- Women in **perimenopause** (40s, irregular periods, beginning symptoms)
- Women in **menopause** (no period for 12+ months, experiencing symptoms)
- Women in **postmenopause** (years after last period, managing long-term changes)

## Core Features

### 1. **Personalized Onboarding**
New users complete a guided onboarding flow:
- **Welcome Screen**: Introduction to Gloww and key benefits
- **Age Input**: Collect user age for personalization
- **Stage Selection**: Choose perimenopause, menopause, or postmenopause
- **Symptom Selection**: Select current symptoms being experienced

File locations:
- `app/onboarding/welcome.tsx`
- `app/onboarding/age.tsx`
- `app/onboarding/stage.tsx`
- `app/onboarding/symptoms.tsx`

### 2. **Home Dashboard** (`app/(tabs)/index.tsx`)
The home screen provides quick access to all core features:

#### Your Care Section
- **Hormone Replacement Therapy**: Direct link to HRT options and treatment plans
- **Talk to a Provider**: Access to telehealth specialists

#### Symptom Tracking
- Visual grid of common menopause symptoms:
  - Hot Flashes
  - Night Sweats
  - Mood Changes
  - Sleep Issues
  - Vaginal Dryness
  - Brain Fog
  - Fatigue
  - Joint Pain
- Quick "Track All Symptoms" button

#### Progress Insights
- AI-driven insights showing symptom trends
- Example: "Hot flashes down 30% this week"

#### Educational Content
- Horizontal scrollable cards covering:
  - Understanding HRT
  - Lifestyle Changes
  - Better Sleep (night sweats management)

#### Appointment Reminder
- Displays next scheduled telehealth appointment (if booked)

### 3. **Symptom Tracker** (`app/symptoms/tracker.tsx`)
Comprehensive daily symptom logging:
- Select multiple symptoms
- Rate severity (Mild, Moderate, Severe)
- Color-coded visual feedback
- Save daily entries for pattern analysis

### 4. **Hormone Replacement Therapy** (`app/treatment/hrt.tsx`)
Following the forhers.com model:

#### Treatment Options
- **Estradiol (Estrogen)**: For hot flashes, night sweats, vaginal dryness
- **Progesterone**: Uterine protection when taking estrogen
- **Combination HRT**: Complete symptom relief

Each option includes:
- Description and benefits
- Available forms (patch, pill, gel, cream)
- Visual icons and color coding

#### Natural Supplements
- Black Cohosh (hot flash relief)
- Evening Primrose Oil (mood & skin)
- Vitamin D + Calcium (bone health)
- Magnesium (sleep & relaxation)

#### Call-to-Action
- Direct booking to talk with a menopause specialist
- Sets `interestedInHRT` flag in user profile

### 5. **Telehealth Services**

#### Provider Listing (`app/telehealth/providers.tsx`)
- Browse menopause specialists:
  - OB-GYNs
  - Endocrinologists
  - Women's Health Specialists
- Provider details include:
  - Name, credentials, rating
  - Years of experience
  - Specialties (HRT, bone health, mood support)
  - Next available appointment
  - Consultation price
- "Book Video Visit" for each provider

#### Benefits
- Video visits from home
- Same-day appointments
- Prescriptions sent to pharmacy

#### Appointment Booking (`app/telehealth/booking.tsx`)
- Select date and time
- View appointment details
- Confirm booking

#### Appointment Details (`app/telehealth/appointment.tsx`)
- View upcoming appointments
- Join video call
- Provider information

### 6. **Educational Content**
Placeholder screens for learning:
- `app/education/hrt.tsx`: HRT education
- `app/education/lifestyle.tsx`: Natural symptom management
- `app/education/sleep.tsx`: Night sweats tips

## User Data Model (Updated)

### UserProfile Interface (`contexts/UserContext.tsx`)
```typescript
interface UserProfile {
  // Demographics
  age: number | null;
  menopauseStage: 'perimenopause' | 'menopause' | 'postmenopause' | null;
  lastPeriodDate: Date | null;
  symptomsStartDate: Date | null;
  hasCompletedOnboarding: boolean;
  
  // Treatment Preferences
  interestedInHRT: boolean;
  currentTreatments: string[];
  
  // Symptom Tracking
  primarySymptoms: string[];
  symptomSeverity: 'mild' | 'moderate' | 'severe' | null;
  
  // Telehealth
  hasProvider: boolean;
  nextAppointment: Date | null;
}
```

### Removed Features
All fertility and pregnancy-related fields have been removed:
- ❌ `tryingToConceive`
- ❌ `planningSoon`
- ❌ `isPregnant`
- ❌ `pregnancyStartDate`
- ❌ `currentPregnancyMonth`
- ❌ `healthGoal` (control-cycle, fertility focus)

## Design System

### Color Palette
- **Primary Pink**: `#EC4899` - CTAs, highlights
- **Blue**: `#3B82F6` - Telehealth, appointments
- **Green**: `#10B981` - Progress, positive insights
- **Orange**: `#F59E0B` - Warnings, moderate severity
- **Red**: `#EF4444` - Severe symptoms, alerts
- **Purple**: `#8B5CF6` - Variety, postmenopause
- **Gray Scale**: `#1F2937` (dark), `#6B7280` (medium), `#E5E7EB` (light)

### UI Patterns
- **Clean white backgrounds** with subtle borders
- **Card-based layouts** for content sections
- **Icon + Text combinations** for clarity
- **Color-coded severity indicators**
- **Rounded corners** (12-16px radius)
- **Consistent spacing** (20px horizontal padding)

## Navigation Flow

```
Index (app/index.tsx)
├─ If NOT onboarded → /onboarding/welcome
│  └─ /onboarding/age
│     └─ /onboarding/stage
│        └─ /onboarding/symptoms
│           └─ /(tabs) Home
│
└─ If onboarded → /(tabs) Home
   ├─ /treatment/hrt → HRT Options
   │  └─ /telehealth/providers → Book Provider
   │     └─ /telehealth/booking → Schedule
   ├─ /symptoms/tracker → Log Symptoms
   ├─ /education/hrt → Learn about HRT
   ├─ /education/lifestyle → Lifestyle tips
   ├─ /education/sleep → Sleep management
   └─ /telehealth/appointment → View booking
```

## Key User Flows

### First-Time User Journey
1. Open app → Welcome screen
2. Enter age → Select menopause stage
3. Choose symptoms → Complete onboarding
4. Land on home dashboard
5. Explore HRT options or track symptoms

### Daily Symptom Tracking
1. Home → "Track All Symptoms"
2. Select symptoms and severity
3. Save entry
4. View progress insights over time

### Start HRT Treatment
1. Home → "Hormone Replacement Therapy"
2. Review treatment options
3. Click "Talk to a Provider"
4. Browse menopause specialists
5. Book video appointment
6. Receive treatment plan

## Implementation Details

### Entry Point (`app/index.tsx`)
- Checks `hasCompletedOnboarding` flag
- Shows loading indicator while checking
- Routes to onboarding or home accordingly

### Data Persistence
- Uses `AsyncStorage` for local data storage
- Saves user profile after each update
- Loads profile on app startup

### Next Steps (Future Development)
1. **Symptom Analytics**: Charts and graphs of symptom trends
2. **Treatment Progress**: Track HRT effectiveness over time
3. **Community Features**: Forums and support groups
4. **Prescription Management**: Track medications and refills
5. **Educational Library**: Expanded articles and videos
6. **Lab Results**: Integration with test results
7. **Wearable Integration**: Sleep and activity tracking
8. **Nutrition Guidance**: Menopause-friendly meal plans

## Files Created/Modified

### New Files
- `app/onboarding/welcome.tsx`
- `app/onboarding/age.tsx`
- `app/onboarding/stage.tsx`
- `app/onboarding/symptoms.tsx`
- `app/symptoms/tracker.tsx`
- `app/treatment/hrt.tsx`
- `app/telehealth/providers.tsx`
- `app/telehealth/booking.tsx`
- `app/telehealth/appointment.tsx`
- `app/education/hrt.tsx`
- `app/education/lifestyle.tsx`
- `app/education/sleep.tsx`

### Modified Files
- `contexts/UserContext.tsx` - Updated user profile model
- `app/index.tsx` - Added onboarding check
- `app/(tabs)/index.tsx` - Complete home screen redesign

## Summary
Gloww is now a comprehensive menopause support platform inspired by forhers.com, providing:
✅ Personalized symptom tracking
✅ Expert telehealth access
✅ HRT education and treatment plans
✅ Natural supplement guidance
✅ Progress insights and analytics

The app focuses exclusively on the needs of women experiencing perimenopause, menopause, and postmenopause, with a clean, professional design and user-friendly flows.

