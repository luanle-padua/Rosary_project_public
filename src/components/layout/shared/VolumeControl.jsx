import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import './VolumeControl.css';

// Utility function to detect iPhone devices
const isIPhone = () => {
  return /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

const VolumeControl = ({ isMuted, onMuteToggle, volume = 1, onVolumeChange }) => {
  const [showSlider, setShowSlider] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
        setShowSlider(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sliderRef.current && !sliderRef.current.contains(event.target)) {
        setShowSlider(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleVolumeChange = (newVolume) => {
    onVolumeChange(newVolume);
    if (newVolume === 0 !== isMuted) {
      onMuteToggle();
    }
  };

  const handleSliderChange = (e) => {
    const newVolume = e.target.value / 100;
    handleVolumeChange(newVolume);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    handleTouchMove(e);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const newVolume = (touch.clientX - rect.left) / rect.width;
    handleVolumeChange(Math.min(Math.max(newVolume, 0), 1));
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
  };

  return (
    <div className="volume-control">
      {isIPhone() ? (
        <button
          onClick={onMuteToggle}
          className="volume-button"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={22.2} /> : <Volume2 size={22.2} />}
        </button>
      ) : (
        <>
          {showSlider && (
            <div ref={sliderRef} className="slider-container">
              <input
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={handleSliderChange}
                className="slider"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />
              <div className="slider-track">
                <div className="slider-progress" style={{ width: `${volume * 100}%` }} />
                <div className="slider-thumb" style={{ left: `${volume * 100}%` }} />
              </div>
            </div>
          )}
          
          <button
            onClick={() => setShowSlider(!showSlider)}
            className="volume-button"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={22.2} /> : <Volume2 size={22.2} />}
          </button>
        </>
      )}
    </div>
  );
};

export default VolumeControl;