"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Retain error locally without logging secrets
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#080A0D]">
      <div className="max-w-md w-full bg-[#0d1218] border border-[#29323D] rounded-xl p-8 text-center font-mono">
        <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-[#171D25] border border-[#e25459]/40 flex items-center justify-center text-[#e25459]">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="text-xs uppercase tracking-widest text-[#e25459] mb-1">
          STATUS 500 // SYSTEM EXCEPTION
        </div>
        <h1 className="font-heading text-2xl font-bold text-[#E8EDF2] mb-3">
          Execution Interrupted
        </h1>
        <p className="text-xs text-[#94A0AD] mb-6 leading-relaxed">
          An unexpected error occurred during page rendering. No state was leaked.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#64C7D8] text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#82d6e4] transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#171D25] border border-[#29323D] text-[#E8EDF2] text-xs font-semibold uppercase tracking-wider hover:bg-[#11161D] transition-all"
          >
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
