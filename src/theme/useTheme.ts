import { useColorScheme } from 'react-native';
import { elevation, fonts, palettes, radius, space, type } from './tokens';

export function useTheme() {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  return { scheme, c: palettes[scheme], radius, space, type, fonts, elevation } as const;
}

export type Theme = ReturnType<typeof useTheme>;
