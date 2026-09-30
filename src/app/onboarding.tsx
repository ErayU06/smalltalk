import { router } from 'expo-router';
import { ExpoSpeechRecognitionModule } from 'expo-speech-recognition';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Scene } from '@/components/illustrations/Scene';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { NativeLanguagePicker, TargetLanguagePicker } from '@/components/onboarding/LanguagePickers';
import { Card, IconButton, Pill, SelectCard, StepDots } from '@/components/ui/Primitives';
import { upperTR } from '@/theme/text';
import { availability } from '@/data/availability';
import { NATIVE_OPTIONS, TARGET_OPTIONS, type Language } from '@/data/languages';
import { contentCount } from '@/data/scenarios';
import { getPrefs, savePrefs, type Anxiety, type Interest, type Prefs } from '@/features/progress/db';
import { useTheme } from '@/theme/useTheme';
import type { Setting } from '@/types/scenario';

type LangCode = Language['code'];

const ANXIETY: { id: Anxiety; text: string }[] = [
  { id: 'panic', text: 'Kelime biliyorum ama konuşurken panikliyorum' },
  { id: 'blank', text: 'Ne diyeceğimi bilemiyorum, sohbet tıkanıyor' },
  { id: 'pronunciation', text: 'Telaffuzum yüzünden çekiniyorum' },
  { id: 'fast', text: 'Hızlı konuşunca karşımdakini kaçırıyorum' },
];
const GOALS = [
  { min: 5 as const, title: 'Sakin ve düzenli', desc: 'Günde 1 kısa senaryo. Kahve demlenirken bitir.', icon: 'sprout' as const },
  { min: 10 as const, title: 'İdeal ilerleme', desc: 'Günde 2 senaryo ve 1 sesli prova.', icon: 'bolt' as const },
  { min: 15 as const, title: 'Hızlı özgüven', desc: 'Seyahat veya staj öncesi yoğun prova.', icon: 'rocket' as const },
];
const INTERESTS: { id: Interest; title: string; desc: string; scene: Setting }[] = [
  { id: 'travel', title: 'Seyahat ve şehir', desc: 'Yol sorma, otel, taksi', scene: 'street' },
  { id: 'social', title: 'Sosyal ve kafe', desc: 'Sipariş, tanışma', scene: 'cafe' },
  { id: 'work', title: 'İş ve ofis', desc: 'Kahve molası, toplantı', scene: 'work' },
  { id: 'campus', title: 'Üniversite', desc: 'Hocaya soru, ödev', scene: 'campus' },
];

