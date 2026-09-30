import type { ScenarioDef } from '../../../types/scenario';
import en from './en';

const def: ScenarioDef = {
  skeleton: { id: 'airport-checkin', setting: 'hotel', level: 'Orta', minutes: 5, xp: 25, isPremium: true, role: 'airline-agent' },
  variants: { en },
};

export default def;
