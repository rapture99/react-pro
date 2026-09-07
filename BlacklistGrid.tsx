import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Flame, ChevronRight } from 'lucide-react';
import type { BlacklistRival } from '../../types/resume';
import { inView, staggerParent, staggerCard, still } from '../../lib/motion';
import { playRevSound, playHudClickSound } from '../../lib/audio';

interface BlacklistGridProps {
  rivals: BlacklistRival[];
  onSelect: (rival: BlacklistRival) => void;
}

/**
 * The Blacklist wall: one distressed dossier tile per rival.
 *
 * Each tile is a real `<button>`. They behave like cards, but every one of them opens a
 * dialog, so they need to be focusable, Enter/Space-activatable and announced as
 * controls — a `<div onClick>` here would leave the whole section unreachable by
 * keyboard.
 *
 * The engine rev fires on pointer enter rather than on React's `onMouseEnter`-per-child
 * so a touch user dragging past the grid does not trigger a burst of overlapping
 * oscillators.
 */
export default function BlacklistGrid({ rivals, onSelect }: BlacklistGridProps) {
  const reduced = useReducedMotion();
  const [failedArt, setFailedArt] = useState<Record<string, boolean>>({});

  const handleSelect = (rival: BlacklistRival) => {
    playHudClickSound();
    onSelect(rival);
  };

  return (
    <motion.ul
      className="bl-grid"
      variants={reduced ? undefined : staggerParent}
      {...(reduced ? {} : inView)}
    >
      {rivals.map((rival) => {
        const artBroken = failedArt[rival.id];
        return (
          <motion.li key={rival.id} className="bl-grid__item" variants={reduced ? still : staggerCard}>
            <button
              type="button"
              className="bl-card"
              onClick={() => handleSelect(rival)}
              onPointerEnter={(event) => {
                if (event.pointerType === 'mouse') playRevSound(0.9 + rival.heat * 0.06);
              }}
              aria-label={`Open dossier for Blacklist #${rival.rank}, ${rival.name}`}
            >
              {/* Film grain + motion streak, both purely decorative */}
              <span className="bl-card__grain" aria-hidden="true" />
              <span className="bl-card__streak" aria-hidden="true" />

              <span className="bl-card__rank">
                <span className="bl-card__rank-label">BLACKLIST</span>
                <span className="bl-card__rank-num">#{rival.rank}</span>
              </span>

              <span className="bl-card__art">
                {(rival.projectImg || rival.carImg) && !artBroken ? (
                  <img
                    src={rival.projectImg || rival.carImg}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    onError={() => setFailedArt((prev) => ({ ...prev, [rival.id]: true }))}
                  />
                ) : (
                  <span className="bl-card__art-fallback" aria-hidden="true">
                    <svg viewBox="0 0 300 120" fill="none">
                      <path
                        d="M20 80 L50 40 L120 30 L220 35 L280 65 L290 85 L270 95 L250 95 L240 85 L180 85 L170 95 L70 95 L60 85 L20 85 Z"
                        stroke="var(--color-accent)"
                        strokeWidth="3"
                        fill="rgba(255,215,0,0.06)"
                      />
                      <circle cx="75" cy="88" r="16" stroke="var(--color-accent)" strokeWidth="4" />
                      <circle cx="225" cy="88" r="16" stroke="var(--color-accent)" strokeWidth="4" />
                    </svg>
                  </span>
                )}
                <span className="bl-card__heat">
                  <Flame size={11} fill="currentColor" /> {rival.heat}
                </span>
              </span>

              <span className="bl-card__body">
                <span className="bl-card__alias">{rival.alias}</span>
                <span className="bl-card__name">{rival.name}</span>
                <span className="bl-card__role">{rival.role}</span>
                <span className="bl-card__ride">{rival.ride}</span>

                <span className="bl-card__chips">
                  {rival.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="bl-card__chip">
                      {tech}
                    </span>
                  ))}
                  {rival.techStack.length > 3 && (
                    <span className="bl-card__chip bl-card__chip--more">+{rival.techStack.length - 3}</span>
                  )}
                </span>
              </span>

              <span className="bl-card__footer">
                <span className="bl-card__bounty">{rival.bounty}</span>
                <span className="bl-card__open">
                  DOSSIER <ChevronRight size={14} strokeWidth={3} />
                </span>
              </span>
            </button>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
