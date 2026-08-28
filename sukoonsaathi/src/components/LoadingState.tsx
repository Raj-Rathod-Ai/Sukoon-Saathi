// ============================================================
//  SukoonSaathi — LoadingState
//  Calm, elegant, highly animated loading visualizer
// ============================================================

import { useEffect, useState } from 'react';

const STAGES = [
  { text: 'Connecting to SukoonSaathi ML model...', subtitle: 'Initializing neural pipeline', progress: 25 },
  { text: 'Analyzing your daily lifestyle patterns...', subtitle: 'Processing sleep, screen time & activity metrics', progress: 55 },
  { text: 'Calculating your personalized wellness signal...', subtitle: 'Random Forest inference in progress', progress: 85 },
  { text: 'Taking a moment to wake up the server...', subtitle: 'Render server cold-start warming up, please wait', progress: 96 },
];

export function LoadingState() {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStageIndex(1), 2500),
      setTimeout(() => setStageIndex(2), 6500),
      setTimeout(() => setStageIndex(3), 13000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const currentStage = STAGES[stageIndex];

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Calculating your SukoonScore"
      className="fade-in-scale"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 'var(--space-3xl) var(--space-lg)',
        gap: 'var(--space-xl)',
        maxWidth: '540px',
        margin: '0 auto',
      }}
    >
      {/* ── Multi-Layer Pulsing Visualizer ── */}
      <div
        style={{
          position: 'relative',
          width: '130px',
          height: '130px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Outer expanding ripple ring 1 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid var(--color-sage)',
            animation: 'pulse-ring 2.4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
            pointerEvents: 'none',
          }}
        />

        {/* Outer expanding ripple ring 2 (delayed) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1.5px solid var(--color-sage-dark)',
            animation: 'pulse-ring 2.4s cubic-bezier(0.215, 0.61, 0.355, 1) 1.2s infinite',
            pointerEvents: 'none',
          }}
        />

        {/* Center glowing badge */}
        <div
          style={{
            position: 'absolute',
            inset: '10px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232, 240, 233, 0.9) 0%, rgba(255, 255, 255, 0.95) 70%)',
            boxShadow: '0 8px 32px rgba(107, 143, 113, 0.25), inset 0 2px 6px rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(107, 143, 113, 0.2)',
          }}
        />

        {/* Rotating SVG rings */}
        <svg viewBox="0 0 120 120" width="120" height="120" style={{ position: 'relative', zIndex: 2 }}>
          {/* Background track */}
          <circle
            cx="60"
            cy="60"
            r="48"
            fill="none"
            stroke="var(--color-sage-light)"
            strokeWidth="3.5"
            strokeDasharray="4 4"
          />

          {/* Primary animated fast spinning arc */}
          <circle
            cx="60"
            cy="60"
            r="48"
            fill="none"
            stroke="var(--color-sage)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="301"
            strokeDashoffset="210"
            transform="rotate(-90 60 60)"
            style={{
              animation: 'spin-slow 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite',
              filter: 'drop-shadow(0 2px 6px rgba(107, 143, 113, 0.4))',
            }}
          />

          {/* Secondary counter-rotating delicate arc */}
          <circle
            cx="60"
            cy="60"
            r="38"
            fill="none"
            stroke="var(--color-sage-dark)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="238"
            strokeDashoffset="180"
            transform="rotate(45 60 60)"
            style={{
              animation: 'spin-reverse 2.2s linear infinite',
              opacity: 0.7,
            }}
          />
        </svg>

        {/* Center breathing logo icon */}
        <div
          className="breathe"
          style={{
            position: 'absolute',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="16" fill="var(--color-sage-pale)" />
            <path
              d="M13 15 C13 11, 18 9, 22 12 C26 15, 26 18, 20 20 C14 22, 14 25, 18 28 C22 31, 27 29, 27 25"
              stroke="var(--color-sage-dark)"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* ── Status Text & Subtitle ── */}
      <div style={{ textAlign: 'center', width: '100%' }}>
        <p
          key={`title-${stageIndex}`}
          className="fade-up"
          style={{
            fontSize: '17px',
            fontWeight: 700,
            color: 'var(--color-text)',
            marginBottom: '6px',
            letterSpacing: '-0.2px',
          }}
        >
          {currentStage.text}
        </p>

        <p
          key={`sub-${stageIndex}`}
          className="fade-up"
          style={{
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            marginBottom: '18px',
          }}
        >
          {currentStage.subtitle}
        </p>

        {/* ── Animated Smooth Progress Bar ── */}
        <div
          style={{
            width: '100%',
            maxWidth: '320px',
            height: '6px',
            background: 'var(--color-border)',
            borderRadius: 'var(--radius-full)',
            margin: '0 auto 16px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${currentStage.progress}%`,
              background: 'linear-gradient(90deg, var(--color-sage), var(--color-sage-dark), #74C69D)',
              backgroundSize: '200% 100%',
              borderRadius: 'var(--radius-full)',
              transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              animation: 'wave-bar 2s linear infinite',
              boxShadow: '0 0 10px rgba(107, 143, 113, 0.4)',
            }}
          />
        </div>

        {/* ── Bouncing Dots indicator ── */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-sage)',
              animation: 'dot-bounce 1.4s infinite ease-in-out',
              animationDelay: '0s',
            }}
          />
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-sage)',
              animation: 'dot-bounce 1.4s infinite ease-in-out',
              animationDelay: '0.2s',
            }}
          />
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-sage)',
              animation: 'dot-bounce 1.4s infinite ease-in-out',
              animationDelay: '0.4s',
            }}
          />
        </div>
      </div>
    </div>
  );
}
