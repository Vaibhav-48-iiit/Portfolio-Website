"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import HeroHeader from "./HeroHeader";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";

// Dynamically import the 3D Canvas with ssr: false for clean client-side WebGL initialization
const HeroCanvas = dynamic(() => import("../canvas/HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([headerRef.current, scrollRef.current, ".hero-anim-item"], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap.set(headerRef.current, { opacity: 0, y: -16 });
      gsap.set(scrollRef.current, { opacity: 0, y: 16 });
      gsap.set(".hero-anim-item", { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });

      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.85,
      })
        .to(
          ".hero-anim-item",
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.1,
          },
          "-=0.5"
        )
        .to(
          scrollRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
          },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[680px] max-h-[1200px] flex flex-col justify-between overflow-hidden bg-[#050608] bg-vignette grid-overlay"
      aria-label="Opening Hero Section"
    >
      {/* Procedural 3D Sculpture Installation Canvas */}
      <HeroCanvas />

      {/* Editorial UI Content Layers */}
      <HeroHeader navRef={headerRef} />
      <HeroContent contentRef={contentRef} />
      <ScrollIndicator indicatorRef={scrollRef} />
    </section>
  );
}
