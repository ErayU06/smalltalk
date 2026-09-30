import { describe, expect, it } from '@jest/globals';
import { matchAnswer, normalize } from './matchAnswer';

const accepted = ['For here, please.', 'To go, please.'];
const kw = [['here', 'go', 'take away', 'takeaway']];

describe('matchAnswer', () => {
  it('noktalama ve büyük harfi yok sayar', () => {
    expect(matchAnswer('for here please', accepted, kw).verdict).toBe('correct');
  });
  it('anahtar kelime içeren farklı cümleyi kabul eder', () => {
    expect(matchAnswer("I'll have it to go", accepted, kw).verdict).toBe('correct');
  });
  it('alakasız cevabı reddeder', () => {
    expect(matchAnswer('I like trains', accepted, kw).verdict).toBe('wrong');
  });
  it('boş girdi yanlıştır', () => {
    expect(matchAnswer('   ', accepted, kw).verdict).toBe('wrong');
  });
  it('kısaltmaları açar', () => {
    expect(normalize("I'd like a LATTE!")).toBe('i would like a latte');
  });
});

describe('bilinen hatalar', () => {
  const street = ['Go straight for two blocks, then turn right at the traffic lights.'];
  const streetKw = [['straight'], ['right', 'left']];
  const mistakes = [{ match: 'turn (right|left) in the', tip: '"at" kullanılır.' }];

  it('neredeyse doğru cümleyi bilinen hatada "almost"a çeker ve ipucu verir', () => {
    const r = matchAnswer('Go straight for two blocks, then turn right in the traffic lights.', street, streetKw, mistakes);
    expect(r.verdict).toBe('almost');
    expect(r.tip).toBe('"at" kullanılır.');
  });
  it('doğru cümleyi etkilemez', () => {
    const r = matchAnswer('Go straight for two blocks, then turn right at the traffic lights.', street, streetKw, mistakes);
    expect(r.verdict).toBe('correct');
    expect(r.tip).toBeUndefined();
  });
});
