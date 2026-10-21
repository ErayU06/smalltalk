import { router } from 'expo-router';
import { ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Primitives';
import { useTheme } from '@/theme/useTheme';

export default function ProfileTab() {
  const { c, type } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={{ backgroundColor: c.bg }} contentContainerStyle={{ padding: 20, paddingTop: insets.top + 12, gap: 16 }}>
      <Text style={[type.headlineXl, { color: c.text }]} accessibilityRole="header">Profil</Text>
      <Card style={{ gap: 12 }}>
        <Text style={[type.labelLg, { color: c.text }]}>Tercihlerin</Text>
        <Text style={[type.body, { color: c.textMuted }]}>Dil, günlük hedef ve ilgi alanlarını yeniden seçebilirsin.</Text>
        <Button label="Tercihleri düzenle" variant="soft" shape="rounded" icon="tune" onPress={() => router.push('/onboarding')} />
      </Card>
      <Button label="Talkwell Pro" icon="sparkle" onPress={() => router.push('/paywall')} />
    </ScrollView>
  );
}
