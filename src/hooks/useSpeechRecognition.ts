import { useCallback, useRef, useState } from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import '@/types/speech';

interface SpeechRecognitionOptions {
  continuous?: boolean;
  interimResults?: boolean;
}

export const useSpeechRecognition = () => {
  const { language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(
    typeof window !== 'undefined' && 
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
  );
  
  const recognitionRef = useRef<any>(null);

  const getLanguageCode = useCallback((lang: Language) => {
    return lang === 'te' ? 'te-IN' : 'en-US';
  }, []);

  const startListening = useCallback((
    onResult?: (transcript: string) => void,
    options: SpeechRecognitionOptions = {}
  ) => {
    if (!isSupported) return;

    // Create new recognition instance
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = getLanguageCode(language);
    recognition.continuous = options.continuous || false;
    recognition.interimResults = options.interimResults || true;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const fullTranscript = finalTranscript || interimTranscript;
      setTranscript(fullTranscript);
      
      if (onResult) {
        onResult(fullTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [language, getLanguageCode, isSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    startListening,
    stopListening,
    resetTranscript,
    isListening,
    transcript,
    isSupported
  };
};