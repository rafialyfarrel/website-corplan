import { useRef } from "react";
import { useImageSlideshow } from "../../hooks/useImageSlideshow";
import { useGsapImageTransition } from "../../hooks/useGsapAnimation";

const ImageSlideshow = ({ images }) => {
  const { currentIndex, setCurrentIndex } = useImageSlideshow(images, 5000);
  const imageRef = useRef(null);

  useGsapImageTransition(imageRef, currentIndex);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800">
        <img
          ref={imageRef}
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Image Counter */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/70 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded backdrop-blur-sm border border-gray-700">
          <span className="font-light tracking-wider text-xs sm:text-sm">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "w-8 sm:w-10 h-2 sm:h-3 bg-white"
                : "w-2 sm:w-3 h-2 sm:h-3 bg-gray-600 hover:bg-gray-400"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <p className="text-center text-gray-500 mt-3 sm:mt-4 text-xs sm:text-sm font-light tracking-wide">
        Auto-playing every 5 seconds
      </p>
    </div>
  );
};

export default ImageSlideshow;
