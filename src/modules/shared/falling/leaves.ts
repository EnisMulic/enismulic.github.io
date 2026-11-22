// Falling autumn leaves for the Halloween theme. Each leaf picture is drawn once onto a small canvas in one color
// and then scaled for every leaf that uses it.
// Ported from falling-leaves by ernkerr (MIT): https://github.com/ernkerr/falling-leaves
import type { Effect } from './falling';
import { DEFAULT_PROFILE, type MotionProfile } from './motion';

export type LeafShape = 'maple' | 'oak' | 'ginkgo' | 'birch' | 'oval';

// Ginkgo leaves turn gold in autumn, so they don't take the reds of the other shapes
const AUTUMN = ['#d9480f', '#e8590c', '#f08c00', '#c92a2a', '#a61e4d', '#b5651d', '#e0a800'];
const GOLD = ['#e0a800', '#f2c12e', '#d99a00', '#c9a227'];

// Where each shape's stem joins the leaf
const STEM_BASE: Record<LeafShape, number> = { maple: 0.45, oak: 0.6, ginkgo: 0.45, birch: 0.65, oval: 0.8 };

// Ginkgo and birch leaves are light and flat, so they drift and rock side to side instead of spinning
const MOTION: Partial<Record<LeafShape, MotionProfile>> = {
  ginkgo: { sway: 2.2, swayFreq: 1.4, spin: 0.15, flip: 0.4, rock: 35 },
  birch: { sway: 1.9, swayFreq: 1.3, spin: 0.2, flip: 0.5, rock: 30 },
};

const SPRITE_SIZE = 128;

type Ctx = CanvasRenderingContext2D;
type Point = [number, number];

// Every shape is drawn in a -1..1 box with the tip at the top and the stem at the bottom.

// The right half of a maple leaf, from the tip down to the stem; the left half is mirrored
const MAPLE_RIGHT: Point[] = [
  [0, -1], [0.15, -0.6], [0.35, -0.75], [0.3, -0.35], [0.75, -0.55],
  [0.62, -0.25], [0.95, -0.1], [0.55, 0.1], [0.62, 0.3], [0.25, 0.25],
  [0.08, 0.45],
];

function traceMirrored(ctx: Ctx, right: Point[]) {
  ctx.beginPath();
  right.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
  for (let i = right.length - 1; i >= 0; i--) ctx.lineTo(-right[i][0], right[i][1]);
  ctx.closePath();
}

// The right half of a leaf from its half-width at each point, t going from 0 at the tip to 1 at the base
function outline(top: number, bottom: number, halfWidth: (t: number) => number, steps: number): Point[] {
  return Array.from({ length: steps + 1 }, (_, i) => [Math.max(0, halfWidth(i / steps)), top + (bottom - top) * (i / steps)]);
}

// Oak: an oblong leaf with deep rounded lobes on each side
const OAK_RIGHT = outline(-0.95, 0.6, t => 0.85 * Math.sin(Math.PI * t) ** 0.6 * (0.45 + 0.55 * Math.abs(Math.sin(t * Math.PI * 4.5))), 90);

// Birch: a pointed oval, widest near the base, with a fine saw-tooth edge
const BIRCH_RIGHT = outline(-1, 0.65, t => {
  const body = 0.72 * Math.sin(Math.PI * t) ** 0.85 * (0.75 + 0.25 * t);
  return body > 0.06 ? body - ((t * 22) % 1) * 0.05 : body;
}, 88);

// Ginkgo: a fan with a notch in the middle of its top edge
function traceGinkgo(ctx: Ctx) {
  ctx.beginPath();
  ctx.moveTo(0, 0.45);
  ctx.quadraticCurveTo(-0.35, 0.2, -0.95, -0.4);
  ctx.quadraticCurveTo(-0.6, -0.95, -0.12, -0.85);
  ctx.lineTo(0, -0.55);
  ctx.lineTo(0.12, -0.85);
  ctx.quadraticCurveTo(0.6, -0.95, 0.95, -0.4);
  ctx.quadraticCurveTo(0.35, 0.2, 0, 0.45);
  ctx.closePath();
}

function traceOval(ctx: Ctx) {
  ctx.beginPath();
  ctx.moveTo(0, -1);
  ctx.bezierCurveTo(0.75, -0.55, 0.6, 0.5, 0, 0.8);
  ctx.bezierCurveTo(-0.6, 0.5, -0.75, -0.55, 0, -1);
  ctx.closePath();
}

