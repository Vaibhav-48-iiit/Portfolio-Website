import React from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { profileData } from "@/data/profile";
import { GraduationCap, Target, Compass, Award, CheckCircle2 } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 bg-[#080A0D] border-t border-[#29323D]/50 overflow-hidden"
      aria-label="About Vaibhav Marathe"
    >
      {/* Faint continuation of tunnel grid along edges */}
      <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
        <div className="absolute left-4 sm:left-12 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[#29323D] to-transparent" />
        <div className="absolute right-4 sm:right-12 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-[#29323D] to-transparent" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#29323D]/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="01"
          category="ABOUT"
          title="Background & Journey"
          subtitle="A grounded view into my academic path, software development foundation, and focus on offensive security."
        />

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Natural, human-sounding description */}
          <div className="lg:col-span-7 space-y-6 text-[#94A0AD] text-base sm:text-lg leading-relaxed font-normal">
            {profileData.bioParagraphs.map((paragraph, index) => (
              <p key={index} className="text-[#94A0AD]">
                {paragraph}
              </p>
            ))}

            {/* Quick Summary Highlights */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#29323D]">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#64C7D8]" />
                <span className="text-sm font-mono text-[#E8EDF2]">
                  IIIT Surat Undergraduate (CSE)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#64C7D8]" />
                <span className="text-sm font-mono text-[#E8EDF2]">
                  Full-Stack to Security Transition
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#64C7D8]" />
                <span className="text-sm font-mono text-[#E8EDF2]">
                  Packet & Protocol Analysis
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#64C7D8]" />
                <span className="text-sm font-mono text-[#E8EDF2]">
                  Hands-on CTF Problem Solver
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Structured technical profile dossier */}
          <div className="lg:col-span-5">
            <div className="bg-[#0d1218]/90 border border-[#29323D] rounded-xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden group hover:border-[#64C7D8]/40 transition-colors">
              {/* Education Block */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#64C7D8]">
                  <GraduationCap className="w-4 h-4 text-[#64C7D8]" />
                  <span>EDUCATION</span>
                </div>
                <div className="text-base font-semibold text-[#E8EDF2] font-heading">
                  {profileData.education.degree}
                </div>
                <div className="text-xs font-mono text-[#94A0AD]">
                  {profileData.education.institution} • {profileData.education.period}
                </div>
              </div>

              <div className="h-px bg-[#29323D]" />

              {/* Focus Block */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#64C7D8]">
                  <Target className="w-4 h-4 text-[#64C7D8]" />
                  <span>PRIMARY FOCUS</span>
                </div>
                <div className="text-sm font-mono text-[#E8EDF2] font-medium">
                  {profileData.focus.join(" & ")}
                </div>
                <p className="text-xs text-[#94A0AD]">
                  Applying software development intuition to web security, network protocols, and system defenses.
                </p>
              </div>

              <div className="h-px bg-[#29323D]" />

              {/* Currently Exploring */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#64C7D8]">
                  <Compass className="w-4 h-4 text-[#64C7D8]" />
                  <span>CURRENTLY EXPLORING</span>
                </div>
                <div className="text-xs font-mono text-[#E8EDF2]/90 leading-relaxed">
                  {profileData.exploring.join(" • ")}
                </div>
              </div>

              <div className="h-px bg-[#29323D]" />

              {/* Compact Achievement Dossier */}
              <div className="bg-[#11161D] border border-[#29323D] rounded-lg p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#94A0AD] flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#64C7D8]" />
                    {profileData.achievement.platform}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#64C7D8]">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Completed</span>
                  </span>
                </div>
                <div className="font-heading text-sm font-bold text-[#E8EDF2]">
                  {profileData.achievement.title}
                </div>
                {profileData.achievement.description && (
                  <p className="text-xs text-[#94A0AD] leading-relaxed">
                    {profileData.achievement.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
