import { checklistLabels, scoreTranscript } from '@/lib/scoring';
import type { ConversationTurn } from '@/lib/types';

export function ScorePanel({ history }: { history: ConversationTurn[] }) {
  const result = scoreTranscript(history);
  return (
    <aside className="card score-panel">
      <h2>Live OSCE Score</h2>
      <div className="score">{result.score}<span>/100</span></div>
      <ul className="checklist">
        {checklistLabels.map((label, index) => {
          const done = result.completed.includes(String(index));
          return <li key={label} className={done ? 'done' : ''}>{done ? '✓' : '○'} {label}</li>;
        })}
      </ul>
    </aside>
  );
}
