import React from "react";
import { TerminalEntry } from "./terminalSequence";

interface TerminalLineProps {
  entry: TerminalEntry;
}

export const TerminalLine: React.FC<TerminalLineProps> = ({ entry }) => {
  switch (entry.type) {
    case "kali-prompt":
      return (
        <div className="my-1.5 font-mono">
          {/* Top line of Kali prompt: ┌──(vm㉿kali)-[~/security-lab] */}
          <div className="leading-tight">
            <span className="kali-bracket">┌──(</span>
            <span className="kali-user">vm</span>
            <span className="kali-at">㉿</span>
            <span className="kali-host">kali</span>
            <span className="kali-bracket">)-[</span>
            <span className="kali-path">{entry.promptPath || "~/security-lab"}</span>
            <span className="kali-bracket">]</span>
          </div>
          {/* Bottom line with command: └─$ command */}
          <div className="leading-tight flex items-center gap-1.5">
            <span className="kali-prompt-char">└─$</span>
            <span className="cmd-green">{entry.commandText}</span>
          </div>
        </div>
      );

    case "success":
      return (
        <div className="my-1 text-green-output font-semibold flex items-center gap-2">
          <span>{entry.text}</span>
        </div>
      );

    case "info":
      return (
        <div className="my-1 text-info-blue">
          {entry.text}
        </div>
      );

    case "highlight":
      return (
        <div className="my-2 text-access-highlight text-sm sm:text-base tracking-wide">
          {entry.text}
        </div>
      );

    case "identity":
      return (
        <div className="text-identity-box font-mono my-1 text-xs sm:text-sm">
          {entry.text}
        </div>
      );

    case "output-dim":
      return (
        <div className="my-0.5 text-muted-output">
          {entry.text}
        </div>
      );

    case "output-green":
    default:
      return (
        <div className="my-0.5 text-green-output">
          {entry.text}
        </div>
      );
  }
};
