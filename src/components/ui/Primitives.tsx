import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Icon, type IconName } from './Icon';

/* ───────────── Card: Stitch "rounded-3xl + yumuşak gölge" ───────────── */
export function Card({ children, tone = 'surface', padding = 16, style }: {
  children: ReactNode; tone?: 'surface' | 'low' | 'container'; padding?: number; style?: StyleProp<ViewStyle>;
}) {
  const { c, radius, elevation } = useTheme();
  const bg = tone === 'surface' ? c.surface : tone === 'low' ? c.surfaceLow : c.surfaceContainer;
  return (
    <View style={[{ backgroundColor: bg, borderRadius: radius.lg, padding }, tone === 'surface' && { shadowColor: c.shadow, ...elevation.card }, style]}>
      {children}
    </View>
  );
}

/* ───────────── Pill: rozet / etiket ───────────── */
export type PillTone = 'brand' | 'tertiary' | 'secondary' | 'neutral' | 'success' | 'solidTertiary';
export function Pill({ label, tone = 'neutral', icon, iconColor, size = 'md' }: {
  label: string; tone?: PillTone; icon?: IconName; iconColor?: string; size?: 'md' | 'sm';
}) {
  const { c, fonts } = useTheme();
  const map = {
    brand: { bg: c.primarySoft, fg: c.onPrimarySoft },
    tertiary: { bg: c.tertiarySoft, fg: c.onTertiarySoft },
    secondary: { bg: c.secondarySoft, fg: c.onSecondarySoft },
    neutral: { bg: c.surfaceHigh, fg: c.text },
    success: { bg: c.successSoft, fg: c.success },
    solidTertiary: { bg: c.tertiary, fg: c.surface },
  }[tone];
  return (
    <View style={[styles.pill, { backgroundColor: map.bg, paddingVertical: size === 'md' ? 5 : 2, paddingHorizontal: size === 'md' ? 10 : 8 }]}>
      {icon ? <Icon name={icon} size={size === 'md' ? 16 : 12} color={iconColor ?? map.fg} /> : null}
      <Text style={{ fontFamily: fonts.bold, fontSize: size === 'md' ? 13 : 11, color: map.fg }}>{label}</Text>
    </View>
  );
}

/* ───────────── StatPill: seri (kehribar) ve XP (mavi) ───────────── */
export function StatPill({ kind, value }: { kind: 'streak' | 'xp'; value: string }) {
  const { c } = useTheme();
  return kind === 'streak' ? (
    <View accessible accessibilityLabel={`Seri: ${value}`}><Pill tone="tertiary" icon="flame" iconColor={c.tertiary} label={value} /></View>
  ) : (
    <View accessible accessibilityLabel={`${value}`}><Pill tone="secondary" icon="bolt" iconColor={c.secondary} label={value} /></View>
  );
}

/* ───────────── ProgressBar: Stitch'in iç boşluklu parça çubuğu ───────────── */
export function ProgressBar({ value, height = 12, color }: { value: number; height?: number; color?: string }) {
  const { c } = useTheme();
  const v = Math.max(0, Math.min(1, value));
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(v * 100) }}
      style={{ height, borderRadius: height / 2, backgroundColor: c.surfaceHighest, padding: 2 }}
    >
      <View style={{ width: `${v * 100}%`, flex: 1, borderRadius: height / 2, backgroundColor: color ?? c.brand }} />
    </View>
  );
}

/* ───────────── StepDots: onboarding göstergesi (aktif adım 40px, diğerleri 24px) ───────────── */
export function StepDots({ total, current }: { total: number; current: number }) {
  const { c } = useTheme();
  return (
    <View accessible accessibilityLabel={`${total} adımdan ${current}. adım`} style={styles.row6}>
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1;
        return <View key={n} style={{ width: n === current ? 40 : 24, height: 8, borderRadius: 4, backgroundColor: n <= current ? c.brand : c.surfaceHigh }} />;
      })}
    </View>
  );
}

/* ───────────── IconButton ───────────── */
export function IconButton({ icon, label, onPress, tone = 'neutral', size = 40 }: {
  icon: IconName; label: string; onPress?: () => void; tone?: 'neutral' | 'surface' | 'low' | 'outline'; size?: number;
}) {
  const { c, elevation } = useTheme();
  const bg = tone === 'neutral' ? c.surfaceHigh : tone === 'surface' || tone === 'outline' ? c.surface : c.surfaceLow;
  const fg = tone === 'neutral' || tone === 'outline' ? c.text : c.primary;
  return (
    <Pressable
      accessibilityRole="button" accessibilityLabel={label} onPress={onPress} hitSlop={Math.max(0, (44 - size) / 2)}
      style={({ pressed }) => [
        { width: size, height: size, borderRadius: size / 2, backgroundColor: bg, alignItems: 'center', justifyContent: 'center', transform: [{ scale: pressed ? 0.94 : 1 }] },
        tone === 'outline' && { borderWidth: 1, borderColor: c.outline, shadowColor: c.shadow, ...elevation.card, shadowOpacity: 0.04 },
      ]}
    >
      <Icon name={icon} size={size * 0.5} color={fg} />
    </Pressable>
  );
}

