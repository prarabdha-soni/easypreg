import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { UserProvider } from '@/contexts/UserContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding/user-details" />
        <Stack.Screen name="onboarding/cycle-setup" />
        <Stack.Screen name="onboarding/preferences" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="log/period" />
        <Stack.Screen name="log/symptoms" />
        <Stack.Screen name="log/partner" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </UserProvider>
  );
}
