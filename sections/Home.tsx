"use client";

import React, { useState } from "react";
import { TunnelBackground } from "@/components/TunnelBackground";
import { profileData } from "@/data/profile";
import { triggerResumeNotice } from "@/components/ResumeNoticeModal";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldAlert,
  Terminal,
  GraduationCap,
  FolderGit2,
  Radio,
  Network,
} from "lucide-react";

interface SecondaryNode {
  id: string;
  number: string;
  label: string;
  title: string;
  summary: string;
  targetId: string;
  icon: React.ElementType;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "bottom-center";
}

const NODES: SecondaryNode[] = [
  {
    id: "about",
    number: "01",
    label: "ABOUT",
    title: "Background & Journey",
    summary: "IIIT Surat • Transition to Security",
    targetId: "about",
    icon: GraduationCap,
    position: "top-left",
  },
  {
    id: "skills",
    number: "02",
    label: "CAPABILITIES",
    title: "Technical Arsenal",
    summary: "Wireshark • Nmap • Burp • Linux",
    targetId: "skills",
    icon: Terminal,
    position: "top-right",
  },
  {
    id: "labs",
    number: "04",
    label: "LABS & CTFS",
    title: "Security Methodology",
    summary: "TryHackMe Pre-Sec • Mr. Robot CTF",
    targetId: "projects",
    icon: ShieldAlert,
    position: "bottom-left",
  },
  {
    id: "projects",
    number: "03",
    label: "ARCHIVE",
    title: "Engineered Systems",
    summary: "DEXA AI • Distributed CCTV",
    targetId: "projects",
    icon: FolderGit2,
    position: "bottom-right",
  },
  {
    id: "contact",
    number: "05",
    label: "COMMUNICATION",
    title: "Direct Inquiries",
    summary: "Open for Security Collaboration",
    targetId: "contact",
    icon: Radio,
    position: "bottom-center",
  },
];

interface HomeSectionProps {
  awakeningStage?: "dormant" | "awakening" | "awakened";
  isTerminalDocked?: boolean;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  awakeningStage = "awakened",
  isTerminalDocked = true,
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [coreHovered, setCoreHovered] = useState<boolean>(false);

