import { router } from 'expo-router';
import { ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScenarioCard } from '@/components/home/ScenarioCard';
import { scenarios } from '@/data/scenarios';
import { useTheme } from '@/theme/useTheme';

export default function ScenariosTab() {
  const { c, type } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={{ backgroundColor: c.bg }} contentContainerStyle={{ padding: 20, paddingTop: insets.top + 12, gap: 16 }}>
      <Text style={[type.headlineXl, { color: c.text }]} accessibilityRole="header">Senaryolar</Text>
      {scenarios.map((s) => (
        <ScenarioCard
          key={s.id}
          scenario={s}
          variant={s.isPremium ? 'locked' : 'compact'}
          onPress={() => (s.isPremium ? router.push('/paywall') : router.push({ pathname: '/lesson/[id]', params: { id: s.id } }))}
        />
      ))}
    </ScrollView>
  );
}
