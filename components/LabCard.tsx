import React from "react";
import { LabItem } from "@/data/labs";
import { ShieldCheck, Terminal, ExternalLink, ArrowRight, FileText } from "lucide-react";

interface LabCardProps {
  lab: LabItem;
  onOpenDetails: (lab: LabItem) => void;
}

export const LabCard: React.FC<LabCardProps> = ({ lab, onOpenDetails }) => {
  return (
    <div className="group relative bg-[#171D25] border border-[#29323D] rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-[#64C7D8]/60 hover:shadow-[0_10px_28px_rgba(0,0,0,0.45)] flex flex-col justify-between">
      <div className="p-6">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono uppercase tracking-wider bg-[#11161D] border border-[#29323D] text-[#64C7D8]">
              <ShieldCheck className="w-3.5 h-3.5" />
              {lab.platform}
            </span>
            {lab.badge && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#11161D] text-[#94A0AD] border border-[#29323D]">
                {lab.badge}
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#64C7D8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#64C7D8]" />
            {lab.status}
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onOpenDetails(lab)}
          className="font-heading text-xl font-bold text-[#E8EDF2] group-hover:text-white transition-colors cursor-pointer mb-3"
        >
          {lab.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#94A0AD] mb-5 leading-relaxed font-normal">
          {lab.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {lab.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded bg-[#11161D] border border-[#29323D] text-xs font-mono text-[#E8EDF2]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-6 py-4 border-t border-[#29323D] bg-[#11161D]/50 flex items-center justify-between">
        <button
          onClick={() => onOpenDetails(lab)}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#64C7D8] hover:text-[#82d6e4] transition-colors group/btn"
        >
          <span>Methodology & Steps</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>

        <div className="flex items-center gap-2">
          {lab.writeupUrl && (
            <a
              href={lab.writeupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono text-[#94A0AD] hover:text-[#E8EDF2] hover:bg-[#171D25] border border-transparent hover:border-[#29323D] transition-colors"
              title="Read Lab Writeup"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Writeup</span>
            </a>
          )}
          {lab.labUrl && (
            <a
              href={lab.labUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded text-[#94A0AD] hover:text-[#64C7D8] hover:bg-[#171D25] border border-transparent hover:border-[#29323D] transition-colors"
              title="Official Lab Room"
              aria-label={`Open ${lab.title} on ${lab.platform}`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
