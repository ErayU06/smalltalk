import { StyleSheet, View } from 'react-native';

import { TabScreen } from '@/components/tab-screen';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WeeklyChart } from '@/components/weekly-chart';
import { Spacing } from '@/constants/theme';
import { progress } from '@/data/progress';
import { getScenario } from '@/data/scenarios';

export default function ProgressScreen() {
  const weekTotal = progress.week.reduce((sum, d) => sum + d.minutes, 0);

  return (
    <TabScreen title="İlerleme">
      <View style={styles.tiles}>
        <StatTile value={`${progress.streakDays}`} label="Günlük seri" />
        <StatTile value={`${weekTotal}`} label="Bu hafta (dk)" />
        <StatTile value={`${progress.sessionsCompleted}`} label="Tamamlanan" />
      </View>

      <ThemedView type="backgroundElement" style={styles.card}>
        <ThemedText type="smallBold">Bu hafta pratik süresi (dakika)</ThemedText>
        <WeeklyChart week={progress.week} />
      </ThemedView>

      <View style={styles.section}>
        <ThemedText type="smallBold" themeColor="textSecondary">
          SON PRATİKLER
        </ThemedText>
        <ThemedView type="backgroundElement" style={styles.card}>
          {progress.recent.map((session) => (
            <View key={`${session.scenarioId}-${session.when}`} style={styles.recentRow}>
              <View style={styles.recentText}>
                <ThemedText>{getScenario(session.scenarioId)?.title}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {session.when}
                </ThemedText>
              </View>
              <ThemedText type="smallBold">{session.score} puan</ThemedText>
            </View>
          ))}
        </ThemedView>
      </View>
    </TabScreen>
  );
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <ThemedView type="backgroundElement" style={styles.tile}>
      <ThemedText type="subtitle">{value}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  tiles: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  tile: {
    flex: 1,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  card: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.three,
  },
  section: {
    gap: Spacing.two,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentText: {
    flex: 1,
  },
});
