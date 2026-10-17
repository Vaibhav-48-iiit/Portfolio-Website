export interface CapabilityItem {
  id: string;
  code: string;
  domain: string;
  focus: string;
  toolsUsed: string[];
  learning: string[];
  practicalExperience: string;
  evidenceLabel?: string;
  evidenceTargetId?: string;
}

export const technicalCapabilityIndex: CapabilityItem[] = [
  {
    id: "security-networking",
    code: "01 // SEC-NET",
    domain: "Security & Networking",
    focus: "Packet inspection, protocol mechanics, and vulnerability enumeration.",
    toolsUsed: ["Nmap", "Wireshark", "Burp Suite", "TCP/IP & OSI Model", "HTTP/S & DNS Analysis"],
    learning: ["OWASP Top 10 Exploitation", "PortSwigger Web Security Labs"],
    practicalExperience:
      "Analyzed packet captures, TCP 3-way handshakes, and DNS requests in TryHackMe Pre Security; executed service enumeration and authorized web scanning in Mr. Robot CTF.",
    evidenceLabel: "TryHackMe Pre Security & Mr. Robot CTF",
    evidenceTargetId: "projects",
  },
  {
    id: "operating-systems",
    code: "02 // OPS-ENV",
    domain: "Operating Systems & Lab Environments",
    focus: "Linux systems administration, terminal workflow automation, and VM sandbox management.",
    toolsUsed: ["Kali Linux", "Linux CLI", "Bash Scripting", "VirtualBox / VMware", "Windows Internals"],
    learning: ["Linux Privilege Escalation Vectors", "SUID / Capability Auditing"],
    practicalExperience:
      "Daily offensive security workflows inside Kali Linux virtual machines; investigated Linux process hierarchies, directory permissions, and SUID binaries during CTF lab exercises.",
    evidenceLabel: "Hands-on CTFs & Virtual Machines",
    evidenceTargetId: "projects",
  },
  {
    id: "programming-dev",
    code: "03 // DEV-SYS",
    domain: "Programming & Systems Development",
    focus: "Full-stack software engineering, real-time protocols, and secure application architecture.",
    toolsUsed: ["Python", "C++", "JavaScript", "React", "Node.js", "Express", "MongoDB", "Socket.IO"],
    learning: ["Secure Code Auditing", "API Defense & Input Sanitation", "FastAPI"],
    practicalExperience:
      "Designed and implemented DEXA AI (a private desktop assistant with local Ollama LLM integration, bidirectional WebSockets, and process command mediation).",
    evidenceLabel: "DEXA AI System Implementation",
    evidenceTargetId: "projects",
  },
  {
    id: "cloud-infrastructure",
    code: "04 // CLD-INF",
    domain: "Cloud & Infrastructure",
    focus: "Cloud object storage, container fundamentals, and version control hygiene.",
    toolsUsed: ["Git & GitHub", "AWS Fundamentals (S3, IAM Basics)", "Docker Fundamentals"],
    learning: ["Cloud Security Posture", "Container Isolation & Sandboxing"],
    practicalExperience:
      "Explored decoupled cloud storage and compute pipelines for video chunk processing in an academic distributed surveillance architecture project.",
    evidenceLabel: "Distributed CCTV Cloud Architecture",
    evidenceTargetId: "projects",
  },
];
