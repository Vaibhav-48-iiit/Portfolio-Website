import React from "react";

interface SectionHeadingProps {
  number: string;
  category: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  category,
  title,
  subtitle,
  align = "left",
}) => {
  return (
    <div
      className={`mb-12 md:mb-16 ${
        align === "center" ? "text-center mx-auto" : "text-left"
      }`}
    >
      {/* Monospace section indicator */}
      <div className="inline-flex items-center gap-2 mb-3">
        <span className="w-2 h-0.5 bg-[#64C7D8]" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#64C7D8]">
          {number} / {category}
        </span>
      </div>

      {/* Main heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#E8EDF2] font-heading">
        {title}
      </h2>

      {/* Subtitle / tag */}
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-[#94A0AD] max-w-2xl font-normal leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Subtle technical line separator */}
      <div
        className={`mt-4 h-px bg-linear-to-r from-[#29323D] via-[#64C7D8]/20 to-transparent max-w-sm ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
};
