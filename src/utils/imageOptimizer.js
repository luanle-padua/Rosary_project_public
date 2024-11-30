// src/utils/imageOptimizer.js

// Keep track of loaded images
const imageCache = new Map();

export const optimizeImage = (src, options = {}) => {
  // Return cached image if available
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src));
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    
    // Enable native lazy loading
    img.loading = 'lazy';
    
    // Handle successful load
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    
    // Handle errors
    img.onerror = () => {
      console.warn(`Failed to load image: ${src}`);
      reject(new Error(`Failed to load ${src}`));
    };
    
    img.src = src;
  });
};

export const preloadCriticalImages = async () => {
  const criticalImages = [
    '/images/logo2.png',
    '/images/instruction-en.png',
    '/images/instruction-vi.png'
  ];

  try {
    await Promise.all(criticalImages.map(src => optimizeImage(src)));
    return true;
  } catch (error) {
    console.error('Error preloading critical images:', error);
    return false;
  }
};