import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mascot } from '@/components/illustrations/Mascot';
import { Scene } from '@/components/illustrations/Scene';
import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Card, IconButton, Pill } from '@/components/ui/Primitives';
import { isTargetLang } from '@/data/languages';
import { getScenario } from '@/data/scenarios';
import { badgeById } from '@/features/engagement/badges';
import { syncReminders } from '@/features/engagement/reminders';
import { getPrefs } from '@/features/progress/db';
import { useVoice } from '@/features/speech/useVoice';
import { upperTR } from '@/theme/text';
import { useTheme } from '@/theme/useTheme';

/** Stitch "Ders Sonu – Başarı & Seri". Tüm sayılar gerçek ders sonucundan gelir. */
export default function LessonComplete() {
  const q = useLocalSearchParams<{ id: string; lang?: string; xp: string; streak: string; natural: string; total: string; bonus?: string; words?: string; badges?: string }>();
  const lang = isTargetLang(q.lang) ? q.lang : 'en';
  const scenario = getScenario(q.id, lang);
  const { c, type, radius, fonts, elevation } = useTheme();
  const insets = useSafeAreaInsets();
  const tts = useVoice(scenario?.locale ?? 'en-US');

  // Hatırlatma izni ilk dersten sonra istenir (ROADMAP Faz 5)
  useEffect(() => { getPrefs().then((p) => syncReminders(p, { ask: true })).catch(() => undefined); }, []);

  const newBadges = (q.badges ?? '').split(',').map(badgeById).filter((b) => !!b);
  const newWords = Number(q.words ?? 0);
  const bonus = Number(q.bonus ?? 0);

  const tiles: { icon: IconName; bg: string; fg: string; value: string; label: string }[] = [
    { icon: 'bolt', bg: c.secondarySoft, fg: c.onSecondarySoft, value: `+${q.xp} XP`, label: 'Bu provadan' },
    { icon: 'flame', bg: c.primarySoft, fg: c.primary, value: `${q.streak} Gün`, label: 'Seri' },
    { icon: 'target', bg: c.surfaceHigh, fg: c.tertiary, value: `${q.natural}/${q.total}`, label: 'Doğal cevap' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: c.bg, overflow: 'hidden' }}>
      <View style={[styles.blob, { top: -48, left: -48, backgroundColor: c.primarySoft }]} />
      <View style={[styles.blob, { top: 96, right: -32, width: 160, height: 160, backgroundColor: c.secondarySoft }]} />
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.hero}>
          <View>
            <LinearGradient colors={[c.primary, c.brand, c.tertiarySoft]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={[styles.badge, { shadowColor: c.buttonGlow }, elevation.glow]}>
              <Mascot mood="celebrate" size={64} body="#FFFFFF" />
            </LinearGradient>
            <View style={[styles.verified, { backgroundColor: c.surface }]}><Icon name="checkCircle" size={22} color={c.tertiaryAccent} /></View>
          </View>
          <Pill tone="neutral" icon="sparkle" iconColor={c.primary} label="Günlük hedef tamamlandı" />
          <Text style={[type.headlineXl, { color: c.text, textAlign: 'center' }]} accessibilityRole="header">Harika bir prova çıkardın!</Text>
          <Text style={[type.body, { color: c.textMuted, textAlign: 'center', maxWidth: 320 }]}>Bugün bir kez daha konfor alanından çıktın ve konuştun. Seninle gurur duyuyoruz.</Text>
        </View>

        <View style={styles.tiles}>
          {tiles.map((t) => (
            <Card key={t.label} padding={10} style={styles.tile}>
              <View style={[styles.tileIcon, { backgroundColor: t.bg }]}><Icon name={t.icon} size={20} color={t.fg} /></View>
              <Text style={[type.headlineLg, { fontSize: 21, color: c.text }]}>{t.value}</Text>
              <Text style={[type.caption, { color: c.textMuted }]}>{t.label}</Text>
            </Card>
          ))}
        </View>

        {bonus > 0 ? (
          <View style={{ alignItems: 'center' }}>
            <Pill tone="tertiary" icon="target" iconColor={c.tertiary} label={`Günün meydan okuması: +${bonus} XP bonus`} />
          </View>
        ) : null}

        {newBadges.length ? (
          <Card style={{ gap: 10 }}>
            <View style={styles.row6}>
              <Icon name="award" size={18} color={c.tertiary} />
              <Text style={[type.overline, { color: c.tertiary }]}>{upperTR(newBadges.length > 1 ? 'Yeni rozetler' : 'Yeni rozet')}</Text>
            </View>
            {newBadges.map((b) => (
              <View key={b!.id} style={styles.row6}>
                <View style={[styles.trophy, { backgroundColor: c.tertiarySoft }]}><Icon name={b!.icon} size={16} color={c.onTertiarySoft} /></View>
                <View style={{ flex: 1 }}>
                  <Text style={[type.labelLg, { color: c.text }]}>{b!.title}</Text>
                  <Text style={[type.caption, { color: c.textMuted }]}>{b!.desc}</Text>
                </View>
              </View>
            ))}
          </Card>
        ) : null}

        {scenario ? (
          <Card style={{ gap: 10 }}>
            <View style={styles.between}>
              <View style={styles.row6}>
                <View style={[styles.trophy, { backgroundColor: c.tertiarySoft }]}><Icon name="trophy" size={16} color={c.onTertiarySoft} /></View>
                <Text style={[type.overline, { color: c.tertiary }]}>{upperTR('Yeni kalıp rozeti')}</Text>
              </View>
              <IconButton icon="share" label="Kalıbı paylaş" tone="low" size={36}
                onPress={() => Share.share({ message: `SmallTalk'ta yeni kalıp öğrendim: "${scenario.pattern.text}"` })} />
            </View>
            <View style={[styles.between, { backgroundColor: c.surfaceLow, borderRadius: radius.sm, padding: 12 }]}>
              <View style={{ flex: 1 }}>
                <Text style={[type.labelLg, { color: c.text }]}>“{scenario.pattern.text}”</Text>
                <Text style={[type.caption, { color: c.textMuted }]}>{scenario.pattern.note}</Text>
              </View>
              <IconButton icon="speaker" label="Kalıbı dinle" tone="surface" size={36} onPress={() => tts.speak(scenario.pattern.text, { as: 'narrator' })} />
            </View>
          </Card>
        ) : null}

        {scenario ? (
          <View style={[styles.summary, { backgroundColor: c.surfaceLow, borderRadius: radius.md }]}>
            <View style={{ borderRadius: radius.sm, overflow: 'hidden' }}><Scene setting={scenario.setting} width={64} height={64} /></View>
            <View style={{ flex: 1, gap: 3 }}>
              <View style={styles.row6}><Icon name="checkCircle" size={16} color={c.primary} /><Text style={[type.label, { color: c.primary, fontFamily: fonts.bold }]}>{scenario.placeLabel} senaryosu</Text></View>
              <Text style={[type.caption, { color: c.textSubtle }]}>
                {scenario.npc.name} ile {q.total} tur karşılıklı diyalog tamamlandı.
                {Number(q.total) - Number(q.natural) > 0 ? ' Zorlandığın cümleler tekrar kuyruğuna eklendi.' : ''}
              </Text>
            </View>
          </View>
        ) : null}

        {newWords > 0 ? (
          <Text onPress={() => router.push('/kelimeler')} accessibilityRole="link" style={[type.label, { color: c.primary, textAlign: 'center', fontFamily: fonts.bold }]}>
            {newWords} yeni kelime kartı sandığına eklendi · Kelime sandığını aç
          </Text>
        ) : null}

        <View style={{ gap: 8 }}>
          <Button label="Harika, devam et" iconRight="arrowRight" onPress={() => router.dismissTo('/')} />
          <Button label="Bir daha prova et" variant="soft" icon="refresh" onPress={() => router.replace({ pathname: '/lesson/[id]', params: { id: q.id, lang } })} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, gap: 16 },
  blob: { position: 'absolute', width: 192, height: 192, borderRadius: 96, opacity: 0.5 },
  hero: { alignItems: 'center', gap: 8 },
  badge: { width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  verified: { position: 'absolute', bottom: 4, right: -4, width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  tiles: { flexDirection: 'row', gap: 8 },
  tile: { flex: 1, alignItems: 'center', gap: 4 },
  tileIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  row6: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  trophy: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  summary: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14 },
});
