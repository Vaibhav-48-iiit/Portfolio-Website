"use client";

import React, { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import {
  FIRST_VISIT_CONFIG,
  RELOAD_CONFIG,
  IntroTimingConfig,
  TerminalEntry,
} from "./terminalSequence";
import { TerminalWindow } from "./TerminalWindow";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "./intro.css";

const SESSION_STORAGE_KEY = "vm_cyber_intro_played";

function subscribeSession(): () => void {
  return () => {};
}

function getSessionSnapshot(): boolean {
  try {
    return sessionStorage.getItem(SESSION_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function getServerSessionSnapshot(): boolean {
  return false;
}

interface IntroControllerProps {
  onRevealPortfolio?: () => void;
  onAwaken?: () => void;
  onDockComplete?: () => void;
}

export const IntroController: React.FC<IntroControllerProps> = ({
  onRevealPortfolio,
  onAwaken,
  onDockComplete,
}) => {
  const reducedMotion = useReducedMotion();

  // Synchronously initialize to true so terminal overlay is painted on frame 0
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Synchronize reload state using useSyncExternalStore to eliminate setState in effect & hydration mismatch
  const isReload = useSyncExternalStore(
    subscribeSession,
    getSessionSnapshot,
    getServerSessionSnapshot
  );
  const config: IntroTimingConfig = isReload ? RELOAD_CONFIG : FIRST_VISIT_CONFIG;

  const [visibleLines, setVisibleLines] = useState<TerminalEntry[]>([]);
  const [isAccessGranted, setIsAccessGranted] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [transitionStyle, setTransitionStyle] = useState<React.CSSProperties>({});
  const [overlayOpacity, setOverlayOpacity] = useState<number>(1);

  const terminalRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const hasFinishedRef = useRef<boolean>(false);
  const startTimeRef = useRef<number>(0);
  const activeConfigRef = useRef<IntroTimingConfig>(FIRST_VISIT_CONFIG);
  const onRevealRef = useRef(onRevealPortfolio);
  const onAwakenRef = useRef(onAwaken);
  const onDockCompleteRef = useRef(onDockComplete);

  // Safely update refs outside of render to comply with react-hooks/refs
  useEffect(() => {
    onRevealRef.current = onRevealPortfolio;
    onAwakenRef.current = onAwaken;
    onDockCompleteRef.current = onDockComplete;
  });

  // Persist session flag safely to sessionStorage
  const markSessionAsPlayed = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
      }
    } catch {
      // ignore
    }
  }, []);

  // Clean up all pending timeouts
  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  // Complete and unmount intro
  const finishIntro = useCallback(
    (cfg?: IntroTimingConfig) => {
      if (hasFinishedRef.current) return;
      hasFinishedRef.current = true;
      clearAllTimeouts();

      // Persist that intro sequence has run for this session
      markSessionAsPlayed();

      // Unlock body scrolling
      document.body.style.overflow = "";

      // Inform parent to reveal portfolio, awaken network, and finalize dock
      onRevealRef.current?.();
      onAwakenRef.current?.();
      onDockCompleteRef.current?.();

      const activeCfg = cfg || activeConfigRef.current;
      if (startTimeRef.current > 0) {
        const elapsed = Math.round(performance.now() - startTimeRef.current);
        console.log(
          `%c[CyberIntro] Intro animation completed in %c${elapsed}ms%c (target: ~${activeCfg.totalDurationMs}ms) | Mode: ${activeCfg.label}`,
          "color: #00FF66; font-weight: bold;",
          "color: #00FF66; font-weight: bold; text-decoration: underline;",
          "color: #B8C5CC;"
        );
      }

      // Smooth exit
      setOverlayOpacity(0);
      const unmountDelay = activeCfg.mode === "reload" ? 60 : 100;
      setTimeout(() => {
        setIsVisible(false);
      }, unmountDelay);
    },
    [clearAllTimeouts, markSessionAsPlayed]
  );

  // Handle Skip button
  const handleSkip = useCallback(() => {
    console.log(`[CyberIntro] User skipped intro sequence. Docking instantly.`);
    finishIntro();
  }, [finishIntro]);

  // Execute continuous FLIP terminal docking transition
  const executeTransition = useCallback(
    (cfg: IntroTimingConfig) => {
      setIsTransitioning(true);

      // Persist session played as soon as transition commences
      markSessionAsPlayed();

      // Step 1: Reveal portfolio underneath so dock element is laid out in DOM
      onRevealRef.current?.();

      if (startTimeRef.current > 0) {
        const elapsed = Math.round(performance.now() - startTimeRef.current);
        console.log(
          `%c[CyberIntro] Terminal transition started at %c${elapsed}ms%c (target: ${cfg.transitionStartMs}ms) | Mode: ${cfg.label}`,
          "color: #00FF66;",
          "color: #5BC0EB; font-weight: bold;",
          "color: #B8C5CC;"
        );
      }

      // Step 2: In next animation frame, measure exact dock coordinates and apply continuous FLIP flight
      requestAnimationFrame(() => {
        try {
          const desktopDock = document.getElementById("vm-terminal-dock");
          const mobileDock = document.getElementById("vm-terminal-dock-mobile");

          let targetDockEl: HTMLElement | null = null;
          if (desktopDock && desktopDock.offsetParent !== null) {
            targetDockEl = desktopDock;
          } else if (mobileDock && mobileDock.offsetParent !== null) {
            targetDockEl = mobileDock;
          } else {
            targetDockEl = desktopDock || mobileDock;
          }

          const terminalEl = terminalRef.current;

          if (targetDockEl && terminalEl) {
            const termRect = terminalEl.getBoundingClientRect();
            const dockRect = targetDockEl.getBoundingClientRect();

            // Calculate center-to-center delta
            const termCenterX = termRect.left + termRect.width / 2;
            const termCenterY = termRect.top + termRect.height / 2;
            const dockCenterX = dockRect.left + dockRect.width / 2;
            const dockCenterY = dockRect.top + dockRect.height / 2;

            const deltaX = dockCenterX - termCenterX;
            const deltaY = dockCenterY - termCenterY;
            const scaleX = dockRect.width / termRect.width;
            const scaleY = dockRect.height / termRect.height;

            setTransitionStyle({
              transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scaleX}, ${scaleY})`,
              transition: `transform ${cfg.morphDurationMs}ms cubic-bezier(0.16, 1, 0.3, 1), border-color ${cfg.morphDurationMs}ms ease, box-shadow ${cfg.morphDurationMs}ms ease`,
              transformOrigin: "center center",
              borderRadius: "8px",
            });
          } else {
            // Fallback
            setTransitionStyle({
              transform: "translateY(80px) scale(0.7)",
              opacity: 0,
              transition: `transform ${cfg.morphDurationMs}ms ease, opacity ${cfg.morphDurationMs}ms ease`,
            });
          }
        } catch {
          setTransitionStyle({
            opacity: 0,
            transition: "opacity 300ms ease",
          });
        }

        // Step 3: Fade out dark backdrop overlay as terminal travels across the screen
        const fadeTimer = setTimeout(() => {
          setOverlayOpacity(0);
        }, cfg.fadeOverlayDelayMs);
        timeoutsRef.current.push(fadeTimer);

        // Step 4: Network Awakening begins as terminal approaches destination (~55% of flight)
        const awakenDelay = Math.round(cfg.morphDurationMs * 0.55);
        const awakenTimer = setTimeout(() => {
          console.log(
            `%c[CyberIntro] Network Awakening triggered | Pulse VM Core & awaken topology`,
            "color: #64C7D8; font-weight: bold;"
          );
          onAwakenRef.current?.();
        }, awakenDelay);
        timeoutsRef.current.push(awakenTimer);

        // Step 5: Touchdown at destination! Hand off to docked mini-terminal
        const dockTimer = setTimeout(() => {
          console.log(
            `%c[CyberIntro] Terminal successfully docked into homepage System Map`,
            "color: #00FF66; font-weight: bold;"
          );
          onDockCompleteRef.current?.();
          finishIntro(cfg);
        }, cfg.morphDurationMs);
        timeoutsRef.current.push(dockTimer);
      });
    },
    [finishIntro, markSessionAsPlayed]
  );

  // Main lifecycle
  useEffect(() => {
    // If user prefers reduced motion, bypass immediately
    if (reducedMotion) {
      document.body.style.overflow = "";
      finishIntro();
      return;
    }

    // Lock body scrolling while intro is active
    document.body.style.overflow = "hidden";

    // Expose dev reset helper on window
    if (typeof window !== "undefined") {
      (window as unknown as { __resetIntro: () => void }).__resetIntro = () => {
        try {
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
          console.log(
            `%c[CyberIntro] Reset intro session: sessionStorage key "${SESSION_STORAGE_KEY}" removed.`,
            "color: #00FF66;"
          );
        } catch {
          // ignore
        }
        window.location.reload();
      };
    }

    // 1. Detect visit mode from sessionStorage
    let storedValue: string | null = null;
    let reloadMode = false;
    try {
      storedValue = sessionStorage.getItem(SESSION_STORAGE_KEY);
      reloadMode = storedValue === "true";
    } catch {
      reloadMode = false;
    }

    const activeCfg = reloadMode ? RELOAD_CONFIG : FIRST_VISIT_CONFIG;
    activeConfigRef.current = activeCfg;
    hasFinishedRef.current = false;
    startTimeRef.current = performance.now();

    // Development log showing detected visit mode and initial storage state
    console.log(
      `%c[CyberIntro] Detected visit mode: %c${activeCfg.label} (${(activeCfg.totalDurationMs / 1000).toFixed(1)}s)%c | sessionStorage[${SESSION_STORAGE_KEY}] = %c${storedValue ?? "null (new session)"}`,
      "color: #00FF66; font-weight: bold;",
      "color: #5BC0EB; font-weight: bold;",
      "color: #B8C5CC;",
      "color: #F59E0B; font-weight: bold;"
    );

    // Schedule progressive reveal of lines
    activeCfg.sequence.forEach((entry) => {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => [...prev, entry]);

        if (entry.id === "access-granted" || entry.id === "re-access") {
          setIsAccessGranted(true);
        }
      }, entry.revealAt);

      timeoutsRef.current.push(timer);
    });

    // Schedule exact transition timing
    const transTimer = setTimeout(() => {
      executeTransition(activeCfg);
    }, activeCfg.transitionStartMs);
    timeoutsRef.current.push(transTimer);

    // Hard safety timeout
    const safetyTimeoutMs = activeCfg.totalDurationMs + 500;
    const safetyTimer = setTimeout(() => {
      finishIntro(activeCfg);
    }, safetyTimeoutMs);
    timeoutsRef.current.push(safetyTimer);

    // Handle Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        finishIntro(activeCfg);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearAllTimeouts();
      document.body.style.overflow = "";
    };
  }, [reducedMotion, executeTransition, finishIntro, clearAllTimeouts]);

  if (!isVisible) return null;

  return (
    <div
      className="terminal-overlay-root"
      style={{
        opacity: overlayOpacity,
        transition: "opacity 300ms ease",
        pointerEvents: overlayOpacity === 0 ? "none" : "auto",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Kali Linux Terminal Intro"
    >
      {/* Top Controls: Mode indicator & Skip button */}
      <div className="fixed top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 z-10000 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#0d1217] border border-[#1a232e] text-[11px] font-mono text-[#4ADE80]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
          <span>{config.badgeText}</span>
        </div>

        <button
          onClick={handleSkip}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0d1217] hover:bg-[#151d26] border border-[#1a232e] hover:border-[#00FF66]/60 text-xs font-mono uppercase tracking-wider text-[#E8EDF2] hover:text-[#00FF66] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66] shadow-lg"
          aria-label="Skip Terminal Introduction"
        >
          <span>SKIP INTRO</span>
          <span className="text-[#00FF66]">→</span>
        </button>
      </div>

      {/* Terminal Window traveling continuously to dock position */}
      <div ref={terminalRef} className="relative z-9999" style={transitionStyle}>
        <TerminalWindow
          visibleLines={visibleLines}
          isAccessGranted={isAccessGranted}
          isComplete={isTransitioning}
          isDocking={isTransitioning}
        />
      </div>
    </div>
  );
};
