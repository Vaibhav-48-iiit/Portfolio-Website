"use client";

import React, { useState, useEffect } from "react";
import { FileText, X, ArrowUpRight, ShieldAlert, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, TryHackMeIcon } from "./SocialIcons";

export const triggerResumeNotice = (e?: React.MouseEvent) => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("vm:resume-notice"));
  }
};

export const ResumeNoticeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("vm:resume-notice", handleOpen);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("vm:resume-notice", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-10000 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-notice-title"
      onClick={() => setIsOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-[#0d1217] border border-[#29323D] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(100,199,216,0.15)] overflow-hidden font-sans relative"
      >
        {/* Terminal Header Bar */}
        <div className="bg-[#11161D] border-b border-[#29323D] px-4 py-3 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#64C7D8] animate-pulse" />
            <span className="font-mono text-xs text-[#64C7D8] tracking-widest uppercase">
              STATUS_404 // RESUME_UPDATING
            </span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded text-[#94A0AD] hover:text-white hover:bg-[#1a232e] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#64C7D8]"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 space-y-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#171D25] border border-[#64C7D8]/40 flex items-center justify-center shrink-0 text-[#64C7D8] shadow-[0_0_15px_rgba(100,199,216,0.2)]">
              <FileText className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 id="resume-notice-title" className="font-heading text-lg font-bold text-[#E8EDF2]">
                Resume Not Available Now
              </h3>
              <p className="font-mono text-xs text-[#64C7D8]">
                [!] SYSTEM NOTICE: DOCUMENT UNDER REVISION
              </p>
            </div>
          </div>

          <p className="text-sm text-[#94A0AD] leading-relaxed">
            My official resume is currently being updated with recent cybersecurity research, TryHackMe achievements, and upcoming projects. It will be available for download here shortly.
          </p>

          {/* Alternative verification channels */}
          <div className="p-3.5 rounded-xl bg-[#11161D] border border-[#29323D] space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#E8EDF2]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#64C7D8]" />
              <span>Explore verified credentials directly:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
              <a
                href="https://github.com/Vaibhav-48-iiit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-[#080A0D] border border-[#29323D] hover:border-[#64C7D8]/50 hover:text-[#64C7D8] text-[#94A0AD] transition-colors group"
              >
                <span className="flex items-center gap-2">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repos</span>
                </span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://www.linkedin.com/in/cyber-vaibhav"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-[#080A0D] border border-[#29323D] hover:border-[#64C7D8]/50 hover:text-[#64C7D8] text-[#94A0AD] transition-colors group"
              >
                <span className="flex items-center gap-2">
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn Profile</span>
                </span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://tryhackme.com/p/CyberVaibhav"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-[#080A0D] border border-[#29323D] hover:border-[#64C7D8]/50 hover:text-[#64C7D8] text-[#94A0AD] transition-colors group sm:col-span-2"
              >
                <span className="flex items-center gap-2">
                  <TryHackMeIcon className="w-3.5 h-3.5" />
                  <span>TryHackMe // CyberVaibhav</span>
                </span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Close button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-5 py-2 rounded-lg bg-[#171D25] hover:bg-[#202833] border border-[#29323D] hover:border-[#64C7D8]/50 text-xs font-mono uppercase tracking-wider text-[#E8EDF2] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#64C7D8]"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
