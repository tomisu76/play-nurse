'use client';

import { useEffect, useState } from 'react';
import { ConversationRoom } from '@/components/ConversationRoom';
import { FeedbackReport } from '@/components/FeedbackReport';
import { ScenarioSelector } from '@/components/ScenarioSelector';
import { getScenario, scenarios } from '@/lib/scenarios';
import type { ConversationTurn } from '@/lib/types';

const disclaimer = 'Educational simulation only. Not for real medical diagnosis or treatment.';

export default function HomePage() {
  const [selectedScenario, setSelectedScenario] = useState<string>('');
  const [history, setHistory] = useState<ConversationTurn[]>([]);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const savedScenario = localStorage.getItem('selectedScenario') || '';
    const savedHistory = localStorage.getItem('conversationHistory');
    const savedFeedback = localStorage.getItem('lastFeedbackEnded') === 'true';
    if (savedScenario) setSelectedScenario(savedScenario);
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    setEnded(savedFeedback);
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedScenario', selectedScenario);
    localStorage.setItem('conversationHistory', JSON.stringify(history));
    localStorage.setItem('lastFeedbackEnded', String(ended));
  }, [selectedScenario, history, ended]);

  const reset = () => {
    setHistory([]);
    setEnded(false);
    localStorage.removeItem('conversationHistory');
    localStorage.removeItem('lastFeedbackEnded');
  };

  const chooseScenario = (id: string) => {
    setSelectedScenario(id);
    setHistory([]);
    setEnded(false);
  };

  const scenario = selectedScenario ? getScenario(selectedScenario) : null;

  return (
    <div>
      <header className="hero">
        <div className="hero-inner">
          <div className="pill">Second-year nursing English</div>
          <h1>AI Nursing English Voice Trainer</h1>
          <p>Simple OSCE Voice Practice</p>
          <div className="disclaimer">{disclaimer}</div>
        </div>
      </header>

      <div className="container">
        {!scenario && <ScenarioSelector scenarios={scenarios} onSelect={chooseScenario} />}
        {scenario && !ended && (
          <ConversationRoom scenario={scenario} history={history} setHistory={setHistory} onEnd={() => setEnded(true)} onReset={reset} />
        )}
        {scenario && ended && <FeedbackReport history={history} onReset={reset} />}
      </div>

      <footer>{disclaimer}</footer>
    </div>
  );
}
