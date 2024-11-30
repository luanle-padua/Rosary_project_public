import React from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const NavigationControls = ({ 
  onPrevious, 
  onNext, 
  onPreviousMystery, 
  onNextMystery,
  isPlaying,
  orientation = 'horizontal' // or 'vertical'
}) => {
  const { t } = useLanguage();

  const renderButtons = () => {
    if (orientation === 'vertical') {
      return (
        <>
          <button
            onClick={onPrevious}
            className="p-2 text-white hover:text-gray-300 disabled:opacity-50"
            disabled={isPlaying}
            aria-label={t('navigation.previous')}
          >
            <ChevronUp size={24} />
          </button>
          <button
            onClick={onNext}
            className="p-2 text-white hover:text-gray-300 disabled:opacity-50"
            disabled={isPlaying}
            aria-label={t('navigation.next')}
          >
            <ChevronDown size={24} />
          </button>
        </>
      );
    }

    return (
      <>
        <button
          onClick={onPrevious}
          className="p-2 text-white hover:text-gray-300 disabled:opacity-50"
          disabled={isPlaying}
          aria-label={t('navigation.previous')}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={onNext}
          className="p-2 text-white hover:text-gray-300 disabled:opacity-50"
          disabled={isPlaying}
          aria-label={t('navigation.next')}
        >
          <ChevronRight size={24} />
        </button>
      </>
    );
  };

  return (
    <div className={`flex items-center gap-4 ${orientation === 'vertical' ? 'flex-col' : ''}`}>
      {renderButtons()}
    </div>
  );
};

export default NavigationControls;