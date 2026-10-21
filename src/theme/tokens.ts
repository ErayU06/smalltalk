/**
 * Talkwell tasarım tokenları.
 * Kaynak: Stitch projesinin Tailwind renkleri (Material 3 adlandırması) + beğenilen paywall.
 * Claude Design'daki "Tasarım tokenları" panosuyla birebir. Bileşenlerde hex yazma; useTheme() kullan.
 *
 * Tek fark: Stitch butonlarda #FF6B4A üzerine beyaz yazı kullanıyor (2.8:1, okunmuyor).
 * Parlak mercan (brand) süsleme/ilerleme/halkalarda kalır; yazılı butonlar buttonGradient kullanır (≥ 4.6:1).
 */

export type Gradient = readonly [string, string, ...string[]];

export interface Palette {
  // Yüzeyler (Stitch: surface, surface-container-*)
  bg: string; surface: string; surfaceLow: string; surfaceContainer: string; surfaceHigh: string; surfaceHighest: string;
  // Metin
  text: string; textMuted: string; textSubtle: string;
  // Mercan
  primary: string; brand: string; buttonGradient: Gradient; onButton: string; buttonGlow: string; buttonDepth: string;
  primarySoft: string; onPrimarySoft: string; primaryTint: string; onPrimaryTint: string;
  // Kehribar (tertiary)
  tertiary: string; tertiarySoft: string; onTertiarySoft: string; tertiaryTint: string; tertiaryAccent: string; tertiaryBright: string;
  // Lacivert-gri (secondary)
  secondary: string; secondarySoft: string; onSecondarySoft: string;
  // Durumlar
  success: string; successSoft: string; onSuccess: string;
  // Seçim kontrolleri (onboarding dil seçimi)
  outline: string; brandTint: string; selectedCheck: string;
  // Diğer
  scrim: string; shadow: string; heroGradient: Gradient; star: string; skin: string; ink: string;
}

const light: Palette = {
  bg: '#FAF8FF',
  surface: '#FFFFFF',
  surfaceLow: '#F2F3FF',
  surfaceContainer: '#EAEDFF',
  surfaceHigh: '#E2E7FF',
  surfaceHighest: '#DAE2FD',

  text: '#131B2E',
  textMuted: '#545F73',
  textSubtle: '#59413C',

  primary: '#AE3115',
  brand: '#FF6B4A',
  buttonGradient: ['#CF4527', '#B93A1E'],
  onButton: '#FFFFFF',
  buttonGlow: '#FF6B4A',
  buttonDepth: '#661000',
  primarySoft: '#FFDAD2',
  onPrimarySoft: '#8C1900',
  primaryTint: '#FFE9E3',
  onPrimaryTint: '#3D0600',

  tertiary: '#855300',
  tertiarySoft: '#FFDDB8',
  onTertiarySoft: '#492C00',
  tertiaryTint: '#FFF1E3',
  tertiaryAccent: '#D78900',
  tertiaryBright: '#FFB95F',

  secondary: '#545F73',
  secondarySoft: '#D5E0F8',
  onSecondarySoft: '#3C475A',

  success: '#1D6B4B',
  successSoft: '#E3F4EA',
  onSuccess: '#FFFFFF',

  outline: '#E2E8F0',
  brandTint: '#FFF5F2',
  selectedCheck: '#CF4527', // #FF6B4A açık zeminde 2.7:1 kalıyor; bir ton koyusu 4.6:1

  scrim: 'rgba(40,48,68,0.35)',
  shadow: '#131B2E',
  heroGradient: ['#FFDAD2', '#E2E7FF', '#FFDDB8'],
  star: '#D78900',
  skin: '#F4C7A8',
  ink: '#131B2E',
};

const dark: Palette = {
  bg: '#0F1526',
  surface: '#1A2236',
  surfaceLow: '#151C2F',
  surfaceContainer: '#1F2840',
  surfaceHigh: '#26304A',
  surfaceHighest: '#2E3956',

  text: '#EEF0FF',
  textMuted: '#B4BDD3',
  textSubtle: '#C9C2D8',

  primary: '#FFB4A3',
  brand: '#FF8A6E',
  buttonGradient: ['#FF8A6E', '#FF7A5A'],
  onButton: '#131B2E',
  buttonGlow: '#FF6B4A',
  buttonDepth: '#AE3115',
  primarySoft: '#3D1F1A',
  onPrimarySoft: '#FFB4A3',
  primaryTint: '#2E1C1F',
  onPrimaryTint: '#FFDAD2',

  tertiary: '#FFB95F',
  tertiarySoft: '#3A2A12',
  onTertiarySoft: '#FFDDB8',
  tertiaryTint: '#2C2416',
  tertiaryAccent: '#FFB95F',
  tertiaryBright: '#FFB95F',

  secondary: '#B4BDD3',
  secondarySoft: '#26324A',
  onSecondarySoft: '#D8E3FB',

  success: '#7DDBA8',
  successSoft: '#173A2C',
  onSuccess: '#0F1526',

  outline: '#2E3956',
  brandTint: '#2E1C1F',
  selectedCheck: '#FF8A6E',

  scrim: 'rgba(0,0,0,0.55)',
  shadow: '#000000',
  heroGradient: ['#3D1F1A', '#1F2840', '#3A2A12'],
  star: '#FFB95F',
  skin: '#F4C7A8',
  ink: '#131B2E',
};

export const palettes = { light, dark };

export const radius = { sm: 12, md: 16, lg: 24, sheet: 32, pill: 999 } as const;
export const space = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, margin: 20 } as const;

/** app/_layout.tsx içinde useFonts ile yüklenir (Stitch: Plus Jakarta Sans) */
export const fonts = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extrabold: 'PlusJakartaSans_800ExtraBold',
} as const;

/** Stitch fontSize ölçeğiyle aynı adlar */
export const type = {
  headlineXl: { fontFamily: fonts.extrabold, fontSize: 28, lineHeight: 36, letterSpacing: -0.6 },
  headlineLg: { fontFamily: fonts.bold, fontSize: 24, lineHeight: 32, letterSpacing: -0.4 },
  npc: { fontFamily: fonts.semibold, fontSize: 19, lineHeight: 28 },
  bodyLg: { fontFamily: fonts.medium, fontSize: 17, lineHeight: 26 },
  body: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 22 },
  labelLg: { fontFamily: fonts.bold, fontSize: 16, lineHeight: 20 },
  label: { fontFamily: fonts.semibold, fontSize: 13, lineHeight: 18 },
  caption: { fontFamily: fonts.medium, fontSize: 12, lineHeight: 16 },
  /** Büyük harfli başlık. Metni upperTR() ile çevir (textTransform Türkçe İ'yi bilmez). */
  overline: { fontFamily: fonts.extrabold, fontSize: 12, lineHeight: 16, letterSpacing: 0.8 },
} as const;

/** Stitch gölgeleri: yumuşak, lacivert tonlu */
export const elevation = {
  card: { shadowOpacity: 0.06, shadowRadius: 16, shadowOffset: { width: 0, height: 6 }, elevation: 2 },
  raised: { shadowOpacity: 0.12, shadowRadius: 20, shadowOffset: { width: 0, height: 8 }, elevation: 4 },
  glow: { shadowOpacity: 0.45, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 6 },
} as const;
