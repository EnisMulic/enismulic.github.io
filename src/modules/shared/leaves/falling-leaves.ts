// Autumn leaves falling across the whole page, drawn on a fixed canvas that clicks pass through. It sits over the
// content but under the nav, menus and dialogs.
// Ported from falling-leaves by ernkerr (MIT): https://github.com/ernkerr/falling-leaves
import { createLeaf, pick, stepLeaf, type Leaf, type Motion } from './leaf';
import { sprites } from './sprites';

const COUNT = 24;
const OPACITY = 0.85;
const MOTION: Motion = {
  size: [14, 28],
  speed: [0.5, 1.3],
  wind: [-0.3, 0.8],
  sway: [0.4, 1.4],
  rotationSpeed: [-1.5, 1.5],
};
// Frames longer than this many 60fps frames (after switching tabs, say) are capped, so leaves don't jump
const MAX_FRAME_STEP = 3;

export class FallingLeaves {
  private readonly canvas = document.createElement('canvas');
  private readonly ctx = this.canvas.getContext('2d');
  private readonly sprites = sprites(['maple', 'maple', 'oak', 'ginkgo', 'birch']);
  private leaves: Leaf[] = [];
  private width = 0;
  private height = 0;
  private frame = 0;
  private lastTime = 0;

  constructor() {
    this.canvas.setAttribute('aria-hidden', 'true');
    Object.assign(this.canvas.style, { position: 'fixed', inset: '0', width: '100%', height: '100%', pointerEvents: 'none', zIndex: '50' });
    document.body.append(this.canvas);
    this.resize();
    window.addEventListener('resize', this.resize);
    this.leaves = Array.from({ length: COUNT }, () => createLeaf(MOTION, this.width, this.height, this.sprites.length, true));
    this.frame = requestAnimationFrame(this.tick);
  }

  destroy() {
    cancelAnimationFrame(this.frame);
    window.removeEventListener('resize', this.resize);
    this.canvas.remove();
  }

  // Sized in device pixels so leaves stay sharp on high-DPI screens
  private resize = () => {
    const dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = Math.round(this.width * dpr);
    this.canvas.height = Math.round(this.height * dpr);
    this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  private tick = (time: number) => {
    const dt = this.lastTime ? Math.min((time - this.lastTime) / (1000 / 60), MAX_FRAME_STEP) : 1;
    this.lastTime = time;
    for (const leaf of this.leaves) {
      stepLeaf(leaf, dt, MOTION, this.width, this.height, this.sprites.length, this.sprites[leaf.variant].profile);
    }
    this.draw();
    this.frame = requestAnimationFrame(this.tick);
  };

  private draw() {
    const ctx = this.ctx;
    if (!ctx) return;
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.globalAlpha = OPACITY;
    for (const leaf of this.leaves) {
      const size = pick(MOTION.size, leaf.rSize);
      if (leaf.y < -size || leaf.y > this.height + size) continue;
      const { image, profile } = this.sprites[leaf.variant];
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(((leaf.rotation + profile.rock * Math.cos(leaf.swayPhase)) * Math.PI) / 180);
      // Squashed one way to fake the leaf tumbling over in 3D
      ctx.scale(Math.cos(leaf.flipPhase), 1);
      ctx.drawImage(image, -size / 2, -size / 2, size, size);
      ctx.restore();
    }
  }
}
