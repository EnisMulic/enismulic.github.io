// Particles (leaves, snowflakes) falling across the whole page, drawn on a fixed canvas that clicks pass through. It
// sits over the content but under the nav, menus and dialogs.
// Ported from falling-leaves by ernkerr (MIT): https://github.com/ernkerr/falling-leaves
import { createParticle, pick, step, type Motion, type MotionProfile, type Particle } from './motion';

export interface Sprite {
  image: CanvasImageSource;
  profile: MotionProfile;
}

// What falls: how many, how see-through, how they move, and their pictures (made on demand, since drawing them
// needs the DOM)
export interface Effect {
  count: number;
  opacity: number;
  motion: Motion;
  sprites: () => Sprite[];
}

// Frames longer than this many 60fps frames (after switching tabs, say) are capped, so particles don't jump
const MAX_FRAME_STEP = 3;

export class Falling {
  private readonly canvas = document.createElement('canvas');
  private readonly ctx = this.canvas.getContext('2d');
  private readonly sprites: Sprite[];
  private particles: Particle[] = [];
  private width = 0;
  private height = 0;
  private frame = 0;
  private lastTime = 0;

  constructor(private readonly effect: Effect) {
    this.sprites = effect.sprites();
    this.canvas.setAttribute('aria-hidden', 'true');
    Object.assign(this.canvas.style, { position: 'fixed', inset: '0', width: '100%', height: '100%', pointerEvents: 'none', zIndex: '50' });
    document.body.append(this.canvas);
    this.resize();
    window.addEventListener('resize', this.resize);
    this.particles = Array.from({ length: effect.count }, () => createParticle(effect.motion, this.width, this.height, this.sprites.length, true));
    this.frame = requestAnimationFrame(this.tick);
  }

  destroy() {
    cancelAnimationFrame(this.frame);
    window.removeEventListener('resize', this.resize);
    this.canvas.remove();
  }

  // Sized in device pixels so particles stay sharp on high-DPI screens
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
    for (const p of this.particles) {
      step(p, dt, this.effect.motion, this.width, this.height, this.sprites.length, this.sprites[p.variant].profile);
    }
    this.draw();
    this.frame = requestAnimationFrame(this.tick);
  };

  private draw() {
    const ctx = this.ctx;
    if (!ctx) return;
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.globalAlpha = this.effect.opacity;
    for (const p of this.particles) {
      const size = pick(this.effect.motion.size, p.rSize);
      if (p.y < -size || p.y > this.height + size) continue;
      const { image, profile } = this.sprites[p.variant];
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(((p.rotation + profile.rock * Math.cos(p.swayPhase)) * Math.PI) / 180);
      // Squashed one way to fake tumbling over in 3D
      if (profile.flip) ctx.scale(Math.cos(p.flipPhase), 1);
      ctx.drawImage(image, -size / 2, -size / 2, size, size);
      ctx.restore();
    }
  }
}