function traceShape(ctx: Ctx, shape: LeafShape) {
  if (shape === 'maple') traceMirrored(ctx, MAPLE_RIGHT);
  else if (shape === 'oak') traceMirrored(ctx, OAK_RIGHT);
  else if (shape === 'birch') traceMirrored(ctx, BIRCH_RIGHT);
  else if (shape === 'ginkgo') traceGinkgo(ctx);
  else traceOval(ctx);
}

// The midrib, plus a pair of side veins at each height angled up toward the edge
function sideVeins(ctx: Ctx, stemEnd: number, tip: number, heights: number[], reach: number) {
  ctx.moveTo(0, stemEnd);
  ctx.lineTo(0, tip);
  for (const y of heights) {
    for (const side of [1, -1]) {
      ctx.moveTo(0, y + 0.15);
      ctx.lineTo(reach * side, y - 0.1);
    }
  }
}

function drawVeins(ctx: Ctx, shape: LeafShape) {
  ctx.beginPath();
  if (shape === 'maple') {
    // Out to the five main points
    ctx.moveTo(0, 0.95);
    ctx.lineTo(0, -0.85);
    for (const side of [1, -1]) {
      ctx.moveTo(0, 0.4);
      ctx.lineTo(0.82 * side, -0.1);
      ctx.moveTo(0, 0.4);
      ctx.lineTo(0.62 * side, -0.48);
    }
  } else if (shape === 'oak') {
    sideVeins(ctx, 0.95, -0.85, [-0.6, -0.3, 0, 0.3], 0.45);
  } else if (shape === 'birch') {
    sideVeins(ctx, 0.95, -0.9, [-0.55, -0.3, -0.05, 0.2, 0.42], 0.4);
  } else if (shape === 'ginkgo') {
    // Fine veins fanning out from the stem to the top edge
    ctx.moveTo(0, 1);
    ctx.lineTo(0, 0.45);
    for (let k = -4; k <= 4; k++) {
      if (k === 0) continue;
      const a = (k / 4) * 0.95;
      ctx.moveTo(0, 0.45);
      ctx.lineTo(Math.sin(a) * 1.05, 0.45 - Math.cos(a) * 1.2);
    }
  } else {
    sideVeins(ctx, 1, -0.85, [-0.4, 0, 0.35], 0.38);
  }
  ctx.stroke();
}

function sprite(color: string, shape: LeafShape) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = SPRITE_SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;
  ctx.translate(SPRITE_SIZE / 2, SPRITE_SIZE / 2);
  ctx.scale(SPRITE_SIZE * 0.47, SPRITE_SIZE * 0.47);

  traceShape(ctx, shape);
  ctx.fillStyle = color;
  ctx.fill();

  // A soft highlight on one side so the leaf doesn't look flat
  ctx.globalCompositeOperation = 'source-atop';
  const shine = ctx.createLinearGradient(-1, -1, 1, 1);
  shine.addColorStop(0, 'rgba(255,255,255,0.25)');
  shine.addColorStop(1, 'rgba(0,0,0,0.15)');
  ctx.fillStyle = shine;
  ctx.fillRect(-1, -1, 2, 2);
  ctx.globalCompositeOperation = 'source-over';

  ctx.strokeStyle = 'rgba(60,25,0,0.35)';
  ctx.lineCap = 'round';
  // Veins stay inside the leaf; the stem sticks out below it
  ctx.save();
  traceShape(ctx, shape);
  ctx.clip();
  ctx.lineWidth = 0.045;
  drawVeins(ctx, shape);
  ctx.restore();
  ctx.lineWidth = 0.06;
  ctx.beginPath();
  ctx.moveTo(0, STEM_BASE[shape]);
  ctx.lineTo(0, 1);
  ctx.stroke();
  return canvas;
}

// Maple twice, so it's the most common leaf
const SHAPES: LeafShape[] = ['maple', 'maple', 'oak', 'ginkgo', 'birch'];

export const leaves: Effect = {
  count: 24,
  opacity: 0.85,
  motion: { size: [14, 28], speed: [0.5, 1.3], wind: [-0.3, 0.8], sway: [0.4, 1.4], rotationSpeed: [-1.5, 1.5] },
  // One picture per shape and color, with how leaves of that shape move
  sprites: () => SHAPES.flatMap(shape =>
    (shape === 'ginkgo' ? GOLD : AUTUMN).map(color => ({ image: sprite(color, shape), profile: MOTION[shape] ?? DEFAULT_PROFILE })),
  ),
};
