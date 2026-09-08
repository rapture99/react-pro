import { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import Section from '../layout/Section';
import BlacklistGrid from '../ui/BlacklistGrid';
import BlacklistBrowser from '../ui/BlacklistBrowser';
import SpeedbreakerModal from '../ui/SpeedbreakerModal';
import { resume } from '../../data/resume';
import { getSection } from '../../lib/getSection';
import { playHudClickSound } from '../../lib/audio';
import type { BlacklistRival } from '../../types/resume';

type View = 'grid' | 'list';

/**
 * "The Blacklist 15" — the portfolio, dressed as the rival roster.
 *
 * Two views over one dataset: a grid of dossier tiles, and the existing browser (rank
 * list + hero card + tech specs). The selected rival for the Speedbreaker dialog is
 * owned here rather than inside the grid, so switching views never strands an open
 * dossier or loses which rival was being read.
 */
export default function Projects() {
  const { blacklist } = resume;
  const [view, setView] = useState<View>('grid');
  const [openRival, setOpenRival] = useState<BlacklistRival | null>(null);

  const switchView = (next: View) => {
    if (next === view) return;
    playHudClickSound();
    setView(next);
  };

  return (
    <Section meta={getSection('projects')} status="[PURSUIT: ACTIVE]">
      <div className="projects">
        <div className="projects__toolbar">
          <p className="projects__lede">
            Every build on the list, ranked by bounty. Open a dossier to drop into Speedbreaker.
          </p>

          <div className="projects__views" role="group" aria-label="Blacklist view">
            <button
              type="button"
              className={`projects__view-btn ${view === 'grid' ? 'projects__view-btn--active' : ''}`}
              onClick={() => switchView('grid')}
              aria-pressed={view === 'grid'}
            >
              <LayoutGrid size={14} /> GRID
            </button>
            <button
              type="button"
              className={`projects__view-btn ${view === 'list' ? 'projects__view-btn--active' : ''}`}
              onClick={() => switchView('list')}
              aria-pressed={view === 'list'}
            >
              <List size={14} /> ROSTER
            </button>
          </div>
        </div>

        {view === 'grid' ? (
          <BlacklistGrid rivals={blacklist} onSelect={setOpenRival} />
        ) : (
          <BlacklistBrowser />
        )}
      </div>

      <SpeedbreakerModal rival={openRival} onClose={() => setOpenRival(null)} />
    </Section>
  );
}
