import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { UserProvider } from '@/contexts/UserContext';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <UserProvider>
      <SubscriptionProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding/period-date" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="sleep/index" />
          <Stack.Screen name="yoga/index" />
          <Stack.Screen name="dance/index" />
          <Stack.Screen name="beauty/index" />
          <Stack.Screen name="nutrition/index" />
          <Stack.Screen name="profile/index" />
          <Stack.Screen name="tracking/index" />
          <Stack.Screen name="insights/index" />
          <Stack.Screen name="premium/index" />
          <Stack.Screen name="community/index" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </SubscriptionProvider>
    </UserProvider>
  );
}
