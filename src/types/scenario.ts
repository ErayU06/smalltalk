export type TargetLang = 'en' | 'de' | 'fr' | 'ru' | 'zh' | 'ko';

export type LocaleCode = 'en-US' | 'en-GB' | 'de-DE' | 'fr-FR' | 'ru-RU' | 'zh-CN' | 'ko-KR';

/** Çizim ailesi: gerçek görsel yokken Scene/ScenarioCard hangi SVG sahneyi çizecek */
export type Setting = 'cafe' | 'street' | 'campus' | 'shop' | 'hotel' | 'work';

export type NpcLook = 'barista' | 'tourist' | 'professor' | 'receptionist';

export type Level = 'Başlangıç' | 'Orta' | 'Akademik' | 'İleri';

export type RoleId =
  | 'barista' | 'tourist' | 'professor' | 'receptionist' | 'cashier' | 'waiter' | 'neighbor' | 'pharmacist'
  | 'doctor' | 'colleague' | 'interviewer' | 'landlord' | 'shop-assistant' | 'ticket-agent' | 'airline-agent'
  | 'new-friend' | 'phone-receptionist';

export interface Npc {
  name: string;
  /** Kartın altındaki kısa bağlam: "Haritada kararsız görünüyor" */
  mood: string;
  look: NpcLook;
  gender: 'f' | 'm';
  age: number;
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
  /** NPC repliği – ses olarak çalınır */
  npcLine: string;
  /** zh/ko/ru: NPC repliğinin okunuşu (kılavuz §5) */
  npcRoman?: string;
  hint?: Hint;
}

export interface ChoiceOption {
  text: string;
  /** zh/ko/ru: şıkkın okunuşu */
  roman?: string;
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
  /** İlki kanonik cevaptır ("Doğru halini dinle" bundan üretilir) */
  acceptedAnswers: string[];
  /** zh/ko/ru: kanonik cevabın okunuşu */
  answerRoman?: string;
  /** Her gruptan en az bir kelime geçmeli */
  keywords: string[][];
  /** Dokun-ekle kelime bankası / hızlı kalıplar */
  wordBank?: string[];
  /** "Neredeyse" durumunda gösterilecek kısa neden */
  why?: string;
  /** Sık yapılan hatalar: normalize edilmiş cevapta aranır; eşleşirse sonuç "Neredeyse" olur */
  mistakes?: { match: string; tip: string }[];
}

export type Step = ChoiceStep | OpenStep;

/** Kelime sandığına giden kart: hedef dilde ifade + Türkçe anlamı */
export interface VocabItem {
  text: string;
  tr: string;
  roman?: string;
}

/** Dil bağımsız iskelet: src/data/scenarios/<id>/index.ts */
export interface ScenarioSkeleton {
  id: string;
  setting: Setting;
  level: Level;
  minutes: number;
  xp: number;
  isPremium: boolean;
  role: RoleId;
}

/** Dil varyantı: src/data/scenarios/<id>/<dil>.ts — çeviri değil, o kültüre uyarlanmış sahne */
export interface ScenarioVariant {
  locale: LocaleCode;
  /** Türkçe başlık ve açıklama (varyanta göre renklenebilir) */
  title: string;
  description: string;
  placeLabel: string;
  /** Ders ekranındaki kısa bağlam (Türkçe) */
  mood: string;
  place?: string;
  pattern: { text: string; roman?: string; note: string };
  steps: Step[];
  /** Ders sonunda kelime sandığına eklenenler */
  vocab: VocabItem[];
  /** Sürpriz sorular (Faz 6): ana akışa girmez */
  curveballs?: string[];
}

/** Ekranların kullandığı birleşik senaryo: iskelet + seçili dilin varyantı + karakter */
export interface Scenario extends ScenarioSkeleton, Omit<ScenarioVariant, 'mood' | 'place'> {
  lang: TargetLang;
  npc: Npc;
}

/** Bir senaryonun tüm dilleri: klasörün index.ts'i bunu dışa aktarır */
export interface ScenarioDef {
  skeleton: ScenarioSkeleton;
  variants: Partial<Record<TargetLang, ScenarioVariant>>;
}
