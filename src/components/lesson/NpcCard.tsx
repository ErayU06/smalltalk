import { useState } from 'react';
import { LayoutAnimation, Pressable, StyleSheet, Text, View } from 'react-native';
import { scriptSafe } from '../../theme/text';
import type { Hint, Npc } from '../../types/scenario';
import { useTheme } from '../../theme/useTheme';
import { NpcAvatar } from '../illustrations/NpcAvatar';
import { Icon } from '../ui/Icon';
import { IconButton, Pill } from '../ui/Primitives';

type Props = {
  npc: Npc;
  line: string;
  hint?: Hint;
  onSpeak: () => void;
  /** stage: ortalanmış büyük avatar (çoktan seçmeli) · card: üst satırda avatar (yazma) · inline: yanda avatar (konuşma) */
  variant?: 'stage' | 'card' | 'inline';
  speaking?: boolean;
  /** zh/ko/ru: repliğin okunuşu; düğmeyle açılıp kapanır */
  roman?: string;
  showRoman?: boolean;
  onToggleRoman?: () => void;
};

/** Stitch NPC kartı: avatar + diyalog balonu + dinle butonu + açılır Türkçe ipucu. */
export function NpcCard({ npc, line, hint, onSpeak, variant = 'card', speaking, roman, showRoman, onToggleRoman }: Props) {
  const { c, radius, type, elevation } = useTheme();

  const bubble = (
    <View style={[styles.bubble, { backgroundColor: variant === 'card' ? c.surfaceLow : c.surface, borderRadius: radius.md },
      variant !== 'card' && { shadowColor: c.shadow, ...elevation.card }]}>
      <View style={styles.lineRow}>
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={[type.npc, { color: c.text }, scriptSafe(line)]} accessibilityRole="text">“{line}”</Text>
          {roman && showRoman ? <Text style={[type.body, { color: c.textMuted, fontStyle: 'italic' }]}>{roman}</Text> : null}
        </View>
        <IconButton icon="speaker" label={speaking ? 'Okunuyor' : 'Sesli dinle'} tone={variant === 'card' ? 'surface' : 'low'} onPress={onSpeak} size={40} />
      </View>
      {roman && onToggleRoman ? (
        <Text onPress={onToggleRoman} accessibilityRole="button" style={[type.label, { color: c.primary, fontFamily: type.labelLg.fontFamily, alignSelf: 'flex-start', paddingVertical: 4 }]}>
          {showRoman ? 'Okunuşu gizle' : 'Okunuşu göster'}
        </Text>
      ) : null}
      {hint ? <HintAccordion hint={hint} /> : null}
    </View>
  );

  if (variant === 'inline') {
    return (
      <View style={styles.inline}>
        <NpcAvatar look={npc.look} size={56} />
        <View style={{ flex: 1, gap: 6 }}>
          <View style={styles.nameRow}>
            <Text style={[type.label, { color: c.text, fontFamily: type.labelLg.fontFamily }]}>{npc.name}</Text>
            <Text style={[type.caption, { color: c.textMuted }]}>{npc.mood}</Text>
          </View>
          {bubble}
        </View>
      </View>
    );
  }

  if (variant === 'stage') {
    return (
      <View style={[styles.stage, { backgroundColor: c.surfaceLow, borderRadius: radius.lg }]}>
        <View style={[styles.blob, { backgroundColor: c.primarySoft }]} />
        <View>
          <NpcAvatar look={npc.look} size={72} />
          <View style={[styles.nameTag, { backgroundColor: c.surface }]}>
            <View style={[styles.dot, { backgroundColor: c.tertiaryAccent }]} />
            <Text style={[type.caption, { color: c.text, fontFamily: type.labelLg.fontFamily }]}>{npc.name}</Text>
          </View>
        </View>
        <View style={{ alignSelf: 'stretch' }}>{bubble}</View>
      </View>
    );
  }

  return (
    <View style={[styles.card, { backgroundColor: c.surface, borderRadius: radius.lg, shadowColor: c.shadow }, elevation.raised]}>
      <View style={[styles.blob, { backgroundColor: c.primarySoft }]} />
      <View style={styles.header}>
        <View style={styles.who}>
          <NpcAvatar look={npc.look} size={48} />
          <View>
            <Text style={[type.labelLg, { color: c.text }]}>{npc.name}</Text>
            <Text style={[type.caption, { color: c.textMuted }]}>{npc.mood}</Text>
          </View>
        </View>
        {npc.place ? <Pill tone="neutral" icon="signpost" iconColor={c.primary} label={npc.place} size="sm" /> : null}
      </View>
      {bubble}
    </View>
  );
}

export function HintAccordion({ hint }: { hint: Hint }) {
  const { c, type, radius } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <View>
      <Pressable
        accessibilityRole="button"
        aria-expanded={open}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setOpen((o) => !o);
        }}
        style={[styles.hintBtn, { backgroundColor: c.tertiaryTint, borderRadius: radius.sm }]}
      >
        <View style={styles.hintLabel}>
          <Icon name="lightbulb" size={18} color={c.tertiary} />
          <Text style={[type.label, { color: c.tertiary, fontFamily: type.labelLg.fontFamily }]}>Türkçe ipucu</Text>
        </View>
        <View style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}>
          <Icon name="chevronDown" size={18} color={c.tertiary} />
        </View>
      </Pressable>
      {open ? (
        <View style={[styles.hintBody, { backgroundColor: c.surface, borderRadius: radius.sm }]}>
          <Text style={[type.body, { color: c.text }]}>{hint.tr}</Text>
          {hint.example ? (
            <Text style={[type.label, { color: c.textMuted }]}>
              Örnek: <Text style={{ color: c.primary }}>“{hint.example}”</Text>
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: { padding: 14, gap: 10, borderTopLeftRadius: 4 },
  lineRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  inline: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  nameRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
  stage: { padding: 16, alignItems: 'center', gap: 10, overflow: 'hidden' },
  nameTag: { position: 'absolute', bottom: -4, right: -14, flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  card: { padding: 16, gap: 14, overflow: 'hidden' },
  blob: { position: 'absolute', right: -40, top: -40, width: 120, height: 120, borderRadius: 60, opacity: 0.45 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  who: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  hintBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8, paddingHorizontal: 10, minHeight: 40 },
  hintLabel: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  hintBody: { marginTop: 8, padding: 12, gap: 4 },
});
