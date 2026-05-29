import type { Scenario } from '@/lib/types';

export function PatientCard({ scenario }: { scenario: Scenario }) {
  return (
    <aside className="card patient-card">
      <div className="avatar" aria-hidden="true">{scenario.patientName.slice(0, 1)}</div>
      <h2>{scenario.patientName}</h2>
      <p className="muted">Age {scenario.age}</p>
      <p><strong>Chief complaint:</strong> {scenario.chiefComplaint}</p>
      <div className="notice">Educational simulation only. Not for real medical diagnosis or treatment.</div>
    </aside>
  );
}
