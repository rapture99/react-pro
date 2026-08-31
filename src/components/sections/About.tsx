import Section from '../layout/Section';
import { resume } from '../../data/resume';
import { getSection } from '../../lib/getSection';

export default function About() {
  const { profile } = resume;

  return (
    <Section meta={getSection('about')}>
      <div className="about">
        <p className="about__summary">{profile.summary}</p>
      </div>
    </Section>
  );
}
