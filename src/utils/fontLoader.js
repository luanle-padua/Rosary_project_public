const fontLoader = {
    loaded: false,
    
    loadFonts: async () => {
      if (fontLoader.loaded) return;
      
      if ('fonts' in document) {
        try {
          await Promise.all([
            document.fonts.load('1em Cormorant-SemiBold'),
            document.fonts.load('1em "Cormorant Garamond"')
          ]);
          
          fontLoader.loaded = true;
        } catch (err) {
          console.warn('Font loading failed:', err);
        }
      }
    }
  };
  
  export default fontLoader;