"use client";

import React, { useEffect } from "react";
import { ProjectItem } from "@/data/projects";
import { LabItem } from "@/data/labs";
import { X, ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import Image from "next/image";

type ItemType = (ProjectItem | LabItem) & {
  type: "project" | "lab";
};

interface ProjectModalProps {
  item: ItemType | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const isProject = item.type === "project";
  const project = isProject ? (item as ProjectItem) : null;
  const lab = !isProject ? (item as LabItem) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#11161D] border border-[#29323D] rounded-xl shadow-2xl flex flex-col overflow-hidden text-[#E8EDF2]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#29323D] bg-[#171D25]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-[#11161D] border border-[#29323D] text-[#64C7D8]">
              {isProject ? "Project Details" : "Lab Methodology"}
            </span>
            <span className="text-xs font-mono text-[#94A0AD]">
              {item.status}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#94A0AD] hover:text-white hover:bg-[#29323D]/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#64C7D8] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Title & Short Description */}
          <div>
            <h3
              id="modal-title"
              className="text-2xl font-bold font-heading text-[#E8EDF2] tracking-tight"
            >
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-[#94A0AD] leading-relaxed">
              {item.shortDescription}
            </p>
          </div>

          {/* Project Screenshot if available */}
          {project?.image && (
            <div className="relative w-full h-56 sm:h-64 rounded-lg overflow-hidden border border-[#29323D] bg-[#080A0D]">
              <Image
                src={project.image}
                alt={item.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
          )}

          {/* Overview */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#64C7D8] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#64C7D8]" />
              Overview
            </h4>
            <p className="text-sm text-[#E8EDF2]/90 leading-relaxed font-normal bg-[#171D25]/50 p-3.5 rounded-lg border border-[#29323D]/60">
              {isProject ? project?.details.overview : lab?.details.overview}
            </p>
          </div>

          {/* Architecture / Methodology */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#64C7D8] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#64C7D8]" />
              {isProject ? "Architecture & System Flow" : "Methodology & Reconnaissance"}
            </h4>
            <p className="text-sm text-[#94A0AD] leading-relaxed font-normal">
              {isProject ? project?.details.architecture : lab?.details.methodology}
            </p>
          </div>

          {/* Tools & Tech Stack */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#94A0AD]">
              Tools & Technologies Used
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(isProject ? project?.details.tools : lab?.details.tools)?.map(
                (tool, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-[#171D25] border border-[#29323D] text-xs font-mono text-[#E8EDF2]"
                  >
                    {tool}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Implementation Highlights or Findings */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#E8EDF2] flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#64C7D8]" />
              {isProject ? "Key Implementation Details" : "Security Findings & Exploitation Steps"}
            </h4>
            <ul className="space-y-2">
              {(isProject
                ? project?.details.implementation
                : lab?.details.findings
              )?.map((point, idx) => (
                <li
                  key={idx}
                  className="text-xs sm:text-sm text-[#94A0AD] flex items-start gap-2.5"
                >
                  <span className="text-[#64C7D8] font-mono mt-0.5 select-none">›</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges / Takeaways */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#E8EDF2] flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-[#64C7D8]" />
              {isProject ? "Key Engineering Challenges" : "Defensive Lessons & Takeaways"}
            </h4>
            <ul className="space-y-2">
              {(isProject ? project?.details.challenges : lab?.details.takeaways)?.map(
                (ch, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-[#94A0AD] flex items-start gap-2.5"
                  >
                    <span className="text-[#64C7D8] font-mono mt-0.5 select-none">›</span>
                    <span>{ch}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#29323D] bg-[#171D25]">
          <div className="text-xs font-mono text-[#94A0AD]">
            Click outside or press <kbd className="px-1.5 py-0.5 rounded bg-[#11161D] border border-[#29323D] text-[10px]">Esc</kbd> to close
          </div>

          <div className="flex items-center gap-2.5">
            {project?.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#11161D] hover:bg-[#080A0D] border border-[#29323D] hover:border-[#64C7D8]/60 text-xs font-mono text-[#E8EDF2] transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Repository</span>
              </a>
            )}

            {project?.repoNote && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#11161D] border border-[#29323D] text-xs font-mono text-[#94A0AD]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#94A0AD]/60" />
                <span>{project.repoNote}</span>
              </div>
            )}

            {lab?.labUrl && (
              <a
                href={lab.labUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#11161D] hover:bg-[#080A0D] border border-[#29323D] hover:border-[#64C7D8]/60 text-xs font-mono text-[#E8EDF2] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#64C7D8]" />
                <span>Visit Lab</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
