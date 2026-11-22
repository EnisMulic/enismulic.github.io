// Falling snow for the Christmas theme: six-armed crystals in a few designs, and soft round flakes, which are drawn
// smaller and so read as snow further away. Built on the falling-leaves port (see falling.ts).
import type { Effect, Sprite } from './falling';
import type { MotionProfile } from './motion';

const SPRITE_SIZE = 128;

// Flakes drift gently. Crystals spin, and tumble over slowly as they fall; soft flakes look the same from any angle,
// so they only drift.
const CRYSTAL: MotionProfile = { sway: 1, swayFreq: 0.7, spin: 1, flip: 0.35, rock: 0 };
const DOT: MotionProfile = { sway: 0.8, swayFreq: 0.8, spin: 0, flip: 0, rock: 0 };

type Ctx = CanvasRenderingContext2D;

// A crystal design: side branches along each arm as [distance along the arm, branch length], and the radius of a
// hexagon at the centre (0 for none)
interface Design {
  branches: Array<[number, number]>;
  hexagon: number;
}

const DESIGNS: Design[] = [
  // Fern-like, with branches all the way out
  { branches: [[0.35, 0.28], [0.55, 0.24], [0.75, 0.16]], hexagon: 0 },
  // A star plate with one pair of branches near the tip
  { branches: [[0.7, 0.22]], hexagon: 0.28 },
  // Simple, with one big pair of branches
  { branches: [[0.5, 0.32]], hexagon: 0.12 },
];

// Draws onto a fresh canvas in a -1..1 box centered on the middle
function canvas(draw: (ctx: Ctx) => void) {
  const c = document.createElement('canvas');
  c.width = c.height = SPRITE_SIZE;
  const ctx = c.getContext('2d');
  if (ctx) {
    ctx.translate(SPRITE_SIZE / 2, SPRITE_SIZE / 2);
    ctx.scale(SPRITE_SIZE * 0.45, SPRITE_SIZE * 0.45);
    draw(ctx);
  }
  return c;
}

function crystal({ branches, hexagon }: Design) {
  return canvas(ctx => {
    ctx.strokeStyle = '#ffffff';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 0.09;
    // A faint glow so flakes stand out on light parts of the page too
    ctx.shadowColor = 'rgba(190, 220, 255, 0.9)';
    ctx.shadowBlur = SPRITE_SIZE * 0.06;
    ctx.beginPath();
    for (let arm = 0; arm < 6; arm++) {
      const a = (arm * Math.PI) / 3;
      const along = (d: number, angle = a): [number, number] => [Math.sin(angle) * d, -Math.cos(angle) * d];
      ctx.moveTo(0, 0);
      ctx.lineTo(...along(1));
      // Branches angled 60 degrees out from the arm, toward its tip
      for (const [d, length] of branches) {
        const [bx, by] = along(d);
        for (const side of [1, -1]) {
          const [dx, dy] = along(length, a + (side * Math.PI) / 3);
          ctx.moveTo(bx, by);
          ctx.lineTo(bx + dx, by + dy);
        }
      }
    }
    if (hexagon) {
      for (let i = 0; i <= 6; i++) {
        const a = (i * Math.PI) / 3 + Math.PI / 6;
        const point: [number, number] = [Math.sin(a) * hexagon, -Math.cos(a) * hexagon];
        if (i === 0) ctx.moveTo(...point);
        else ctx.lineTo(...point);
      }
    }
    ctx.stroke();
  });
}

function dot() {
  return canvas(ctx => {
    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 0.4);
    glow.addColorStop(0, 'rgba(255, 255, 255, 1)');
    glow.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
    glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, 0, 0.4, 0, Math.PI * 2);
    ctx.fill();
  });
}

export const snow: Effect = {
  count: 60,
  opacity: 0.9,
  motion: { size: [8, 20], speed: [0.35, 1], wind: [-0.2, 0.35], sway: [0.2, 0.8], rotationSpeed: [-2.5, 2.5] },
  // About half the flakes are soft dots, the rest crystals
  sprites: () => {
    const soft: Sprite = { image: dot(), profile: DOT };
    return [...DESIGNS.map(() => soft), ...DESIGNS.map(design => ({ image: crystal(design), profile: CRYSTAL }))];
  },
};
