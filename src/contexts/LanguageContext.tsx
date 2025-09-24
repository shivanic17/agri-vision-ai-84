import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'te';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.cropHealth': 'Crop Health',
    'nav.soilCondition': 'Soil Condition',
    'nav.pestRisks': 'Pest Risks',
    'nav.aiAssistant': 'AI Assistant',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Monitor your farm\'s health and performance',
    'dashboard.totalArea': 'Total Area',
    'dashboard.healthyCrops': 'Healthy Crops',
    'dashboard.activeAlerts': 'Active Alerts',
    'dashboard.avgYield': 'Avg Yield',
    'dashboard.cropHealthStatus': 'Crop Health Status',
    'dashboard.soilConditions': 'Soil Conditions',
    'dashboard.pestRiskAlerts': 'Pest Risk Alerts',
    'dashboard.aiRecommendations': 'AI Recommendations',
    'dashboard.viewAll': 'View All',
    'dashboard.alerts': 'Alerts',
    'dashboard.viewReports': 'View Reports',
    
    // Soil Metrics
    'soil.moisture': 'Moisture',
    'soil.temperature': 'Temperature',
    'soil.phLevel': 'pH Level',
    'soil.nitrogen': 'Nitrogen',
    
    // Status
    'status.healthy': 'Healthy',
    'status.warning': 'Warning',
    'status.critical': 'Critical',
    'status.optimal': 'Optimal',
    'status.good': 'Good',
    'status.low': 'Low',
    
    // Chatbot
    'chatbot.title': 'AgriBot Assistant',
    'chatbot.placeholder': 'Ask me about crops, soil, pests, or farming tips...',
    'chatbot.cropHealth': 'Crop Health',
    'chatbot.soilStats': 'Soil Stats',
    'chatbot.pestAlerts': 'Pest Alerts',
    'chatbot.recommendations': 'Recommendations',
    'chatbot.listening': 'Listening...',
    'chatbot.speaking': 'Speaking...',
    
    // Languages
    'language.english': 'English',
    'language.telugu': 'Telugu',
    'language.select': 'Select Language',
  },
  te: {
    // Navigation
    'nav.dashboard': 'డాష్‌బోర్డ్',
    'nav.cropHealth': 'పంట ఆరోగ్యం',
    'nav.soilCondition': 'మట్టి పరిస్థితి',
    'nav.pestRisks': 'కీటకాల ప్రమాదాలు',
    'nav.aiAssistant': 'AI సహాయకుడు',
    'nav.reports': 'నివేదికలు',
    'nav.settings': 'సెట్టింగులు',
    
    // Dashboard
    'dashboard.title': 'డాష్‌బోర్డ్',
    'dashboard.subtitle': 'మీ వ్యవసాయ ఆరోగ్యం మరియు పనితీరును పర్యవేక్షించండి',
    'dashboard.totalArea': 'మొత్తం ప్రాంతం',
    'dashboard.healthyCrops': 'ఆరోగ్యకరమైన పంటలు',
    'dashboard.activeAlerts': 'చురుకైన హెచ్చరికలు',
    'dashboard.avgYield': 'సగటు దిగుబడి',
    'dashboard.cropHealthStatus': 'పంట ఆరోగ్య స్థితి',
    'dashboard.soilConditions': 'మట్టి పరిస్థితులు',
    'dashboard.pestRiskAlerts': 'కీటకాల ప్రమాద హెచ్చరికలు',
    'dashboard.aiRecommendations': 'AI సిఫారసులు',
    'dashboard.viewAll': 'అన్నీ చూడండి',
    'dashboard.alerts': 'హెచ్చరికలు',
    'dashboard.viewReports': 'నివేదికలను చూడండి',
    
    // Soil Metrics
    'soil.moisture': 'తేమ',
    'soil.temperature': 'ఉష్ణోగ్రత',
    'soil.phLevel': 'pH స్థాయి',
    'soil.nitrogen': 'నత్రజని',
    
    // Status
    'status.healthy': 'ఆరోగ్యకరమైన',
    'status.warning': 'హెచ్చరిక',
    'status.critical': 'విమర్శనాత్మక',
    'status.optimal': 'అనుకూల',
    'status.good': 'మంచి',
    'status.low': 'తక్కువ',
    
    // Chatbot
    'chatbot.title': 'AgriBot సహాయకుడు',
    'chatbot.placeholder': 'పంటలు, మట్టి, కీటకాలు లేదా వ్యవసాయ చిట్కాల గురించి అడగండి...',
    'chatbot.cropHealth': 'పంట ఆరోగ్యం',
    'chatbot.soilStats': 'మట్టి గణాంకాలు',
    'chatbot.pestAlerts': 'కీటక హెచ్చరికలు',
    'chatbot.recommendations': 'సిఫారసులు',
    'chatbot.listening': 'వింటున్నాను...',
    'chatbot.speaking': 'మాట్లాడుతున్నాను...',
    
    // Languages
    'language.english': 'English',
    'language.telugu': 'తెలుగు',
    'language.select': 'భాష ఎంచుకోండి',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};