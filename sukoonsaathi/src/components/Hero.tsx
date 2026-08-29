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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background ambient radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232, 240, 233, 0.6) 0%, rgba(250, 249, 246, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-3xl)',
          position: 'relative',
          zIndex: 1,
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
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-sage-dark)',
              backgroundColor: 'var(--color-sage-light)',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              marginBottom: 'var(--space-lg)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-sage)',
                display: 'inline-block',
              }}
            />
            Student Wellness Analytics · ML Inference
          </div>

          {/* Main Heading */}
          <h1
            style={{
              fontSize: 'clamp(36px, 5.5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-1px',
              color: 'var(--color-text)',
              marginBottom: 'var(--space-md)',
            }}
          >
            Apni daily routine<br />
            <span style={{ color: 'var(--color-sage-dark)' }}>ko samjho.</span>
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontSize: 'clamp(18px, 2.5vw, 22px)',
              fontWeight: 600,
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
            Sleep, study, screen time, physical activity and stress — everyday lifestyle metrics processed through a trained Machine Learning model.
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
            className="btn-interactive shimmer-effect"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'var(--color-text)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 700,
              padding: '15px 32px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.02em',
              boxShadow: '0 4px 16px rgba(28, 28, 26, 0.12)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={e => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.backgroundColor = 'var(--color-sage-dark)';
              btn.style.boxShadow = '0 8px 24px rgba(79, 112, 85, 0.3)';
            }}
            onMouseLeave={e => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.backgroundColor = 'var(--color-text)';
              btn.style.boxShadow = '0 4px 16px rgba(28, 28, 26, 0.12)';
            }}
          >
            Start Your Check
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3.5 9h11M10 4.5L14.5 9 10 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
