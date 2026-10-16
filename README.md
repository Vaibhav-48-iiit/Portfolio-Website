# Vaibhav Marathe — Deep Network Cybersecurity Portfolio

A modern, production-ready personal cybersecurity portfolio website built for **Vaibhav Marathe**, Computer Science and Engineering undergraduate at **IIIT Surat (2024–2028)**.

The design embodies the **Deep Network Tunnel** concept: an architectural, restrained cyber network aesthetic built with CSS 3D perspective, dark charcoal backgrounds, thin metallic gray frames, and cool cyan accents.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 📐 Architecture & Key Features

- **80% Informational / 20% Creative**: Prioritizes clean presentation of technical skills, projects, and lab experiences for recruiters and security teams.
- **Cybersecurity Terminal Boot Sequence**:
  - **First visit (Mode A ~3.5s)**: Simulates an authentic Kali Linux terminal ethical hacking workflow (reconnaissance via `nmap`, service enumeration, simulated reverse shell session, privilege escalation verification, and `SYSTEM ACCESS GRANTED`).
  - **Subsequent reloads (Mode B ~1.0s)**: Rapid 1-second reconnect sequence using `sessionStorage`.
  - **Seamless Shared-Element Transition**: The terminal window smoothly morphs into the central `VM // CORE NODE` of the System Map Hero, revealing the interconnected topology and portfolio seamlessly.
  - **Instant Skip Control & Accessibility**: Includes a persistent `SKIP INTRO →` button and automatically respects `prefers-reduced-motion`.
- **System Map Hero Topology**: Central identity node (`VM // CORE NODE`) surrounded by 5 interconnected endpoints (`ABOUT_NODE`, `SKILL_SET`, `PROJECT_ARCHIVE`, `LAB_ENVIRONMENT`, `CONTACT_CHANNEL`) with dynamic SVG circuit lines and interactive hover routing.
  1. `01 / HOME` — Signature Deep Network hero with VM identity, elevator tagline, CTA buttons, and social channels.
  2. `02 / ABOUT` — "Beyond the Terminal" grounded biography, academic credentials at IIIT Surat, and verified TryHackMe achievement.
  3. `03 / SKILLS` — 4 clean category cards (Security & Networking, Operating Systems, Programming & Development, Cloud & Tools) with restrained hover states.
  4. `04 / PROJECTS & LABS` — Interactive filter (`All`, `Projects`, `Security Labs`), showcasing DEXA AI, Distributed CCTV Detection, TryHackMe Pre Security, and Mr. Robot CTF. Includes lightweight modal detail views.
  5. `05 / CONTACT` — "Let's Connect" direct communication hub, quick mailto link, copy-to-clipboard email utility, and distant fading network tunnel backdrop.
- **Custom VM Monogram**: Bespoke SVG identity mark with circuit junction node and technical chamfered corners.
- **Accessibility & Motion Safety**: Respects `prefers-reduced-motion` to smoothly disable perspective shifts for sensitive users.
- **Zero Heavy Runtimes**: Pure React 19 + Next.js App Router + Tailwind CSS v4 + Lucide React.

---

## 🛠️ Content Management & Customization

All portfolio data is separated into cleanly typed TypeScript files inside `/data`:

| File | Purpose |
|------|---------|
| `data/profile.ts` | Name, role, tagline, academic details, bio paragraphs, email, and resume URL |
| `data/skills.ts` | Categorized tools, technologies, and notes |
| `data/projects.ts` | Development and research projects, architecture overviews, and repository links |
| `data/labs.ts` | Security CTFs, TryHackMe rooms, PortSwigger labs, methodologies, and writeup links |
| `data/socials.ts` | GitHub, LinkedIn, X, and contact links |

### Adding a New Security Lab or CTF
Simply add an item to `data/labs.ts`:
```ts
{
  id: "portswigger-sql-injection",
  title: "PortSwigger — SQL Injection Lab",
  platform: "PortSwigger",
  category: "security-lab",
  status: "Completed",
  shortDescription: "Exploited blind SQL injection with conditional responses to extract administrative credentials.",
  tags: ["SQLi", "Web Security", "Burp Suite", "Authentication"],
  writeupUrl: "https://your-writeup-link.com",
  labUrl: "https://portswigger.net/web-security/sql-injection",
  details: {
    overview: "Walkthrough of blind SQL vulnerability in tracking cookie.",
    methodology: "Payload injection via Burp Repeater, binary search for password character positions.",
    tools: ["Burp Suite Repeater", "SQLMap", "Python Automation"],
    findings: ["Extracted administrator password hash using conditional time delays."],
    takeaways: ["Parameterized queries and ORM validation completely mitigate this flaw."]
  }
}
```

### Updating Your Resume
Place your updated resume as `resume.pdf` inside the `/public` folder. The "Download Resume" buttons across the navbar and hero section link directly to `/resume.pdf`.

---

## 🎨 Color Palette Reference

- **Primary Background**: `#080A0D`
- **Secondary Background**: `#11161D`
- **Card Background**: `#171D25`
- **Primary Text**: `#E8EDF2`
- **Secondary Text**: `#94A0AD`
- **Accent Cyan**: `#64C7D8`
- **Subtle Border**: `#29323D`
- **Alert Red**: `#E25459`
# Portfolio-Website
