import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Icon } from '../ui/Icon';

/**
 * Stitch'in 72×72 çift nabızlı mikrofon butonu.
 * Dış halka: ping (2.4 sn), iç halka: yumuşak nabız. "Hareketi azalt" açıksa animasyon durur.
 */
export function MicButton({ listening, onPress, disabled }: { listening: boolean; onPress: () => void; disabled?: boolean }) {
  const { c } = useTheme();
  const [ping] = useState(() => new Animated.Value(0));
  const [soft] = useState(() => new Animated.Value(0));

  useEffect(() => {
    let loops: Animated.CompositeAnimation[] = [];
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled().then((reduce) => {
      if (cancelled || reduce || !listening) return;
      loops = [
        Animated.loop(Animated.timing(ping, { toValue: 1, duration: 2400, easing: Easing.out(Easing.quad), useNativeDriver: true })),
        Animated.loop(Animated.sequence([
          Animated.timing(soft, { toValue: 1, duration: 900, useNativeDriver: true }),
          Animated.timing(soft, { toValue: 0, duration: 900, useNativeDriver: true }),
        ])),
      ];
      loops.forEach((l) => l.start());
    });
    return () => {
      cancelled = true;
      loops.forEach((l) => l.stop());
      ping.setValue(0);
      soft.setValue(0);
    };
  }, [listening, ping, soft]);

  return (
    <View style={styles.wrap}>
      {listening ? (
        <>
          <Animated.View style={[styles.ring, { backgroundColor: c.brand, opacity: ping.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0] }), transform: [{ scale: ping.interpolate({ inputRange: [0, 1], outputRange: [1, 1.6] }) }] }]} />
          <Animated.View style={[styles.ring, { width: 96, height: 96, borderRadius: 48, backgroundColor: c.brand, opacity: soft.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.45] }), transform: [{ scale: soft.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] }) }] }]} />
        </>
      ) : null}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={listening ? 'Dinlemeyi bitir' : 'Konuşmaya başla'}
        aria-disabled={!!disabled}
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [styles.btn, { shadowColor: c.buttonGlow, opacity: disabled ? 0.5 : 1, transform: [{ scale: pressed ? 0.92 : 1 }] }]}
      >
        <LinearGradient colors={c.buttonGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.inner, { borderBottomColor: c.buttonDepth }]}>
          <Icon name="mic" size={34} color={c.onButton} strokeWidth={2.4} />
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: 112, height: 112, alignItems: 'center', justifyContent: 'center' },
  ring: { position: 'absolute', width: 112, height: 112, borderRadius: 56 },
  btn: { borderRadius: 36, shadowOpacity: 0.45, shadowRadius: 14, shadowOffset: { width: 0, height: 10 }, elevation: 8 },
  inner: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 4 },
});
