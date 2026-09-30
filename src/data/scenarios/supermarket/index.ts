import type { ScenarioDef } from '../../../types/scenario';
import en from './en';

const def: ScenarioDef = {
  skeleton: { id: 'supermarket', setting: 'shop', level: 'Başlangıç', minutes: 3, xp: 20, isPremium: false, role: 'cashier' },
  variants: { en },
};

export default def;
