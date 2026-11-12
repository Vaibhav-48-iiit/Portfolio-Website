"use client";

interface ScrollIndicatorProps {
  indicatorRef?: React.RefObject<HTMLDivElement | null>;
}

export default function ScrollIndicator({ indicatorRef }: ScrollIndicatorProps) {
  return (
    <div
      ref={indicatorRef}
      className="w-full flex items-end justify-between px-6 sm:px-10 md:px-16 pb-8 pt-4 relative z-20 pointer-events-auto"
    >
      {/* Scroll Prompter */}
      <div className="flex items-center gap-3.5">
        {/* Animated track line */}
        <div className="relative w-[1px] h-9 bg-white/10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-emerald-400 to-transparent animate-[scrollLine_2.2s_ease-in-out_infinite]" />
        </div>

        <span className="text-[11px] font-mono tracking-[0.22em] text-zinc-400 uppercase">
          Scroll to explore
        </span>
      </div>

      {/* Year indicator */}
      <div className="hidden sm:block">
        <span className="text-[11px] font-mono tracking-[0.18em] text-zinc-500 uppercase">
          2026 Edition
        </span>
      </div>
    </div>
  );
}
