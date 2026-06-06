/**
 * Web Audio-based Kids Storybook Sound Synthesizer Utility
 */

export const playMagicSfx = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    for (let i = 0; i < 5; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(800 + i * 250, now + i * 0.06);
      osc.frequency.exponentialRampToValueAtTime(1550 + i * 100, now + i * 0.06 + 0.15);
      gain.gain.setValueAtTime(0.04, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.16);
    }
  } catch(e) {}
};

export const playCheerSfx = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    const frequencies = [523.25, 659.25, 783.99, 1046.50];
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);
      gain.gain.setValueAtTime(0.05, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.4);
    });
  } catch(e) {}
};

export const playJumpSfx = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(620, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.21);
  } catch(e) {}
};

export const playWindBlowSfx = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.quadraticRampToValueAtTime(340, now + 0.35);
    osc.frequency.quadraticRampToValueAtTime(150, now + 0.85);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(200, now);
    osc2.frequency.quadraticRampToValueAtTime(420, now + 0.4);
    osc2.frequency.quadraticRampToValueAtTime(110, now + 0.85);
    
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
    
    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc2.start();
    osc.stop(now + 0.87);
    osc2.stop(now + 0.87);
  } catch(e) {}
};

export const playSighSadSfx = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(160, now + 0.5);
    
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(now + 0.51);
  } catch(e) {}
};

export const playForestIntroSfx = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    const notes = [440, 554, 659, 880];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.12);
      gain.gain.setValueAtTime(0.04, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.26);
    });
  } catch(e) {}
};

export const playSunsetWarmSfx = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    const chord = [293.66, 369.99, 440.00, 587.33]; // D major sweet chord
    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.05);
      gain.gain.setValueAtTime(0.025, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.85);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.9);
    });
  } catch(e) {}
};

export const playSproutGrowChime = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);
      gain.gain.setValueAtTime(0.04, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.22);
    });
  } catch(e) {}
};

/**
 * Automatically maps a page index to a kids sound effect and plays it.
 */
export const playPageSpecificSfxByMapping = (isRainbowBook: boolean, pageOneIndexed: number) => {
  if (isRainbowBook) {
    switch (pageOneIndexed) {
      case 1: playForestIntroSfx(); break;
      case 2:
      case 3: playMagicSfx(); break;
      case 4: playSproutGrowChime(); break;
      case 5: playJumpSfx(); break;
      case 6: playSighSadSfx(); break;
      case 7:
      case 8: playSunsetWarmSfx(); break;
      case 9: playForestIntroSfx(); break;
      case 10:
      case 11: playWindBlowSfx(); break;
      case 12:
      case 13:
      case 14: playSproutGrowChime(); break;
      case 15:
      case 16: playCheerSfx(); break;
      case 17: playSighSadSfx(); break;
      case 18: playSunsetWarmSfx(); break;
      case 19: playCheerSfx(); break;
      default: playForestIntroSfx();
    }
  } else {
    // Grassland Book
    switch (pageOneIndexed) {
      case 1: playForestIntroSfx(); break;
      case 2: playWindBlowSfx(); break;
      case 3: playMagicSfx(); break;
      case 4:
      case 5:
      case 6: playSighSadSfx(); break;
      case 7:
      case 8: playJumpSfx(); break;
      case 9: playSighSadSfx(); break;
      case 10: playSproutGrowChime(); break;
      case 11:
      case 12: playSunsetWarmSfx(); break;
      case 13: playMagicSfx(); break;
      case 14: playWindBlowSfx(); break;
      case 15: playCheerSfx(); break;
      case 16:
      case 17:
      case 18: playSunsetWarmSfx(); break;
      default: playForestIntroSfx();
    }
  }
};
