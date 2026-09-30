import { Image, StyleSheet, Text, View } from 'react-native';
import type { Testimonial } from '../../features/paywall/paywallConfig';
import { useTheme, type Theme } from '../../theme/useTheme';
import { Icon } from '../ui/Icon';

/**
 * Sosyal kanıt kartı. Sadece gerçek, izinli yorumlarla kullan.
 * `placeholder` true ise (yalnızca __DEV__) düzen köşeli parantezli yer tutucuyla gösterilir.
 */
export function TestimonialCard({ item, placeholder = false }: { item: Testimonial; placeholder?: boolean }) {
  const t = useTheme();
  const s = styles(t);
  const initials = item.author.replace(/[^\p{L} ]/gu, '').split(' ').filter(Boolean).map((w) => w[0]).join('').slice(0, 2);
  return (
    <View style={s.card} accessible accessibilityLabel={`${item.rating} yıldız. ${item.quote}. ${item.author}, ${item.meta}`}>
      {item.avatarUri ? (
        <Image source={{ uri: item.avatarUri }} style={s.avatar} />
      ) : (
        <View style={[s.avatar, s.avatarFallback]}><Text style={s.initials}>{initials || '?'}</Text></View>
      )}
      <View style={s.body}>
        <View style={s.stars}>
          {Array.from({ length: 5 }, (_, i) => <Icon key={i} name="star" size={15} color={i < item.rating ? t.c.star : t.c.surfaceHighest} />)}
          {placeholder ? <Text style={s.devTag}>ÖRNEK</Text> : null}
        </View>
        <Text style={s.quote}>“{item.quote}”</Text>
        <Text style={s.meta}>{item.author} · {item.meta}</Text>
      </View>
    </View>
  );
}

const styles = ({ c, radius, type, fonts }: Theme) =>
  StyleSheet.create({
    card: { flexDirection: 'row', gap: 14, alignItems: 'center', backgroundColor: c.surfaceLow, borderRadius: radius.md, padding: 16 },
    avatar: { width: 48, height: 48, borderRadius: 24 },
    avatarFallback: { backgroundColor: c.primarySoft, alignItems: 'center', justifyContent: 'center' },
    initials: { fontFamily: fonts.extrabold, fontSize: 16, color: c.onPrimarySoft },
    body: { flex: 1, gap: 4 },
    stars: { flexDirection: 'row', alignItems: 'center', gap: 2 },
    devTag: { marginLeft: 'auto', fontFamily: fonts.bold, fontSize: 10, color: c.onSecondarySoft, letterSpacing: 0.6 },
    quote: { fontFamily: fonts.medium, fontSize: 13, lineHeight: 19, color: c.text },
    meta: { ...type.caption, color: c.textMuted },
  });
