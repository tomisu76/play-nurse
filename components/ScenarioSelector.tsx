'use client';

import type { Scenario } from '@/lib/types';

export function ScenarioSelector({ scenarios, onSelect }: { scenarios: Scenario[]; onSelect: (id: string) => void }) {
  return (
    <section className="grid cards">
      {scenarios.map((scenario) => (
        <button key={scenario.id} className="card scenario" onClick={() => onSelect(scenario.id)}>
          <div className="badge">OSCE Scenario</div>
          <h2>{scenario.title}</h2>
          <p><strong>Patient:</strong> {scenario.patientName}, {scenario.age}</p>
          <p>{scenario.chiefComplaint}</p>
          <span className="start">Start Conversation</span>
        </button>
      ))}
    </section>
  );
}
