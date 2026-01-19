import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedTitle from "../components/AnimatedTitle";

const galleryImages = [
  "/img/gallery/DSC05110.JPG",
  "/img/gallery/DSC05452.JPG",
  "/img/gallery/DSC05466.JPG",
  "/img/gallery/DSC05663.JPG",
];

const galleryVideos = [
  { src: "/videos/solo.mp4", title: "Video 1" },
  { src: "/videos/solo2.mp4", title: "Video 2" },
  { src: "/videos/solo3.mp4", title: "Video 3" },
];

function Gallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const imageRef = useRef(null);
  const heroRef = useRef(null);
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  // Auto-switch images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Fade animation when image changes
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [currentImageIndex]);

  const goToPrevVideo = () => {
    setCurrentVideoIndex((prev) =>
      prev === 0 ? galleryVideos.length - 1 : prev - 1
    );
  };

  const goToNextVideo = () => {
    setCurrentVideoIndex((prev) =>
      (prev + 1) % galleryVideos.length
    );
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-black">
      <NavBar />

      {/* Gallery Corplan Section */}
      <section className="relative w-full bg-black pt-16 sm:pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />

        <div
          ref={heroRef}
          className="container mx-auto px-4 sm:px-5 py-8 sm:py-12 relative z-10"
        >
          <AnimatedTitle
            title="Gallery Corplan"
            containerClass="text-center mb-4 sm:mb-6"
          />
          <p className="text-center text-gray-300 mt-3 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 font-light tracking-wide">
            Dokumentasi Foto Corporate Planning KJPP RHR 2026
          </p>

          {/* Image Slideshow Container */}
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800">
              <img
                ref={imageRef}
                key={currentImageIndex}
                src={galleryImages[currentImageIndex]}
                alt={`Gallery image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Image Counter */}
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/70 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded backdrop-blur-sm border border-gray-700">
                <span className="font-light tracking-wider text-xs sm:text-sm">
                  {currentImageIndex + 1} / {galleryImages.length}
                </span>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentImageIndex
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
        </div>
      </section>

      {/* Video Corplan Section */}
      <section className="relative w-full bg-black py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-5">
          <AnimatedTitle
            title="Video Corplan"
            containerClass="text-center mb-4 sm:mb-6"
          />
          <p className="text-center text-gray-300 mt-3 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 font-light tracking-wide">
            Dokumentasi Video Corporate Planning KJPP RHR 2026
          </p>

          {/* Video Slideshow Container */}
          <div className="max-w-5xl mx-auto">
            <div className="relative bg-gray-900 rounded-lg shadow-2xl border border-gray-800">
              {/* Video - render only current video */}
              <div className="aspect-[16/9] bg-black rounded-lg">
                <video
                  ref={videoRef}
                  key={currentVideoIndex}
                  className="w-full h-full rounded-lg"
                  style={{ objectFit: 'contain' }}
                  controls
                  playsInline
                  webkit-playsinline="true"
                  x5-playsinline="true"
                  preload="auto"
                  onPlay={handlePlay}
                >
                  <source src={galleryVideos[currentVideoIndex].src} type="video/mp4" />
                </video>
              </div>

              {/* Video Counter */}
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/70 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded backdrop-blur-sm border border-gray-700 z-10">
                <span className="font-light tracking-wider text-xs sm:text-sm">
                  {currentVideoIndex + 1} / {galleryVideos.length}
                </span>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrevVideo}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm border border-gray-700 transition-all duration-300 z-10"
                aria-label="Previous video"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNextVideo}
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
              {galleryVideos[currentVideoIndex].title}
            </p>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
              {galleryVideos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentVideoIndex
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
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Gallery;
