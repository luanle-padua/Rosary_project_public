import React from 'react';

const Progress = ({ value = 0, className = "" }) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  return (
    <div className={`w-full ${className}`}>
      <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white transition-all duration-200 ease-in-out"
          style={{ 
            width: `${clampedValue}%`,
            transition: 'width 0.2s ease-in-out'
          }}
        />
      </div>
    </div>
  );
};

export default Progress;