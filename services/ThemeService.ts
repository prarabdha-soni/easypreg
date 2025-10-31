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
  // Enhanced workout fields
  workoutRecommendation: string;
  workoutDetails: string;
  workoutFocus: string;
  workoutTypes: string[];
  workoutWhy: string;
  fitnessSummary: string;
  workoutVideoURL?: string; // Optional video URL
  workoutTime: string; // e.g., "35 min"
  workoutLevel: string; // e.g., "Advanced"
  // Diet fields
  dietFocusTitle: string; // e.g., "Iron & Restorative Fats"
  macroGoals: string; // e.g., "40% Carbs, 35% Protein, 25% Fat"
  supplementRecommendation: string; // e.g., "Prioritize Magnesium"
  featuredRecipeName: string; // e.g., "Hearty Lentil Soup"
  dailyMealPlan: { meal: string; suggestion: string }[]; // Breakfast, Lunch, Dinner
  // Legacy fields (kept for backward compatibility)
  sleepRecommendation: string;
  sleepDetails: string;
  sleepPattern: string;
  sleepRecommendations: string[];
  sleepAids: string[];
  sleepSummary: string;
  beautyTip: string;
  beautyAction: string;
  suggestions: string[];
  beautyRoutine: string[]; // ordered routine steps for the day
  beautyConcerns: string[]; // common concerns this phase
  beautySummary: string;
  hairSummary: string;
  hairTips: string[];
  nutritionSummary: string;
  nutritionTips: string[];
  weightLossTips: string[];
};

