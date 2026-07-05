# Architecture & Roadmap: AI Live Sales Coaching App ("Pocket 10M Sales Trainer")

## Context

**Goal:** An iPhone app that listens to a salesperson's conversations and delivers
real-time, instant coaching — overcoming objections, uncovering buyer motivations and
pain points, persuading, and closing. The coaching brain is driven by a sales framework
the user will supply later (transcripts from elite sales-training sessions). The promise:
*anyone gets a $10M top-producer coaching them live.* Primary users: mortgage / real
estate salespeople.

**Current state:** Greenfield build — this document is the blueprint that precedes any app
code. It defines the constraints, architecture, tech stack, compliance requirements, and a
phased roadmap so implementation can start from a shared plan.

---

## ⚠️ The one constraint that shapes everything: iOS cannot tap phone-call audio

There is **no Apple API** that lets a third-party app access, record, or stream the audio
of a native cellular phone call or FaceTime call. `CallKit` exposes call *lifecycle
events* (ringing, connected, ended) but **never the audio**. This is a hard platform rule,
not a permission toggle — Android is similarly locked down on modern versions.

Consequence: the app can only "hear" a conversation when the audio flows through a path we
control. There are exactly four such paths, and they define the product:

| Path | Live coaching possible? | iOS-legal? | Notes |
|---|---|---|---|
| **A. In-app VoIP calls** (user calls clients *through* our app via Twilio Voice) | ✅ Yes — true live | ✅ Yes | Only way to get live audio from a real phone call. We own the media stream and fork it to our server. |
| **B. In-person / speakerphone** (device microphone) | ✅ Yes — true live | ✅ Yes (mic permission) | Great for open houses, in-office meetings, speaker-on calls. |
| **C. Video meetings** (Zoom/Meet via meeting bot) | ✅ Yes — near-live | ✅ Yes | For remote consults. Bot joins the meeting and streams audio. |
| **D. Record-then-review** (record/import audio, coach right after) | ❌ Post-call only | ✅ Yes | Simplest. Sidesteps realtime infra. Works for any call type. |

**A "tap into the normal Phone app" product is not buildable.** Anyone promising that on
iOS is either wrong or routing calls through their own VoIP layer (path A).

---

## Competitive positioning: why "live" is the whole point

Existing AI note-takers — **Plaud, Limitless Pendant, Otter, Fathom**, and sales-team tools
like **Gong** — are all **post-call**: record → transcribe → summarize *after* the
conversation ends. None of them coach you *during* the moment you're handling an objection.
That gap is the product's entire reason to exist, and it's a defensible position to own:
**real-time coaching, not after-action notes.** Two implications:

- The differentiator is *live*, individual, and mortgage-specific — not "better summaries."
  Lead with the in-the-moment whisper; the post-call debrief is table stakes we also do well.
- A wearable mic (a Plaud/Limitless-style pendant, or simply **AirPods as the mic**) is a
  natural *capture device* for the in-person path (Path B) — feeding our live pipeline rather
  than competing with it.

## Recommended product shape

Build the **coaching brain once**, reuse it across capture paths, and ship capture paths
in risk order:

1. **Start with Path D (record-then-coach)** as the MVP — it proves the framework
   ingestion + coaching quality with zero realtime infrastructure and works for every call
   type. This is the smallest thing that delivers the core value.
2. **Add Path B (in-person/speakerphone live)** next — pure on-device mic + our streaming
   pipeline, no telephony vendor needed.
3. **Add Path A (in-app VoIP live)** for true live coaching of phone calls — the headline
   feature, but the most infrastructure and the most compliance surface.
4. **Add Path C (video-meeting bot)** for remote consults.

This sequencing lets us validate the hardest, most differentiating part — *is the AI
coaching actually good?* — before investing in telephony and realtime plumbing.

---

## Architecture: the real-time coaching pipeline

```
 Audio source ─▶ Streaming STT ─▶ Diarization ─▶ Event detector ─▶ Claude coach ─▶ Delivery
 (A/B/C/D)       (partials)       (rep vs.        (objection?       (RAG + cached    (glance card,
                                   prospect)       pain point?       framework)       haptic, TTS,
                                                   buying signal?)                    summary)
```

**1. Audio source** — Path A: Twilio Voice **Media Streams** forks the call's μ-law audio
to our server over a WebSocket. Path B: the SwiftUI app captures mic via `AVAudioEngine`
and streams PCM frames to our server over a WebSocket. Path D: upload the recorded file.

**2. Streaming speech-to-text** — **Deepgram** (recommended) for live: lowest-latency
streaming (~150–300 ms partials), built-in speaker diarization, telephony-tuned models.
Alternatives: AssemblyAI (strong realtime + sentiment), Apple on-device `Speech` framework
(free, private, good enough for Path D post-call). Use Deepgram for live, Apple Speech as a
cheap option for post-call.

