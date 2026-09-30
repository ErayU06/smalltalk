import Svg, { Circle, Path } from 'react-native-svg';
import type { NpcLook } from '../../types/scenario';

const LOOKS: Record<NpcLook, { bg: string; shirt: string; skin: string; hair: string; glasses?: boolean; hairPath: string }> = {
  barista: { bg: '#FFB4A3', shirt: '#FF6B4A', skin: '#F4C7A8', hair: '#5B3426', hairPath: 'M17 25c0-8 5-13 11-13s11 5 11 13c-2-5-6-7-11-7s-9 2-11 7z' },
  tourist: { bg: '#FFDDB8', shirt: '#D78900', skin: '#E8B08E', hair: '#2A1700', hairPath: 'M18 23c0-7 4-11 10-11s10 4 10 11c-1-3-5-5-10-5s-9 2-10 5z' },
  professor: { bg: '#D8E3FB', shirt: '#545F73', skin: '#F2C9AE', hair: '#BCC7DE', glasses: true, hairPath: 'M18 22c1-6 5-9 10-9s9 3 10 9c-2-2-4-3-5-3-2 2-8 2-10 0-1 0-3 1-5 3z' },
  receptionist: { bg: '#EAEDFF', shirt: '#131B2E', skin: '#D9A07F', hair: '#131B2E', hairPath: 'M17 26c0-9 5-14 11-14s11 5 11 14l-3-6c-3 1-13 1-16 0z' },
};

/** Düz, sıcak karakter avatarları (Stitch'teki Emma / Alex / Prof. Miller karşılıkları). */
export function NpcAvatar({ look, size = 56 }: { look: NpcLook; size?: number }) {
  const l = LOOKS[look];
  return (
    <Svg width={size} height={size} viewBox="0 0 56 56" aria-hidden>
      <Circle cx="28" cy="28" r="28" fill={l.bg} />
      <Path d="M10 56c2-10 9-15 18-15s16 5 18 15z" fill={l.shirt} />
      <Circle cx="28" cy="25" r="10" fill={l.skin} />
      <Path d={l.hairPath} fill={l.hair} />
      {l.glasses ? (
        <>
          <Circle cx="24" cy="26" r="3.2" fill="none" stroke="#131B2E" strokeWidth={1.3} />
          <Circle cx="32" cy="26" r="3.2" fill="none" stroke="#131B2E" strokeWidth={1.3} />
          <Path d="M27.2 26h1.6" stroke="#131B2E" strokeWidth={1.3} />
        </>
      ) : (
        <>
          <Circle cx="24" cy="26" r="1.3" fill="#131B2E" />
          <Circle cx="32" cy="26" r="1.3" fill="#131B2E" />
        </>
      )}
      <Path d="M24.5 30.5q3.5 2.6 7 0" stroke="#131B2E" strokeWidth={1.5} fill="none" strokeLinecap="round" />
    </Svg>
  );
}
