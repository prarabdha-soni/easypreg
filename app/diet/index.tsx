import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, TextInput, Modal, Platform } from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { getCycleDay, getCurrentHormonalPhase, themes } from '@/services/ThemeService';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, UtensilsCrossed, Search, Droplet, Plus, Minus, X, Heart, Clock, Calendar, Play } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore: Only used on native
import { WebView } from 'react-native-webview';

const { width } = Dimensions.get('window');

export default function DietScreen() {
  const { profile } = useUser();
  const router = useRouter();
  const phaseKey: 'Menstrual'|'Follicular'|'Ovulation'|'Luteal' = useMemo(() => {
    if (!profile.lastPeriodDate) return 'Follicular';
    return getCurrentHormonalPhase(getCycleDay(profile.lastPeriodDate));
  }, [profile.lastPeriodDate]);
  const theme = themes[phaseKey];

  // Water intake tracker
  const [waterIntake, setWaterIntake] = useState(0);
  const waterGoal = 2.0; // 2L goal per day (can be phase-specific)
  const [showFoodLog, setShowFoodLog] = useState(false);
  const [showRecipeCollection, setShowRecipeCollection] = useState(false);
  const [showMealPlan, setShowMealPlan] = useState(false);
  const [mealPlans, setMealPlans] = useState<Record<string, {breakfast?: string; lunch?: string; dinner?: string}>>({});
  const [foodLog, setFoodLog] = useState<{id: string; name: string; calories: number; meal: string}[]>([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [recipeSearchQuery, setRecipeSearchQuery] = useState('');
  const [favoriteRecipes, setFavoriteRecipes] = useState<string[]>([]);
  const [dietPlayer, setDietPlayer] = useState<{ id: string; type: 'video' } | null>(null);

  useEffect(() => {
    (async () => {
      const todayKey = new Date().toISOString().slice(0, 10);
      const waterKey = `@water_intake:${todayKey}`;
      const foodKey = `@food_log:${todayKey}`;
      try {
        const water = await AsyncStorage.getItem(waterKey);
        const food = await AsyncStorage.getItem(foodKey);
        const favorites = await AsyncStorage.getItem('@favorite_recipes');
        if (water) setWaterIntake(parseFloat(water));
        if (food) {
          const parsed = JSON.parse(food);
          setFoodLog(parsed);
          const total = parsed.reduce((sum: number, item: any) => sum + item.calories, 0);
          setTotalCalories(total);
        }
        if (favorites) setFavoriteRecipes(JSON.parse(favorites));
        const plans = await AsyncStorage.getItem('@meal_plans');
        if (plans) setMealPlans(JSON.parse(plans));
      } catch {}
    })();
  }, []);

  // Generate week dates (Sun-Sat)
  const getWeekDates = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day;
    const weekStart = new Date(today);
    weekStart.setDate(diff);
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const updateMealPlan = async (dateKey: string, mealType: 'breakfast' | 'lunch' | 'dinner', recipe: string) => {
    const updated = {
      ...mealPlans,
      [dateKey]: {
        ...(mealPlans[dateKey] || {}),
        [mealType]: recipe,
      },
    };
    setMealPlans(updated);
    await AsyncStorage.setItem('@meal_plans', JSON.stringify(updated));
  };

  // Comprehensive Indian Recipe database (phase-filtered)
  const recipeDatabase = {
    Menstrual: [
      { id: 'm1', name: 'Palak Paneer with Roti', time: '30 min', calories: 380, ingredients: ['Paneer', 'Spinach', 'Tomatoes', 'Onion', 'Garam Masala'], phase: 'Menstrual', description: 'Iron-rich comfort food - perfect for recovery' },
      { id: 'm2', name: 'Moong Dal Khichdi', time: '25 min', calories: 320, ingredients: ['Moong Dal', 'Rice', 'Turmeric', 'Ghee', 'Jeera'], phase: 'Menstrual', description: 'Warming, easy-to-digest comfort meal' },
      { id: 'm3', name: 'Dal Tadka with Rice', time: '20 min', calories: 350, ingredients: ['Yellow Dal', 'Tadka', 'Rice', 'Ghee', 'Coriander'], phase: 'Menstrual', description: 'Protein-rich and comforting' },
      { id: 'm4', name: 'Methi Paratha with Dahi', time: '25 min', calories: 280, ingredients: ['Wheat Flour', 'Fenugreek', 'Ghee', 'Curd', 'Pickle'], phase: 'Menstrual', description: 'Iron-rich paratha with cooling yogurt' },
      { id: 'm5', name: 'Gajar Halwa (Dessert)', time: '40 min', calories: 320, ingredients: ['Carrots', 'Milk', 'Ghee', 'Sugar', 'Nuts'], phase: 'Menstrual', description: 'Nutritious sweet treat for comfort' },
      { id: 'm6', name: 'Rajma Chawal', time: '35 min', calories: 400, ingredients: ['Kidney Beans', 'Rice', 'Onions', 'Tomatoes', 'Spices'], phase: 'Menstrual', description: 'High iron and protein meal' },
    ],
    Follicular: [
      { id: 'f1', name: 'Masala Oats with Nuts', time: '15 min', calories: 350, ingredients: ['Oats', 'Vegetables', 'Almonds', 'Ghee', 'Spices'], phase: 'Follicular', description: 'High-protein energizing breakfast' },
      { id: 'f2', name: 'Paneer Tikka with Roti', time: '30 min', calories: 420, ingredients: ['Paneer', 'Bell Peppers', 'Onions', 'Spices', 'Roti'], phase: 'Follicular', description: 'Protein-packed for muscle building' },
      { id: 'f3', name: 'Chicken Curry with Brown Rice', time: '35 min', calories: 480, ingredients: ['Chicken', 'Onions', 'Tomatoes', 'Spices', 'Brown Rice'], phase: 'Follicular', description: 'Complete protein for strength training' },
      { id: 'f4', name: 'Sprout Salad with Poha', time: '20 min', calories: 320, ingredients: ['Mixed Sprouts', 'Poha', 'Onions', 'Lemon', 'Sev'], phase: 'Follicular', description: 'High-fiber protein boost' },
      { id: 'f5', name: 'Moong Chilla (Protein Pancakes)', time: '15 min', calories: 180, ingredients: ['Moong Dal', 'Vegetables', 'Spices', 'Oil', 'Chutney'], phase: 'Follicular', description: 'High-protein breakfast or snack' },
      { id: 'f6', name: 'Egg Bhurji with Roti', time: '20 min', calories: 350, ingredients: ['Eggs', 'Onions', 'Tomatoes', 'Spices', 'Roti'], phase: 'Follicular', description: 'Quick protein-packed meal' },
    ],
    Ovulation: [
      { id: 'o1', name: 'Ragi Dosa with Sambar', time: '30 min', calories: 280, ingredients: ['Ragi Flour', 'Rice', 'Sambar', 'Coconut Chutney', 'Oil'], phase: 'Ovulation', description: 'Zinc-rich, antioxidant powerhouse' },
      { id: 'o2', name: 'Poha with Nuts & Seeds', time: '15 min', calories: 320, ingredients: ['Poha', 'Peanuts', 'Sesame Seeds', 'Lemon', 'Coriander'], phase: 'Ovulation', description: 'Light, zinc-rich breakfast' },
      { id: 'o3', name: 'Fish Curry with Steamed Rice', time: '30 min', calories: 420, ingredients: ['Fish', 'Coconut', 'Spices', 'Rice', 'Curry Leaves'], phase: 'Ovulation', description: 'Omega-3s and zinc for peak performance' },
      { id: 'o4', name: 'Dhokla with Green Chutney', time: '25 min', calories: 180, ingredients: ['Besan', 'Curd', 'Eno', 'Mustard Seeds', 'Green Chutney'], phase: 'Ovulation', description: 'Protein-rich, light snack' },
      { id: 'o5', name: 'Mixed Sprout Salad', time: '10 min', calories: 250, ingredients: ['Sprouts', 'Cucumber', 'Tomatoes', 'Lemon', 'Seeds'], phase: 'Ovulation', description: 'Antioxidant-rich fresh meal' },
      { id: 'o6', name: 'Quinoa Khichdi', time: '25 min', calories: 350, ingredients: ['Quinoa', 'Moong Dal', 'Vegetables', 'Ghee', 'Spices'], phase: 'Ovulation', description: 'Complete protein with zinc' },
    ],
    Luteal: [
      { id: 'l1', name: 'Moong Dal Khichdi (Comfort Meal)', time: '25 min', calories: 300, ingredients: ['Moong Dal', 'Rice', 'Ghee', 'Turmeric', 'Vegetables'], phase: 'Luteal', description: 'Easy digestible, mood-stabilizing' },
      { id: 'l2', name: 'Dosa with Potato Sabzi', time: '30 min', calories: 320, ingredients: ['Dosa Batter', 'Potatoes', 'Onions', 'Sambar', 'Chutney'], phase: 'Luteal', description: 'Complex carbs for sustained energy' },
      { id: 'l3', name: 'Vegetable Biryani', time: '40 min', calories: 450, ingredients: ['Basmati Rice', 'Vegetables', 'Spices', 'Ghee', 'Curd'], phase: 'Luteal', description: 'Magnesium-rich comfort food' },
      { id: 'l4', name: 'Jowar Roti with Dal', time: '25 min', calories: 280, ingredients: ['Jowar Flour', 'Dal', 'Ghee', 'Vegetables', 'Pickle'], phase: 'Luteal', description: 'Slow-release carbs, mood support' },
      { id: 'l5', name: 'Dalia (Broken Wheat) Upma', time: '20 min', calories: 320, ingredients: ['Dalia', 'Vegetables', 'Mustard Seeds', 'Ghee', 'Lemon'], phase: 'Luteal', description: 'Fiber-rich for stable energy' },
      { id: 'l6', name: 'Ragi Roti with Aloo Curry', time: '30 min', calories: 350, ingredients: ['Ragi Flour', 'Potatoes', 'Spices', 'Ghee', 'Curd'], phase: 'Luteal', description: 'Magnesium and complex carbs' },
    ],
  };

  // Indian Meal prep programs by phase with YouTube videos
  const mealPrepPrograms = {
    Menstrual: [
      { id: 'mp_m1', title: 'Iron-Rich Dal & Sabzi Prep', days: 3, meals: '9 meals', focus: 'Recovery Nutrition', description: 'Pre-made dal, palak dishes for easy recovery', videoUrl: 'https://www.youtube.com/watch?v=3K35nXrhIRY' },
      { id: 'mp_m2', title: 'Comfort Khichdi & Paratha Prep', days: 5, meals: '15 meals', focus: 'Warming Meals', description: 'Batch cook khichdi, parathas for comfort', videoUrl: 'https://www.youtube.com/watch?v=2U1FVLtZLk8' },
    ],
    Follicular: [
      { id: 'mp_f1', title: 'High-Protein Paneer & Egg Prep', days: 7, meals: '21 meals', focus: 'Muscle Building', description: 'Paneer dishes, egg bhurji prep for strength', videoUrl: 'https://www.youtube.com/watch?v=YSJubcbzJmo' },
      { id: 'mp_f2', title: 'Energy Breakfast Prep (Oats, Chilla)', days: 5, meals: '5 breakfasts', focus: 'Morning Fuel', description: 'Masala oats, moong chilla prep', videoUrl: 'https://www.youtube.com/watch?v=YSJubcbzJmo' },
    ],
    Ovulation: [
      { id: 'mp_o1', title: 'Peak Performance Meal Plan', days: 5, meals: '15 meals', focus: 'Optimal Nutrition', description: 'Ragi dosa, fish curry, sprout salads', videoUrl: 'https://www.youtube.com/watch?v=mfG0p1sv9OI' },
      { id: 'mp_o2', title: 'Zinc-Rich Snack Prep (Dhokla, Sprouts)', days: 4, meals: '12 meals', focus: 'Hormonal Support', description: 'Dhokla, sprout salad prep for zinc', videoUrl: 'https://www.youtube.com/watch?v=YSJubcbzJmo' },
    ],
    Luteal: [
      { id: 'mp_l1', title: 'PMS-Support Comfort Prep', days: 7, meals: '21 meals', focus: 'Mood & Energy', description: 'Khichdi, biryani, jowar roti prep', videoUrl: 'https://www.youtube.com/playlist?list=PL4SJd-G_GUh20CvrfTIwKrjCS998C1jWe' },
      { id: 'mp_l2', title: 'Sustained Energy Meal Prep', days: 5, meals: '15 meals', focus: 'Stable Energy', description: 'Dalia, dosa prep for stable energy', videoUrl: 'https://www.youtube.com/watch?v=mfG0p1sv9OI' },
    ],
  };

  const currentRecipes = recipeDatabase[phaseKey] || recipeDatabase.Follicular;
  const filteredRecipes = recipeSearchQuery
    ? currentRecipes.filter(r => r.name.toLowerCase().includes(recipeSearchQuery.toLowerCase()))
    : currentRecipes;

  const toggleFavorite = async (recipeId: string) => {
    const updated = favoriteRecipes.includes(recipeId)
      ? favoriteRecipes.filter(id => id !== recipeId)
      : [...favoriteRecipes, recipeId];
    setFavoriteRecipes(updated);
    await AsyncStorage.setItem('@favorite_recipes', JSON.stringify(updated));
  };

  const addWater = async (amount: number) => {
    const newAmount = Math.max(0, Math.min(waterGoal, waterIntake + amount));
    setWaterIntake(newAmount);
    const todayKey = new Date().toISOString().slice(0, 10);
    await AsyncStorage.setItem(`@water_intake:${todayKey}`, newAmount.toString());
  };

  const addFood = async (name: string, calories: number, meal: string) => {
    const newFood = { id: Date.now().toString(), name, calories, meal };
    const updated = [...foodLog, newFood];
    setFoodLog(updated);
    setTotalCalories(prev => prev + calories);
    const todayKey = new Date().toISOString().slice(0, 10);
    await AsyncStorage.setItem(`@food_log:${todayKey}`, JSON.stringify(updated));
    setSearchQuery('');
  };

  const removeFood = async (id: string) => {
    const item = foodLog.find(f => f.id === id);
    if (item) {
      const updated = foodLog.filter(f => f.id !== id);
      setFoodLog(updated);
      setTotalCalories(prev => prev - item.calories);
      const todayKey = new Date().toISOString().slice(0, 10);
      await AsyncStorage.setItem(`@food_log:${todayKey}`, JSON.stringify(updated));
    }
  };

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  // Indian Quick food items (mock database)
  const quickFoods = [
    { name: 'Roti (1 piece)', calories: 70, meal: 'Lunch' },
    { name: 'Dal (1 katori)', calories: 120, meal: 'Lunch' },
    { name: 'Curd (1 katori)', calories: 60, meal: 'Snack' },
    { name: 'Paneer (50g)', calories: 120, meal: 'Lunch' },
    { name: 'Rice (1 katori)', calories: 130, meal: 'Lunch' },
    { name: 'Banana (1)', calories: 90, meal: 'Snack' },
    { name: 'Almonds (10)', calories: 70, meal: 'Snack' },
    { name: 'Moong Chilla (1)', calories: 80, meal: 'Breakfast' },
    { name: 'Poha (1 katori)', calories: 150, meal: 'Breakfast' },
    { name: 'Dosa (1)', calories: 120, meal: 'Breakfast' },
  ];

  const filteredFoods = searchQuery 
    ? quickFoods.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : quickFoods.slice(0, 6);

  // Mock data for macro tracking
  const macros = theme.macroGoals.match(/(\d+)%/g) || ['40', '35', '25'];
  const carbsPercent = parseInt(macros[0]) || 40;
  const proteinPercent = parseInt(macros[1]) || 35;
  const fatsPercent = parseInt(macros[2]) || 25;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface }]} showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => { try { router.back(); } catch { router.replace('/(tabs)'); } }}>
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
      </View>

      <Text style={styles.pageTitle}>Indian Diet & Nutrition 🇮🇳</Text>
      <Text style={styles.pageSubtitle}>Phase-wise meal plans tailored for Indian cuisine</Text>

      {/* Phase Focus Card */}
      <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.phaseCard}>
        <View style={styles.phaseBadge}>
          <Text style={styles.phaseBadgeText}>{phaseKey} Phase</Text>
        </View>
        <Text style={styles.focusTitle}>{theme.dietFocusTitle}</Text>
        <Text style={styles.focusSubtitle}>Focus on {theme.dietFocusTitle.toLowerCase()} for optimal hormone support</Text>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FFFFFF' }]}>
          <Text style={[styles.actionBtnText, { color: theme.accentColor }]}>See Phase Guide</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Macro Goals & Tracking */}
      <View style={styles.macroSection}>
        <Text style={styles.sectionTitle}>Macro Goals & Tracking</Text>
        <View style={styles.macroChart}>
          <View style={styles.macroRing}>
            <Text style={styles.macroPercent}>{carbsPercent}%</Text>
            <Text style={styles.macroLabel}>Carbs</Text>
          </View>
          <View style={styles.macroRing}>
            <Text style={styles.macroPercent}>{proteinPercent}%</Text>
            <Text style={styles.macroLabel}>Protein</Text>
          </View>
          <View style={styles.macroRing}>
            <Text style={styles.macroPercent}>{fatsPercent}%</Text>
            <Text style={styles.macroLabel}>Fats</Text>
          </View>
        </View>
        <Text style={styles.macroText}>Target: {theme.macroGoals}</Text>
        
        <TouchableOpacity style={[styles.logBtn, { backgroundColor: theme.accentColor }]} onPress={() => setShowFoodLog(true)}>
          <UtensilsCrossed color="#FFFFFF" size={18} />
          <Text style={styles.logBtnText}>Log Today's Meal</Text>
        </TouchableOpacity>
      </View>

      {/* Water Intake Tracker */}
      <View style={[styles.waterSection, { borderColor: theme.border }]}>
        <Text style={styles.sectionTitle}>Water Intake</Text>
        <View style={styles.waterRow}>
          <View style={styles.waterDrops}>
            {[0.5, 1.0, 1.5, 2.0].map((level, i) => (
              <View key={i} style={styles.waterDropContainer}>
                <Droplet 
                  size={28} 
                  color={waterIntake >= level ? theme.accentColor : '#E5E7EB'}
                  fill={waterIntake >= level ? theme.accentColor : 'transparent'}
                />
                <Text style={styles.waterLabel}>{level}L</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.waterControls}>
          <TouchableOpacity style={[styles.waterBtn, { borderColor: theme.accentColor }]} onPress={() => addWater(-0.25)}>
            <Minus color={theme.accentColor} size={20} />
          </TouchableOpacity>
          <Text style={[styles.waterAmount, { color: theme.accentColor }]}>{waterIntake.toFixed(2)}L / {waterGoal}L</Text>
          <TouchableOpacity style={[styles.waterBtn, { borderColor: theme.accentColor }]} onPress={() => addWater(0.25)}>
            <Plus color={theme.accentColor} size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.waterProgress}>
          <View style={[styles.waterProgressFill, { width: `${Math.min(100, (waterIntake / waterGoal) * 100)}%`, backgroundColor: theme.accentColor }]} />
        </View>
      </View>

      {/* Food Log Summary */}
      {foodLog.length > 0 && (
        <View style={[styles.foodLogSection, { borderColor: theme.border }]}>
          <Text style={styles.sectionTitle}>Today's Meals</Text>
          <Text style={styles.calorieTotal}>{totalCalories} / 1800 kcal</Text>
          {foodLog.map((item) => (
            <View key={item.id} style={styles.foodLogItem}>
              <View style={styles.foodLogInfo}>
                <Text style={styles.foodLogName}>{item.name}</Text>
                <Text style={styles.foodLogMeta}>{item.meal} • {item.calories} kcal</Text>
              </View>
              <TouchableOpacity onPress={() => removeFood(item.id)}>
                <X color="#EF4444" size={18} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Meal Prep Programs */}
      <View style={styles.programsSection}>
        <Text style={styles.sectionTitle}>Meal Prep Programs</Text>
        <Text style={styles.programsSubtitle}>Pre-planned meal prep for {phaseKey} phase</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.programsRow}>
          {(mealPrepPrograms[phaseKey] || mealPrepPrograms.Follicular).map((program) => (
            <TouchableOpacity
              key={program.id}
              style={[styles.programCard, { borderColor: theme.border, backgroundColor: theme.surface }]}
              onPress={() => {
                if (program.videoUrl) {
                  const videoId = extractVideoId(program.videoUrl);
                  if (videoId) setDietPlayer({ id: videoId, type: 'video' });
                }
              }}
            >
              <LinearGradient colors={theme.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.programHeader}>
                <Text style={styles.programTitle}>{program.title}</Text>
                <Text style={styles.programMeta}>{program.days} days • {program.meals}</Text>
                {program.videoUrl && (
                  <View style={styles.videoBadge}>
                    <Play color="#FFFFFF" size={12} />
                    <Text style={styles.videoBadgeText}>Video Guide</Text>
                  </View>
                )}
              </LinearGradient>
              <View style={styles.programBody}>
                <Text style={styles.programFocus}>{program.focus}</Text>
                <Text style={styles.programDescription}>{program.description}</Text>
                <TouchableOpacity 
                  style={[styles.programBtn, { backgroundColor: theme.accentColor }]}
                  onPress={(e) => {
                    e.stopPropagation();
                    if (program.videoUrl) {
                      const videoId = extractVideoId(program.videoUrl);
                      if (videoId) setDietPlayer({ id: videoId, type: 'video' });
                    }
                  }}
                >
                  <Play color="#FFFFFF" size={14} />
                  <Text style={styles.programBtnText}>Watch & Start</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Daily Meal Plan */}
      <View style={styles.mealSection}>
        <Text style={styles.sectionTitle}>Today's Phase Plan</Text>
        {theme.dailyMealPlan.map((item, i) => (
          <View key={i} style={[styles.mealRow, { borderColor: theme.border }]}>
            <Text style={styles.mealType}>{item.meal}:</Text>
            <Text style={styles.mealSuggestion}>{item.suggestion}</Text>
          </View>
        ))}
      </View>

      {/* Featured Recipe Card */}
      <View style={[styles.recipeCard, { borderColor: theme.border }]}>
        <View style={styles.recipeImagePlaceholder}>
          <UtensilsCrossed color={theme.accentColor} size={40} />
        </View>
        <Text style={styles.recipeTitle}>{theme.featuredRecipeName}</Text>
        <Text style={styles.recipeTime}>30 min • {theme.workoutLevel}</Text>
        <TouchableOpacity style={styles.viewRecipeBtn}>
          <Text style={[styles.viewRecipeText, { color: theme.accentColor }]}>View Recipe</Text>
        </TouchableOpacity>
      </View>

      {/* Supplement Insight */}
      <View style={[styles.supplementCard, { borderColor: theme.border }]}>
        <Text style={styles.supplementTitle}>Supplement Insight</Text>
        <Text style={styles.supplementText}>{theme.supplementRecommendation}</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, { borderColor: theme.border }]} onPress={() => setShowRecipeCollection(true)}>
          <UtensilsCrossed color={theme.accentColor} size={18} />
          <Text style={[styles.actionButtonText, { color: theme.accentColor }]}>Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { borderColor: theme.border }]} onPress={() => setShowMealPlan(true)}>
          <Calendar color={theme.accentColor} size={18} />
          <Text style={[styles.actionButtonText, { color: theme.accentColor }]}>Meal Plan</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />

      {/* Food Logging Modal */}
      <Modal visible={showFoodLog} transparent animationType="slide" onRequestClose={() => setShowFoodLog(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Log Food</Text>
              <TouchableOpacity onPress={() => setShowFoodLog(false)}>
                <X color="#111827" size={24} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.searchContainer}>
              <Search color="#6B7280" size={20} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search food..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <ScrollView style={styles.foodList} showsVerticalScrollIndicator={false}>
              {filteredFoods.map((food, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.foodItem, { borderColor: theme.border }]}
                  onPress={() => {
                    const meal = ['Breakfast', 'Lunch', 'Dinner', 'Snack'][Math.floor(i % 4)];
                    addFood(food.name, food.calories, meal);
                    setShowFoodLog(false);
                  }}
                >
                  <View>
                    <Text style={styles.foodItemName}>{food.name}</Text>
                    <Text style={styles.foodItemCal}>{food.calories} kcal</Text>
                  </View>
                  <Plus color={theme.accentColor} size={20} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Recipe Collection Modal */}
      <Modal visible={showRecipeCollection} transparent animationType="slide" onRequestClose={() => setShowRecipeCollection(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Recipe Collection</Text>
              <TouchableOpacity onPress={() => setShowRecipeCollection(false)}>
                <X color="#111827" size={24} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubtitle}>{phaseKey} Phase Recipes</Text>
            
            <View style={styles.searchContainer}>
              <Search color="#6B7280" size={20} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search recipes..."
                value={recipeSearchQuery}
                onChangeText={setRecipeSearchQuery}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <ScrollView style={styles.recipeList} showsVerticalScrollIndicator={false}>
              {filteredRecipes.map((recipe) => (
                <View key={recipe.id} style={[styles.recipeItemCard, { borderColor: theme.border }]}>
                  <View style={styles.recipeItemHeader}>
                    <View style={styles.recipeItemInfo}>
                      <Text style={styles.recipeItemName}>{recipe.name}</Text>
                      {recipe.description && <Text style={styles.recipeItemDesc}>{recipe.description}</Text>}
                      <View style={styles.recipeItemMeta}>
                        <Clock color="#6B7280" size={14} />
                        <Text style={styles.recipeItemTime}>{recipe.time}</Text>
                        <Text style={styles.recipeItemCal}>{recipe.calories} kcal</Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => toggleFavorite(recipe.id)}>
                      <Heart 
                        size={20} 
                        color={favoriteRecipes.includes(recipe.id) ? theme.accentColor : '#E5E7EB'}
                        fill={favoriteRecipes.includes(recipe.id) ? theme.accentColor : 'transparent'}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.ingredientsList}>
                    {recipe.ingredients.map((ing, i) => (
                      <View key={i} style={[styles.ingredientTag, { backgroundColor: theme.surface }]}>
                        <Text style={[styles.ingredientText, { color: theme.accentColor }]}>{ing}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Meal Planning Calendar Modal */}
      <Modal visible={showMealPlan} transparent animationType="slide" onRequestClose={() => setShowMealPlan(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Weekly Meal Plan</Text>
              <TouchableOpacity onPress={() => setShowMealPlan(false)}>
                <X color="#111827" size={24} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.calendarView} showsVerticalScrollIndicator={false}>
              {weekDates.map((date, i) => {
                const dateKey = date.toISOString().slice(0, 10);
                const dayPlan = mealPlans[dateKey] || {};
                const isToday = date.toDateString() === new Date().toDateString();
                
                return (
                  <View key={i} style={[styles.calendarDay, { borderColor: theme.border }, isToday && { borderColor: theme.accentColor, borderWidth: 2 }]}>
                    <View style={styles.calendarDayHeader}>
                      <Text style={[styles.calendarDayName, { color: isToday ? theme.accentColor : '#111827' }]}>{dayNames[i]}</Text>
                      <Text style={[styles.calendarDayDate, { color: isToday ? theme.accentColor : '#6B7280' }]}>
                        {date.getDate()}
                      </Text>
                    </View>
                    
                    <TouchableOpacity 
                      style={[styles.mealSlot, { borderColor: theme.border }]}
                      onPress={() => {
                        const recipes = currentRecipes.filter(r => r.name.includes('Breakfast') || r.name.includes('Oats') || r.name.includes('Yogurt'));
                        if (recipes.length > 0) updateMealPlan(dateKey, 'breakfast', recipes[0].name);
                      }}
                    >
                      <Text style={styles.mealSlotLabel}>Breakfast</Text>
                      <Text style={styles.mealSlotValue} numberOfLines={1}>
                        {dayPlan.breakfast || 'Tap to add'}
                      </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.mealSlot, { borderColor: theme.border }]}
                      onPress={() => {
                        const recipes = currentRecipes.filter(r => r.name.includes('Salad') || r.name.includes('Lunch') || r.name.includes('Bowl'));
                        if (recipes.length > 0) updateMealPlan(dateKey, 'lunch', recipes[0].name);
                      }}
                    >
                      <Text style={styles.mealSlotLabel}>Lunch</Text>
                      <Text style={styles.mealSlotValue} numberOfLines={1}>
                        {dayPlan.lunch || 'Tap to add'}
                      </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.mealSlot, { borderColor: theme.border }]}
                      onPress={() => {
                        const recipes = currentRecipes.filter(r => r.name.includes('Dinner') || r.name.includes('Salmon') || r.name.includes('Soup'));
                        if (recipes.length > 0) updateMealPlan(dateKey, 'dinner', recipes[0].name);
                      }}
                    >
                      <Text style={styles.mealSlotLabel}>Dinner</Text>
                      <Text style={styles.mealSlotValue} numberOfLines={1}>
                        {dayPlan.dinner || 'Tap to add'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Video Player Modal for Meal Prep Programs */}
      <Modal visible={!!dietPlayer} transparent animationType="fade" onRequestClose={() => setDietPlayer(null)}>
        <View style={styles.videoModalOverlay}>
          <View style={styles.videoModalCard}>
            <View style={styles.videoHeader}>
              <Text style={styles.videoTitle}>Meal Prep Guide</Text>
              <TouchableOpacity 
                style={[styles.closeVideoBtn, { backgroundColor: 'rgba(255,255,255,0.2)' }]} 
                onPress={() => setDietPlayer(null)}
              >
                <X color="#FFFFFF" size={20} />
              </TouchableOpacity>
            </View>
            {dietPlayer && (
              Platform.OS === 'web' ? (
                <View style={styles.videoContainer}>
                  {/* @ts-ignore */}
                  <iframe
                    style={{ width: '100%', height: '100%', border: 'none' }}
                    src={`https://www.youtube.com/embed/${dietPlayer.id}?autoplay=1&playsinline=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </View>
              ) : (
                <WebView
                  source={{ uri: `https://www.youtube.com/embed/${dietPlayer.id}?autoplay=1&playsinline=1` }}
                  style={styles.videoWebView}
                  allowsInlineMediaPlayback={true}
                  mediaPlaybackRequiresUserAction={false}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  startInLoadingState={true}
                  onShouldStartLoadWithRequest={(request) => {
                    return request.url.includes('youtube.com/embed');
                  }}
                />
              )
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { paddingHorizontal: 16, paddingTop: 16 },
  pageTitle: { fontSize: 28, fontWeight: '700', color: '#111827', paddingHorizontal: 20, marginTop: 8, marginBottom: 4 },
  pageSubtitle: { fontSize: 14, color: '#6B7280', paddingHorizontal: 20, marginBottom: 20 },
  phaseCard: { marginHorizontal: 20, borderRadius: 20, padding: 24, marginBottom: 20 },
  phaseBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.3)', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 12, marginBottom: 12 },
  phaseBadgeText: { color: '#FFFFFF', fontWeight: '700', fontSize: 11, letterSpacing: 0.5 },
  focusTitle: { fontSize: 22, fontWeight: '700', color: '#FFFFFF', marginBottom: 8 },
  focusSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.9)', marginBottom: 16, lineHeight: 20 },
  actionBtn: { alignSelf: 'flex-start', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12 },
  actionBtnText: { fontWeight: '700', fontSize: 14 },
  macroSection: { marginHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 16 },
  macroChart: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  macroRing: { alignItems: 'center' },
  macroPercent: { fontSize: 24, fontWeight: '700', color: '#111827', marginBottom: 4 },
  macroLabel: { fontSize: 12, color: '#6B7280', fontWeight: '600' },
  macroText: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 16 },
  logBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, paddingHorizontal: 20, borderRadius: 12 },
  logBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  mealSection: { marginHorizontal: 20, marginBottom: 24 },
  mealRow: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1 },
  mealType: { fontSize: 15, fontWeight: '700', color: '#111827', width: 100 },
  mealSuggestion: { fontSize: 14, color: '#6B7280', flex: 1 },
  recipeCard: { marginHorizontal: 20, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, borderWidth: 1, marginBottom: 20 },
  recipeImagePlaceholder: { width: '100%', height: 160, backgroundColor: '#F9FAFB', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  recipeTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 6 },
  recipeTime: { fontSize: 13, color: '#6B7280', marginBottom: 12 },
  viewRecipeBtn: { alignSelf: 'flex-start' },
  viewRecipeText: { fontWeight: '700', fontSize: 14 },
  supplementCard: { marginHorizontal: 20, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, borderWidth: 1, marginBottom: 20 },
  supplementTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 8 },
  supplementText: { fontSize: 14, color: '#6B7280', lineHeight: 20 },
  browseBtn: { marginHorizontal: 20, alignItems: 'center', paddingVertical: 12 },
  browseText: { fontWeight: '700', fontSize: 14 },
  actionButtons: { flexDirection: 'row', gap: 12, marginHorizontal: 20, marginBottom: 20 },
  actionButton: { flex: 1, backgroundColor: '#FFFFFF', borderWidth: 1, borderRadius: 12, paddingVertical: 12, alignItems: 'center', gap: 6 },
  actionButtonText: { fontSize: 13, fontWeight: '700' },
  waterSection: { marginHorizontal: 20, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, borderWidth: 1, marginBottom: 24 },
  waterRow: { marginBottom: 16 },
  waterDrops: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  waterDropContainer: { alignItems: 'center', gap: 4 },
  waterLabel: { fontSize: 10, color: '#6B7280', fontWeight: '600' },
  waterControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 12 },
  waterBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  waterAmount: { fontSize: 16, fontWeight: '700', minWidth: 120, textAlign: 'center' },
  waterProgress: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden' },
  waterProgressFill: { height: '100%', borderRadius: 4 },
  foodLogSection: { marginHorizontal: 20, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, borderWidth: 1, marginBottom: 24 },
  calorieTotal: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 12 },
  foodLogItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  foodLogInfo: { flex: 1 },
  foodLogName: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 4 },
  foodLogMeta: { fontSize: 12, color: '#6B7280' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%', padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#111827' },
  modalSubtitle: { fontSize: 14, color: '#6B7280', marginBottom: 16 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 16, gap: 10 },
  searchInput: { flex: 1, fontSize: 15, color: '#111827' },
  foodList: { maxHeight: 400 },
  foodItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  foodItemName: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 4 },
  foodItemCal: { fontSize: 12, color: '#6B7280' },
  recipeList: { maxHeight: 500 },
  recipeItemCard: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1 },
  recipeItemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  recipeItemInfo: { flex: 1 },
  recipeItemName: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 6 },
  recipeItemDesc: { fontSize: 12, color: '#6B7280', marginBottom: 8, lineHeight: 18 },
  recipeItemMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  recipeItemTime: { fontSize: 12, color: '#6B7280', marginLeft: 4 },
  recipeItemCal: { fontSize: 12, color: '#6B7280' },
  ingredientsList: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  ingredientTag: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8 },
  ingredientText: { fontSize: 11, fontWeight: '600' },
  calendarView: { maxHeight: 600 },
  calendarDay: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1 },
  calendarDayHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  calendarDayName: { fontSize: 16, fontWeight: '700' },
  calendarDayDate: { fontSize: 14, fontWeight: '600' },
  mealSlot: { backgroundColor: '#FFFFFF', borderRadius: 8, padding: 10, marginBottom: 8, borderWidth: 1 },
  mealSlotLabel: { fontSize: 11, fontWeight: '700', color: '#6B7280', marginBottom: 4, textTransform: 'uppercase' },
  mealSlotValue: { fontSize: 13, color: '#111827', fontWeight: '600' },
  programsSection: { marginHorizontal: 20, marginBottom: 24 },
  programsSubtitle: { fontSize: 13, color: '#6B7280', marginBottom: 16 },
  programsRow: { gap: 16, paddingRight: 20 },
  programCard: { width: 280, borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  programHeader: { padding: 16 },
  programTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  programMeta: { fontSize: 12, color: 'rgba(255,255,255,0.9)' },
  programBody: { padding: 16, backgroundColor: '#FFFFFF' },
  programFocus: { fontSize: 13, fontWeight: '700', color: '#111827', marginBottom: 6 },
  programDescription: { fontSize: 12, color: '#6B7280', marginBottom: 12, lineHeight: 18 },
  programBtn: { paddingVertical: 10, borderRadius: 10, alignItems: 'center', flexDirection: 'row', gap: 6, justifyContent: 'center' },
  programBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  videoBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8, backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, alignSelf: 'flex-start' },
  videoBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  videoModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center', alignItems: 'center' },
  videoModalCard: { width: '100%', height: '100%', backgroundColor: '#000', justifyContent: 'center' },
  videoHeader: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 56, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.5)' },
  videoTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },
  closeVideoBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  videoContainer: { flex: 1, width: '100%' },
  videoWebView: { flex: 1, width: '100%', backgroundColor: '#000' },
});

