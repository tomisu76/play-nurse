'use client';

import { useMemo, useState } from 'react';
import { playPatientAudio } from '@/lib/audio';
import type { ConversationTurn, Scenario, TtsResult } from '@/lib/types';
import { PatientCard } from './PatientCard';
import { ScorePanel } from './ScorePanel';

export function ConversationRoom({ scenario, history, setHistory, onEnd, onReset }: { scenario: Scenario; history: ConversationTurn[]; setHistory: (turns: ConversationTurn[]) => void; onEnd: () => void; onReset: () => void }) {
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState('Ready.');
  const [latestTts, setLatestTts] = useState<TtsResult>({ ok: false, fallback: true });
  const latestPatientReply = useMemo(() => [...history].reverse().find((turn) => turn.role === 'patient')?.text || '', [history]);

  const startMic = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setStatus('Speech recognition is not available in this browser. Please type your sentence.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onresult = (event: any) => setTranscript(event.results[0][0].transcript);
    recognition.onerror = () => setStatus('Speech recognition error. Please type your sentence.');
    recognition.start();
    setStatus('Listening...');
  };

  const send = async () => {
    if (!transcript.trim()) return;
    const studentTurn: ConversationTurn = { role: 'student', text: transcript.trim(), createdAt: new Date().toISOString() };
    const nextHistory = [...history, studentTurn];
    setHistory(nextHistory);
    setStatus('Thinking...');

    const chatResponse = await fetch('/api/patient-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenario: scenario.id, studentTranscript: studentTurn.text, conversationHistory: history }),
    });
    const chatData = await chatResponse.json();
    const reply = String(chatData.reply_text || 'Could you ask me again in simple words?');
    const patientTurn: ConversationTurn = { role: 'patient', text: reply, source: chatData.source || 'mock', createdAt: new Date().toISOString() };
    const finalHistory = [...nextHistory, patientTurn];
    setHistory(finalHistory);
    setTranscript('');
    setStatus(chatData.source === 'mock' ? 'Using mock patient fallback.' : 'Patient replied.');

    setStatus('Generating voice...');
    const ttsResponse = await fetch('/api/kokoro-tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: reply, voice: 'af_heart', speed: 1 }),
    });
    const ttsData = await ttsResponse.json();
    setLatestTts(ttsData);
    const audioStatus = await playPatientAudio(ttsData, reply);
    setStatus(ttsData.fallback ? 'Using browser voice fallback.' : audioStatus);
  };

  const playLatest = async () => {
    if (!latestPatientReply) return;
    const audioStatus = await playPatientAudio(latestTts, latestPatientReply);
    setStatus(audioStatus);
  };

  return (
    <section className="room">
      <PatientCard scenario={scenario} />
      <main className="card conversation">
        <div className="room-head">
          <div>
            <h2>{scenario.title}</h2>
            <p className="muted">Simple OSCE Voice Practice</p>
          </div>
          <button className="secondary" onClick={onReset}>Reset</button>
        </div>
        <div className="notice">Educational simulation only. Not for real medical diagnosis or treatment.</div>
        <div className="controls">
          <button onClick={startMic}>🎙️ Microphone</button>
          <button className="secondary" onClick={() => setTranscript(scenario.demoTranscript)}>Demo Transcript</button>
        </div>
        <textarea aria-label="Transcript" value={transcript} onChange={(event) => setTranscript(event.target.value)} placeholder="Speak or type your sentence here..." />
        <div className="actions">
          <button onClick={send}>Send to Patient</button>
          <button className="secondary" onClick={playLatest}>Play latest voice</button>
          <button className="danger" onClick={onEnd}>End Scenario</button>
        </div>
        <p className="status">{status}</p>
        <div className="history">
          {history.map((turn, index) => (
            <p key={index} className={turn.role === 'student' ? 'student' : 'patient'}><strong>{turn.role}:</strong> {turn.text}</p>
          ))}
        </div>
      </main>
      <ScorePanel history={history} />
    </section>
  );
}
