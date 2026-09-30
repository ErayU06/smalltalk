import type { ScenarioDef } from '../../../types/scenario';
import de from './de';
import en from './en';
import fr from './fr';
import ko from './ko';
import ru from './ru';
import zh from './zh';

const def: ScenarioDef = {
  skeleton: { id: 'cafe-order', setting: 'cafe', level: 'Başlangıç', minutes: 3, xp: 20, isPremium: false, role: 'barista' },
  variants: { en, de, fr, ru, zh, ko },
};

export default def;
