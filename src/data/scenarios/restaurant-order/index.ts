import type { ScenarioDef } from '../../../types/scenario';
import en from './en';

const def: ScenarioDef = {
  skeleton: { id: 'restaurant-order', setting: 'cafe', level: 'Başlangıç', minutes: 4, xp: 20, isPremium: false, role: 'waiter' },
  variants: { en },
};

export default def;
