import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  label: string;
  value?: string;
  /** Custom trailing element (e.g. a Switch); replaces `value`. */
  trailing?: ReactNode;
  isLast?: boolean;
};

export function ListRow({ label, value, trailing, isLast }: Props) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.row,
        !isLast && { borderBottomWidth: StyleSheet.hairlineWidth, borderColor: theme.border },
      ]}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      {trailing ?? <ThemedText themeColor="textSecondary">{value}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    paddingVertical: Spacing.two,
    gap: Spacing.three,
  },
  label: {
    flex: 1,
  },
});
