// ============================================================
//  SukoonSaathi — Hero Section
// ============================================================

import { DailyRhythmVisual } from './DailyRhythmVisual';

interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  return (
    <section
      style={{
        background: 'linear-gradient(160deg, var(--color-bg) 0%, var(--color-bg-alt) 100%)',
        borderBottom: '1px solid var(--color-border)',
        padding: 'var(--space-4xl) var(--space-lg) var(--space-3xl)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-3xl)',
        }}
        className="hero-inner"
      >
        {/* Left: Text */}
        <div style={{ flex: 1, maxWidth: '580px' }}>
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-sage)',
              marginBottom: 'var(--space-lg)',
            }}
          >
            <span
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: 'var(--color-sage)',
                display: 'inline-block',
                borderRadius: '2px',
              }}
            />
            SukoonSaathi · Student Wellness Analytics
          </div>

          {/* Main Heading */}
          <h1
            style={{
              fontSize: 'clamp(36px, 5.5vw, 58px)',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-1px',
              color: 'var(--color-text)',
              marginBottom: 'var(--space-md)',
            }}
          >
            Apni daily routine<br />
            <span style={{ color: 'var(--color-sage)' }}>ko samjho.</span>
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontSize: 'clamp(18px, 2.5vw, 22px)',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-lg)',
              lineHeight: 1.45,
            }}
          >
            Know your wellness signal.
          </p>

          {/* Body copy */}
          <p
            style={{
              fontSize: '16px',
              fontWeight: 400,
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              marginBottom: 'var(--space-sm)',
              maxWidth: '480px',
            }}
          >
            Sleep, study, screen time, physical activity and stress — a few everyday patterns are used to generate an ML-based wellness signal.
          </p>

          {/* Disclaimer */}
          <p
            style={{
              fontSize: '12px',
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--space-2xl)',
              lineHeight: 1.5,
            }}
          >
            Informational estimate only — not a medical or clinical diagnosis.
          </p>

          {/* CTA */}
          <button
            id="hero-start-btn"
            onClick={onStart}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--color-text)',
              color: 'var(--color-bg)',
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 700,
              padding: '14px 28px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.01em',
              transition: 'background-color var(--transition-base), transform var(--transition-fast)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-sage-dark)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-text)';
            }}
            onMouseDown={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)';
            }}
            onMouseUp={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
            }}
          >
            Start Your Check
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Right: Visual */}
        <div className="hero-visual" style={{ flexShrink: 0 }}>
          <DailyRhythmVisual />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-inner {
            flex-direction: column !important;
            text-align: center !important;
          }
          .hero-visual {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
