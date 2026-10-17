"use client";

import React from "react";
import { VMMonogram } from "./VMMonogram";
import { socialsData } from "@/data/socials";
import { GithubIcon, LinkedinIcon, TwitterIcon, MailIcon, TryHackMeIcon } from "./SocialIcons";
import { ArrowUp } from "lucide-react";

const socialIcons = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Twitter: TwitterIcon,
  Mail: MailIcon,
  TryHackMe: TryHackMeIcon,
};

export const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = React.useState(2026);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#29323D] bg-[#080A0D] text-[#94A0AD] relative z-10 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <VMMonogram size={32} />
            <div>
              <div className="font-heading text-sm font-semibold text-[#E8EDF2] tracking-wider">
                VM / VAIBHAV MARATHE
              </div>
              <p className="text-xs text-[#94A0AD] mt-0.5 font-normal">
                Built with curiosity. Secured by learning.
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialsData.map((social) => {
              const Icon = socialIcons[social.iconName] || MailIcon;
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#11161D] border border-[#29323D] text-[#94A0AD] hover:text-[#64C7D8] hover:border-[#64C7D8]/40 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#64C7D8]"
                  aria-label={social.name}
                  title={social.name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#11161D] border border-[#29323D] text-[#94A0AD] hover:text-[#E8EDF2] hover:border-[#64C7D8]/40 transition-colors ml-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#64C7D8]"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom subtle copyright notice */}
        <div className="mt-8 pt-6 border-t border-[#29323D]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#94A0AD]/70">
          <div>
            © {currentYear} Vaibhav Marathe. All technical rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#64C7D8] animate-pulse" />
              IIIT Surat • CSE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
