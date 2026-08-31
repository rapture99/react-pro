import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight, Gauge } from 'lucide-react';
import BlacklistCard from '../ui/BlacklistCard';
import { resume } from '../../data/resume';
import { jitter, snapInLeftShort, staggerParent, still } from '../../lib/motion';

export default function Hero() {
  const { profile } = resume;
  const reduced = useReducedMotion();
  const line = reduced ? still : snapInLeftShort;

  return (
    <section className="hero" id="top" aria-labelledby="hero-name">
      <div className="container hero__inner">
        {/* Each line is a stagger child, so the block reads top-to-bottom at speed. */}
        <motion.div
          className="hero__content"
          variants={staggerParent}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="hero__eyebrow" variants={line}>
            Hello, I&apos;m
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
            {profile.location}
          </motion.p>

          <motion.div className="hero__actions" variants={line}>
            <motion.a
              className="hero__cta hero__cta--primary"
              href="#contact"
              whileHover={reduced ? undefined : jitter}
            >
              Get in touch
              <ChevronRight size={16} strokeWidth={3} />
            </motion.a>

            <motion.a
              className="hero__cta hero__cta--secondary"
              href="#experience"
              whileHover={reduced ? undefined : jitter}
            >
              View experience
              <ChevronRight size={16} strokeWidth={3} />
            </motion.a>
          </motion.div>
        </motion.div>

        <div className="hero__showcase">
          <BlacklistCard rank="01" name={profile.name} role={profile.role} />
        </div>
      </div>
    </section>
  );
}
