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
    <div className="header">
      <div className="header-left">
        <img 
          src={getLogo()} 
          alt="Praying the Rosary" 
          className="header-logo"
        />
      </div>
      <div className="header-right">
        <div className="header-date">
          <div className="day-navigation">
            <div className="day-group">
              <h2 className="day">{dateDisplay.day}</h2>
              <div className="date">
                <div className="month">{dateDisplay.month}</div>
                <div className="day">{dateDisplay.date}</div>
                <div className="year">{dateDisplay.year}</div>
              </div>
            </div>
            <div className="navigation-arrows">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePreviousDay}
                  className="nav-button"
                  disabled={isPlaying}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNextDay}
                  className="nav-button"
                  disabled={isPlaying}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;