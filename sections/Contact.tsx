"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { TunnelBackground } from "@/components/TunnelBackground";
import { profileData } from "@/data/profile";
import { socialsData } from "@/data/socials";
import { triggerResumeNotice } from "@/components/ResumeNoticeModal";
import { GithubIcon, LinkedinIcon, TwitterIcon, MailIcon, TryHackMeIcon } from "@/components/SocialIcons";
import { ArrowRight, Copy, Check, FileText } from "lucide-react";

const socialIcons = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  Twitter: TwitterIcon,
  Mail: MailIcon,
  TryHackMe: TryHackMeIcon,
};

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative min-h-[75vh] flex items-center justify-center py-24 sm:py-32 bg-[#080A0D] border-t border-[#29323D]/60 overflow-hidden"
      aria-label="Contact Vaibhav Marathe"
    >
      {/* Distant Network Tunnel Motif fading into darkness */}
      <TunnelBackground variant="contact" className="opacity-40" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <SectionHeading
          number="04"
          category="CONTACT"
          title="Direct Inquiries"
          subtitle="Interested in security discussions, CTFs, or collaborative software engineering? Reach out directly."
          align="center"
        />

        {/* Central Contact Card */}
        <div className="max-w-2xl mx-auto bg-[#0d1218]/90 border border-[#29323D] rounded-xl p-8 sm:p-10 backdrop-blur-md shadow-2xl relative">
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#E8EDF2] mb-3">
            Let&apos;s Discuss Security &amp; Systems
          </h3>

          <p className="text-sm text-[#94A0AD] max-w-md mx-auto mb-8 leading-relaxed font-normal">
            Whether you want to discuss vulnerability research, networking protocols, or explore collaborative engineering, my inbox is open.
          </p>

          {/* Primary Actions: Mailto, Copy Email, and Resume Notice */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <a
              href={`mailto:${profileData.email}?subject=Inquiry%20from%20Portfolio`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#64C7D8] text-black font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#82d6e4] transition-all duration-200 shadow-md shadow-[#64C7D8]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white group cursor-pointer"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#11161D] text-[#E8EDF2] border border-[#29323D] hover:border-[#64C7D8]/60 hover:bg-[#171D25] font-mono text-xs uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64C7D8] cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#64C7D8]" />
                  <span className="text-[#64C7D8]">Email Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#94A0AD]" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <button
              onClick={triggerResumeNotice}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#11161D] text-[#E8EDF2] border border-[#29323D] hover:border-[#64C7D8]/60 hover:bg-[#171D25] font-mono text-xs uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64C7D8] cursor-pointer"
              title="Resume status"
            >
              <FileText className="w-3.5 h-3.5 text-[#64C7D8]" />
              <span>Resume Notice</span>
            </button>
          </div>

          {/* Email Address Plain Display */}
          <div className="font-mono text-xs text-[#94A0AD] mb-8 pb-6 border-b border-[#29323D]/70">
            <span>Direct Email: </span>
            <a
              href={`mailto:${profileData.email}`}
              className="text-[#64C7D8] hover:underline"
            >
              {profileData.email}
            </a>
          </div>

          {/* Direct Channels Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {socialsData
              .filter((s) => s.id !== "email")
              .map((social) => {
                const Icon = socialIcons[social.iconName] || MailIcon;
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[#11161D] border border-[#29323D] hover:border-[#64C7D8]/50 hover:bg-[#171D25] text-xs font-mono text-[#94A0AD] hover:text-[#64C7D8] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#64C7D8]"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{social.name}</span>
                  </a>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};
