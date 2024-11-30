import React from 'react';

const LoadingScreen = () => {
  // Inline critical CSS to avoid FOUC (Flash of Unstyled Content)
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#241102',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontFamily: '"Cormorant-SemiBold", serif'
      }}
    >
      <div 
        style={{
          width: '60px',
          height: '60px',
          marginBottom: '1rem',
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Cpath fill='%23fff' d='M25,2A23,23 0 1,1 2,25A23,23 0 0,1 25,2'/%3E%3C/svg%3E") center/contain no-repeat`
        }}
      />
      <div style={{ fontSize: '1.2rem' }}>Loading...</div>
    </div>
  );
};

export default LoadingScreen;