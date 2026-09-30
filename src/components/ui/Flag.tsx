import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Path, Polygon, Rect } from 'react-native-svg';

export type FlagCode = 'tr' | 'gb' | 'de' | 'fr' | 'ru' | 'cn' | 'kr' | 'az';

/** 5 köşeli yıldız noktaları (rot: derece, 0 = yukarı) */
function star(cx: number, cy: number, r: number, rot = 0) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = ((rot + i * 36 - 90) * Math.PI) / 180;
    const rr = i % 2 === 0 ? r : r * 0.382;
    pts.push(`${(cx + rr * Math.cos(rad)).toFixed(2)},${(cy + rr * Math.sin(rad)).toFixed(2)}`);
  }
  return pts.join(' ');
}

const VIEWBOX: Record<FlagCode, string> = {
  tr: '0 0 30 20', gb: '0 0 60 30', de: '0 0 30 20', fr: '0 0 30 20',
  ru: '0 0 30 20', cn: '0 0 30 20', kr: '0 0 36 24', az: '0 0 30 20',
};

/**
 * Harici kütüphane ve görsel dosyası gerektirmeyen SVG bayraklar (emoji değil:
 * bazı Android sürümleri ve Windows emoji bayrakları harf olarak gösterir).
 * Küçük boyutta okunaklı olacak şekilde sadeleştirildi.
 */
export function Flag({ code, width = 22 }: { code: FlagCode; width?: number }) {
  const height = Math.round((width * 2) / 3);
  return (
    <View style={[styles.frame, { width, height, borderRadius: Math.max(2, width / 8) }]} aria-hidden>
      <Svg width={width} height={height} viewBox={VIEWBOX[code]} preserveAspectRatio="xMidYMid slice">
        {code === 'tr' && (
          <>
            <Rect width="30" height="20" fill="#E30A17" />
            <Circle cx="11.25" cy="10" r="5" fill="#FFFFFF" />
            <Circle cx="12.5" cy="10" r="4" fill="#E30A17" />
            <Polygon points={star(17.4, 10, 2.4, -90)} fill="#FFFFFF" />
          </>
        )}
        {code === 'gb' && (
          <>
            <Rect width="60" height="30" fill="#012169" />
            <Path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
            <Path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
            <Path d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" strokeWidth="10" />
            <Path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
          </>
        )}
        {code === 'de' && (
          <>
            <Rect width="30" height="6.67" fill="#000000" />
            <Rect y="6.67" width="30" height="6.67" fill="#DD0000" />
            <Rect y="13.33" width="30" height="6.67" fill="#FFCE00" />
          </>
        )}
        {code === 'fr' && (
          <>
            <Rect width="10" height="20" fill="#002654" />
            <Rect x="10" width="10" height="20" fill="#FFFFFF" />
            <Rect x="20" width="10" height="20" fill="#ED2939" />
          </>
        )}
        {code === 'ru' && (
          <>
            <Rect width="30" height="6.67" fill="#FFFFFF" />
            <Rect y="6.67" width="30" height="6.67" fill="#0039A6" />
            <Rect y="13.33" width="30" height="6.67" fill="#D52B1E" />
          </>
        )}
        {code === 'cn' && (
          <>
            <Rect width="30" height="20" fill="#EE1C25" />
            <Polygon points={star(5, 5, 3)} fill="#FFFF00" />
            <Polygon points={star(10, 2, 1, 23)} fill="#FFFF00" />
            <Polygon points={star(12, 4, 1, 46)} fill="#FFFF00" />
            <Polygon points={star(12, 7, 1, 70)} fill="#FFFF00" />
            <Polygon points={star(10, 9, 1, 21)} fill="#FFFF00" />
          </>
        )}
        {code === 'kr' && (
          <>
            <Rect width="36" height="24" fill="#FFFFFF" />
            <G transform="rotate(-33.7 18 12)">
              <Circle cx="18" cy="12" r="6" fill="#003478" />
              <Path d="M12,12 A6,6 0 0 1 24,12 A3,3 0 0 1 18,12 A3,3 0 0 0 12,12 Z" fill="#C60C30" />
            </G>
            {[
              { x: 7.5, y: 5.5, r: 56.3 }, { x: 28.5, y: 18.5, r: 56.3 },
              { x: 28.5, y: 5.5, r: -56.3 }, { x: 7.5, y: 18.5, r: -56.3 },
            ].map((t, i) => (
              <G key={i} transform={`rotate(${t.r} ${t.x} ${t.y})`}>
                <Rect x={t.x - 3} y={t.y - 2.2} width="6" height="1" fill="#000000" />
                <Rect x={t.x - 3} y={t.y - 0.5} width="6" height="1" fill="#000000" />
                <Rect x={t.x - 3} y={t.y + 1.2} width="6" height="1" fill="#000000" />
              </G>
            ))}
          </>
        )}
        {code === 'az' && (
          <>
            <Rect width="30" height="6.67" fill="#0092BC" />
            <Rect y="6.67" width="30" height="6.67" fill="#E4002B" />
            <Rect y="13.33" width="30" height="6.67" fill="#00AF66" />
            <Circle cx="14" cy="10" r="2.6" fill="#FFFFFF" />
            <Circle cx="14.7" cy="10" r="2.1" fill="#E4002B" />
            <Polygon points={star(17.2, 10, 1.1)} fill="#FFFFFF" />
          </>
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { overflow: 'hidden', borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(15,23,42,0.12)' },
});
