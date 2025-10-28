# NariCare Features Roadmap

## ✅ Currently Implemented

### 1. Period & Cycle Tracking (Partial)
- ✅ Last period date tracking
- ✅ Cycle length configuration
- ✅ Local data storage with AsyncStorage
- ✅ Cycle phase detection (Menstrual, Follicular, Ovulatory, Luteal)
- ✅ Cycle day calculation
- ✅ Period reminder notifications
- ⏳ **TODO**: Symptom logging, flow intensity, mood tracking

### 2. Health Goal Personalization
- ✅ Three health goals:
  - Control Cycle (Regular menstrual tracking)
  - Ease Perimenopause (Symptom management)
  - Relieve Menopause (Hot flash & mood tracking)
- ✅ Adaptive UI based on selected goal
- ✅ Personalized welcome messages

### 3. Smart Notifications
- ✅ Period reminders
- ✅ Ovulation reminders
- ✅ Fertile window notifications
- ✅ Health check-in prompts
- ✅ Customizable notification preferences
- ✅ Quiet hours setting
- ✅ High-frequency test mode

### 4. Privacy & Data Security
- ✅ Local-only data storage (AsyncStorage)
- ✅ No cloud sync (yet)
- ⏳ **TODO**: Anonymous mode, data encryption

### 5. Health Dashboard
- ✅ Overall health score
- ✅ Cycle phase visualization
- ✅ Personalized care recommendations
- ✅ Quick action buttons

---

## 🚀 To Be Implemented (Flo-Like Features)

### 1. Enhanced Period & Cycle Tracking
**Features to Add:**
- Symptom tracker (cramps, headache, bloating, etc.)
- Flow intensity (light, medium, heavy, spotting)
- Mood tracking (happy, sad, anxious, irritable)
- Energy levels
- Sleep quality
- Cycle history & patterns
- Irregular cycle detection

**Files to Create:**
- `app/log/flow-intensity.tsx`
- `app/log/mood-tracker.tsx`
- `app/log/energy-tracker.tsx`

### 2. Ovulation & Fertility Insights
**Features to Add:**
- Fertile window calculator
- Ovulation predictor
- Conception probability indicator
- Basal body temperature (BBT) tracking
- Cervical mucus tracking
- Fertility tips based on cycle phase
- Partner activity tracking (already have basic version)

**Files to Update:**
- `app/(tabs)/fertility.tsx` - Enhanced with ovulation calendar
- `services/FertilityPredictionService.ts` - New service

### 3. Pregnancy Tracker
**Features to Add:**
- Week-by-week pregnancy tracking
- Baby development milestones
- Pregnancy symptoms logger
- Weight gain tracker
- Kick counter
- Contractions timer
- Due date calculator
- Pregnancy checklist

**Files to Create:**
- `app/(tabs)/pregnancy.tsx`
- `app/pregnancy/week-tracker.tsx`
- `app/pregnancy/kick-counter.tsx`
- `app/pregnancy/contractions.tsx`
- `services/PregnancyService.ts`

### 4. Perimenopause & Menopause Support (Enhanced)
**Features to Add:**
- Hot flash frequency tracker
- Night sweats logger
- Sleep disturbance tracking
- Mood swings monitoring
- Vaginal dryness tracking
- Pattern analysis charts
- Symptom severity scores
- Treatment effectiveness tracking

**Files to Create:**
- `app/menopause/hot-flash-logger.tsx`
- `app/menopause/symptom-tracker.tsx`
- `app/menopause/pattern-analysis.tsx`
- `services/MenopauseService.ts`

### 5. Anonymous Mode & Enhanced Privacy
**Features to Add:**
- PIN/Biometric lock for app
- Anonymous account creation (no email required)
- Local data encryption
- Export data functionality
- Data backup (encrypted)
- Privacy dashboard showing what data is stored

**Files to Create:**
- `app/(tabs)/privacy.tsx`
- `app/settings/security.tsx`
- `services/SecurityService.ts`
- `services/DataEncryptionService.ts`

