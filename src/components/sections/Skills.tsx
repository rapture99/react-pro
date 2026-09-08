import { motion, useReducedMotion } from 'framer-motion';
import Section from '../layout/Section';
import SkillGroupCard from '../ui/SkillGroupCard';
import { resume } from '../../data/resume';
import { getSection } from '../../lib/getSection';
import { inView, jitterHard, staggerCard, staggerParent, still } from '../../lib/motion';

export default function Skills() {
  const { skills } = resume;
  const reduced = useReducedMotion();

  return (
    <Section meta={getSection('skills')} status={`[${skills.length} STACKS LOADED]`}>
      <motion.ul className="skills" variants={staggerParent} {...inView}>
        {skills.map((group) => (
          <motion.li
            className="skills__item clip-frame clip-corner-sm"
            key={group.id}
            variants={reduced ? still : staggerCard}
            whileHover={reduced ? undefined : jitterHard}
          >
            <SkillGroupCard group={group} />
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
