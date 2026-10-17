export interface ProfileData {
  name: string;
  role: string;
  tagline: string;
  subheading: string;
  intro: string;
  education: {
    degree: string;
    institution: string;
    period: string;
  };
  focus: string[];
  exploring: string[];
  achievement: {
    platform: string;
    title: string;
    status: string;
    description?: string;
  };
  bioParagraphs: string[];
  avatarUrl: string;
  email: string; // Configure your real email here
  resumeUrl: string; // Place your resume in /public/resume.pdf or link externally
}

export const profileData: ProfileData = {
  name: "VAIBHAV MARATHE",
  role: "Cybersecurity & Ethical Hacking",
  avatarUrl: "/avatar.jpg",
  tagline: "Understanding systems. Finding weaknesses. Building better security.",
  subheading:
    "Computer Science student exploring offensive security, web application vulnerabilities, networking, and secure software development.",
  intro: "HELLO, I'M",
  education: {
    degree: "B.Tech — Computer Science & Engineering",
    institution: "IIIT Surat",
    period: "2024–2028",
  },
  focus: ["Cybersecurity & Ethical Hacking"],
  exploring: [
    "Penetration Testing",
    "Web Security",
    "Network Security",
  ],
  achievement: {
    platform: "TryHackMe",
    title: "Pre Security Path Completed",
    status: "Verified",
    description: "Foundational mastery in networking fundamentals, web protocols, and Linux CLI.",
  },
  bioParagraphs: [
    "I am a Computer Science student at IIIT Surat who initially explored software engineering and full-stack development before shifting my focus toward cybersecurity and ethical hacking.",
    "My development background helps me understand how modern web applications are structured, how client-server communication flows, and where security weaknesses typically emerge.",
    "Today, I am actively building hands-on experience with Linux administration, networking protocols, web security vulnerabilities, CTF challenges, and industry-standard security tools.",
    "I focus on practical, method-driven learning — analyzing packet captures, auditing application endpoints, and understanding how attackers think in order to build stronger defenses."
  ],
  // Central contact configuration: replace with your actual email & resume
  email: "vaibhavashokm123@gmail.com",
  resumeUrl: "/resume.pdf", // Place your resume PDF in the public folder as resume.pdf
};
