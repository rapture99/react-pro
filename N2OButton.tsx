import { useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { playNosPurgeSound, playRevSound } from '../../lib/audio';

interface N2OButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  /** `primary` is the filled yellow CTA; `ghost` is the outlined secondary. */
  variant?: 'primary' | 'ghost';
  className?: string;
  ariaLabel?: string;
}

/** Camera shake — short, hard, and linear so it reads as an impact, not a wobble. */
const JITTER = {
  x: [0, -4, 5, -3, 2, 0],
  y: [0, 2, -3, 2, -1, 0],
  transition: { duration: 0.28, times: [0, 0.15, 0.35, 0.6, 0.8, 1], ease: 'linear' as const },
};

/**
 * Nitrous CTA: cyan motion-blur trails, a blue flare, and a camera-shake jitter that
 * fires with a procedural NOS purge on activation.
 *
 * The shake is applied to this element only, never to a scroll container or the page —
 * translating the document under a pointer costs you the click target and, on iOS, can
 * strand the viewport mid-scroll.
 *
 * Renders as an `<a>` when given an `href` and a `<button>` otherwise, so a CTA that
 * navigates stays keyboard- and middle-click-navigable instead of being a div that
 * happens to listen for clicks.
 */
export default function N2OButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  ariaLabel,
}: N2OButtonProps) {
  const reduced = useReducedMotion();
  const [firing, setFiring] = useState(false);

  const fire = useCallback(() => {
    playNosPurgeSound();
    playRevSound(1.15);
    setFiring(true);
    window.setTimeout(() => setFiring(false), 620);
    onClick?.();
  }, [onClick]);

  const classes = [
    'n2o-btn',
    `n2o-btn--${variant}`,
    firing ? 'n2o-btn--firing' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <>
      <span className="n2o-btn__trails" aria-hidden="true">
        <span /> <span /> <span />
      </span>
      <span className="n2o-btn__flare" aria-hidden="true" />
      <span className="n2o-btn__label">
        <Zap size={15} strokeWidth={3} className="n2o-btn__bolt" aria-hidden="true" />
        {children}
      </span>
    </>
  );

  const motionProps = reduced
    ? {}
    : { whileHover: JITTER, whileTap: { scale: 0.96 } };

  if (href) {
    return (
      <motion.a className={classes} href={href} aria-label={ariaLabel} onClick={fire} {...motionProps}>
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" className={classes} aria-label={ariaLabel} onClick={fire} {...motionProps}>
      {inner}
    </motion.button>
  );
}
