import { useState, useEffect } from "react";

/**
 * Custom hook for image slideshow with auto-play
 * @param {Array} images - Array of images
 * @param {number} interval - Auto-play interval in milliseconds
 * @returns {Object} Current index and setter function
 */
export const useImageSlideshow = (images = [], interval = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return {
    currentIndex,
    setCurrentIndex,
  };
};
