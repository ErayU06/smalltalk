import Svg, { Circle, Path, Rect } from 'react-native-svg';

/** Tuvaldeki inline ikonların birebir karşılığı (24×24). Stitch'teki Material Symbols adlarına yakın. */
export type IconName =
  | 'close' | 'check' | 'checkCircle' | 'arrowRight' | 'arrowDown' | 'back' | 'chevronDown' | 'chevronRight'
  | 'sparkle' | 'bolt' | 'flame' | 'heart' | 'star' | 'award' | 'trophy' | 'target'
  | 'timer' | 'clock' | 'compass' | 'repeat' | 'plane' | 'school' | 'signpost'
  | 'shield' | 'shieldFilled' | 'lock' | 'lockOpen'
  | 'mic' | 'speaker' | 'keyboard' | 'play' | 'lightbulb' | 'edit' | 'plus' | 'refresh'
  | 'share' | 'chat' | 'user' | 'chart' | 'smile' | 'sprout' | 'rocket' | 'tune' | 'bookmark';

type Props = { name: IconName; size?: number; color: string; strokeWidth?: number; fill?: string };

export function Icon({ name, size = 24, color, strokeWidth = 2.3, fill }: Props) {
  const s = { stroke: color, strokeWidth, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };
  const f = fill ?? color;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'close' && <Path d="M6 6l12 12M18 6L6 18" {...s} />}
      {name === 'check' && <Path d="M5 12.5l4.5 4.5L19 7.5" {...s} />}
      {name === 'checkCircle' && (<><Circle cx="12" cy="12" r="9" {...s} /><Path d="M8 12.5l3 3 5-6" {...s} /></>)}
      {name === 'arrowRight' && <Path d="M5 12h14M13 6l6 6-6 6" {...s} />}
      {name === 'arrowDown' && <Path d="M12 5v14M6 13l6 6 6-6" {...s} />}
      {name === 'back' && <Path d="M15 5l-7 7 7 7" {...s} />}
      {name === 'chevronDown' && <Path d="M6 9l6 6 6-6" {...s} />}
      {name === 'chevronRight' && <Path d="M9 5l7 7-7 7" {...s} />}
      {name === 'sparkle' && (<><Path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7z" fill={f} /><Path d="M19 3v4M17 5h4" {...s} /></>)}
      {name === 'bolt' && <Path d="M13 2L4 14h7l-1 8 9-12h-7z" fill={f} />}
      {name === 'flame' && <Path d="M12 2.5c1.2 4.2 5.5 5.8 5.5 10.6a5.5 5.5 0 0 1-11 0c0-2.8 1.6-3.9 2.2-6 1.1 1.6 2.1 2.2 2.7 2.7C11.9 7.6 11 5.6 12 2.5z" fill={f} />}
      {name === 'heart' && <Path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" fill={f} />}
      {name === 'star' && <Path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z" fill={f} />}
      {name === 'award' && (<><Circle cx="12" cy="9" r="6" fill={f} /><Path d="M8.5 13.5L7.5 21l4.5-2.2 4.5 2.2-1-7.5" fill={f} /></>)}
      {name === 'trophy' && (<><Path d="M7 4h10v5a5 5 0 0 1-10 0z" fill={f} /><Path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M12 14v4M8 21h8" {...s} strokeWidth={2} /></>)}
      {name === 'target' && (<><Circle cx="12" cy="12" r="9" {...s} /><Circle cx="12" cy="12" r="5" {...s} /><Circle cx="12" cy="12" r="1.5" fill={f} /></>)}
      {name === 'timer' && (<><Circle cx="12" cy="13" r="8" {...s} /><Path d="M12 9v4l2.5 2M9 2h6" {...s} /></>)}
      {name === 'clock' && (<><Circle cx="12" cy="12" r="9" {...s} /><Path d="M12 7v5l3 2" {...s} /></>)}
      {name === 'compass' && (<><Circle cx="12" cy="12" r="9" {...s} /><Path d="M15.5 8.5l-2 5-5 2 2-5z" {...s} /></>)}
      {name === 'repeat' && <Path d="M4 11V9a3 3 0 0 1 3-3h12l-3-3M20 13v2a3 3 0 0 1-3 3H5l3 3" {...s} />}
      {name === 'plane' && <Path d="M10.5 13.5L3 11l1.5-1.5 7 1 4-4.5a2 2 0 0 1 3 3l-4.5 4 1 7L13.5 21l-2.5-7.5" {...s} />}
      {name === 'school' && (<><Path d="M2 9l10-5 10 5-10 5z" {...s} /><Path d="M6 11v5c3 2 9 2 12 0v-5" {...s} /></>)}
      {name === 'signpost' && <Path d="M12 3v18M5 6h12l3 3-3 3H5z" {...s} />}
      {name === 'shield' && (<><Path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" {...s} /><Path d="M9 12l2 2 4-4" {...s} /></>)}
      {name === 'shieldFilled' && (<><Path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" fill={f} /><Path d="M9 12l2 2 4-4" stroke="#FFFFFF" strokeWidth={2} fill="none" strokeLinecap="round" /></>)}
      {name === 'lock' && (<><Rect x="5" y="11" width="14" height="10" rx="2" {...s} /><Path d="M8 11V8a4 4 0 0 1 8 0v3" {...s} /></>)}
      {name === 'lockOpen' && (<><Rect x="5" y="11" width="14" height="10" rx="2" {...s} /><Path d="M8 11V8a4 4 0 0 1 7.5-2" {...s} /></>)}
      {name === 'mic' && (<><Rect x="9" y="3" width="6" height="11" rx="3" {...s} /><Path d="M5 11a7 7 0 0 0 14 0M12 18v3" {...s} /></>)}
      {name === 'speaker' && (<><Path d="M4 9h4l5-4v14l-5-4H4z" {...s} /><Path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" {...s} /></>)}
      {name === 'keyboard' && (<><Rect x="3" y="6" width="18" height="12" rx="2" {...s} /><Path d="M7 10h.01M11 10h.01M15 10h.01M7 14h10" {...s} /></>)}
      {name === 'play' && <Path d="M8 5v14l11-7z" fill={f} />}
      {name === 'lightbulb' && <Path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z" {...s} />}
      {name === 'edit' && <Path d="M4 20h4l10-10-4-4L4 16zM13 7l4 4" {...s} />}
      {name === 'plus' && <Path d="M12 5v14M5 12h14" {...s} />}
      {name === 'refresh' && <Path d="M20 11a8 8 0 1 0-2 5.3M20 5v6h-6" {...s} />}
      {name === 'share' && (<><Circle cx="6" cy="12" r="2.5" {...s} /><Circle cx="18" cy="6" r="2.5" {...s} /><Circle cx="18" cy="18" r="2.5" {...s} /><Path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6" {...s} /></>)}
      {name === 'chat' && <Path d="M4 5h16v11H9l-5 4z" fill={fill ?? 'none'} stroke={fill ? 'none' : color} strokeWidth={strokeWidth} strokeLinejoin="round" />}
      {name === 'user' && (<><Circle cx="12" cy="12" r="9" {...s} /><Circle cx="12" cy="10" r="3" {...s} /><Path d="M6.5 18c1.4-2 3.4-3 5.5-3s4.1 1 5.5 3" {...s} /></>)}
      {name === 'chart' && <Path d="M4 20V10M10 20V4M16 20v-7M22 20H2" {...s} />}
      {name === 'smile' && (<><Circle cx="12" cy="12" r="9" {...s} /><Path d="M8.5 14q3.5 3.5 7 0M9 10h.01M15 10h.01" {...s} /></>)}
      {name === 'sprout' && <Path d="M7 20h10M9 20l-1-6h8l-1 6M12 14c0-4 2-7 6-8-1 4-3 6-6 8zM12 14c0-3-2-5-5-6 0 3 2 5 5 6z" {...s} />}
      {name === 'rocket' && <Path d="M5 19c1-4 3-7 7-11 3-3 6-4 8-4 0 2-1 5-4 8-4 4-7 6-11 7zM9 15l-4-1 2-4h4M9 15l1 4 4-2v-4" {...s} />}
      {name === 'tune' && (<><Path d="M4 7h10M18 7h2M4 17h4M12 17h8" {...s} /><Circle cx="16" cy="7" r="2" {...s} /><Circle cx="10" cy="17" r="2" {...s} /></>)}
      {name === 'bookmark' && <Path d="M6 3h12v18l-6-4-6 4z" {...s} />}
    </Svg>
  );
}
