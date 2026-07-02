# 🎬 Mortgage Explainer Video — Production Package

**Episode:** *The Down Payment Lie*
**Creator:** John Yang · loanDepot
**Format:** Vertical 1080×1920, 30fps, ~78s — TikTok / Reels / Shorts / Facebook
**Style:** Modern Vox / MagnatesMedia documentary (warm paper, editorial red, halftone, retention editing)
**Buildable in:** [`../remotion-explainer/`](../remotion-explainer/) (Remotion, renders today with zero assets)

> **Compliance note:** Every dollar figure below is an *illustrative example*, not an offer, rate lock, or guarantee of approval. On publish, include loanDepot NMLS ID + Equal Housing Opportunity. No specific APR is stated. Programs (FHA/VA/USDA/DPA) have eligibility requirements — the script says "as low as" and "can," never "you will."

---

## Source Transcript (input)

> *No transcript was supplied with the request, so this package is built from a representative first-time-buyer consultation on the most viral mortgage misconception. Swap it for a real transcript and re-run the pipeline — [`src/data/script.ts`](../remotion-explainer/src/data/script.ts) is the only file that changes.*

```
"...the number one thing I hear from first-time buyers is 'I'm not ready, I
don't have 20% saved.' And I have to stop them right there, because that 20%
number is probably the single most expensive myth in real estate. People think
they need it, so they wait. They save for years. Meanwhile the house they wanted
went up sixty, eighty grand. The truth is conventional loans can go as low as 3%
down. FHA is 3.5. If you're a veteran or buying rural, VA and USDA can be zero
down. And on top of that there are down payment assistance programs — grants,
second mortgages, that cover a big chunk of what's left. Then you can do a
temporary buydown to lower the payment the first year or two while you settle in.
So the person who thought they were five years away from owning? A lot of the
time they could buy in a couple months. They just never asked."
```

---

## STEP 1 — Transcript Analysis

| Signal | Finding |
|---|---|
| **Biggest surprising fact** | You can buy with **as little as 0–3% down** — the 20% "rule" is a myth. |
| **Biggest pain point** | Renters/savers feel permanently "not ready" and priced out. |
| **Biggest financial mistake** | **Waiting years to save 20%** while prices rise faster than they can save. |
| **Biggest misconception** | "I need 20% down to buy a house." |
| **Biggest opportunity** | Low-down loans **+ down payment assistance + rate buydown** stacked together. |
| **Biggest emotional hook** | *"You were told a lie that's costing you the house."* |

**Main Idea (one sentence):**
> The "20% down" rule is a myth that keeps ready buyers renting for years — real minimums are as low as 0–3%, and with down payment assistance and a rate buydown, the home you thought was 5 years away could be months away.

---

## STEP 2 — 10 Viral Hooks

1. **"You've been lied to about the down payment."** ← *(selected)*
2. "The 20% down payment rule is a lie — and it's costing you a house."
3. "If you're waiting to save 20% down, stop. Watch this first."
4. "This myth is keeping you a renter for 5 extra years."
5. "You could buy a house months from now — you just don't know it yet."
6. "Everybody saving for 20% down is making the same $80,000 mistake."
7. "Realtors won't say it, but you don't need what you think you need to buy."
8. "The number that's scaring you out of homeownership isn't real."
9. "3% vs 20% — this one number changes everything about buying a home."
10. "Stop saving for a 20% down payment. Here's the math nobody showed you."

> **Selected hook:** #1 — shortest, highest curiosity + "you've been lied to" pattern-interrupt. Animated as the struck-through **"20% DOWN" → LIE.** open (Scene 1).

---

## STEP 3 — Viral Script (~78s)

**Arc:** Hook → Problem → Escalation → Reveal → Solution → CTA

| Beat | Line |
|---|---|
| **HOOK** | You've been lied to about the down payment. |
| **PROBLEM** | Someone told you that you need 20% down to buy a house. So you wait. You save. And you watch prices climb every single year. |
| **ESCALATION** | Here's the trap. On a $500,000 home, 20% is $100,000. Saving $2,000 a month, that's over four years — while home prices rise faster than you can catch up. |
| **REVEAL** | But you never needed 20%. Conventional loans go as low as 3% down. FHA is 3.5%. And VA and USDA? Zero down. On that same house, 3% is $15,000 — not $100,000. |
| **SOLUTION** | It gets better. Down payment assistance can cover thousands more. And a temporary rate buydown can shrink your payment in year one. The home you thought was five years away could be a few months away. |
| **CTA** | I'm John Yang with loanDepot. Want to know exactly what you'd need for *your* home? Comment the word HOME and I'll send you a personalized plan. |

