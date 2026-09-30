import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScenarioCard } from '@/components/home/ScenarioCard';
import { learningLang } from '@/data/availability';
import { getScenarios } from '@/data/scenarios';
import { openScenario } from '@/features/lesson/open';
import { getPrefs } from '@/features/progress/db';
import { useTheme } from '@/theme/useTheme';

export default function ScenariosTab() {
  const { c, type } = useTheme();
  const insets = useSafeAreaInsets();
  const [target, setTarget] = useState<string | null>(null);
  useFocusEffect(useCallback(() => { getPrefs().then((p) => setTarget(p.targetLang)); }, []));
  const scenarios = getScenarios(learningLang(target));

  return (
    <ScrollView style={{ backgroundColor: c.bg }} contentContainerStyle={{ padding: 20, paddingTop: insets.top + 12, gap: 16 }}>
      <Text style={[type.headlineXl, { color: c.text }]} accessibilityRole="header">Senaryolar</Text>
      {scenarios.map((s) => (
        <ScenarioCard key={s.id} scenario={s} variant={s.isPremium ? 'locked' : 'compact'} onPress={() => openScenario(s)} />
      ))}
    </ScrollView>
  );
}
