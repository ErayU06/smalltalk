import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme, type Theme } from '../../theme/useTheme';
import { Mascot } from '../illustrations/Mascot';
import { Icon } from '../ui/Icon';

/** Stitch paywall banner: mercan → lavanta → kehribar geçiş, parlak rozet, koç balonu. */
export function PaywallHero() {
  const t = useTheme();
  const s = styles(t);
  return (
    <LinearGradient colors={t.c.heroGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.card}>
      <View style={s.iconWrap}>
        <LinearGradient colors={['#FF6B4A', '#D78900']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={s.iconCircle}>
          <Icon name="sparkle" size={34} color="#FFFFFF" />
        </LinearGradient>
        <View style={s.iconDot} />
      </View>

      <Text style={s.title} accessibilityRole="header">Talkwell Pro ile Konuşma Sınırlarını Kaldır</Text>
      <Text style={s.subtitle}>Asla yargılanmayacağın, dilediğin kadar hata yapıp öğrenebileceğin sınırsız prova alanı.</Text>

      <View style={s.coachRow}>
        <View style={s.mascotCircle}><Mascot mood="happy" size={42} /></View>
        <View style={s.bubble}>
          <Text style={s.bubbleLabel}>Yol arkadaşın diyor ki:</Text>
          <Text style={s.bubbleText}>“Hata yapmak burada en doğal hakkın!”</Text>
          <View style={s.heart}><Icon name="heart" size={15} color="#FF6B4A" /></View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = ({ c, radius, type, fonts, elevation }: Theme) =>
  StyleSheet.create({
    card: { borderRadius: radius.lg, padding: 20, paddingTop: 24, alignItems: 'center', gap: 10 },
    iconWrap: { width: 72, height: 72, marginBottom: 4 },
    iconCircle: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center', shadowColor: c.buttonGlow, ...elevation.glow },
    iconDot: { position: 'absolute', right: -2, top: -2, width: 18, height: 18, borderRadius: 9, backgroundColor: c.primary, borderWidth: 3, borderColor: c.primarySoft },
    title: { ...type.headlineLg, fontFamily: fonts.extrabold, color: c.text, textAlign: 'center' },
    subtitle: { ...type.body, color: c.textMuted, textAlign: 'center', maxWidth: 300 },
    coachRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 },
    mascotCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: c.surface, alignItems: 'center', justifyContent: 'center', shadowColor: c.shadow, ...elevation.card },
    bubble: { flexShrink: 1, backgroundColor: c.surface, opacity: 0.95, borderRadius: 14, paddingVertical: 8, paddingLeft: 14, paddingRight: 32 },
    bubbleLabel: { ...type.caption, color: c.textMuted },
    bubbleText: { fontFamily: fonts.semibold, fontSize: 13, lineHeight: 18, color: c.text },
    heart: { position: 'absolute', right: 10, bottom: 9 },
  });
