export type HormonalPhase = 'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal';

export function getCycleDay(lastPeriodDate: Date): number {
  const now = new Date();
  const ms = now.getTime() - lastPeriodDate.getTime();
  const d = Math.floor(ms / (1000 * 60 * 60 * 24));
  return ((d % 28) + 28) % 28; // 0..27
}

export function getCurrentHormonalPhase(dayZeroIndexed: number): HormonalPhase {
  const day = dayZeroIndexed + 1; // 1..28
  if (day >= 1 && day <= 7) return 'Menstrual';
  if (day >= 8 && day <= 14) return 'Follicular';
  if (day >= 15 && day <= 21) return 'Ovulation';
  return 'Luteal';
}

export type PhaseTheme = {
  gradient: [string, string];
  accentColor: string;
  surface: string; // app background surface color
  border: string; // subtle border color for cards
  phaseIcon: string;
  phaseText: string;
  workoutRecommendation: string;
  workoutDetails: string;
  workoutFocus: string;
  workoutTypes: string[];
  workoutWhy: string;
  sleepRecommendation: string;
  sleepDetails: string;
  sleepPattern: string;
  sleepRecommendations: string[];
  sleepAids: string[];
  beautyTip: string;
  beautyAction: string;
  suggestions: string[];
  beautyRoutine: string[]; // ordered routine steps for the day
  beautyConcerns: string[]; // common concerns this phase
};

