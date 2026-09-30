import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Icon, type IconName } from './Icon';

export type ButtonVariant = 'primary' | 'success' | 'tertiary' | 'soft' | 'ghost';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: 'md' | 'sm';
  shape?: 'pill' | 'rounded';
  icon?: IconName;
  iconRight?: IconName;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityHint?: string;
  children?: ReactNode;
};

/**
 * Stitch butonu. primary = mercan degrade + parlak mercan gölge (Stitch'in "glow"u).
 * Basınca %98 ölçek (Stitch: active:scale-[0.98]).
 */
export function Button({
  label, onPress, variant = 'primary', size = 'md', shape = 'pill', icon, iconRight,
  loading, disabled, style, accessibilityHint,
}: Props) {
  const { c, radius, type, elevation } = useTheme();
  const height = size === 'md' ? 54 : 44;
  const r = shape === 'pill' ? radius.pill : size === 'md' ? radius.md : radius.sm;

  const solid: Record<Exclude<ButtonVariant, 'primary'>, { bg: string; fg: string }> = {
    success: { bg: c.success, fg: c.onSuccess },
    tertiary: { bg: c.tertiary, fg: c.surface },
    soft: { bg: c.surfaceHigh, fg: c.text },
    ghost: { bg: 'transparent', fg: c.text },
  };
  const fg = variant === 'primary' ? c.onButton : solid[variant].fg;

  const content = loading ? (
    <ActivityIndicator color={fg} />
  ) : (
    <View style={styles.row}>
      {icon ? <Icon name={icon} size={20} color={fg} /> : null}
      <Text style={[size === 'md' ? type.labelLg : type.label, { color: fg, fontFamily: type.labelLg.fontFamily }]}>{label}</Text>
      {iconRight ? <Icon name={iconRight} size={20} color={fg} /> : null}
    </View>
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      aria-disabled={!!disabled} aria-busy={!!loading}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        { borderRadius: r, opacity: disabled ? 0.5 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
        variant === 'primary' && !disabled && { shadowColor: c.buttonGlow, ...elevation.glow, shadowOpacity: 0.4 },
        style,
      ]}
    >
      {variant === 'primary' ? (
        <LinearGradient colors={c.buttonGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.inner, { height, borderRadius: r }]}>
          {content}
        </LinearGradient>
      ) : (
        <View style={[styles.inner, { height, borderRadius: r, backgroundColor: solid[variant].bg }]}>{content}</View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  inner: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
});
