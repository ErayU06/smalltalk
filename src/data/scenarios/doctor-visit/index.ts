import type { ScenarioDef } from '../../../types/scenario';
import en from './en';

const def: ScenarioDef = {
  skeleton: { id: 'doctor-visit', setting: 'work', level: 'İleri', minutes: 5, xp: 35, isPremium: true, role: 'doctor' },
  variants: { en },
};

export default def;
