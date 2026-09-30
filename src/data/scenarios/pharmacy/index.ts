import type { ScenarioDef } from '../../../types/scenario';
import en from './en';

const def: ScenarioDef = {
  skeleton: { id: 'pharmacy', setting: 'shop', level: 'Orta', minutes: 4, xp: 25, isPremium: false, role: 'pharmacist' },
  variants: { en },
};

export default def;
