import { router } from 'expo-router';
import { useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FeatureCompare } from '@/components/paywall/FeatureCompare';
import { PaywallFooter } from '@/components/paywall/PaywallFooter';
import { PaywallHero } from '@/components/paywall/PaywallHero';
import { PlanCard } from '@/components/paywall/PlanCard';
import { TestimonialCard } from '@/components/paywall/TestimonialCard';
import { Icon } from '@/components/ui/Icon';
import { IconButton, Pill } from '@/components/ui/Primitives';
import { features, plans, testimonial, type PlanId } from '@/features/paywall/paywallConfig';
import { useTheme } from '@/theme/useTheme';

/** Geliştirirken kartın düzenini görmek için; canlıda asla görünmez. */
const DEV_TESTIMONIAL = {
  quote: '[Beta kullanıcısından izinle alınmış gerçek yorum]',
  author: '[Ad S.]',
  meta: '[süre] Pro üyesi',
  rating: 5 as const,
};

export default function PaywallScreen() {
  const { c, type } = useTheme();
  const insets = useSafeAreaInsets();
  const [planId, setPlanId] = useState<PlanId>('yearly');
  const [loading, setLoading] = useState(false);
  const plan = plans.find((p) => p.id === planId)!;
  const review = testimonial ?? (__DEV__ ? DEV_TESTIMONIAL : null);

  const purchase = async () => {
    setLoading(true);
    try {
      // TODO: RevenueCat → Purchases.purchasePackage(offering[planId])
      router.back();
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: c.bg }]}>
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <IconButton icon="close" label="Kapat" tone="neutral" onPress={() => router.back()} />
        <Pill tone="tertiary" icon="award" iconColor={c.tertiary} label="Sıfır Baskı Provası" />
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <PaywallHero />
        <FeatureCompare rows={features} />
        <View style={styles.plans} accessibilityRole="radiogroup" accessibilityLabel="Plan seçimi">
          {plans.map((p) => <PlanCard key={p.id} plan={p} selected={p.id === planId} onSelect={() => setPlanId(p.id)} />)}
        </View>
        {review ? <TestimonialCard item={review} placeholder={!testimonial} /> : null}
        <View style={styles.trust}>
          <Icon name="shieldFilled" size={18} color={c.primary} />
          <Text style={[type.caption, { color: c.textMuted, flexShrink: 1, textAlign: 'center' }]}>İstediğin an tek dokunuşla iptal et. Taahhüt yok, gizli masraf yok.</Text>
        </View>
      </ScrollView>

      <PaywallFooter
        plan={plan}
        loading={loading}
        bottomInset={insets.bottom}
        onPurchase={purchase}
        onRestore={() => { /* TODO: Purchases.restorePurchases() */ }}
        onOpenTerms={() => Linking.openURL('https://example.com/terms')}
        onOpenPrivacy={() => Linking.openURL('https://example.com/privacy')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 8 },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24, gap: 24 },
  plans: { gap: 14, paddingTop: 8 },
  trust: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingHorizontal: 8 },
});
