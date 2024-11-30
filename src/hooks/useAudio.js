import { useState, useRef, useCallback, useEffect } from 'react';

export const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(new Audio());
  const currentPrayerRef = useRef(null);

  const play = useCallback(async (audioPath) => {
    if (!audioPath) return;
    
    try {
      if (currentPrayerRef.current !== audioPath) {
        audioRef.current.src = audioPath;
        currentPrayerRef.current = audioPath;
      }
      
      audioRef.current.muted = isMuted;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  }, [isMuted]);

  const pause = useCallback(() => {
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const stop = useCallback(() => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    currentPrayerRef.current = null;
  }, []);

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
  }, [isMuted]);

  useEffect(() => {
    return () => {
        audioRef.current.pause();
        audioRef.current.src = '';
    };
  }, []);

  return {
    isPlaying,
    isMuted,
    play,
    pause,
    stop,
    toggleMute
  };
};