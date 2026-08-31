import { resume } from '../data/resume';
import type { SectionMeta } from '../types/resume';

/**
 * Look up section metadata (heading, eyebrow, nav label) by id.
 * Falls back to a generated stub so a missing entry never blanks the page.
 */
export function getSection(id: string): SectionMeta {
  const found = resume.sections.find((section) => section.id === id);

  if (found) {
    return found;
  }

  return { id, navLabel: id, heading: id };
}
