import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Zap, ChevronRight } from 'lucide-react';
import { playRevSound, playHudClickSound } from '../../lib/audio';

const LOADING_HINTS = [
  'INITIALIZING BLACKLIST #01 TELEMETRY...',
  'LOADING ROCKPORT CITY POLICE DATABASE...',
  'OPTIMIZING HIGH-FREQUENCY REDIS ENDPOINTS...',
  'FLUSHING OFFLINE SYNC ENGINE & SQLITE CACHE...',
  'EVADING HEAT LEVEL 5 PURSUIT UNITS...',
  'READY TO RACE: NIKHIL JATHAR DOSSIER LOADED.',
];

const MW_TIPS = [
  'Keep your heat level under control by switching ride specs between pursuits.',
  'NOS boost maxes out RPM needle for maximum velocity and API throughput.',
  'Lead developers command full-stack deployments with 95% code reuse.',
  'Press NOS button on the HUD telemetry meter for instant speed boost.',
];

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [hintIndex, setHintIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Increment progress from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            playRevSound();
          }, 300);
          return 100;
        }
        // Accelerate near the end like a tachometer revving
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + increment);
      });
    }, 90);

    // Cycle telemetry hints
    const hintInterval = setInterval(() => {
      setHintIndex((prev) => (prev + 1) % LOADING_HINTS.length);
    }, 500);

    // Cycle tip text
    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % MW_TIPS.length);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearInterval(hintInterval);
      clearInterval(tipInterval);
    };
  }, []);

  const handleSkip = () => {
    playHudClickSound();
    setProgress(100);
    setIsLoading(false);
    playRevSound();
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          {/* Top Hazard Rail */}
          <div className="splash-screen__rail splash-screen__rail--top" />

          {/* Background Watermark */}
          <div className="splash-screen__watermark">MOST WANTED</div>

          {/* Central Loading Box */}
          <div className="splash-screen__container">
            {/* Header Badge */}
            <div className="splash-screen__header">
              <ShieldAlert size={18} className="splash-screen__shield-icon" />
              <span className="splash-screen__badge">ROCKPORT CITY // BLACKLIST TELEMETRY</span>
            </div>

            {/* Rotating Gauge Dial */}
            <div className="splash-screen__dial">
              <svg className="splash-screen__dial-svg" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" fill="none" stroke="#1c1c1c" strokeWidth="8" />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="8"
                  strokeDasharray="440"
                  strokeDashoffset={440 - (progress / 100) * 440}
                  strokeLinecap="butt"
                  transform="rotate(-90 80 80)"
                  style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                />
              </svg>
              <div className="splash-screen__dial-readout">
                <span className="splash-screen__percent">{progress}%</span>
                <span className="splash-screen__rpm-label">LOADING</span>
              </div>
            </div>

            {/* Hint & Progress Bar */}
            <div className="splash-screen__status">
              <div className="splash-screen__hint">{LOADING_HINTS[hintIndex]}</div>

              <div className="splash-screen__track">
                <div
                  className="splash-screen__fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* MW 2005 Gameplay Tip Box */}
            <div className="splash-screen__tip-box">
              <div className="splash-screen__tip-header">
                <Zap size={12} />
                <span>MW TELEMETRY TIP</span>
              </div>
              <p className="splash-screen__tip-text">{MW_TIPS[tipIndex]}</p>
            </div>

            {/* Skip Button */}
            <button className="splash-screen__skip-btn" onClick={handleSkip}>
              <span>SKIP INTRO</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Bottom Hazard Rail */}
          <div className="splash-screen__rail splash-screen__rail--bottom" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
