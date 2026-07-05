# macOS Desktop App — "Deal Coach" (Lead Build)

Live sales coaching on a MacBook Pro. This is the **current priority build** — macOS removes
iOS's fatal limitation: a Mac app *can* capture call audio and *can* show a live on-screen
coaching overlay (the screen is right in front of the user, unlike a phone at the ear).

> See [`ARCHITECTURE.md`](ARCHITECTURE.md) for the broader product vision and the iPhone
> companion roadmap.

## Confirmed decisions

- **Processing:** on-Mac app + **cloud AI** — **Claude** for coaching, **Deepgram** for live
  transcription. API keys stored locally in the macOS **Keychain**. **No backend server**; the
  app calls Deepgram and Anthropic directly.
- **Call sources:** calls taken on **iPhone and MacBook, on speaker** → primary capture is the
  **Mac microphone hearing the speakerphone** (picks up both the rep and the prospect). Works
  the same whether the call is on the iPhone next to the Mac or on the Mac. No virtual audio
  driver required.
- **Environment note:** the development cloud environment is Linux and **cannot compile or run
  macOS apps** — the Xcode/Swift project is authored here and committed; **build & verification
  happen in Xcode on the user's MacBook Pro**.

## User experience

A menu-bar app. Hit **Start** (or a global hotkey) when a call begins. A small **always-on-top
floating panel** appears in a screen corner and shows, in real time:

