export function mockPatientReply(scenarioId: string, studentTranscript: string): string {
  const text = studentTranscript.toLowerCase();

  if (scenarioId === 'fever-rash') {
    if (text.includes('how long') || text.includes('when')) return 'I have had it for two days.';
    if (text.includes('rash')) return 'Yes, I have a red rash on my arms and body.';
    if (text.includes('medicine') || text.includes('paracetamol')) return 'I took paracetamol this morning.';
    if (text.includes('allergy')) return 'No, I do not have any drug allergies.';
    if (text.includes('mosquito')) return 'I had many mosquito bites last week.';
  }

  if (scenarioId === 'shortness-breath') {
    if (text.includes('breath') || text.includes('walk')) return 'I feel short of breath, especially when I walk.';
    if (text.includes('chest pain')) return 'No, I do not have chest pain.';
    if (text.includes('cough')) return 'Yes, I have a cough with a little phlegm.';
    if (text.includes('fever')) return 'I have a mild fever.';
    if (text.includes('inhaler')) return 'I sometimes use an inhaler.';
  }

  if (scenarioId === 'postop-pain') {
    if (text.includes('scale') || text.includes('0 to 10')) return 'It is 7 out of 10 when I move.';
    if (text.includes('cough')) return 'I am afraid to cough.';
    if (text.includes('pillow') || text.includes('support')) return 'Okay, I will hold the pillow.';
    if (text.includes('deep breath')) return 'Okay, I will try to take a slow deep breath.';
    if (text.includes('understand') || text.includes('sorry')) return 'Thank you, nurse. I feel less worried.';
  }

  return 'I am sorry, nurse. Could you ask me again in simple words?';
}
