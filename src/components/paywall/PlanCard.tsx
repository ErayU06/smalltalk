import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Plan } from '../../features/paywall/paywallConfig';
import { useTheme, type Theme } from '../../theme/useTheme';
import { Icon } from '../ui/Icon';

type Props = { plan: Plan; selected: boolean; onSelect: () => void };

/** Stitch plan kartı. Seçili: beyaz + mercan çerçeve + parlama. Pasif: lavanta zemin. */
export function PlanCard({ plan, selected, onSelect }: Props) {
  const t = useTheme();
  const s = styles(t);
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={`${plan.title}, ayda ${plan.pricePerMonth}. ${plan.note}${plan.trialDays ? `. ${plan.trialDays} gün ücretsiz` : ''}`}
      onPress={() => {
        if (!selected) Haptics.selectionAsync();
        onSelect();
      }}
      style={({ pressed }) => [s.card, selected ? s.on : s.off, { transform: [{ scale: pressed ? 0.99 : 1 }] }]}
    >
      {plan.badge ? (
        <LinearGradient colors={[t.c.buttonGradient[0], '#A85F00']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.badge}>
          <Icon name="flame" size={12} color="#FFFFFF" />
          <Text style={s.badgeText}>{plan.badge.toLocaleUpperCase('tr-TR')}</Text>
        </LinearGradient>
      ) : null}

      <View style={[s.radio, selected && s.radioOn]}><View style={s.radioDot} /></View>

      <View style={s.body}>
        <View style={s.titleRow}>
          <Text style={s.title}>{plan.title}</Text>
          {plan.trialDays ? <View style={s.trial}><Text style={s.trialText}>{plan.trialDays} Gün Ücretsiz</Text></View> : null}
        </View>
        <Text style={s.note}>{plan.note}</Text>
      </View>

      <View style={s.priceCol}>
        <Text style={[s.price, selected && { color: t.c.primary }]}>{plan.pricePerMonth}</Text>
        <Text style={s.per}>/ ay</Text>
      </View>
    </Pressable>
  );
}

const styles = ({ c, radius, type, fonts, elevation }: Theme) =>
  StyleSheet.create({
    card: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: radius.md, paddingHorizontal: 16, paddingVertical: 18, borderWidth: 2 },
    on: { backgroundColor: c.surface, borderColor: c.brand, shadowColor: c.buttonGlow, ...elevation.raised, shadowOpacity: 0.3 },
    off: { backgroundColor: c.surfaceContainer, borderColor: 'transparent' },
    badge: { position: 'absolute', top: -12, right: 16, flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 3 },
    badgeText: { fontFamily: fonts.bold, fontSize: 11, letterSpacing: 0.3, color: '#FFFFFF' },
    radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: c.surfaceHighest, backgroundColor: c.surface, alignItems: 'center', justifyContent: 'center' },
    radioOn: { borderColor: c.buttonGradient[0], backgroundColor: c.buttonGradient[0] },
    radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: c.surface },
    body: { flex: 1, gap: 3 },
    titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
    title: { ...type.labelLg, color: c.text },
    trial: { backgroundColor: c.primarySoft, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
    trialText: { fontFamily: fonts.bold, fontSize: 12, color: c.onPrimarySoft },
    note: { ...type.caption, color: c.textMuted },
    priceCol: { alignItems: 'flex-end' },
    price: { ...type.headlineLg, color: c.text },
    per: { ...type.caption, color: c.textMuted },
  });