/* ───────────── SelectCard: sol mercan şeritli seçim kartı (Stitch hedef kartları) ───────────── */
export function SelectCard({ selected, onPress, title, tag, description, icon, multi = false }: {
  selected: boolean; onPress: () => void; title: string; tag?: string; description?: string; icon?: IconName; multi?: boolean;
}) {
  const { c, radius, type, elevation } = useTheme();
  return (
    <Pressable
      accessibilityRole={multi ? 'checkbox' : 'radio'}
      accessibilityState={multi ? { checked: selected } : { selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.select,
        { backgroundColor: c.surface, borderRadius: radius.md, shadowColor: c.shadow, transform: [{ scale: pressed ? 0.99 : 1 }] },
        selected ? elevation.raised : elevation.card,
      ]}
    >
      {selected ? <View style={[styles.accent, { backgroundColor: c.brand }]} /> : null}
      <View style={{ flexDirection: 'row', gap: 10, flex: 1, alignItems: description ? 'flex-start' : 'center' }}>
        {icon ? (
          <View style={[styles.selectIcon, { backgroundColor: selected ? c.primarySoft : c.surfaceHigh }]}>
            <Icon name={icon} size={22} color={selected ? c.primary : c.textMuted} fill={selected ? c.primary : c.textMuted} />
          </View>
        ) : null}
        <View style={{ flex: 1, gap: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <Text style={[type.labelLg, { color: c.text }]}>{title}</Text>
            {tag ? <Pill tone={selected ? 'brand' : 'neutral'} size="sm" label={tag} /> : null}
          </View>
          {description ? <Text style={[type.body, { color: c.textMuted, fontSize: 14 }]}>{description}</Text> : null}
        </View>
      </View>
      <View style={[styles.checkDot, { backgroundColor: selected ? c.buttonGradient[0] : c.surfaceContainer }]}>
        {selected ? <Icon name="check" size={15} color={c.onButton} strokeWidth={3.2} /> : null}
      </View>
    </Pressable>
  );
}

/* ───────────── Chip: kelime bankası / dil seçimi ───────────── */
export function Chip({ label, onPress, selected, icon }: { label: string; onPress?: () => void; selected?: boolean; icon?: IconName }) {
  const { c, fonts } = useTheme();
  return (
    <Pressable
      accessibilityRole="button" accessibilityState={{ selected: !!selected }} onPress={onPress}
      style={({ pressed }) => [styles.chip, {
        backgroundColor: selected ? c.primarySoft : c.surfaceHigh,
        borderWidth: selected ? 2 : 0, borderColor: c.brand, transform: [{ scale: pressed ? 0.95 : 1 }],
      }]}
    >
      {icon ? <Icon name={icon} size={16} color={c.primary} strokeWidth={2.6} /> : null}
      <Text style={{ fontFamily: selected ? fonts.bold : fonts.semibold, fontSize: 14, color: selected ? c.onPrimarySoft : c.text }}>{label}</Text>
    </Pressable>
  );
}

/* ───────────── SoftNote: kalpli motivasyon kutusu ───────────── */
export function SoftNote({ title, text, tone = 'low' }: { title?: string; text: string; tone?: 'low' | 'tint' }) {
  const { c, type, radius } = useTheme();
  return (
    <View style={[styles.note, { backgroundColor: tone === 'low' ? c.surfaceLow : c.primaryTint, borderRadius: radius.md }]}>
      <View style={[styles.noteIcon, { backgroundColor: c.primarySoft }]}>
        <Icon name="heart" size={20} color={c.primary} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        {title ? <Text style={[type.label, { color: c.text, fontFamily: type.labelLg.fontFamily }]}>{title}</Text> : null}
        <Text style={[type.caption, { color: title ? c.textMuted : c.text }]}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: 999, alignSelf: 'flex-start' },
  row6: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  select: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 14, paddingLeft: 18, paddingRight: 14, overflow: 'hidden' },
  accent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 6 },
  selectIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  checkDot: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 5, minHeight: 44, paddingHorizontal: 14, borderRadius: 999 },
  note: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 },
  noteIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
});