export default function Onboarding() {
  const { c, type, radius, elevation } = useTheme();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [p, setP] = useState<Omit<Prefs, 'onboardedAt'>>({
    nativeLang: 'tr', targetLang: 'en', anxiety: null, interests: [], dailyMinutes: 5, reminderTime: '20:00', speechEnabled: true,
  });
  const set = (patch: Partial<typeof p>) => setP((prev) => ({ ...prev, ...patch }));

  // Profil'den tekrar açılırsa mevcut tercihleri yükle
  useEffect(() => {
    getPrefs().then((saved) => {
      if (saved.onboardedAt) {
        const { onboardedAt: _ignored, ...rest } = saved;
        setP(rest);
      }
    });
  }, []);

  const finish = async () => {
    // TODO: reminderTime doluysa expo-notifications ile yerel günlük bildirim planla
    await savePrefs(p);
    router.dismissTo('/');
  };

  const askMic = async () => {
    let granted = false;
    try {
      const res = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      granted = res.granted;
    } catch {
      granted = false;
    }
    set({ speechEnabled: granted });
    setStep(3);
  };

  const badge = ['Tanışma', 'Günlük Hedef', 'İlgi Alanları'][step - 1];

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <View style={[styles.top, { paddingTop: insets.top + 8 }]}>
        {step > 1 || router.canGoBack() ? (
          <IconButton icon="back" label="Geri" tone="outline" onPress={() => (step > 1 ? setStep((s) => (s - 1) as 1 | 2) : router.back())} />
        ) : <View style={{ width: 40 }} />}
        <StepDots total={3} current={step} />
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Pill tone="secondary" icon={step === 2 ? 'tune' : undefined} size="sm" label={`Adım ${step} / 3 · ${badge}`} />

        {step === 1 && (
          <>
            <View style={{ gap: 6 }}>
              <Text style={[type.headlineLg, { color: c.text, fontFamily: type.headlineXl.fontFamily, letterSpacing: -0.5 }]} accessibilityRole="header">Önce seni biraz tanıyalım</Text>
              <Text style={[type.body, { color: c.textMuted }]}>Sana en uygun sohbetleri ve seviyeyi ayarlayabilmemiz için dillerini seç.</Text>
            </View>
            <Section label="Ana dilim">
              <NativeLanguagePicker options={NATIVE_OPTIONS} value={p.nativeLang as LangCode | null} onChange={(code) => set({ nativeLang: code })} />
            </Section>
            <Section label="Pratik etmek istediğim dil">
              <TargetLanguagePicker
                options={TARGET_OPTIONS}
                value={p.targetLang as LangCode | null}
                onChange={(code) => set({ targetLang: code })}
                soon={TARGET_OPTIONS.filter((code) => availability(code) === 'soon')}
                preview={Object.fromEntries(TARGET_OPTIONS.filter((code) => availability(code) === 'preview').map((code) => [code, contentCount(code).total]))}
              />
            </Section>
            <Section label="Konuşurken en çok ne zorluyor?">
              <View style={{ gap: 8 }}>
                {ANXIETY.map((a) => <SelectCard key={a.id} title={a.text} selected={p.anxiety === a.id} onPress={() => set({ anxiety: a.id })} />)}
              </View>
            </Section>
          </>
        )}

        {step === 2 && (
          <>
            <View style={{ gap: 4 }}>
              <Text style={[type.headlineLg, { color: c.text }]} accessibilityRole="header">Günde ne kadar vakit ayırmak istersin?</Text>
              <Text style={[type.body, { color: c.textMuted }]}>Küçük adımlar büyük özgüven getirir. Baskı yok, 5 dakika bile yeterli.</Text>
            </View>
            <View style={{ gap: 8 }}>
              {GOALS.map((g) => (
                <SelectCard key={g.min} icon={g.icon} title={g.title} tag={`${g.min} dk / gün`} description={g.desc}
                  selected={p.dailyMinutes === g.min} onPress={() => set({ dailyMinutes: g.min })} />
              ))}
            </View>
            <View style={[styles.mic, { backgroundColor: c.secondarySoft, borderRadius: radius.md }]}>
              <View style={styles.row8}>
                <View style={[styles.micIcon, { backgroundColor: c.surface }]}><Icon name="mic" size={16} color={c.onSecondarySoft} /></View>
                <Text style={[type.label, { color: c.text, fontFamily: type.labelLg.fontFamily }]}>Mikrofon izni neden gerekli?</Text>
              </View>
              <Text style={[type.caption, { fontSize: 13, lineHeight: 19, color: c.onSecondarySoft }]}>
                Sadece mikrofon düğmesine bastığında dinleriz. Ses kaydı tutmayız; söylediklerin telefonunun kendi tanıma motoruyla yazıya dökülür ve cevabını anlamak için kullanılır.
              </Text>
              <View style={styles.row8}><Icon name="shield" size={14} color={c.tertiary} /><Text style={[type.caption, { color: c.tertiary, fontFamily: type.labelLg.fontFamily }]}>Kayıt yok · Sıfır yargı alanı</Text></View>
            </View>
          </>
        )}

        {step === 3 && (
          <>
            <View style={{ gap: 4 }}>
              <Text style={[type.headlineLg, { color: c.text }]} accessibilityRole="header">Hangi sahnelerde rahat olmak istersin?</Text>
              <Text style={[type.body, { color: c.textMuted }]}>Birden fazla seçebilirsin, istediğin zaman değiştirirsin.</Text>
            </View>
            <View style={styles.grid2}>
              {INTERESTS.map((it) => {
                const sel = p.interests.includes(it.id);
                return (
                  <Pressable key={it.id} accessibilityRole="checkbox" accessibilityState={{ checked: sel }} accessibilityLabel={`${it.title}: ${it.desc}`}
                    onPress={() => set({ interests: sel ? p.interests.filter((x) => x !== it.id) : [...p.interests, it.id] })}
                    style={[styles.tile, { backgroundColor: c.surface, borderRadius: radius.lg, shadowColor: sel ? c.buttonGlow : c.shadow },
                      sel ? { borderWidth: 2, borderColor: c.brand, ...elevation.raised, shadowOpacity: 0.25 } : elevation.card]}>
                    <View style={{ borderRadius: radius.md, overflow: 'hidden' }}><Scene setting={it.scene} width={148} height={88} /></View>
                    <Text style={[type.labelLg, { fontSize: 15, color: c.text }]}>{it.title}</Text>
                    <Text style={[type.caption, { color: c.textMuted }]}>{it.desc}</Text>
                    {sel ? <View style={[styles.tick, { backgroundColor: c.buttonGradient[0] }]}><Icon name="check" size={15} color={c.onButton} strokeWidth={3.2} /></View> : null}
                  </Pressable>
                );
              })}
            </View>
            <Card style={styles.reminder}>
              <View style={[styles.micIcon, { width: 36, height: 36, borderRadius: 18, backgroundColor: c.tertiarySoft }]}><Icon name="timer" size={18} color={c.tertiary} /></View>
              <View style={{ flex: 1 }}>
                <Text style={[type.labelLg, { fontSize: 15, color: c.text }]}>Nazik hatırlatma</Text>
                <Text style={[type.caption, { color: c.textMuted }]}>Her gün 20:00 · seriyi korumak için</Text>
              </View>
              <Switch accessibilityLabel="Hatırlatma" value={!!p.reminderTime} onValueChange={(v) => set({ reminderTime: v ? '20:00' : null })}
                trackColor={{ true: c.buttonGradient[0], false: c.surfaceHighest }} thumbColor="#FFFFFF" />
            </Card>
          </>
        )}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 12 }]}>
        {step === 1 && <Button label="Devam Et" iconRight="arrowRight" disabled={!p.anxiety} onPress={() => setStep(2)} accessibilityHint={!p.anxiety ? 'Önce seni zorlayan durumu seç' : undefined} />}
        {step === 2 && (
          <>
            <Button label="İzin ver ve devam et" iconRight="arrowRight" onPress={askMic} />
            <Button label="Şimdilik yazarak devam et" variant="ghost" size="sm" onPress={() => { set({ speechEnabled: false }); setStep(3); }} />
          </>
        )}
        {step === 3 && <Button label="Hadi başlayalım" iconRight="arrowRight" disabled={!p.interests.length} onPress={finish} />}
      </View>
    </View>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  const { c, type } = useTheme();
  return (
    <View style={{ gap: 8 }}>
      <Text style={[type.overline, { color: c.textMuted }]}>{upperTR(label)}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 8 },
  body: { paddingHorizontal: 20, paddingBottom: 24, gap: 16 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  lang: { width: '48%', flexGrow: 1, minHeight: 56, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 12 },
  code: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  mic: { padding: 14, gap: 8 },
  micIcon: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  row8: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tile: { width: '48%', flexGrow: 1, padding: 8, gap: 4 },
  tick: { position: 'absolute', top: 14, right: 14, width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  reminder: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  footer: { paddingHorizontal: 20, paddingTop: 8, gap: 4 },
});
