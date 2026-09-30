import type { ScenarioDef } from '../../../types/scenario';
import en from './en';

const def: ScenarioDef = {
  skeleton: { id: 'cafe-order', setting: 'cafe', level: 'Başlangıç', minutes: 3, xp: 20, isPremium: false, role: 'barista' },
  variants: { en },
};

export default def;
