type AudioWindow = Window &
  typeof globalThis & { webkitAudioContext?: typeof AudioContext };

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let source: AudioBufferSourceNode | null = null;
let bufferPromise: Promise<AudioBuffer> | null = null;
let watchdogTimer: number | null = null;
let visAdded = false;
let desired = false;

const BPM = 112;
const STEP = 60 / BPM / 4;
const BARS = 8;
const LOOP_SECONDS = STEP * 16 * BARS;
const TARGET_GAIN = 0.7;
const FADE_IN = 0.6;
const HOLD = 3.5;
const FADE_OUT = 9;

const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

const PROG = [
  { root: 45, chord: [57, 60, 64] },
  { root: 41, chord: [53, 57, 60] },
  { root: 48, chord: [60, 64, 67] },
  { root: 43, chord: [55, 59, 62] },
];

function noiseBuffer(c: BaseAudioContext) {
  const len = Math.floor(c.sampleRate * 0.3);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

function bass(
  c: BaseAudioContext,
  dest: AudioNode,
  time: number,
  freq: number,
  dur: number,
) {
  const o = c.createOscillator();
  o.type = "sawtooth";
  o.frequency.value = freq;
  const f = c.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.value = 720;
  f.Q.value = 9;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, time);
  g.gain.linearRampToValueAtTime(0.55, time + 0.012);
  g.gain.exponentialRampToValueAtTime(0.001, time + dur);
  o.connect(f);
  f.connect(g);
  g.connect(dest);
  o.start(time);
  o.stop(time + dur + 0.03);
}

function pad(
  c: BaseAudioContext,
  dest: AudioNode,
  time: number,
  freqs: number[],
  dur: number,
) {
  freqs.forEach((fr, i) => {
    const o = c.createOscillator();
    o.type = "sawtooth";
    o.frequency.value = fr;
    o.detune.value = (i - 1) * 7;
    const f = c.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 1500;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, time);
    g.gain.linearRampToValueAtTime(0.08, time + 0.45);
    g.gain.linearRampToValueAtTime(0.0001, time + dur);
    o.connect(f);
    f.connect(g);
    g.connect(dest);
    o.start(time);
    o.stop(time + dur + 0.05);
  });
}

function arp(
  c: BaseAudioContext,
  dest: AudioNode,
  send: AudioNode,
  time: number,
  freq: number,
  dur: number,
) {
  const o = c.createOscillator();
  o.type = "square";
  o.frequency.value = freq;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, time);
  g.gain.linearRampToValueAtTime(0.12, time + 0.006);
  g.gain.exponentialRampToValueAtTime(0.001, time + dur);
  o.connect(g);
  g.connect(dest);
  g.connect(send);
  o.start(time);
  o.stop(time + dur + 0.03);
}

function hat(c: BaseAudioContext, dest: AudioNode, time: number, level: number) {
  const s = c.createBufferSource();
  s.buffer = noiseBuffer(c);
  const f = c.createBiquadFilter();
  f.type = "highpass";
  f.frequency.value = 7500;
  const g = c.createGain();
  g.gain.setValueAtTime(level, time);
  g.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
  s.connect(f);
  f.connect(g);
  g.connect(dest);
  s.start(time);
  s.stop(time + 0.07);
}

async function renderLoop(sampleRate: number): Promise<AudioBuffer> {
  const length = Math.ceil(sampleRate * LOOP_SECONDS);
  const offline = new OfflineAudioContext(2, length, sampleRate);

  const out = offline.createGain();
  out.gain.value = 0.7;
  out.connect(offline.destination);

  const send = offline.createGain();
  send.gain.value = 0.28;
  const delay = offline.createDelay(1);
  delay.delayTime.value = 0.28;
  const feedback = offline.createGain();
  feedback.gain.value = 0.34;
  send.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(out);

  const totalSteps = 16 * BARS;
  for (let step = 0; step < totalSteps; step++) {
    const bar = Math.floor(step / 16) % PROG.length;
    const s = step % 16;
    const p = PROG[bar];
    const t = step * STEP;
    if (s % 2 === 0) bass(offline, out, t, mtof(p.root), STEP * 1.7);
    if (s === 0) pad(offline, out, t, p.chord.map(mtof), STEP * 16 * 0.96);
    arp(offline, out, send, t, mtof(p.chord[step % p.chord.length] + 12), STEP * 0.85);
    if (s % 2 === 0) hat(offline, out, t, s % 4 === 0 ? 0.3 : 0.13);
  }

  const buffer = await offline.startRendering();

  const fade = Math.floor(sampleRate * 0.08);
  for (let ch = 0; ch < buffer.numberOfChannels; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < fade; i++) {
      const g = i / fade;
      data[i] *= g;
      data[data.length - 1 - i] *= g;
    }
  }
  return buffer;
}

function ensureContext(): AudioContext | null {
  if (ctx) return ctx;
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext || (window as AudioWindow).webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);
  return ctx;
}

function watchdog() {
  if (desired && ctx && ctx.state === "suspended") void ctx.resume();
}

function onVisibility() {
  if (desired && ctx && ctx.state === "suspended") void ctx.resume();
}

export async function startCyberAudio() {
  if (typeof window === "undefined") return;
  desired = true;
  const c = ensureContext();
  if (!c || !master) return;

  if (c.state !== "running") {
    try {
      await c.resume();
    } catch {
      /* ignore */
    }
  }
  if (c.state !== "running") {
    document.addEventListener(
      "pointerdown",
      () => {
        void startCyberAudio();
      },
      { once: true },
    );
    return;
  }

  if (!bufferPromise) bufferPromise = renderLoop(c.sampleRate);
  const buffer = await bufferPromise;
  if (!desired) return;

  if (source) {
    try {
      source.stop();
    } catch {
      /* ignore */
    }
    source.disconnect();
    source = null;
  }
  source = c.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.connect(master);
  source.start();

  const t = c.currentTime;
  master.gain.cancelScheduledValues(t);
  master.gain.setValueAtTime(0.0001, t);
  master.gain.linearRampToValueAtTime(TARGET_GAIN, t + FADE_IN);
  master.gain.setValueAtTime(TARGET_GAIN, t + FADE_IN + HOLD);
  master.gain.linearRampToValueAtTime(
    0.0001,
    t + FADE_IN + HOLD + FADE_OUT,
  );

  if (watchdogTimer === null) watchdogTimer = window.setInterval(watchdog, 1500);
  if (!visAdded) {
    document.addEventListener("visibilitychange", onVisibility);
    visAdded = true;
  }
}

export function stopCyberAudio() {
  desired = false;
  if (ctx && master) {
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), t);
    master.gain.linearRampToValueAtTime(0.0001, t + 0.6);
  }
}
