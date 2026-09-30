import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition';
import { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import type { LocaleCode } from '../../types/scenario';

export type SpeechState = 'idle' | 'listening' | 'done' | 'error';

/**
 * Cihazın yerleşik konuşma tanıma motoru (iOS: SFSpeechRecognizer, Android: SpeechRecognizer).
 * Native modül olduğu için Expo Go'da çalışmaz → development build gerekir.
 */
export function useSpeechInput(locale: LocaleCode, hints: string[] = []) {
  const [state, setState] = useState<SpeechState>('idle');
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  /** 0..1 ses seviyesi (dalga animasyonu için) */
  const [level, setLevel] = useState(0);

  useSpeechRecognitionEvent('start', () => setState('listening'));
  useSpeechRecognitionEvent('end', () => {
    setLevel(0);
    setState((s) => (s === 'error' ? s : 'done'));
  });
  // Motor -2..10 arası değer yollar; 0 altı sessizlik
  useSpeechRecognitionEvent('volumechange', (e) => setLevel(Math.max(0, Math.min(1, e.value / 10))));
  useSpeechRecognitionEvent('result', (e) => {
    setTranscript(e.results[0]?.transcript ?? '');
  });
  useSpeechRecognitionEvent('error', (e) => {
    // 'no-speech' / 'speech-timeout' hata değil, kullanıcıya "tekrar dene" göster
    setError(e.error);
    setState('error');
  });

  const start = useCallback(async () => {
    setTranscript('');
    setError(null);

    if (!ExpoSpeechRecognitionModule.isRecognitionAvailable()) {
      setError('unavailable');
      setState('error');
      return;
    }
    const perm = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!perm.granted) {
      setError('not-allowed');
      setState('error');
      return;
    }

    // Cihaz içi model varsa kullan (gizlilik + offline). Yoksa sistem motoru
    // yine ücretsizdir; ama ses Apple/Google sunucusuna gidebilir.
    const onDevice =
      Platform.OS === 'ios' && ExpoSpeechRecognitionModule.supportsOnDeviceRecognition();

    ExpoSpeechRecognitionModule.start({
      lang: locale,
      interimResults: true,
      continuous: false,
      maxAlternatives: 3,
      requiresOnDeviceRecognition: onDevice,
      contextualStrings: hints, // beklenen kelimeler → doğruluk artar
      iosTaskHint: 'dictation',
      volumeChangeEventOptions: { enabled: true, intervalMillis: 120 },
      // Android bip sesini kısmak için: androidIntentOptions ile ayarlanabilir
    });
  }, [locale, hints]);

  const stop = useCallback(() => ExpoSpeechRecognitionModule.stop(), []);

  const reset = useCallback(() => {
    setState('idle');
    setTranscript('');
    setError(null);
    setLevel(0);
  }, []);

  return { state, transcript, error, level, start, stop, reset };
}
