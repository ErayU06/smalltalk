import type { ScenarioDef } from '../../../types/scenario';
import en from './en';

const def: ScenarioDef = {
  skeleton: { id: 'hotel-late-checkout', setting: 'hotel', level: 'İleri', minutes: 6, xp: 35, isPremium: true, role: 'receptionist' },
  variants: { en },
};

export default def;
