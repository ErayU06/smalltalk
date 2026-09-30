import * as Speech from 'expo-speech';
import { useCallback, useEffect, useState } from 'react';
import type { LocaleCode } from '../../types/scenario';

/**
 * Cihazın yerleşik TTS motoru – internet ve maliyet yok.
 * Not: iOS'ta sessiz mod anahtarı açıksa ses gelmeyebilir; ilk derste kullanıcıya hatırlat.
 */
export function useTTS(locale: LocaleCode) {
  const [speaking, setSpeaking] = useState(false);
  const [voice, setVoice] = useState<string | undefined>();

  useEffect(() => {
    // Varsa "Enhanced"/yüksek kaliteli sesi seç, yoksa sistem varsayılanı
    Speech.getAvailableVoicesAsync().then((voices) => {
      const lang = voices.filter((v) => v.language.replace('_', '-') === locale);
      const best = lang.find((v) => v.quality === Speech.VoiceQuality.Enhanced) ?? lang[0];
      setVoice(best?.identifier);
    });
    return () => {
      Speech.stop();
    };
  }, [locale]);

  const speak = useCallback(
    (text: string, opts: { slow?: boolean } = {}) => {
      Speech.stop();
      Speech.speak(text, {
        language: locale,
        voice,
        rate: opts.slow ? 0.7 : 0.95,
        onStart: () => setSpeaking(true),
        onDone: () => setSpeaking(false),
        onStopped: () => setSpeaking(false),
        onError: () => setSpeaking(false),
      });
    },
    [locale, voice],
  );

  return { speak, speaking, stop: Speech.stop };
}
