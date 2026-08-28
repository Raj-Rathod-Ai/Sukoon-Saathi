// ============================================================
//  SukoonSaathi — Footer
// ============================================================

import { Logo } from './Logo';

export function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg-alt)',
        padding: 'var(--space-2xl) var(--space-lg)',
        marginTop: 'var(--space-3xl)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-md)',
          textAlign: 'center',
        }}
      >
        {/* Logo + brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Logo size={28} />
          <div>
            <span
              style={{
                fontWeight: 800,
                fontSize: '15px',
                color: 'var(--color-text)',
                letterSpacing: '-0.2px',
              }}
            >
              SukoonSaathi
            </span>
            <span
              style={{
                fontSize: '12px',
                color: 'var(--color-text-muted)',
                marginLeft: '6px',
                fontWeight: 500,
              }}
            >
              Student Wellness Analytics
            </span>
          </div>
        </div>

        {/* Built with */}
        <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
          Built with Machine Learning + FastAPI
        </p>

        {/* Disclaimer */}
        <p
          style={{
            fontSize: '11px',
            color: 'var(--color-text-muted)',
            maxWidth: '520px',
            lineHeight: 1.55,
          }}
        >
          Informational tool only. Not a medical diagnosis. SukoonSaathi is not a therapist, doctor, or clinical tool.
        </p>
      </div>
    </footer>
  );
}
