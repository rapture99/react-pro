import { motion, useReducedMotion } from 'framer-motion';
import { Zap } from 'lucide-react';
import EaTraxPlayer from '../ui/EaTraxPlayer';
import { resume } from '../../data/resume';
import { jitter, snapSpring } from '../../lib/motion';

export default function Header() {
  const { profile, sections } = resume;
  const reduced = useReducedMotion();

  return (
    <motion.header
      className="site-header"
      initial={reduced ? { opacity: 0 } : { y: -68, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={reduced ? { duration: 0.2 } : snapSpring}
    >
      <div className="container site-header__inner">
        <a className="site-header__brand" href="#top">
          <span className="site-header__brand-mark" aria-hidden="true">
            <Zap size={18} strokeWidth={2.5} />
          </span>
          {profile.name}
        </a>

        <nav className="site-nav" aria-label="Primary">
          <ul className="site-nav__list">
            {sections.map((section) => (
              <li className="site-nav__item" key={section.id}>
                <motion.a
                  className="site-nav__link"
                  href={`#${section.id}`}
                  whileHover={reduced ? undefined : jitter}
                >
                  {section.navLabel}
                </motion.a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__right">
          <EaTraxPlayer />
          <span className="site-header__status tag tag--live">[STATUS: ACTIVE]</span>
        </div>
      </div>
    </motion.header>
  );
}
