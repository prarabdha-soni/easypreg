import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useUser } from '@/contexts/UserContext';

export default function IndexScreen() {
  const router = useRouter();
  const { profile, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        if (profile.hasCompletedOnboarding) {
          router.replace('/(tabs)');
        } else {
          router.replace('/onboarding/welcome');
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isLoading, profile.hasCompletedOnboarding, router]);

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#EC4899" />
    </View>
  );
}
