import type { TtsResult } from './types';

export async function playPatientAudio(ttsResult: TtsResult, fallbackText: string) {
  try {
    if (ttsResult.audio_url) {
      const audio = new Audio(ttsResult.audio_url);
      await audio.play();
      return 'Playing generated voice.';
    }

    if (ttsResult.audio_base64) {
      const binary = atob(ttsResult.audio_base64);
      const bytes = new Uint8Array(binary.length);
      for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
      const blob = new Blob([bytes], { type: ttsResult.audio_mime || 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      await audio.play();
      return 'Playing generated voice.';
    }
  } catch {
    // Continue to browser voice fallback.
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(fallbackText);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
    return 'Using browser voice fallback.';
  }

  return 'Audio is not available in this browser.';
}
