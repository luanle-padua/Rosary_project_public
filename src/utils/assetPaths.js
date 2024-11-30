// Static asset paths configuration
export const ASSETS = {
    images: {
      logo: '/images/logo2.png',
      background: '/images/b.png',
      defaultMystery: '/images/b.png'
    },
    audio: {
      base: '/audio'
    }
  };
  
  // Utility functions for getting asset paths
  export const getLogo = () => ASSETS.images.logo;
  export const getBackground = () => ASSETS.images.background;
  export const getDefaultMystery = () => ASSETS.images.defaultMystery;
  
  // Helper function for audio paths
  export const getAudioPath = (filename, language = 'en') => {
    const langSuffix = language === 'en' ? '' : `-${language}`;
    return `${ASSETS.audio.base}/${language}/${filename}${langSuffix}.mp3`;
  };