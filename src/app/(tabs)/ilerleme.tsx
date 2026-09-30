import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mascot } from '@/components/illustrations/Mascot';
import { Icon } from '@/components/ui/Icon';
import { Card } from '@/components/ui/Primitives';
import { BADGES } from '@/features/engagement/badges';
import { getEarnedBadges, getProfile, getTodayMinutes, getWords, type Profile } from '@/features/progress/db';
import { upperTR } from '@/theme/text';
import { useTheme } from '@/theme/useTheme';

/** Seri, XP, bugünkü dakika · rozetler · kelime sandığı. Haftalık grafik sonraki adım (ROADMAP Faz 5). */
export default function ProgressTab() {
  const { c, type, radius } = useTheme();
  const insets = useSafeAreaInsets();
  const [p, setP] = useState<Profile | null>(null);
  const [m, setM] = useState(0);
  const [earned, setEarned] = useState<Set<string>>(new Set());
  const [wordCount, setWordCount] = useState(0);
  useFocusEffect(useCallback(() => {
    getProfile().then(setP);
    getTodayMinutes().then(setM);
    getEarnedBadges().then((b) => setEarned(new Set(b.map((x) => x.id))));
    getWords().then((w) => setWordCount(w.length));
  }, []));

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

      <Pressable accessibilityRole="button" onPress={() => router.push('/kelimeler')} style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.99 : 1 }] })}>
        <Card style={styles.chest}>
          <View style={[styles.icon, { backgroundColor: c.primarySoft, width: 48, height: 48, borderRadius: 24 }]}><Icon name="bookmark" size={22} color={c.primary} /></View>
          <View style={{ flex: 1 }}>
            <Text style={[type.labelLg, { color: c.text }]}>Kelime Sandığı</Text>
            <Text style={[type.caption, { color: c.textMuted }]}>{wordCount ? `${wordCount} kart · dokun, anlamına bak, dinle` : 'Derslerde öğrendiğin kalıplar burada birikir'}</Text>
          </View>
          <Icon name="chevronRight" size={20} color={c.textMuted} />
        </Card>
      </Pressable>

      <View style={{ gap: 10 }}>
        <View style={styles.between}>
          <Text style={[type.overline, { color: c.textMuted }]}>{upperTR('Rozetler')}</Text>
          <Text style={[type.caption, { color: c.textMuted }]}>{earned.size} / {BADGES.length}</Text>
        </View>
        <View style={styles.badges}>
          {BADGES.map((b) => {
            const got = earned.has(b.id);
            return (
              <View key={b.id} accessible accessibilityLabel={`${b.title}${got ? ', kazanıldı' : `, kilitli: ${b.desc}`}`}
                style={[styles.badge, { backgroundColor: got ? c.surface : c.surfaceLow, borderRadius: radius.md, opacity: got ? 1 : 0.6 }]}>
                <View style={[styles.icon, { backgroundColor: got ? c.tertiarySoft : c.surfaceHigh }]}>
                  <Icon name={got ? b.icon : 'lock'} size={20} color={got ? c.onTertiarySoft : c.textMuted} />
                </View>
                <Text style={[type.label, { color: c.text, textAlign: 'center' }]} numberOfLines={2}>{b.title}</Text>
                <Text style={[type.caption, { color: c.textMuted, textAlign: 'center' }]} numberOfLines={3}>{b.desc}</Text>
              </View>
            );
          })}
        </View>
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
  chest: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  badge: { width: '31%', flexGrow: 1, alignItems: 'center', gap: 4, padding: 10 },
  soon: { flexDirection: 'row', alignItems: 'center', gap: 12 },
});
