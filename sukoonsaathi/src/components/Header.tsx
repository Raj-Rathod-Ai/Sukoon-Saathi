// ============================================================
//  SukoonSaathi — Header
// ============================================================

import { Logo } from './Logo';

export function Header() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(250, 249, 246, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 var(--space-lg)',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: Logo + Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Logo size={34} />
          <div>
            <div
              style={{
                fontWeight: 800,
                fontSize: '17px',
                letterSpacing: '-0.3px',
                color: 'var(--color-text)',
                lineHeight: 1.1,
              }}
            >
              SukoonSaathi
            </div>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 500,
                color: 'var(--color-text-muted)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}
              className="desktop-only"
            >
              Student Wellness Analytics
            </div>
          </div>
        </div>

        {/* Right: Subtle badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
          className="desktop-only"
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              letterSpacing: '0.04em',
              background: 'var(--color-surface-warm)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-full)',
              padding: '4px 12px',
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
            Informational tool · ML-powered
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .desktop-only {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
