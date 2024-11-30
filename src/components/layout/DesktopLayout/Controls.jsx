import React from 'react';
import { Play, Pause, Square, ChevronUp, ChevronDown, Rabbit } from 'lucide-react';
import LanguageSelector from '../../LanguageSelector';
import { SPEED_OPTIONS } from '../../../constants/rosaryConstants';
import VolumeControl from '../shared/VolumeControl';
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
    <div className="flex items-center gap-16">
      <div className="flex items-center gap-4">
        <LanguageSelector />
        
        <button
          onClick={onPlayPause}
          className="p-2 text-white hover:text-gray-300"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={22.2} /> : <Play size={22.2} />}
        </button>

        <button
          onClick={onStop}
          className="p-2 text-white hover:text-gray-300"
          aria-label="Stop"
        >
          <Square size={22.2} />
        </button>

        {/* Replace just this button */}
        <VolumeControl 
          isMuted={isMuted}
          onMuteToggle={onMuteToggle}
          volume={volume}
          onVolumeChange={onVolumeChange}
        />

        <button
          onClick={handleSpeedChange}
          className="p-2 text-white hover:text-gray-300 flex items-center gap-1"
          aria-label="Change playback speed"
        >
          <Rabbit size={22.2} />
          <span className="text-sm font-medium">{speed.toFixed(1)}x</span>
        </button>
      </div>

      <div className="button-up-down">
        <button
          onClick={onPrevious}
          className="p-2 text-white hover:text-gray-300 disabled:opacity-50"
          disabled={isPlaying}
        >
          <ChevronUp size={22.2} />
        </button>
        <button
          onClick={onNext}
          className="p-2 text-white hover:text-gray-300 disabled:opacity-50"
          disabled={isPlaying}
        >
          <ChevronDown size={22.2} />
        </button>
      </div>
    </div>
  );
};

export default Controls;