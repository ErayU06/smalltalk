import { StyleSheet, Text, View } from 'react-native';
import type { Plan } from '../../features/paywall/paywallConfig';
import { useTheme, type Theme } from '../../theme/useTheme';
import { Button } from '../ui/Button';

type Props = {
  plan: Plan;
  loading?: boolean;
  bottomInset: number;
  onPurchase: () => void;
  onRestore: () => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
};

/** Ekranın altına sabit CTA. Fiyat bildirimi butonun hemen altında (mağaza kuralı). */
export function PaywallFooter({ plan, loading, bottomInset, onPurchase, onRestore, onOpenTerms, onOpenPrivacy }: Props) {
  const t = useTheme();
  const s = styles(t);
  return (
    <View style={[s.wrap, { paddingBottom: Math.max(bottomInset, 12) }]}>
      <Button label={plan.cta} icon="bolt" loading={loading} onPress={onPurchase} accessibilityHint={plan.disclosure} />
      <Text style={s.disclosure}>{plan.disclosure}</Text>
      <View style={s.links}>
        <Text style={s.link} onPress={onRestore} accessibilityRole="link">Satın alımı geri yükle</Text>
        <Text style={s.dot}>·</Text>
        <Text style={s.link} onPress={onOpenTerms} accessibilityRole="link">Koşullar</Text>
        <Text style={s.dot}>·</Text>
        <Text style={s.link} onPress={onOpenPrivacy} accessibilityRole="link">Gizlilik</Text>
      </View>
    </View>
  );
}

const styles = ({ c, type, fonts }: Theme) =>
  StyleSheet.create({
    wrap: { paddingHorizontal: 20, paddingTop: 14, gap: 6, backgroundColor: c.bg, shadowColor: c.shadow, shadowOpacity: 0.05, shadowRadius: 20, shadowOffset: { width: 0, height: -4 }, elevation: 8 },
    disclosure: { ...type.caption, color: c.textMuted, textAlign: 'center', marginTop: 4 },
    links: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 },
    link: { fontFamily: fonts.semibold, fontSize: 12, color: c.textMuted, textDecorationLine: 'underline', paddingVertical: 6 },
    dot: { color: c.textMuted, fontSize: 12 },
  });
