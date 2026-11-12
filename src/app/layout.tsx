import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VAIBHAV | Cybersecurity & Systems Security",
  description:
    "Cybersecurity student exploring ethical hacking, penetration testing and the security of digital systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
      <body className="min-h-full flex flex-col bg-[#060709] text-[#e2e8f0] overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
