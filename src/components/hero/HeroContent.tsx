"use client";

interface HeroContentProps {
  contentRef?: React.RefObject<HTMLDivElement | null>;
}

export default function HeroContent({ contentRef }: HeroContentProps) {
  return (
    <div
      ref={contentRef}
      className="flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-16 max-w-2xl lg:max-w-3xl relative z-10 pointer-events-none"
    >
      <div className="space-y-6 sm:space-y-8 pointer-events-auto">
        {/* Eyebrow Label */}
        <div className="hero-anim-item flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-emerald-400 font-medium">
            Cybersecurity Student Portfolio
          </span>
        </div>

        {/* Primary Identity Display: VAIBHAV + Title */}
        <div className="hero-anim-item space-y-3">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[-0.04em] text-white leading-[0.9] select-none">
            VAIBHAV
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light tracking-[0.14em] text-zinc-300 uppercase font-mono">
            Cybersecurity Student
          </p>
        </div>

        {/* Supporting Thesis Statement */}
        <div className="hero-anim-item max-w-lg">
          <p className="text-sm sm:text-base md:text-lg text-zinc-300/90 font-normal leading-relaxed">
            Exploring ethical hacking, penetration testing and the security of
            digital systems.
          </p>
        </div>

        {/* Authentic Focus & Current Status */}
        <div className="hero-anim-item pt-4 border-t border-white/10 max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
          <div>
            <span className="block text-zinc-400 text-[11px] font-mono tracking-wider uppercase">
              Core Focus
            </span>
            <p className="text-xs sm:text-sm text-zinc-200 mt-1 font-normal leading-snug">
              Ethical Hacking · Network Security · Vulnerability Assessment
            </p>
          </div>
          <div>
            <span className="block text-zinc-400 text-[11px] font-mono tracking-wider uppercase">
              Current Status
            </span>
            <p className="text-xs sm:text-sm text-zinc-200 mt-1 font-normal leading-snug">
              Hands-on Lab Training · CTF Practice · Open to Internships
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="hero-anim-item pt-2 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-xs border border-emerald-500/35 bg-emerald-950/25 text-xs font-mono uppercase tracking-[0.16em] text-emerald-300 transition-all duration-300 hover:bg-emerald-900/40 hover:border-emerald-400/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
          >
            <span>Explore Work</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-3 text-xs font-mono uppercase tracking-[0.16em] text-zinc-400 hover:text-white transition-colors duration-200"
          >
            <span>Contact</span>
          </a>
        </div>
      </div>
    </div>
  );
}
