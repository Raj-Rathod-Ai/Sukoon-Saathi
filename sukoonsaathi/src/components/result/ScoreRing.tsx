// ============================================================
//  SukoonSaathi — ScoreRing
//  Animated SVG circle ring that draws from 0 → actual score
// ============================================================

import { useEffect, useRef, useState } from 'react';

interface ScoreRingProps {
  score: number; // e.g. 6.78
  maxScore?: number;
}

const SIZE = 220;
const STROKE = 10;
const RADIUS = (SIZE - STROKE * 2) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ScoreRing({ score, maxScore = 10 }: ScoreRingProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setDisplayScore(score);
      setProgress(score / maxScore);
      return;
    }

    const duration = 1400;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);

      setDisplayScore(parseFloat((eased * score).toFixed(2)));
      setProgress(eased * (score / maxScore));

      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayScore(score);
        setProgress(score / maxScore);
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [score, maxScore]);

  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-md)',
      }}
    >
      <div style={{ position: 'relative', width: `${SIZE}px`, height: `${SIZE}px` }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          style={{ transform: 'rotate(-90deg)' }}
          role="img"
          aria-label={`SukoonScore: ${score} out of ${maxScore}`}
        >
          {/* Background track */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="var(--color-sage-light)"
            strokeWidth={STROKE}
          />
          {/* Progress arc */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="var(--color-sage)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.016s linear' }}
          />
        </svg>

        {/* Center content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '2px',
            }}
          >
            <span
              style={{
                fontSize: '54px',
                fontWeight: 800,
                letterSpacing: '-2px',
                color: 'var(--color-text)',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {displayScore.toFixed(2)}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              color: 'var(--color-text-muted)',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 500 }}>/</span>
            <span style={{ fontSize: '13px', fontWeight: 600 }}>{maxScore}</span>
          </div>
        </div>
      </div>

      {/* Label */}
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: 'var(--color-sage)',
          }}
        >
          Model-generated wellness signal
        </p>
      </div>
    </div>
  );
}