export const themes: Record<HormonalPhase, PhaseTheme> = {
  Follicular: {
    gradient: ['#A073E1', '#E7A0F8'],
    accentColor: '#FFC107',
    surface: '#FAF3FF',
    border: '#E8D5E8',
    phaseIcon: '🌸',
    phaseText: 'Your energy is rising this week.',
    workoutRecommendation: '20-min cardio burst',
    workoutDetails: 'High-intensity interval training to leverage rising energy.',
    workoutFocus: 'Building strength and increasing intensity',
    workoutTypes: ['Cardio', 'Circuit training', 'Strength training', 'HIIT'],
    workoutWhy: 'Estrogen rises, boosting energy, strength, and endurance—great for intensity and muscle gains.',
    sleepRecommendation: 'Meditation for morning freshness',
    sleepDetails: 'Calm your mind to maximize energy gain for the rising phase.',
    sleepPattern: 'Generally improved sleep quality with more deep and REM sleep.',
    sleepRecommendations: ['Regular sleep schedule', 'Morning sunlight exposure', 'Avoid late caffeine/electronics'],
    sleepAids: ['Mindfulness meditation', 'Light daytime aerobic exercise'],
    beautyTip: 'Hydrate & nourish',
    beautyAction: 'Rich hydration to help skin bloom while oil is lower.',
    suggestions: ['Vitamin C serum', 'Gentle exfoliant 1–2×/week', 'Gel moisturizer'],
    beautyRoutine: ['Gentle cleanse', 'Vitamin C serum', 'Light moisturizer', 'Sunscreen (SPF 30+)'],
    beautyConcerns: ['Dullness after period', 'Mild dryness'],
  },
  Ovulation: {
    gradient: ['#FF7F50', '#FFDAB9'],
    accentColor: '#4CAF50',
    surface: '#FFF6ED',
    border: '#F2D6C7',
    phaseIcon: '✨',
    phaseText: 'Peak energy & clarity!',
    workoutRecommendation: 'Strength + Yoga flow',
    workoutDetails: 'Build muscle and maintain flexibility at your strongest.',
    workoutFocus: 'Power and performance',
    workoutTypes: ['High‑intensity intervals', 'Skill‑based workouts', 'Tennis', 'Dance'],
    workoutWhy: 'Peak estrogen and LH provide maximum strength, speed, and coordination—ideal for performance.',
    sleepRecommendation: 'Short naps for clarity',
    sleepDetails: 'Use deep, short rest to maintain peak focus and energy.',
    sleepPattern: 'Possible restlessness or difficulty falling asleep due to hormonal surge.',
    sleepRecommendations: ['Breathing exercises before bed', 'Cool, dark environment', 'Avoid stimulating screens/activities'],
    sleepAids: ['Blackout curtains', 'Relaxing sleep stories'],
    beautyTip: 'Your glow peaks — exfoliate gently',
    beautyAction: 'Remove dead skin to maximize radiance; mind increased oil.',
    suggestions: ['Light AHA toner', 'Hydrating sunscreen', 'Brightening serum'],
    beautyRoutine: ['Cleanse', 'Gentle exfoliation (2–3×/week)', 'Hydrating serum', 'SPF 50'],
    beautyConcerns: ['Shine/oil', 'Makeup pilling'],
  },
  Luteal: {
    gradient: ['#8A2BE2', '#DA70D6'],
    accentColor: '#800080',
    surface: '#F5EEFF',
    border: '#E5D4F7',
    phaseIcon: '🧘‍♀️',
    phaseText: 'Focus on self-care & winding down.',
    workoutRecommendation: 'Yin yoga or gentle stretching',
    workoutDetails: 'Support your body with restorative movement as energy declines.',
    workoutFocus: 'Calm and recovery',
    workoutTypes: ['Moderate cardio', 'Yoga', 'Pilates', 'Low‑impact strength'],
    workoutWhy: 'Progesterone rises causing lower energy and fatigue—prioritize restorative consistency.',
    sleepRecommendation: 'Magnesium + calming routine',
    sleepDetails: 'Warm, gentle routines to prepare for rest and ease tension.',
    sleepPattern: 'Increased need for sleep and more awakenings; higher body temperature.',
    sleepRecommendations: ['Breathable bedding & lower room temperature', 'Consistent wind‑down ritual', 'Avoid heavy meals or late strenuous workouts'],
    sleepAids: ['CBT‑I techniques', 'Guided sleep meditations'],
    beautyTip: 'Keep it clean and calm',
    beautyAction: 'Double‑cleanse and use anti‑inflammatory ingredients for breakouts.',
    suggestions: ['Niacinamide', 'Clay mask', 'Non‑stripping cleanser'],
    beautyRoutine: ['Non‑stripping cleanse', 'Niacinamide serum', 'Calming moisturizer', 'Spot treatment (if needed)'],
    beautyConcerns: ['Congestion', 'Hormonal breakouts', 'Sensitivity'],
  },
  Menstrual: {
    gradient: ['#5C1349', '#9E2A2B'],
    accentColor: '#D32F2F',
    surface: '#FCEEF2',
    border: '#F4D6DE',
    phaseIcon: '🩸',
    phaseText: 'Deep rest & introspection.',
    workoutRecommendation: 'Gentle walk or active rest',
    workoutDetails: 'Prioritize recovery and listen to your body.',
    workoutFocus: 'Restorative and gentle movement',
    workoutTypes: ['Light walking', 'Yoga', 'Stretching', 'Restorative Pilates'],
    workoutWhy: 'Energy and estrogen are lower—gentle movement promotes blood flow and reduces discomfort.',
    sleepRecommendation: 'Deep rest with flute sounds',
    sleepDetails: 'Long, deep sleep cycles support hormonal repair.',
    sleepPattern: 'Lighter, fragmented sleep; cramps may disrupt rest.',
    sleepRecommendations: ['Use heat pads', 'Relaxation or guided meditation', 'Consistent bedtime for easier onset'],
    sleepAids: ['Calming sleep music', 'Gentle yoga', 'Aromatherapy'],
    beautyTip: 'Gentle TLC and repair',
    beautyAction: 'Barrier‑repair serums and gentle cleansers for sensitivity.',
    suggestions: ['Ceramide serum', 'Fragrance‑free moisturizer', 'Soothing mist'],
    beautyRoutine: ['Creamy cleanse', 'Ceramide serum', 'Barrier moisturizer', 'SPF if outdoors'],
    beautyConcerns: ['Redness', 'Dryness', 'Sensitivity'],
  },
};


