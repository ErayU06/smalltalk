/**
 * Türkçeye uygun büyük harf: i → İ, ı → I.
 * `textTransform: 'uppercase'` dile duyarsız olduğu için "Dilim" → "DILIM" yapar; bunu kullan.
 */
export function upperTR(s: string) {
  return s.replace(/i/g, 'İ').toUpperCase();
}
