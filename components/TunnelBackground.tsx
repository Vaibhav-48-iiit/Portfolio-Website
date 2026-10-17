"use client";

import React, { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TunnelBackgroundProps {
  variant?: "hero" | "contact";
  className?: string;
}

export const TunnelBackground: React.FC<TunnelBackgroundProps> = ({
  variant = "hero",
  className = "",
}) => {
  const reducedMotion = useReducedMotion();
  const [scrollZ, setScrollZ] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Progressively shift forward by up to 130px as user scrolls first 650px
          const progress = Math.min(scrollY / 650, 1);
          setScrollZ(progress * 120);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Very restrained subtle tilt (-1.2 to +1.2 deg)
      const x = (e.clientX / window.innerWidth - 0.5) * 2.0;
      const y = (e.clientY / window.innerHeight - 0.5) * 2.0;
      setTilt({ x, y });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [reducedMotion, variant]);

  // Symmetrically centered frame definitions for Deep Network Tunnel
  const heroFrames = [
    { z: -80, opacity: 0.65, isCyan: false, size: { w: "92%", h: "82%" } },
    { z: -220, opacity: 0.52, isCyan: false, size: { w: "80%", h: "70%" } },
    { z: -360, opacity: 0.42, isCyan: true, size: { w: "68%", h: "58%" } },
    { z: -500, opacity: 0.32, isCyan: false, size: { w: "56%", h: "46%" } },
    { z: -640, opacity: 0.22, isCyan: true, size: { w: "44%", h: "35%" } },
    { z: -780, opacity: 0.14, isCyan: false, size: { w: "32%", h: "25%" } },
    { z: -920, opacity: 0.08, isCyan: true, size: { w: "22%", h: "16%" } },
  ];

  const contactFrames = [
    { z: -200, opacity: 0.35, isCyan: false, size: { w: "75%", h: "65%" } },
    { z: -400, opacity: 0.24, isCyan: true, size: { w: "60%", h: "50%" } },
    { z: -600, opacity: 0.15, isCyan: false, size: { w: "45%", h: "36%" } },
    { z: -800, opacity: 0.06, isCyan: false, size: { w: "32%", h: "24%" } },
  ];

  const frames = variant === "hero" ? heroFrames : contactFrames;

  const stageTransform = reducedMotion
    ? "none"
    : `translate3d(0, 0, ${scrollZ}px) rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)`;

  return (
    <div
      ref={containerRef}
      className={`tunnel-viewport absolute inset-0 z-0 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="tunnel-stage"
        style={{
          transform: stageTransform,
        }}
      >
        {/* Symmetrical convergence perspective rays converging to dead-center */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="centerRayGrad" x1="0%" y1="0%" x2="50%" y2="50%">
              <stop offset="0%" stopColor="#94A0AD" stopOpacity="0.25" />
              <stop offset="75%" stopColor="#64C7D8" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#64C7D8" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="centerRayGradR" x1="100%" y1="0%" x2="50%" y2="50%">
              <stop offset="0%" stopColor="#94A0AD" stopOpacity="0.25" />
              <stop offset="75%" stopColor="#64C7D8" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#64C7D8" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* 4 Corner perspective rays converging to center */}
          <line x1="2%" y1="2%" x2="50%" y2="50%" stroke="url(#centerRayGrad)" strokeWidth="0.75" />
          <line x1="98%" y1="2%" x2="50%" y2="50%" stroke="url(#centerRayGradR)" strokeWidth="0.75" />
          <line x1="2%" y1="98%" x2="50%" y2="50%" stroke="url(#centerRayGrad)" strokeWidth="0.75" />
          <line x1="98%" y1="98%" x2="50%" y2="50%" stroke="url(#centerRayGradR)" strokeWidth="0.75" />

          {/* Subtle crosshair guide lines through vanishing center */}
          <line
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
            stroke="#29323D"
            strokeWidth="0.5"
            strokeDasharray="4 6"
            strokeOpacity="0.25"
          />
          <line
            x1="0%"
            y1="50%"
            x2="100%"
            y2="50%"
            stroke="#29323D"
            strokeWidth="0.5"
            strokeDasharray="4 6"
            strokeOpacity="0.25"
          />
        </svg>

        {/* Concentric Geometric Rectangular Frames */}
        {frames.map((f, i) => (
          <div
            key={i}
            className={`tunnel-frame ${f.isCyan ? "frame-edge-cyan" : "frame-edge-metallic"}`}
            style={{
              width: f.size.w,
              height: f.size.h,
              maxWidth: "1160px",
              maxHeight: "720px",
              opacity: f.opacity,
              transform: `translate3d(0, 0, ${f.z}px)`,
            }}
          >
            {/* Corner brackets */}
            <span className="tunnel-corner tunnel-corner-tl" />
            <span className="tunnel-corner tunnel-corner-tr" />
            <span className="tunnel-corner tunnel-corner-bl" />
            <span className="tunnel-corner tunnel-corner-br" />

            {/* Restrained technical metadata */}
            {i % 2 === 0 && (
              <span className="absolute top-2 left-3 font-mono text-[9px] tracking-widest text-[#94A0AD]/40 select-none">
                SEC_LAYER_0{i + 1}
              </span>
            )}
            {f.isCyan && (
              <span className="absolute bottom-2 right-3 font-mono text-[9px] tracking-widest text-[#64C7D8]/50 select-none">
                NODE_VERIFIED
              </span>
            )}
          </div>
        ))}

        {/* Vanishing core point */}
        <div
          className="absolute w-2 h-2 rounded-full bg-[#64C7D8]/40 blur-[2px]"
          style={{
            transform: `translate3d(0, 0, -960px)`,
          }}
        />
      </div>

      {/* Subtle edge vignette */}
      <div className="absolute inset-0 bg-linear-to-t from-[#080A0D] via-transparent to-[#080A0D]/75 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-r from-[#080A0D]/60 via-transparent to-[#080A0D]/60 pointer-events-none" />
    </div>
  );
};