*Reading level: ~6th grade. No jargon ("buydown" is shown visually as a dropping payment). Every sentence sets up the next.*

---

## STEP 4 — Storyboard

> Live, animated version of every scene is coded in [`remotion-explainer/src/scenes/`](../remotion-explainer/src/scenes/). Timing is the source of truth in [`src/data/script.ts`](../remotion-explainer/src/data/script.ts).

### Scene 1 — HOOK (0:00–0:06)
- **Narration:** "You've been lied to about the down payment."
- **Foreground:** `"20% DOWN"` headline → red diagonal **strike-through** → **"LIE."** slams in with red offset shadow + frame shake.
- **Midground:** none (negative space = focus).
- **Background:** warm paper, breathing radial light.
- **Text/overlay:** caption sticker "ABOUT YOUR DOWN PAYMENT".
- **Animation:** strike-through wipe, spring-scale on LIE, 4px shake.
- **Transition:** white camera-flash into S2.
- **Camera:** static, tiny push-in.
- **Emotional purpose:** pattern interrupt + betrayal → curiosity.

### Scene 2 — PROBLEM (0:06–0:17)
- **Narration:** "Someone told you that you need 20% down… you wait, you save, and you watch prices climb."
- **Foreground:** small buyer figure stuck at baseline (🧍).
- **Midground:** red **"HOME PRICES"** trend line drawing upward away from the buyer.
- **Background:** neighborhood KenBurns (placeholder → `S2_bg_neighborhood.jpg`).
- **Overlay:** captions "20% DOWN", "So you wait.", "Prices climb anyway."
- **Animation:** line-draw, slow parallax zoom.
- **Transition:** flash.
- **Camera:** slow drift left.
- **Emotional purpose:** "I'm falling behind."

### Scene 3 — ESCALATION (0:17–0:31)
- **Narration:** "$500,000 home, 20% is $100,000… $2,000/month… over four years."
- **Foreground:** house badge → **$100,000 counter counts up** → slow red savings progress bar → "4+ YEARS".
- **Background:** paper.
- **Overlay:** money-sticker captions.
- **Animation:** odometer count-up (fast), progress bar crawl (deliberately slow).
- **Transition:** flash.
- **Camera:** static.
- **Emotional purpose:** the trap quantified — frustration peaks.

### Scene 4 — REVEAL (0:31–0:50)
- **Narration:** "You never needed 20%. Conventional 3%. FHA 3.5%. VA/USDA 0%. $15,000, not $100,000."
- **Foreground:** **bar chart** grows — 0% / 3% / 3.5% / 20% — then green **"✓ YOU CAN START NOW"** badge.
- **Background:** paper.
- **Overlay:** percent-sticker captions + "$15,000, not $100,000".
- **Animation:** staggered bar growth, badge pop.
- **Transition:** flash.
- **Camera:** static.
- **Emotional purpose:** relief + "I never knew that."

### Scene 5 — SOLUTION (0:50–1:08)
- **Narration:** "Down payment assistance… temporary rate buydown… five years away could be a few months away."
- **Foreground:** three **stacking cards** (💵 3% down · 🎁 Assistance · 📉 2-1 Buydown) + **Yr-1 payment drops** $3,200 → $2,400.
- **Background:** paper.
- **Overlay:** "STACK THESE 🧱", green payment counter.
- **Animation:** cards rise/stagger, payment counter counts down.
- **Transition:** flash.
- **Camera:** static.
- **Emotional purpose:** hope + actionable path.

### Scene 6 — CTA (1:08–1:18)
- **Narration:** "I'm John Yang with loanDepot… Comment HOME… personalized plan."
- **Foreground:** John Yang **halftone portrait** (placeholder → `john_yang_halftone.png`) + red **"COMMENT 'HOME'"** pill (pulsing).
- **Background:** paper + halftone dots.
- **Overlay:** brand line, "…and I'll send your personalized plan."
- **Animation:** portrait pop, pill pulse.
- **Transition:** hold to end.
- **Camera:** static.
- **Emotional purpose:** trust + one clear action.

---

## STEP 5 — AI Image Prompts (per scene)