export const themes: Record<HormonalPhase, PhaseTheme> = {
  Follicular: {
    gradient: ['#A073E1', '#E7A0F8'],
    accentColor: '#FFC107',
    surface: '#FAF3FF',
    border: '#E8D5E8',
    phaseIcon: '🌸',
    phaseText: 'Your energy is rising this week.',
    workoutRecommendation: 'Full-Body Strength & Cardio',
    workoutDetails: 'Heavy lifting to leverage peak strength.',
    workoutFocus: 'Building strength and increasing intensity',
    workoutTypes: ['Cardio', 'Circuit training', 'Strength training', 'HIIT'],
    workoutWhy: 'Estrogen rises, boosting energy, strength, and endurance—great for intensity and muscle gains.',
    fitnessSummary: 'Energy and strength are rising—ideal for cardio, strength training and HIIT. Try new challenges and build muscle/endurance.',
    workoutVideoURL: 'https://www.youtube.com/watch?v=YSJubcbzJmo',
    workoutTime: '30 min',
    workoutLevel: 'Intermediate',
    dietFocusTitle: 'Protein & Fiber Boost',
    macroGoals: '45% Carbs, 30% Protein, 25% Fat',
    supplementRecommendation: 'B-Complex vitamins for energy',
    featuredRecipeName: 'Masala Oats with Nuts',
    dailyMealPlan: [
      { meal: 'Breakfast', suggestion: 'Masala Oats with Almonds' },
      { meal: 'Lunch', suggestion: 'Paneer Tikka with Roti & Dal' },
      { meal: 'Dinner', suggestion: 'Chicken Curry with Brown Rice' },
    ],
    sleepRecommendation: 'Meditation for morning freshness',
    sleepDetails: 'Calm your mind to maximize energy gain for the rising phase.',
    sleepPattern: 'Generally improved sleep quality with more deep and REM sleep.',
    sleepRecommendations: ['Regular sleep schedule', 'Morning sunlight exposure', 'Avoid late caffeine/electronics'],
    sleepAids: ['Mindfulness meditation', 'Light daytime aerobic exercise'],
    sleepSummary: 'Sleep quality improves. Reinforce schedule, get morning light, and limit late caffeine and screens to anchor circadian rhythm.',
    beautyTip: 'Hydrate & nourish',
    beautyAction: 'Rich hydration to help skin bloom while oil is lower.',
    suggestions: ['Vitamin C serum', 'Gentle exfoliant 1–2×/week', 'Gel moisturizer'],
    beautyRoutine: ['Gentle cleanse', 'Vitamin C serum', 'Light moisturizer', 'Sunscreen (SPF 30+)'],
    beautyConcerns: ['Dullness after period', 'Mild dryness'],
    beautySummary: 'Skin looks brighter and resilient. Use lightweight hydration and antioxidants. Good time to try exfoliation or pro treatments.',
    hairSummary: 'Estrogen rises, supporting hair growth and strength.',
    hairTips: [
      'Use nourishing treatments and protein‑enriched masks.',
      'Light scalp exfoliation prepares follicles for growth.',
      'Protective hairstyles and trims help maintain healthy ends.'
    ],
    nutritionSummary: 'Protein + fiber to fuel rising energy and support muscle building.',
    nutritionTips: ['Lean proteins (eggs, fish, tofu)', 'High‑fiber veg and whole grains', 'Hydration and electrolytes'],
    weightLossTips: ['Leverage higher energy for HIIT/strength', 'Prioritize protein at each meal', 'Track recovery and sleep'],
  },
  Ovulation: {
    gradient: ['#FF7F50', '#FFDAB9'],
    accentColor: '#4CAF50',
    surface: '#FFF6ED',
    border: '#F2D6C7',
    phaseIcon: '✨',
    phaseText: 'Peak energy & clarity!',
    workoutRecommendation: 'High-Intensity Power Flow',
    workoutDetails: 'Explosive HIIT to maximize energy and endurance.',
    workoutFocus: 'Power and performance',
    workoutTypes: ['High‑intensity intervals', 'Skill‑based workouts', 'Tennis', 'Dance'],
    workoutWhy: 'Peak estrogen and LH provide maximum strength, speed, and coordination—ideal for performance.',
    fitnessSummary: 'Peak performance—focus on HIIT, dance, intense cardio or skill work. Social workouts feel rewarding.',
    workoutVideoURL: 'https://www.youtube.com/watch?v=mfG0p1sv9OI',
    workoutTime: '25 min',
    workoutLevel: 'Advanced',
    dietFocusTitle: 'Zinc & Antioxidants',
    macroGoals: '40% Carbs, 35% Protein, 25% Fat',
    supplementRecommendation: 'Zinc for peak performance',
    featuredRecipeName: 'Ragi Dosa with Sambar',
    dailyMealPlan: [
      { meal: 'Breakfast', suggestion: 'Poha with Nuts & Seeds' },
      { meal: 'Lunch', suggestion: 'Fish Curry with Steamed Rice' },
      { meal: 'Dinner', suggestion: 'Mixed Sprout Salad with Roti' },
    ],
    sleepRecommendation: 'Short naps for clarity',
    sleepDetails: 'Use deep, short rest to maintain peak focus and energy.',
    sleepPattern: 'Possible restlessness or difficulty falling asleep due to hormonal surge.',
    sleepRecommendations: ['Breathing exercises before bed', 'Cool, dark environment', 'Avoid stimulating screens/activities'],
    sleepAids: ['Blackout curtains', 'Relaxing sleep stories'],
    sleepSummary: 'Mild restlessness is common; keep the room cool/dark and use breathwork or mindfulness to unwind.',
    beautyTip: 'Your glow peaks — exfoliate gently',
    beautyAction: 'Remove dead skin to maximize radiance; mind increased oil.',
    suggestions: ['Light AHA toner', 'Hydrating sunscreen', 'Brightening serum'],
    beautyRoutine: ['Cleanse', 'Gentle exfoliation (2–3×/week)', 'Hydrating serum', 'SPF 50'],
    beautyConcerns: ['Shine/oil', 'Makeup pilling'],
    beautySummary: 'Radiant skin, slightly oilier—maintain cleansing, optional clay mask for oil. Minimal makeup shines.',
    hairSummary: 'Hair appears shinier, fuller, and healthier at peak estrogen.',
    hairTips: [
      'Minimize harsh chemical treatments; focus on hydration and shine.',
      'Avoid excessive heat styling to preserve gloss and reduce breakage.',
      'Use lightweight serums or oils to enhance natural shine.'
    ],
    nutritionSummary: 'Zinc + antioxidants support peak performance and skin.',
    nutritionTips: ['Colorful fruits/veg (vitamin C)', 'Seeds/nuts for zinc', 'Steady protein + hydration'],
    weightLossTips: ['High‑intensity blocks possible', 'Mind portion sizes with higher appetite', 'Keep carbs around workouts'],
  },
  Luteal: {
    gradient: ['#8A2BE2', '#DA70D6'],
    accentColor: '#800080',
    surface: '#F5EEFF',
    border: '#E5D4F7',
    phaseIcon: '🧘‍♀️',
    phaseText: 'Focus on self-care & winding down.',
    workoutRecommendation: 'Balancing Flow & Recovery',
    workoutDetails: 'Gentle movement to support mood and energy balance.',
    workoutFocus: 'Calm and recovery',
    workoutTypes: ['Moderate cardio', 'Yoga', 'Pilates', 'Low‑impact strength'],
    workoutWhy: 'Progesterone rises causing lower energy and fatigue—prioritize restorative consistency.',
    fitnessSummary: 'Energy dips—favor moderate, enjoyable movement (yoga, Pilates, light cardio). Focus on recovery and hydration.',
    workoutVideoURL: 'https://www.youtube.com/playlist?list=PL4SJd-G_GUh20CvrfTIwKrjCS998C1jWe',
    workoutTime: '35 min',
    workoutLevel: 'Beginner',
    dietFocusTitle: 'Magnesium & Complex Carbs',
    macroGoals: '50% Carbs, 25% Protein, 25% Fat',
    supplementRecommendation: 'Prioritize Magnesium',
    featuredRecipeName: 'Moong Dal Khichdi',
    dailyMealPlan: [
      { meal: 'Breakfast', suggestion: 'Dalia Upma with Vegetables' },
      { meal: 'Lunch', suggestion: 'Vegetable Biryani with Curd' },
      { meal: 'Dinner', suggestion: 'Jowar Roti with Dal & Sabzi' },
    ],
    sleepRecommendation: 'Magnesium + calming routine',
    sleepDetails: 'Warm, gentle routines to prepare for rest and ease tension.',
    sleepPattern: 'Increased need for sleep and more awakenings; higher body temperature.',
    sleepRecommendations: ['Breathable bedding & lower room temperature', 'Consistent wind‑down ritual', 'Avoid heavy meals or late strenuous workouts'],
    sleepAids: ['CBT‑I techniques', 'Guided sleep meditations'],
    sleepSummary: 'More awakenings and warmth—keep room cooler, maintain wind‑down, avoid heavy meals and late strenuous exercise.',
    beautyTip: 'Keep it clean and calm',
    beautyAction: 'Double‑cleanse and use anti‑inflammatory ingredients for breakouts.',
    suggestions: ['Niacinamide', 'Clay mask', 'Non‑stripping cleanser'],
    beautyRoutine: ['Non‑stripping cleanse', 'Niacinamide serum', 'Calming moisturizer', 'Spot treatment (if needed)'],
    beautyConcerns: ['Congestion', 'Hormonal breakouts', 'Sensitivity'],
    beautySummary: 'Breakouts/oil more likely—gentle exfoliants, non‑comedogenic moisturizers, spot treat; avoid harsh new actives.',
    hairSummary: 'Progesterone can increase scalp oil and shedding.',
    hairTips: [
      'Use gentle clarifying shampoos to manage excess oil.',
      'Soothe the scalp with anti‑inflammatory treatments if irritated.',
      'Avoid heavy styling products and reduce heat styling.'
    ],
    nutritionSummary: 'Magnesium + complex carbs to stabilize mood and sleep.',
    nutritionTips: ['Magnesium‑rich foods (cacao, nuts, leafy greens)', 'Complex carbs (oats, quinoa)', 'Limit caffeine late day'],
    weightLossTips: ['Favor low‑impact consistency', 'Manage cravings with protein/fiber', 'Prioritize sleep and stress care'],
  },
  Menstrual: {
    gradient: ['#5C1349', '#9E2A2B'],
    accentColor: '#D32F2F',
    surface: '#FCEEF2',
    border: '#F4D6DE',
    phaseIcon: '🩸',
    phaseText: 'Deep rest & introspection.',
    workoutRecommendation: 'Gentle Restorative Flow',
    workoutDetails: 'Restorative movement to ease discomfort and promote recovery.',
    workoutFocus: 'Restorative and gentle movement',
    workoutTypes: ['Light walking', 'Yoga', 'Stretching', 'Restorative Pilates'],
    workoutWhy: 'Energy and estrogen are lower—gentle movement promotes blood flow and reduces discomfort.',
    fitnessSummary: 'Prioritize rest and low‑impact movement—gentle yoga, stretching, easy walks. No pressure for high intensity.',
    workoutVideoURL: 'https://www.youtube.com/watch?v=mfG0p1sv9OI',
    workoutTime: '20 min',
    workoutLevel: 'Beginner',
    dietFocusTitle: 'Iron & Restorative Fats',
    macroGoals: '40% Carbs, 30% Protein, 30% Fat',
    supplementRecommendation: 'Iron with Vitamin C',
    featuredRecipeName: 'Palak Paneer with Roti',
    dailyMealPlan: [
      { meal: 'Breakfast', suggestion: 'Methi Paratha with Dahi' },
      { meal: 'Lunch', suggestion: 'Palak Paneer with Roti & Dal' },
      { meal: 'Dinner', suggestion: 'Moong Dal Khichdi with Ghee' },
    ],
    sleepRecommendation: 'Deep rest with flute sounds',
    sleepDetails: 'Long, deep sleep cycles support hormonal repair.',
    sleepPattern: 'Lighter, fragmented sleep; cramps may disrupt rest.',
    sleepRecommendations: ['Use heat pads', 'Relaxation or guided meditation', 'Consistent bedtime for easier onset'],
    sleepAids: ['Calming sleep music', 'Gentle yoga', 'Aromatherapy'],
    sleepSummary: 'Sleep can be lighter/fragmented—use warmth, relaxation/guided meditation, and consistent bedtime for comfort.',
    beautyTip: 'Gentle TLC and repair',
    beautyAction: 'Barrier‑repair serums and gentle cleansers for sensitivity.',
    suggestions: ['Ceramide serum', 'Fragrance‑free moisturizer', 'Soothing mist'],
    beautyRoutine: ['Creamy cleanse', 'Ceramide serum', 'Barrier moisturizer', 'SPF if outdoors'],
    beautyConcerns: ['Redness', 'Dryness', 'Sensitivity'],
    beautySummary: 'Skin more sensitive/dry; use mild fragrance‑free cleansers, rich moisturizers, avoid new actives; focus on soothing care.',
    hairSummary: 'Hair may feel dull or dry due to lower estrogen.',
    hairTips: [
      'Gentle cleansing with moisturizing shampoo and conditioner.',
      'Avoid heavy styling products or heat tools that dry hair.',
      'Massage scalp with coconut or jojoba oil to stimulate circulation.'
    ],
    nutritionSummary: 'Iron + hydration to restore and support comfort.',
    nutritionTips: ['Iron‑rich foods (leafy greens, beans)', 'Vitamin C with iron for absorption', 'Warm fluids and hydration'],
    weightLossTips: ['Prioritize rest; maintenance is okay', 'Gentle walks/yoga', 'Avoid aggressive deficits'],
  },
};


