import { motion, useReducedMotion } from 'framer-motion';
import Section from '../layout/Section';
import ExperienceCard from '../ui/ExperienceCard';
import { resume } from '../../data/resume';
import { getSection } from '../../lib/getSection';
import { inView, jitterHard, staggerCard, staggerParent, still } from '../../lib/motion';

export default function Experience() {
  const { experience } = resume;
  const reduced = useReducedMotion();
  const current = experience.filter((job) => job.current).length;

  return (
    <Section
      meta={getSection('experience')}
      status={current > 0 ? '[STATUS: ACTIVE]' : `[${experience.length} RECORDS]`}
    >
      <motion.ol className="timeline" variants={staggerParent} {...inView}>
        {experience.map((job) => (
          <motion.li
            className="timeline__item clip-frame clip-corner"
            key={job.id}
            variants={reduced ? still : staggerCard}
            whileHover={reduced ? undefined : jitterHard}
          >
            <ExperienceCard job={job} />
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}
