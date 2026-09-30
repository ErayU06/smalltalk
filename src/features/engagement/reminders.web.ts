import type { Prefs } from '../progress/db';

/** Web'de yerel bildirim kurulmaz; expo-notifications web pakete hiç girmesin diye ayrı dosya. */
export async function syncReminders(_prefs: Prefs, _opts: { ask?: boolean } = {}) {}
