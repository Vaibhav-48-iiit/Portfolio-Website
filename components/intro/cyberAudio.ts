"use client";

/**
 * CyberAudio: High-fidelity procedural audio engine for the Kali Terminal Introduction.
 * Built with standard Web Audio API. Zero external sound files, zero network delay, zero dependencies.
 * Tuned for clear acoustic audibility across laptop speakers, monitors, and headphones.
 */

const STORAGE_KEY = "vm_terminal_sound_enabled";

class CyberAudioManager {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = true;
  private activeNodes: Array<{ disconnect: () => void; stop?: () => void }> = [];
  private masterGain: GainNode | null = null;
  private hasUnlocked: boolean = false;
  private listeners: Set<() => void> = new Set();

  constructor() {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        // Default to enabled (true) so the user can hear the audio experience immediately.
        // If the user explicitly clicked mute previously ("false"), respect their choice.
        this.isEnabled = saved !== "false";
      } catch {
        this.isEnabled = true;
      }
    }
  }

  public subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  private notify(): void {
    this.listeners.forEach((l) => l());
  }

  /**
   * Safe getter for user sound preference
   */
  public getSoundEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Check if AudioContext is running (unlocked by user interaction)
   */
  public isAudioContextRunning(): boolean {
    return !!this.ctx && this.ctx.state === "running";
  }

  /**
   * Unlock AudioContext on any user gesture (click, tap, keypress)
   */
  public unlock(): void {
    if (this.hasUnlocked && this.ctx?.state === "running") return;
    const ctx = this.initContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().then(() => {
        this.hasUnlocked = true;
      }).catch(() => {});
    } else if (ctx && ctx.state === "running") {
      this.hasUnlocked = true;
    }
  }

  /**
   * Toggle sound on/off with local storage persistence
   */
  public setSoundEnabled(enabled: boolean): boolean {
    this.isEnabled = enabled;
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, enabled ? "true" : "false");
      }
    } catch {
      // ignore
    }

    if (enabled) {
      this.unlock();
      // Play an audible test confirmation chime so user immediately verifies audio works
      setTimeout(() => {
        this.playMechanicalClick(2200, 0.40);
      }, 50);
    } else {
      this.stopAll();
    }

    this.notify();
    return this.isEnabled;
  }

  /**
   * Lazily initializes AudioContext upon user gesture
   */
  private initContext(): AudioContext | null {
    if (typeof window === "undefined") return null;

    try {
      if (!this.ctx) {
        const AudioCtxClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtxClass) {
          this.ctx = new AudioCtxClass();
          this.masterGain = this.ctx.createGain();
          this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
          this.masterGain.connect(this.ctx.destination);
        }
      }

      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  /**
   * Stops all currently playing audio immediately (used on Skip or Mute)
   */
  public stopAll(): void {
    try {
      this.activeNodes.forEach((node) => {
        try {
          if (node.stop) node.stop();
          node.disconnect();
        } catch {
          // ignore
        }
      });
      this.activeNodes = [];
    } catch {
      // ignore
    }
  }

  /**
   * 1. Terminal Typing: Soft, realistic mechanical keyboard clicks.
   * Plays a rapid burst of 3-5 gentle, varied, clearly audible clicks.
   */
  public playTypingBurst(count: number = 4): void {
    if (!this.isEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    // Attempt to resume if suspended
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const clickInterval = 42; // ms between keystrokes

    for (let i = 0; i < count; i++) {
      const delayMs = i * clickInterval + (Math.random() * 16 - 8);
      setTimeout(() => {
        if (!this.isEnabled) return;
        // Pitch variations between 2000Hz and 3200Hz
        const freq = 2200 + Math.random() * 900;
        const vol = 0.32 + Math.random() * 0.12;
        this.playMechanicalClick(freq, vol);
      }, Math.max(0, delayMs));
    }
  }

  /**
   * Synthesizes an individual mechanical click (switch transient + keycap bottoming thud)
   */
  public playMechanicalClick(centerFreq: number, gainVolume: number = 0.35): void {
    if (!this.isEnabled) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    try {
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;

      // 1. Transient click: Bandpassed noise impulse (20ms)
      const bufferSize = Math.floor(ctx.sampleRate * 0.02);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.setValueAtTime(centerFreq, now);
      bandpass.Q.setValueAtTime(2.2, now);

      const clickGain = ctx.createGain();
      clickGain.gain.setValueAtTime(gainVolume, now);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

      noiseSource.connect(bandpass);
      bandpass.connect(clickGain);
      clickGain.connect(this.masterGain);

      noiseSource.start(now);
      noiseSource.stop(now + 0.025);

      // 2. Audible switch bottom-out thud (28ms, ~220Hz -> 80Hz)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(240 + Math.random() * 40, now);
      osc.frequency.exponentialRampToValueAtTime(75, now + 0.028);

      oscGain.gain.setValueAtTime(gainVolume * 0.65, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.032);

      this.activeNodes.push({
        disconnect: () => {
          noiseSource.disconnect();
          bandpass.disconnect();
          clickGain.disconnect();
          osc.disconnect();
          oscGain.disconnect();
        },
        stop: () => {
          try {
            noiseSource.stop();
            osc.stop();
          } catch {
            // ignore
          }
        },
      });
    } catch {
      // Audio fails gracefully without breaking UI
    }
  }

  /**
   * High-tech packet processing chirp (during scan / session milestones)
   */
  public playPacketChirp(): void {
    if (!this.isEnabled) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    try {
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1600, now);
      osc.frequency.exponentialRampToValueAtTime(2600, now + 0.045);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.055);

      this.activeNodes.push({
        disconnect: () => {
          osc.disconnect();
          gain.disconnect();
        },
        stop: () => {
          try {
            osc.stop();
          } catch {
            // ignore
          }
        },
      });
    } catch {
      // ignore
    }
  }

  /**
   * 2. ACCESS GRANTED: Distinctive, clean electronic confirmation chime.
   * Plays a rich, resonant harmonic confirmation chime at the exact moment SYSTEM ACCESS GRANTED appears.
   */
  public playAccessGranted(): void {
    if (!this.isEnabled) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    try {
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;

      // Note 1: Core Harmonic D5 (587.33 Hz) -> rising to A5 (880 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(587.33, now);
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(0.48, now + 0.018);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc1.connect(gain1);
      gain1.connect(this.masterGain);

      osc1.start(now);
      osc1.stop(now + 0.48);

      // Note 2: Harmonic shimmer E6 (1318.5 Hz) -> A6 (1760 Hz) for cyber brilliance
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(1318.5, now + 0.05);
      osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.12);

      gain2.gain.setValueAtTime(0.001, now + 0.05);
      gain2.gain.linearRampToValueAtTime(0.25, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

      osc2.connect(gain2);
      gain2.connect(this.masterGain);

      osc2.start(now + 0.05);
      osc2.stop(now + 0.45);

      // Note 3: Low sub-body resonance for cinematic weight D4 (293.66 Hz)
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = "sine";
      osc3.frequency.setValueAtTime(293.66, now);
      osc3.frequency.exponentialRampToValueAtTime(440, now + 0.09);

      gain3.gain.setValueAtTime(0.001, now);
      gain3.gain.linearRampToValueAtTime(0.28, now + 0.02);
      gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

      osc3.connect(gain3);
      gain3.connect(this.masterGain);

      osc3.start(now);
      osc3.stop(now + 0.4);

      this.activeNodes.push({
        disconnect: () => {
          osc1.disconnect();
          gain1.disconnect();
          osc2.disconnect();
          gain2.disconnect();
          osc3.disconnect();
          gain3.disconnect();
        },
        stop: () => {
          try {
            osc1.stop();
            osc2.stop();
            osc3.stop();
          } catch {
            // ignore
          }
        },
      });
    } catch {
      // ignore
    }
  }

  /**
   * 3. Terminal Docking Flight: Futuristic digital whoosh following the physical FLIP motion.
   */
  public playDockingFlight(durationMs: number): void {
    if (!this.isEnabled) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    try {
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;
      const durationSec = Math.max(0.3, durationMs / 1000);

      // Filtered swept noise for clean pneumatic/digital whoosh
      const bufferSize = Math.floor(ctx.sampleRate * durationSec);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      // Smooth frequency sweep down as terminal glides across the screen
      lowpass.frequency.setValueAtTime(1100, now);
      lowpass.frequency.exponentialRampToValueAtTime(180, now + durationSec * 0.95);

      const whooshGain = ctx.createGain();
      whooshGain.gain.setValueAtTime(0.001, now);
      // Swell at 25% of flight, then fade out
      whooshGain.gain.linearRampToValueAtTime(0.32, now + durationSec * 0.28);
      whooshGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

      noiseSource.connect(lowpass);
      lowpass.connect(whooshGain);
      whooshGain.connect(this.masterGain);

      noiseSource.start(now);
      noiseSource.stop(now + durationSec + 0.03);

      // Layer 2: Soft tonal downward glissando
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + durationSec * 0.9);

      oscGain.gain.setValueAtTime(0.001, now);
      oscGain.gain.linearRampToValueAtTime(0.14, now + durationSec * 0.2);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + durationSec + 0.03);

      this.activeNodes.push({
        disconnect: () => {
          noiseSource.disconnect();
          lowpass.disconnect();
          whooshGain.disconnect();
          osc.disconnect();
          oscGain.disconnect();
        },
        stop: () => {
          try {
            noiseSource.stop();
            osc.stop();
          } catch {
            // ignore
          }
        },
      });
    } catch {
      // ignore
    }
  }

  /**
   * 3b. Docking Latch: Quiet, solid docking confirmation click as terminal locks into homepage chassis.
   */
  public playDockingLatch(): void {
    if (!this.isEnabled) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    try {
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;

      // Click 1: High metallic mechanical snap (14ms, ~2600Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "square";
      osc1.frequency.setValueAtTime(2600, now);
      osc1.frequency.exponentialRampToValueAtTime(900, now + 0.014);

      gain1.gain.setValueAtTime(0.38, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.016);

      osc1.connect(gain1);
      gain1.connect(this.masterGain);

      osc1.start(now);
      osc1.stop(now + 0.02);

      // Click 2: Solid structural lock (35ms, ~320Hz -> 90Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(320, now + 0.014);
      osc2.frequency.exponentialRampToValueAtTime(80, now + 0.045);

      gain2.gain.setValueAtTime(0.42, now + 0.014);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc2.connect(gain2);
      gain2.connect(this.masterGain);

      osc2.start(now + 0.014);
      osc2.stop(now + 0.06);

      this.activeNodes.push({
        disconnect: () => {
          osc1.disconnect();
          gain1.disconnect();
          osc2.disconnect();
          gain2.disconnect();
        },
        stop: () => {
          try {
            osc1.stop();
            osc2.stop();
          } catch {
            // ignore
          }
        },
      });
    } catch {
      // ignore
    }
  }
}

export const cyberAudio = new CyberAudioManager();
