"use client";

/**
 * CyberAudio: Lightweight procedural sound synthesizer for Kali Terminal Intro
 * Uses standard Web Audio API without any external dependencies or audio asset fetches.
 * Designed to be subtle, cinematic, low-volume, and completely fail-safe.
 */

const STORAGE_KEY = "vm_terminal_sound_enabled";

class CyberAudioManager {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;
  private activeNodes: Array<{ disconnect: () => void; stop?: () => void }> = [];
  private masterGain: GainNode | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        // Default to muted (false) as required to respect user preference and autoplay policies
        this.isEnabled = saved === "true";
      } catch {
        this.isEnabled = false;
      }
    }
  }

  /**
   * Safe getter for user sound preference
   */
  public getSoundEnabled(): boolean {
    return this.isEnabled;
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
      this.initContext();
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      // Play a soft high-tech acoustic feedback click
      this.playMechanicalClick(1900, 0.05);
    } else {
      this.stopAll();
    }

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
          this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
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
   * Plays a burst of 3-5 gentle, varied, non-repetitive clicks.
   */
  public playTypingBurst(count: number = 4): void {
    if (!this.isEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const baseDelay = 0;
    const clickInterval = 38; // ms

    for (let i = 0; i < count; i++) {
      const delayMs = baseDelay + i * clickInterval + (Math.random() * 14 - 7);
      setTimeout(() => {
        if (!this.isEnabled) return;
        // Pitch variations between 1700Hz and 2600Hz
        const freq = 1800 + Math.random() * 700;
        const vol = 0.035 + Math.random() * 0.025;
        this.playMechanicalClick(freq, vol);
      }, Math.max(0, delayMs));
    }
  }

  /**
   * Synthesizes an individual mechanical click (switch transient + subtle keycap bottoming thud)
   */
  private playMechanicalClick(centerFreq: number, gainVolume: number): void {
    if (!this.isEnabled) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;

      // 1. Transient click: Bandpassed noise impulse (15ms)
      const bufferSize = Math.floor(ctx.sampleRate * 0.015);
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
      bandpass.Q.setValueAtTime(3.5, now);

      const clickGain = ctx.createGain();
      clickGain.gain.setValueAtTime(gainVolume, now);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

      noiseSource.connect(bandpass);
      bandpass.connect(clickGain);
      clickGain.connect(this.masterGain);

      noiseSource.start(now);
      noiseSource.stop(now + 0.018);

      // 2. Subtle switch bottom-out thud (22ms, ~180Hz)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(190 + Math.random() * 30, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.022);

      oscGain.gain.setValueAtTime(gainVolume * 0.45, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.025);

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
      // Audio playback fails gracefully without throwing
    }
  }

  /**
   * Subtle high-tech data packet confirmation chirp (during scan / session milestones)
   */
  public playPacketChirp(): void {
    if (!this.isEnabled) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(2200, now + 0.035);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.045);

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
   * 2. ACCESS GRANTED: Distinctive, clean electronic confirmation tone.
   * Plays harmonic dual-tone chime at the exact moment SYSTEM ACCESS GRANTED appears.
   */
  public playAccessGranted(): void {
    if (!this.isEnabled) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;

      // Note 1: Fundamental D5 (587.33 Hz) -> rising to A5 (880 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(587.33, now);
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.06);

      gain1.gain.setValueAtTime(0.0001, now);
      gain1.gain.linearRampToValueAtTime(0.09, now + 0.015);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

      osc1.connect(gain1);
      gain1.connect(this.masterGain);

      osc1.start(now);
      osc1.stop(now + 0.35);

      // Note 2: Harmonic shimmer E6 (1318.5 Hz) -> A6 (1760 Hz) for cyber brilliance
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(1318.5, now + 0.04);
      osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.1);

      gain2.gain.setValueAtTime(0.0001, now + 0.04);
      gain2.gain.linearRampToValueAtTime(0.04, now + 0.06);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

      osc2.connect(gain2);
      gain2.connect(this.masterGain);

      osc2.start(now + 0.04);
      osc2.stop(now + 0.3);

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

  /**
   * 3. Terminal Docking Flight: Soft futuristic digital whoosh following the physical FLIP motion.
   */
  public playDockingFlight(durationMs: number): void {
    if (!this.isEnabled) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      const durationSec = Math.max(0.25, durationMs / 1000);

      // Filtered swept noise for gentle pneumatic/digital whoosh
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
      // Smooth frequency sweep down as terminal glides into dock position
      lowpass.frequency.setValueAtTime(750, now);
      lowpass.frequency.exponentialRampToValueAtTime(140, now + durationSec * 0.95);

      const whooshGain = ctx.createGain();
      whooshGain.gain.setValueAtTime(0.0001, now);
      // Gentle swell at 25% of flight, then fade
      whooshGain.gain.linearRampToValueAtTime(0.045, now + durationSec * 0.25);
      whooshGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

      noiseSource.connect(lowpass);
      lowpass.connect(whooshGain);
      whooshGain.connect(this.masterGain);

      noiseSource.start(now);
      noiseSource.stop(now + durationSec + 0.02);

      this.activeNodes.push({
        disconnect: () => {
          noiseSource.disconnect();
          lowpass.disconnect();
          whooshGain.disconnect();
        },
        stop: () => {
          try {
            noiseSource.stop();
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
   * 3b. Docking Latch: Quiet, crisp docking confirmation click as terminal locks into homepage chassis.
   */
  public playDockingLatch(): void {
    if (!this.isEnabled) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;

      // Click 1: High metallic snap (8ms, ~2400Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "square";
      osc1.frequency.setValueAtTime(2400, now);
      osc1.frequency.exponentialRampToValueAtTime(800, now + 0.012);

      gain1.gain.setValueAtTime(0.035, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

      osc1.connect(gain1);
      gain1.connect(this.masterGain);

      osc1.start(now);
      osc1.stop(now + 0.018);

      // Click 2: Solid structural lock (25ms, ~280Hz -> 90Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(280, now + 0.015);
      osc2.frequency.exponentialRampToValueAtTime(90, now + 0.045);

      gain2.gain.setValueAtTime(0.04, now + 0.015);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc2.connect(gain2);
      gain2.connect(this.masterGain);

      osc2.start(now + 0.015);
      osc2.stop(now + 0.055);

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
