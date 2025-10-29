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
        <Stack.Screen name="onboarding/period-date" />
        <Stack.Screen name="onboarding/user-details" />
        <Stack.Screen name="onboarding/cycle-setup" />
        <Stack.Screen name="onboarding/preferences" />
        <Stack.Screen name="onboarding/welcome" />
        <Stack.Screen name="onboarding/age" />
        <Stack.Screen name="onboarding/condition" />
        <Stack.Screen name="onboarding/stage" />
        <Stack.Screen name="onboarding/symptoms" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="log/period" />
        <Stack.Screen name="log/symptoms" />
        <Stack.Screen name="log/partner" />
        <Stack.Screen name="log/flow-mood" />
        <Stack.Screen name="symptoms/tracker" />
        <Stack.Screen name="treatment/hrt" />
        <Stack.Screen name="treatment/pcos" />
        <Stack.Screen name="telehealth/providers" />
        <Stack.Screen name="telehealth/booking" />
        <Stack.Screen name="telehealth/appointment" />
        <Stack.Screen name="expert/ask-question" />
        <Stack.Screen name="expert/care-plan" />
        <Stack.Screen name="expert/lab-results" />
        <Stack.Screen name="expert/advice" />
        <Stack.Screen name="education/hrt" />
        <Stack.Screen name="education/lifestyle" />
        <Stack.Screen name="education/sleep" />
        <Stack.Screen name="education/pcos-diet" />
        <Stack.Screen name="education/pcos-exercise" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </UserProvider>
  );
}
