import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View, type ImageSourcePropType } from 'react-native';
import type { Scenario } from '../../types/scenario';
import { useTheme } from '../../theme/useTheme';
import { Scene } from '../illustrations/Scene';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { Card, Pill, ProgressBar } from '../ui/Primitives';

type Variant = 'feature' | 'compact' | 'progress' | 'locked';

type Props = {
  scenario: Scenario;
  variant: Variant;
  /** 0..1, variant="progress" için */
  progress?: number;
  onPress: () => void;
  /** Stitch'ten kendi görselini eklersen (require('…png')) çizim yerine kullanılır */
  image?: ImageSourcePropType;
};

const levelTone = { 'Başlangıç': 'brand', 'Orta': 'secondary', 'Akademik': 'tertiary', 'İleri': 'neutral' } as const;

/** Stitch senaryo kartları: feature (büyük görselli) · compact · progress (devam et) · locked (Pro). */
export function ScenarioCard({ scenario: s, variant, progress = 0, onPress, image }: Props) {
  const { c, type, radius } = useTheme();
  const { width } = useWindowDimensions();
  const thumb = (w: number, h: number, dimmed = false) =>
    image ? <Image source={image} style={{ width: w, height: h, opacity: dimmed ? 0.5 : 1 }} resizeMode="cover" /> : <Scene setting={s.setting} width={w} height={h} dimmed={dimmed} />;

  if (variant === 'feature') {
    const w = width - 40 - 32;
    return (
      <Card style={{ gap: 10 }}>
        <View style={[styles.hero, { borderRadius: radius.md }]}>
          {thumb(w, 144)}
          <LinearGradient colors={['rgba(19,27,46,0)', 'rgba(19,27,46,0.6)']} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0.45 }} end={{ x: 0, y: 1 }} />
          <View style={[styles.placeTag, { backgroundColor: 'rgba(255,255,255,0.92)' }]}>
            <Text style={[type.caption, { color: '#855300', fontFamily: type.labelLg.fontFamily }]}>{s.placeLabel}</Text>
          </View>
          <View style={styles.time}>
            <Icon name="clock" size={15} color="#FFFFFF" />
            <Text style={[type.caption, { color: '#FFFFFF', fontFamily: type.label.fontFamily }]}>{s.level} · {s.minutes} dk</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 4, gap: 4 }}>
          <Text style={[type.labelLg, { fontSize: 17, lineHeight: 23, color: c.text }]}>{s.title}</Text>
          <Text style={[type.body, { color: c.textMuted }]} numberOfLines={2}>{s.description}</Text>
        </View>
        <View style={[styles.between, { paddingHorizontal: 4 }]}>
          <View style={styles.row4}><Icon name="smile" size={18} color={c.brand} /><Text style={[type.caption, { color: c.textMuted }]}>Sıfır Yargı Modu</Text></View>
          <Button label="Pratik Yap" size="sm" shape="rounded" iconRight="play" onPress={onPress} />
        </View>
      </Card>
    );
  }

  const locked = variant === 'locked';
  const body = (
    <View style={styles.row16}>
      <View style={[styles.thumb, { borderRadius: radius.md, backgroundColor: c.surfaceHighest }]}>
        {thumb(96, 96, locked)}
        {locked ? <View style={[StyleSheet.absoluteFill, styles.lockCover]}><Icon name="lock" size={28} color={c.tertiarySoft} /></View> : null}
      </View>
      <View style={{ flex: 1, gap: 4, minWidth: 0 }}>
        <View style={styles.row6}>
          {locked ? <Pill tone="solidTertiary" icon="star" size="sm" label="PRO" /> : <Pill tone={levelTone[s.level]} size="sm" label={`${s.level} · ${s.minutes} dk`} />}
          <Text style={[type.caption, { color: c.textMuted }]}>{s.placeLabel}</Text>
        </View>
        <Text style={[type.labelLg, { color: locked ? c.onSecondarySoft : c.text }]} numberOfLines={2}>{s.title}</Text>
        <Text style={[type.caption, { color: c.textMuted }]} numberOfLines={1}>{s.description}</Text>
        {variant === 'compact' ? (
          <View style={[styles.between, { marginTop: 4 }]}>
            <View style={styles.row4}><Icon name="mic" size={14} color={c.primary} /><Text style={[type.caption, { color: c.primary, fontFamily: type.label.fontFamily }]}>Sesli rol yapma</Text></View>
            {/* Tüm kart zaten buton; iç içe buton olmasın diye yalnızca görsel */}
            <View aria-hidden style={[styles.play, { backgroundColor: c.surfaceHigh }]}><Icon name="play" size={20} color={c.text} /></View>
          </View>
        ) : null}
      </View>
    </View>
  );

  return (
    <Card tone={locked ? 'low' : 'surface'} style={{ gap: 10 }}>
      {variant === 'compact' ? <Pressable accessibilityRole="button" accessibilityLabel={s.title} onPress={onPress}>{body}</Pressable> : body}
      {variant === 'progress' ? (
        <View style={[styles.between, styles.progressRow, { backgroundColor: c.surfaceLow, borderRadius: radius.md }]}>
          <View style={[styles.row8, { flex: 1, paddingLeft: 4 }]}>
            <View style={{ flex: 1 }}><ProgressBar value={progress} height={8} /></View>
            <Text style={[type.caption, { color: c.text, fontFamily: type.labelLg.fontFamily }]}>{Math.round(progress * s.steps.length)}/{s.steps.length}</Text>
          </View>
          <Button label="Devam Et" variant="soft" size="sm" shape="rounded" iconRight="chevronRight" onPress={onPress} />
        </View>
      ) : null}
      {locked ? (
        <Button label="Pro ile Kilidi Aç" size="sm" shape="rounded" icon="lockOpen" variant="soft" onPress={onPress} style={{ backgroundColor: c.tertiarySoft, borderRadius: radius.md }} />
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  hero: { height: 144, overflow: 'hidden' },
  placeTag: { position: 'absolute', top: 8, left: 8, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999 },
  time: { position: 'absolute', bottom: 8, left: 10, flexDirection: 'row', alignItems: 'center', gap: 5 },
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  row4: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  row6: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  row8: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  row16: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  thumb: { width: 96, height: 96, overflow: 'hidden' },
  play: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  lockCover: { backgroundColor: 'rgba(19,27,46,0.2)', alignItems: 'center', justifyContent: 'center' },
  progressRow: { padding: 8, gap: 12 },
});
