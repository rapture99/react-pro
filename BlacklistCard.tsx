import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Flame } from 'lucide-react';
import type { BlacklistRival } from '../../types/resume';
import { settleSpring, snapSpring } from '../../lib/motion';

const CHARACTER_SRC = '/blacklist/watermarked_img_8019737843156667790-Photoroom.png';
const CAR_SRC = '/blacklist/bmw_m3_gtr.png';

interface BlacklistCardProps {
  rival?: BlacklistRival;
  rank?: string;
  name?: string;
  role?: string;
  /** When given, the card becomes an activator for the Speedbreaker dossier. */
  onOpenDossier?: (rival: BlacklistRival) => void;
}

export default function BlacklistCard({ rival, rank, name, role, onOpenDossier }: BlacklistCardProps) {
  const activeRank = rival ? rival.rank : rank || '01';
  const activeName = rival ? rival.name : name || 'Nikhil Jathar';
  const activeRole = rival ? rival.role : role || 'Senior Full-Stack Developer';
  const activeAlias = rival ? rival.alias : 'RAZOR NIKHIL';
  const activeBounty = rival ? rival.bounty : '$15,450,000';
  const activeHeat = rival ? rival.heat : 5;

  const [hasCharacter, setHasCharacter] = useState(true);
  const [hasCar, setHasCar] = useState(true);
  const reduced = useReducedMotion();

  // Rival art comes from the data; project/character preview
  const carImgSrc = rival?.projectImg || rival?.carImg || CAR_SRC;
  const charImgSrc = rival?.characterImg || CHARACTER_SRC;
  const canOpen = Boolean(rival && onOpenDossier);

  return (
    <motion.aside
      className="blacklist blacklist--hero"
      aria-label={`Blacklist #01 Hero Card: ${activeName}`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={reduced ? { duration: 0.25 } : { ...settleSpring, delay: 0.15 }}
    >
      {/* Hover film-grain flicker — decorative, sits under every other layer */}
      <span className="blacklist__grain" aria-hidden="true" />

      {/* Rank badge, top-left */}
      <div className="blacklist__rank">
        <span className="blacklist__rank-label">Blacklist</span>
        <span className="blacklist__rank-num">#{activeRank}</span>
      </div>

      {/* Heat & Bounty tag top-right */}
      <div className="blacklist__bounty-tag">
        <span className="blacklist__heat">
          <Flame size={12} fill="currentColor" /> HEAT {activeHeat}
        </span>
        <span className="blacklist__bounty">{activeBounty}</span>
      </div>

      {/* MW2005 Iconic Graffiti Tag Overlay */}
      <div className="blacklist__graffiti">
        <div className="blacklist__graffiti-tag">RAZOR</div>
        <svg className="blacklist__graffiti-arrow" viewBox="0 0 100 40" fill="none">
          <path d="M10 5 Q50 35 90 20" stroke="var(--color-accent)" strokeWidth="2.5" strokeDasharray="4 2" />
          <polygon points="90,20 82,15 84,24" fill="var(--color-accent)" />
        </svg>
      </div>

      <div className="blacklist__stage" data-empty={!hasCharacter && !hasCar}>
        {/* Industrial Cranes & City Skyline Silhouette */}
        <div className="blacklist__industrial-bg" aria-hidden="true">
          <svg className="blacklist__skyline-svg" viewBox="0 0 400 200" preserveAspectRatio="none">
            <path d="M30 180 L30 40 L120 10 L150 180 M30 70 L120 10" stroke="rgba(255,215,0,0.18)" strokeWidth="2" fill="none" />
            <path d="M320 180 L320 50 L380 20 L400 180" stroke="rgba(255,215,0,0.14)" strokeWidth="2" fill="none" />
            <path d="M0 180 L40 140 L60 140 L70 120 L90 120 L100 180 L140 100 L180 100 L200 180 L240 110 L270 110 L290 180 L340 130 L380 130 L400 180 Z" fill="rgba(255,215,0,0.04)" />
          </svg>
        </div>

        <span className="blacklist__spot" aria-hidden="true" />

        {/* ── Car Slot ───────────────────────── */}
        <motion.div
          className="blacklist__car"
          initial={reduced ? false : { opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={reduced ? undefined : { ...settleSpring, delay: 0.25 }}
        >
          {hasCar ? (
            <img
              className="blacklist__car-img"
              src={carImgSrc}
              alt=""
              aria-hidden="true"
              onError={() => setHasCar(false)}
            />
          ) : (
            <div className="slot slot--car" role="presentation">
              <svg className="slot__svg-car" viewBox="0 0 300 120" fill="none" stroke="currentColor">
                <path
                  d="M20 80 L50 40 L120 30 L220 35 L280 65 L290 85 L270 95 L250 95 L240 85 L180 85 L170 95 L70 95 L60 85 L20 85 Z"
                  stroke="var(--color-accent)"
                  strokeWidth="3"
                  fill="rgba(255,215,0,0.06)"
                />
                <circle cx="75" cy="88" r="16" stroke="var(--color-accent)" strokeWidth="4" />
                <circle cx="225" cy="88" r="16" stroke="var(--color-accent)" strokeWidth="4" />
                <path d="M70 42 L120 34 L170 42 L160 60 L60 60 Z" fill="rgba(255,215,0,0.15)" stroke="var(--color-accent)" />
              </svg>
              <span className="slot__label">{rival?.ride || 'BMW M3 GTR'}</span>
              <code className="slot__path">{carImgSrc}</code>
            </div>
          )}
        </motion.div>

        {/* ── Character Slot ───────────────────────── */}
        <motion.div
          className="blacklist__character"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? undefined : { ...snapSpring, delay: 0.2 }}
        >
          {hasCharacter ? (
            <img
              className="blacklist__character-img"
              src={charImgSrc}
              alt=""
              aria-hidden="true"
              onError={() => setHasCharacter(false)}
            />
          ) : (
            <div className="slot slot--character" role="presentation">
              <svg className="slot__svg-driver" viewBox="0 0 100 160" fill="none" stroke="currentColor">
                <circle cx="50" cy="35" r="22" stroke="var(--color-accent)" strokeWidth="3" fill="rgba(255,215,0,0.08)" />
                <path d="M15 150 C15 90, 85 90, 85 150" stroke="var(--color-accent)" strokeWidth="3" fill="rgba(255,215,0,0.12)" />
              </svg>
              <span className="slot__label">{activeAlias}</span>
              <code className="slot__path">{charImgSrc}</code>
            </div>
          )}
        </motion.div>
      </div>

      {/* Clean Centered Dossier Plate */}
      <div className="blacklist__plate">
        <span className="blacklist__plate-alias">{activeAlias}</span>
        <span className="blacklist__plate-name">{activeName}</span>
        <span className="blacklist__plate-role">{activeRole}</span>
      </div>

      {/* Only rivals have a dossier to open; the hero card stays inert. */}
      {canOpen && (
        <button
          type="button"
          className="blacklist__dossier-btn"
          onClick={() => onOpenDossier!(rival!)}
        >
          OPEN DOSSIER
        </button>
      )}

      <span className="blacklist__stripes" aria-hidden="true" />
    </motion.aside>
  );
}
