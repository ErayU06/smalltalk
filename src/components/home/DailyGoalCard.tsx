import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '../../theme/useTheme';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { Card, Pill } from '../ui/Primitives';

export function GoalRing({ done, goal, size = 64 }: { done: number; goal: number; size?: number }) {
  const { c, fonts } = useTheme();
  const r = 18;
  const circ = 2 * Math.PI * r;
  const p = Math.min(1, goal ? done / goal : 0);
  return (
    <View style={{ width: size, height: size }} accessible accessibilityLabel={`Bugün ${done} / ${goal} dakika`}>
      <Svg width={size} height={size} viewBox="0 0 44 44">
        <Circle cx="22" cy="22" r={r} fill="none" stroke={c.surfaceContainer} strokeWidth={3.5} />
        <Circle cx="22" cy="22" r={r} fill="none" stroke={c.brand} strokeWidth={3.5} strokeLinecap="round"
          strokeDasharray={`${circ}`} strokeDashoffset={circ * (1 - p)} transform="rotate(-90 22 22)" />
      </Svg>
      <View style={[StyleSheet.absoluteFill, styles.center]}>
        <Text style={{ fontFamily: fonts.extrabold, fontSize: 13, color: c.text }}>{Math.min(done, goal)}/{goal}</Text>
        <Text style={{ fontFamily: fonts.medium, fontSize: 10, color: c.textMuted }}>dk</Text>
      </View>
    </View>
  );
}

type Props = { doneMinutes: number; goalMinutes: number; focus: string; sceneCount: number; onStart: () => void };

/** Stitch "Günün Güvenli Provası" kartı. */
export function DailyGoalCard({ doneMinutes, goalMinutes, focus, sceneCount, onStart }: Props) {
  const { c, type, radius } = useTheme();
  const finished = doneMinutes >= goalMinutes;
  return (
    <Card padding={24} style={{ gap: 16, overflow: 'hidden' }}>
      <View style={[styles.blob, { right: -48, top: -48, backgroundColor: c.primarySoft }]} />
      <View style={[styles.blob, { left: -40, bottom: -40, width: 140, height: 140, backgroundColor: c.tertiarySoft }]} />
      <View style={styles.row}>
        <View style={{ flex: 1, gap: 6 }}>
          <Pill tone="brand" icon="heart" iconColor={c.primary} size="sm" label="Baskısız Alan" />
          <Text style={[type.headlineLg, { color: c.text, fontFamily: type.headlineXl.fontFamily }]} accessibilityRole="header">
            {finished ? 'Bugünkü hedef tamam!' : 'Günün Güvenli Provası'}
          </Text>
          <Text style={[type.body, { color: c.textMuted }]}>
            {finished ? 'İstersen bir sahne daha. Baskı yok.' : `Günde sadece ${goalMinutes} dakikayla konuşma korkunu adım adım yen.`}
          </Text>
        </View>
        <GoalRing done={doneMinutes} goal={goalMinutes} />
      </View>
      <View style={[styles.focus, { backgroundColor: c.surfaceLow, borderRadius: radius.md }]}>
        <View style={styles.focusLeft}>
          <View style={[styles.focusIcon, { backgroundColor: c.primaryTint }]}><Icon name="mic" size={18} color={c.primary} /></View>
          <Text style={[type.label, { color: c.text, flexShrink: 1 }]}>Bugünkü odak: {focus}</Text>
        </View>
        <Text style={[type.caption, { color: c.textMuted }]}>{sceneCount} sahne</Text>
      </View>
      <Button label="Pratiğe Başla" iconRight="arrowRight" shape="rounded" onPress={onStart} />
    </Card>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  blob: { position: 'absolute', width: 176, height: 176, borderRadius: 88, opacity: 0.5 },
  focus: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8, paddingHorizontal: 14, gap: 8 },
  focusLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 1 },
  focusIcon: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
});
