import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { AccessibilityInfo, Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Verdict } from '../../features/lesson/matchAnswer';
import { scriptSafe, upperTR } from '../../theme/text';
import { useTheme } from '../../theme/useTheme';
import { Button } from '../ui/Button';
import { Icon, type IconName } from '../ui/Icon';

export type FeedbackContent = {
  verdict: Verdict;
  /** 0..1 – "beklenen cevaba yakınlık" (telaffuz puanı DEĞİL) */
  score: number;
  xp: number;
  userText?: string;
  suggestion?: string;
  /** zh/ko/ru: önerinin okunuşu */
  suggestionRoman?: string;
  explanation?: string;
};

type Props = FeedbackContent & {
  bottomInset: number;
  onContinue: () => void;
  onRetry?: () => void;
  onListen?: () => void;
  onSave?: () => void;
};

/** Stitch alt paneli: 3 durum, asla kırmızı. Başlık bloğu → açıklama kartları → duruma göre ana buton. */
export function FeedbackSheet({ verdict, score, xp, userText, suggestion, suggestionRoman, explanation, bottomInset, onContinue, onRetry, onListen, onSave }: Props) {
  const { c, radius, type, fonts } = useTheme();
  const [slide] = useState(() => new Animated.Value(1));

  const cfg = {
    correct: { bg: c.successSoft, iconBg: c.success, icon: 'check' as IconName, iconColor: c.onSuccess, title: 'Harika!', titleColor: c.success, sub: 'Çok doğal ve akıcı bir ifade kullandın.', cta: 'Sonraki adıma geç', variant: 'success' as const },
    almost: { bg: c.tertiaryTint, iconBg: c.tertiaryBright, icon: 'lightbulb' as IconName, iconColor: c.onTertiarySoft, title: 'Küçük bir nüans var', titleColor: c.text, sub: 'Anlaşıldın! Bir tık daha doğal duyulabilir.', cta: 'Anladım, devam et', variant: 'tertiary' as const },
    wrong: { bg: c.primaryTint, iconBg: c.buttonGradient[0], icon: 'smile' as IconName, iconColor: c.onButton, title: 'Endişelenme!', titleColor: c.onPrimaryTint, sub: 'Prova tam da bunun için var. Birlikte bakalım.', cta: 'Birlikte tekrar deneyelim', variant: 'primary' as const },
  }[verdict];

  useEffect(() => {
    Animated.spring(slide, { toValue: 0, damping: 18, stiffness: 180, useNativeDriver: true }).start();
    AccessibilityInfo.announceForAccessibility(`${cfg.title} ${cfg.sub}`);
    if (verdict === 'correct') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    else if (verdict === 'almost') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // wrong: bilerek titreşim yok (ceza hissi vermesin)
  }, [slide, verdict, cfg.title, cfg.sub]);

  return (
    <View style={StyleSheet.absoluteFill} accessibilityViewIsModal>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: c.scrim }]} />
      <Animated.View
        style={[styles.sheet, { backgroundColor: c.surface, borderTopLeftRadius: radius.sheet, borderTopRightRadius: radius.sheet, paddingBottom: Math.max(bottomInset, 16) + 8,
          transform: [{ translateY: slide.interpolate({ inputRange: [0, 1], outputRange: [0, 500] }) }] }]}
      >
        <View style={[styles.handle, { backgroundColor: c.surfaceHighest }]} />

        <View style={[styles.head, { backgroundColor: cfg.bg, borderRadius: radius.md }]}>
          {verdict === 'wrong' ? (
            <LinearGradient colors={c.buttonGradient} style={styles.headIcon}><Icon name={cfg.icon} size={26} color={cfg.iconColor} /></LinearGradient>
          ) : (
            <View style={[styles.headIcon, { backgroundColor: cfg.iconBg }]}><Icon name={cfg.icon} size={26} color={cfg.iconColor} strokeWidth={verdict === 'correct' ? 3 : 2.2} /></View>
          )}
          <View style={{ flex: 1 }}>
            <Text style={[type.headlineLg, { fontFamily: fonts.extrabold, fontSize: 21, lineHeight: 28, color: cfg.titleColor }]}>{cfg.title}</Text>
            <Text style={[type.caption, { fontSize: 13, color: c.textSubtle }]}>{cfg.sub}</Text>
          </View>
          <View style={[styles.xp, { backgroundColor: c.surface }]}><Text style={{ fontFamily: fonts.extrabold, fontSize: 13, color: cfg.titleColor === c.text ? c.tertiary : cfg.titleColor }}>+{xp} XP</Text></View>
        </View>

        {verdict === 'correct' ? (
          <View style={[styles.block, { backgroundColor: c.surfaceLow, borderRadius: radius.md }]}>
            <View style={styles.between}>
              <Text style={[type.overline, { color: c.textMuted }]}>{upperTR('Beklenen cevaba yakınlık')}</Text>
              <Text style={{ fontFamily: fonts.bold, color: c.success }}>%{Math.round(score * 100)}</Text>
            </View>
            <View style={{ height: 10, borderRadius: 5, backgroundColor: c.surfaceHighest }}>
              <View style={{ width: `${Math.round(score * 100)}%`, height: 10, borderRadius: 5, backgroundColor: c.success }} />
            </View>
            {explanation ? <Text style={[type.body, { color: c.text, fontSize: 14 }]}>{explanation}</Text> : null}
          </View>
        ) : (
          <View style={[styles.block, { backgroundColor: c.surfaceLow, borderRadius: radius.md, gap: 4 }]}>
            {userText ? (
              <View style={[styles.cmp, { backgroundColor: c.surface, borderRadius: radius.sm }]}>
                <Text style={[type.caption, { color: c.textMuted }]}>Senin cümlen</Text>
                <Text style={[type.body, { color: c.text, fontFamily: fonts.semibold }, scriptSafe(userText)]}>“{userText}”</Text>
              </View>
            ) : null}
            {userText && suggestion ? <View style={{ alignSelf: 'center' }}><Icon name="arrowDown" size={18} color={c.tertiary} /></View> : null}
            {suggestion ? (
              <View style={[styles.cmp, { backgroundColor: c.surface, borderRadius: radius.sm }]}>
                <View style={styles.between}>
                  <Text style={[type.caption, { color: verdict === 'almost' ? c.tertiary : c.primary, fontFamily: fonts.bold }]}>{verdict === 'almost' ? 'Daha doğal' : 'Örnek kalıp'}</Text>
                  {onListen ? (
                    <Pressable accessibilityRole="button" accessibilityLabel="Doğru halini dinle" onPress={onListen} hitSlop={10} style={styles.listen}>
                      <Icon name="speaker" size={16} color={c.primary} /><Text style={[type.label, { color: c.primary }]}>Dinle</Text>
                    </Pressable>
                  ) : null}
                </View>
                <Text style={[type.bodyLg, { color: c.text, fontFamily: fonts.bold }, scriptSafe(suggestion)]}>“{suggestion}”</Text>
                {suggestionRoman ? <Text style={[type.caption, { color: c.textMuted, fontStyle: 'italic' }]}>{suggestionRoman}</Text> : null}
              </View>
            ) : null}
          </View>
        )}

        {verdict !== 'correct' && explanation ? (
          <Text style={[type.body, { color: c.text, fontSize: 14 }]}><Text style={{ fontFamily: fonts.bold }}>Neden? </Text>{explanation}</Text>
        ) : null}

        <View style={{ gap: 8 }}>
          <Button label={cfg.cta} variant={cfg.variant} iconRight={verdict === 'wrong' ? 'mic' : 'arrowRight'} onPress={verdict === 'wrong' && onRetry ? onRetry : onContinue} />
          <View style={styles.secondaryRow}>
            {verdict !== 'wrong' && onRetry ? <Button style={{ flex: 1 }} label="Tekrar dene" variant="soft" size="sm" shape="rounded" icon="refresh" onPress={onRetry} /> : null}
            {verdict === 'wrong' ? <Button style={{ flex: 1 }} label="Geç, devam et" variant="soft" size="sm" shape="rounded" onPress={onContinue} /> : null}
            {onSave ? <Button style={{ flex: 1 }} label="Cümleyi kaydet" variant="soft" size="sm" shape="rounded" icon="bookmark" onPress={onSave} /> : null}
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 20, paddingTop: 12, gap: 14 },
  handle: { alignSelf: 'center', width: 48, height: 6, borderRadius: 3 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  headIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  xp: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  block: { padding: 14, gap: 8 },
  between: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cmp: { paddingVertical: 10, paddingHorizontal: 12, gap: 2 },
  listen: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  secondaryRow: { flexDirection: 'row', gap: 8 },
});
