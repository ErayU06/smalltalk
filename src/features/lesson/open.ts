import { router } from 'expo-router';
import type { Scenario } from '../../types/scenario';

/** Pro senaryo paywall'u, diğerleri dersi seçili dilde açar. */
export function openScenario(s: Scenario) {
  if (s.isPremium) router.push('/paywall');
  else router.push({ pathname: '/lesson/[id]', params: { id: s.id, lang: s.lang } });
}
