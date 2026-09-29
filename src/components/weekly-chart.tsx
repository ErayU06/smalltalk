import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Day = { day: string; minutes: number };

const CHART_HEIGHT = 120;

/** Single-series bar chart of practice minutes; only today's bar carries a value label. */
export function WeeklyChart({ week }: { week: Day[] }) {
  const theme = useTheme();
  const max = Math.max(1, ...week.map((d) => d.minutes));
  const todayIndex = week.length - 1;

  return (
    <View style={styles.row}>
      {week.map((d, i) => {
        const isToday = i === todayIndex;
        return (
          <View
            key={d.day}
            style={styles.column}
            accessible
            accessibilityLabel={`${d.day}: ${d.minutes} dakika`}>
            <View style={styles.plot}>
              {isToday && (
                <ThemedText type="smallBold" style={styles.valueLabel}>
                  {d.minutes}
                </ThemedText>
              )}
              <View
                style={[
                  styles.bar,
                  {
                    height: Math.max(2, (d.minutes / max) * CHART_HEIGHT),
                    backgroundColor: isToday ? theme.accent : theme.backgroundSelected,
                  },
                ]}
              />
            </View>
            <ThemedText type="small" themeColor={isToday ? 'text' : 'textSecondary'}>
              {d.day}
            </ThemedText>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.one,
  },
  plot: {
    height: CHART_HEIGHT + 20,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  valueLabel: {
    marginBottom: Spacing.half,
  },
  bar: {
    width: '70%',
    maxWidth: 24,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
});
