import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Gauge, Flame, ExternalLink, GitBranch } from 'lucide-react';
import type { BlacklistRival } from '../../types/resume';
import { playSpeedbreakerSound, playHudClickSound } from '../../lib/audio';

interface SpeedbreakerModalProps {
  rival: BlacklistRival | null;
  onClose: () => void;
}

/** Bullet-time: overshoot on the way in, so it lands rather than fades. */
const SPEEDBREAKER_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The Speedbreaker dossier — a rival opens in slow motion behind a sepia time-dilation
 * wash.
 *
 * Rendered through a portal onto `document.body` rather than inline, because the card
 * that opens it sits inside a `transform`ed, `overflow`-clipped grid: a `position: fixed`
 * overlay nested inside a transformed ancestor is positioned against that ancestor, not
 * the viewport, so it would be cropped to the card it came from.
 *
 * While open, body scroll is locked and focus is moved into the dialog, with Escape and
 * a backdrop click both closing — the keyboard paths a mouse user never notices and a
 * keyboard user is stuck without.
 */
export default function SpeedbreakerModal({ rival, onClose }: SpeedbreakerModalProps) {
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const isOpen = rival !== null;

  const close = useCallback(() => {
    playHudClickSound();
    onClose();
  }, [onClose]);

  // Time-warp sting on open.
  useEffect(() => {
    if (isOpen) playSpeedbreakerSound();
  }, [isOpen]);

  // Escape to dismiss, and lock the page behind the dialog so the backdrop cannot scroll.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  const details = rival?.projectDetails;

  return createPortal(
    <AnimatePresence>
      {rival && (
        <motion.div
          className="speedbreaker"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.15 : 0.32 }}
          onClick={close}
          role="presentation"
        >
          <div className="speedbreaker__wash" aria-hidden="true" />

          <motion.div
            className="speedbreaker__panel"
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={`Blacklist #${rival.rank} dossier: ${rival.name}`}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduced
                ? { opacity: 0, transition: { duration: 0.12 } }
                : // Bullet-time is for the entrance. Dismissal wants to get out of the
                  // way immediately — running the same 0.72s easing on exit left the
                  // dialog hanging on screen for most of a second after Escape.
                  { opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.2, ease: 'easeIn' } }
            }
            transition={reduced ? { duration: 0.15 } : { duration: 0.72, ease: SPEEDBREAKER_EASE }}
            onClick={(event) => event.stopPropagation()}
          >
            <button className="speedbreaker__close" onClick={close} aria-label="Close dossier">
              <X size={18} strokeWidth={3} />
            </button>

            <header className="speedbreaker__header">
              <div className="speedbreaker__rank">
                <span className="speedbreaker__rank-label">BLACKLIST</span>
                <span className="speedbreaker__rank-num">#{rival.rank}</span>
              </div>

              <div className="speedbreaker__ident">
                <span className="speedbreaker__alias">{rival.alias}</span>
                <h3 className="speedbreaker__name">{rival.name}</h3>
                <span className="speedbreaker__role">{rival.role}</span>
              </div>

              <div className="speedbreaker__bounty-block">
                <span className="speedbreaker__heat">
                  <Flame size={12} fill="currentColor" /> HEAT {rival.heat}
                </span>
                <span className="speedbreaker__bounty">{rival.bounty}</span>
              </div>
            </header>

            {(rival.projectImg || rival.carImg) && (
              <div className="speedbreaker__car">
                <img src={rival.projectImg || rival.carImg} alt="" aria-hidden="true" />
                <span className="speedbreaker__car-tag">{rival.ride}</span>
              </div>
            )}

            <div className="speedbreaker__body">
              <p className="speedbreaker__overview">{details?.overview ?? rival.bio}</p>

              {details?.keyFeatures?.length ? (
                <div className="speedbreaker__block">
                  <h4 className="speedbreaker__block-title">MODIFICATIONS INSTALLED</h4>
                  <ul className="speedbreaker__features">
                    {details.keyFeatures.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {details?.challengesSolved && (
                <div className="speedbreaker__block">
                  <h4 className="speedbreaker__block-title">PURSUIT BROKEN</h4>
                  <p className="speedbreaker__challenge">{details.challengesSolved}</p>
                </div>
              )}

              <div className="speedbreaker__block">
                <h4 className="speedbreaker__block-title">
                  <Gauge size={13} /> PERFORMANCE
                </h4>
                <div className="speedbreaker__stats">
                  {(
                    [
                      ['TOP SPEED', rival.stats.topSpeed],
                      ['ACCELERATION', rival.stats.acceleration],
                      ['HANDLING', rival.stats.handling],
                      ['NITRO', rival.stats.nitro],
                    ] as const
                  ).map(([label, value]) => (
                    <div className="tuner-bar" key={label}>
                      <span className="tuner-bar__label">{label}</span>
                      <div className="tuner-bar__track">
                        <motion.div
                          className={`tuner-bar__fill ${label === 'NITRO' ? 'tuner-bar__fill--nos' : ''}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: reduced ? 0.2 : 0.9, ease: SPEEDBREAKER_EASE, delay: 0.15 }}
                        />
                      </div>
                      <span className="tuner-bar__val">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {details?.performanceMetric && (
                <div className="speedbreaker__metric">{details.performanceMetric}</div>
              )}

              <div className="speedbreaker__chips">
                {rival.techStack.map((tech) => (
                  <span key={tech} className="skill-group__chip">
                    {tech}
                  </span>
                ))}
              </div>

              {(details?.liveUrl || details?.githubUrl) && (
                <div className="speedbreaker__links">
                  {details.liveUrl && (
                    <a className="speedbreaker__link" href={details.liveUrl} target="_blank" rel="noreferrer">
                      <ExternalLink size={14} /> LIVE RUN
                    </a>
                  )}
                  {details.githubUrl && (
                    <a className="speedbreaker__link" href={details.githubUrl} target="_blank" rel="noreferrer">
                      <GitBranch size={14} /> SOURCE
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
