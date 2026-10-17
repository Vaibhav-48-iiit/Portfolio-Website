"use client";

import React, { useState, useCallback } from "react";
import { IntroController } from "@/components/intro/IntroController";
import { HomeSection } from "@/sections/Home";
import { AboutSection } from "@/sections/About";
import { SkillsSection } from "@/sections/Skills";
import { ProjectsSection } from "@/sections/Projects";
import { ContactSection } from "@/sections/Contact";

export default function HomePage() {
  // Synchronous state: portfolio is hidden initially until intro transitions or is skipped
  const [isPortfolioRevealed, setIsPortfolioRevealed] = useState<boolean>(false);
  const [awakeningStage, setAwakeningStage] = useState<"dormant" | "awakening" | "awakened">("dormant");
  const [isTerminalDocked, setIsTerminalDocked] = useState<boolean>(false);

  const handleRevealPortfolio = useCallback(() => {
    setIsPortfolioRevealed(true);
  }, []);

  const handleAwaken = useCallback(() => {
    setAwakeningStage("awakening");
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("vm:network-awaken"));
    }
    setTimeout(() => {
      setAwakeningStage("awakened");
    }, 1200);
  }, []);

  const handleDockComplete = useCallback(() => {
    setIsTerminalDocked(true);
  }, []);

  return (
    <>
      {/* Authentic Pure Black and Green Kali Linux Terminal Intro */}
      <IntroController
        onRevealPortfolio={handleRevealPortfolio}
        onAwaken={handleAwaken}
        onDockComplete={handleDockComplete}
      />

      {/* Main Portfolio Sections - Visually hidden until intro reveals it */}
      <div
        className={`transition-opacity duration-700 ${
          isPortfolioRevealed ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* 01. Signature System Map Hero with VM Core Node & Docked Mini-Terminal */}
        <HomeSection
          awakeningStage={awakeningStage}
          isTerminalDocked={isTerminalDocked}
        />

        {/* 02. About Section: Beyond the Terminal */}
        <AboutSection />

        {/* 03. Skills Section: Tools & Technologies */}
        <SkillsSection />

        {/* 04. Projects & Labs Section: Work & CTF Research */}
        <ProjectsSection />

        {/* 05. Contact Section: Let's Connect */}
        <ContactSection />
      </div>
    </>
  );
}
