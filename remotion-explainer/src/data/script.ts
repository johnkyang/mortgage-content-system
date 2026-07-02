/**
 * THE SINGLE SOURCE OF TRUTH FOR THE VIDEO.
 *
 * Narration, scene timing, and animated captions all live here. Swap this file
 * (keeping the shape) to retarget the whole pipeline to a new transcript.
 *
 * Timeline: 30fps, vertical 1080x1920, ~78s total (2340 frames).
 *
 * Structure follows the viral arc: HOOK → PROBLEM → ESCALATION → REVEAL →
 * SOLUTION → CTA.
 */

export type Highlight =
  | 'money'
  | 'percent'
  | 'warning'
  | 'question'
  | 'key'
  | 'green'
  | 'none';

export interface Caption {
  /** Word or short phrase shown as one animated chunk. */
  text: string;
  /** Start frame RELATIVE to the scene it belongs to. */
  from: number;
  /** How long it stays on screen, in frames. */
  durationInFrames: number;
  /** Drives color/emphasis of the caption chunk. */
  highlight?: Highlight;
}

export interface SceneDef {
  id: string;
  /** Arc beat, for readability / the storyboard. */
  beat: 'HOOK' | 'PROBLEM' | 'ESCALATION' | 'REVEAL' | 'SOLUTION' | 'CTA';
  /** Absolute start frame in the master timeline. */
  from: number;
  /** Scene length in frames. */
  durationInFrames: number;
  /** Full VO line for this scene (for the recording script + subtitles). */
  narration: string;
  /** Word-level animated captions, timed relative to the scene. */
  captions: Caption[];
}

export const FPS = 30;
const s = (sec: number) => Math.round(sec * FPS);

export const SCENES: SceneDef[] = [
  {
    id: 'S1_hook',
    beat: 'HOOK',
    from: s(0),
    durationInFrames: s(6),
    narration: "You've been lied to about the down payment.",
    captions: [
      {text: "You've been", from: s(0.4), durationInFrames: s(1.2), highlight: 'none'},
      {text: 'LIED TO', from: s(1.4), durationInFrames: s(2.6), highlight: 'warning'},
      {text: 'about your down payment', from: s(3.2), durationInFrames: s(2.4), highlight: 'key'},
    ],
  },
  {
    id: 'S2_problem',
    beat: 'PROBLEM',
    from: s(6),
    durationInFrames: s(11),
    narration:
      'Someone told you that you need 20% down to buy a house. So you wait. You save. And you watch prices climb every single year.',
    captions: [
      {text: 'They said you need', from: s(0.3), durationInFrames: s(1.6), highlight: 'none'},
      {text: '20% DOWN', from: s(1.6), durationInFrames: s(2.6), highlight: 'percent'},
      {text: 'So you wait.', from: s(4.4), durationInFrames: s(1.8), highlight: 'none'},
      {text: 'You save.', from: s(6.2), durationInFrames: s(1.6), highlight: 'none'},
      {text: 'Prices climb anyway.', from: s(8.0), durationInFrames: s(2.6), highlight: 'warning'},
    ],
  },
  {
    id: 'S3_escalation',
    beat: 'ESCALATION',
    from: s(17),
    durationInFrames: s(14),
    narration:
      "Here's the trap. On a $500,000 home, 20% is $100,000. Saving $2,000 a month, that's over four years — while home prices rise faster than you can catch up.",
    captions: [
      {text: "Here's the trap", from: s(0.3), durationInFrames: s(1.8), highlight: 'warning'},
      {text: '$500,000 home', from: s(2.2), durationInFrames: s(2.2), highlight: 'money'},
      {text: '20% = $100,000', from: s(4.6), durationInFrames: s(2.8), highlight: 'money'},
      {text: '$2,000 / month', from: s(7.8), durationInFrames: s(2.2), highlight: 'money'},
      {text: '= 4+ YEARS', from: s(10.0), durationInFrames: s(2.4), highlight: 'warning'},
      {text: 'Prices keep rising ⏫', from: s(12.4), durationInFrames: s(1.6), highlight: 'warning'},
    ],
  },
  {
    id: 'S4_reveal',
    beat: 'REVEAL',
    from: s(31),
    durationInFrames: s(19),
    narration:
      'But you never needed 20%. Conventional loans go as low as 3% down. FHA is 3.5%. And VA and USDA? Zero down. On that same house, 3% is $15,000 — not $100,000.',
    captions: [
      {text: 'You never needed 20%', from: s(0.4), durationInFrames: s(2.6), highlight: 'key'},
      {text: 'Conventional: 3% down', from: s(3.4), durationInFrames: s(3.0), highlight: 'percent'},
      {text: 'FHA: 3.5% down', from: s(6.6), durationInFrames: s(2.6), highlight: 'percent'},
      {text: 'VA & USDA: 0% DOWN', from: s(9.4), durationInFrames: s(3.0), highlight: 'percent'},
      {text: 'Same house →', from: s(13.2), durationInFrames: s(1.8), highlight: 'none'},
      {text: '$15,000, not $100,000', from: s(15.0), durationInFrames: s(3.6), highlight: 'money'},
    ],
  },
  {
    id: 'S5_solution',
    beat: 'SOLUTION',
    from: s(50),
    durationInFrames: s(18),
    narration:
      'It gets better. Down payment assistance can cover thousands more. And a temporary rate buydown can shrink your payment in year one. The home you thought was 5 years away could be a few months away.',
    captions: [
      {text: 'It gets better 👀', from: s(0.3), durationInFrames: s(2.2), highlight: 'key'},
      {text: 'Down Payment Assistance', from: s(2.6), durationInFrames: s(3.0), highlight: 'money'},
      {text: 'covers thousands more', from: s(5.6), durationInFrames: s(2.4), highlight: 'money'},
      {text: '2-1 rate buydown', from: s(8.4), durationInFrames: s(2.8), highlight: 'key'},
      {text: 'lower payment, year one', from: s(11.2), durationInFrames: s(2.6), highlight: 'green'},
      {text: '5 years → a few months', from: s(14.2), durationInFrames: s(3.4), highlight: 'key'},
    ],
  },
  {
    id: 'S6_cta',
    beat: 'CTA',
    from: s(68),
    durationInFrames: s(10),
    narration:
      "I'm John Yang with loanDepot. Want to know exactly what you'd need for YOUR home? Comment the word HOME and I'll send you a personalized plan.",
    captions: [
      {text: 'John Yang · loanDepot', from: s(0.4), durationInFrames: s(3.0), highlight: 'none'},
      {text: 'Whatʼs YOUR number?', from: s(3.4), durationInFrames: s(2.6), highlight: 'question'},
      {text: 'Comment “HOME”', from: s(6.0), durationInFrames: s(3.6), highlight: 'key'},
    ],
  },
];

/** Total composition length in frames. */
export const TOTAL_FRAMES =
  SCENES[SCENES.length - 1].from + SCENES[SCENES.length - 1].durationInFrames;

/** Convenience: find a scene by id (used by scene components for their own timing). */
export const getScene = (id: string): SceneDef => {
  const found = SCENES.find((sc) => sc.id === id);
  if (!found) throw new Error(`Unknown scene id: ${id}`);
  return found;
};
