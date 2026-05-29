import type { Scenario } from './types';

export const scenarios: Scenario[] = [
  {
    id: 'fever-rash',
    title: 'Fever and Rash',
    patientName: 'Mali',
    age: 28,
    chiefComplaint: 'High fever and rash for two days.',
    hiddenInfo: [
      'mosquito bites last week',
      'body aches',
      'took paracetamol',
      'no drug allergies',
    ],
    demoTranscript:
      'Good morning. My name is Piya. May I ask you some questions? How long have you had the fever? Do you have any allergies?',
  },
  {
    id: 'shortness-breath',
    title: 'Shortness of Breath',
    patientName: 'Somchai',
    age: 62,
    chiefComplaint: 'Shortness of breath and cough.',
    hiddenInfo: [
      'worse when walking',
      'uses inhaler sometimes',
      'no chest pain',
      'mild fever',
    ],
    demoTranscript:
      'Hello, I am a nursing student. Do you have shortness of breath? Do you have chest pain? Do you use any medicine?',
  },
  {
    id: 'postop-pain',
    title: 'Postoperative Pain and Deep Breathing',
    patientName: 'Anong',
    age: 55,
    chiefComplaint: 'Pain after abdominal surgery and afraid to cough.',
    hiddenInfo: [
      'pain 7 out of 10 when moving',
      'afraid stitches will open',
      'willing to try pillow support',
      'needs reassurance',
    ],
    demoTranscript:
      'Hello, I am your nurse. On a scale of 0 to 10, how bad is your pain? Please support your wound with this pillow and take a slow deep breath.',
  },
];

export function getScenario(id: string) {
  return scenarios.find((scenario) => scenario.id === id) ?? scenarios[0];
}
