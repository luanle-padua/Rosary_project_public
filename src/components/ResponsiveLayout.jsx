import React, { useEffect, useState } from 'react';
import { useRosaryState } from '../hooks/useRosaryState';
import { useLayoutManager } from '../hooks/useLayoutManager';
import DesktopLayout from './layout/DesktopLayout';
import MobileLayout from './layout/MobileLayout';
import ChristmasOverlay from './ChristmasOverlay';
import {
  getMysteryImage,
  getBackgroundImage,
  preloadImages
} from '../utils/mysteryImages';
import './ResponsiveLayout.css';
import './MobileLayout.css';

const isChristmasSeason = () => {
  const today = new Date();
  const month = today.getMonth();
  const date = today.getDate();
  return (month === 10) || (month === 0 && date <= 6);
};

const ResponsiveLayout = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const {
    state,
    actions,
    currentPrayer,
    currentMystery
  } = useRosaryState();

  const { isMobile, position, windowSize } = useLayoutManager();

  // Move preloading to useEffect to avoid blocking the initial render
  useEffect(() => {
    let mounted = true;

    const loadImages = async () => {
      try {
        await preloadImages();
        if (mounted) {
          setImagesLoaded(true);
        }
      } catch (error) {
        console.error('Failed to preload images:', error);
        // Set loaded anyway to prevent blocking the UI
        if (mounted) {
          setImagesLoaded(true);
        }
      }
    };

    loadImages();

    return () => {
      mounted = false;
    };
  }, []);

  // Get current image based on state
  const getCurrentImage = () => {
    if (!state.mysteryType || state.prayerSection === 'opening' || state.prayerSection === 'closing') {
      return getBackgroundImage();
    }
    return getMysteryImage(state.mysteryType, state.currentMysteryIndex);
  };

  if (!imagesLoaded) {
    return (
      <div className="loading-screen">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  const sharedProps = {
    mystery: currentMystery,
    prayer: currentPrayer,
    state: state,
    actions: actions,
    layout: {
      position: position,
      windowSize: windowSize
    },
    currentImage: getCurrentImage()
  };

  return (
    <div className="scroll-container">
      {isChristmasSeason() && <ChristmasOverlay />}
      <div className="viewport-container">
        {isMobile ? (
          <MobileLayout {...sharedProps} />
        ) : (
          <DesktopLayout {...sharedProps} />
        )}
      </div>
    </div>
  );
};

export default ResponsiveLayout;