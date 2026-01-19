import { useRef } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AnimatedTitle from "../components/common/AnimatedTitle";
import ImageSlideshow from "../components/gallery/ImageSlideshow";
import VideoSlideshow from "../components/gallery/VideoSlideshow";
import { useGsapFadeIn } from "../hooks/useGsapAnimation";

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
  const heroRef = useRef(null);

  // Use custom GSAP animation hook
  useGsapFadeIn(heroRef);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-black">
      <Navbar />

      {/* Gallery Corplan Section */}
      <section className="relative w-full bg-black pt-2 sm:pt-16">
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

          {/* Image Slideshow */}
          <ImageSlideshow images={galleryImages} />
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

          {/* Video Slideshow */}
          <VideoSlideshow videos={galleryVideos} />
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Gallery;
