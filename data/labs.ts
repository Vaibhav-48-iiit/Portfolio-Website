export interface LabItem {
  id: string;
  title: string;
  platform: "TryHackMe" | "PortSwigger" | "HackTheBox" | "Self-Hosted Lab";
  category: "security-lab";
  status: "Completed" | "In Progress";
  shortDescription: string;
  tags: string[];
  writeupUrl?: string;
  labUrl?: string;
  badge?: string;
  details: {
    overview: string;
    methodology: string;
    tools: string[];
    findings: string[];
    takeaways: string[];
  };
}

export const labsData: LabItem[] = [
  {
    id: "thm-pre-security",
    title: "TryHackMe — Pre Security",
    platform: "TryHackMe",
    category: "security-lab",
    status: "Completed",
    shortDescription:
      "Built foundational knowledge in networking, web technologies, operating systems, and cybersecurity.",
    tags: ["Networking", "HTTP / TCP", "Linux CLI", "Windows Security", "Security Basics"],
    writeupUrl: "", // Add your writeup link or leave empty
    labUrl: "https://tryhackme.com/path/outline/presecurity",
    badge: "Learning Path",
    details: {
      overview:
        "Comprehensive hands-on training path covering network fundamentals, the OSI model, packets and frames, web protocols (HTTP, HTTPS, requests, headers), and operating system internals across Linux and Windows.",
      methodology:
        "Completed structured interactive network simulation rooms, packet walkthrough exercises, shell scripting challenges, and basic vulnerability scenario analysis.",
      tools: ["Linux Terminal", "Command Prompt", "Wireshark Basics", "Ping / Traceroute / Nmap"],
      findings: [
        "Internalized the mechanics of the three-way TCP handshake and session teardown.",
        "Observed DNS resolution sequences and authoritative name server queries.",
        "Analyzed HTTP status codes, headers, cookie-based session management, and common client-server attack vectors.",
      ],
      takeaways: [
        "Solidified the prerequisite mental models needed to identify protocol anomalies and configuration flaws in higher-level penetration testing.",
      ],
    },
  },
  {
    id: "thm-mr-robot-ctf",
    title: "TryHackMe — Mr. Robot CTF",
    platform: "TryHackMe",
    category: "security-lab",
    status: "Completed",
    shortDescription:
      "Practiced enumeration, web discovery, Linux investigation, and privilege escalation techniques in an authorized lab environment.",
    tags: ["Enumeration", "Web Discovery", "Linux PrivEsc", "WordPress", "CTF"],
    writeupUrl: "", // Add your writeup URL or GitHub link here
    labUrl: "https://tryhackme.com/r/room/mrrobot",
    badge: "CTF Challenge",
    details: {
      overview:
        "A boot2root challenge based on the Mr. Robot series, testing reconnaissance, content discovery, password brute-forcing against web endpoints, and local Linux privilege escalation to retrieve 3 flags.",
      methodology:
        "Methodical penetration testing methodology: initial port scanning with Nmap, web enumeration using Gobuster/Nikto, credential testing, obtaining initial foothold shell, and discovering SUID binaries for root elevation.",
      tools: ["Nmap", "Gobuster", "Burp Suite", "Hydra / WPScan", "Linux Shell", "LinPEAS"],
      findings: [
        "Identified open ports 80 and 443; performed directory enumeration revealing hidden key files and wordlists.",
        "Exploited WordPress authentication vulnerability using customized dictionary lists derived during enumeration.",
        "Obtained low-privileged reverse shell and upgraded to fully interactive TTY shell.",
        "Audited SUID permission bits on local binaries (nmap interactive execution) to successfully escalate to root.",
      ],
      takeaways: [
        "Reinforced the critical importance of exhaustive reconnaissance before attempting exploitation.",
        "Demonstrated how minor administrative oversights (SUID bits, default file permissions) lead directly to complete system compromise.",
      ],
    },
  },
];
