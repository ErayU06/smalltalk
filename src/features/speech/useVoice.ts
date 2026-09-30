import * as Speech from 'expo-speech';
import { useCallback, useEffect, useState } from 'react';
import type { LocaleCode } from '../../types/scenario';
import { pickVoice, prosody, type DeviceVoice, type Speaker } from './voice';

type Cast = { npc?: DeviceVoice; narrator?: DeviceVoice };

/**
 * Karakter sesleri (Faz 1a): cihazdaki en doğal sesi karakterin cinsiyet ve yaşına göre seçer.
 * NPC replikleri karakterin sesiyle, kullanıcının cevapları ("Doğru halini dinle") ayrı bir
 * anlatıcı sesiyle okunur. İnternet ve maliyet yok. Faz 1b'de gömülü ses dosyası varsa o çalınacak.
 * Not: iOS'ta sessiz mod anahtarı açıksa ses gelmeyebilir.
 */
export function useVoice(locale: LocaleCode, npc?: Speaker) {
  const [speaking, setSpeaking] = useState(false);
  const [cast, setCast] = useState<Cast>({});
  const gender = npc?.gender;
  const age = npc?.age;

  useEffect(() => {
    let alive = true;
    Speech.getAvailableVoicesAsync()
      .then((voices) => {
        if (!alive) return;
        const speaker = gender && age !== undefined ? { gender, age } : undefined;
        const npcVoice = pickVoice(voices, locale, speaker);
        setCast({ npc: npcVoice, narrator: pickVoice(voices, locale, undefined, npcVoice?.identifier) });
      })
      .catch(() => undefined);
    return () => {
      alive = false;
      Speech.stop();
    };
  }, [locale, gender, age]);

  const speak = useCallback(
    (text: string, opts: { as?: 'npc' | 'narrator'; slow?: boolean } = {}) => {
      const asNpc = (opts.as ?? 'npc') === 'npc';
      const voice = asNpc ? cast.npc : cast.narrator;
      const { pitch, rate } = prosody(asNpc && gender && age !== undefined ? { gender, age } : undefined, voice, opts.slow);
      Speech.stop();
      Speech.speak(text, {
        language: locale,
        voice: voice?.identifier,
        pitch,
        rate,
        onStart: () => setSpeaking(true),
        onDone: () => setSpeaking(false),
        onStopped: () => setSpeaking(false),
        onError: () => setSpeaking(false),
      });
    },
    [locale, cast, gender, age],
  );

  return { speak, speaking, stop: Speech.stop };
}
