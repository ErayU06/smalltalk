import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useHeaderHeight } from 'expo-router/react-navigation';
import { SymbolView } from 'expo-symbols';
import { useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MessageBubble, TypingBubble } from '@/components/message-bubble';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { getScenario, type Scenario } from '@/data/scenarios';
import { usePracticeSession } from '@/hooks/use-practice-session';
import { useTheme } from '@/hooks/use-theme';

export default function PracticeRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const scenario = getScenario(id);

  if (!scenario) {
    return (
      <ThemedView style={styles.missing}>
        <ThemedText>Senaryo bulunamadı.</ThemedText>
      </ThemedView>
    );
  }
  return <PracticeSession scenario={scenario} />;
}

function PracticeSession({ scenario }: { scenario: Scenario }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const list = useRef<FlatList>(null);
  const [draft, setDraft] = useState('');
  const { messages, send, suggestions, isPartnerTyping, isFinished, learnerReplies } =
    usePracticeSession(scenario);

  function submit(text: string) {
    send(text);
    setDraft('');
  }

  function openFeedback() {
    const words = learnerReplies.join(' ').split(/\s+/).filter(Boolean).length;
    router.push({
      pathname: '/feedback/[id]',
      params: { id: scenario.id, replies: String(learnerReplies.length), words: String(words) },
    });
  }

  const canSend = draft.trim().length > 0 && !isPartnerTyping && !isFinished;

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: theme.background }]}
      // Android is always edge-to-edge, so the window doesn't resize for the keyboard.
      behavior="padding"
      keyboardVerticalOffset={headerHeight}>
      <Stack.Screen options={{ title: scenario.title }} />

      <FlatList
        ref={list}
        style={styles.flex}
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        contentContainerStyle={styles.messages}
        onContentSizeChange={() => list.current?.scrollToEnd({ animated: true })}
        keyboardDismissMode="interactive"
        ListHeaderComponent={
          <ThemedView type="backgroundElement" style={styles.context}>
            <ThemedText type="small" themeColor="textSecondary">
              {scenario.context}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Konuştuğun kişi: {scenario.partner}
            </ThemedText>
          </ThemedView>
        }
        ListFooterComponent={isPartnerTyping ? <TypingBubble /> : null}
      />

      <View
        style={[
          styles.composer,
          { borderColor: theme.border, paddingBottom: insets.bottom + Spacing.two },
        ]}>
        {isFinished ? (
          <Pressable
            onPress={openFeedback}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.primaryButton,
              { backgroundColor: theme.accent },
              pressed && styles.pressed,
            ]}>
            <ThemedText type="smallBold" style={{ color: theme.onAccent }}>
              Sohbet bitti · Geri bildirimi gör
            </ThemedText>
          </Pressable>
        ) : (
          <>
            {suggestions.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.suggestions}>
                {suggestions.map((s) => (
                  <Pressable
                    key={s}
                    onPress={() => submit(s)}
                    accessibilityRole="button"
                    accessibilityHint="Bu cevabı gönderir"
                    style={({ pressed }) => [
                      styles.suggestion,
                      { borderColor: theme.accent },
                      pressed && styles.pressed,
                    ]}>
                    <ThemedText type="small" style={{ color: theme.accent }}>
                      {s}
                    </ThemedText>
                  </Pressable>
                ))}
              </ScrollView>
            )}
            <View style={styles.inputRow}>
              <TextInput
                value={draft}
                onChangeText={setDraft}
                onSubmitEditing={() => submit(draft)}
                placeholder="İngilizce cevabını yaz…"
                placeholderTextColor={theme.textSecondary}
                returnKeyType="send"
                submitBehavior="submit"
                autoCorrect
                style={[
                  styles.input,
                  { backgroundColor: theme.backgroundElement, color: theme.text },
                ]}
              />
              <Pressable
                onPress={() => submit(draft)}
                disabled={!canSend}
                accessibilityRole="button"
                accessibilityLabel="Gönder"
                hitSlop={8}
                style={!canSend && styles.disabled}>
                <SymbolView
                  name={{ ios: 'arrow.up.circle.fill', android: 'send', web: 'send' }}
                  tintColor={theme.accent}
                  size={34}
                />
              </Pressable>
            </View>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messages: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  context: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    marginBottom: Spacing.two,
    gap: Spacing.one,
  },
  composer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: Spacing.two,
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
  },
  suggestions: {
    gap: Spacing.two,
  },
  suggestion: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one + Spacing.half,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  input: {
    flex: 1,
    minHeight: 40,
    borderRadius: 20,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
  },
  primaryButton: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.4,
  },
});
