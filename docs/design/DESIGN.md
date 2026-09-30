---
name: Warm Empathy Practice
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#59413c'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#8d716a'
  outline-variant: '#e1bfb8'
  surface-tint: '#ae3115'
  primary: '#ae3115'
  on-primary: '#ffffff'
  primary-container: '#ff6b4a'
  on-primary-container: '#661000'
  inverse-primary: '#ffb4a3'
  secondary: '#545f73'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f8'
  on-secondary-container: '#586377'
  tertiary: '#855300'
  on-tertiary: '#ffffff'
  tertiary-container: '#d78900'
  on-tertiary-container: '#492c00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad2'
  primary-fixed-dim: '#ffb4a3'
  on-primary-fixed: '#3d0600'
  on-primary-fixed-variant: '#8c1900'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 36px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  npc-dialogue:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 30px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 17px
    fontWeight: '500'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system targets young adults (ages 18–35), specifically university students and early-career professionals suffering from foreign language conversational anxiety (xenoglossophobia). The core brand emotion is psychological safety, warm companionship, and non-judgmental gamification. 

The aesthetic is a hybrid of Modern Playful Tactility and Clean Humanist Minimalism:
- **Tone:** Encouraging, patient, vibrant, yet mature enough not to feel childish.
- **Visual Weight:** Soft and buoyant. Elements leverage generous organic pill shapes, friendly drop-shadows with warm ambient casts, and human-first conversational layouts.
- **Motion & Feedback:** Micro-interactions (speech wave pulses, streak flames, conversational speech tail pops) provide immediate positive reinforcement, dismantling the fear of making mistakes.

## Colors

The palette balances energizing warmth with grounded authority, maintaining WCAG AA minimum contrast (4.5:1 for normal text, 3:1 for large graphical items).

- **Primary (`#FF6B4A` - Coral Warmth):** Primary actions, active voice-record pulses, milestone celebrations, and brand accentuation.
- **Secondary (`#1E293B` - Deep Midnight Navy):** Grounding containers, high-contrast role headers, and bottom tab anchors.
- **Tertiary (`#F59E0B` - Amber Glow):** Dedicated to habit retention, streak counters, XP metrics, and crown/pro markers. Supported by `#FEF3C7` container fills and `#D97706` text tokens.
- **Success (`#10B981` / `#D1FAE5`):** Positive pronunciation feedback, accuracy checks, completed scenarios.
- **Neutral Foundations:**
  - *Light Mode:* Canvas `#FAFAF9` (warm off-white) prevents harsh screen glare during evening study. Surfaces and speech cards use pristine `#FFFFFF` bordered with `#E2E8F0`. Text reads at `#0F172A` (primary), `#64748B` (secondary hints), and `#94A3B8` (muted metadata).
  - *Dark Mode:* Canvas `#0F172A`, Surface `#1E293B`, subtle dividers `#334155`, with inverted typography for nocturnal rehearsal.

## Typography

Typography is set in Plus Jakarta Sans across all levels for its geometric clarity, friendly open apertures, and warm humanistic terminals.

- **NPC Dialogue (`npc-dialogue`):** Tuned to 20px semi-bold with comfortable 30px line-height. This ensures immediate cognitive processing of prompts during real-time roleplay without visual strain.
- **Headlines:** Use heavy weights (700 and 800) with tightened letter tracking (-0.02em) to ground conversational prompts and celebratory screens.
- **Helper & Hint Text:** Employs standard medium weights (500) paired with `#64748B` to distinguish contextual translations from primary speech scripts.

## Layout & Spacing

A mobile-first dynamic layout rhythm built on a 4px/8px incremental grid.

- **Margins & Safe Zones:** Canvas lateral padding defaults to `1.25rem` (20px) on mobile viewports, stepping up to `1.5rem` (24px) on tablet breakpoints. Chat streams anchor to the device safe-area bottom with an elevated fixed action zone (minimum 88px clearance).
- **Component Touch Targets:** Strict adherence to physical motor ease. All interactive triggers (microphones, quick reply chips, navigation items) feature minimum heights of 48px to eliminate tap frustration when anxiety is high.
- **Chat Rhythm:** 12px gap between successive bubbles from the same speaker; 20px gap when transitioning between NPC and user.

## Elevation & Depth

Visual depth is achieved through friendly, ambient, light-casting surfaces rather than clinical grey drops:

- **Surface Base (Level 0):** Flat background `#FAFAF9` with neutral border boundaries (`#E2E8F0`).
- **Cards & Chat Bubbles (Level 1):** `#FFFFFF` paired with an ambient tinted shadow: `0 4px 14px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)`.
- **Floating Recording Action (Level 2):** Elevated interactive center button: `0 10px 25px -4px rgba(255, 107, 74, 0.35)`.
- **Overlays & Drawers (Level 3):** Frosted ambient backdrop (`backdrop-blur-md` over `rgba(15, 23, 42, 0.4)`) with high-surface modal sheets.

## Shapes

The interface embraces organic, comforting curvatures that reduce interface intimidation:

- **Cards & Containers:** `rounded-2xl` (16px) to `rounded-3xl` (24px) for conversation prompt panels and category tiles.
- **Speech Bubbles:** Asymmetric rounding (e.g., 20px everywhere except the anchor corner at 4px) to simulate human dialogue flow.
- **Interactive Controls:** Buttons, chips, and progress capsules feature full pill geometry (`rounded-full`) for high tap affordance.

## Components

### Buttons
- **Primary Action (Talk / Continue):** High-saturation `#FF6B4A` background with crisp white text, min-height 52px, fully pill-shaped. Includes a 2px darker bottom inset bevel (`#FA5228`) giving a tactile, squishy, press-down feel.
- **Secondary / Hint:** Outlined `#E2E8F0` on `#FFFFFF` with `#1E293B` text and subtle warm hover transition.
- **Voice Record Trigger:** Central floating 64px circle with a subtle concentric acoustic ripple effect pulsing in `#FF8364` at 20% opacity.

### Speech Bubble UI
- **NPC Bubble:** Left-aligned, `#FFFFFF` surface, `#0F172A` text, with a rounded downward tail on the left. Subtle top-right translation toggle icon.
- **User Bubble:** Right-aligned, `#1E293B` background with `#FFFFFF` text, or high-soft primary tint (`#FFF1EE`) during draft speech assembly.

### Progress & Motivation
- **Gamified Progress Bar:** 12px height, pill container in `#E2E8F0` with a smooth, glossy active fill in `#10B981` or `#FF6B4A`, capped with an inner highlight streak.
- **Streak & Pro Badges:** Amber pills (`#FEF3C7` background, `#D97706` text) containing micro flame or crown glyphs with bold tracking.

### Chips & Inputs
- **Scaffolding Chips:** Used for phrase suggestions; dynamic pill shapes with `#F1F5F9` background, `#1E293B` text, expanding on tap with a 200ms scale transition.
- **Inputs:** Clean rounded-2xl containers with inset padding, placeholder text in `#94A3B8`, moving to `#FF6B4A` active ring on focus.