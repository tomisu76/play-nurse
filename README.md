# AI Nursing English Voice Trainer

Simple OSCE Voice Practice for second-year nursing students.

Educational simulation only. Not for real medical diagnosis or treatment.

## What it does

Students select a patient scenario, speak or type an English sentence, send it to the AI patient, hear a patient reply, and receive a simple OSCE feedback report.

The app is intentionally simple:

- Next.js App Router
- React + TypeScript
- localStorage only
- No authentication
- No database
- Grok/xAI chat fallback to mock patient
- Kokoro TTS fallback to browser speech synthesis
- Playwright smoke test

## Install

```bash
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:3000
```

## Environment

Copy `.env.example` to `.env.local`.

```bash
cp .env.example .env.local
```

### Grok setup

Set:

```bash
GROK_API_KEY=your_key_here
GROK_MODEL=grok-3-mini
GROK_API_BASE=https://api.x.ai/v1
```

If `GROK_API_KEY` is missing or the request fails, the app uses the local mock patient.

### Kokoro setup

Set:

```bash
KOKORO_TTS_ENDPOINT=http://localhost:8880/v1/audio/speech
KOKORO_TTS_API_KEY=
KOKORO_VOICE=af_heart
```

If Kokoro is missing or fails, the browser speech voice fallback is used.

## Microphone note

Browser speech recognition usually requires localhost or HTTPS. It may not work in every browser. If it is unavailable, students can type their sentence or use the Demo Transcript button.

## Test

```bash
npm run build
npm run test:e2e
```

The smoke test is designed to pass without Grok and without Kokoro.
