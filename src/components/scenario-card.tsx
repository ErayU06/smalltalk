import { Link } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import type { Scenario } from '@/data/scenarios';
import { useTheme } from '@/hooks/use-theme';

export function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const theme = useTheme();

  return (
    <Link href={{ pathname: '/practice/[id]', params: { id: scenario.id } }} asChild>
      <Pressable
        accessibilityLabel={`${scenario.title}, ${scenario.level}, ${scenario.minutes} dakika`}
        style={({ pressed }) => pressed && styles.pressed}>
        <ThemedView type="backgroundElement" style={styles.card}>
          <View style={[styles.iconWrap, { backgroundColor: theme.accentSoft }]}>
            <SymbolView name={scenario.icon} tintColor={theme.accent} size={22} />
          </View>
          <View style={styles.body}>
            <ThemedText type="smallBold">{scenario.title}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
              {scenario.description}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {scenario.level} · {scenario.minutes} dk
            </ThemedText>
          </View>
          <SymbolView
            name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            tintColor={theme.textSecondary}
            size={14}
          />
        </ThemedView>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: Spacing.half,
  },
  pressed: {
    opacity: 0.7,
  },
});
