import React, { createContext, useContext, useState } from 'react';
import enRosary from '../locales/en/rosary.json';
import viRosary from '../locales/vi/rosary.json';
import enUI from '../locales/en/ui.json';
import viUI from '../locales/vi/ui.json';

const languages = {
  en: {
    ui: enUI,
    rosary: enRosary,
    label: 'EN'
  },
  vi: {
    ui: viUI,
    rosary: viRosary,
    label: 'VI'
  }
};

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem('preferredLanguage') || 'en'
  );

  const setLanguage = (lang) => {
    if (languages[lang]) {
      setCurrentLanguage(lang);
      localStorage.setItem('preferredLanguage', lang);
    }
  };

  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = languages[currentLanguage].ui;
    
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }

    if (typeof value !== 'string') return key;

    return value.replace(/\{\{(\w+)\}\}/g, (_, param) => 
      String(params[param] ?? `{{${param}}}`)
    );
  };

  const value = {
    currentLanguage,
    setLanguage,
    t,
    rosary: languages[currentLanguage].rosary,
    availableLanguages: Object.keys(languages)
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};