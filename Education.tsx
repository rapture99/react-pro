import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import Section from '../layout/Section';
import { resume } from '../../data/resume';
import { getSection } from '../../lib/getSection';
import { inView, jitterHard, staggerCard, staggerParent, still } from '../../lib/motion';

export default function Education() {
  const { education } = resume;
  const reduced = useReducedMotion();

  return (
    <Section meta={getSection('education')} status={`[${education.length} RECORDS]`}>
      <motion.ul className="education" variants={staggerParent} {...inView}>
        {education.map((entry) => (
          <motion.li
            className="education__item clip-frame clip-corner-sm"
            key={entry.id}
            variants={reduced ? still : staggerCard}
            whileHover={reduced ? undefined : jitterHard}
          >
            <article className="edu-card">
              <h3 className="edu-card__degree">
                <GraduationCap
                  size={15}
                  strokeWidth={2.5}
                  style={{ display: 'inline', verticalAlign: '-2px', marginRight: 8 }}
                  aria-hidden="true"
                />
                {entry.degree}
              </h3>
              <p className="edu-card__institution">{entry.institution}</p>
              <p className="edu-card__location">{entry.location}</p>
              <p className="edu-card__dates">
                <time>{entry.startDate}</time>
                <span className="edu-card__dash"> &ndash; </span>
                <time>{entry.endDate}</time>
              </p>
            </article>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
