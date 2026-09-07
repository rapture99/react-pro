import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { resume } from '../../data/resume';
import { jitter } from '../../lib/motion';

const ICON = {
  email: Mail,
  phone: Phone,
  linkedin: ExternalLink,
  location: MapPin,
} as const;

export default function Footer() {
  const { profile } = resume;
  const reduced = useReducedMotion();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p className="site-footer__copy">
          &copy; {new Date().getFullYear()} {profile.name} &nbsp;//&nbsp; END_OF_LINE
        </p>

        <ul className="site-footer__links">
          {profile.links
            .filter((link) => link.kind !== 'location')
            .map((link) => {
              const Icon = ICON[link.kind];

              return (
                <li className="site-footer__item" key={link.id}>
                  <motion.a
                    className="site-footer__link"
                    href={link.href}
                    data-kind={link.kind}
                    target={link.kind === 'linkedin' ? '_blank' : undefined}
                    rel={link.kind === 'linkedin' ? 'noreferrer' : undefined}
                    whileHover={reduced ? undefined : jitter}
                  >
                    <Icon size={14} strokeWidth={2.5} aria-hidden="true" />
                    {link.label}
                  </motion.a>
                </li>
              );
            })}
        </ul>
      </div>
    </footer>
  );
}
