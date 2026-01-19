import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  useGSAP(() => {
    gsap.set("#hero-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#hero-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#hero-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div
        id="hero-frame"
        className="relative z-10 w-full h-full overflow-hidden rounded-lg bg-black"
      >
        <picture>
          {/* Mobile */}
          <source
            media="(max-width: 768px)"
            srcSet="/img/hero-mobile.JPG"
          />

          {/* Desktop fallback */}
          <img
            src="/img/hero.JPG"
            alt="Corporate Planning 2026"
            className="absolute left-0 top-0 size-full object-contain object-center"
          />
        </picture>

        {/* Mobile-optimized text overlay - uncomment if needed */}
        {/* <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-14 sm:mt-16 md:mt-20 px-3 sm:px-5 md:px-10">
            <h1 className="special-font hero-heading text-blue-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              <span className="bg-black/90 px-1.5 py-0.5 sm:px-2 sm:py-1">
                CORPORATE PLA<b>N</b>NING
              </span>
            </h1>

            <p className="mb-4 max-w-56 sm:max-w-64 font-robert-regular text-blue-100 text-xs sm:text-sm md:text-base">
              <span className="bg-black/90 px-1.5 py-0.5 sm:px-2 sm:py-1 inline-block">
                Rooted Responsibility,
              </span>
              <br />
              <span className="bg-black/90 px-1.5 py-0.5 sm:px-2 sm:py-1 inline-block mt-0.5 sm:mt-1">
                Flourishing Transformation
              </span>
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
