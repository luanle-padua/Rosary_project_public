import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

const PrayerDisplay = ({ prayer, mystery, state }) => {
  const { t, rosary } = useLanguage();

  // Get current mystery type name
  const getMysteryTypeName = () => {
    const mysteryType = state?.mysteryType?.toLowerCase();
    return rosary?.mysteries[mysteryType]?.name || '';
  };

  const renderContent = () => {
    // Case 1: Mystery announcement
    if (state?.prayerSection === 'decade' && prayer?.name === 'mystery') {
      return (
        <>
          <div className="mystery-type">{getMysteryTypeName()}</div>
          <div className="mystery-title">{mystery?.title}</div>
          {mystery?.fruit && (
            <div className="mystery-fruit">
              Virtue: {mystery.fruit}
            </div>
          )}
          {mystery?.meditation && (
            <div className="mystery-meditation">{mystery.meditation}</div>
          )}
        </>
      );
    }

    // Case 2: Regular decade prayers
    if (state?.prayerSection === 'decade' && mystery && prayer?.name !== 'mystery') {
      return (
        <>
          <div className="mystery-type">{getMysteryTypeName()}</div>
          <div className="prayer-name">{prayer.name}</div>
          <div className="prayer-content">{prayer.content}</div>
        </>
      );
    }

    // Case 3: Opening and closing prayers
    if (prayer && (state?.prayerSection === 'opening' || state?.prayerSection === 'closing')) {
      return (
        <>
          <div className="mystery-type">{getMysteryTypeName()}</div>
          <div className="prayer-name">{prayer.name}</div>
          <div className="prayer-content">{prayer.content}</div>
        </>
      );
    }

    // Loading state
    return (
      <div className="text-white opacity-75">
        {t('loading')}
      </div>
    );
  };

  return (
    <div className="prayer-section">
      {renderContent()}
    </div>
  );
};

export default PrayerDisplay;