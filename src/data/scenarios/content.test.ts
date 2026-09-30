import { describe, expect, it } from '@jest/globals';
import { matchAnswer } from '../../features/lesson/matchAnswer';
import type { OpenStep, TargetLang } from '../../types/scenario';
import { DEFS } from './index';

/** docs/ICERIK-KILAVUZU.md §2 kurallarının makinece kontrol edilebilenleri */
const ROMANIZED: TargetLang[] = ['zh', 'ko', 'ru'];

describe.each(DEFS.map((d) => [d.skeleton.id, d] as const))('%s', (_id, def) => {
  const langs = Object.keys(def.variants) as TargetLang[];

  it('İngilizce varyantı var', () => expect(def.variants.en).toBeDefined());

  it('her dilde adım kimlikleri aynı', () => {
    const ids = def.variants.en!.steps.map((s) => s.id);
    for (const l of langs) expect(def.variants[l]!.steps.map((s) => s.id)).toEqual(ids);
  });

  describe.each(langs)('%s', (lang) => {
    const v = def.variants[lang]!;

    it('yerel ayar dille uyumlu', () => expect(v.locale.split('-')[0]).toBe(lang));
    it('4–6 adım, benzersiz kimlik, kapanış konuşma adımı', () => {
      expect(v.steps.length).toBeGreaterThanOrEqual(4);
      expect(v.steps.length).toBeLessThanOrEqual(6);
      expect(new Set(v.steps.map((s) => s.id)).size).toBe(v.steps.length);
      expect(v.steps[v.steps.length - 1].kind).toBe('speech');
    });
    it('kalıp rozeti ve kelime sandığı dolu', () => {
      expect(v.pattern.text).toBeTruthy();
      expect(v.vocab.length).toBeGreaterThanOrEqual(3);
    });

    it.each(v.steps.map((s) => [s.id, s] as const))('%s kurallara uyuyor', (_sid, step) => {
      expect(step.hint?.tr).toBeTruthy();
      if (ROMANIZED.includes(lang)) expect(step.npcRoman).toBeTruthy();
      if (step.kind === 'choice') {
        expect(step.options).toHaveLength(3);
        expect(step.options.filter((o) => o.correct)).toHaveLength(1);
        expect(step.options.filter((o) => o.near)).toHaveLength(1);
        for (const o of step.options) expect(o.feedback).toBeTruthy();
        if (ROMANIZED.includes(lang)) for (const o of step.options) expect(o.roman).toBeTruthy();
        return;
      }
      const open = step as OpenStep;
      expect(open.acceptedAnswers.length).toBeGreaterThanOrEqual(3);
      expect(open.acceptedAnswers.length).toBeLessThanOrEqual(6);
      if (ROMANIZED.includes(lang)) expect(open.answerRoman).toBeTruthy();
      for (const m of open.mistakes ?? []) expect(() => new RegExp(m.match, 'u')).not.toThrow();
      for (const answer of open.acceptedAnswers) {
        const r = matchAnswer(answer, open.acceptedAnswers, open.keywords, open.mistakes, lang);
        expect({ answer, verdict: r.verdict }).toEqual({ answer, verdict: 'correct' });
      }
    });
  });
});
