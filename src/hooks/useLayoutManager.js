import { useState, useEffect, useCallback } from 'react';

export const useLayoutManager = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const updateLayout = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    setWindowSize({
      width: viewportWidth,
      height: viewportHeight
    });

    setPosition({
      x: viewportWidth > 1600 ? (viewportWidth - 1600) / 2 : 0,
      y: viewportHeight > 900 ? (viewportHeight - 900) / 2 : 0
    });

    setIsMobile(viewportWidth < 768);
  }, []);

  useEffect(() => {
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [updateLayout]);

  return {
    isMobile,
    position,
    windowSize,
    updateLayout
  };
};

export default useLayoutManager;