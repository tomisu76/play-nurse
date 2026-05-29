import { NextResponse } from 'next/server';
import { mockPatientReply } from '@/lib/mockPatient';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const scenario = String(body.scenario || 'fever-rash');
  const studentTranscript = String(body.studentTranscript || '');
  const history = Array.isArray(body.conversationHistory) ? body.conversationHistory : [];

  const apiKey = process.env.GROK_API_KEY;
  const apiBase = process.env.GROK_API_BASE || 'https://api.x.ai/v1';
  const model = process.env.GROK_MODEL || 'grok-3-mini';

  if (apiKey) {
    try {
      const response = await fetch(`${apiBase}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: 'Role-play a short simple English patient reply for nursing OSCE practice. Stay as the patient only.' },
            ...history.map((turn: { role?: string; text?: string }) => ({
              role: turn.role === 'patient' ? 'assistant' : 'user',
              content: String(turn.text || ''),
            })),
            { role: 'user', content: studentTranscript },
          ],
          temperature: 0.4,
        }),
      });
      if (!response.ok) throw new Error('chat failed');
      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content;
      if (reply) return NextResponse.json({ reply_text: reply, source: 'grok' });
    } catch {}
  }

  return NextResponse.json({ reply_text: mockPatientReply(scenario, studentTranscript), source: 'mock' });
}
