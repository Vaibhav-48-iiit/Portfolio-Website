import Link from "next/link";
import { Terminal, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#080A0D]">
      <div className="max-w-md w-full bg-[#0d1218] border border-[#29323D] rounded-xl p-8 text-center font-mono">
        <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-[#171D25] border border-[#29323D] flex items-center justify-center text-[#64C7D8]">
          <Terminal className="w-6 h-6" />
        </div>
        <div className="text-xs uppercase tracking-widest text-[#64C7D8] mb-1">
          STATUS 404 // NOT FOUND
        </div>
        <h1 className="font-heading text-2xl font-bold text-[#E8EDF2] mb-3">
          Endpoint Does Not Exist
        </h1>
        <p className="text-xs text-[#94A0AD] mb-6 leading-relaxed">
          The requested system route could not be resolved in the network topology.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#64C7D8] text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#82d6e4] transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return To System Map</span>
        </Link>
      </div>
    </div>
  );
}
