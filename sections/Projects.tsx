"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectModal } from "@/components/ProjectModal";
import { projectsData, ProjectItem } from "@/data/projects";
import { labsData, LabItem } from "@/data/labs";
import { GithubIcon } from "@/components/SocialIcons";
import {
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Cpu,
  Layers,
  FileCode,
} from "lucide-react";

type FilterType = "all" | "projects" | "labs";

type ModalItem = (ProjectItem | LabItem) & {
  type: "project" | "lab";
};

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedItem, setSelectedItem] = useState<ModalItem | null>(null);

  const handleOpenProject = (project: ProjectItem) => {
    setSelectedItem({ ...project, type: "project" });
  };

  const handleOpenLab = (lab: LabItem) => {
    setSelectedItem({ ...lab, type: "lab" });
  };

  const showProjects = filter === "all" || filter === "projects";
  const showLabs = filter === "all" || filter === "labs";

  const dexaProject = projectsData.find((p) => p.id === "dexa-ai");
  const cctvProject = projectsData.find((p) => p.id === "distributed-cctv-detection");

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32 bg-[#080A0D] border-t border-[#29323D]/50"
      aria-label="Technical Research Archive"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Archive Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            number="03"
            category="ARCHIVE"
            title="Technical Research & Systems"
            subtitle="Engineered software systems alongside practical cybersecurity CTFs, packet investigations, and privilege escalation methodologies."
          />

          {/* Filter Controls: All | Systems | Security Labs */}
          <div className="inline-flex items-center p-1 rounded-lg bg-[#0d1218] border border-[#29323D] self-start md:self-auto text-xs font-mono">
            <button
              onClick={() => setFilter("all")}
              className={`px-3.5 py-1.5 rounded transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-[#171D25] text-[#64C7D8] border border-[#64C7D8]/30 font-medium"
                  : "text-[#94A0AD] hover:text-[#E8EDF2]"
              }`}
            >
              All Entries ({projectsData.length + labsData.length})
            </button>

            <button
              onClick={() => setFilter("projects")}
              className={`px-3.5 py-1.5 rounded transition-all cursor-pointer ${
                filter === "projects"
                  ? "bg-[#171D25] text-[#64C7D8] border border-[#64C7D8]/30 font-medium"
                  : "text-[#94A0AD] hover:text-[#E8EDF2]"
              }`}
            >
              Systems ({projectsData.length})
            </button>

            <button
              onClick={() => setFilter("labs")}
              className={`px-3.5 py-1.5 rounded transition-all cursor-pointer ${
                filter === "labs"
                  ? "bg-[#171D25] text-[#64C7D8] border border-[#64C7D8]/30 font-medium"
                  : "text-[#94A0AD] hover:text-[#E8EDF2]"
              }`}
            >
              Security Labs ({labsData.length})
            </button>
          </div>
        </div>

        {/* ================================================================== */}
        {/* SECTION A: ENGINEERED SYSTEMS ARCHIVE                              */}
        {/* ================================================================== */}
        {showProjects && (
          <div className="space-y-10 mb-16">
            {/* Header label for Systems */}
            <div className="flex items-center gap-3 pb-3 border-b border-[#29323D]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#64C7D8]" />
              <span className="font-mono text-xs text-[#E8EDF2] uppercase tracking-wider font-semibold">
                ENGINEERED SOFTWARE & APPLICATION ARCHITECTURE
              </span>
            </div>

            {/* 1. FEATURED CASE STUDY: DEXA AI */}
            {dexaProject && (
              <div className="bg-[#0d1218]/90 border border-[#29323D] rounded-xl overflow-hidden hover:border-[#64C7D8]/50 transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Left: Authentic System Screenshot Preview */}
                  <div
                    onClick={() => handleOpenProject(dexaProject)}
                    className="lg:col-span-6 relative min-h-64 sm:min-h-80 bg-[#05070A] cursor-pointer overflow-hidden group flex items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-[#29323D]"
                  >
                    {dexaProject.image ? (
                      <div className="relative w-full h-full min-h-64 sm:min-h-76 rounded-lg overflow-hidden border border-[#29323D]/60 bg-[#080A0D]">
                        <Image
                          src={dexaProject.image}
                          alt={dexaProject.title}
                          fill
                          className="object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#080A0D]/60 via-transparent to-transparent pointer-events-none" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center text-[#94A0AD] font-mono text-xs">
                        System Interface Preview
                      </div>
                    )}

                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] font-mono text-[#E8EDF2] bg-[#0d1218]/85 px-3 py-1.5 rounded border border-[#29323D] backdrop-blur-md">
                      <span className="text-[#64C7D8]">FIG 1.0 // DEXA AI CLIENT INTERACTION</span>
                      <span className="text-[#94A0AD]">CLICK TO EXPAND SPEC</span>
                    </div>
                  </div>

                  {/* Right: Technical Editorial Breakdown */}
                  <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      {/* Metadata row */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#64C7D8] flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5" />
                          <span>01 // FEATURED SYSTEM CASE STUDY</span>
                        </span>
                        <span className="font-mono text-[11px] text-[#94A0AD] px-2 py-0.5 rounded bg-[#11161D] border border-[#29323D]">
                          {dexaProject.status}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => handleOpenProject(dexaProject)}
                        className="font-heading text-2xl sm:text-3xl font-bold text-[#E8EDF2] hover:text-white transition-colors cursor-pointer mb-3"
                      >
                        {dexaProject.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[#94A0AD] leading-relaxed mb-6 font-normal">
                        {dexaProject.shortDescription} Designed to preserve local system privacy by executing local LLM inference through Ollama rather than transmitting local file contexts to third-party APIs.
                      </p>

                      {/* Technical Specs Breakdown */}
                      <div className="space-y-3 pt-4 border-t border-[#29323D]/70 mb-6 text-xs font-mono">
                        <div>
                          <span className="text-[#94A0AD] uppercase tracking-wider text-[10px] block mb-1">
                            Architecture & Protocols:
                          </span>
                          <span className="text-[#E8EDF2]">
                            React UI • Node.js/Express Engine • Bidirectional WebSockets (Socket.IO) • Ollama LLM • MongoDB
                          </span>
                        </div>
                        <div>
                          <span className="text-[#94A0AD] uppercase tracking-wider text-[10px] block mb-1">
                            Key Engineering Focus:
                          </span>
                          <span className="text-[#CBD5E1]">
                            Command path evaluation, real-time token streaming, and isolated local process orchestration.
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-[#29323D] flex items-center justify-between gap-3">
                      <button
                        onClick={() => handleOpenProject(dexaProject)}
                        className="inline-flex items-center gap-2 text-xs font-mono text-[#64C7D8] hover:text-[#82d6e4] transition-colors group/cta cursor-pointer"
                      >
                        <span className="font-semibold uppercase tracking-wider">
                          Architecture & Implementation
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform" />
                      </button>

                      {dexaProject.githubUrl && (
                        <a
                          href={dexaProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#11161D] hover:bg-[#171D25] border border-[#29323D] hover:border-[#64C7D8]/60 text-xs font-mono text-[#94A0AD] hover:text-[#E8EDF2] transition-colors"
                          title="View Repository"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Repository</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. DISTRIBUTED CCTV SYSTEM ARCHIVE ENTRY */}
            {cctvProject && (
              <div className="bg-[#0d1218]/90 border border-[#29323D] rounded-xl p-6 sm:p-7 hover:border-[#64C7D8]/40 transition-colors">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-8 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#64C7D8] flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        <span>02 // CLOUD & DISTRIBUTED PIPELINE</span>
                      </span>
                      <span className="font-mono text-[11px] text-[#94A0AD] px-2 py-0.5 rounded bg-[#11161D] border border-[#29323D]">
                        {cctvProject.status}
                      </span>
                    </div>

                    <h3
                      onClick={() => handleOpenProject(cctvProject)}
                      className="font-heading text-xl sm:text-2xl font-bold text-[#E8EDF2] hover:text-white transition-colors cursor-pointer"
                    >
                      {cctvProject.title}
                    </h3>

                    <p className="text-sm text-[#94A0AD] leading-relaxed font-normal">
                      {cctvProject.shortDescription}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-mono text-[#CBD5E1]">
                      <span className="text-[#94A0AD] uppercase text-[10px]">Stack:</span>
                      <span>AWS S3 Object Store</span>
                      <span className="text-[#29323D]">•</span>
                      <span>Distributed Video Chunking</span>
                      <span className="text-[#29323D]">•</span>
                      <span>OpenCV Motion Heuristics</span>
                      <span className="text-[#29323D]">•</span>
                      <span>Security Dashboard</span>
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-between gap-3 lg:border-l lg:border-[#29323D] lg:pl-6">
                    <button
                      onClick={() => handleOpenProject(cctvProject)}
                      className="w-full inline-flex items-center justify-center lg:justify-end gap-2 px-4 py-2.5 rounded bg-[#171D25] hover:bg-[#11161D] border border-[#29323D] hover:border-[#64C7D8]/60 text-xs font-mono text-[#64C7D8] transition-colors cursor-pointer"
                    >
                      <span>Pipeline Overview</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {cctvProject.githubUrl ? (
                      <a
                        href={cctvProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center lg:justify-end gap-1.5 text-xs font-mono text-[#94A0AD] hover:text-[#E8EDF2] transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>GitHub Archive</span>
                      </a>
                    ) : (
                      <div className="inline-flex items-center justify-center lg:justify-end gap-2 px-3 py-1.5 rounded bg-[#11161D]/80 border border-[#29323D] text-[11px] font-mono text-[#94A0AD]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#94A0AD]/60" />
                        <span>Still building this project — currently repo is private</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================== */}
        {/* SECTION B: SECURITY RESEARCH LABS & CTF WRITEUPS ARCHIVE          */}
        {/* ================================================================== */}
        {showLabs && (
          <div className="space-y-6">
            {/* Header label for Security Labs */}
            <div className="flex items-center gap-3 pb-3 border-b border-[#29323D]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#64C7D8]" />
              <span className="font-mono text-xs text-[#E8EDF2] uppercase tracking-wider font-semibold">
                SECURITY RESEARCH LABS & CTF METHODOLOGIES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {labsData.map((lab, index) => (
                <div
                  key={lab.id}
                  className="bg-[#0d1218]/90 border border-[#29323D] rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#64C7D8]/50 transition-colors duration-200"
                >
                  <div>
                    {/* Top Status & Platform */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#64C7D8] flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>0{index + 3} // {lab.platform.toUpperCase()}</span>
                      </span>
                      <span className="font-mono text-[10px] text-[#94A0AD] px-2 py-0.5 rounded bg-[#11161D] border border-[#29323D]">
                        {lab.badge || lab.status}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => handleOpenLab(lab)}
                      className="font-heading text-xl font-bold text-[#E8EDF2] hover:text-white transition-colors cursor-pointer mb-2"
                    >
                      {lab.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#94A0AD] leading-relaxed mb-5 font-normal">
                      {lab.shortDescription}
                    </p>

                    {/* Methodological Details Summary */}
                    <div className="pt-3 border-t border-[#29323D]/60 space-y-2 mb-5 text-xs font-mono">
                      <div>
                        <span className="text-[#94A0AD] text-[10px] uppercase block mb-1">
                          Audited Vectors & Protocols:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {lab.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded bg-[#171D25] border border-[#29323D] text-[11px] text-[#E8EDF2]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#29323D] flex items-center justify-between">
                    <button
                      onClick={() => handleOpenLab(lab)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#64C7D8] hover:text-[#82d6e4] transition-colors group/cta cursor-pointer"
                    >
                      <span>Methodology & Steps</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-0.5 transition-transform" />
                    </button>

                    {lab.labUrl && (
                      <a
                        href={lab.labUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-[#94A0AD] hover:text-[#E8EDF2] transition-colors"
                        title="Official Room"
                      >
                        <span>Platform Room</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Archive Footer Note */}
        <div className="mt-12 p-4 rounded-lg bg-[#0d1218]/40 border border-[#29323D]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-[#94A0AD]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#64C7D8]" />
            <span>Documented engineering deliverables and verified security lab walkthroughs.</span>
          </div>
          <span className="text-[#64C7D8] text-[11px]">
            IIIT Surat • 2024–2028
          </span>
        </div>
      </div>

      {/* Lightweight Project & Lab Detail View Modal */}
      <ProjectModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
};
