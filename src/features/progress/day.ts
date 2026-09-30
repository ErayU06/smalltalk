/** Cihazın YEREL günü (UTC değil) – seri gece yarısında doğru döner. */
export function localDay(d = new Date()) {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export const yesterday = () => localDay(new Date(Date.now() - 86_400_000));
