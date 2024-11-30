import React, { createContext, useContext, useState, useCallback } from 'react';
import { useLanguage } from './LanguageContext';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [audio] = useState(new Audio());
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentPath, setCurrentPath] = useState(null);
  const [currentSpeed, setCurrentSpeed] = useState(1.0);
  const { currentLanguage } = useLanguage();

  const getMysteryAudioPath = (mysteryTitle, language) => {
    // Map of Vietnamese titles to their English audio file names
    const mysteryMapping = {
      // Sorrowful Mysteries
      'Hấp Hối': 'The Agony in the Garden',
      'Đánh Đòn': 'The Scourging at the Pillar',
      'Đội Mão Gai': 'The Crowning with Thorns',
      'Vác Thánh Giá': 'The Carrying of the Cross',
      'Chịu Chết': 'The Crucifixion',

      // Joyful Mysteries
      'Truyền Tin': 'The Annunciation',
      'Thăm Viếng': 'The Visitation',
      'Giáng Sinh': 'The Nativity',
      'Dâng Con': 'The Presentation',
      'Tìm Con': 'Finding Jesus in the Temple',

      // Glorious Mysteries
      'Phục Sinh': 'The Resurrection',
      'Lên Trời': 'The Ascension',
      'Chúa Thánh Thần Hiện Xuống': 'The Descent of the Holy Spirit',
      'Đức Mẹ Lên Trời': 'The Assumption of Mary',
      'Đức Mẹ Nữ Vương': 'The Coronation of Mary',

      // Luminous Mysteries
      'Chúa Giêsu Chịu Phép Rửa': 'The Baptism of Jesus',
      'Chúa Giêsu Dự Tiệc Cưới Cana': 'The Wedding at Cana',
      'Chúa Giêsu Rao Giảng Nước Trời': 'The Proclamation of the Kingdom',
      'Chúa Giêsu Biến Hình': 'The Transfiguration', 
      'Chúa Giêsu Lập Bí Tích Thánh Thể': 'The Institution of the Eucharist',
    };

    // Get the English file name
    const englishTitle = mysteryMapping[mysteryTitle] || mysteryTitle;

    // Construct the path with language suffix if Vietnamese
    return `/audio/${language}/${englishTitle}${language === 'vi' ? '-vi' : ''}.mp3`;
  };

  const handleVolumeChange = useCallback((newVolume) => {
    const clampedVolume = Math.min(1, Math.max(0, newVolume));
    setVolume(clampedVolume);
    if (audio) {
      audio.volume = clampedVolume;
    }
  }, [audio]);

  const playPrayer = useCallback(async (prayer, options = {}) => {
    const { mysteryTitle, repetition, speed = 1.0, onEnded } = options;
    let audioPath;

    try {
      if (prayer === 'hailMary' && repetition) {
        audioPath = `/audio/${currentLanguage}/Hail Mary full of grace (${repetition})${currentLanguage === 'vi' ? '-vi' : ''}.mp3`;
      } else if (prayer === 'mystery' && mysteryTitle) {
        audioPath = getMysteryAudioPath(mysteryTitle, currentLanguage);
      } else {
        audioPath = `/audio/${currentLanguage}/${prayer}${currentLanguage === 'vi' ? '-vi' : ''}.mp3`;
      }

      // Clear previous event listeners
      audio.onended = null;
      audio.ontimeupdate = null;

      if (currentPath !== audioPath) {
        audio.src = audioPath;
        setCurrentPath(audioPath);
      }

      let hasTriggeredEnd = false;
      const handleEnd = () => {
        if (!hasTriggeredEnd) {
          hasTriggeredEnd = true;
          console.log('Audio ended:', prayer, repetition ? `(${repetition})` : '');
          onEnded?.();
        }
      };

      audio.onended = handleEnd;
      audio.ontimeupdate = () => {
        if (!hasTriggeredEnd && audio.currentTime >= audio.duration - 0.1) {
          handleEnd();
        }
      };

      audio.muted = isMuted;
      audio.volume = volume;
      audio.playbackRate = speed;

      await audio.play();
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  }, [audio, isMuted, currentPath, currentLanguage, volume]);

  const pause = useCallback(() => {
    audio.pause();
  }, [audio]);

  const resume = useCallback(() => {
    audio.play().catch(error => {
      if (error.name === 'AbortError') {
        console.warn('Audio play request was interrupted by a new load request.');
      } else {
        console.error('Audio playback error:', error);
      }
    });
  }, [audio]);

  const stop = useCallback(() => {
    audio.pause();
    audio.currentTime = 0;
    setCurrentPath(null);
  }, [audio]);

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audio.muted = newMuted;
  }, [audio, isMuted]);

  return (
    <AudioContext.Provider value={{
      isMuted,
      volume,
      onVolumeChange: handleVolumeChange,
      currentSpeed,
      playPrayer,
      pause,
      resume,
      stop,
      toggleMute
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within AudioProvider');
  }
  return context;
};

export default AudioContext;