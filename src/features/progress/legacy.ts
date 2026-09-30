/** İskelet + dil varyantı yapısından önceki senaryo kimlikleri → yeni ilerleme anahtarı (<id>:<dil>) */
export const LEGACY_IDS: Record<string, string> = {
  'cafe-order-en-1': 'cafe-order:en',
  'street-directions-en-1': 'street-directions:en',
  'campus-extension-en-1': 'campus-extension:en',
  'hotel-late-checkout-en-1': 'hotel-late-checkout:en',
};

export const migrateId = (id: string) => LEGACY_IDS[id] ?? id;