  const isDormant = awakeningStage === "dormant";
  const isAwakening = awakeningStage === "awakening";

  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[96vh] sm:min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080A0D] pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      aria-label="System Map Hero - Vaibhav Marathe"
    >
      {/* Background: Subtle Deep Network Perspective Tunnel */}
      <TunnelBackground variant="hero" className="opacity-60" />

      {/* Top Topology Status Bar - Clean Technical Header */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mb-6 flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-[#0d1218]/70 border border-[#29323D]/70 backdrop-blur-md text-[11px] font-mono text-[#94A0AD]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#64C7D8] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#64C7D8]" />
          </span>
          <span className="text-[#E8EDF2] tracking-wider uppercase text-[10px]">
            SYSTEM TOPOLOGY // INTERACTIVE MAP
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[#94A0AD] text-[10px]">
          <Network className="w-3.5 h-3.5 text-[#64C7D8]" />
          <span>ORIGIN: VM_CORE</span>
          <span className="text-[#29323D]">•</span>
          <span>5 ACTIVE SECTIONS</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase text-[#64C7D8] bg-[#171D25] px-2 py-0.5 rounded border border-[#64C7D8]/30">
            {hoveredNode
              ? `ROUTING: ${hoveredNode.toUpperCase()}`
              : isDormant
              ? "STATUS: INITIALIZING..."
              : isAwakening
              ? "STATUS: SYNCHRONIZING..."
              : "STATUS: SYNCHRONIZED"}
          </span>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* DESKTOP / TABLET SYSTEM MAP VIEW (Visible on >= 1024px)              */}
      {/* ==================================================================== */}
      <div className="relative z-10 w-full max-w-6xl mx-auto hidden lg:block min-h-175">
        {/* SVG Interconnection Circuit Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#64C7D8" floodOpacity="0.85" />
            </filter>
          </defs>

          {/* Connection Lines from Center (50%, 46%) to each node with outward draw animation */}
          {/* 1. Center to Top-Left (About) */}
          <path
            d="M 500 290 C 400 290, 260 210, 190 140"
            fill="none"
            stroke={hoveredNode === "about" || coreHovered || isAwakening ? "#64C7D8" : "#29323D"}
            strokeWidth={hoveredNode === "about" || isAwakening ? "2" : "1"}
            strokeDasharray={hoveredNode === "about" ? "none" : isAwakening ? "none" : "3 3"}
            filter={hoveredNode === "about" || isAwakening ? "url(#cyanGlow)" : undefined}
            style={{
              strokeDasharray: isDormant || isAwakening ? "500" : undefined,
              strokeDashoffset: isDormant ? "500" : "0",
              transition: "stroke-dashoffset 800ms cubic-bezier(0.16, 1, 0.3, 1) 80ms, stroke 300ms ease, stroke-width 300ms ease",
            }}
          />

          {/* 2. Center to Top-Right (Skills) */}
          <path
            d="M 650 290 C 750 290, 890 210, 960 140"
            fill="none"
            stroke={hoveredNode === "skills" || coreHovered || isAwakening ? "#64C7D8" : "#29323D"}
            strokeWidth={hoveredNode === "skills" || isAwakening ? "2" : "1"}
            strokeDasharray={hoveredNode === "skills" ? "none" : isAwakening ? "none" : "3 3"}
            filter={hoveredNode === "skills" || isAwakening ? "url(#cyanGlow)" : undefined}
            style={{
              strokeDasharray: isDormant || isAwakening ? "500" : undefined,
              strokeDashoffset: isDormant ? "500" : "0",
              transition: "stroke-dashoffset 800ms cubic-bezier(0.16, 1, 0.3, 1) 180ms, stroke 300ms ease, stroke-width 300ms ease",
            }}
          />

          {/* 3. Center to Bottom-Left (Labs) */}
          <path
            d="M 500 370 C 380 430, 260 480, 190 530"
            fill="none"
            stroke={hoveredNode === "labs" || coreHovered || isAwakening ? "#64C7D8" : "#29323D"}
            strokeWidth={hoveredNode === "labs" || isAwakening ? "2" : "1"}
            strokeDasharray={hoveredNode === "labs" ? "none" : isAwakening ? "none" : "3 3"}
            filter={hoveredNode === "labs" || isAwakening ? "url(#cyanGlow)" : undefined}
            style={{
              strokeDasharray: isDormant || isAwakening ? "500" : undefined,
              strokeDashoffset: isDormant ? "500" : "0",
              transition: "stroke-dashoffset 800ms cubic-bezier(0.16, 1, 0.3, 1) 280ms, stroke 300ms ease, stroke-width 300ms ease",
            }}
          />

          {/* 4. Center to Bottom-Right (Projects) */}
          <path
            d="M 650 370 C 770 430, 890 480, 960 530"
            fill="none"
            stroke={hoveredNode === "projects" || coreHovered || isAwakening ? "#64C7D8" : "#29323D"}
            strokeWidth={hoveredNode === "projects" || isAwakening ? "2" : "1"}
            strokeDasharray={hoveredNode === "projects" ? "none" : isAwakening ? "none" : "3 3"}
            filter={hoveredNode === "projects" || isAwakening ? "url(#cyanGlow)" : undefined}
            style={{
              strokeDasharray: isDormant || isAwakening ? "500" : undefined,
              strokeDashoffset: isDormant ? "500" : "0",
              transition: "stroke-dashoffset 800ms cubic-bezier(0.16, 1, 0.3, 1) 380ms, stroke 300ms ease, stroke-width 300ms ease",
            }}
          />

          {/* 5. Center to Bottom-Center (Contact) */}
          <path
            d="M 575 480 L 575 600"
            fill="none"
            stroke={hoveredNode === "contact" || coreHovered || isAwakening ? "#64C7D8" : "#29323D"}
            strokeWidth={hoveredNode === "contact" || isAwakening ? "2" : "1"}
            strokeDasharray={hoveredNode === "contact" ? "none" : isAwakening ? "none" : "3 3"}
            filter={hoveredNode === "contact" || isAwakening ? "url(#cyanGlow)" : undefined}
            style={{
              strokeDasharray: isDormant || isAwakening ? "300" : undefined,
              strokeDashoffset: isDormant ? "300" : "0",
              transition: "stroke-dashoffset 700ms cubic-bezier(0.16, 1, 0.3, 1) 480ms, stroke 300ms ease, stroke-width 300ms ease",
            }}
          />

          {/* Core Hub Junction Indicators */}
          <circle cx="500" cy="290" r={isAwakening ? "3.5" : "2.5"} fill="#64C7D8" className="transition-all duration-300" />
          <circle cx="650" cy="290" r={isAwakening ? "3.5" : "2.5"} fill="#64C7D8" className="transition-all duration-300" />
          <circle cx="500" cy="370" r={isAwakening ? "3.5" : "2.5"} fill="#64C7D8" className="transition-all duration-300" />
          <circle cx="650" cy="370" r={isAwakening ? "3.5" : "2.5"} fill="#64C7D8" className="transition-all duration-300" />
          <circle cx="575" cy="480" r={isAwakening ? "4" : "3"} fill="#64C7D8" className="transition-all duration-300" />
        </svg>

        {/* ------------------------------------------------------------------ */}
        {/* NODE 01: ABOUT (Top-Left)                                          */}
        {/* ------------------------------------------------------------------ */}
        <div
          onClick={() => handleScrollTo("about")}
          onMouseEnter={() => setHoveredNode("about")}
          onMouseLeave={() => setHoveredNode(null)}
          style={{
            opacity: isDormant ? 0 : 1,
            transform: isDormant ? "translateY(-14px) scale(0.95)" : "translateY(0) scale(1)",
            transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) 120ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 120ms, border-color 200ms ease, background-color 200ms ease",
            pointerEvents: isDormant ? "none" : "auto",
          }}
          className={`absolute top-0 left-0 w-64 p-4 rounded-xl bg-[#0d1218]/90 border cursor-pointer backdrop-blur-md z-10 group ${
            hoveredNode === "about"
              ? "border-[#64C7D8] -translate-y-1.5 shadow-[0_8px_25px_rgba(100,199,216,0.15)] bg-[#171D25]"
              : isAwakening
              ? "border-[#64C7D8]/80 shadow-[0_0_20px_rgba(100,199,216,0.2)]"
              : "border-[#29323D] hover:border-[#64C7D8]/60"
          }`}
          role="button"
          tabIndex={0}
          aria-label="Navigate to About section"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] tracking-widest text-[#64C7D8] uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#64C7D8]" />
              01 // ABOUT
            </span>
            <GraduationCap className="w-4 h-4 text-[#94A0AD] group-hover:text-[#64C7D8] transition-colors" />
          </div>
          <h3 className="font-heading text-sm font-semibold text-[#E8EDF2] group-hover:text-white transition-colors">
            Background & Journey
          </h3>
          <p className="text-xs text-[#94A0AD] mt-1 leading-snug">
            IIIT Surat • CSE [2024–2028]
          </p>
          <div className="mt-3 pt-2 border-t border-[#29323D] flex items-center justify-between text-[10px] font-mono text-[#64C7D8]">
            <span>EXPLORE PROFILE</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* NODE 02: SKILLS (Top-Right)                                        */}
        {/* ------------------------------------------------------------------ */}
        <div
          onClick={() => handleScrollTo("skills")}
          onMouseEnter={() => setHoveredNode("skills")}
          onMouseLeave={() => setHoveredNode(null)}
          style={{
            opacity: isDormant ? 0 : 1,
            transform: isDormant ? "translateY(-14px) scale(0.95)" : "translateY(0) scale(1)",
            transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) 240ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 240ms, border-color 200ms ease, background-color 200ms ease",
            pointerEvents: isDormant ? "none" : "auto",
          }}
          className={`absolute top-0 right-0 w-64 p-4 rounded-xl bg-[#0d1218]/90 border cursor-pointer backdrop-blur-md z-10 group ${
            hoveredNode === "skills"
              ? "border-[#64C7D8] -translate-y-1.5 shadow-[0_8px_25px_rgba(100,199,216,0.15)] bg-[#171D25]"
              : isAwakening
              ? "border-[#64C7D8]/80 shadow-[0_0_20px_rgba(100,199,216,0.2)]"
              : "border-[#29323D] hover:border-[#64C7D8]/60"
          }`}
          role="button"
          tabIndex={0}
          aria-label="Navigate to Skills section"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] tracking-widest text-[#64C7D8] uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#64C7D8]" />
              02 // CAPABILITIES
            </span>
            <Terminal className="w-4 h-4 text-[#94A0AD] group-hover:text-[#64C7D8] transition-colors" />
          </div>
          <h3 className="font-heading text-sm font-semibold text-[#E8EDF2] group-hover:text-white transition-colors">
            Technical Arsenal
          </h3>
          <p className="text-xs text-[#94A0AD] mt-1 leading-snug">
            Wireshark • Nmap • Burp • Linux
          </p>
          <div className="mt-3 pt-2 border-t border-[#29323D] flex items-center justify-between text-[10px] font-mono text-[#64C7D8]">
            <span>INSPECT STACK</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* NODE 04: LABS (Bottom-Left)                                        */}
        {/* ------------------------------------------------------------------ */}
        <div
          onClick={() => handleScrollTo("projects")}
          onMouseEnter={() => setHoveredNode("labs")}
          onMouseLeave={() => setHoveredNode(null)}
          style={{
            opacity: isDormant ? 0 : 1,
            transform: isDormant ? "translateY(14px) scale(0.95)" : "translateY(0) scale(1)",
            transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) 360ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 360ms, border-color 200ms ease, background-color 200ms ease",
            pointerEvents: isDormant ? "none" : "auto",
          }}
          className={`absolute bottom-6 left-0 w-64 p-4 rounded-xl bg-[#0d1218]/90 border cursor-pointer backdrop-blur-md z-10 group ${
            hoveredNode === "labs"
              ? "border-[#64C7D8] -translate-y-1.5 shadow-[0_8px_25px_rgba(100,199,216,0.15)] bg-[#171D25]"
              : isAwakening
              ? "border-[#64C7D8]/80 shadow-[0_0_20px_rgba(100,199,216,0.2)]"
              : "border-[#29323D] hover:border-[#64C7D8]/60"
          }`}
          role="button"
          tabIndex={0}
          aria-label="Navigate to Security Labs"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] tracking-widest text-[#64C7D8] uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#64C7D8]" />
              04 // LABS & CTFS
            </span>
            <ShieldAlert className="w-4 h-4 text-[#94A0AD] group-hover:text-[#64C7D8] transition-colors" />
          </div>
          <h3 className="font-heading text-sm font-semibold text-[#E8EDF2] group-hover:text-white transition-colors">
            Security Methodology
          </h3>
          <p className="text-xs text-[#94A0AD] mt-1 leading-snug">
            TryHackMe Pre-Security • Mr. Robot
          </p>
          <div className="mt-3 pt-2 border-t border-[#29323D] flex items-center justify-between text-[10px] font-mono text-[#64C7D8]">
            <span>VIEW METHODOLOGY</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* NODE 03: PROJECTS (Bottom-Right)                                   */}
        {/* ------------------------------------------------------------------ */}
        <div
          onClick={() => handleScrollTo("projects")}
          onMouseEnter={() => setHoveredNode("projects")}
          onMouseLeave={() => setHoveredNode(null)}
          style={{
            opacity: isDormant ? 0 : 1,
            transform: isDormant ? "translateY(14px) scale(0.95)" : "translateY(0) scale(1)",
            transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) 480ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 480ms, border-color 200ms ease, background-color 200ms ease",
            pointerEvents: isDormant ? "none" : "auto",
          }}
          className={`absolute bottom-6 right-0 w-64 p-4 rounded-xl bg-[#0d1218]/90 border cursor-pointer backdrop-blur-md z-10 group ${
            hoveredNode === "projects"
              ? "border-[#64C7D8] -translate-y-1.5 shadow-[0_8px_25px_rgba(100,199,216,0.15)] bg-[#171D25]"
              : isAwakening
              ? "border-[#64C7D8]/80 shadow-[0_0_20px_rgba(100,199,216,0.2)]"
              : "border-[#29323D] hover:border-[#64C7D8]/60"
          }`}
          role="button"
          tabIndex={0}
          aria-label="Navigate to Projects"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] tracking-widest text-[#64C7D8] uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#64C7D8]" />
              03 // ARCHIVE
            </span>
            <FolderGit2 className="w-4 h-4 text-[#94A0AD] group-hover:text-[#64C7D8] transition-colors" />
          </div>
          <h3 className="font-heading text-sm font-semibold text-[#E8EDF2] group-hover:text-white transition-colors">
            Engineered Systems
          </h3>
          <p className="text-xs text-[#94A0AD] mt-1 leading-snug">
            DEXA AI • Distributed CCTV Analysis
          </p>
          <div className="mt-3 pt-2 border-t border-[#29323D] flex items-center justify-between text-[10px] font-mono text-[#64C7D8]">
            <span>ACCESS REPOSITORIES</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* NODE 05: CONTACT (Bottom-Center)                                   */}
        {/* ------------------------------------------------------------------ */}
        <div
          onClick={() => handleScrollTo("contact")}
          onMouseEnter={() => setHoveredNode("contact")}
          onMouseLeave={() => setHoveredNode(null)}
          style={{
            opacity: isDormant ? 0 : 1,
            transform: isDormant ? "translate(-50%, 14px) scale(0.95)" : "translate(-50%, 0) scale(1)",
            transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) 600ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 600ms, border-color 200ms ease, background-color 200ms ease",
            pointerEvents: isDormant ? "none" : "auto",
          }}
          className={`absolute -bottom-8 left-1/2 w-72 p-3.5 rounded-xl bg-[#0d1218]/90 border cursor-pointer backdrop-blur-md z-10 group flex items-center justify-between ${
            hoveredNode === "contact"
              ? "border-[#64C7D8] shadow-[0_8px_25px_rgba(100,199,216,0.15)] bg-[#171D25]"
              : isAwakening
              ? "border-[#64C7D8]/80 shadow-[0_0_20px_rgba(100,199,216,0.2)]"
              : "border-[#29323D] hover:border-[#64C7D8]/60"
          }`}
          role="button"
          tabIndex={0}
          aria-label="Navigate to Contact"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#080A0D] border border-[#29323D] flex items-center justify-center text-[#64C7D8]">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#64C7D8]">
                05 // COMMUNICATION
              </span>
              <div className="font-heading text-xs font-semibold text-[#E8EDF2]">
                Direct Inquiries & Contact
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#94A0AD] group-hover:text-[#64C7D8] group-hover:translate-x-1 transition-all" />
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* CENTRAL CORE NODE & DOCKED MINI-TERMINAL (The System Origin)       */}
        {/* ------------------------------------------------------------------ */}
        <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl flex flex-col items-center gap-3 z-20 pointer-events-auto">
          {/* Central VM Core Card */}
          <div
            id="vm-core-node"
            data-vm-core="desktop"
            onMouseEnter={() => setCoreHovered(true)}
            onMouseLeave={() => setCoreHovered(false)}
            className={`w-full p-7 sm:p-8 rounded-2xl bg-[#0d1218]/95 border backdrop-blur-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] transition-all duration-500 relative group ${
              isAwakening
                ? "border-[#64C7D8] shadow-[0_0_60px_rgba(100,199,216,0.6),0_0_100px_rgba(100,199,216,0.3)] ring-2 ring-[#64C7D8]/70"
                : "border-[#29323D] hover:border-[#64C7D8]/70"
            }`}
          >
            {/* Precision Corner Notch Accents */}
            <div
              className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#64C7D8] pointer-events-none transition-all duration-300 ${
                isAwakening ? "scale-125 shadow-[0_0_12px_#64C7D8]" : ""
              }`}
            />
            <div
              className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#64C7D8] pointer-events-none transition-all duration-300 ${
                isAwakening ? "scale-125 shadow-[0_0_12px_#64C7D8]" : ""
              }`}
            />
            <div
              className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#64C7D8] pointer-events-none transition-all duration-300 ${
                isAwakening ? "scale-125 shadow-[0_0_12px_#64C7D8]" : ""
              }`}
            />
            <div
              className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#64C7D8] pointer-events-none transition-all duration-300 ${
                isAwakening ? "scale-125 shadow-[0_0_12px_#64C7D8]" : ""
              }`}
            />

            {/* Context Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#11161D] border border-[#29323D] text-[10px] font-mono tracking-widest uppercase text-[#64C7D8]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#64C7D8] animate-pulse" />
                <span>PORTFOLIO // ORIGIN</span>
              </div>
              <span className="font-mono text-[10px] text-[#94A0AD] tracking-wider">
                IIIT SURAT • CSE
              </span>
            </div>

            {/* Core Name Heading */}
            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-[#E8EDF2] leading-tight mb-2">
              VAIBHAV <span className="text-[#64C7D8]">MARATHE</span>
            </h1>

            {/* Role & Academic Focus */}
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-6 bg-[#64C7D8]" />
              <h2 className="font-mono text-xs sm:text-sm uppercase tracking-[0.18em] text-[#E8EDF2] font-semibold">
                {profileData.role}
              </h2>
            </div>

            {/* Grounded Summary Paragraph */}
            <p className="text-xs sm:text-sm text-[#94A0AD] leading-relaxed font-normal mb-6">
              Computer Science undergraduate with a foundation in software development, focusing on offensive security, network protocol analysis, and secure systems design.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleScrollTo("projects")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#64C7D8] text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#82d6e4] transition-all shadow-md shadow-[#64C7D8]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white group/btn cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={triggerResumeNotice}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#171D25] text-[#E8EDF2] border border-[#29323D] hover:border-[#64C7D8]/60 hover:bg-[#11161D] font-mono text-xs uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64C7D8] group/resume cursor-pointer"
                title="Resume status"
              >
                <span>Download Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#64C7D8] group-hover/resume:translate-x-0.5 group-hover/resume:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Docked Mini-Terminal (Physical dock position in homepage) */}
          <div
            id="vm-terminal-dock"
            data-terminal-dock="desktop"
            className={`w-full max-w-130 rounded-lg bg-[#050505] border shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(100,199,216,0.12)] overflow-hidden font-mono text-xs transition-all duration-300 ${
              isTerminalDocked ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
            } ${
              isAwakening
                ? "border-[#64C7D8]/70 shadow-[0_0_35px_rgba(100,199,216,0.3)] ring-1 ring-[#64C7D8]/50"
                : "border-[#1a232e] hover:border-[#64C7D8]/40"
            }`}
            style={{ minHeight: "76px" }}
          >
            {/* Mini Kali Titlebar */}
            <div className="bg-[#0d1217] border-b border-[#1a232e] px-3 py-1.5 flex items-center justify-between select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-[11px] text-[#B8C5CC] font-semibold flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-[#5BC0EB]" />
                  <span>vm@kali: ~/security-lab</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[#00FF66]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
                <span>SESSION_DOCKED</span>
              </div>
            </div>

            {/* Mini Terminal Output Buffer */}
            <div className="px-3.5 py-2.5 bg-[#000000] space-y-1 text-[11px] leading-relaxed select-text">
              <div className="flex items-center justify-between">
                <span className="text-[#00FF66] font-bold tracking-wide">[+] VM_CORE: ONLINE</span>
                <span className="text-[#64C7D8] text-[10px] font-semibold">[+] ACCESS GRANTED</span>
              </div>
              <div className="flex items-center gap-1 text-[#4ADE80]">
                <span className="text-[#5BC0EB]">└─$</span>
                <span>session_link: established (port 443 / tls 1.3)</span>
                <span className="w-1.5 h-3 bg-[#00FF66] animate-pulse inline-block align-middle ml-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* MOBILE / RESPONSIVE SYSTEM MAP VIEW (Visible on < 1024px)            */}
      {/* ==================================================================== */}
      <div className="relative z-10 w-full max-w-xl mx-auto block lg:hidden space-y-4">
        {/* Core Node Card */}
        <div
          id="vm-core-node-mobile"
          data-vm-core="mobile"
          className={`p-6 rounded-2xl bg-[#0d1218]/95 border backdrop-blur-md shadow-xl relative overflow-hidden transition-all duration-500 ${
            isAwakening
              ? "border-[#64C7D8] shadow-[0_0_40px_rgba(100,199,216,0.5)] ring-1 ring-[#64C7D8]/60"
              : "border-[#29323D]"
          }`}
        >
          {/* Corner Notch */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#64C7D8]" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#64C7D8]" />

          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#11161D] border border-[#29323D] text-[10px] font-mono tracking-widest uppercase text-[#64C7D8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#64C7D8] animate-pulse" />
              <span>ORIGIN // VM_CORE</span>
            </div>
            <span className="font-mono text-[10px] text-[#94A0AD]">
              IIIT SURAT • CSE
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#E8EDF2] mb-1">
            VAIBHAV <span className="text-[#64C7D8]">MARATHE</span>
          </h1>

          <div className="font-mono text-xs uppercase tracking-wider text-[#E8EDF2] mb-3 font-semibold">
            {profileData.role}
          </div>

          <p className="text-xs sm:text-sm text-[#94A0AD] leading-relaxed mb-5">
            Computer Science undergraduate with a foundation in software development, focusing on offensive security, network protocol analysis, and secure systems design.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
            <button
              onClick={() => handleScrollTo("projects")}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#64C7D8] text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#82d6e4] transition-all cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={triggerResumeNotice}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#171D25] text-[#E8EDF2] border border-[#29323D] font-mono text-xs uppercase tracking-wider cursor-pointer"
              title="Resume status"
            >
              <span>Download Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#64C7D8]" />
            </button>
          </div>
        </div>

        {/* Mobile Docked Mini-Terminal */}
        <div
          id="vm-terminal-dock-mobile"
          data-terminal-dock="mobile"
          className={`w-full rounded-lg bg-[#050505] border shadow-xl overflow-hidden font-mono text-xs transition-all duration-300 ${
            isTerminalDocked ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          } ${
            isAwakening
              ? "border-[#64C7D8]/70 shadow-[0_0_30px_rgba(100,199,216,0.3)] ring-1 ring-[#64C7D8]/40"
              : "border-[#1a232e]"
          }`}
          style={{ minHeight: "76px" }}
        >
          {/* Mini Kali Titlebar */}
          <div className="bg-[#0d1217] border-b border-[#1a232e] px-3 py-1.5 flex items-center justify-between select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
              <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
              <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
              <span className="ml-2 text-[10px] text-[#B8C5CC] font-semibold flex items-center gap-1">
                <Terminal className="w-3 h-3 text-[#5BC0EB]" />
                <span>vm@kali: ~</span>
              </span>
            </div>
            <div className="flex items-center gap-1 text-[9px] text-[#00FF66]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
              <span>ONLINE</span>
            </div>
          </div>

          {/* Mini Output Buffer */}
          <div className="px-3 py-2 bg-[#000000] space-y-0.5 text-[10px]">
            <div className="flex items-center justify-between">
              <span className="text-[#00FF66] font-bold">[+] VM_CORE: ONLINE</span>
              <span className="text-[#64C7D8]">[+] ACCESS GRANTED</span>
            </div>
            <div className="flex items-center gap-1 text-[#4ADE80]">
              <span className="text-[#5BC0EB]">└─$</span>
              <span>session: active (tls 1.3)</span>
              <span className="w-1.5 h-2.5 bg-[#00FF66] animate-pulse inline-block" />
            </div>
          </div>
        </div>

        {/* Mobile Interconnected Topology Endpoints */}
        <div className="relative pl-6 space-y-3">
          {/* Vertical Trunk Line */}
          <div
            className="absolute left-2.5 top-2 bottom-4 w-0.5 bg-linear-to-b from-[#64C7D8] via-[#29323D] to-transparent transition-all duration-700"
            style={{
              opacity: isDormant ? 0 : 1,
            }}
          />

          {NODES.map((node, idx) => {
            const Icon = node.icon;
            const staggerDelay = `${100 + idx * 100}ms`;
            return (
              <div
                key={node.id}
                onClick={() => handleScrollTo(node.targetId)}
                style={{
                  opacity: isDormant ? 0 : 1,
                  transform: isDormant ? "translateX(-10px)" : "translateX(0)",
                  transition: `opacity 500ms ease ${staggerDelay}, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}`,
                }}
                className={`relative p-3.5 rounded-xl bg-[#0d1218]/90 border transition-colors cursor-pointer ${
                  isAwakening
                    ? "border-[#64C7D8]/60 shadow-[0_0_15px_rgba(100,199,216,0.15)]"
                    : "border-[#29323D] active:border-[#64C7D8] active:bg-[#171D25]"
                }`}
              >
                {/* Junction Dot on vertical line */}
                <div className="absolute -left-4.75 top-4 w-2.5 h-2.5 rounded-full bg-[#11161D] border-2 border-[#64C7D8]" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-[#64C7D8]" />
                    <span className="font-mono text-[10px] uppercase text-[#64C7D8] tracking-wider">
                      {node.number} // {node.label}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#94A0AD]" />
                </div>

                <div className="font-heading text-xs font-semibold text-[#E8EDF2] mt-1">
                  {node.title}
                </div>
                <div className="text-[11px] text-[#94A0AD] mt-0.5">
                  {node.summary}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
