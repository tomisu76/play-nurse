import type { ConversationTurn, ScoreResult } from './types';

export const checklistLabels = [
  'Greeting',
  'Permission',
  'Main question',
  'Time question',
  'Comfort question',
  'Medicine question',
  'Kind closing',
];

const groups = [
  ['hello', 'good morning', 'my name is', 'nurse', 'student'],
  ['may i ask', 'can i ask', 'questions', 'talk with you'],
  ['problem', 'what happened', 'how can i help'],
  ['when', 'start', 'how long', 'duration'],
  ['scale', '0 to 10', 'hurt'],
  ['medicine', 'medication', 'allergy'],
  ['sorry', 'understand', 'thank you', 'please wait'],
];

export function scoreTranscript(turns: ConversationTurn[]): ScoreResult {
  const text = turns.filter((turn) => turn.role === 'student').map((turn) => turn.text).join(' ').toLowerCase();
  const completed = groups.map((keywords, index) => keywords.some((keyword) => text.includes(keyword)) ? String(index) : '').filter(Boolean);
  const missing = groups.map((_, index) => String(index)).filter((id) => !completed.includes(id));
  const bonus = text.includes('please') || text.includes('thank you') ? 2 : 0;
  return { score: Math.min(100, completed.length * 14 + bonus), completed, missing, bonus };
}
