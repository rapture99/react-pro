import { motion, useReducedMotion } from 'framer-motion';
import { Gauge, ShieldAlert } from 'lucide-react';
import HeroM3Showcase from '../ui/HeroM3Showcase';
import N2OButton from '../ui/N2OButton';
import { resume } from '../../data/resume';
import { snapInLeftShort, staggerParent, still } from '../../lib/motion';

export default function Hero() {
  const { profile } = resume;
  const reduced = useReducedMotion();
  const line = reduced ? still : snapInLeftShort;

  return (
    <section className="hero" id="top" aria-labelledby="hero-name">
      <div className="container hero__inner">
        {/* Left Column: Driver Info & CTAs */}
        <motion.div
          className="hero__content"
          variants={staggerParent}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="hero__eyebrow" variants={line}>
            <ShieldAlert size={14} style={{ display: 'inline', verticalAlign: '-2px', color: 'var(--color-accent)' }} /> // MOST WANTED #01 DRIVER
          </motion.p>

          <motion.h1 className="hero__name" id="hero-name" variants={line}>
            {profile.name}
          </motion.h1>

          <motion.p className="hero__role" variants={line}>
            {profile.role}
          </motion.p>

          <motion.p className="hero__location" variants={line}>
            <Gauge
              size={14}
              strokeWidth={2.5}
              style={{ display: 'inline', verticalAlign: '-2px' }}
            />{' '}
            {profile.location} — Rockport City District
          </motion.p>

          <motion.div className="hero__actions" variants={line}>
            <N2OButton href="#contact" variant="primary">
              CHALLENGE / COMMS
            </N2OButton>

            <N2OButton href="#projects" variant="ghost">
              THE BLACKLIST
            </N2OButton>
          </motion.div>
        </motion.div>

        {/* Right Column: BMW M3 GTR 3D parallax showcase */}
        <div className="hero__showcase">
          <HeroM3Showcase />
        </div>
      </div>
    </section>
  );
}
