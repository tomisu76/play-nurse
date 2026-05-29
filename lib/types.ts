export type ScenarioId = string;

export type Scenario = {
  id: ScenarioId;
  title: string;
  patientName: string;
  age: number;
  chiefComplaint: string;
  hiddenInfo: string[];
  demoTranscript: string;
};

export type ConversationTurn = {
  role: string;
  text: string;
  source?: string;
  createdAt: string;
};

export type ChecklistItem = {
  id: string;
  label: string;
  keywords: string[];
};

export type ScoreResult = {
  score: number;
  completed: string[];
  missing: string[];
  bonus: number;
};

export type TtsResult = {
  ok: boolean;
  audio_base64?: string;
  audio_url?: string;
  audio_mime?: string;
  fallback?: boolean;
};
