import { useEffect, useState } from 'react';
import { Flame, ShieldAlert, Volume2, VolumeX, Sun } from 'lucide-react';
import { isAudioEnabled, toggleAudio, playHudClickSound } from '../../lib/audio';

interface HeatBountyBarProps {
  onToggleSepia?: () => void;
  isSepiaActive?: boolean;
}

/**
 * Pursuit dispatch per heat level. Index 0 is unused so the array reads 1-5 like the
 * game's own heat numbering rather than being off by one at every call site.
 */
const DISPATCH = [
  '',
  'PATROL UNITS SCANNING',
  'UNDERCOVER CIVIC CRUISERS DISPATCHED',
  'STATE POLICE INTERCEPTORS IN PURSUIT',
  'HELICOPTER AIRBORNE — SPIKE STRIPS SET',
  'CROSS CORVETTE & RHINO SUV UNITS DEPLOYED',
] as const;

/** Scroll depth 0..1 → heat 1..5, clamped so the ends cannot overshoot the table. */
function heatFromScroll(progress: number): number {
  return Math.min(5, Math.max(1, Math.floor(progress * 5) + 1));
}

export default function HeatBountyBar({ onToggleSepia, isSepiaActive }: HeatBountyBarProps) {
  const [audioOn, setAudioOn] = useState(isAudioEnabled());
  const [heat, setHeat] = useState(1);

  // Heat climbs with how far down the page you are — the deeper you dig, the harder
  // the pursuit. rAF-throttled: the scroll handler itself only sets a flag, so a fast
  // wheel spin cannot queue hundreds of state updates in one frame.
  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      setHeat(heatFromScroll(progress));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const handleAudioToggle = () => {
    const nextState = toggleAudio();
    setAudioOn(nextState);
    if (nextState) playHudClickSound();
  };

  return (
    <div className="heat-bar">
      <div className="container heat-bar__inner">
        {/* Heat Level Badge — flames fill 1-5 with scroll depth */}
        <div
          className="heat-bar__heat-badge"
          data-heat={heat}
          title={`Heat Level ${heat}: ${DISPATCH[heat]}`}
        >
          <Flame size={16} className="heat-bar__flame-icon" />
          <span className="heat-bar__heat-title">HEAT LEVEL</span>
          <span className="heat-bar__heat-level">{heat}</span>
          <span className="heat-bar__flames" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((level) => (
              <Flame
                key={level}
                size={10}
                fill={level <= heat ? 'currentColor' : 'none'}
                className={`heat-bar__flame-pip ${level <= heat ? 'heat-bar__flame-pip--lit' : ''}`}
              />
            ))}
          </span>
        </div>

        {/* Telemetry Stats */}
        <div className="heat-bar__stats">
          <div className="heat-bar__stat">
            <span className="heat-bar__stat-label">BOUNTY SCORE</span>
            <span className="heat-bar__stat-val">$15,450,000</span>
          </div>

          <div className="heat-bar__stat heat-bar__stat--desktop">
            <span className="heat-bar__stat-label">COST TO STATE</span>
            <span className="heat-bar__stat-val">$1,250,000</span>
          </div>

          <div className="heat-bar__stat heat-bar__stat--desktop heat-bar__stat--dispatch">
            <span className="heat-bar__stat-label">PURSUIT DISPATCH</span>
            <span className="heat-bar__stat-val heat-bar__stat-val--alert" aria-live="polite">
              <ShieldAlert size={12} style={{ display: 'inline', verticalAlign: '-1px' }} />{' '}
              {DISPATCH[heat]}
            </span>
          </div>
        </div>

        {/* Action Toggles */}
        <div className="heat-bar__actions">
          <button
            className={`heat-bar__btn ${isSepiaActive ? 'heat-bar__btn--active' : ''}`}
            onClick={() => {
              if (onToggleSepia) onToggleSepia();
              if (audioOn) playHudClickSound();
            }}
            title="Toggle 2005 Amber Sepia & Glare Tint"
          >
            <Sun size={14} />
            <span className="heat-bar__btn-label">2005 GLARE</span>
          </button>

          <button
            className={`heat-bar__btn ${audioOn ? 'heat-bar__btn--active' : ''}`}
            onClick={handleAudioToggle}
            title={audioOn ? 'Mute Audio FX' : 'Enable Web Audio Engine Sound FX'}
          >
            {audioOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span className="heat-bar__btn-label">{audioOn ? 'SFX ON' : 'SFX OFF'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
