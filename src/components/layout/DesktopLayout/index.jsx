import React from 'react';
import Header from './Header';
import Controls from './Controls';
import { PrayerDisplay, MysteryDisplay } from '../shared';
import InteractiveRosary from '../../InteractiveRosary';
import ActiveUsersCounter from '../../ActiveUsersCounter';

const DesktopLayout = ({
  mystery,
  prayer,
  state = {},
  actions = {},
  layout = {
    position: { x: 0, y: 0 },
    windowSize: { width: window.innerWidth, height: window.innerHeight }
  },
  currentImage
}) => {
  const { position } = layout;

  return (
    <div
      className="layout-container"
      style={{ transform: `translate(${position?.x || 0}px, ${position?.y || 0}px)` }}
    >
      <div className="part-a">
        <Header
          selectedDate={state.selectedDate || new Date()}
          onDateChange={actions.handleDateChange || (() => { })}
          isPlaying={state.isPlaying || false}
        />

        <div className="columns-container">
          <div className="left-column">
            <InteractiveRosary
              activeBeadId={state.activeBeadId}
              isPlaying={state.isPlaying || false}
              mysteryIndex={state.currentMysteryIndex || 0}
              prayerSection={state.prayerSection || 'opening'}
            />
          </div>

          <div className="right-column">
            <div className="section section-105">
              <Controls
                isPlaying={state.isPlaying}
                isMuted={state.isMuted}
                speed={state.speed || 1.0}
                onPlayPause={actions.handlePlayPause}
                onStop={actions.handleStop}
                onMuteToggle={actions.toggleMute}
                onPrevious={actions.handlePreviousPrayer}
                onNext={actions.handleNextPrayer}
                onSpeedChange={actions.handleSpeedChange}
              />
            </div>

            <PrayerDisplay
              prayer={prayer || { name: '', content: '' }}
              mystery={mystery || null}
              state={state}
            />
      
            <div className="section section-105-bottom">
              <div className="text-white text-center flex flex-col gap-2">
                <div>{state.progressText || ''}</div>
                {state.isPlaying && (
                  <div className="text-sm opacity-75">Auto-playing</div>
                )}
                <div className="flex justify-center mt-2">
                  <ActiveUsersCounter />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="part-b">
        <div className="image-container">
          <img
            src={currentImage}
            alt={mystery?.title || 'Mystery'}
            className={`part-b-image ${currentImage ? 'loaded' : ''}`}
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopLayout;