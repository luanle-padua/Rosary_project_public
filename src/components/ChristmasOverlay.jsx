import React, { useState, useEffect } from 'react';

const ChristmasOverlay = ({ enabled = true, intensity = 'subtle' }) => {
  const [snowflakes, setSnowflakes] = useState([]);
  
  const generateSnowflake = () => ({
    id: Math.random(),
    left: Math.random() * 100,
    size: Math.random() * (intensity === 'subtle' ? 3 : 5) + 2,
    animationDuration: Math.random() * 10 + 10,
    opacity: Math.random() * 0.3 + 0.2,
    delay: -Math.random() * 10
  });

  useEffect(() => {
    if (!enabled) return;
    
    const flakeCount = intensity === 'subtle' ? 200 : 400;
    const colors = ['#FFFFFF', '#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D', '#D4A5A5', '#392F5A', '#31A2AC', '#61C0BF', '#6B4226'];
    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
    const initialFlakes = Array.from({ length: flakeCount }, generateSnowflake);
    initialFlakes.forEach(flake => {
      flake.color = getRandomColor();
    });
    setSnowflakes(initialFlakes);

    const interval = setInterval(() => {
      setSnowflakes(prev => {
        const newFlakes = [...prev];
        const indexToReplace = Math.floor(Math.random() * newFlakes.length);
        newFlakes[indexToReplace] = generateSnowflake();
        return newFlakes;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [enabled, intensity]);

  if (!enabled) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 50,
        overflow: 'hidden'
      }}
    >
      {/* Snowflakes */}
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          style={{
            position: 'absolute',
            left: `${flake.left}%`,
            top: '-10px',
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            background: 'white',
            borderRadius: '50%',
            opacity: flake.opacity,
            animation: `snowfall ${flake.animationDuration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
            boxShadow: '0 0 2px rgba(255, 255, 255, 0.3)'
          }}
        />
      ))}

      <style>
        {`
          @keyframes snowfall {
            0% {
              transform: translateY(-10px) rotate(0deg);
            }
            100% {
              transform: translateY(105vh) rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ChristmasOverlay;