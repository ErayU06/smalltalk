import Svg, { Circle, Path, Rect } from 'react-native-svg';
import type { Setting } from '../../types/scenario';

/**
 * Düz sahne çizimleri (160×100 tuval, slice ile ölçeklenir).
 * Stitch'teki fotoğraflar geçici Google URL'leri olduğu için uygulamaya gömülmedi;
 * kendi görsellerini eklersen ScenarioCard'da `image` prop'u ile bunun yerine kullanılır.
 */
export function Scene({ setting, width, height, dimmed = false }: { setting: Setting; width: number; height: number; dimmed?: boolean }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" opacity={dimmed ? 0.5 : 1}
      aria-hidden>
      {setting === 'cafe' && (
        <>
          <Rect width="160" height="100" fill="#FFDAD2" />
          <Rect x="14" y="12" width="52" height="30" rx="4" fill="#131B2E" />
          <Path d="M22 22h28M22 29h36M22 36h20" stroke="#FAF8FF" strokeWidth="2.5" strokeLinecap="round" />
          <Rect x="76" y="26" width="22" height="22" rx="4" fill="#545F73" />
          <Circle cx="87" cy="20" r="6" fill="#BCC7DE" />
          <Rect x="0" y="66" width="160" height="34" fill="#FF6B4A" />
          <Rect x="0" y="62" width="160" height="6" fill="#131B2E" />
          <Path d="M116 40h20v14a7 7 0 0 1-7 7h-6a7 7 0 0 1-7-7z" fill="#FFFFFF" />
          <Path d="M136 44h4a5 5 0 0 1 0 10h-4" stroke="#FFFFFF" strokeWidth="3" fill="none" />
        </>
      )}
      {setting === 'street' && (
        <>
          <Rect width="160" height="100" fill="#D8E3FB" />
          <Rect x="8" y="34" width="34" height="66" fill="#BCC7DE" />
          <Rect x="46" y="20" width="30" height="80" fill="#DAE2FD" />
          <Rect x="0" y="86" width="160" height="14" fill="#545F73" />
          <Rect x="116" y="30" width="4" height="58" fill="#131B2E" />
          <Path d="M96 34h40l8 7-8 7H96z" fill="#FF6B4A" />
          <Path d="M140 52h-38l-8 7 8 7h38z" fill="#D78900" />
        </>
      )}
      {setting === 'campus' && (
        <>
          <Rect width="160" height="100" fill="#EAEDFF" />
          <Path d="M40 36l40-20 40 20z" fill="#545F73" />
          <Rect x="44" y="36" width="72" height="6" fill="#131B2E" />
          <Rect x="50" y="44" width="8" height="36" fill="#FFFFFF" />
          <Rect x="68" y="44" width="8" height="36" fill="#FFFFFF" />
          <Rect x="86" y="44" width="8" height="36" fill="#FFFFFF" />
          <Rect x="104" y="44" width="8" height="36" fill="#FFFFFF" />
          <Rect x="40" y="80" width="80" height="8" fill="#131B2E" />
          <Rect x="0" y="88" width="160" height="12" fill="#D78900" />
        </>
      )}
      {(setting === 'hotel' || setting === 'shop') && (
        <>
          <Rect width="160" height="100" fill="#FFDDB8" />
          <Rect x="20" y="52" width="120" height="34" rx="4" fill="#855300" />
          <Circle cx="120" cy="30" r="12" fill="#D78900" />
          <Rect x="117" y="40" width="6" height="12" fill="#855300" />
          <Rect x="30" y="40" width="30" height="12" rx="3" fill="#FFFFFF" />
        </>
      )}
      {setting === 'work' && (
        <>
          <Rect width="160" height="100" fill="#FFDDB8" />
          <Rect x="0" y="70" width="160" height="30" fill="#855300" />
          <Rect x="0" y="66" width="160" height="6" fill="#131B2E" />
          <Rect x="46" y="34" width="46" height="30" rx="3" fill="#131B2E" />
          <Rect x="50" y="38" width="38" height="22" rx="2" fill="#D8E3FB" />
          <Path d="M118 66h14l-2-16h-10z" fill="#FF6B4A" />
        </>
      )}
    </Svg>
  );
}
