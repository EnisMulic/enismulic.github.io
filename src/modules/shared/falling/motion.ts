// How a single falling particle (a leaf, a snowflake) moves.
// Ported from falling-leaves by ernkerr (MIT): https://github.com/ernkerr/falling-leaves

// A [min, max] range; each particle picks its own value from it
export type Range = [number, number];

export interface Motion {
  // Size in CSS pixels
  size: Range;
  // Fall speed in pixels per frame at 60fps
  speed: Range;
  // Steady sideways drift in pixels per frame; negative blows left
  wind: Range;
  // How far particles swing side to side, in pixels per frame
  sway: Range;
  // Spin in degrees per frame
  rotationSpeed: Range;
}

// How one kind of particle moves, relative to Motion: multipliers, plus how many degrees it tilts as it swings.
// A `flip` of 0 means it never tumbles over.
export interface MotionProfile {
  sway: number;
  swayFreq: number;
  spin: number;
  flip: number;
  rock: number;
}

export const DEFAULT_PROFILE: MotionProfile = { sway: 1, swayFreq: 1, spin: 1, flip: 1, rock: 0 };

// A particle keeps random factors between 0 and 1 (the r* fields) rather than final values
export interface Particle {
  x: number;
  y: number;
  rotation: number;
  // Where the particle is in its side-to-side swing and in its tumble (a fake 3D flip), in radians
  swayPhase: number;
  flipPhase: number;
  // Which sprite the particle uses
  variant: number;
  rSize: number;
  rSpeed: number;
  rWind: number;
  rSway: number;
  rRotation: number;
  rSwayFreq: number;
  rFlipFreq: number;
}

export const pick = ([min, max]: Range, t: number) => min + (max - min) * t;

// A new particle. With `anywhere` it starts at a random height, so the screen is already full on the first frame;
// otherwise it starts just above the top.
export function createParticle(motion: Motion, width: number, height: number, variants: number, anywhere: boolean): Particle {
  const rSize = Math.random();
  return {
    x: Math.random() * width,
    y: anywhere ? Math.random() * height : -pick(motion.size, rSize) - Math.random() * height * 0.2,
    rotation: Math.random() * 360,
    swayPhase: Math.random() * Math.PI * 2,
    flipPhase: Math.random() * Math.PI * 2,
    variant: Math.floor(Math.random() * Math.max(1, variants)),
    rSize,
    rSpeed: Math.random(),
    rWind: Math.random(),
    rSway: Math.random(),
    rRotation: Math.random(),
    rSwayFreq: Math.random(),
    rFlipFreq: Math.random(),
  };
}

// Moves a particle on by `dt` frames (1 is one frame at 60fps). One that falls off the bottom starts again at the
// top as a new particle; one that drifts off a side comes back on the other.
export function step(p: Particle, dt: number, motion: Motion, width: number, height: number, variants: number, profile: MotionProfile) {
  const size = pick(motion.size, p.rSize);
  p.swayPhase += (0.01 + p.rSwayFreq * 0.02) * profile.swayFreq * dt;
  p.flipPhase += (0.02 + p.rFlipFreq * 0.04) * profile.flip * dt;

  const sway = Math.sin(p.swayPhase) * pick(motion.sway, p.rSway) * profile.sway;
  p.x += (pick(motion.wind, p.rWind) + sway) * dt;
  // Slower at the ends of each swing, like a leaf rocking as it falls
  const flutter = 0.6 + 0.4 * Math.abs(Math.cos(p.swayPhase));
  p.y += pick(motion.speed, p.rSpeed) * flutter * dt;
  p.rotation += pick(motion.rotationSpeed, p.rRotation) * profile.spin * dt;

  if (p.y - size > height) Object.assign(p, createParticle(motion, width, height, variants, false));
  else if (p.x > width + size) p.x = -size;
  else if (p.x < -size) p.x = width + size;
}
