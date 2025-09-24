import { useEffect, useCallback } from 'react';
import { useTTS } from './useTTS';

export const useDashboardTTS = () => {
  const { speak, stop, isSpeaking } = useTTS();

  const speakElementText = useCallback((element: HTMLElement) => {
    let textToSpeak = '';

    // Get text content based on element type
    if (element.tagName === 'IMG') {
      textToSpeak = element.getAttribute('alt') || 'Image';
    } else if (element.tagName === 'BUTTON') {
      textToSpeak = element.textContent || element.getAttribute('aria-label') || 'Button';
    } else if (element.tagName === 'INPUT') {
      const input = element as HTMLInputElement;
      textToSpeak = input.placeholder || input.value || 'Input field';
    } else {
      textToSpeak = element.textContent || element.getAttribute('aria-label') || '';
    }

    if (textToSpeak.trim()) {
      speak(textToSpeak);
    }
  }, [speak]);

  const addHoverListeners = useCallback(() => {
    const interactiveElements = document.querySelectorAll(
      'button, [role="button"], a, input, select, textarea, [tabindex]:not([tabindex="-1"]), .card-title, .card-description, .metric-value, .alert-item'
    );

    const handleMouseEnter = (event: Event) => {
      const element = event.target as HTMLElement;
      if (element && !isSpeaking) {
        speakElementText(element);
      }
    };

    const handleFocus = (event: Event) => {
      const element = event.target as HTMLElement;
      if (element) {
        speakElementText(element);
      }
    };

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('focus', handleFocus);
    });

    // Cleanup function
    return () => {
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('focus', handleFocus);
      });
    };
  }, [speakElementText, isSpeaking]);

  const announcePageContent = useCallback(() => {
    // Announce page title and key statistics
    const title = document.querySelector('h1')?.textContent;
    const keyStats = document.querySelectorAll('[data-tts-announce]');
    
    let announcement = '';
    if (title) {
      announcement += `${title}. `;
    }
    
    keyStats.forEach((stat, index) => {
      if (index < 4) { // Limit to first 4 key stats
        announcement += `${stat.textContent}. `;
      }
    });

    if (announcement.trim()) {
      setTimeout(() => speak(announcement), 500); // Small delay for page load
    }
  }, [speak]);

  useEffect(() => {
    // Add hover listeners for interactive elements
    const cleanup = addHoverListeners();
    
    // Announce key page content on load
    announcePageContent();

    return cleanup;
  }, [addHoverListeners, announcePageContent]);

  return {
    speakText: speak,
    stopSpeaking: stop,
    isSpeaking,
    speakElement: speakElementText
  };
};