export type TerminalLineType =
  | "kali-prompt"     // ┌──(vm㉿kali)-[~/security-lab] \n └─$ command
  | "command"         // bright green command text #00FF66
  | "output-green"    // green terminal output #00FF66 or #4ADE80
  | "output-dim"      // secondary muted output #B8C5CC
  | "success"         // [+] Success messages #00FF66
  | "info"            // [*] System info #38BDF8
  | "highlight"       // [+] SYSTEM ACCESS GRANTED
  | "identity";       // > IDENTITY: VAIBHAV MARATHE

export interface TerminalEntry {
  id: string;
  type: TerminalLineType;
  promptPath?: string;
  commandText?: string;
  text?: string;
  subText?: string;
  revealAt: number; // in milliseconds from sequence start
}

// ---------------------------------------------------------------------------
// Separate Timing Configuration Architecture
// Mode A: First Visit (4.0 seconds total)
// Mode B: Reload in same tab (1.0 second total)
// ---------------------------------------------------------------------------
export interface IntroTimingConfig {
  mode: "first-visit" | "reload";
  label: "FIRST_VISIT" | "RELOAD";
  badgeText: string;
  totalDurationMs: number;     // Target total sequence & transition duration
  transitionStartMs: number;   // Timestamp when terminal starts morphing into VM Core
  morphDurationMs: number;     // CSS transition duration for terminal morph
  fadeOverlayDelayMs: number;  // Delay before backdrop begins fading
  finishDelayMs: number;       // Delay after transitionStart before finishIntro is triggered
  sequence: TerminalEntry[];   // Progressive terminal output entries
}

// ---------------------------------------------------------------------------
// MODE A: EXACT 4-SECOND TIMELINE (First Visit in tab / new browser session)
// 0.00 - 0.35s: Terminal appears & first command starts
// 0.35 - 1.15s: Reconnaissance & port enumeration
// 1.15 - 1.85s: Service enumeration & simulated reverse session
// 1.85 - 2.45s: Privilege escalation verification
// 2.45 - 2.95s: System access granted & VM Core revealed
// 2.95 - 4.00s: Terminal morphs into VM Core & homepage reveals
// ---------------------------------------------------------------------------
export const FULL_TERMINAL_SEQUENCE: TerminalEntry[] = [
  // 0.05s: First Kali prompt & nmap command
  {
    id: "recon-cmd",
    type: "kali-prompt",
    promptPath: "~/security-lab",
    commandText: "nmap -sV 192.0.2.10",
    revealAt: 50,
  },
  // 0.35s: Nmap scan starts
  {
    id: "nmap-start",
    type: "output-green",
    text: "Starting Nmap... Host is up (0.0012s latency).",
    revealAt: 350,
  },
  // 0.55s: Ports header & list
  {
    id: "nmap-ports-header",
    type: "output-dim",
    text: "PORT     STATE    SERVICE",
    revealAt: 550,
  },
  {
    id: "nmap-port-22",
    type: "output-green",
    text: "22/tcp   open     ssh",
    revealAt: 680,
  },
  {
    id: "nmap-port-80",
    type: "output-green",
    text: "80/tcp   open     http",
    revealAt: 780,
  },
  {
    id: "nmap-port-443",
    type: "output-green",
    text: "443/tcp  open     https",
    revealAt: 880,
  },
  // 1.00s: Reconnaissance complete
  {
    id: "recon-done",
    type: "success",
    text: "[+] RECONNAISSANCE COMPLETE",
    revealAt: 1000,
  },

  // 1.15s: Service enumeration command (curl)
  {
    id: "enum-cmd",
    type: "kali-prompt",
    promptPath: "~/security-lab",
    commandText: "curl -I http://lab.example",
    revealAt: 1150,
  },
  // 1.35s: HTTP response
  {
    id: "enum-resp",
    type: "output-green",
    text: "HTTP/1.1 200 OK  |  Server: nginx",
    revealAt: 1350,
  },
  {
    id: "enum-done",
    type: "success",
    text: "[+] SERVICE ENUMERATION COMPLETE",
    revealAt: 1480,
  },

  // 1.60s: Simulated reverse session initialization
  {
    id: "rev-init",
    type: "info",
    text: "[*] Initializing authorized lab session...",
    revealAt: 1600,
  },
  {
    id: "rev-wait",
    type: "info",
    text: "[*] Waiting for simulated reverse connection...",
    revealAt: 1700,
  },
  {
    id: "rev-connected",
    type: "success",
    text: "[+] REVERSE SESSION ESTABLISHED",
    revealAt: 1780,
  },
  {
    id: "whoami-user",
    type: "output-green",
    text: "lab-user@target:~$ whoami -> lab-user",
    revealAt: 1840,
  },

  // 1.85s: Privilege escalation verification
  {
    id: "priv-init",
    type: "info",
    text: "[*] Verifying simulated privilege escalation...",
    revealAt: 1880,
  },
  {
    id: "whoami-root",
    type: "output-green",
    text: "root@target:~# whoami -> root",
    revealAt: 2150,
  },
  {
    id: "priv-done",
    type: "success",
    text: "[+] PRIVILEGE ESCALATION SUCCESSFUL",
    revealAt: 2320,
  },

  // 2.45s: System Access Granted & VM Core revealed
  {
    id: "access-granted",
    type: "highlight",
    text: "[+] SYSTEM ACCESS GRANTED",
    revealAt: 2450,
  },
  {
    id: "core-init",
    type: "identity",
    text: "> INITIALIZING VM CORE...",
    revealAt: 2600,
  },
  {
    id: "core-id",
    type: "identity",
    text: "> IDENTITY: VAIBHAV MARATHE",
    revealAt: 2720,
  },
  {
    id: "core-status",
    type: "output-green",
    text: "> NETWORK STATUS: ONLINE",
    revealAt: 2840,
  },
];

