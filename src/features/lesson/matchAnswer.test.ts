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

describe('dile duyarlı değerlendirme', () => {
  it('İngilizce: sayı yazıyla ya da rakamla aynı sayılır', () => {
    expect(normalize('Two waters, please', 'en')).toBe(normalize('2 waters please', 'en'));
  });

  describe('Almanca', () => {
    const acc = ['Ich hätte gern einen Cappuccino, bitte.'];
    const kw = [['cappuccino'], ['hätte gern', 'möchte', 'nehme']];
    it('doğru', () => expect(matchAnswer('Ich hätte gern einen Cappuccino bitte', acc, kw, [], 'de').verdict).toBe('correct'));
    it('umlaut yerine ae yazılabilir, ß = ss', () => {
      expect(normalize('Ich hätte gern', 'de')).toBe(normalize('ich haette gern', 'de'));
      expect(normalize('Straße', 'de')).toBe('strasse');
    });
    it('yanlış', () => expect(matchAnswer('Wo ist der Bahnhof', acc, kw, [], 'de').verdict).toBe('wrong'));
    it('bilinen hata: V2 sırası', () => {
      const r = matchAnswer('Dann ich nehme einen Cappuccino', ['Dann nehme ich einen Cappuccino.'], [['cappuccino'], ['nehme']], [{ match: 'dann ich nehme', tip: 'V2' }], 'de');
      expect(r.verdict).toBe('almost');
      expect(r.tip).toBe('V2');
    });
  });

  describe('Fransızca', () => {
    const acc = ["Je voudrais un café, s'il vous plaît."];
    const kw = [['cafe'], ['voudrais', 'vais prendre']];
    it('doğru', () => expect(matchAnswer("je voudrais un café s'il vous plaît", acc, kw, [], 'fr').verdict).toBe('correct'));
    it('aksan ve kesme işareti yok sayılır', () => {
      expect(normalize("J'aimerais un café", 'fr')).toBe(normalize('jaimerais un cafe', 'fr'));
    });
    it('neredeyse: kelime eksik', () => expect(matchAnswer('un café', acc, kw, [], 'fr').verdict).not.toBe('correct'));
    it('bilinen hata: bonjour demeden', () => {
      const r = matchAnswer('je voudrais un cafe', acc, kw, [{ match: '^(?!.*bonjour)', tip: 'Önce bonjour' }], 'fr');
      expect(r.tip).toBe('Önce bonjour');
    });
  });

  describe('Rusça', () => {
    const acc = ['Капучино, пожалуйста.'];
    const kw = [['капучино'], ['пожалуйста']];
    it('doğru', () => expect(matchAnswer('капучино пожалуйста', acc, kw, [], 'ru').verdict).toBe('correct'));
    it('ё = е', () => expect(normalize('Ещё', 'ru')).toBe(normalize('еще', 'ru')));
    it('sözcük sırası esnek', () => expect(matchAnswer('пожалуйста капучино', acc, kw, [], 'ru').verdict).toBe('correct'));
    it('yanlış', () => expect(matchAnswer('где метро', acc, kw, [], 'ru').verdict).toBe('wrong'));
  });

  describe('Çince', () => {
    const acc = ['我要一杯拿铁。'];
    const kw = [['拿铁'], ['杯']];
    it('doğru, noktalama ve boşluk önemsiz', () => expect(matchAnswer('我要 一杯 拿铁！', acc, kw, [], 'zh').verdict).toBe('correct'));
    it('anahtar kelime alt dize olarak aranır', () => expect(matchAnswer('请给我一杯拿铁', acc, kw, [], 'zh').verdict).toBe('correct'));
    it('两 ve 2 aynı sayılır', () => expect(normalize('两杯', 'zh')).toBe(normalize('2杯', 'zh')));
    it('bilinen hata: ölçü sözcüğü', () => {
      const r = matchAnswer('我要一个拿铁', acc, [['拿铁']], [{ match: '1个拿铁', tip: '杯' }], 'zh');
      expect(r.tip).toBe('杯');
    });
  });

  describe('Korece', () => {
    const acc = ['아이스 아메리카노 한 잔 주세요.'];
    const kw = [['아메리카노'], ['주세요']];
    it('doğru', () => expect(matchAnswer('아이스 아메리카노 한잔 주세요', acc, kw, [], 'ko').verdict).toBe('correct'));
    it('ek düşürmek cezalandırılmaz', () => expect(matchAnswer('아메리카노를 주세요', acc, kw, [], 'ko').verdict).toBe('correct'));
    it('yanlış', () => expect(matchAnswer('화장실 어디예요', acc, kw, [], 'ko').verdict).toBe('wrong'));
    it('한 잔 ve 한잔 aynı sayılır', () => expect(normalize('한 잔', 'ko')).toBe(normalize('한잔', 'ko')));
    it('bilinen hata: sayma sözcüğü', () => {
      const r = matchAnswer('아메리카노 이 잔 주세요', acc, kw, [{ match: '이잔', tip: '두 잔' }], 'ko');
      expect(r.verdict).toBe('almost');
    });
  });
});
