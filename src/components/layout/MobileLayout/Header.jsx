import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getLogo } from '../../../utils/assetPaths';
import { formatDate } from '../../../utils/dateFormatter';

const Header = ({ selectedDate, onDateChange, isPlaying }) => {
  const { currentLanguage } = useLanguage();
  const dateDisplay = formatDate(selectedDate, currentLanguage);

  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    onDateChange(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    onDateChange(newDate);
  };

  return (
    <header className="mobile-header">
      <div className="mobile-logo-date">
        <img
          src={getLogo()}
          alt="Praying the Rosary"
          className="mobile-header-logo"
        />
        <div className="mobile-logo-separator"></div>
        <div className="mobile-date">
          <div className="day">{dateDisplay.day}</div>
          <div className="date-details">
            {dateDisplay.formatted}
          </div>
        </div>
      </div>

      <div className="mobile-nav-buttons">
        <button
          onClick={handlePreviousDay}
          disabled={isPlaying}
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={handleNextDay}
          disabled={isPlaying}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </header>
  );
};

export default Header;