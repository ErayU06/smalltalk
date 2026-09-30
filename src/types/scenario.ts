export type LocaleCode = 'en-US' | 'en-GB' | 'de-DE' | 'es-ES' | 'fr-FR' | 'tr-TR';

export type Setting = 'cafe' | 'street' | 'campus' | 'shop' | 'hotel' | 'work';

export type NpcLook = 'barista' | 'tourist' | 'professor' | 'receptionist';

export interface Npc {
  name: string;
  /** Kartın altındaki kısa bağlam: "Haritada kararsız görünüyor" */
  mood: string;
  look: NpcLook;
  /** Yer etiketi: "Oxford St." */
  place?: string;
}

export interface Hint {
  /** Türkçe yönlendirme */
  tr: string;
  /** Örnek taslak cümle (hedef dilde) */
  example?: string;
}

interface BaseStep {
  id: string;
  /** NPC repliği – cihaz TTS ile okunur */
  npcLine: string;
  hint?: Hint;
}

export interface ChoiceOption {
  text: string;
  correct: boolean;
  /** Seçilirse gösterilecek kısa açıklama (yanlışsa "neden"i anlatır, asla azarlamaz) */
  feedback?: string;
  /** Anlam doğru ama üslup sorunlu → "Neredeyse" (ör. "Give me…") */
  near?: boolean;
}

export interface ChoiceStep extends BaseStep {
  kind: 'choice';
  prompt: string;
  options: ChoiceOption[];
}

/** Metin ve ses adımları aynı değerlendirmeyi (matchAnswer) kullanır */
export interface OpenStep extends BaseStep {
  kind: 'text' | 'speech';
  acceptedAnswers: string[];
  /** Her gruptan en az bir kelime geçmeli */
  keywords: string[][];
  /** Dokun-ekle kelime bankası / hızlı kalıplar */
  wordBank?: string[];
  /** "Neredeyse" durumunda gösterilecek kısa neden */
  why?: string;
  /** Sık yapılan hatalar: eşleşirse sonuç "Neredeyse" olur, ipucu gösterilir */
  mistakes?: { match: string; tip: string }[];
}

export type Step = ChoiceStep | OpenStep;

export interface Scenario {
  id: string;
  title: string;
  description: string;
  setting: Setting;
  /** Kart etiketi: "3. Nesil Kafe", "Şehir" */
  placeLabel: string;
  locale: LocaleCode;
  level: 'Başlangıç' | 'Orta' | 'Akademik' | 'İleri';
  minutes: number;
  xp: number;
  isPremium: boolean;
  npc: Npc;
  /** Ders sonunda "yeni kalıp rozeti" olarak gösterilir */
  pattern: { text: string; note: string };
  steps: Step[];
}
