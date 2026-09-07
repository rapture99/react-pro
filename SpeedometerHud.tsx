import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gauge, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { playNosPurgeSound, playRevSound, playGearShiftSound } from '../../lib/audio';

/** Dial limits, in thousands of RPM. Redline starts at 7. */
const IDLE_RPM = 1.2;
const MAX_RPM = 8.8;

/** Speed (mph) → gear. Ordered high-to-low so the first match wins. */
const GEAR_STEPS: [number, number][] = [
  [150, 6],
  [118, 5],
  [86, 4],
  [54, 3],
  [26, 2],
];

function gearForSpeed(speed: number): number {
  return GEAR_STEPS.find(([threshold]) => speed > threshold)?.[1] ?? 1;
}

export default function SpeedometerHud() {
  const [speed, setSpeed] = useState(0);
  const [rpm, setRpm] = useState(IDLE_RPM);
  const [gear, setGear] = useState(1);
  const [isNosActive, setIsNosActive] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);
  const scrollTimeout = useRef<number | null>(null);
  const frame = useRef(0);
  const gearRef = useRef(1);

  useEffect(() => {
    // Velocity, not raw delta: dividing by elapsed time makes the needle read the same
    // for a given physical scroll speed whether the browser is firing events every 8ms
    // or every 30ms. Using the delta alone made a slow machine look like a fast driver.
    const read = () => {
      frame.current = 0;
      const now = performance.now();
      const currentScrollY = window.scrollY;
      // Clamped at both ends. The floor stops a sub-frame gap dividing into a huge
      // number; the ceiling matters more — without it the first read of every scroll
      // burst divides its delta by however long the user had been idle, so a hard flick
      // after a pause read as a crawl and the needle never left idle.
      const elapsed = Math.min(120, Math.max(16, now - lastScrollTime.current));
      const pixelsPerSecond = (Math.abs(currentScrollY - lastScrollY.current) / elapsed) * 1000;
      lastScrollY.current = currentScrollY;
      lastScrollTime.current = now;

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? currentScrollY / docHeight : 0;

      // ~2000 px/s of flick pins the dial. Depth adds a small floor so the needle sits
      // higher the further into the page you are, even while coasting.
      const velocityPart = Math.min(1, pixelsPerSecond / 2000);
      const nextSpeed = Math.min(200, Math.round(velocityPart * 150 + scrollPercent * 45 + 18));
      const nextRpm = Math.min(MAX_RPM, Math.max(IDLE_RPM, velocityPart * 7.2 + scrollPercent * 1.4 + 1.3));
      const nextGear = gearForSpeed(nextSpeed);

      if (nextGear !== gearRef.current) {
        gearRef.current = nextGear;
        playGearShiftSound();
      }

      setSpeed(nextSpeed);
      setRpm(nextRpm);
      setGear(nextGear);

      // Coast back to idle once the wheel stops.
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = window.setTimeout(() => {
        const idleGear = Math.max(1, Math.round(scrollPercent * 3));
        gearRef.current = idleGear;
        setSpeed(Math.round(scrollPercent * 42 + 14));
        setRpm(IDLE_RPM + scrollPercent * 0.6);
        setGear(idleGear);
      }, 420);
    };

    const handleScroll = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(read);
    };

    lastScrollTime.current = performance.now();
    lastScrollY.current = window.scrollY;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  const triggerNos = () => {
    if (isNosActive) return;
    setIsNosActive(true);
    playNosPurgeSound();
    playRevSound();

    // Max out RPM & speed for boost effect
    setRpm(MAX_RPM);
    setSpeed(200);
    setGear(6);
    gearRef.current = 6;

    setTimeout(() => {
      setIsNosActive(false);
    }, 1800);
  };

  // Rotation angle for dial needle (-120 deg to +120 deg)
  const needleRotation = -120 + (rpm / 9) * 240;

  return (
    <div
      className={`speedo-hud ${isNosActive ? 'speedo-hud--nos' : ''} ${rpm >= 7 ? 'speedo-hud--redline' : ''}`}
    >
      {/* Visual NOS Screen Blur overlay when NOS is fired */}
      <AnimatePresence>
        {isNosActive && (
          <motion.div
            className="nos-screen-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <div className="speedo-hud__container">
        {/* Toggle Button */}
        <button
          className="speedo-hud__toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand Telemetry' : 'Minimize Telemetry'}
          aria-label="Toggle Telemetry HUD"
        >
          <Gauge size={14} />
          <span className="speedo-hud__toggle-text">TELEMETRY</span>
          {isCollapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {!isCollapsed && (
          <div className="speedo-hud__body">
            {/* Tachometer Dial SVG */}
            <div className="speedo-hud__dial-wrapper">
              <svg className="speedo-hud__dial-svg" viewBox="0 0 200 200">
                {/* Background Ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#1c1c1c"
                  strokeWidth="10"
                />
                
                {/* Active Speed Arc */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke={isNosActive ? '#00d2ff' : '#ffd700'}
                  strokeWidth="10"
                  strokeDasharray="502"
                  strokeDashoffset={502 - (rpm / 9) * 330}
                  strokeLinecap="butt"
                  transform="rotate(150 100 100)"
                  style={{ transition: 'stroke-dashoffset 0.15s ease-out' }}
                />

                {/* Redline Zone Arc */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#ff3b00"
                  strokeWidth="10"
                  strokeDasharray="502"
                  strokeDashoffset={502 - (2 / 9) * 330}
                  transform="rotate(320 100 100)"
                />

                {/* Ticks */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => {
                  const angle = -120 + (val / 9) * 240;
                  const rad = (angle - 90) * (Math.PI / 180);
                  const x1 = 100 + Math.cos(rad) * 66;
                  const y1 = 100 + Math.sin(rad) * 66;
                  const x2 = 100 + Math.cos(rad) * 75;
                  const y2 = 100 + Math.sin(rad) * 75;
                  const isRed = val >= 7;

                  return (
                    <line
                      key={val}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isRed ? '#ff3b00' : '#8a8a8a'}
                      strokeWidth={val % 2 === 0 ? '3' : '1.5'}
                    />
                  );
                })}
              </svg>

              {/* Tachometer Needle */}
              <div
                className="speedo-hud__needle"
                style={{
                  transform: `rotate(${needleRotation}deg)`,
                  transition: isNosActive ? 'transform 0.08s ease-out' : 'transform 0.15s ease-out',
                }}
              />
              <div className="speedo-hud__center-cap" />

              {/* Digital Readout inside Dial */}
              <div className="speedo-hud__readout">
                <span className="speedo-hud__gear">{gear}</span>
                <span className="speedo-hud__gear-label">GEAR</span>
              </div>
            </div>

            {/* Speed & NOS Bar */}
            <div className="speedo-hud__stats">
              <div className="speedo-hud__speed-box">
                <span className="speedo-hud__speed-val">{speed}</span>
                <span className="speedo-hud__unit">MPH</span>
              </div>

              <div className="speedo-hud__rpm-box">
                <span className="speedo-hud__rpm-val">{(rpm * 1000).toFixed(0)}</span>
                <span className="speedo-hud__unit">RPM</span>
              </div>

              {/* NOS Trigger Button */}
              <button
                className={`speedo-hud__nos-btn ${isNosActive ? 'speedo-hud__nos-btn--active' : ''}`}
                onClick={triggerNos}
                disabled={isNosActive}
                title="PURGE NOS NITRO BOOST"
              >
                <Zap size={14} />
                <span>NOS BOOST</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
