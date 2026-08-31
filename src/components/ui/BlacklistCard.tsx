import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Car, UserRound } from 'lucide-react';
import { settleSpring, snapSpring } from '../../lib/motion';

/**
 * Blacklist dossier — the MW2005 rival card.
 *
 * Two image slots, both empty until you drop files in. Put transparent PNGs at:
 *
 *   public/blacklist/character.png   → the cutout, standing pose, no background
 *   public/blacklist/car.png         → the car, side-on or 3/4, no background
 *
 * Nothing else needs changing: each slot renders a marked placeholder while the
 * file is absent and swaps itself in automatically once it exists. Both are
 * decorative, so they carry empty alt text and stay out of the reading order.
 */
const CHARACTER_SRC = '/blacklist/character.png';
const CAR_SRC = '/blacklist/car.png';

interface BlacklistCardProps {
  /** Rank shown in the corner badge — "01" is the top of the Blacklist. */
  rank?: string;
  name: string;
  role: string;
}

export default function BlacklistCard({ rank = '01', name, role }: BlacklistCardProps) {
  // A missing file 404s and fires onError; that flips the slot to its placeholder
  // rather than leaving a broken-image glyph on the page.
  const [hasCharacter, setHasCharacter] = useState(true);
  const [hasCar, setHasCar] = useState(true);
  const reduced = useReducedMotion();

  return (
    <motion.aside
      className="blacklist"
      aria-label={`Blacklist dossier: ${name}`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: 70 }}
      animate={{ opacity: 1, x: 0 }}
      transition={reduced ? { duration: 0.25 } : { ...settleSpring, delay: 0.15 }}
    >
      {/* Rank badge, top-right, angled off the frame. */}
      <div className="blacklist__rank">
        <span className="blacklist__rank-label">Blacklist</span>
        <span className="blacklist__rank-num">#{rank}</span>
      </div>

      {/*
        With real art the figure stands IN FRONT of the car, so they overlap by
        design. Two placeholders overlapping just looks broken, so the empty
        state stacks them instead — see the [data-empty] rules in the CSS.
      */}
      <div className="blacklist__stage" data-empty={!hasCharacter && !hasCar}>
        {/* Spotlight + floor shadow sit behind both cutouts. */}
        <span className="blacklist__spot" aria-hidden="true" />

        {/* ── Car: sits behind and below the figure ───────────────────────── */}
        <motion.div
          className="blacklist__car"
          initial={reduced ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={reduced ? undefined : { ...settleSpring, delay: 0.3 }}
        >
          {hasCar ? (
            <img
              className="blacklist__car-img"
              src={CAR_SRC}
              alt=""
              aria-hidden="true"
              onError={() => setHasCar(false)}
            />
          ) : (
            <div className="slot slot--car" role="presentation">
              <Car size={28} strokeWidth={1.75} aria-hidden="true" />
              <span className="slot__label">CAR</span>
              <code className="slot__path">{CAR_SRC}</code>
            </div>
          )}
        </motion.div>

        {/* ── Character: the cutout, foreground ───────────────────────────── */}
        <motion.div
          className="blacklist__character"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? undefined : { ...snapSpring, delay: 0.22 }}
        >
          {hasCharacter ? (
            <img
              className="blacklist__character-img"
              src={CHARACTER_SRC}
              alt=""
              aria-hidden="true"
              onError={() => setHasCharacter(false)}
            />
          ) : (
            <div className="slot slot--character" role="presentation">
              <UserRound size={34} strokeWidth={1.5} aria-hidden="true" />
              <span className="slot__label">CHARACTER CUTOUT</span>
              <code className="slot__path">{CHARACTER_SRC}</code>
            </div>
          )}
        </motion.div>
      </div>

      {/* Dossier plate along the bottom edge. */}
      <div className="blacklist__plate">
        <span className="blacklist__plate-name">{name}</span>
        <span className="blacklist__plate-role">{role}</span>
      </div>

      <span className="blacklist__stripes" aria-hidden="true" />
    </motion.aside>
  );
}
