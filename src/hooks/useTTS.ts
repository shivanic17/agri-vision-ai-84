import { useCallback, useRef, useState } from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';

interface TTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
}

export const useTTS = () => {
  const { language } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(typeof window !== 'undefined' && 'speechSynthesis' in window);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const getVoice = useCallback((lang: Language) => {
    if (!isSupported) return null;
    
    const voices = speechSynthesis.getVoices();
    
    // Voice preferences for each language
    const voicePreferences = {
      en: ['Microsoft Zira', 'Google US English', 'Alex', 'Samantha'],
      te: ['Microsoft Heera', 'Google Telugu', 'Telugu India']
    };

    // Find preferred voice for the language
    for (const voiceName of voicePreferences[lang]) {
      const voice = voices.find(v => v.name.includes(voiceName));
      if (voice) return voice;
    }

    // Fallback to any voice that supports the language
    const langCode = lang === 'te' ? 'te-IN' : 'en-US';
    return voices.find(v => v.lang.startsWith(langCode)) || voices.find(v => v.lang.startsWith(lang)) || voices[0];
  }, [isSupported]);

  const speak = useCallback((text: string, options: TTSOptions = {}) => {
    if (!isSupported || !text.trim()) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = getVoice(language);
    
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.lang = language === 'te' ? 'te-IN' : 'en-US';
    utterance.rate = options.rate || 0.9;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  }, [language, getVoice, isSupported]);

  const stop = useCallback(() => {
    if (isSupported) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  const pause = useCallback(() => {
    if (isSupported && isSpeaking) {
      speechSynthesis.pause();
    }
  }, [isSupported, isSpeaking]);

  const resume = useCallback(() => {
    if (isSupported) {
      speechSynthesis.resume();
    }
  }, [isSupported]);

  return {
    speak,
    stop,
    pause,
    resume,
    isSpeaking,
    isSupported
  };
};