### 6. Expert Content & Virtual Assistant
**Features to Add:**
- Expert articles library
- Video content
- Daily health tips based on cycle phase
- AI chatbot for health questions
- 24/7 virtual assistant
- Personalized recommendations
- Community forum (anonymous)

**Files to Create:**
- `app/(tabs)/learn.tsx`
- `app/learn/articles.tsx`
- `app/learn/videos.tsx`
- `app/assistant/chat.tsx`
- `services/ContentService.ts`
- `services/AIAssistantService.ts`

---

## 📋 Implementation Priority

### Phase 1: Core Tracking (Week 1-2)
1. ✅ Period date tracking
2. Enhanced symptom logging
3. Flow intensity & mood tracking
4. Improved cycle predictions

### Phase 2: Fertility & Ovulation (Week 3-4)
1. Ovulation calculator
2. Fertile window visualization
3. Conception tips
4. BBT tracking

### Phase 3: Pregnancy Support (Week 5-6)
1. Pregnancy mode toggle
2. Week-by-week tracker
3. Symptom logger
4. Kick counter & contractions timer

### Phase 4: Menopause Support (Week 7-8)
1. Hot flash tracker
2. Pattern analysis
3. Symptom severity scores
4. Treatment tracking

### Phase 5: Privacy & Security (Week 9)
1. App lock (PIN/Biometric)
2. Data encryption
3. Anonymous mode
4. Export functionality

### Phase 6: Content & Assistant (Week 10-12)
1. Article library
2. Video content
3. AI chatbot
4. Daily tips
5. Virtual assistant

---

## 🔧 Technical Stack

### Current
- **Framework**: React Native (Expo)
- **Routing**: Expo Router
- **Storage**: AsyncStorage
- **Notifications**: Expo Notifications
- **State Management**: React Context
- **UI Icons**: Lucide React Native

### To Add
- **Encryption**: react-native-crypto
- **Biometric Auth**: expo-local-authentication
- **Charts**: react-native-chart-kit
- **AI Assistant**: OpenAI API (or local LLM)
- **Video**: expo-av
- **PDF Export**: react-native-pdf

---

## 📊 Feature Comparison: NariCare vs Flo

| Feature | Flo | NariCare (Current) | NariCare (Planned) |
|---------|-----|-------------------|-------------------|
| Period Tracking | ✅ | ✅ | ✅ Enhanced |
| Cycle Predictions | ✅ | ✅ | ✅ |
| Ovulation Tracking | ✅ | ⏳ | ✅ |
| Fertility Insights | ✅ | ⏳ | ✅ |
| Pregnancy Tracker | ✅ | ❌ | ✅ |
| Menopause Support | ✅ | ✅ Basic | ✅ Enhanced |
| Symptom Logging | ✅ | ❌ | ✅ |
| Mood Tracking | ✅ | ❌ | ✅ |
| Health Insights | ✅ | ✅ | ✅ |
| Smart Notifications | ✅ | ✅ | ✅ |
| Anonymous Mode | ✅ | ❌ | ✅ |
| App Lock | ✅ | ❌ | ✅ |
| Expert Articles | ✅ | ❌ | ✅ |
| AI Assistant | ✅ | ❌ | ✅ |
| Community | ✅ | ❌ | ✅ (Optional) |
| Data Privacy | ✅ | ✅ | ✅ Enhanced |

---

## 🎯 Next Steps

1. ✅ Fix syntax errors
2. ✅ Implement health goal selection
3. **Create symptom tracker screen**
4. **Add mood & flow tracking**
5. **Implement ovulation calculator**
6. **Add pregnancy mode**
7. **Enhance menopause tracking**
8. **Implement app security**
9. **Add content library**
10. **Build AI assistant**

---

This roadmap provides a comprehensive plan to transform NariCare into a feature-rich women's health app comparable to Flo!

