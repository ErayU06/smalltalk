/**
 * Türkçeye uygun büyük harf: i → İ, ı → I.
 * `textTransform: 'uppercase'` dile duyarsız olduğu için "Dilim" → "DILIM" yapar; bunu kullan.
 */
export function upperTR(s: string) {
  return s.replace(/i/g, 'İ').toUpperCase();
}

const NON_LATIN = /[Ѐ-ӿ぀-ヿ㐀-鿿가-힯ᄀ-ᇿ]/;

/**
 * Plus Jakarta Sans'ta Kiril ve CJK harfleri yok. Bu metinlerde fontFamily zorlanmaz,
 * sistem fontu kullanılır (CLAUDE.md). Stil dizisinin sonuna ekle: [type.npc, scriptSafe(text)].
 */
export function scriptSafe(text: string) {
  return NON_LATIN.test(text) ? { fontFamily: undefined } : null;
}
