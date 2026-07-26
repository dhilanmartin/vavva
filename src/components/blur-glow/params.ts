export type Stop = { pos: number; color: [number, number, number] };

export interface Palette {
  name: string;
  stops: Stop[];
  ink: [number, number, number];
  paper: [number, number, number];
}

const rgb = (hex: string): [number, number, number] => [
  parseInt(hex.slice(1, 3), 16) / 255,
  parseInt(hex.slice(3, 5), 16) / 255,
  parseInt(hex.slice(5, 7), 16) / 255,
];

/* Colour worlds, not a rainbow. Each one is a room in the house: the brush red
   we print with, the hour before the door opens, candlelight, the last hour,
   and a grey beat so the cycle breathes. All resolve to the paper. */
export const PALETTES: Palette[] = [
  {
    name: "House Red",
    stops: [
      { pos: 0.0, color: rgb("#1a0403") },
      { pos: 0.22, color: rgb("#8e1a14") },
      { pos: 0.46, color: rgb("#b32622") },
      { pos: 0.72, color: rgb("#e8917c") },
      { pos: 1.0, color: rgb("#e8e8e8") },
    ],
    ink: rgb("#6d120e"),
    paper: rgb("#e8e8e8"),
  },
  {
    name: "Blue Hour",
    stops: [
      { pos: 0.0, color: rgb("#04081c") },
      { pos: 0.22, color: rgb("#1b2a6b") },
      { pos: 0.46, color: rgb("#4f6cc9") },
      { pos: 0.72, color: rgb("#b6c4ec") },
      { pos: 1.0, color: rgb("#e8e8e8") },
    ],
    ink: rgb("#14204d"),
    paper: rgb("#e8e8e8"),
  },
  {
    name: "Candlelight",
    stops: [
      { pos: 0.0, color: rgb("#190c02") },
      { pos: 0.22, color: rgb("#7a3c05") },
      { pos: 0.46, color: rgb("#dd8f14") },
      { pos: 0.72, color: rgb("#f3d49b") },
      { pos: 1.0, color: rgb("#e8e8e8") },
    ],
    ink: rgb("#452405"),
    paper: rgb("#e8e8e8"),
  },
  {
    name: "Last Hour",
    stops: [
      { pos: 0.0, color: rgb("#1c0510") },
      { pos: 0.22, color: rgb("#8a1145") },
      { pos: 0.46, color: rgb("#d94a7c") },
      { pos: 0.72, color: rgb("#f0b8c9") },
      { pos: 1.0, color: rgb("#e8e8e8") },
    ],
    ink: rgb("#570a2b"),
    paper: rgb("#e8e8e8"),
  },
  {
    name: "Graphite",
    stops: [
      { pos: 0.0, color: rgb("#0a0a0b") },
      { pos: 0.22, color: rgb("#37373a") },
      { pos: 0.46, color: rgb("#7d7d82") },
      { pos: 0.72, color: rgb("#c4c4c7") },
      { pos: 1.0, color: rgb("#e8e8e8") },
    ],
    ink: rgb("#17171a"),
    paper: rgb("#e8e8e8"),
  },
];

export function paletteUniforms(p: Palette): {
  positions: number[];
  colors: number[];
  ink: number[];
  paper: number[];
} {
  const positions: number[] = [];
  const colors: number[] = [];
  for (let i = 0; i < 5; i++) {
    const s = p.stops[Math.min(i, p.stops.length - 1)];
    positions.push(s.pos);
    colors.push(s.color[0], s.color[1], s.color[2]);
  }
  return { positions, colors, ink: [...p.ink], paper: [...p.paper] };
}

export interface PaletteUniforms {
  positions: number[];
  colors: number[];
  ink: number[];
  paper: number[];
}

const LUMA: readonly [number, number, number] = [0.2126, 0.7152, 0.0722];

function satPreserveLerp(x: number[], y: number[], t: number): number[] {
  const out = x.map((v, i) => v + (y[i] - v) * t);
  const bell = Math.sin(Math.PI * t);
  if (bell < 1e-4) return out;
  const satOf = (c0: number, c1: number, c2: number) => {
    const mx = Math.max(c0, c1, c2);
    return mx === 0 ? 0 : (mx - Math.min(c0, c1, c2)) / mx;
  };

  for (let i = 0; i + 2 < out.length; i += 3) {
    const r = out[i],
      g = out[i + 1],
      b = out[i + 2];
    const target = Math.max(
      satOf(x[i], x[i + 1], x[i + 2]),
      satOf(y[i], y[i + 1], y[i + 2]),
    );
    const s = satOf(r, g, b);
    if (s < 1e-4 || target < 1e-4) continue;
    const k = (s + (target - s) * bell) / s;
    const L = LUMA[0] * r + LUMA[1] * g + LUMA[2] * b;
    out[i] = Math.min(1, Math.max(0, L + (r - L) * k));
    out[i + 1] = Math.min(1, Math.max(0, L + (g - L) * k));
    out[i + 2] = Math.min(1, Math.max(0, L + (b - L) * k));
  }
  return out;
}

export function lerpPaletteUniforms(
  a: PaletteUniforms,
  b: PaletteUniforms,
  t: number,
): PaletteUniforms {
  const lerpArr = (x: number[], y: number[]) =>
    x.map((v, i) => v + (y[i] - v) * t);
  return {
    positions: lerpArr(a.positions, b.positions),
    colors: satPreserveLerp(a.colors, b.colors, t),
    ink: satPreserveLerp(a.ink, b.ink, t),
    paper: satPreserveLerp(a.paper, b.paper, t),
  };
}

/** Always uppercase — palette still cycles through all color worlds. */
export const WORDS = ["VAVVA"];

export const HOLD_SCALE = [1.45];

export const GRAIN = 0.4;

export const MORPH_LEAD = 0.78;
export const MORPH_LAG = 1.3;

export const CAST_DIR: readonly [number, number] = [0.38, 0.92];
export const CAST_STEP: readonly [number, number, number, number] = [
  0.0008, 0.0022, 0.0042, 0.0075,
];

export const LETTER_SPREAD = 0.45;

export const WARP_RADIUS = 0.2;
export const WARP_AMP = 0.013;
export const WARP_SWIRL = 0.6;

export const WARP_DRAG = 0.26;

export const WARP_STRETCH = 0.5;

export const BREATH = 0.22;
