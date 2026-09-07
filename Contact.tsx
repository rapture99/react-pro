import Section from '../layout/Section';
import ContactList from '../ui/ContactList';
import { resume } from '../../data/resume';
import { getSection } from '../../lib/getSection';

export default function Contact() {
  const { profile } = resume;

  return (
    <Section
      meta={getSection('contact')}
      modifier="section--last"
      status="[STATUS: OPEN TO WORK]"
    >
      <div className="contact">
        <p className="contact__lead">
          Open to conversations about full-stack roles, freelance work, and
          interesting engineering problems.
        </p>

        <ContactList links={profile.links} />
      </div>
    </Section>
  );
}
