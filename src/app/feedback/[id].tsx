import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { getScenario } from '@/data/scenarios';
import { useTheme } from '@/hooks/use-theme';

// Placeholder scoring until real language feedback exists: rewards fuller answers.
function mockScore(replies: number, words: number) {
  if (replies === 0) return 0;
  const wordsPerReply = words / replies;
  return Math.min(98, Math.round(55 + wordsPerReply * 6));
}

export default function FeedbackScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ id: string; replies?: string; words?: string }>();
  const scenario = getScenario(params.id);
  const replies = Number(params.replies ?? 0);
  const words = Number(params.words ?? 0);
  const score = mockScore(replies, words);

  if (!scenario) {
    return (
      <ThemedView style={styles.missing}>
        <ThemedText>Senaryo bulunamadı.</ThemedText>
      </ThemedView>
    );
  }

  const usefulPhrases = scenario.suggestions.map((options) => options[0]);

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.four }]}>
      <View style={styles.hero}>
        <ThemedText type="title" style={{ color: theme.accent }}>
          {score}
        </ThemedText>
        <ThemedText themeColor="textSecondary">
          {scenario.title} · {replies} cevap, {words} kelime
        </ThemedText>
      </View>

      <Card
        title="İyi gidenler"
        icon={{ ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' }}
        iconColor={theme.success}>
        <ThemedText type="small">Sohbeti sonuna kadar sürdürdün.</ThemedText>
        {words / Math.max(1, replies) >= 4 && (
          <ThemedText type="small">Cevapların tek kelimeyle sınırlı kalmadı.</ThemedText>
        )}
      </Card>

      <Card
        title="İpuçları"
        icon={{ ios: 'lightbulb.fill', android: 'lightbulb', web: 'lightbulb' }}
        iconColor={theme.warning}>
        {scenario.tips.map((tip) => (
          <ThemedText key={tip} type="small">
            {tip}
          </ThemedText>
        ))}
      </Card>

      <Card
        title="Kullanışlı kalıplar"
        icon={{ ios: 'text.bubble.fill', android: 'chat_bubble', web: 'chat_bubble' }}
        iconColor={theme.accent}>
        {usefulPhrases.map((phrase) => (
          <ThemedText key={phrase} type="small">
            “{phrase}”
          </ThemedText>
        ))}
      </Card>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.dismissAll()}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: theme.accent },
            pressed && styles.pressed,
          ]}>
          <ThemedText type="smallBold" style={{ color: theme.onAccent }}>
            Bitir
          </ThemedText>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            // Pop back to the tabs and open a fresh session for the same scenario.
            router.dismissAll();
            router.push({ pathname: '/practice/[id]', params: { id: scenario.id } });
          }}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: theme.backgroundElement },
            pressed && styles.pressed,
          ]}>
          <ThemedText type="smallBold">Tekrar dene</ThemedText>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function Card({
  title,
  icon,
  iconColor,
  children,
}: {
  title: string;
  icon: SymbolViewProps['name'];
  iconColor: string;
  children: React.ReactNode;
}) {
  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <View style={styles.cardHeader}>
        <SymbolView name={icon} tintColor={iconColor} size={18} />
        <ThemedText type="smallBold">{title}</ThemedText>
      </View>
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: Spacing.three,
    gap: Spacing.three,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: Spacing.four,
    gap: Spacing.one,
  },
  card: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.two,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  actions: {
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  button: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
  },
  pressed: {
    opacity: 0.7,
  },
});
