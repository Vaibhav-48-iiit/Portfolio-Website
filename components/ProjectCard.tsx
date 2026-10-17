import React from "react";
import { ProjectItem } from "@/data/projects";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import Image from "next/image";

interface ProjectCardProps {
  project: ProjectItem;
  onOpenDetails: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenDetails,
}) => {
  return (
    <div className="group relative bg-[#171D25] border border-[#29323D] rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-[#64C7D8]/60 hover:shadow-[0_10px_28px_rgba(0,0,0,0.45)] flex flex-col justify-between">
      <div>
        {/* Project Image Preview */}
        {project.image && (
          <div
            onClick={() => onOpenDetails(project)}
            className="relative w-full h-48 sm:h-52 overflow-hidden bg-[#080A0D] cursor-pointer border-b border-[#29323D]/70"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 550px"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-[#171D25] via-transparent to-transparent opacity-80" />

            {/* Status Badge */}
            <div className="absolute top-3 left-3">
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded text-[11px] font-mono uppercase tracking-wider backdrop-blur-md border ${
                  project.status === "Completed"
                    ? "bg-[#080A0D]/85 border-[#64C7D8]/40 text-[#64C7D8]"
                    : "bg-[#080A0D]/85 border-[#29323D] text-[#94A0AD]"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                    project.status === "Completed" ? "bg-[#64C7D8]" : "bg-[#94A0AD]"
                  }`}
                />
                {project.status}
              </span>
            </div>
          </div>
        )}

        {/* Card Body */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3
              onClick={() => onOpenDetails(project)}
              className="font-heading text-xl font-bold text-[#E8EDF2] group-hover:text-white transition-colors cursor-pointer"
            >
              {project.title}
            </h3>
          </div>

          <p className="text-sm text-[#94A0AD] mb-5 leading-relaxed font-normal">
            {project.shortDescription}
          </p>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded bg-[#11161D] border border-[#29323D] text-xs font-mono text-[#E8EDF2]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-6 py-4 border-t border-[#29323D] bg-[#11161D]/50 flex items-center justify-between">
        <button
          onClick={() => onOpenDetails(project)}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#64C7D8] hover:text-[#82d6e4] transition-colors group/btn"
        >
          <span>Architecture & Flow</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>

        <div className="flex items-center gap-2">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded text-[#94A0AD] hover:text-[#E8EDF2] hover:bg-[#171D25] border border-transparent hover:border-[#29323D] transition-colors"
              title="View GitHub Repository"
              aria-label={`View ${project.title} on GitHub`}
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          ) : project.repoNote ? (
            <span className="text-[10px] font-mono text-[#94A0AD] italic">
              {project.repoNote}
            </span>
          ) : null}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded text-[#94A0AD] hover:text-[#64C7D8] hover:bg-[#171D25] border border-transparent hover:border-[#29323D] transition-colors"
              title="Live Demo"
              aria-label={`View ${project.title} Live Demo`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
