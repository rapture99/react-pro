import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { SectionMeta } from '../../types/resume';
import { inView, snapInLeft, still } from '../../lib/motion';

interface SectionProps {
  meta: SectionMeta;
  children: ReactNode;
  /** Extra modifier class for the styling pass, e.g. "section--tight". */
  modifier?: string;
  /** Right-hand HUD marker, e.g. "[STATUS: ACTIVE]". */
  status?: string;
}

/**
 * Every section shares this shell so heading rhythm and spacing
 * can be restyled in one place.
 *
 * The header snaps in from the left with an overshoot the first time it scrolls
 * into view, and carries two industrial markers: `// SECTION_0N` on the left
 * (built from `meta.eyebrow`, which the data already numbers 01–05) and an
 * optional status readout on the right.
 */
export default function Section({ meta, children, modifier, status }: SectionProps) {
  const headingId = `${meta.id}-heading`;
  const reduced = useReducedMotion();

  return (
    <section
      className={`section section--${meta.id}${modifier ? ` ${modifier}` : ''}`}
      id={meta.id}
      aria-labelledby={headingId}
    >
      <div className="container section__inner">
        <motion.header
          className="section__header"
          variants={reduced ? still : snapInLeft}
          {...inView}
        >
          {meta.eyebrow && (
            <span className="section__eyebrow">{`// SECTION_${meta.eyebrow}`}</span>
          )}

          <h2 className="section__heading" id={headingId}>
            {meta.heading}
          </h2>

          {status && <span className="section__status tag">{status}</span>}
        </motion.header>

        <div className="section__body">{children}</div>
      </div>
    </section>
  );
}
