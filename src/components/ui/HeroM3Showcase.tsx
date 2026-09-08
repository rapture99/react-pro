import { useCallback, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Flame, ShieldAlert } from 'lucide-react';

const CHARACTER_SRC = '/blacklist/watermarked_img_8019737843156667790-Photoroom.png';

/** Soft spring so the character trails the cursor rather than snapping to it. */
const FOLLOW = { stiffness: 140, damping: 18, mass: 0.55 } as const;

/**
 * The Hero Character Showcase:
 * Features Nikhil Jathar as Most Wanted #01 Driver sitting on a Rockport-yellow
 * atmospheric backdrop with 3D cursor tilt parallax, speed lines, and smoke effects.
 */
export default function HeroM3Showcase() {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [hasCharacter, setHasCharacter] = useState(true);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, FOLLOW);
  const sy = useSpring(py, FOLLOW);

  const rotateY = useTransform(sx, [-0.5, 0.5], [12, -12]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-8, 8]);
  const charX = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const charY = useTransform(sy, [-0.5, 0.5], [-10, 10]);
  const shadowX = useTransform(sx, [-0.5, 0.5], [24, -24]);
  const shadowScale = useTransform(sx, [-0.5, 0.5], [1.06, 0.94]);
  const linesX = useTransform(sx, [-0.5, 0.5], [35, -35]);
  const gridX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const gridY = useTransform(sy, [-0.5, 0.5], [-8, 8]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduced) return;
      const bounds = stageRef.current?.getBoundingClientRect();
      if (!bounds) return;
      px.set((event.clientX - bounds.left) / bounds.width - 0.5);
      py.set((event.clientY - bounds.top) / bounds.height - 0.5);
    },
    [px, py, reduced],
  );

  const handlePointerLeave = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  // Fixed per mount so the drift does not resynchronise on every render.
  const smoke = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        left: 10 + i * 15,
        size: 70 + ((i * 35) % 80),
        delay: (i * 0.9) % 5,
        duration: 6 + ((i * 1.6) % 4),
      })),
    [],
  );

  return (
    <div
      className="m3-showcase"
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label="Most Wanted #01 Character Showcase: Nikhil Jathar"
    >
      {/* Corner badge */}
      <div className="m3-showcase__top-tag">
        <ShieldAlert size={12} />
        <span>MOST WANTED #01</span>
      </div>

      {/* Rockport backdrop: sepia wash, speed grid, asphalt grit */}
      <div className="m3-showcase__backdrop" aria-hidden="true">
        <motion.div className="m3-showcase__grid" style={reduced ? undefined : { x: gridX, y: gridY }} />
        <div className="m3-showcase__grit" />
        <div className="m3-showcase__ambient-glow" />
        <motion.div className="m3-showcase__lines" style={reduced ? undefined : { x: linesX }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="m3-showcase__line" style={{ top: `${15 + i * 16}%`, animationDelay: `${i * 0.4}s` }} />
          ))}
        </motion.div>

        {!reduced && (
          <div className="m3-showcase__smoke">
            {smoke.map((puff) => (
              <span
                key={puff.id}
                className="m3-showcase__puff"
                style={{
                  left: `${puff.left}%`,
                  width: puff.size,
                  height: puff.size,
                  animationDelay: `${puff.delay}s`,
                  animationDuration: `${puff.duration}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* The character cutout, tilting in 3D */}
      <motion.div
        className="m3-showcase__stage"
        style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      >
        <motion.div
          className="m3-showcase__ground"
          style={reduced ? undefined : { x: shadowX, scaleX: shadowScale }}
          aria-hidden="true"
        />

        <motion.div
          className="m3-showcase__character"
          style={reduced ? undefined : { x: charX, y: charY }}
        >
          {hasCharacter ? (
            <img
              className="m3-showcase__character-img"
              src={CHARACTER_SRC}
              alt="Nikhil Jathar — Most Wanted #01 Driver"
              onError={() => setHasCharacter(false)}
            />
          ) : (
            <div className="m3-showcase__fallback" role="presentation">
              <svg viewBox="0 0 120 180" fill="none" aria-hidden="true">
                <circle cx="60" cy="40" r="24" stroke="var(--color-accent)" strokeWidth="3" fill="rgba(255,215,0,0.1)" />
                <path d="M20 170 C20 100, 100 100, 100 170" stroke="var(--color-accent)" strokeWidth="3" fill="rgba(255,215,0,0.15)" />
              </svg>
              <span className="m3-showcase__fallback-label">RAZOR NIKHIL</span>
              <code className="m3-showcase__fallback-path">{CHARACTER_SRC}</code>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Dossier plate */}
      <div className="m3-showcase__plate">
        <span className="m3-showcase__plate-rank">BLACKLIST #01</span>
        <span className="m3-showcase__plate-alias">RAZOR NIKHIL</span>
        <span className="m3-showcase__plate-heat">
          <Flame size={12} fill="currentColor" /> HEAT 5
        </span>
      </div>
    </div>
  );
}
