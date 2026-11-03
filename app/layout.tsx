import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
  metadataBase: new URL("https://vaibhavmarathe.dev"),
  title: "Vaibhav Marathe — Cybersecurity & Ethical Hacking",
  description:
    "Personal portfolio of Vaibhav Marathe, a Computer Science student at IIIT Surat exploring cybersecurity, penetration testing, web security, and software development.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
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
    title: "Vaibhav Marathe — Cybersecurity & Ethical Hacking",
    description:
      "Personal portfolio of Vaibhav Marathe, a Computer Science student at IIIT Surat exploring cybersecurity, penetration testing, web security, and software development.",
    siteName: "Vaibhav Marathe Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vaibhav Marathe — Cybersecurity Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaibhav Marathe — Cybersecurity & Ethical Hacking",
    description:
      "Personal portfolio of Vaibhav Marathe, a Computer Science student at IIIT Surat exploring cybersecurity, penetration testing, web security, and software development.",
    creator: "@whoami_vaibhav",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vaibhav Marathe",
  jobTitle: "Cybersecurity Student",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "IIIT Surat",
  },
  url: "https://vaibhavmarathe.dev",
  sameAs: [
    "https://github.com/Vaibhav-48-iiit",
    "https://www.linkedin.com/in/cyber-vaibhav",
    "https://tryhackme.com/p/CyberVaibhav",
    "https://x.com/whoami_vaibhav",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-[#000000] text-[#E8EDF2] min-h-screen flex flex-col font-sans selection:bg-[#64C7D8]/20 selection:text-[#64C7D8]`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-10000 focus:px-4 focus:py-2 focus:bg-[#64C7D8] focus:text-black focus:font-mono focus:text-xs focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
