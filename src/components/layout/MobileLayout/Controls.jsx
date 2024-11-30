import React from 'react';
import { Play, Pause, Square, Volume2, VolumeX, ChevronLeft, ChevronRight, Rabbit } from 'lucide-react';
import LanguageSelector from '../../LanguageSelector';
import { SPEED_OPTIONS } from '../../../constants/rosaryConstants';
import VolumeControl from '../shared/VolumeControl'; // Import the VolumeControl component
import { useAudioContext } from '../../../contexts/AudioContext';

const Controls = ({
  isPlaying,
  isMuted,
  speed,
  onPlayPause,
  onStop,
  onMuteToggle,
  onPrevious,
  onNext,
  onSpeedChange
}) => {
  const { volume, onVolumeChange } = useAudioContext();

  const handleSpeedChange = () => {
    const currentIndex = SPEED_OPTIONS.indexOf(speed);
    const nextIndex = (currentIndex + 1) % SPEED_OPTIONS.length;
    onSpeedChange(SPEED_OPTIONS[nextIndex]);
  };

  return (
    <div className="mobile-controls-row">
      <button
        onClick={onPrevious}
        className="p-2 text-white hover:text-gray-300 bg-transparent disabled:opacity-50 no-background"
        disabled={isPlaying}
      >
        <ChevronLeft size={24} />
      </button>

      <div className="playback-controls">
        <LanguageSelector />
        
        <button
          onClick={onPlayPause}
          className="control-button"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button
          onClick={onStop}
          className="control-button"
        >
          <Square size={24} />
        </button>

        <VolumeControl 
          isMuted={isMuted}
          onMuteToggle={onMuteToggle}
          volume={volume}
          onVolumeChange={onVolumeChange}
        />

        <button
          onClick={handleSpeedChange}
          className="control-button flex items-center gap-1"
          aria-label="Change playback speed"
        >
          <Rabbit size={24} />
          <span className="text-sm font-medium">{speed.toFixed(1)}x</span>
        </button>
      </div>

      <button
        onClick={onNext}
        className="p-2 text-white hover:text-gray-300 bg-transparent disabled:opacity-50 no-background"
        disabled={isPlaying}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Controls;