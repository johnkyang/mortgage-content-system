/**
 * Vox-documentary visual system for the John Yang / loanDepot mortgage explainer.
 * One source of truth for color, type, and motion constants so every scene
 * reads as the same brand.
 */

export const COLORS = {
  // Core Vox-documentary palette: warm paper + editorial red accent.
  paper: '#F4EFE6', // warm off-white background
  paperDeep: '#E7DFCF',
  ink: '#141210', // near-black for body text
  inkSoft: '#3A352E',
  red: '#E5121A', // signature editorial red (the "shadow offset" color)
  redDeep: '#B00E14',
  gold: '#E8B23A', // money / opportunity accent
  green: '#2FA36B', // positive / savings accent
  navy: '#123047', // authority / trust accent
  white: '#FFFFFF',
  overlayDark: 'rgba(20,18,16,0.55)',
} as const;

/**
 * Font families. These names come from @remotion/google-fonts (loaded in
 * src/fonts.ts). Anton = punchy display headlines; Inter = clean captions/body.
 */
export const FONTS = {
  display: 'Anton, Impact, sans-serif',
  body: 'Inter, Helvetica, Arial, sans-serif',
} as const;

export const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
} as const;

/** Consistent spring feel across the whole piece. */
export const SPRING = {
  // Snappy UI pop (text, icons, badges).
  pop: {damping: 14, stiffness: 220, mass: 0.6},
  // Heavier settle (cards, panels).
  settle: {damping: 18, stiffness: 120, mass: 0.9},
  // Gentle drift (backgrounds, parallax).
  drift: {damping: 30, stiffness: 40, mass: 1.2},
} as const;

/** The signature red drop-shadow offset used on all display text. */
export const redShadow = (px = 8) =>
  `${px}px ${px}px 0 ${COLORS.red}`;
