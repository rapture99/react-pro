import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import type { ContactLink } from '../../types/resume';
import { inView, jitterHard, staggerCard, staggerParent, still } from '../../lib/motion';

interface ContactListProps {
  links: ContactLink[];
}

/**
 * `kind` already exists on the data purely as an icon hook — the original type
 * says so. Lucide v1 dropped brand marks (no LinkedIn glyph), so the external
 * profile falls back to a generic external-link icon.
 */
const ICON = {
  email: Mail,
  phone: Phone,
  linkedin: ExternalLink,
  location: MapPin,
} as const;

export default function ContactList({ links }: ContactListProps) {
  const reduced = useReducedMotion();

  return (
    <motion.ul className="contact-list" variants={staggerParent} {...inView}>
      {links.map((link) => {
        const isExternal = link.kind === 'linkedin';
        const isStatic = link.href === '#';
        const Icon = ICON[link.kind];

        return (
          <motion.li
            className="contact-list__item clip-corner-sm"
            key={link.id}
            data-kind={link.kind}
            variants={reduced ? still : staggerCard}
            whileHover={reduced ? undefined : jitterHard}
          >
            <span className="contact-list__icon" aria-hidden="true">
              <Icon size={18} strokeWidth={2.5} />
            </span>

            <span className="contact-list__text">
              <span className="contact-list__label">{link.label}</span>

              {isStatic ? (
                <span className="contact-list__value">{link.value}</span>
              ) : (
                <a
                  className="contact-list__value contact-list__value--link"
                  href={link.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                >
                  {link.value}
                </a>
              )}
            </span>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
