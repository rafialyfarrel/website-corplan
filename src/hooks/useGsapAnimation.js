import { useEffect } from "react";
import gsap from "gsap";

/**
 * Custom hook for GSAP fade-in animation
 * @param {React.RefObject} ref - Element ref to animate
 * @param {Object} options - Animation options
 */
export const useGsapFadeIn = (ref, options = {}) => {
  const {
    opacity = 0,
    y = 50,
    duration = 1,
    ease = "power3.out",
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity,
        y,
        duration,
        ease,
      });
    });

    return () => ctx.revert();
  }, [ref, opacity, y, duration, ease]);
};

/**
 * Custom hook for GSAP image transition animation
 * @param {React.RefObject} ref - Image ref to animate
 * @param {*} dependency - Dependency that triggers animation
 */
export const useGsapImageTransition = (ref, dependency) => {
  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
    );
  }, [ref, dependency]);
};