- **Live tips** — one glanceable line the moment it matters ("She raised a rate objection →
  acknowledge, then reframe on monthly payment").
- **Ready-to-read scripts** — the exact words to say next, from the trained framework,
  tap-to-expand.
- **Signals** — detected objection / pain point / buying signal, plus talk-time balance.

On call end: a **post-call debrief** — scorecard, objections handled/missed, what worked, and
scripts to practice.

## Architecture (on-device app + two cloud APIs)

```
 Mac mic (speakerphone) ─▶ AVAudioEngine tap ─▶ Deepgram WS ─▶ diarization ─▶ event detector
        │                   (16k PCM frames)     (live STT)     (rep/prospect)   (objection?
        │                                                                          pain? signal?)
        ▼                                                                              │
  optional: ScreenCaptureKit                                              ┌────────────┘
  system-audio (Mac-native calls,                                        ▼
  cleaner far-end) — Phase M2                            Claude Messages API (streaming, SSE)
                                                         · framework injected + prompt-cached
                                                         · Haiku/Sonnet for live tips
                                                         · Opus for post-call debrief
                                                                    │
                                                                    ▼
                                                    Floating SwiftUI overlay panel
                                                    (tips + scripts) · post-call report
```

**1. Audio capture** — `AVAudioEngine` taps the input node (Mac mic), delivering PCM buffers;
downsample to 16 kHz mono → stream to Deepgram. Requires the **Microphone** permission
(`NSMicrophoneUsageDescription`). *(Phase M2: optionally add `ScreenCaptureKit` audio-only
capture — macOS 13+ — for a clean far-end on Mac-native calls; needs Screen Recording
permission.)*

**2. Live STT + diarization** — **Deepgram** streaming over `URLSessionWebSocketTask` (nova
model, `diarize=true`, interim results). From one speakerphone mic the voices are mixed, so we
lean on Deepgram's speaker labels to separate **rep vs. prospect**; heuristic fallback
(louder/near voice = rep).

**3. Event detector** — a lightweight local layer over the transcript stream that fires the
coach **only on meaningful moments** (objection, stated pain, price question, buying signal,
long rep monologue, silence after an ask). Keeps tips fast, cheap, non-spammy. Keyword/pattern
rules for MVP; small classifier later.

**4. Claude coach** — on a trigger, send the recent transcript window + relevant framework
"plays" to the **Claude Messages API** (streaming SSE via `URLSession`).
   - Live tips: **Haiku 4.5 / Sonnet 4.6** for sub-second first token; ONE short tip + one
     script line.
   - Post-call debrief: **Opus 4.8**.
   - **Prompt caching** the framework/persona system block (`cache_control`) → paid once; big
     latency + cost win on a chatty call.

**5. Delivery** — an `NSPanel` (`.floating` level, `.nonactivating`, joins all Spaces) hosting
a SwiftUI view. Big glanceable type; tap a tip to reveal the full script; optional flash on a
new critical cue.

**Latency budget** (prospect stops talking → tip on screen, target **< 2 s**): Deepgram interim
~300 ms → event detect ~50 ms → Claude first token ~400–900 ms (cached prompt) → render. Fire
only on real events to hold the budget.

## Ingesting the sales framework

Turn the user's training transcripts into a structured library of tagged **"plays"**
(objection-handlers, discovery questions, closes, tonality notes). For the Mac MVP (no server):

- **Store** plays as a local JSON bundle in the app.
- **MVP retrieval:** if the framework is small/medium, inject the condensed play-set into the
  **prompt-cached** Claude system block (cheap, no vector DB). If large, add on-device embedding
  + cosine-similarity retrieval (Phase M2) to pull only the top plays per moment.
- A one-time **ingestion script** converts raw transcripts → structured plays JSON via Claude
  (Opus).

## Tech stack

| Layer | Choice |
|---|---|
| App | **native Swift + SwiftUI + AppKit** (`MenuBarExtra` + `NSPanel` overlay) |
| Audio | `AVAudioEngine` (mic); `ScreenCaptureKit` for system audio in Phase M2 |
| Live STT | **Deepgram** streaming (`URLSessionWebSocketTask`) |
| LLM | **Claude** Messages API — Haiku/Sonnet (live), Opus (debrief), streaming SSE, prompt caching |
| Secrets | macOS **Keychain** (user pastes Deepgram + Anthropic keys in Settings) |
| Storage | local files / SQLite (call history, transcripts, plays JSON) |
| Min OS | macOS 13+ (14.2+ recommended for future Core Audio process taps) |

## Legal & compliance

**Default to all-party recording consent** (mortgage calls cross state lines): an in-app consent
toggle and a reminder to disclose recording. As a personal, locally-installed tool (not App
Store distributed initially), Apple review isn't an MVP gate, but recording law still applies.
Store call data encrypted locally; one-click delete.

## Phased roadmap

- **Phase M1 — MVP (build first):** menu-bar app · mic/speakerphone capture · Deepgram live STT
  + diarization · event detector · Claude live tips + scripts in the floating overlay ·
  post-call debrief · framework via prompt-cached plays JSON · Keychain settings for API keys.
- **Phase M2:** `ScreenCaptureKit` system-audio capture for a cleaner Mac-call far-end ·
  on-device embedding retrieval (RAG) for a large framework · scripts browser + global hotkeys ·
  call history.
- **Phase M3:** analytics/trends across calls · per-scenario tuning · optional fully-offline mode
  (local Whisper + local LLM) · optional iPhone companion.

## Critical files to create (Phase M1)

- `macos/DealCoach.xcodeproj` (or a Swift Package) — the app.
- `macos/DealCoach/App.swift`, `MenuBarView.swift`, `CoachOverlayPanel.swift` (NSPanel host),
  `SettingsView.swift` (Keychain key entry + consent toggle).
- `macos/DealCoach/Audio/MicCapture.swift` (AVAudioEngine tap + resample).
- `macos/DealCoach/STT/DeepgramClient.swift` (WebSocket streaming + diarization).
- `macos/DealCoach/Coach/EventDetector.swift`, `ClaudeCoach.swift` (streaming SSE + prompt
  cache), `PostCallReport.swift`.
- `macos/DealCoach/Framework/plays.json` + `ingest/build_plays.(swift|py)` (transcripts → plays).
- `macos/DealCoach/Store/` (Keychain wrapper, SQLite/history).

## Verification (on the user's Mac)

1. Open in Xcode on the MacBook Pro, build & run; grant Microphone permission.
2. Paste Deepgram + Anthropic keys in Settings (stored in Keychain).
3. **Dry run without a real call:** speak sample objections aloud ("your rate is higher than my
   bank") → confirm live transcription appears, the event detector fires, and a tip + script
   render in the overlay within ~2 s.
4. **Real call:** put an iPhone call on speaker next to the Mac → confirm both sides transcribe,
   speakers are separated, and coaching is relevant. Measure tip latency.
5. End the call → confirm the post-call debrief generates with a scorecard and missed-objection
   list.
6. Tune event-detector thresholds so tips are timely but not spammy.

## Open decisions

1. **App name / branding** (placeholder: "Deal Coach").
2. **Framework size** — determines MVP retrieval (prompt-cache whole set vs. on-device RAG).
3. **Add system-audio capture in M1 or wait for M2?** (Mic-only is enough for speakerphone.)
