import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ProgressBar } from '@/components/progress-bar';
import { ScenarioCard } from '@/components/scenario-card';
import { TabScreen } from '@/components/tab-screen';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { profile, progress } from '@/data/progress';
import { Levels, scenarios, type Level } from '@/data/scenarios';
import { useTheme } from '@/hooks/use-theme';

type Filter = Level | 'Tümü';

export default function PracticeScreen() {
  const theme = useTheme();
  const [filter, setFilter] = useState<Filter>('Tümü');
  const visible = filter === 'Tümü' ? scenarios : scenarios.filter((s) => s.level === filter);

  return (
    <TabScreen title="Pratik" subtitle={`Merhaba ${profile.name}, bugün ne konuşalım?`}>
      <ThemedView type="backgroundElement" style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <View style={styles.goalText}>
            <ThemedText type="smallBold">Günlük hedef</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {progress.todayMinutes} / {profile.dailyGoalMinutes} dakika
            </ThemedText>
          </View>
          <View style={styles.streak} accessibilityLabel={`${progress.streakDays} günlük seri`}>
            <SymbolView
              name={{
                ios: 'flame.fill',
                android: 'local_fire_department',
                web: 'local_fire_department',
              }}
              tintColor={theme.warning}
              size={18}
            />
            <ThemedText type="smallBold">{progress.streakDays} gün</ThemedText>
          </View>
        </View>
        <ProgressBar
          value={progress.todayMinutes / profile.dailyGoalMinutes}
          label="Günlük hedef ilerlemesi"
        />
      </ThemedView>

      <View style={styles.section}>
        <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
          SENARYOLAR
        </ThemedText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}>
          {(['Tümü', ...Levels] as Filter[]).map((option) => {
            const selected = option === filter;
            return (
              <Pressable
                key={option}
                onPress={() => setFilter(option)}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                style={[
                  styles.chip,
                  { backgroundColor: selected ? theme.accent : theme.backgroundElement },
                ]}>
                <ThemedText
                  type="small"
                  style={{ color: selected ? theme.onAccent : theme.text }}>
                  {option}
                </ThemedText>
              </Pressable>
            );
          })}
        </ScrollView>
        {visible.map((scenario) => (
          <ScenarioCard key={scenario.id} scenario={scenario} />
        ))}
      </View>
    </TabScreen>
  );
}

const styles = StyleSheet.create({
  goalCard: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.three,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalText: {
    flex: 1,
  },
  streak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  section: {
    gap: Spacing.two,
  },
  sectionTitle: {
    letterSpacing: 0.5,
  },
  chips: {
    gap: Spacing.two,
    paddingBottom: Spacing.one,
  },
  chip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 999,
  },
});
