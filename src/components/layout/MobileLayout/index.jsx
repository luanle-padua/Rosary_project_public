import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import Header from './Header';
import Controls from './Controls';
import MobilePrayerDisplay from './MobilePrayerDisplay';
import ActiveUsersCounter from '../../ActiveUsersCounter';
import InteractiveRosary from '../../InteractiveRosary';
import '../MobileLayout.css';

const MobileLayout = ({
  mystery,
  prayer,
  state,
  actions,
  currentImage
}) => {
  const [displayMode, setDisplayMode] = useState('image');
  const { t, rosary } = useLanguage();

  const renderContent = () => {
    console.log('Current display mode:', displayMode);

    switch (displayMode) {
      case 'prayer':
        const contentLength = prayer?.content?.length || 0;
        const style = {
          '--content-length': contentLength
        };

        return (
          <div className="mobile-prayer-text">
            <div className="prayer-content" style={style}>
              {prayer?.content}
            </div>
          </div>
        );
      case 'rosary':
        return (
          <div className="mobile-mystery-container">
            <div className="mobile-rosary-container">
              <InteractiveRosary
                activeBeadId={state.activeBeadId}
                isPlaying={state.isPlaying}
                mysteryIndex={state.currentMysteryIndex || 0}
                prayerSection={state.prayerSection}
                mysteryType={state.mysteryType}
              />
            </div>
          </div>
        );
      default:
        return (
          <img
            src={currentImage}
            alt={mystery?.title || "Mystery"}
            className={`mobile-mystery-image ${currentImage ? 'loaded' : ''}`}
            draggable="false"
          />
        );
    }
  };

  return (
    <div className="mobile-layout">
      <Header
        selectedDate={state.selectedDate || new Date()}
        onDateChange={actions.handleDateChange}
        isPlaying={state.isPlaying}
      />

      <div className="mobile-mystery-container">
        {renderContent()}
      </div>

      <div className="display-mode-selector">
        <button
          className={`mode-button ${displayMode === 'prayer' ? 'active' : ''}`}
          onClick={() => setDisplayMode('prayer')}
        >
          Prayer
        </button>
        <span className="mode-separator">|</span>
        <button
          className={`mode-button ${displayMode === 'rosary' ? 'active' : ''}`}
          onClick={() => setDisplayMode('rosary')}
        >
          Rosary
        </button>
        <span className="mode-separator">|</span>
        <button
          className={`mode-button ${displayMode === 'image' ? 'active' : ''}`}
          onClick={() => setDisplayMode('image')}
        >
          Image
        </button>
      </div>

      <MobilePrayerDisplay
        prayer={prayer}
        mystery={mystery}
        state={state}
      />

      <div className="mobile-controls">
        <Controls
          isPlaying={state.isPlaying}
          isMuted={state.isMuted}
          speed={state.speed}
          onPlayPause={actions.handlePlayPause}
          onStop={actions.handleStop}
          onMuteToggle={actions.toggleMute}
          onPrevious={actions.handlePreviousPrayer}
          onNext={actions.handleNextPrayer}
          onSpeedChange={actions.handleSpeedChange}
        />
      </div>

      {state.isPlaying && (
        <div className="auto-playing-indicator text-center">
          Auto-playing
        </div>
      )}

      <div className="believers-counter">
        <ActiveUsersCounter />
      </div>


    </div>
  );
};

export default MobileLayout;