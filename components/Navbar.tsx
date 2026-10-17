"use client";

import React, { useState, useEffect } from "react";
import { VMMonogram } from "./VMMonogram";
import { profileData } from "@/data/profile";
import { Download, Menu, X, ArrowUpRight } from "lucide-react";
import { triggerResumeNotice } from "./ResumeNoticeModal";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Consistently initialize to false on both server and client to guarantee zero hydration mismatch
  const [isAwakened, setIsAwakened] = useState<boolean>(false);

  useEffect(() => {
    const handleAwaken = () => {
      setIsAwakened(true);
    };
    window.addEventListener("vm:network-awaken", handleAwaken);

    // Safety fallback so navbar is never indefinitely hidden if no intro event triggers
    const safetyTimer = setTimeout(() => {
      setIsAwakened(true);
    }, 4500);

    return () => {
      window.removeEventListener("vm:network-awaken", handleAwaken);
      clearTimeout(safetyTimer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection based on scroll position
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        !isAwakened
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100 pointer-events-auto"
      } ${
        scrolled
          ? "bg-[#080A0D]/90 backdrop-blur-md border-b border-[#29323D] shadow-lg shadow-black/40 py-3"
          : "bg-[#080A0D]/75 backdrop-blur-sm border-b border-[#29323D]/50 py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Monogram */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64C7D8] rounded-md p-1"
            aria-label="Vaibhav Marathe Home"
          >
            <VMMonogram size={34} />
            <div className="flex flex-col">
              <span className="font-heading text-sm font-semibold tracking-wider text-[#E8EDF2] group-hover:text-white transition-colors">
                VAIBHAV MARATHE
              </span>
              <span className="font-mono text-[10px] tracking-widest text-[#94A0AD]">
                NETWORK // SEC
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 bg-[#11161D]/80 border border-[#29323D] rounded-full px-3 py-1.5 shadow-inner"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-1.5 text-xs font-mono tracking-wider transition-colors duration-200 rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#64C7D8] ${
                    isActive
                      ? "text-[#64C7D8] font-medium bg-[#171D25] border border-[#64C7D8]/30 shadow-sm"
                      : "text-[#94A0AD] hover:text-[#E8EDF2] hover:bg-[#171D25]/40"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#64C7D8]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Resume Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={triggerResumeNotice}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#E8EDF2] bg-[#171D25] hover:bg-[#11161D] border border-[#29323D] hover:border-[#64C7D8]/50 rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64C7D8] group cursor-pointer"
              title="Resume status"
            >
              <Download className="w-3.5 h-3.5 text-[#64C7D8] group-hover:-translate-y-0.5 transition-transform duration-200" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={triggerResumeNotice}
              className="p-2 text-[#64C7D8] bg-[#171D25] border border-[#29323D] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64C7D8] cursor-pointer"
              aria-label="Resume status"
              title="Resume status"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#E8EDF2] bg-[#171D25] border border-[#29323D] rounded-md hover:border-[#64C7D8]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#64C7D8]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#64C7D8]" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-[#29323D] bg-[#080A0D]/95 rounded-b-xl animate-fadeIn">
            <nav className="flex flex-col space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-mono tracking-wide transition-colors ${
                      isActive
                        ? "text-[#64C7D8] bg-[#171D25] border border-[#64C7D8]/30 font-medium"
                        : "text-[#94A0AD] hover:text-[#E8EDF2] hover:bg-[#11161D]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-[#64C7D8]/60">→</span>
                  </a>
                );
              })}
              <div className="pt-2 px-2">
                <button
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    triggerResumeNotice(e);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-black bg-[#64C7D8] hover:bg-[#82d6e4] font-medium rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Resume</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
