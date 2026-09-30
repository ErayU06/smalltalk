import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mascot } from '@/components/illustrations/Mascot';
import { Icon } from '@/components/ui/Icon';
import { Card } from '@/components/ui/Primitives';
import { getProfile, getTodayMinutes, type Profile } from '@/features/progress/db';
import { useTheme } from '@/theme/useTheme';

/** İlk sürüm: seri, XP ve bugünkü dakika. Haftalık grafik sonraki adım. */
export default function ProgressTab() {
  const { c, type } = useTheme();
  const insets = useSafeAreaInsets();
  const [p, setP] = useState<Profile | null>(null);
  const [m, setM] = useState(0);
  useFocusEffect(useCallback(() => { getProfile().then(setP); getTodayMinutes().then(setM); }, []));

  const tiles = [
    { icon: 'flame' as const, bg: c.primarySoft, fg: c.primary, value: `${p?.streak ?? 0} gün`, label: 'Seri' },
    { icon: 'bolt' as const, bg: c.secondarySoft, fg: c.onSecondarySoft, value: `${p?.total_xp ?? 0}`, label: 'Toplam XP' },
    { icon: 'timer' as const, bg: c.tertiarySoft, fg: c.tertiary, value: `${m} dk`, label: 'Bugün' },
  ];
  return (
    <ScrollView style={{ backgroundColor: c.bg }} contentContainerStyle={{ padding: 20, paddingTop: insets.top + 12, gap: 20 }}>
      <Text style={[type.headlineXl, { color: c.text }]} accessibilityRole="header">İlerlemem</Text>
      <View style={styles.grid}>
        {tiles.map((t) => (
          <Card key={t.label} style={styles.tile} padding={12}>
            <View style={[styles.icon, { backgroundColor: t.bg }]}><Icon name={t.icon} size={20} color={t.fg} strokeWidth={2.2} /></View>
            <Text style={[type.headlineLg, { color: c.text }]}>{t.value}</Text>
            <Text style={[type.caption, { color: c.textMuted }]}>{t.label}</Text>
          </Card>
        ))}
      </View>
      <Card tone="low" style={styles.soon}>
        <Mascot mood="happy" size={56} />
        <Text style={[type.body, { color: c.textMuted, flex: 1 }]}>Haftalık özet ve tekrar kuyruğun yakında burada.</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', gap: 8 },
  tile: { flex: 1, alignItems: 'center', gap: 4 },
  icon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  soon: { flexDirection: 'row', alignItems: 'center', gap: 12 },
});
