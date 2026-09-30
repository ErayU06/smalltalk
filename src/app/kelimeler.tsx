import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mascot } from '@/components/illustrations/Mascot';
import { Flag } from '@/components/ui/Flag';
import { Icon } from '@/components/ui/Icon';
import { Card, Chip, IconButton, Pill } from '@/components/ui/Primitives';
import { DEFAULT_LOCALE, isTargetLang, LANGUAGES } from '@/data/languages';
import { getWords, type WordCard } from '@/features/progress/db';
import { useVoice } from '@/features/speech/useVoice';
import { scriptSafe } from '@/theme/text';
import { useTheme } from '@/theme/useTheme';
import type { TargetLang } from '@/types/scenario';

/** Kelime Sandığı: derslerde öğrenilen kalıplar. Karta dokun → Türkçe anlamı, hoparlör → dinle. */
export default function WordChest() {
  const { c, type } = useTheme();
  const insets = useSafeAreaInsets();
  const [words, setWords] = useState<WordCard[] | null>(null);
  const [lang, setLang] = useState<TargetLang | null>(null);
  useFocusEffect(useCallback(() => { getWords().then(setWords); }, []));

  const langs = [...new Set((words ?? []).map((w) => w.lang))].filter(isTargetLang);
  const active = lang && langs.includes(lang) ? lang : langs[0];
  const shown = (words ?? []).filter((w) => w.lang === active);
  const voice = useVoice(DEFAULT_LOCALE[active ?? 'en']);

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <View style={[styles.top, { paddingTop: insets.top + 8 }]}>
        <IconButton icon="back" label="Geri" tone="outline" onPress={() => (router.canGoBack() ? router.back() : router.replace('/ilerleme'))} />
        <Text style={[type.headlineLg, { color: c.text, flex: 1 }]} accessibilityRole="header">Kelime Sandığı</Text>
        {words?.length ? <Pill tone="secondary" icon="bookmark" label={`${words.length} kart`} /> : null}
      </View>

      <ScrollView contentContainerStyle={[styles.body, { paddingBottom: insets.bottom + 24 }]}>
        {words && !words.length ? (
          <Card tone="low" style={styles.empty}>
            <Mascot mood="happy" size={64} />
            <Text style={[type.body, { color: c.textMuted, textAlign: 'center' }]}>
              İlk provanı bitirdiğinde öğrendiğin kalıplar burada birikir. Sonra kartlara dokunup kendini sınayabilirsin.
            </Text>
          </Card>
        ) : null}

        {langs.length > 1 ? (
          <View style={styles.wrap}>
            {langs.map((l) => <Chip key={l} label={LANGUAGES[l].name} selected={l === active} onPress={() => setLang(l)} />)}
          </View>
        ) : null}

        {shown.length ? (
          <Text style={[type.caption, { color: c.textMuted }]}>Anlamını görmek için karta dokun.</Text>
        ) : null}
        {shown.map((w) => <WordTile key={`${w.lang}|${w.text}`} word={w} onListen={() => voice.speak(w.text, { as: 'narrator' })} />)}
      </ScrollView>
    </View>
  );
}

function WordTile({ word, onListen }: { word: WordCard; onListen: () => void }) {
  const { c, type, radius } = useTheme();
  const [open, setOpen] = useState(false);
  const flag = isTargetLang(word.lang) ? LANGUAGES[word.lang].flag : null;
  return (
    <View style={[styles.tile, { backgroundColor: open ? c.primaryTint : c.surface, borderRadius: radius.md }]}>
      <Pressable
        accessibilityRole="button"
        aria-expanded={open}
        accessibilityLabel={`${word.text}${open ? `: ${word.tr}` : ''}`}
        onPress={() => setOpen((o) => !o)}
        style={({ pressed }) => [{ flex: 1, gap: 4, opacity: pressed ? 0.8 : 1 }]}
      >
        <View style={styles.row6}>
          {flag ? <Flag code={flag} width={16} /> : null}
          <Text style={[type.labelLg, { color: c.text, flexShrink: 1 }, scriptSafe(word.text)]}>{word.text}</Text>
        </View>
        {word.roman ? <Text style={[type.caption, { color: c.textMuted, fontStyle: 'italic' }]}>{word.roman}</Text> : null}
        {open ? (
          <View style={styles.row6}>
            <Icon name="arrowRight" size={14} color={c.primary} />
            <Text style={[type.body, { color: c.onPrimaryTint }]}>{word.tr}</Text>
          </View>
        ) : null}
      </Pressable>
      <IconButton icon="speaker" label={`${word.text} dinle`} tone="low" size={40} onPress={onListen} />
    </View>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingBottom: 8 },
  body: { paddingHorizontal: 20, gap: 10 },
  empty: { alignItems: 'center', gap: 12, padding: 24 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tile: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, minHeight: 64 },
  row6: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