**3. Diarization** — separate **rep** from **prospect** so coaching reacts to what the
*prospect* says (objections, pain) and evaluates what the *rep* says (technique). Deepgram
provides speaker labels; we map "speaker who talks first / known device" → rep.

**4. Event detector** — **Do not call the LLM on every utterance** (too noisy, too slow,
too expensive). A lightweight classifier/heuristic layer watches the transcript stream and
fires the coach only on meaningful moments: a detected objection, a stated pain point, a
buying signal, a long rep monologue, a price question, silence after an ask, etc. This is
the key to keeping live coaching fast, cheap, and non-spammy.

**5. The Claude coach** — on a trigger, send the recent transcript window + retrieved
framework "plays" to Claude.
   - **Live tips:** `claude-haiku-4-5` or `claude-sonnet-4-6` for sub-second first-token
     latency; stream the response. Ask for a *single, short, glanceable* tip.
   - **Post-call analysis:** `claude-opus-4-8` for deep, structured debriefs (no latency
     pressure).
   - **Prompt caching:** the stable coaching methodology / persona lives in a cached system
     prompt (Anthropic prompt caching) so we pay for it once, not per turn — big latency and
     cost win on a chatty live session.

**6. Delivery** — see UX section below.

**Live latency budget (target < 2 s, prospect stops talking → tip visible):**
STT partial ~300 ms → event detection ~50 ms → Claude first token ~400–900 ms (Haiku/Sonnet,
cached prompt) → render. Achievable. Only fire on real events to stay within budget.

---

## Delivering coaching to a rep mid-conversation (the honest UX problem)

When a phone is **held to the ear**, the screen isn't visible — so live *visual* tips don't
work for ear-held cellular calls. Be deliberate about delivery per path:

- **Glance cards** (one short line, big text) — works when the rep can see the screen:
  VoIP desk calls, video consults, or speakerphone-on-the-desk.
- **Apple Watch + haptics** — a wrist tap + one-line cue (e.g. "↳ ask about their timeline")
  is the most viable *discreet, live* channel for an ear-held call. Strongly recommended for
  the live phases.
- **Discreet earpiece whisper (TTS)** — a short spoken cue in one earbud. Powerful but
  intrusive; make it opt-in and very terse.
- **Post-call summary** — always produced regardless of path: scorecard, missed objections,
  what worked, exact scripts to use next time. This is the highest-trust, lowest-friction
  surface and the MVP's main output.

**Design stance:** live nudges are minimal and rare; the rich coaching lives in the
post-call debrief. This matches how human sales coaching actually works (a whisper in the
moment, a real review after).

---

## Ingesting the sales framework (the differentiator)

The user will supply transcripts from elite training sessions. Turn them into a structured,
queryable coaching corpus — **RAG, not fine-tuning** (faster to iterate, no training runs,
easy to update as new material arrives, and citeable).

**Pipeline:**
1. **Ingest** raw transcripts/audio (audio → Deepgram/Whisper transcript).
2. **Structure with Claude** — extract reusable "**plays**": tagged units like
   `{type: objection-handler, trigger: "rate is too high", technique: "...", example script:
   "...", source: "..."}`; discovery questions; pain-point probes; closing techniques;
   tonality/pacing notes.
3. **Embed & store** the plays with vector embeddings.
4. **Retrieve at runtime** — match the live moment (e.g. detected objection text) against the
   play library and inject the top plays into the coaching prompt.
5. **Cache the core methodology** (the trainer's persona, principles, do/don't rules) as a
   cached system prompt; RAG supplies the situation-specific scripts.

**Store:** **Supabase** (Postgres + `pgvector` + auth + file storage) — one managed backend
for the framework corpus, user accounts, call records, transcripts, and embeddings. (A
Supabase MCP connection is available in this environment for provisioning.)

---

## Recommended tech stack

| Layer | Choice | Why |
|---|---|---|
| **iOS app** | **Native Swift + SwiftUI** | CallKit, PushKit/VoIP push, background audio entitlements, `AVAudioEngine`, and a Watch app all demand native. React Native/Flutter fight these APIs. |
| **Telephony (Path A)** | **Twilio Voice + Media Streams** | Programmable calling + real phone numbers + a documented way to fork live call audio to a WebSocket. |
| **Realtime transport** | **WebSocket** (app↔server, Twilio↔server) | Simpler than WebRTC for server-side audio forking; WebRTC only if we later need peer media. |
| **Streaming STT** | **Deepgram** (live), Apple `Speech` (cheap post-call) | Lowest live latency + diarization; on-device option for private post-call. |
| **LLM** | **Claude** — Haiku 4.5 / Sonnet 4.6 (live), Opus 4.8 (post-call) | Latency-tiered; prompt caching for the framework. |
| **Backend** | **Python + FastAPI** (async) | First-class async WebSockets; clean Deepgram + Anthropic SDK integration; ML-friendly for the event detector. (Node/TS is a fine alternative.) |
| **Data / auth / vectors** | **Supabase** (Postgres + pgvector) | One managed service for data, auth, storage, embeddings. |
| **Watch** | watchOS companion app | Discreet live haptic/glance delivery. |

