import type { Transition, Variants } from 'framer-motion';

/**
 * One motion vocabulary for the whole site.
 *
 * The theme's rule: nothing eases in gently. Everything arrives fast, overshoots
 * slightly, and settles — the feel of a menu slamming into place rather than a
 * document fading in. Durations stay under ~350ms so the page never feels slow.
 *
 * Every consumer pairs these with `useReducedMotion()` and falls back to `still`,
 * because an aggressive jitter is exactly the kind of motion that hurts people
 * with vestibular disorders.
 */

/** Fast spring with visible overshoot — the signature "snap". */
export const snapSpring: Transition = {
  type: 'spring',
  stiffness: 620,
  damping: 17,
  mass: 0.6,
};

/** Slightly softer snap for large blocks so they don't wobble. */
export const settleSpring: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 26,
  mass: 0.7,
};

/** Section headers: snap in from the left, overshooting the resting position. */
export const snapInLeft: Variants = {
  hidden: { x: -64, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: snapSpring },
};

/** Hero lines: same idea, shorter throw, used under a stagger parent. */
export const snapInLeftShort: Variants = {
  hidden: { x: -28, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: snapSpring },
};

/** Parent for staggered card grids. High velocity, tight spacing. */
export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.04 },
  },
};

/** Child card: throws in from the left and slightly up, then settles. */
export const staggerCard: Variants = {
  hidden: { x: -34, y: 10, opacity: 0 },
  visible: { x: 0, y: 0, opacity: 1, transition: settleSpring },
};

/**
 * The glitch. A hard 4-keyframe translation over ~180ms — closer to a tracking
 * error on a VHS than a wobble. `times` front-loads the displacement so the
 * first hop reads as a single dropped frame.
 */
export const jitter = {
  x: [0, -3, 3, -1, 0],
  y: [0, 1, -1, 0.5, 0],
  transition: { duration: 0.18, times: [0, 0.2, 0.45, 0.7, 1], ease: 'linear' as const },
};

/** Same glitch, larger throw — for cards rather than inline links. */
export const jitterHard = {
  x: [0, -5, 5, -2, 0],
  y: [0, 2, -2, 1, 0],
  transition: { duration: 0.2, times: [0, 0.2, 0.45, 0.7, 1], ease: 'linear' as const },
};

/** Reduced-motion fallback: state changes, no travel. */
export const still: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

/**
 * Shared `whileInView` config so every section reveals on the same trigger.
 * `once` stops cards re-animating when the user scrolls back up.
 */
export const inView = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, amount: 0.2 },
};
