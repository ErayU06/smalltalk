import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LANGUAGES, type Language } from '../../data/languages';
import { useTheme } from '../../theme/useTheme';
import { Flag } from '../ui/Flag';
import { Icon } from '../ui/Icon';

type Code = Language['code'];

/* ──────────────────────────────────────────────────────────────
 * Ana dil: bayraklı hap çipler, flex-wrap, 8px boşluk.
 * Seçili: 2px mercan çerçeve + açık mercan zemin + kalın metin + mercan onay işareti.
 * Seçili değil: 1px gri çerçeve + beyaz zemin.
 * ────────────────────────────────────────────────────────────── */
export function NativeLanguagePicker({ options, value, onChange }: { options: Code[]; value: Code | null; onChange: (c: Code) => void }) {
  const { c, fonts } = useTheme();
  return (
    <View accessibilityRole="radiogroup" accessibilityLabel="Ana dil seçimi" style={styles.wrap}>
      {options.map((code) => {
        const lang = LANGUAGES[code];
        const selected = value === code;
        return (
          <Pressable
            key={code}
            accessibilityRole="radio"
            aria-checked={selected}
            accessibilityLabel={lang.name}
            onPress={() => onChange(code)}
            style={({ pressed }) => [
              styles.chip,
              selected
                ? { borderWidth: 2, borderColor: c.brand, backgroundColor: c.brandTint, paddingHorizontal: 13, paddingVertical: 7 }
                : { borderWidth: 1, borderColor: c.outline, backgroundColor: c.surface },
              { transform: [{ scale: pressed && !selected ? 0.95 : 1 }] },
            ]}
          >
            <Flag code={lang.flag} width={20} />
            <Text style={{ fontFamily: selected ? fonts.bold : fonts.semibold, fontSize: 15, color: selected ? c.text : c.onSecondarySoft }}>{lang.name}</Text>
            {selected ? <Icon name="check" size={16} color={c.selectedCheck} strokeWidth={3} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Hedef dil: 2 sütunlu kart ızgarası, 10px boşluk, 16px köşe.
 * Kart: solda 36×36 kod kutusu, sağda ad + küçük bayrak ve dilin kendi adı.
 * Seçili: 2px mercan çerçeve, kod kutusu koyu lacivert/beyaz yazı, ad ekstra kalın.
 * `soon` listesindekiler görünür ama seçilemez ("Yakında"); `preview` olanlar seçilir, hazır senaryo sayısı yazar.
 * ────────────────────────────────────────────────────────────── */
export function TargetLanguagePicker({ options, value, onChange, soon = [], preview = {} }: {
  options: Code[]; value: Code | null; onChange: (c: Code) => void; soon?: Code[];
  /** Tam içerik gelmeden seçilebilen diller: dil → hazır senaryo sayısı */
  preview?: Partial<Record<Code, number>>;
}) {
  const { c, fonts, radius } = useTheme();
  return (
    <View accessibilityRole="radiogroup" accessibilityLabel="Pratik dili seçimi" style={styles.grid}>
      {options.map((code) => {
        const lang = LANGUAGES[code];
        const selected = value === code;
        const disabled = soon.includes(code);
        const previewCount = preview[code];
        return (
          <Pressable
            key={code}
            accessibilityRole="radio"
            aria-checked={selected} aria-disabled={disabled}
            accessibilityLabel={`${lang.name}, ${lang.endonym}${disabled ? ', yakında' : previewCount ? `, önizleme, ${previewCount} senaryo` : ''}`}
            disabled={disabled}
            onPress={() => onChange(code)}
            style={({ pressed }) => [
              styles.card,
              { borderRadius: radius.md, backgroundColor: c.surface, shadowColor: c.shadow },
              selected ? { borderWidth: 2, borderColor: c.brand, padding: 11 } : { borderWidth: 1, borderColor: c.outline, padding: 12 },
              { opacity: disabled ? 0.55 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
            ]}
          >
            <View style={[styles.code, { backgroundColor: selected ? c.text : c.surfaceLow }]}>
              <Text style={{ fontFamily: fonts.extrabold, fontSize: 12, letterSpacing: 0.8, color: selected ? c.bg : c.onSecondarySoft }}>{lang.badge}</Text>
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text numberOfLines={1} style={{ fontFamily: selected ? fonts.extrabold : fonts.bold, fontSize: 15, color: c.text }}>{lang.name}</Text>
              <View style={styles.sub}>
                <Flag code={lang.flag} width={14} />
                <Text numberOfLines={1} style={{ fontFamily: fonts.medium, fontSize: 12, color: c.textMuted, flexShrink: 1 }}>
                  {disabled ? 'Yakında' : previewCount ? `Önizleme · ${previewCount} senaryo` : lang.endonym}
                </Text>
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 44, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  card: {
    width: '48%', flexGrow: 1, flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 64,
    shadowOpacity: 0.04, shadowRadius: 6, shadowOffset: { width: 0, height: 1 }, elevation: 1,
  },
  code: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  sub: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
});
