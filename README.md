# Pocket 10M Sales Trainer

An app that listens to a salesperson's calls and delivers **real-time coaching** — overcoming
objections, uncovering buyer motivations and pain points, persuading, and closing. The coaching
brain is driven by a sales framework distilled from elite ($10M+ top-producer) sales-training
sessions. Primary users: **mortgage / real estate salespeople.**

> The promise: *anyone gets a $10M top-producer coaching them live.*

## 🖥️ Lead build: the macOS desktop app ("Deal Coach")

The **current priority** is a native **MacBook Pro** app. macOS removes iOS's fatal limitation:
a Mac app *can* capture the call audio (the Mac mic hears the speakerphone — both you and the
prospect) and *can* show a live coaching overlay on the screen in front of you. Live tips +
ready-to-read scripts appear in an always-on-top panel; a full debrief follows the call.

**→ Full macOS build plan: [`docs/MACOS_APP.md`](docs/MACOS_APP.md)**

The original mobile vision (and why iOS can't tap phone-call audio) lives in
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) as the future iPhone-companion roadmap.

## Why this exists

Every existing tool — Plaud, Limitless, Otter, Fathom, Gong — is **post-call**: it records,
transcribes, and summarizes *after* the conversation ends. None coach you *during* the
moment you're handling an objection. **Live, in-the-moment coaching is the entire product
and the moat.**

## The key constraint

iOS provides **no API** to access the audio of a native cellular phone call or FaceTime
call. So the app can only "hear" a conversation when audio flows through a path we control:

| Path | Live? | Use case |
|---|---|---|
| **A. In-app VoIP calls** (Twilio Voice) | ✅ | True live coaching of phone calls (headline feature) |
| **B. In-person / speakerphone** (device mic / wearable) | ✅ | Open houses, in-office meetings |
| **C. Video meetings** (Zoom/Meet bot) | ✅ | Remote consults |
| **D. Record-then-review** | ❌ post-call | Any call type; the MVP |

## How it works

```
Audio → Streaming STT (Deepgram) → Diarization → Event detector → Claude coach → Delivery
                                    (rep vs.       (objection?      (RAG + cached   (Watch haptic,
                                     prospect)      pain point?)     framework)      glance card,
                                                                                     post-call debrief)
```

The supplied training transcripts are turned into a structured library of tagged **"plays"**
(objection-handlers, discovery questions, closes) retrieved in real time and injected into
the coaching prompt (RAG + Anthropic prompt caching). Claude Haiku/Sonnet drive low-latency
live tips; Claude Opus drives deep post-call debriefs.

## Roadmap

- **Phase 1 — MVP:** Record-then-coach (Path D). Proves the coaching brain + framework with
  zero realtime infra.
- **Phase 2:** Live in-person/speakerphone (Path B) with Apple Watch haptics.
- **Phase 3:** Live VoIP phone calls (Path A) via Twilio — the headline feature.
- **Phase 4:** Video meetings (Path C), CRM integration, team/manager dashboards.

## Stack (planned)

Native **Swift/SwiftUI** + watchOS · **FastAPI** backend · **Deepgram** STT · **Claude**
(Haiku/Sonnet/Opus) · **Twilio Voice** (Path A) · **Supabase** (Postgres + pgvector).

## Compliance

Default to **all-party recording consent** (mortgage calls cross state lines), in-app consent
gates, automated verbal disclosure on VoIP calls, and encrypted storage with retention/delete
controls. See the full doc for App Store and privacy considerations.

---

📄 **Full architecture, latency budgets, tech-stack rationale, compliance, and verification
plan:** [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
