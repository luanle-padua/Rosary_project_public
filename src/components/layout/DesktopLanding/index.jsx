import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Languages } from 'lucide-react';
import './DesktopLanding.css';

const DesktopLanding = ({ onStart }) => {
  const { currentLanguage, setLanguage } = useLanguage();

  const instructionImages = {
    en: '/images/instruction-en.png',
    vi: '/images/instruction-vi.png'
  };

  const handleStart = () => {
    onStart();
  };

  const toggleLanguage = () => {
    const nextLang = currentLanguage === 'en' ? 'vi' : 'en';
    setLanguage(nextLang);
  };

  return (
    <div className="landing-container">
      <main className="landing-main">
        <div className="landing-content">
          <img
            src={instructionImages[currentLanguage]}
            alt="How to pray the Rosary"
            className="landing-image"
            draggable="false"
          />
          
          <div className="button-group">
            <button 
              className="control-button flex items-center gap-1"
              onClick={toggleLanguage}
              type="button"
              aria-label="Change language"
            >
              <Languages size={22.2} />
              <span className="text-sm font-medium">{currentLanguage.toUpperCase()}</span>
            </button>
            <button 
              className="pray-button"
              onClick={handleStart}
              type="button"
            >
              {currentLanguage === 'en' ? "Let's Pray" : 'Hãy cầu nguyện'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DesktopLanding;