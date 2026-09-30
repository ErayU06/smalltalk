import { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';

const BASE = [12, 24, 36, 44, 28, 40, 20, 32, 16, 40, 24, 12];

/**
 * Ses dalgası. `level` (0..1) expo-speech-recognition'ın volumechange olayından gelir;
 * gelmezse (ör. Android eski sürüm) sabit hafif hareket gösterilir.
 */
export function Waveform({ active, level }: { active: boolean; level: number }) {
  const { c, radius } = useTheme();
  const [anim] = useState(() => new Animated.Value(0.4));

  useEffect(() => {
    Animated.timing(anim, { toValue: active ? Math.max(0.35, Math.min(1, level)) : 0.35, duration: 120, useNativeDriver: true }).start();
  }, [active, level, anim]);

  return (
    <View aria-hidden style={[styles.box, { backgroundColor: c.surfaceLow, borderRadius: radius.md }]}>
      {BASE.map((h, i) => (
        <Animated.View
          key={i}
          style={{
            width: 6, height: h, borderRadius: 3,
            backgroundColor: i % 2 ? c.buttonGradient[0] : c.brand,
            transform: [{ scaleY: anim.interpolate({ inputRange: [0, 1], outputRange: [0.3, i % 3 === 0 ? 1 : 0.8] }) }],
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
});
