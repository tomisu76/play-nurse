import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const text = String(body.text || '');
  const voice = String(body.voice || process.env.KOKORO_VOICE || 'af_heart');
  const speed = Number(body.speed || 1);
  const endpoint = process.env.KOKORO_TTS_ENDPOINT;
  const apiKey = process.env.KOKORO_TTS_API_KEY;

  if (!endpoint || !text) return NextResponse.json({ ok: false, fallback: true });

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({ model: 'kokoro', input: text, voice, speed }),
    });

    if (!response.ok) throw new Error('tts failed');
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await response.json();
      if (data.audio_url) return NextResponse.json({ ok: true, audio_url: data.audio_url, fallback: false });
      if (data.audio_base64) return NextResponse.json({ ok: true, audio_base64: data.audio_base64, audio_mime: data.audio_mime || 'audio/wav', fallback: false });
    }

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return NextResponse.json({ ok: true, audio_base64: base64, audio_mime: contentType || 'audio/wav', fallback: false });
  } catch {
    return NextResponse.json({ ok: false, fallback: true });
  }
}
