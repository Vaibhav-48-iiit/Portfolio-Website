import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ResumeNoticeModal } from "@/components/ResumeNoticeModal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#080A0D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Vaibhav Marathe | Cybersecurity & Ethical Hacking",
  description:
    "Personal portfolio of Vaibhav Marathe, a Computer Science student at IIIT Surat exploring cybersecurity, penetration testing, web security, and software development.",
  keywords: [
    "Vaibhav Marathe",
    "Cybersecurity",
    "Ethical Hacking",
    "IIIT Surat",
    "Penetration Testing",
    "Network Security",
    "Web Security",
    "DEXA AI",
    "TryHackMe",
    "PortSwigger",
  ],
  authors: [{ name: "Vaibhav Marathe" }],
  creator: "Vaibhav Marathe",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vaibhavmarathe.dev",
    title: "Vaibhav Marathe | Cybersecurity & Ethical Hacking",
    description:
      "Personal portfolio of Vaibhav Marathe, a Computer Science student at IIIT Surat exploring cybersecurity, penetration testing, web security, and software development.",
    siteName: "Vaibhav Marathe Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaibhav Marathe | Cybersecurity & Ethical Hacking",
    description:
      "Personal portfolio of Vaibhav Marathe, a Computer Science student at IIIT Surat exploring cybersecurity, penetration testing, web security, and software development.",
    creator: "@vaibhavmarathe",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-[#000000] text-[#E8EDF2] min-h-screen flex flex-col font-sans selection:bg-[#64C7D8]/20 selection:text-[#64C7D8]`}
      >
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
        <ResumeNoticeModal />
      </body>
    </html>
  );
}
