import Svg, { Circle, Path } from 'react-native-svg';
import { useTheme } from '../../theme/useTheme';

export type MascotMood = 'happy' | 'almost' | 'calm' | 'celebrate';

/** "Balon" – SmallTalk'un yol arkadaşı. Tuvaldeki SVG yolları birebir. */
export function Mascot({ mood = 'happy', size = 72, body }: { mood?: MascotMood; size?: number; body?: string }) {
  const { c } = useTheme();
  const fill = body ?? (mood === 'almost' ? c.tertiaryBright : mood === 'calm' ? '#8FA1BF' : '#FF6B4A');
  const ink = c.ink;
  return (
    <Svg width={size} height={(size * 64) / 72} viewBox="0 0 72 64" aria-hidden>
      <Path d="M12 4h48a10 10 0 0 1 10 10v26a10 10 0 0 1-10 10H30l-12 10v-10h-6A10 10 0 0 1 2 40V14A10 10 0 0 1 12 4z" fill={fill} />
      {mood === 'celebrate' ? (
        <>
          <Path d="M21 25q5-6 10 0M41 25q5-6 10 0" stroke={ink} strokeWidth={3.5} fill="none" strokeLinecap="round" />
          <Path d="M25 32q11 12 22 0z" fill={ink} />
        </>
      ) : (
        <>
          <Circle cx="26" cy={mood === 'calm' ? 25 : 24} r="4.5" fill={ink} />
          <Circle cx="46" cy={mood === 'calm' ? 25 : 24} r="4.5" fill={ink} />
          {mood === 'happy' && <Path d="M27 33q9 8 18 0" stroke={ink} strokeWidth={4} fill="none" strokeLinecap="round" />}
          {mood === 'almost' && <Path d="M27 34q9 5 18 0" stroke={ink} strokeWidth={4} fill="none" strokeLinecap="round" />}
          {mood === 'calm' && <Path d="M29 35h14" stroke={ink} strokeWidth={4} strokeLinecap="round" />}
        </>
      )}
      {mood !== 'calm' && (
        <>
          <Circle cx="16" cy="32" r="3.5" fill="#FFB4A3" />
          <Circle cx="56" cy="32" r="3.5" fill="#FFB4A3" />
        </>
      )}
    </Svg>
  );
}
