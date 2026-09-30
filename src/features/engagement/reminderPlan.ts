import { localDay } from '../progress/day';

export interface PlannedReminder {
  date: Date;
  title: string;
  body: string;
}

/** Nazik, dönüşümlü, suçlamayan metinler (ROADMAP Faz 5). {scene}: günün meydan okuması */
const MESSAGES = [
  { title: 'Günün meydan okuması hazır', body: '{scene} · birkaç dakikalık güvenli bir prova.' },
  { title: 'Kısa bir prova ister misin?', body: 'Bugünün sahnesi: {scene}. Hata yapmak serbest.' },
  { title: 'Serin seni bekliyor', body: '{scene} ile bugün de bir adım at.' },
  { title: 'Kahve molası kadar kısa', body: '{scene}: 3–5 dakikada biter.' },
];

/**
 * Önümüzdeki `days` gün için hatırlatmalar: her gün kendi meydan okumasıyla.
 * Saati geçmiş bugünkü hatırlatma atlanır. `scene(day)` o günün senaryo başlığını döner.
 */
export function reminderPlan(now: Date, time: string, days: number, scene: (day: string) => string | undefined): PlannedReminder[] {
  const [h, m] = time.split(':').map(Number);
  const out: PlannedReminder[] = [];
  for (let i = 0; i < days + 1 && out.length < days; i++) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i, h, m, 0, 0);
    if (date <= now) continue;
    const day = localDay(date);
    const msg = MESSAGES[(date.getDate() + date.getMonth()) % MESSAGES.length];
    const title = scene(day) ?? 'Bugünün sahnesi';
    out.push({ date, title: msg.title, body: msg.body.replace('{scene}', title) });
  }
  return out;
}
