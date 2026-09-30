import type { ScenarioDef } from '../../../types/scenario';
import en from './en';

const def: ScenarioDef = {
  skeleton: { id: 'transit-ticket', setting: 'street', level: 'Başlangıç', minutes: 3, xp: 20, isPremium: false, role: 'ticket-agent' },
  variants: { en },
};

export default def;
