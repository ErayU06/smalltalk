import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Icon } from '../ui/Icon';

type Props = { letter: string; text: string; selected: boolean; disabled?: boolean; onPress: () => void };

/** Stitch seçenek kartı: harf rozeti + metin + sağda onay dairesi. Seçili: açık mercan zemin. */
export function OptionCard({ letter, text, selected, disabled, onPress }: Props) {
  const { c, radius, type, elevation } = useTheme();
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled: !!disabled }}
      accessibilityLabel={`${letter}: ${text}`}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { borderRadius: radius.md, backgroundColor: selected ? c.primarySoft : c.surface, shadowColor: selected ? c.buttonGlow : c.shadow, transform: [{ scale: pressed ? 0.99 : 1 }] },
        selected ? { ...elevation.raised, shadowOpacity: 0.25 } : elevation.card,
      ]}
    >
      <View style={styles.left}>
        <View style={[styles.badge, { backgroundColor: selected ? c.buttonGradient[0] : c.surfaceContainer }]}>
          <Text style={[type.labelLg, { color: selected ? c.onButton : c.text }]}>{letter}</Text>
        </View>
        <Text style={[type.body, { color: c.text, fontFamily: type.label.fontFamily, flex: 1 }]}>“{text}”</Text>
      </View>
      <View style={[styles.check, { backgroundColor: selected ? c.buttonGradient[0] : c.surfaceHigh }]}>
        {selected ? <Icon name="check" size={14} color={c.onButton} strokeWidth={3.2} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { minHeight: 64, padding: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  left: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  badge: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  check: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});
