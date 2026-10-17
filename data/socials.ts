export interface SocialLink {
  id: string;
  name: string;
  url: string;
  label: string;
  iconName: "Github" | "Linkedin" | "Twitter" | "Mail" | "TryHackMe";
  isConfigured: boolean; // Set to false if placeholder
}

export const socialsData: SocialLink[] = [
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/Vaibhav-48-iiit",
    label: "github.com/Vaibhav-48-iiit",
    iconName: "Github",
    isConfigured: true,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/cyber-vaibhav",
    label: "linkedin.com/in/cyber-vaibhav",
    iconName: "Linkedin",
    isConfigured: true,
  },
  {
    id: "tryhackme",
    name: "TryHackMe",
    url: "https://tryhackme.com/p/CyberVaibhav",
    label: "tryhackme.com/p/CyberVaibhav",
    iconName: "TryHackMe",
    isConfigured: true,
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    url: "https://x.com/whoami_vaibhav",
    label: "x.com/whoami_vaibhav",
    iconName: "Twitter",
    isConfigured: true,
  },
  {
    id: "email",
    name: "Email",
    url: "mailto:vaibhavashokm123@gmail.com",
    label: "vaibhavashokm123@gmail.com",
    iconName: "Mail",
    isConfigured: true,
  },
];
