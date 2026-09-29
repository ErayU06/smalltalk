import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { Message } from '@/hooks/use-practice-session';
import { useTheme } from '@/hooks/use-theme';

export function MessageBubble({ message }: { message: Message }) {
  const theme = useTheme();
  const mine = message.from === 'me';

  return (
    <View
      style={[
        styles.bubble,
        mine
          ? [styles.mine, { backgroundColor: theme.accent }]
          : [styles.partner, { backgroundColor: theme.backgroundElement }],
      ]}>
      <ThemedText style={mine && { color: theme.onAccent }}>{message.text}</ThemedText>
    </View>
  );
}

export function TypingBubble() {
  const theme = useTheme();

  return (
    <View
      accessibilityLabel="Karşı taraf yazıyor"
      style={[styles.bubble, styles.partner, { backgroundColor: theme.backgroundElement }]}>
      <ThemedText themeColor="textSecondary">•••</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 18,
  },
  mine: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  partner: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
});
