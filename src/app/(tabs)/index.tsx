import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DailyGoalCard } from '@/components/home/DailyGoalCard';
import { ScenarioCard } from '@/components/home/ScenarioCard';
import { Icon } from '@/components/ui/Icon';
import { SoftNote, StatPill } from '@/components/ui/Primitives';
import { learningLang } from '@/data/availability';
import { getScenarios } from '@/data/scenarios';
import { openScenario } from '@/features/lesson/open';
import { getPrefs, getProfile, getTodayMinutes, type Anxiety, type Prefs, type Profile } from '@/features/progress/db';
import { useTheme } from '@/theme/useTheme';

const FOCUS: Record<Anxiety, string> = {
  panic: 'Sakin kalıp kısa cevap vermek',
  blank: 'Sohbeti bir soruyla sürdürmek',
  pronunciation: 'Yavaş ve net konuşmak',
  fast: 'Dinleyip anlamak',
};

export default function PracticeHome() {
  const { c, type } = useTheme();
  const insets = useSafeAreaInsets();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [minutes, setMinutes] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let alive = true;
      Promise.all([getProfile(), getPrefs(), getTodayMinutes()]).then(([p, pr, m]) => {
        if (!alive) return;
        if (!pr.onboardedAt) {
          router.replace('/onboarding');
          return;
        }
        setProfile(p);
        setPrefs(pr);
        setMinutes(m);
      });
      return () => {
        alive = false;
      };
    }, []),
  );

  const scenarios = getScenarios(learningLang(prefs?.targetLang));
  const open = openScenario;
  const free = scenarios.filter((s) => !s.isPremium);
  const [feature, ...rest] = free;
  const locked = scenarios.filter((s) => s.isPremium);

  return (
    <ScrollView style={{ backgroundColor: c.bg }} contentContainerStyle={[styles.content, { paddingTop: insets.top + 12 }]}>
      <View style={styles.header}>
        <View style={styles.brand}>
          <View style={[styles.logo, { backgroundColor: c.brand }]}><Icon name="chat" size={22} color="#FFFFFF" fill="#FFFFFF" /></View>
          <View>
            <Text style={[type.headlineLg, { color: c.text, fontFamily: type.headlineXl.fontFamily, lineHeight: 26 }]}>SmallTalk</Text>
            <Text style={[type.caption, { color: c.textMuted }]}>Konuşma Cesareti</Text>
          </View>
        </View>
        <View style={styles.stats}>
          <StatPill kind="streak" value={`${profile?.streak ?? 0} Gün`} />
          <StatPill kind="xp" value={`${profile?.total_xp ?? 0} XP`} />
        </View>
      </View>

      <DailyGoalCard
        doneMinutes={minutes}
        goalMinutes={prefs?.dailyMinutes ?? 5}
        focus={prefs?.anxiety ? FOCUS[prefs.anxiety] : 'Kibarca rica etmek'}
        sceneCount={free.length}
        onStart={() => feature && open(feature)}
      />

      <View style={{ gap: 16 }}>
        <View style={styles.sectionHead}>
          <View style={styles.row8}>
            <Icon name="compass" size={22} color={c.primary} />
            <Text style={[type.headlineLg, { fontSize: 20, color: c.text }]} accessibilityRole="header">Günlük Yaşam Senaryoları</Text>
          </View>
          <Text style={[type.label, { color: c.primary, fontFamily: type.labelLg.fontFamily }]} onPress={() => router.push('/senaryolar')} accessibilityRole="link">Tümü</Text>
        </View>
        {feature ? <ScenarioCard scenario={feature} variant="feature" onPress={() => open(feature)} /> : null}
        {rest.map((s) => <ScenarioCard key={s.id} scenario={s} variant="compact" onPress={() => open(s)} />)}
        {locked.map((s) => <ScenarioCard key={s.id} scenario={s} variant="locked" onPress={() => open(s)} />)}
      </View>

      <SoftNote tone="tint" title="Unutma: Hata yapmak serbest!" text="SmallTalk seni asla yargılamaz; sadece dinler ve cesaret verir." />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingBottom: 32, gap: 24 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logo: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  stats: { flexDirection: 'row', gap: 6 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  row8: { flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 1 },
});