**Global style suffix (append to every prompt):**
> *modern Vox documentary illustration, warm off-white paper background (#F4EFE6), editorial red accent (#E5121A), navy + gold secondary, subtle halftone texture, hard offset shadows, clean flat vector with grain, cinematic soft key light, high contrast, 9:16 vertical, negative space for text.*

**Color palette:** Paper `#F4EFE6` · Ink `#141210` · Red `#E5121A` · Gold `#E8B23A` · Green `#2FA36B` · Navy `#123047`
**Lighting:** soft top-key, gentle radial glow center, filmic vignette.
**Composition:** rule-of-thirds, subject lower-third or center, generous headroom for captions.

| Scene | Background prompt | Foreground / cutout prompt | Halftone portrait prompt |
|---|---|---|---|
| **S1** | Textured warm paper sheet, faint grid, spotlight center, empty. | Torn paper strip reading "20% DOWN", transparent PNG, editorial. | — |
| **S2** | Suburban American neighborhood at golden hour, aerial-ish, muted warm grade, paper-grain overlay. | Transparent PNG: single small worried first-time buyer holding a piggy bank, flat vector. | — |
| **S3** | Paper backdrop, faint blueprint of a house watermark. | Transparent PNG: suburban house icon (navy), stack of cash, calendar pages — flat vector set. | — |
| **S4** | Paper backdrop, soft upward light. | Transparent PNGs: shield (VA), house-with-check (conventional), FHA badge, coin stacks of varying heights. | — |
| **S5** | Paper backdrop, subtle rising sun motif. | Transparent PNGs: gift box (grant), down-trending arrow (buydown), dollar bill — flat vector, gold/green. | — |
| **S6** | Paper backdrop with halftone dot field, red circle accent. | — | **Portrait of a friendly professional Asian-American male loan officer, 40s, business-casual, warm confident smile, front-facing, high-contrast duotone halftone print (ink + red), transparent PNG cutout, editorial poster style.** Replace with a real photo of John Yang for production. |

**Recommended generators in this environment:** Higgsfield `generate_image` (then `remove_background` for cutouts), or Canva. Prompts above are drop-in.

---

## STEP 6 — Remotion Build Plan (folder structure)

```
remotion-explainer/
├─ package.json · tsconfig.json · remotion.config.ts
├─ src/
│  ├─ index.ts                     # registerRoot
│  ├─ Root.tsx                     # <Composition> registry
│  ├─ theme.ts                     # colors / fonts / springs / red-shadow
│  ├─ fonts.ts                     # vendored Anton + Inter (offline)
│  ├─ data/script.ts               # ★ narration + timing + captions
│  ├─ compositions/MortgageExplainer.tsx
│  ├─ scenes/Scene01Hook … Scene06CTA.tsx
│  └─ components/                  # SceneFrame, PaperTexture, FilmGrain,
│                                  #   RedShadowText, Captions, AnimatedCounter,
│                                  #   BarGrow, KenBurns/Parallax, HalftonePortrait,
│                                  #   IconBadge, FlashTransition
├─ public/fonts/                   # Anton-400 + Inter-700/800/900 .woff2
└─ assets/
   ├─ backgrounds/  foreground/  characters/
   ├─ icons/  audio/  music/
```

**Naming convention:** `{scene}_{role}_{desc}.{ext}` — e.g. `S2_bg_neighborhood.jpg`, `S4_fg_va_shield.png`, `S6_char_johnyang_halftone.png`. Runtime-loaded files (via `staticFile`) live in `public/`.

---

## STEP 7 — Claude Code Build Tasks

| # | Task | Status |
|---|---|---|
| 1 | **Setup Remotion** — package.json, config, tsconfig, Root, index | ✅ done |
| 2 | **Theme + fonts** — palette, Anton/Inter vendored offline | ✅ done |
| 3 | **Script data** — narration + scene timing + captions | ✅ done |
| 4 | **Reusable components** — texture, grain, captions, counters, charts, portrait | ✅ done |
| 5 | **Scene 1–6** — build + animate each storyboard scene | ✅ done |
| 6 | **Master composition** — sequence scenes + flash transitions + audio hook | ✅ done |
| 7 | **Verify render** — typecheck + still per scene + full mp4 | ✅ done |
| 8 | **Generate assets** — run AI prompts (Step 5) → drop into `assets/` | ⬜ your turn |
| 9 | **Record VO** — ElevenLabs (Step 10) → `public/vo.mp3` | ⬜ your turn |
| 10 | **Add music + SFX** (Step 9) → `public/music.mp3`; set `withAudio=true` | ⬜ your turn |
| 11 | **Final render + captions burn-in** → export, post with CTA | ⬜ your turn |

---

## STEP 8 — Animation Directions (per scene)

**Global:** springs from `theme.ts` (`pop`, `settle`, `drift`); film grain reseeds each frame; paper light breathes over 8s; white camera-flash at every cut.

- **S1:** `spring(pop)` scale 0.6→1 + rotate wobble on "LIE."; red shadow offset grows 0→10px on the hit; strike-through width springs 0→760px; 4px frame shake frames 42–54; caption sticker scale-in.
- **S2:** SVG polyline `interpolate` draw (frames 40→150); tip circle `spring` pop; KenBurns scale 1.08→1.2 + translate (parallax); buyer figure static at baseline for contrast.
- **S3:** `AnimatedCounter` odometer $0→$100,000 (ease-out cubic, 40f); savings bar `interpolate` 0→100% over 170f (slow on purpose); "4+ YEARS" opacity fade-in at settle.
- **S4:** `BarGrow` staggered springs (8f offset each), heights ∝ down-payment $; green badge `spring` pop + scale 0.8→1 at frame 430.
- **S5:** three cards `spring(settle)` translateY 80→0 staggered (20/80/140f); Yr-1 payment counter counts **down** $3,200→$2,400 (ease-out).
- **S6:** portrait `spring` scale 0.8→1 + halftone dots opacity 0→0.5; red pill sine **pulse** (±4.5%); name/subtext staggered fades.

**Effects layered every scene:** parallax (KenBurns/Parallax), red shadow offsets (RedShadowText/counters), halftone timing (portrait), paper texture (multiply), noise/grain overlay (overlay blend), light grain vignette.

---

## STEP 9 — Sound Design

| Element | Cue |
|---|---|
| **Music** | Minimal cinematic documentary bed, light tension→resolve, ~90 BPM, sparse piano + soft synth pad. Ducks −6dB under VO. |
| **Low drone** | Under S1–S3 (the "problem") — subtle sub-bass tension. |
| **Whoosh** | On each camera-flash transition (5 total). |
| **Camera hit / bass impact** | On "LIE." (S1, frame ~42) and on the $15,000 reveal (S4). |
| **Typewriter / click** | Per caption sticker pop (subtle, low volume). |
| **Cash register "cha-ching"** | On the $100,000 counter finishing (S3) and payment drop (S5). |
| **Riser** | Building through S3 into the S4 reveal. |
| **Uplift chime** | On green "✓ YOU CAN START NOW" badge (S4) and Yr-1 payment (S5). |
| **Page flip / door close** | Optional S2 (settling-in / home motif). |
| **Notification pop** | On the "COMMENT HOME" pill (S6) to nudge the action. |

*Sources: Artlist / Epidemic Sound / Soundstripe (licensed). Keep music bed −18 to −22 LUFS under a −14 LUFS master.*

---

## STEP 10 — Voiceover (ElevenLabs)

- **Voice:** warm, trustworthy, mid-30s–40s male, conversational-authoritative (e.g. "Adam" / "Brian" / a cloned **John Yang** voice for authenticity).
- **Model:** Eleven Multilingual v2 or Turbo v2.5.
- **Speaking speed:** slightly brisk in Hook/Problem (energy), slow down on the Reveal numbers.
- **Stability ~45 · Similarity ~80 · Style ~15** (natural, not robotic).
- **Emotion:** confident, a little conspiratorial on the hook, reassuring on the solution.
- **Pauses:** beat after "lied to"; beat before "$100,000"; beat before "Zero down."; beat before "Comment the word HOME".
- **Emphasis (stress these):** *lied*, *20%*, *wait*, *$100,000*, *four years*, *never*, *3%*, *zero down*, *$15,000 — not $100,000*, *thousands*, *year one*, *months away*, *HOME*.
- **Delivery script with SSML-ish cues:**
  > "You've been **lied to** … about the down payment. Someone told you that you need **twenty percent down** to buy a house. So you wait. You save. And you watch prices climb every single year. Here's the trap: on a five-hundred-thousand-dollar home, twenty percent is **[pause] one hundred thousand dollars**. Saving two thousand a month? That's over **four years** — while prices rise faster than you can catch up. But you **never** needed twenty percent. Conventional loans go as low as **three percent** down. FHA, three and a half. And VA and USDA? **[pause] Zero down.** On that same house, three percent is **fifteen thousand — not a hundred thousand**. And it gets better. Down payment assistance can cover **thousands** more. And a temporary rate buydown can shrink your payment in **year one**. The home you thought was five years away? Could be a few **months** away. I'm John Yang with loanDepot. Want to know exactly what you'd need for **your** home? Comment the word **HOME** — and I'll send you a personalized plan."

---

## STEP 11 — Animated Captions

Implemented in [`components/Captions.tsx`](../remotion-explainer/src/components/Captions.tsx) — one word-chunk on screen at a time, spring-pop, colored "sticker" backgrounds by type:

| Highlight type | Style | Examples in this video |
|---|---|---|
| **money** (gold) | gold sticker, ink text | "$500,000 home", "20% = $100,000", "$15,000, not $100,000" |
| **percent** (navy) | navy sticker, white text | "20% DOWN", "Conventional: 3% down", "VA & USDA: 0% DOWN" |
| **warning** (red) | red sticker, white text | "LIED TO", "Here's the trap", "Prices climb anyway", "= 4+ YEARS" |
| **question** (deep red) | deep-red sticker | "What's YOUR number?" |
| **green** | green sticker | "lower payment, year one" |
| **key** (ink) | ink sticker, paper text | "You never needed 20%", "Comment HOME" |
| **none** | plain, white text-shadow | connective phrases |

Numbers, dollar amounts, %, warnings, and questions are always highlighted — the retention-editing rule. Caption timing lives per-scene in `script.ts` (`from` + `durationInFrames`, scene-relative).

---

## STEP 12 — B-roll Suggestions (optional live-action inserts)

- Drone push over a suburban neighborhood (S2 background).
- Young couple walking up to a "SOLD" sign / getting keys (S5–S6).
- Close-up hands signing mortgage paperwork; pen on dotted line (S3).
- Piggy bank / coins dropping / calendar pages flipping (S2–S3 pain).
- Family moving boxes into a new home, laughing (S5 payoff).
- Construction / new-build framing (move-up buyer segment).
- Map zoom to a metro area with rising price ticker overlay (S2).
- Bank/branch exterior, ATM, card tap (banking motif).
- Rate/price chart on a screen, finger scrolling (S3–S4).
- *Sources: Artgrid, Storyblocks, Pexels/Envato. Grade warm to match the paper palette; add grain to blend with animation.*

---

## STEP 13 — Lead-Gen CTA (three endings)

**Educational (soft authority):**
> "Save this so you stop overpaying in rent while you 'wait to be ready.' Follow for the mortgage stuff your bank won't explain."

**Consultation (direct):**
> "Want to know exactly what *you'd* need for your price range? DM me the word **BUYER** and I'll build you a personalized down-payment + payment plan — free."

**Soft CTA (comment trigger — used in the video):**
> "Comment the word **HOME** and I'll send you my free first-time-buyer breakdown + payment calculator."

**Alt keyword triggers to A/B test:** `RATE`, `DPA`, `PLAN`, `KEYS`.

---

## STEP 14 — Output Format

This document + the Remotion project together are the deliverable. Sections above map 1:1 to the requested output (Script, Storyboard, Asset List, Image Prompts, Remotion Tasks, Animation Notes, Audio, Voiceover, Captions, CTA). Asset list = Step 5 table + `assets/` naming convention.

---

## STEP 15 — Mortgage-Specific Rules Applied

- **Concepts shown visually:** "buydown" = a payment number dropping; "20% vs 3%" = bar heights; "prices rising" = a line pulling away from a stuck buyer.
- **Simple language, ~6th-grade level**, zero legal jargon.
- **Numbers + comparisons:** $100k vs $15k; 20% vs 0/3/3.5%; 5 years vs a few months.
- **"So what?" answered:** *you can buy years sooner than you think.*
- **No unsupported claims:** "as low as", "can", "could" — programs have eligibility; figures are examples.

---

## STEP 16 — John Yang Brand Style

- **Optimized for John Yang @ loanDepot**; audience = first-time buyers, move-up buyers, realtors, seniors, DPA buyers.
- **Hidden strategies included:** low-down loan stacking, **down payment assistance**, **2-1 rate buydown / payment hack**, "date the rate, marry the house" adjacent framing, buy-sooner wealth-building.
- **"I never knew that" moment:** the 0/3/3.5% reveal + DPA stack.
- **Brand marks:** editorial red matches an energetic brand accent; end card = John Yang halftone portrait + loanDepot + clear single CTA.

**Series ideas (same pipeline, new `script.ts`):** "Date the Rate, Marry the House" · "The Buydown Nobody Explains" · "Seniors: Your House Is a Retirement Account" · "Realtors: Send Me This Buyer" · "Down Payment Assistance in [State]".

---

## ▶️ Build & Render

```bash
cd remotion-explainer
npm install
npm run dev       # preview + scrub in Remotion Studio
npm run render    # out/video.mp4  (add public/vo.mp3 + music.mp3, set withAudio=true, re-render)
npm run still     # out/thumbnail.png
```

The project renders **today with placeholder art** so timing/animation are locked before assets exist. Replace placeholders by generating the Step-5 prompts and dropping files into `assets/` / `public/`, then wiring each `src` prop as noted in scene comments.
