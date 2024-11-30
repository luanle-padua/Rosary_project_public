import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Languages } from 'lucide-react';

const LanguageSelector = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => {
        const nextLang = currentLanguage === 'en' ? 'vi' : 'en';
        setLanguage(nextLang);
      }}
      className="control-button flex items-center gap-1"
      aria-label="Change language"
    >
      <Languages size={22.2} />
      <span className="text-sm font-medium">{currentLanguage.toUpperCase()}</span>
    </button>
  );
};

export default LanguageSelector;