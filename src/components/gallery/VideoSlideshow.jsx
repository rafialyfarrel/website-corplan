import { useState, useRef } from "react";

const VideoSlideshow = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  // Auto fullscreen on play for mobile
  const handlePlay = () => {
    const video = videoRef.current;
    if (video && window.innerWidth < 768) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    }
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative bg-gray-900 rounded-lg shadow-2xl border border-gray-800">
        {/* Video - render only current video */}
        <div className="aspect-[16/9] bg-black rounded-lg">
          <video
            ref={videoRef}
            key={currentIndex}
            className="w-full h-full rounded-lg"
            style={{ objectFit: "contain" }}
            controls
            playsInline
            preload="auto"
            onPlay={handlePlay}
          >
            <source src={videos[currentIndex].src} type="video/mp4" />
          </video>
        </div>

        {/* Video Counter */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/70 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded backdrop-blur-sm border border-gray-700 z-10">
          <span className="font-light tracking-wider text-xs sm:text-sm">
            {currentIndex + 1} / {videos.length}
          </span>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm border border-gray-700 transition-all duration-300 z-10"
          aria-label="Previous video"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm border border-gray-700 transition-all duration-300 z-10"
          aria-label="Next video"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Video Title */}
      <p className="text-center text-white mt-4 text-sm sm:text-base font-light tracking-wide">
        {videos[currentIndex].title}
      </p>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? "w-8 sm:w-10 h-2 sm:h-3 bg-white"
                : "w-2 sm:w-3 h-2 sm:h-3 bg-gray-600 hover:bg-gray-400"
            }`}
            aria-label={`Go to video ${index + 1}`}
          />
        ))}
      </div>

      {/* Instruction */}
      <p className="text-center text-gray-500 mt-3 sm:mt-4 text-xs sm:text-sm font-light tracking-wide">
        Tap video to play
      </p>
    </div>
  );
};

export default VideoSlideshow;
