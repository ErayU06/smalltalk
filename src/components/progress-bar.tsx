import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

type Props = {
  /** 0–1; values outside the range are clamped. */
  value: number;
  label: string;
};

export function ProgressBar({ value, label }: Props) {
  const theme = useTheme();
  const clamped = Math.min(1, Math.max(0, value));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}
      style={[styles.track, { backgroundColor: theme.backgroundSelected }]}>
      <View
        style={[styles.fill, { width: `${clamped * 100}%`, backgroundColor: theme.accent }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
});
