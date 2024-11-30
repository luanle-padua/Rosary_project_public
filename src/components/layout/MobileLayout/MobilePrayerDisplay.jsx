import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

const MobilePrayerDisplay = ({ prayer, mystery, state }) => {
  const { t, rosary } = useLanguage();

  const getMysteryTypeName = () => {
    if (!state.mysteryType || !rosary?.mysteries) return '';
    const mysteryType = state.mysteryType.toLowerCase();
    return rosary.mysteries[mysteryType]?.name || '';
  };

  return (
    <>
      {/* Mystery Type */}
      <div className="mystery-type text-lg text-center">
        {getMysteryTypeName()}
      </div>

      {/* Prayer Name */}
      <div className="prayer-name text-base text-center">
        {prayer?.name}
      </div>
    </>
  );
};

export default MobilePrayerDisplay;