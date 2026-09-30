import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FeedbackSheet, type FeedbackContent } from '@/components/lesson/FeedbackSheet';
import { MicButton } from '@/components/lesson/MicButton';
import { NpcCard } from '@/components/lesson/NpcCard';
import { OptionCard } from '@/components/lesson/OptionCard';
import { Waveform } from '@/components/lesson/Waveform';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Card, Chip, IconButton, Pill, ProgressBar, SoftNote, StatPill } from '@/components/ui/Primitives';
import { isTargetLang, langName } from '@/data/languages';
import { getScenario, progressKey } from '@/data/scenarios';
import { hasKeyword, matchAnswer, normalize } from '@/features/lesson/matchAnswer';
import { addToReview, getPrefs, getProfile, saveLessonResult, type Prefs } from '@/features/progress/db';
import { useSpeechInput } from '@/features/speech/useSpeechInput';
import { useVoice } from '@/features/speech/useVoice';
import { upperTR } from '@/theme/text';
import { useTheme } from '@/theme/useTheme';
import type { OpenStep } from '@/types/scenario';

const XP = { correct: 5, almost: 3, wrong: 1 } as const;
const MAX_CHARS = 140;

export default function Lesson() {
  const q = useLocalSearchParams<{ id: string; lang?: string }>();
  const lang = isTargetLang(q.lang) ? q.lang : 'en';
  const scenario = getScenario(q.id, lang);
  const { c, type, fonts } = useTheme();
  const insets = useSafeAreaInsets();

  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<FeedbackContent[]>([]);
  const [feedback, setFeedback] = useState<FeedbackContent | null>(null);
  const [choice, setChoice] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [typeInstead, setTypeInstead] = useState(false);
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [streak, setStreak] = useState(0);
  const startedAt = useRef(Date.now());

  const locale = scenario?.locale ?? 'en-US';
  const step = scenario?.steps[index];
  const open = step && step.kind !== 'choice' ? (step as OpenStep) : null;
  const hints = useMemo(() => (open ? [...open.keywords.flat(), ...(open.wordBank ?? [])] : []), [open]);
  const tts = useVoice(locale, scenario?.npc);
  const mic = useSpeechInput(locale, hints);
  const slow = prefs?.anxiety === 'panic' || prefs?.anxiety === 'pronunciation';
  const speechMode = step?.kind === 'speech' && !typeInstead && prefs?.speechEnabled !== false;

  useEffect(() => {
    getPrefs().then(setPrefs);
    getProfile().then((p) => setStreak(p.streak));
  }, []);

  // Her adımda NPC repliğini oku (girdi, next() içinde sıfırlanır)
  useEffect(() => {
    if (!step) return;
    const t = setTimeout(() => tts.speak(step.npcLine, { slow }), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, step?.id]);

  // Konuşma bitince değerlendir
  useEffect(() => {
    if (open && mic.state === 'done' && mic.transcript) evaluateOpen(mic.transcript);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mic.state]);

  if (!scenario || !step) {
    return (
      <View style={[styles.center, { backgroundColor: c.bg }]}>
        <Text style={[type.bodyLg, { color: c.text }]}>Bu senaryo bulunamadı.</Text>
        <Button label="Geri dön" variant="soft" onPress={() => router.back()} />
      </View>
    );
  }

  function evaluateOpen(answer: string) {
    if (!open) return;
    const r = matchAnswer(answer, open.acceptedAnswers, open.keywords, open.mistakes, lang);
    setFeedback({
      verdict: r.verdict,
      score: r.score,
      xp: XP[r.verdict],
      userText: r.verdict === 'correct' ? undefined : answer,
      suggestion: r.closest,
      explanation: r.tip ?? (r.verdict === 'correct' ? scenario!.pattern.note : open.why),
    });
    if (r.verdict === 'wrong') addToReview(progressKey(scenario!.id, lang), step!.id, answer, r.closest);
  }

  function evaluateChoice() {
    if (step?.kind !== 'choice' || choice === null) return;
    const o = step.options[choice];
    const best = step.options.find((x) => x.correct)!;
    const verdict = o.correct ? 'correct' : o.near ? 'almost' : 'wrong';
    setFeedback({
      verdict, score: o.correct ? 1 : o.near ? 0.6 : 0.2, xp: XP[verdict],
      userText: o.correct ? undefined : o.text,
      suggestion: best.text,
      explanation: o.feedback,
    });
  }

  async function next() {
    const all = feedback ? [...results, feedback] : results;
    setResults(all);
    if (index + 1 < scenario!.steps.length) {
      setFeedback(null);
      setChoice(null);
      setText('');
      setTypeInstead(false);
      mic.reset();
      setIndex(index + 1);
      return;
    }
    const avg = all.reduce((a, r) => a + r.score, 0) / Math.max(1, all.length);
    const xp = all.reduce((a, r) => a + r.xp, 0);
    const durationSec = (Date.now() - startedAt.current) / 1000;
    const saved = await saveLessonResult(progressKey(scenario!.id, lang), avg, xp, durationSec);
    router.replace({
      pathname: '/lesson/complete',
      params: { id: scenario!.id, lang, xp: String(xp), streak: String(saved.streak), natural: String(all.filter((r) => r.verdict === 'correct').length), total: String(all.length) },
    });
  }

  function retry() {
    setFeedback(null);
    setChoice(null);
    mic.reset();
  }

  const heard = open && mic.transcript ? open.keywords.flat().find((k) => hasKeyword(normalize(mic.transcript, lang), k, lang)) : undefined;

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: c.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 24 }]} keyboardShouldPersistTaps="handled">
        {/* Üst: çık · ilerleme · adım/seri */}
        <View style={styles.topRow}>
          <IconButton icon="close" label="Dersi sonlandır" onPress={() => router.back()} />
          <View style={{ flex: 1, gap: 6 }}>
            <View style={styles.between}>
              <Text style={[type.label, { color: c.textMuted }]} numberOfLines={1}>{scenario.placeLabel}</Text>
              <Text style={[type.label, { color: c.primary, fontFamily: fonts.bold }]}>Adım {index + 1}/{scenario.steps.length}</Text>
            </View>
            <ProgressBar value={(index + (feedback ? 1 : 0)) / scenario.steps.length} />
          </View>
          <StatPill kind="streak" value={`${streak}`} />
        </View>
        <View style={styles.safeLine}>
          <View style={[styles.dot, { backgroundColor: c.tertiaryAccent }]} />
          <Text style={[type.caption, { color: c.textMuted }]}>Hata yapmaktan korkma, bu bir prova alanı</Text>
        </View>

        {/* NPC */}
        <NpcCard
          npc={scenario.npc}
          line={step.npcLine}
          hint={step.hint}
          speaking={tts.speaking}
          onSpeak={() => tts.speak(step.npcLine, { slow })}
          variant={step.kind === 'choice' ? 'stage' : step.kind === 'speech' ? 'inline' : 'card'}
        />

        {/* Çoktan seçmeli */}
        {step.kind === 'choice' && (
          <View style={{ gap: 12 }}>
            <View>
              <Text style={[type.overline, { color: c.primary }]}>{upperTR('Cevap seçeneği')}</Text>
              <Text style={[type.headlineLg, { fontSize: 22, color: c.text }]}>{step.prompt}</Text>
            </View>
            <View accessibilityRole="radiogroup" style={{ gap: 10 }}>
              {step.options.map((o, i) => (
                <OptionCard key={o.text} letter={String.fromCharCode(65 + i)} text={o.text} selected={choice === i} disabled={!!feedback} onPress={() => setChoice(i)} />
              ))}
            </View>
            <Button label="Cevabı Kontrol Et" iconRight="arrowRight" disabled={choice === null} onPress={evaluateChoice} />
          </View>
        )}

        {/* Yazma (veya konuşmadan yazmaya geçiş) */}
        {open && !speechMode && (
          <View style={{ gap: 12 }}>
            <View style={styles.between}>
              <View style={styles.row6}><Icon name="edit" size={19} color={c.primary} /><Text style={[type.labelLg, { color: c.text }]}>Cevabını {langName(lang)} yaz:</Text></View>
              <Text onPress={() => setText('')} accessibilityRole="button" style={[type.caption, { color: c.textMuted, padding: 6 }]}>Temizle</Text>
            </View>
            <Card style={{ gap: 8, shadowColor: c.buttonGlow, shadowOpacity: 0.15 }}>
              <TextInput
                value={text}
                onChangeText={(v) => setText(v.slice(0, MAX_CHARS))}
                placeholder="Cevabını buraya yaz…"
                placeholderTextColor={c.textMuted}
                multiline
                autoCapitalize="sentences"
                autoCorrect={false}
                accessibilityLabel="Cevabın"
                style={[type.bodyLg, { color: c.text, minHeight: 78, textAlignVertical: 'top' }]}
              />
              <View style={styles.between}>
                <View style={styles.row6}><Icon name="smile" size={16} color={c.textMuted} /><Text style={[type.caption, { color: c.textMuted }]}>Kendini rahat hissettiğin gibi ifade et</Text></View>
                <Text style={[type.caption, { color: c.textMuted }]}>{text.length} / {MAX_CHARS}</Text>
              </View>
            </Card>
            {open.wordBank?.length ? (
              <View style={{ gap: 8 }}>
                <Text style={[type.label, { color: c.textMuted }]}>Hızlı kelime ekle (dokun, cümlene eklensin)</Text>
                <View style={styles.wrap}>
                  {open.wordBank.map((w) => (
                    <Chip key={w} label={w} icon="plus" onPress={() => setText((t) => {
                      const cur = t.trim();
                      const add = w.replace(/…$/, '');
                      const nextText = !cur ? add.charAt(0).toUpperCase() + add.slice(1) : /[.,]$/.test(cur) ? `${cur} ${add}` : `${cur}, ${add}`;
                      return nextText.slice(0, MAX_CHARS);
                    })} />
                  ))}
                </View>
              </View>
            ) : null}
            <SoftNote text="Gramere takılma! Anlaşıldığın sürece küçük hatalar tamamen normal ve değerli." />
            <Button label="Kontrol Et" icon="checkCircle" disabled={!text.trim()} onPress={() => evaluateOpen(text)} />
          </View>
        )}

        {/* Konuşma */}
        {open && speechMode && (
          <View style={{ gap: 16 }}>
            <Card padding={20} style={{ gap: 14 }}>
              <View style={styles.between}>
                <View style={styles.row6}><Icon name="shieldFilled" size={18} color={c.primary} /><Text style={[type.label, { color: c.primary, fontFamily: fonts.bold }]}>Senin sıran</Text></View>
                <Pill tone="neutral" size="sm" label="Yargılama yok, rahatça konuş" />
              </View>
              <View style={{ minHeight: 80, justifyContent: 'center', gap: 6 }} accessibilityLiveRegion="polite">
                <Text style={[type.bodyLg, { color: mic.transcript ? c.text : c.textMuted, fontFamily: fonts.semibold }]}>
                  {mic.transcript ? `“${mic.transcript}”` : mic.state === 'listening' ? 'Dinliyorum…' : 'Mikrofona dokun ve cevabını söyle.'}
                </Text>
                {heard ? (
                  <View style={styles.row6}><Icon name="checkCircle" size={14} color={c.success} /><Text style={[type.caption, { color: c.textMuted }]}>Beklenen kalıbı yakaladık: “{heard}”</Text></View>
                ) : null}
                {mic.error ? <Text style={[type.caption, { color: c.tertiary }]}>Duyamadım, bir daha dener misin? Acele yok.</Text> : null}
              </View>
              <Waveform active={mic.state === 'listening'} level={mic.level} />
              {open.wordBank?.length ? (
                <View style={styles.wrap}>
                  <Text style={[type.caption, { color: c.textMuted, alignSelf: 'center' }]}>Hızlı kalıp:</Text>
                  {open.wordBank.map((w) => <Pill key={w} tone="neutral" label={w} />)}
                </View>
              ) : null}
            </Card>
            <View style={{ alignItems: 'center', gap: 8 }}>
              <MicButton listening={mic.state === 'listening'} onPress={mic.state === 'listening' ? mic.stop : mic.start} />
              <Text style={[type.labelLg, { color: c.text }]}>
                {mic.state === 'listening' ? 'Dinleniyor… ' : 'Konuşmaya hazır '}
                <Text style={[type.body, { color: c.textMuted }]}>{mic.state === 'listening' ? 'Bitince dokun' : 'Dokun ve başla'}</Text>
              </Text>
            </View>
            <Button label="Şu an konuşamıyorum, yazarak cevapla" variant="soft" size="sm" shape="rounded" icon="keyboard" onPress={() => { mic.stop(); setTypeInstead(true); }} />
          </View>
        )}
      </ScrollView>

      {feedback ? (
        <FeedbackSheet
          {...feedback}
          bottomInset={insets.bottom}
          onContinue={next}
          onRetry={retry}
          onListen={feedback.suggestion ? () => tts.speak(feedback.suggestion!, { as: 'narrator', slow }) : undefined}
          onSave={feedback.verdict !== 'correct' && feedback.userText ? () => addToReview(progressKey(scenario.id, lang), step.id, feedback.userText!, feedback.suggestion ?? '') : undefined}
        />
      ) : null}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 20 },
  content: { paddingHorizontal: 20, gap: 16 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  row6: { flexDirection: 'row', alignItems: 'center', gap: 6, flexShrink: 1 },
  safeLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
