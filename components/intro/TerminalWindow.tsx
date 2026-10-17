"use client";

import React, { useEffect, useRef } from "react";
import { TerminalEntry } from "./terminalSequence";
import { TerminalLine } from "./TerminalLine";
import { Terminal as TerminalIcon } from "lucide-react";

interface TerminalWindowProps {
  visibleLines: TerminalEntry[];
  isAccessGranted: boolean;
  isComplete: boolean;
  isDocking?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  visibleLines,
  isAccessGranted,
  isComplete,
  isDocking = false,
  className = "",
  style = {},
}) => {
  const bufferRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of buffer as new lines arrive
  useEffect(() => {
    if (bufferRef.current) {
      bufferRef.current.scrollTop = bufferRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div
      className={`terminal-window-kali ${
        isAccessGranted ? "terminal-granted-cyan" : ""
      } ${isDocking ? "terminal-docking-active" : ""} ${className}`}
      style={style}
    >
      {/* Kali Linux Window Titlebar */}
      <div className="terminal-titlebar-kali">
        {/* Three Window Controls */}
        <div className="terminal-dots-group">
          <span className="terminal-dot terminal-dot-close" />
          <span className="terminal-dot terminal-dot-min" />
          <span className="terminal-dot terminal-dot-max" />
        </div>

        {/* Title */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#B8C5CC]">
          <TerminalIcon className="w-3.5 h-3.5 text-[#5BC0EB]" />
          <span className="text-[#E8EDF2] font-semibold tracking-wide">vm@kali: ~/security-lab</span>
        </div>

        {/* Right Status Indicator */}
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-[#00FF66]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
          <span>{isDocking ? "SESSION_DOCKED" : "BASH (x86_64)"}</span>
        </div>
      </div>

      {/* Terminal Output Buffer */}
      {isDocking ? (
        <div className="p-3 bg-[#000000] font-mono space-y-1 text-xs select-text animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-[#00FF66] font-bold tracking-wide">[+] VM_CORE: ONLINE</span>
            <span className="text-[#64C7D8] text-[10px] font-semibold">[+] ACCESS GRANTED</span>
          </div>
          <div className="flex items-center gap-1 text-[#4ADE80] text-[11px]">
            <span className="text-[#5BC0EB]">└─$</span>
            <span>session_link: established (port 443 / tls 1.3)</span>
            <span className="w-1.5 h-3 bg-[#00FF66] animate-pulse inline-block align-middle ml-0.5" />
          </div>
        </div>
      ) : (
        <div ref={bufferRef} className="terminal-buffer-kali select-text">
          {visibleLines.map((entry) => (
            <TerminalLine key={entry.id} entry={entry} />
          ))}

          {/* Blinking green cursor while terminal sequence is active */}
          {!isComplete && (
            <div className="flex items-center gap-1 my-1">
              <span className="kali-prompt-char select-none">└─$</span>
              <span className="kali-cursor" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
