import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/plus-jakarta-sans';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { getDb } from '@/features/progress/db';
import { useTheme } from '@/theme/useTheme';

// Adresle doğrudan açılan ekranların (ör. web'de /lesson/… yenilendiğinde) altında sekmeler olsun,
// böylece geri dönülecek bir yer hep bulunur.
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const { c, scheme } = useTheme();
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  useEffect(() => {
    getDb(); // şema ve göçler ilk açılışta
  }, []);

  if (!fontsLoaded) return null; // splash ekranı açık kalır

  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: c.bg } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
        <Stack.Screen name="lesson/[id]" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="lesson/complete" options={{ presentation: 'fullScreenModal', gestureEnabled: false }} />
        <Stack.Screen name="paywall" options={{ presentation: 'modal' }} />
      </Stack>
    </>
  );
}
