"use client";

import React from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { technicalCapabilityIndex } from "@/data/skills";
import { ArrowUpRight, Terminal, BookOpen, Layers } from "lucide-react";

export const SkillsSection: React.FC = () => {
  const handleScrollTo = (targetId?: string) => {
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32 bg-[#080A0D] border-t border-[#29323D]/50"
      aria-label="Technical Capability Index"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="02"
          category="CAPABILITIES"
          title="Technical Capability Index"
          subtitle="Documented skillsets, applied toolchains, and active research domains grounded in actual software builds and hands-on security labs."
        />

        {/* Legend / Status Filter Indicator */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 py-2.5 px-4 rounded-lg bg-[#0d1218]/70 border border-[#29323D] text-[11px] font-mono text-[#94A0AD]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#64C7D8]" />
            <span className="uppercase tracking-wider text-[#E8EDF2] font-medium">
              CAPABILITY CLASSIFICATION
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[10px]">
            <span className="inline-flex items-center gap-1.5 text-[#E8EDF2]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#64C7D8]" />
              <span>HANDS-ON TOOLING (TESTED)</span>
            </span>
            <span className="text-[#29323D]">•</span>
            <span className="inline-flex items-center gap-1.5 text-[#94A0AD]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#94A0AD]/60" />
              <span>CURRENTLY LEARNING & EXPANDING</span>
            </span>
          </div>
        </div>

        {/* Technical Capability Table / Structured Rows */}
        <div className="border border-[#29323D] rounded-xl bg-[#0d1218]/60 overflow-hidden divide-y divide-[#29323D]">
          {/* Table Header (Desktop) */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3.5 bg-[#11161D]/90 text-[11px] font-mono tracking-wider text-[#64C7D8] uppercase">
            <div className="col-span-3">Domain / Focus</div>
            <div className="col-span-4">Core Tools & Technologies</div>
            <div className="col-span-5">Applied Context & Lab Evidence</div>
          </div>

          {/* Rows */}
          {technicalCapabilityIndex.map((item) => (
            <div
              key={item.id}
              className="group p-6 sm:p-7 hover:bg-[#11161D]/70 transition-colors duration-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Column 1: Domain & Code */}
                <div className="lg:col-span-3 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[#64C7D8] tracking-widest uppercase">
                      {item.code}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#E8EDF2] group-hover:text-white transition-colors">
                    {item.domain}
                  </h3>
                  <p className="text-xs text-[#94A0AD] leading-relaxed">
                    {item.focus}
                  </p>
                </div>

                {/* Column 2: Tools (Hands-on vs Learning) */}
                <div className="lg:col-span-4 space-y-4">
                  <div>
                    <span className="block font-mono text-[10px] text-[#94A0AD] uppercase tracking-wider mb-2">
                      Hands-on Experience:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.toolsUsed.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[#171D25] border border-[#29323D] text-xs font-mono text-[#E8EDF2] group-hover:border-[#64C7D8]/30 transition-colors"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {item.learning.length > 0 && (
                    <div className="pt-2 border-t border-[#29323D]/60">
                      <span className="block font-mono text-[10px] text-[#94A0AD]/70 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3 text-[#64C7D8]" />
                        <span>Actively Studying:</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.learning.map((study, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-[#080A0D] border border-[#29323D]/70 text-[11px] font-mono text-[#94A0AD] italic"
                          >
                            {study}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Column 3: Applied Context & Direct Link to Project/Lab Evidence */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-3 lg:pl-4 lg:border-l lg:border-[#29323D]/60">
                  <div>
                    <span className="block font-mono text-[10px] text-[#94A0AD] uppercase tracking-wider mb-1.5">
                      Practical Implementation:
                    </span>
                    <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-normal">
                      {item.practicalExperience}
                    </p>
                  </div>

                  {item.evidenceLabel && (
                    <div className="pt-2">
                      <button
                        onClick={() => handleScrollTo(item.evidenceTargetId)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#64C7D8] hover:text-[#82d6e4] group/link cursor-pointer focus-visible:outline-none focus-visible:underline"
                        title={`View evidence for ${item.domain}`}
                      >
                        <span className="underline underline-offset-4 decoration-[#64C7D8]/40 group-hover/link:decoration-[#64C7D8]">
                          {item.evidenceLabel}
                        </span>
                        <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Documentation Authenticity Note */}
        <div className="mt-8 flex items-center justify-between flex-wrap gap-4 px-4 py-3 rounded-lg bg-[#0d1218]/40 border border-[#29323D]/60 text-xs font-mono text-[#94A0AD]">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#64C7D8]" />
            <span>All entries correspond directly to documented GitHub repositories or completed platform rooms.</span>
          </div>
          <span className="text-[10px] text-[#64C7D8]">
            0% INVENTED PROFICIENCY METRICS
          </span>
        </div>
      </div>
    </section>
  );
};
