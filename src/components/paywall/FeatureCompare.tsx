import { StyleSheet, Text, View } from 'react-native';
import type { FeatureRow, ProTone } from '../../features/paywall/paywallConfig';
import { upperTR } from '../../theme/text';
import { useTheme, type Theme } from '../../theme/useTheme';
import { Icon } from '../ui/Icon';

export function FeatureCompare({ rows }: { rows: FeatureRow[] }) {
  const t = useTheme();
  const s = styles(t);
  const tone = (p: ProTone) =>
    ({
      coral: { bg: t.c.primarySoft, fg: t.c.onPrimarySoft, icon: t.c.brand },
      amber: { bg: t.c.tertiarySoft, fg: t.c.onTertiarySoft, icon: t.c.tertiary },
      calm: { bg: t.c.secondarySoft, fg: t.c.onSecondarySoft, icon: t.c.secondary },
      text: { bg: 'transparent', fg: t.c.primary, icon: t.c.primary },
    })[p];

  return (
    <View style={s.wrap}>
      <View style={s.header} aria-hidden>
        <Text style={[s.headerText, { flex: 1 }]}>{upperTR('Ayrıcalıklar')}</Text>
        <Text style={[s.headerText, s.col]}>{upperTR('Ücretsiz')}</Text>
        <View style={[s.col, s.proHead]}>
          <Text style={[s.headerText, { color: t.c.primary, fontFamily: t.fonts.bold }]}>{upperTR('Pro')}</Text>
          <Icon name="sparkle" size={13} color={t.c.tertiaryAccent} />
        </View>
      </View>

      {rows.map((r) => {
        const p = tone(r.proTone);
        return (
          <View key={r.id} style={s.card} accessible accessibilityLabel={`${r.title}. Ücretsiz: ${r.free === '—' ? 'yok' : r.free}. Pro: ${r.pro}.`}>
            <View style={s.titleRow}>
              <Icon name={r.icon} size={20} color={p.icon} />
              <Text style={s.title}>{r.title}</Text>
            </View>
            <View style={s.valueRow}>
              <Text style={s.free}>{r.free}</Text>
              <View style={[s.proTag, { backgroundColor: p.bg }, r.proTone === 'text' && { paddingHorizontal: 0 }]}>
                <Text style={[s.proTagLabel, { color: p.fg }, r.proTone === 'text' && { fontFamily: t.fonts.bold }]}>{r.pro}</Text>
              </View>
            </View>
            {r.detail ? <Text style={s.detail}>{r.detail}</Text> : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = ({ c, radius, type, fonts, elevation }: Theme) =>
  StyleSheet.create({
    wrap: { gap: 8 },
    header: { flexDirection: 'row', alignItems: 'center', gap: 24, paddingHorizontal: 4, paddingBottom: 4 },
    headerText: { ...type.overline, fontFamily: fonts.semibold, color: c.textMuted },
    col: { width: 64, textAlign: 'center' },
    proHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 },
    card: { backgroundColor: c.surface, borderRadius: radius.md, padding: 16, gap: 6, shadowColor: c.shadow, ...elevation.card },
    titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    title: { ...type.labelLg, color: c.text },
    valueRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
    free: { ...type.body, color: c.textMuted, flexShrink: 1 },
    proTag: { borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 3 },
    proTagLabel: { fontFamily: fonts.semibold, fontSize: 13 },
    detail: { ...type.caption, color: c.textMuted },
  });
