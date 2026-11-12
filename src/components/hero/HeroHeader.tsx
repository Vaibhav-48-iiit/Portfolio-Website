"use client";

import Link from "next/link";

interface HeroHeaderProps {
  navRef?: React.RefObject<HTMLElement | null>;
}

export default function HeroHeader({ navRef }: HeroHeaderProps) {
  const navItems = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Writeups", href: "#writeups" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      ref={navRef}
      className="w-full flex flex-row items-center justify-between px-6 sm:px-10 md:px-16 pt-8 pb-4 relative z-20"
    >
      {/* Brand Identity */}
      <Link
        href="/"
        className="group flex flex-row items-center gap-3 text-left focus:outline-none"
        aria-label="Vaibhav Portfolio Home"
      >
        <div className="w-8 h-8 rounded-xs border border-white/10 bg-white/[0.03] flex items-center justify-center transition-colors duration-300 group-hover:border-emerald-500/50 group-hover:bg-emerald-950/20">
          <span className="font-mono text-xs font-bold text-zinc-200 tracking-wider group-hover:text-emerald-300 transition-colors">
            V
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <span className="text-xs font-mono tracking-widest text-zinc-100 uppercase font-semibold">
              VAIBHAV
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
            Cybersecurity
          </span>
        </div>
      </Link>

      {/* Minimal Horizontal Navigation */}
      <nav aria-label="Main Navigation">
        <ul className="flex flex-row items-center gap-6 sm:gap-9 md:gap-11 list-none m-0 p-0">
          {navItems.map((item) => (
            <li key={item.label} className="inline-block">
              <a
                href={item.href}
                className="group relative py-1 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-100 transition-colors duration-200 inline-block"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-emerald-400 transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
