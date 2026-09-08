import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, Gauge } from 'lucide-react';
import BlacklistCard from './BlacklistCard';
import SpeedbreakerModal from './SpeedbreakerModal';
import { resume } from '../../data/resume';
import { playHudClickSound } from '../../lib/audio';
import type { BlacklistRival } from '../../types/resume';

export default function BlacklistBrowser() {
  const { blacklist } = resume;
  const [openRival, setOpenRival] = useState<BlacklistRival | null>(null);
  const [selectedRivalId, setSelectedRivalId] = useState(blacklist[0].id);

  const selectedRival = blacklist.find((r) => r.id === selectedRivalId) || blacklist[0];

  const handleSelectRival = (id: string) => {
    playHudClickSound();
    setSelectedRivalId(id);
  };

  return (
    <div className="blacklist-browser">
      <div className="blacklist-browser__tabs" role="tablist" aria-label="Blacklist Rivals">
        <div className="blacklist-browser__header">
          <Shield size={14} className="blacklist-browser__icon" />
          <span className="blacklist-browser__title">THE BLACKLIST 15</span>
        </div>

        <div className="blacklist-browser__list">
          {blacklist.map((rival) => {
            const isSelected = rival.id === selectedRivalId;
            return (
              <button
                key={rival.id}
                role="tab"
                aria-selected={isSelected}
                className={`blacklist-tab ${isSelected ? 'blacklist-tab--active' : ''}`}
                onClick={() => handleSelectRival(rival.id)}
              >
                <div className="blacklist-tab__rank">#{rival.rank}</div>
                <div className="blacklist-tab__info">
                  <span className="blacklist-tab__alias">{rival.alias}</span>
                  <span className="blacklist-tab__name">{rival.name}</span>
                </div>
                <div className="blacklist-tab__bounty">{rival.bounty}</div>
                <ChevronRight size={14} className="blacklist-tab__arrow" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="blacklist-browser__stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRival.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="blacklist-browser__card-wrapper"
          >
            <BlacklistCard rival={selectedRival} onOpenDossier={setOpenRival} />
          </motion.div>
        </AnimatePresence>

        {/* Rival Tech Specs Breakdown */}
        <div className="blacklist-browser__specs">
          <div className="blacklist-browser__specs-header">
            <Gauge size={14} />
            <span>RIDE & TECH PERFORMANCES</span>
          </div>

          <div className="blacklist-browser__ride-name">{selectedRival.ride}</div>
          <p className="blacklist-browser__bio">{selectedRival.bio}</p>

          <div className="blacklist-browser__stat-bars">
            <div className="tuner-bar">
              <span className="tuner-bar__label">TOP SPEED</span>
              <div className="tuner-bar__track">
                <div className="tuner-bar__fill" style={{ width: `${selectedRival.stats.topSpeed}%` }} />
              </div>
              <span className="tuner-bar__val">{selectedRival.stats.topSpeed}</span>
            </div>

            <div className="tuner-bar">
              <span className="tuner-bar__label">ACCELERATION</span>
              <div className="tuner-bar__track">
                <div className="tuner-bar__fill" style={{ width: `${selectedRival.stats.acceleration}%` }} />
              </div>
              <span className="tuner-bar__val">{selectedRival.stats.acceleration}</span>
            </div>

            <div className="tuner-bar">
              <span className="tuner-bar__label">HANDLING</span>
              <div className="tuner-bar__track">
                <div className="tuner-bar__fill" style={{ width: `${selectedRival.stats.handling}%` }} />
              </div>
              <span className="tuner-bar__val">{selectedRival.stats.handling}</span>
            </div>

            <div className="tuner-bar">
              <span className="tuner-bar__label">NITRO BOOST</span>
              <div className="tuner-bar__track">
                <div
                  className="tuner-bar__fill tuner-bar__fill--nos"
                  style={{ width: `${selectedRival.stats.nitro}%` }}
                />
              </div>
              <span className="tuner-bar__val">{selectedRival.stats.nitro}</span>
            </div>
          </div>

          <div className="blacklist-browser__tech-chips">
            {selectedRival.techStack.map((tech) => (
              <span key={tech} className="skill-group__chip">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <SpeedbreakerModal rival={openRival} onClose={() => setOpenRival(null)} />
    </div>
  );
}
