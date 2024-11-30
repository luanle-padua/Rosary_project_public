// src/components/PrayerControls.jsx
import React from 'react';
import { Play, Pause, Square, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const PrayerControls = ({ 
  isPlaying, 
  onPlayPause, 
  onStop, 
  isMuted, 
  onToggleMute 
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onPlayPause}
        className="p-2 text-white hover:text-gray-300"
        aria-label={isPlaying ? t('controls.pause') : t('controls.play')}
      >
        {isPlaying ? <Pause size={22.2} /> : <Play size={22.2} />}
      </button>
      <button
        onClick={onStop}
        className="p-2 text-white hover:text-gray-300"
        aria-label={t('controls.stop')}
      >
        <Square size={22.2} />
      </button>
      <button
        onClick={onToggleMute}
        className="p-2 text-white hover:text-gray-300"
        aria-label={isMuted ? t('controls.unmute') : t('controls.mute')}
      >
        {isMuted ? <VolumeX size={22.2} /> : <Volume2 size={22.2} />}
      </button>
    </div>
  );
};

export default PrayerControls;