---

## Legal & compliance (must be designed in, not bolted on)

- **Call-recording consent.** US split: ~38 states are **one-party consent**; ~11–12 are
  **all-party (two-party) consent** (incl. **CA, FL, PA, WA, IL, MD**, etc.). Because
  mortgage calls cross state lines, **default to all-party consent.**
- **Consent UX:** automated verbal disclosure at call start ("This call may be recorded for
  coaching…") for VoIP, an explicit in-app consent gate, and stored, timestamped consent
  records per call.
- **App Store review:** Apple scrutinizes call-recording apps hard — you must clearly
  disclose recording and obtain consent (Guideline 5.x / privacy). VoIP apps are allowed;
  "secretly record someone" framing will be rejected. Plan the privacy nutrition label and
  consent flow up front.
- **Data privacy:** call audio/transcripts are sensitive PII. Encrypt at rest and in transit,
  define retention/deletion, allow users to delete recordings, and keep a clear privacy
  policy. Mortgage context also implies **GLBA**-adjacent care with financial data.

---

## Phased roadmap

- **Phase 0 — This plan.** (done on approval)
- **Phase 1 — MVP: Record-then-coach (Path D).** Native app: record (with consent) or import
  a call → upload → Deepgram/Apple STT → diarize → **Claude (Opus) post-call coaching report**
  using the ingested framework. *Proves the coaching brain + framework RAG with zero realtime
  infra. Works for any call type.* **Build this first.**
- **Phase 2 — Live in-person/speakerphone (Path B).** App streams mic → server pipeline →
  event detector → live glance cards + **Apple Watch haptics**; post-call summary retained.
- **Phase 3 — Live VoIP calls (Path A).** Twilio Voice + Media Streams; in-app dialer; verbal
  consent disclosure; full live pipeline. *The headline "live coaching on phone calls"
  feature.*
- **Phase 4 — Video meetings + scale (Path C).** Meeting bot for Zoom/Meet; CRM integration;
  manager dashboards, scorecards, trend analytics across a team.

---

## Critical files to create (Phase 1, when we build)

- `docs/ARCHITECTURE.md`, `README.md` — this blueprint, committed to the repo.
- `backend/` (FastAPI): `main.py`, `routers/coaching.py`, `services/stt.py`,
  `services/claude_coach.py` (cached-prompt + RAG), `services/framework_ingest.py`,
  `services/events.py` (trigger detector), `db/` (Supabase client, pgvector schema).
- `ios/` (SwiftUI): recording/import + upload, consent gate, post-call report UI, auth.
- `framework/` — ingestion scripts + the structured "plays" schema for the supplied
  transcripts.

## Verification (per phase)

- **Coaching quality (Phase 1):** feed 5–10 sample/synthetic mortgage call transcripts
  through the pipeline; have the user (domain expert) rate the post-call reports against what
  a real trainer would say. Iterate the framework prompts/RAG until reports are trusted.
- **Framework ingestion:** spot-check that supplied training transcripts produce correctly
  tagged "plays" and that retrieval returns the right play for a given objection.
- **Live latency (Phases 2–3):** measure prospect-stops-talking → tip-visible; assert < 2 s
  p50 on real audio; tune event-trigger thresholds to avoid spammy tips.
- **Compliance:** verify consent is captured/stored before any recording, and that the
  all-party disclosure plays on VoIP calls.
- **End-to-end:** a scripted mock call (rep + "prospect") exercising an objection → confirm
  the right play surfaces live and the debrief flags it.

## Open decisions to confirm before/while building

1. **Primary call type to target first** for the *live* phases (VoIP phone calls vs.
   in-person/speakerphone vs. video) — affects Phase 2 vs 3 ordering. (Phase 1 is
   call-type-agnostic, so we can start regardless.)
2. **Live delivery channel** priority: Apple Watch haptics vs. on-screen vs. earpiece whisper.
3. **Backend language**: FastAPI (recommended) vs. Node/TypeScript.
4. **Solo product vs. team/manager** features in scope (affects data model from day one).
