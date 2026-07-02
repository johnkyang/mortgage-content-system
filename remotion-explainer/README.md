# The Down Payment Lie — Remotion Explainer

A vertical (1080×1920) Vox/MagnatesMedia-style animated mortgage explainer for
**John Yang · loanDepot**, optimized for TikTok / Reels / Shorts / Facebook.
Topic: *the "you need 20% down" myth + down payment assistance.*

Everything is data-driven from [`src/data/script.ts`](src/data/script.ts) — swap
that file (keeping its shape) to retarget the whole pipeline to a new transcript.

## Quick start

```bash
cd remotion-explainer
npm install
npm run dev          # opens Remotion Studio to preview + scrub
npm run render       # renders out/video.mp4 (silent)
npm run still        # exports a thumbnail PNG
```

The project **renders immediately with zero assets** — backgrounds, portraits,
and icons all have coded placeholders. Drop real assets in as you generate them
(see the AI prompts in `../docs/mortgage-explainer-video.md`).

## Adding audio

1. Generate the voiceover (ElevenLabs — settings in the docs) → `public/vo.mp3`.
2. Add licensed music → `public/music.mp3`.
3. Flip the composition prop to `true`: in Remotion Studio set `withAudio` to
   `true`, or change `defaultProps={{withAudio: false}}` in `src/Root.tsx`.

## Structure

```
remotion-explainer/
├─ src/
│  ├─ index.ts                  # registerRoot
│  ├─ Root.tsx                  # <Composition> registry
│  ├─ theme.ts                  # colors, fonts, springs, red-shadow
│  ├─ fonts.ts                  # Anton + Inter (google-fonts)
│  ├─ data/script.ts            # ★ narration + scene timing + captions
│  ├─ compositions/
│  │  └─ MortgageExplainer.tsx  # master timeline (sequences + flashes + audio)
│  ├─ scenes/                   # one file per storyboard scene
│  │  ├─ Scene01Hook.tsx
│  │  ├─ Scene02Problem.tsx
│  │  ├─ Scene03Escalation.tsx
│  │  ├─ Scene04Reveal.tsx
│  │  ├─ Scene05Solution.tsx
│  │  └─ Scene06CTA.tsx
│  └─ components/               # reusable animated primitives
│     ├─ SceneFrame.tsx         # bg + captions + grain + vignette chrome
│     ├─ PaperTexture.tsx       # warm paper documentary background
│     ├─ FilmGrain.tsx          # animated grain + vignette
│     ├─ RedShadowText.tsx      # signature red-offset display headline
│     ├─ Captions.tsx           # word-chunk karaoke captions w/ sticker highlights
│     ├─ AnimatedCounter.tsx    # count-up $ / % odometer
│     ├─ BarGrow.tsx            # growing bar chart
│     ├─ KenBurns.tsx           # slow zoom bg + Parallax layer
│     ├─ HalftonePortrait.tsx   # halftone + red-offset portrait treatment
│     ├─ IconBadge.tsx          # pop-in sticker icon badge
│     └─ FlashTransition.tsx    # camera-flash scene cut
└─ assets/                      # source art (see assets naming convention below)
   ├─ backgrounds/ foreground/ characters/ icons/ audio/ music/
```

## Asset naming convention

`{scene}_{role}_{description}.{ext}` — e.g.:

- `S2_bg_neighborhood.jpg`
- `S4_fg_house_cutout.png` (transparent PNG)
- `S6_char_johnyang_halftone.png`
- `S4_icon_va_shield.svg`
- `vo.mp3`, `music.mp3` (in `public/`)

Backgrounds go in `assets/backgrounds`, transparent cutouts in
`assets/foreground`, portraits in `assets/characters`, icons in `assets/icons`.
Wire a file into a scene by passing its path as the `src` prop (e.g.
`<KenBurns src={staticFile('S2_bg_neighborhood.jpg')} />` — put runtime-loaded
files in `public/`).

## Compliance note (mortgage marketing)

All figures are illustrative examples, not an offer or rate lock. Keep loanDepot
NMLS ID + Equal Housing Opportunity disclosures in the caption/description on
publish. Nothing in the script states a specific APR or guarantees approval.
