import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { Scenario } from '../../types/scenario';
import { Scene } from '../illustrations/Scene';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { Card, Pill } from '../ui/Primitives';

type Props = { scenario: Scenario; bonusXp: number; done: boolean; onAccept: () => void };

/** Günün Meydan Okuması: herkese aynı gün aynı sahne, bir kez bonus XP. */
export function ChallengeCard({ scenario: s, bonusXp, done, onAccept }: Props) {
  const { c, type, radius } = useTheme();
  return (
    <Card style={{ gap: 12 }}>
      <View style={styles.between}>
        <Pill tone="tertiary" icon="target" iconColor={c.tertiary} label="Günün Meydan Okuması" size="sm" />
        {done ? <Pill tone="success" icon="check" label="Tamamlandı" size="sm" /> : <Pill tone="brand" icon="bolt" label={`+${bonusXp} XP bonus`} size="sm" />}
      </View>
      <View style={styles.row}>
        <View style={{ borderRadius: radius.md, overflow: 'hidden' }}><Scene setting={s.setting} width={72} height={72} /></View>
        <View style={{ flex: 1, gap: 4, minWidth: 0 }}>
          <Text style={[type.labelLg, { color: c.text }]} numberOfLines={2}>{s.title}</Text>
          <View style={styles.row6}>
            <Icon name="clock" size={14} color={c.textMuted} />
            <Text style={[type.caption, { color: c.textMuted }]}>{s.level} · {s.minutes} dk · {s.npc.name}</Text>
          </View>
        </View>
      </View>
      {done ? (
        <Text style={[type.caption, { color: c.textMuted }]}>Bugünkü meydan okumayı bitirdin. Yarın yeni bir sahne seni bekliyor.</Text>
      ) : (
        <Button label="Meydan okumayı kabul et" size="sm" shape="rounded" iconRight="arrowRight" onPress={onAccept} />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  row6: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