// ---------------------------------------------------------------------------
// MODE B: EXACT 1-SECOND TIMELINE (Reload in same tab)
// 0.00 - 0.10s: Terminal appears & reconnect command starts
// 0.10 - 0.24s: Previous session verified
// 0.24 - 0.36s: VM Core online
// 0.36 - 0.48s: Access granted
// 0.58 - 1.00s: Fast morph into VM Core & portfolio reveal
// ---------------------------------------------------------------------------
export const RELOAD_TERMINAL_SEQUENCE: TerminalEntry[] = [
  {
    id: "re-cmd",
    type: "kali-prompt",
    promptPath: "~",
    commandText: "reconnect --session vm_core",
    revealAt: 100,
  },
  {
    id: "re-verified",
    type: "output-green",
    text: "[+] PREVIOUS SESSION VERIFIED",
    revealAt: 240,
  },
  {
    id: "re-core",
    type: "identity",
    text: "[+] VM CORE ONLINE",
    revealAt: 360,
  },
  {
    id: "re-access",
    type: "highlight",
    text: "[+] ACCESS GRANTED",
    revealAt: 480,
  },
];

// Dedicated config for Mode A: Full First Visit (4.0s total)
export const FIRST_VISIT_CONFIG: IntroTimingConfig = {
  mode: "first-visit",
  label: "FIRST_VISIT",
  badgeText: "KALI_BOOT_SEQUENCE // 4.0s",
  totalDurationMs: 4000,
  transitionStartMs: 2950,
  morphDurationMs: 850,       // 850ms physical window gliding and shrinking flight
  fadeOverlayDelayMs: 200,    // Overlay backdrop begins fading to reveal hero underneath
  finishDelayMs: 850,         // Docking completes at 2950 + 850 = 3800ms
  sequence: FULL_TERMINAL_SEQUENCE,
};

// Dedicated config for Mode B: Short Reload (1.0s total)
export const RELOAD_CONFIG: IntroTimingConfig = {
  mode: "reload",
  label: "RELOAD",
  badgeText: "KALI_RECONNECT // 1.0s",
  totalDurationMs: 1000,
  transitionStartMs: 540,
  morphDurationMs: 380,       // 380ms fast docking flight
  fadeOverlayDelayMs: 80,     // Overlay backdrop fades quickly
  finishDelayMs: 380,         // Docking completes at 540 + 380 = 920ms
  sequence: RELOAD_TERMINAL_SEQUENCE,
};
