'use client';

import { checklistLabels, scoreTranscript } from '@/lib/scoring';
import type { ConversationTurn } from '@/lib/types';

const phrases = [
  'Good morning. My name is ____.',
  'May I ask you some questions?',
  'How long have you had this problem?',
  'On a scale of 0 to 10, how bad is it?',
  'Do you have any allergies?',
  'I understand. I will inform the nurse.',
];

export function FeedbackReport({ history, onReset }: { history: ConversationTurn[]; onReset: () => void }) {
  const result = scoreTranscript(history);
  const download = () => {
    const report = { score: result.score, completed: result.completed, missing: result.missing, history };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'osce-feedback-report.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="card feedback">
      <h2>Feedback Report</h2>
      <div className="score big">{result.score}<span>/100</span></div>
      <h3>Completed checklist</h3>
      <ul>{result.completed.map((id) => <li key={id}>✓ {checklistLabels[Number(id)]}</li>)}</ul>
      <h3>Missing checklist</h3>
      <ul>{result.missing.map((id) => <li key={id}>○ {checklistLabels[Number(id)]}</li>)}</ul>
      <h3>Suggested better phrases</h3>
      <ul>{phrases.map((phrase) => <li key={phrase}>{phrase}</li>)}</ul>
      <h3>Conversation transcript</h3>
      <div className="history compact">{history.map((turn, index) => <p key={index}><strong>{turn.role}:</strong> {turn.text}</p>)}</div>
      <div className="actions">
        <button onClick={download}>Download JSON report</button>
        <button className="secondary" onClick={onReset}>Practice again</button>
      </div>
    </section>
  );
}
