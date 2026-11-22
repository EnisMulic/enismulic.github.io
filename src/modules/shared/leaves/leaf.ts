// How a single leaf moves. Ported from falling-leaves by ernkerr (MIT): https://github.com/ernkerr/falling-leaves

// A [min, max] range; each leaf picks its own value from it
export type Range = [number, number];

export interface Motion {
  // Leaf size in CSS pixels
  size: Range;
  // Fall speed in pixels per frame at 60fps
  speed: Range;
  // Steady sideways drift in pixels per frame; negative blows left
  wind: Range;
  // How far leaves swing side to side, in pixels per frame
  sway: Range;
  // Spin in degrees per frame
  rotationSpeed: Range;
}

// How a kind of leaf moves, relative to Motion: multipliers, plus how many degrees it tilts as it swings
export interface MotionProfile {
  sway: number;
  swayFreq: number;
  spin: number;
  flip: number;
  rock: number;
}

export const DEFAULT_PROFILE: MotionProfile = { sway: 1, swayFreq: 1, spin: 1, flip: 1, rock: 0 };

// A leaf keeps random factors between 0 and 1 (the r* fields) rather than final values
export interface Leaf {
  x: number;
  y: number;
  rotation: number;
  // Where the leaf is in its side-to-side swing and in its tumble (a fake 3D flip), in radians
  swayPhase: number;
  flipPhase: number;
  // Which sprite the leaf uses
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

// A new leaf. With `anywhere` it starts at a random height, so the screen is already full on the first frame;
// otherwise it starts just above the top.
export function createLeaf(motion: Motion, width: number, height: number, variants: number, anywhere: boolean): Leaf {
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

// Moves a leaf on by `dt` frames (1 is one frame at 60fps). A leaf that falls off the bottom starts again at the
// top as a new leaf; one that drifts off a side comes back on the other.
export function stepLeaf(leaf: Leaf, dt: number, motion: Motion, width: number, height: number, variants: number, profile: MotionProfile) {
  const size = pick(motion.size, leaf.rSize);
  leaf.swayPhase += (0.01 + leaf.rSwayFreq * 0.02) * profile.swayFreq * dt;
  leaf.flipPhase += (0.02 + leaf.rFlipFreq * 0.04) * profile.flip * dt;

  const sway = Math.sin(leaf.swayPhase) * pick(motion.sway, leaf.rSway) * profile.sway;
  leaf.x += (pick(motion.wind, leaf.rWind) + sway) * dt;
  // Leaves slow down at the ends of each swing, like a real leaf rocking as it falls
  const flutter = 0.6 + 0.4 * Math.abs(Math.cos(leaf.swayPhase));
  leaf.y += pick(motion.speed, leaf.rSpeed) * flutter * dt;
  leaf.rotation += pick(motion.rotationSpeed, leaf.rRotation) * profile.spin * dt;

  if (leaf.y - size > height) Object.assign(leaf, createLeaf(motion, width, height, variants, false));
  else if (leaf.x > width + size) leaf.x = -size;
  else if (leaf.x < -size) leaf.x = width + size;
}
